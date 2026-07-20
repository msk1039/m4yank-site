import type { APIRoute } from "astro";
import { fetchContestStats } from "../../lib/contest";

export const prerender = true;

export const GET: APIRoute = async () => {
  const stats = await fetchContestStats();

  return new Response(JSON.stringify(stats, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
};
