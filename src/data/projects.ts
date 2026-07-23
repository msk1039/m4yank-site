export type Project = {
  slug: string;
  name: string;
  status: string;
  href: string;
  github?: string;
  readme?: string;
  featured?: boolean;
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
    featured: true,
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
    featured: true,
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
    featured: true,
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

  {
    slug: "gitmap",
    name: "Gitmap - Minimal Project Manager",
    status: "Live",
    featured: true,
    href: "https://github.com/msk1039/gitmap",
    github: "https://github.com/msk1039/gitmap",
    headerImage: "https://cdn.m4yank.com/assets/projects/gitmap/1.webp",
    description:
      "A smart tool to discover, organize, and clean your local Git projects. Easily delete unused node_modules. No more hunting through folders.",
    metrics: [{ label: "Stack", value: "Rust · TypeScript · Tauri" }],
    highlights: [
      // "Built a Redis-inspired in-memory key-value database in Go implementing RESP parsing/serialization and core commands (PING, ECHO, SET, GET, TTL).",
      "Architected a high-performance local repository manager, reducing path search times from *850ms to 2ms (a 425x improvement)* using *Trie traversal* instead of linear scanning",
      "Implemented a Trie (Prefix Tree) in Rust to accelerate hierarchical path-based searches, reducing time complexity from *O(n*m) to O(m)* and improving memory efficiency by 40%.",
      "Developed a thread-safe LRU cache to minimize disk I/O, achieving a 95%+ hit ratio and transforming repository access from a linear O(n) operation to a constant-time O(1) lookup.",
    ],
    tags: ["Trie (Prefix Tree)", "Rust", "Typescript", "Tauri"],
    images: ["https://cdn.m4yank.com/assets/projects/gitmap/1.webp"],
  },
];
