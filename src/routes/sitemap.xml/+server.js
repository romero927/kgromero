import { seoData } from "$lib/seoData";

// Generated at build time so lastmod always reflects the latest deploy.
export const prerender = true;

const pages = [
  { path: "/", priority: "1.0" },
  { path: "/api-docs", priority: "0.5" },
];

export function GET() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = pages
    .map(
      ({ path, priority }) => `  <url>
    <loc>${seoData.siteUrl}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`,
    )
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
    { headers: { "Content-Type": "application/xml" } },
  );
}
