export type ContestPlatformStats = {
  platform: "Codeforces" | "LeetCode";
  handle: string;
  profileUrl: string;
  maxRating: number | null;
  totalSolved: number | null;
};

export type ContestStats = {
  codeforces: ContestPlatformStats;
  leetcode: ContestPlatformStats;
  updatedAt: string;
};

export const CODE_FORCES_HANDLE = "mayank1039";
export const LEET_CODE_HANDLE = "Mayank1039";
export const CODE_CHEF_HANDLE = "mayankkadam103";

export const CODE_FORCES_PROFILE_URL =
  "https://codeforces.com/profile/mayank1039";
export const LEET_CODE_PROFILE_URL = "https://leetcode.com/u/Mayank1039/";
export const CODE_CHEF_PROFILE_URL =
  "https://www.codechef.com/users/mayankkadam103";

export const CODE_CHEF_RATING = 1298;

export const fallbackStats: ContestStats = {
  codeforces: {
    platform: "Codeforces",
    handle: CODE_FORCES_HANDLE,
    profileUrl: CODE_FORCES_PROFILE_URL,
    maxRating: 1036,
    totalSolved: 250,
  },
  leetcode: {
    platform: "LeetCode",
    handle: LEET_CODE_HANDLE,
    profileUrl: LEET_CODE_PROFILE_URL,
    maxRating: null,
    totalSolved: 250,
  },
  updatedAt: new Date().toISOString(),
};

async function fetchJson<T>(
  url: string,
  init?: RequestInit,
): Promise<T | null> {
  try {
    const response = await fetch(url, {
      ...init,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; MayankPortfolio/1.0; +https://m4yank.com)",
        Accept: "application/json",
        ...init?.headers,
      },
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

type CodeforcesUserInfoResponse = {
  status: "OK" | "FAILED";
  result?: Array<{
    maxRating?: number;
    rating?: number;
  }>;
  comment?: string;
};

type CodeforcesSubmission = {
  verdict: string;
  problem: {
    contestId?: number;
    index: string;
  };
};

type CodeforcesStatusResponse = {
  status: "OK" | "FAILED";
  result?: CodeforcesSubmission[];
  comment?: string;
};

async function fetchCodeforcesStats(): Promise<ContestPlatformStats> {
  const [info, status] = await Promise.all([
    fetchJson<CodeforcesUserInfoResponse>(
      `https://codeforces.com/api/user.info?handles=${CODE_FORCES_HANDLE}`,
    ),
    fetchJson<CodeforcesStatusResponse>(
      `https://codeforces.com/api/user.status?handle=${CODE_FORCES_HANDLE}`,
    ),
  ]);

  const maxRating = info?.result?.[0]?.maxRating ?? null;

  const solved = new Set<string>();
  if (status?.result) {
    for (const submission of status.result) {
      if (submission.verdict === "OK" && submission.problem) {
        const key = `${submission.problem.contestId ?? "gym"}-${submission.problem.index}`;
        solved.add(key);
      }
    }
  }

  return {
    platform: "Codeforces",
    handle: CODE_FORCES_HANDLE,
    profileUrl: CODE_FORCES_PROFILE_URL,
    maxRating,
    totalSolved: solved.size > 0 ? solved.size : null,
  };
}

type LeetCodeResponse = {
  data?: {
    userContestRanking?: {
      rating?: number;
    } | null;
    matchedUser?: {
      submitStatsGlobal?: {
        acSubmissionNum?: Array<{
          difficulty: string;
          count: number;
        }>;
      };
    } | null;
  };
};

async function fetchLeetCodeStats(): Promise<ContestPlatformStats> {
  const response = await fetchJson<LeetCodeResponse>(
    "https://leetcode.com/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com/",
      },
      body: JSON.stringify({
        query: `
          query userContestRankingInfo($username: String!) {
            userContestRanking(username: $username) {
              rating
            }
            matchedUser(username: $username) {
              submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
            }
          }
        `,
        variables: { username: LEET_CODE_HANDLE },
      }),
    },
  );

  const contestRanking = response?.data?.userContestRanking;
  const submitStats = response?.data?.matchedUser?.submitStatsGlobal;
  const allSubmissions = submitStats?.acSubmissionNum?.find(
    (item) => item.difficulty === "All",
  );

  return {
    platform: "LeetCode",
    handle: LEET_CODE_HANDLE,
    profileUrl: LEET_CODE_PROFILE_URL,
    maxRating: contestRanking?.rating ?? null,
    totalSolved: allSubmissions?.count ?? null,
  };
}

export async function fetchContestStats(): Promise<ContestStats> {
  const [codeforces, leetcode] = await Promise.all([
    fetchCodeforcesStats().catch(() => fallbackStats.codeforces),
    fetchLeetCodeStats().catch(() => fallbackStats.leetcode),
  ]);

  return {
    codeforces,
    leetcode,
    updatedAt: new Date().toISOString(),
  };
}

export function formatContestRating(rating: number | null): string {
  if (rating === null || rating === undefined) return "—";
  return Math.round(rating).toLocaleString();
}

export function formatSolvedCount(count: number | null): string {
  if (count === null || count === undefined) return "—";
  return count.toLocaleString();
}
