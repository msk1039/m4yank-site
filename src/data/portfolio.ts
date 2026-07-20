export type SiteLink = {
  href: string;
  label: string;
  pdf?: string;
};

export type HeroStat = {
  label: string;
  value: string;
};

export type Role = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
};

export type Talk = {
  title: string;
  event: string;
  date: string;
  href: string;
  description: string;
};

export type Contribution = {
  title: string;
  href: string;
  context: string;
};

export type ContactLink = {
  label: string;
  href: string;
  copy: string;
};

export type NavItem = {
  href: string;
  label: string;
};

export const siteLinks: {
  primaryCta: SiteLink;
  resume: Required<SiteLink>;
  github: SiteLink;
  linkedin: SiteLink;
  x: SiteLink;
} = {
  primaryCta: { href: "/contact", label: "Get in touch" },
  resume: {
    href: "/resume",
    label: "View resume",
    pdf: "https://cdn.jsdelivr.net/gh/msk1039/msk1039@main/mayank-resume.pdf",
  },
  github: { href: "https://github.com/msk1039", label: "GitHub" },
  linkedin: {
    href: "https://www.linkedin.com/in/mayank-kadam-82a60227a/",
    label: "LinkedIn",
  },
  x: { href: "https://x.com/MayankK51049579", label: "X/Twitter" },
};

export const heroStats: HeroStat[] = [
  { label: "DSA problems solved across platforms", value: "500+" },
  { label: "projects shipped from 0→1", value: "3+" },
  { label: "peak rating on Codeforces", value: "1036" },
];

export const roles: Role[] = [
  {
    company: "GDGC PCCOE",
    role: "Frontend Developer & Designer",
    period: "2024 to 2025",
    location: "Pune, India",
    summary:
      "Volunteered as a frontend developer and designer for the Google Developer Group on campus, helping build the club site and organize events.",
    highlights: [
      "Built and maintained the club website (gdgcpccoe.org) using modern web tooling and design patterns.",
      "Organised a state-level inter-college coding contest during the annual tech fest, bringing in 200+ participants across different institutes.",
      "Collaborated with the team on event branding, web presence, and frontend implementation for club initiatives.",
    ],
  },
];

export const talks: Talk[] = [];

export const contributions: Contribution[] = [];

export const contactLinks: ContactLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/msk1039",
    copy: "Open source work, side projects, and systems experiments.",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mayank-kadam-82a60227a/",
    copy: "Professional profile and current work context.",
  },
  {
    label: "X/Twitter",
    href: "https://x.com/MayankK51049579",
    copy: "Thoughts, links, and occasional project observations.",
  },
];

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/notebook", label: "Notebook" },
  { href: "/blog", label: "Blog" },
  { href: "/gist", label: "Gist" },
  { href: "/contact", label: "Contact" },
];

// Derived from the central identity config so the contact email stays in
// sync with structured data. Prefer importing `siteConfig.email` directly.
export const contactEmail = "hello@m4yank.com";

export function hostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function screenshotUrl(url: string): string {
  const params = new URLSearchParams({
    url,
    screenshot: "true",
    meta: "false",
    embed: "screenshot.url",
    "viewport.width": "1440",
    "viewport.height": "900",
    "viewport.deviceScaleFactor": "2",
    waitForTimeout: "1500",
  });
  return `https://api.microlink.io/?${params.toString()}`;
}
