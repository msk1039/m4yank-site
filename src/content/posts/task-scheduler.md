---
title: Building a tiny Header-only task scheduler library that runs c++ lambda functions after a delay
description: Getting straight to the point - it takes the functions, adds them to queue and executes them after their timer expires. when a task is added using add() function, it returns a cancellation token to the caller which can be used later to cancel the task execution before it is started
category: Journey
coverImage: https://cdn.m4yank.com/assets/blog/sync-task-scheduler/1d.webp
coverImageWidth: 1472
coverImageHeight: 828
date: "2025-04-11"
---


## Source

https://github.com/msk1039/task-scheduler

## Learning material

learncpp chapter 20.1 - https://www.learncpp.com/cpp-tutorial/function-pointers/
learncpp chapter 20.6 - https://www.learncpp.com/#:~:text=(anonymous%20functions)



---

# What it does

You give it a lambda (or any callable), a delay in milliseconds, and it runs that function after the delay expires. When you call `add()`, you get back a `CancellationToken`. Hold onto that token — if you change your mind before the task fires, call `.cancel()` on it and the scheduler skips it.

Single header file. No dependencies beyond the standard library. Drop `scheduler.hpp` into your project and you are done.

---

## The three moving parts

The whole thing lives in the `scheduler` namespace and is made of three classes:

| Class | Job |
|---|---|
| `CancellationToken` | Returned to the caller. Holds a shared atomic flag and the task id. Calling `.cancel()` flips the flag. |
| `Task` | Stored inside the queue. Holds the callable, the scheduled fire time, and a pointer to the same shared flag. |
| `Scheduler` | Owns the priority queue. Exposes `add()` and `run()`. |

---

# How `scheduler::add()` works

When you call `add(job, delay)`:

1. A new unique `id` is grabbed by atomically incrementing `next_id`.
2. A `shared_ptr<atomic<bool>>` cancellation flag is created, initially `false`.
3. The fire time is calculated — `steady_clock::now() + delay`.
4. A `Task` is constructed with the id, the callable, the fire time, and a copy of the flag pointer, then pushed into the min-heap.
5. A `CancellationToken` is constructed with the same id and the same flag pointer and returned to the caller.

Both the `Task` inside the queue and the `CancellationToken` in the caller's hands point at the **same** atomic flag. That shared pointer is the entire cancellation mechanism.

<img src="https://cdn.m4yank.com/assets/blog/sync-task-scheduler/2d.webp" alt="add() flowchart" width="1200" height="675" loading="lazy" decoding="async" />

> **Flowchart 1** — a linear flow: `add(job, delay)` → fetch-add id → create shared atomic flag → compute `now() + delay` → push `Task` to min-heap → construct and return `CancellationToken`. Highlight the shared pointer arrow going to both the Task node and the CancellationToken node.

---

# The priority queue — a min-heap ordered by fire time

`Scheduler` keeps a `std::priority_queue` with `std::greater<Task>` as the comparator:

```cpp title="scheduler.hpp"
std::priority_queue<Task, std::vector<Task>, std::greater<Task>> queue;
```

`Task` defines `operator>` to compare by `scheduled_time`:

```cpp title="scheduler.hpp"
bool operator>(const Task& other) const {
    return scheduled_time > other.scheduled_time;
}
```

`std::greater<Task>` internally calls `a > b`, so the task with the **earliest** fire time always sits at the top. Every time a new task is pushed, the heap re-balances in `O(log n)`.
<img src="https://cdn.m4yank.com/assets/blog/sync-task-scheduler/3d.webp" alt="add() flowchart" width="1200" height="1384" loading="lazy" decoding="async" />
---

# How `scheduler::run()` works

`run()` is a blocking loop that drains the queue:

```cpp title="scheduler.hpp"
void run() {
    while (!queue.empty()) {
        std::this_thread::sleep_until(queue.top().getScheduledTime());

        while (!queue.empty() && queue.top().isExpired()) {
            Task task = queue.top();
            queue.pop();
            if (!task.isCancelled()) {
                task.execute();
            }
        }
    }
}
```

Step by step:

1. **Outer loop** — keeps going as long as there are tasks left.
2. **`sleep_until`** — the thread sleeps precisely until the next task's fire time. No busy-waiting, no polling.
3. **Inner loop** — after waking, more than one task might be due (tasks added with the same delay, or overlapping delays). The inner loop pops and runs all expired tasks in one shot.
4. **Cancellation check** — before calling `execute()`, it checks `isCancelled()`. If the caller flipped the flag via their token, the task is silently skipped.
5. **Exception safety** — `execute()` wraps the callable in a try/catch. A throwing task prints to `stderr` but does not crash the scheduler or skip the remaining queue.

<img src="https://cdn.m4yank.com/assets/blog/sync-task-scheduler/4d.webp" alt="run() flowchart" width="914" height="1063" loading="lazy" decoding="async" />

> **Flowchart 2** — Start → queue empty? (yes → end) → `sleep_until` top task time → inner loop: queue empty or top not expired? (yes → back to outer loop) → pop task → `isCancelled()`? (yes → skip, back to inner loop) → `execute()` → catch exceptions → back to inner loop.

---

## Task Cancellation Token

```cpp title="scheduler.hpp"
class CancellationToken {
    uint64_t id;
    std::shared_ptr<std::atomic<bool>> canceled_flag;
  public:
    void cancel() { canceled_flag->store(true); }
    bool isCanceled() const { return canceled_flag->load(); }
};
```

`cancel()` does a single atomic store. `isCancelled()` inside `Task` does a single atomic load. No mutex, no lock. Safe to call from any thread at any time — even while `run()` is sleeping.

---

## Putting it all together — usage example

```cpp
#include "scheduler.hpp"
#include <iostream>
#include <chrono>

int main() {
    scheduler::Scheduler s;

    s.add([]{ std::cout << "fires after 1 second\n"; },
          std::chrono::milliseconds(1000));

    auto token = s.add([]{ std::cout << "this will never print\n"; },
                       std::chrono::milliseconds(500));

    token.cancel(); // cancel before run() even starts

    s.add([]{ std::cout << "fires after 200ms\n"; },
          std::chrono::milliseconds(200));

    s.run();
    // output:
    // fires after 200ms
    // fires after 1 second
}
```

The 200 ms task fires first because the heap always surfaces the earliest task, even though it was added last. The 500 ms task was cancelled, so it is silently dropped.

---

## Tradeoffs and limitations

- **Single-threaded** — `run()` blocks the calling thread. Tasks execute sequentially, not concurrently. Long-running tasks will delay later ones.
- **No reschedule** — once a task is popped it is gone. There is no repeat/interval support.
- **`sleep_until` precision** — actual wake time depends on the OS scheduler. On most systems this is within a few milliseconds of the requested time.
- **Queue is not thread-safe** — `add()` should not be called from another thread while `run()` is executing without adding a mutex around the queue.

---

## References

- https://en.cppreference.com/w/cpp/thread/sleep_until
- https://en.cppreference.com/w/cpp/container/priority_queue
- https://en.cppreference.com/w/cpp/atomic/atomic
