export type SitePage = {
  path: string;
  changefreq: "weekly" | "monthly";
  priority: number;
};

export const siteConfig = {
  name: "Mayank Kadam",
  shortName: "Mayank Kadam",
  tagline: "CS undergrad building systems and interfaces",
  description:
    "CS undergrad building systems and interfaces, from terminal-based WebRTC apps to AI-powered developer tools.",
  url: "https://m4yank.com",
  language: "en",
  locale: "en_US",
  themeColor: "#0a0a0a",
  defaultImage: "/og.png",
  twitter: "@MayankK51049579",
  // Centralized identity — the single source of truth so author name,
  // email, and location never drift between pages and structured data.
  email: "mayank@example.com",
  location: {
    city: "Pune",
    region: "Maharashtra",
    country: "India",
    countryCode: "IN",
    /** IANA timezone, used for availability windows and schema. */
    timezone: "Asia/Kolkata",
    /** Human-readable offset label for the homepage availability block. */
    timezoneLabel: "IST (UTC+5:30)",
  },
  currentRole: {
    title: "CS Undergrad",
    company: "PCCOE",
    url: "https://www.pccoepune.com/",
  },
  sameAs: [
    "https://github.com/msk1039",
    "https://www.linkedin.com/in/mayank-kadam-82a60227a/",
    "https://x.com/MayankK51049579",
  ],
  alumniOf: [
    {
      name: "Pimpri Chinchwad College of Engineering, Pune",
      url: "https://www.pccoepune.com/",
      area: "Information Technology",
      studyType: "Bachelor of Technology",
    },
  ],
} as const;

export const sitePages = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/work", changefreq: "monthly", priority: 0.9 },
  { path: "/projects", changefreq: "monthly", priority: 0.9 },
  { path: "/art", changefreq: "weekly", priority: 0.8 },
  { path: "/notebook", changefreq: "weekly", priority: 0.8 },
  { path: "/blog", changefreq: "weekly", priority: 0.8 },
  { path: "/gist", changefreq: "weekly", priority: 0.8 },
  { path: "/contact", changefreq: "monthly", priority: 0.6 },
] satisfies SitePage[];

export const defaultKeywords = [
  "Mayank Kadam",
  "CS undergrad",
  "Go",
  "TypeScript",
  "systems programming",
  "WebRTC",
  "Next.js",
  "React",
];

export function normalizePath(path: string) {
  if (path === "/") return path;
  return path.replace(/\/$/, "");
}

export function getSitePage(path: string) {
  const normalized = normalizePath(path);
  if (normalized.startsWith("/blog/"))
    return { path: normalized, changefreq: "monthly", priority: 0.7 } as const;
  if (normalized.startsWith("/gist/"))
    return { path: normalized, changefreq: "monthly", priority: 0.6 } as const;
  if (normalized.startsWith("/projects/"))
    return { path: normalized, changefreq: "monthly", priority: 0.8 } as const;
  const segments = normalized.split("/").filter(Boolean);
  if (
    segments.length === 1 &&
    !sitePages.some((p) => p.path === `/${segments[0]}`)
  ) {
    return {
      path: normalized,
      changefreq: "monthly",
      priority: 0.9,
    } as const;
  }
  if (
    segments.length === 2 &&
    (segments[1] === "support" || segments[1] === "privacy") &&
    !sitePages.some((p) => p.path === `/${segments[0]}`)
  ) {
    return {
      path: normalized,
      changefreq: "monthly",
      priority: 0.6,
    } as const;
  }
  return sitePages.find((page) => page.path === normalized);
}

export function getSiteOrigin(site?: URL | null) {
  return new URL(site?.toString() ?? siteConfig.url).origin;
}

export function absoluteUrl(path: string, site?: URL | null) {
  return new URL(path, `${getSiteOrigin(site)}/`).toString();
}

/**
 * Minimal Person reference for embedded `author` fields. Use this inside
 * Article/Blog/etc. schemas so every page points at the same `@id` and the
 * canonical Person entity, instead of re-declaring a free-standing one.
 */
export function buildPersonRef(site?: URL | null) {
  const origin = getSiteOrigin(site);
  return {
    "@type": "Person",
    "@id": `${origin}/#person`,
    name: siteConfig.name,
    url: `${origin}/`,
  };
}

export function buildPersonSchema(site?: URL | null) {
  const origin = getSiteOrigin(site);
  const { city, region, country } = siteConfig.location;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${origin}/#person`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    givenName: "Mayank",
    familyName: "Kadam",
    url: `${origin}/`,
    image: absoluteUrl(siteConfig.defaultImage, site),
    jobTitle: siteConfig.currentRole.title,
    description: siteConfig.description,
    email: `mailto:${siteConfig.email}`,
    gender: "Male",
    nationality: {
      "@type": "Country",
      name: country,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressRegion: region,
      addressCountry: country,
    },
    knowsAbout: [
      "Systems programming",
      "WebRTC",
      "Go",
      "TypeScript",
      "Next.js",
      "React",
      "Data structures and algorithms",
      "Cloud infrastructure",
    ],
    knowsLanguage: [
      { "@type": "Language", name: "English", alternateName: "en" },
      { "@type": "Language", name: "Hindi", alternateName: "hi" },
    ],
    alumniOf: siteConfig.alumniOf.map((school) => ({
      "@type": "EducationalOrganization",
      name: school.name,
      url: school.url,
      department: { "@type": "Organization", name: school.area },
    })),
    worksFor: {
      "@type": "Organization",
      name: siteConfig.currentRole.company,
      url: siteConfig.currentRole.url,
    },
    sameAs: [...siteConfig.sameAs],
  };
}

export function buildWebsiteSchema(site?: URL | null) {
  const origin = getSiteOrigin(site);

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${origin}/#website`,
    name: siteConfig.name,
    url: `${origin}/`,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: { "@id": `${origin}/#person` },
  };
}

/**
 * Google's recommended type for a personal site homepage. `ProfilePage`
 * paired with `Person` is what drives the Knowledge Panel and gives AI
 * assistants a clear "this is a person" signal to cite.
 */
export function buildProfilePageSchema(site?: URL | null) {
  const origin = getSiteOrigin(site);

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${origin}/#profilepage`,
    url: `${origin}/`,
    name: `${siteConfig.name} · ${siteConfig.currentRole.title}`,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": `${origin}/#website` },
    mainEntity: {
      "@id": `${origin}/#person`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(siteConfig.defaultImage, site),
    },
    about: { "@id": `${origin}/#person` },
  };
}
