import { SITE } from "@/lib/site";
import { getIndexablePosts, MAGAZINE_BASE } from "@/lib/magazine";

// Feed RSS 2.0 del Magazine: solo i pezzi indicizzabili, dal più recente.
// Si aggiorna da solo a ogni nuovo articolo. Discovery via <link alternate>
// nella pagina /risorse/magazine.

export const dynamic = "force-static";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(iso?: string): string {
  if (!iso) return "";
  try {
    return new Date(iso).toUTCString();
  } catch {
    return "";
  }
}

export function GET() {
  const base = SITE.url;
  const feedUrl = `${base}${MAGAZINE_BASE}/feed.xml`;
  const posts = getIndexablePosts();

  const items = posts
    .map((p) => {
      const fm = p.frontmatter;
      const url = `${base}${p.href}`;
      const date = rfc822(fm.datePublished);
      const desc = fm.sintesi ?? fm.descrizione ?? "";
      return `    <item>
      <title>${esc(fm.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>${date ? `\n      <pubDate>${date}</pubDate>` : ""}
      <description>${esc(desc)}</description>
    </item>`;
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE.name)} — Magazine</title>
    <link>${base}${MAGAZINE_BASE}</link>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <description>Notizie e analisi di settore per l'albergatore italiano: OTA, mercato, fisco, marketing e tecnologia.</description>
    <language>it-IT</language>
${items}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: { "content-type": "application/rss+xml; charset=utf-8" },
  });
}
