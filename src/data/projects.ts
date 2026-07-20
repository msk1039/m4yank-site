export type Project = {
  slug: string;
  name: string;
  status: string;
  href: string;
  github?: string;
  readme?: string;
  headerImage: string;
  description: string;
  metrics: { label: string; value: string }[];
  highlights: string[];
  tags: string[];
  images: string[];
};

export const projects: Project[] = [
  {
    slug: "termcall",
    name: "TermCall",
    status: "In progress",
    href: "https://github.com/msk1039/termcall",
    github: "https://github.com/msk1039/termcall",
    headerImage:
      "https://private-user-images.githubusercontent.com/136225954/621736826-088ff2d4-c0fd-455b-89be-7407a1d8cbb8.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3ODQ1NDkyNDUsIm5iZiI6MTc4NDU0ODk0NSwicGF0aCI6Ii8xMzYyMjU5NTQvNjIxNzM2ODI2LTA4OGZmMmQ0LWMwZmQtNDU1Yi04OWJlLTc0MDdhMWQ4Y2JiOC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwNzIwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDcyMFQxMjAyMjVaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1lZTE5ZWYxNzE2Njg3NDkxNmFmMWU4NmZiYTIxYjA3NzE5YzY3YTcyZjk3Mjc2ZWNjOWJjZmZmYzcxYTE0Y2E4JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZyZXNwb25zZS1jb250ZW50LXR5cGU9aW1hZ2UlMkZwbmcifQ.bghyDiBKYEDuzHOR_e9acSAykZMDnQtDYbb9VjzgAGU",
    description:
      "Terminal-based P2P video calling app that renders live webcam feeds as ASCII art and streams them over WebRTC data channels.",
    metrics: [
      { label: "Stack", value: "Go · WebRTC · Terminal UI" },
      { label: "Bitrate", value: "~100 kbps" },
    ],
    highlights: [
      // "Built a low-latency WebRTC media pipeline that converts live webcam feeds into ASCII text and streams them over unreliable data channels.",
      "Engineered a full-mesh network topology with a custom embedded STUN/TURN server, enabling complex NAT traversal and bypassing strict ISP firewalls by encapsulating P2P traffic over TCP port 443.",
      // "Designed a concurrent, event-driven terminal UI capable of rendering asynchronous video frames, live bandwidth analytics, and active speaker visualizers without blocking the main application thread.",
    ],
    tags: ["Go", "WebRTC", "P2P", "Terminal UI", "Networking"],
    images: [],
  },
  {
    slug: "latexai",
    name: "LaTeXAI",
    status: "Live",
    href: "https://latex-editor-two.vercel.app/",
    github: "https://github.com/msk1039/latex-editor",
    headerImage:
      "https://res.cloudinary.com/dvdcl3ozp/image/upload/v1784043616/projects/latex-ai/demo-images/Screenshot_2026-07-14_at_9.09.44_PM_qfwgw2.png",
    description:
      "AI-powered online LaTeX document IDE that lets users write, compile, and iterate on documents in-browser with an AI assistant.",
    metrics: [
      { label: "Stack", value: "TypeScript · Node.js · REST API" },
      { label: "Infra", value: "AWS EC2" },
    ],
    highlights: [
      // "Built a full-stack LaTeX IDE with integrated AI agent, enabling users to write and compile documents in-browser.",
      "Maintained per-session conversation history to give the AI context across edits, enabling iterative document refinement without repeating instructions.",
      // "Wrote a Node.js backend service to handle concurrent LaTeX-to-PDF compilation requests, exposed via REST API and deployed on AWS EC2.",
    ],
    tags: ["TypeScript", "Node.js", "LaTeX", "AI", "AWS EC2"],
    images: [
      "https://res.cloudinary.com/dvdcl3ozp/image/upload/v1784043616/projects/latex-ai/demo-images/Screenshot_2026-07-14_at_9.09.44_PM_qfwgw2.png",
      "https://res.cloudinary.com/dvdcl3ozp/image/upload/v1784043615/projects/latex-ai/demo-images/Screenshot_2026-07-14_at_9.08.24_PM_ifi120.png",
      "https://res.cloudinary.com/dvdcl3ozp/image/upload/v1784043615/projects/latex-ai/demo-images/Screenshot_2026-07-14_at_9.08.37_PM_ahgsgc.png",
    ],
  },
  {
    slug: "redis-go",
    name: "Redis-inspired KV Store",
    status: "Live",
    href: "https://github.com/msk1039/redis-go",
    github: "https://github.com/msk1039/redis-go",
    headerImage:
      "https://i.pinimg.com/1200x/d6/b1/42/d6b142d04c2ff9cc43616cedcc785a62.jpg",
    description:
      "Redis-inspired in-memory key-value database in Go implementing RESP parsing/serialization and core commands.",
    metrics: [
      { label: "Stack", value: "Go · TCP · RESP" },
      { label: "Concurrency", value: "sync.Mutex" },
    ],
    highlights: [
      // "Built a Redis-inspired in-memory key-value database in Go implementing RESP parsing/serialization and core commands (PING, ECHO, SET, GET, TTL).",
      "Ensured concurrent-safe access using Go’s sync.Mutex, with support for key expiration and TTL handling.",
    ],
    tags: ["Go", "Redis", "RESP", "Systems", "Concurrency"],
    images: [
      "https://i.pinimg.com/736x/c9/9e/2f/c99e2f8f98679922287e1016db704b69.jpg",
    ],
  },
];
