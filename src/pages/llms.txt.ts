import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { projects } from "../data/projects";
import { absoluteUrl, getSiteOrigin, siteConfig } from "../lib/seo";

export const prerender = true;

function gistDate(data: { datePublished?: Date; date?: Date }): Date {
  return data.datePublished ?? data.date ?? new Date(0);
}

export const GET: APIRoute = async ({ site }) => {
  const origin = getSiteOrigin(site);

  const posts = (await getCollection("posts")).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
  const gists = (await getCollection("gists"))
    .filter((gist) => gist.data.isPublic)
    .sort((a, b) => gistDate(b.data).getTime() - gistDate(a.data).getTime());

  const sections = [
    "## Pages",
    "",
    `- [Work](${absoluteUrl("/work", site)}): Product and engineering work across startup environments.`,
    `- [Projects](${absoluteUrl("/projects", site)}): Selected projects with build notes and READMEs.`,
    `- [Notebook](${absoluteUrl("/notebook", site)}): Notes, learnings, and references I keep coming back to.`,
    `- [Blog](${absoluteUrl("/blog", site)}): Engineering notes, journeys, and deep dives.`,
    `- [Gists](${absoluteUrl("/gist", site)}): Short code snippets and quick solutions.`,
    `- [Contact](${absoluteUrl("/contact", site)}): Get in touch.`,
    "",
    "## Projects",
    "",
    ...projects.map(
      (project) =>
        `- [${project.name}](${absoluteUrl(`/projects/${project.slug}`, site)}): ${project.description} (${project.metrics.map((m) => `${m.label}: ${m.value}`).join(" · ")}).`,
    ),
    "",
    "## Writing",
    "",
    ...posts.map(
      (post) =>
        `- [${post.data.title}](${absoluteUrl(`/blog/${post.id}`, site)}): ${post.data.description}`,
    ),
    "",
    "## Gists",
    "",
    ...gists.map(
      (gist) =>
        `- [${gist.data.title}](${absoluteUrl(`/gist/${gist.id}`, site)})${gist.data.description ? `: ${gist.data.description}` : ""}`,
    ),
  ].join("\n");

  const body = `# ${siteConfig.name}

> ${siteConfig.description}

Hi — I'm ${siteConfig.name}, a ${siteConfig.currentRole.title} at ${siteConfig.currentRole.company}. I build systems and interfaces, from terminal-based WebRTC apps to AI-powered developer tools. This site collects my work, projects, writing, and code gists.

${sections}

## Citation Facts

- Official site: ${origin}/
- Author: ${siteConfig.name}
- Location: ${siteConfig.location.city}, ${siteConfig.location.region}, ${siteConfig.location.country}
- Current role: ${siteConfig.currentRole.title} at ${siteConfig.currentRole.company}
- Links: ${siteConfig.sameAs.join(", ")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
