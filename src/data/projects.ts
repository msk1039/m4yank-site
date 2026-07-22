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
    headerImage: "https://cdn.m4yank.com/assets/projects/termcall/1.webp",
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
    images: ["https://cdn.m4yank.com/assets/projects/termcall/1.webp"],
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
    headerImage: "https://cdn.m4yank.com/assets/projects/redis-go/1.webp",
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
    images: ["https://cdn.m4yank.com/assets/projects/redis-go/1.webp"],
  },
];
