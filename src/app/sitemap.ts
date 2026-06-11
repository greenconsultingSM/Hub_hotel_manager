import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getPillar, getSpokes, type Article } from "@/lib/articles";
import { getIndexablePosts } from "@/lib/magazine";

// Sitemap — SOLO le pagine indicizzabili (index: sì).
// Escluse di proposito le noindex,follow: legali (privacy/cookie/termini),
// pagine tag e categorie del Magazine con meno di 2 articoli (thin content:
// utili alla navigazione, fuori dall'indice finché non si popolano).
// Il calcolatore commissioni OTA è indicizzato dal 2026-06-09 (go-live).
// Vedi seo-geo-tecnico.md §A/§E.
// lastModified: dal frontmatter `updated`/`dateModified` per gli articoli;
// data di lancio per le landing statiche (bump manuale quando il contenuto cambia).

const LAUNCH = "2026-06-08";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;

  const magazinePosts = getIndexablePosts();
  // Gli indici aggregatori si "muovono" con l'articolo più recente.
  const latestMagazine =
    magazinePosts[0]?.frontmatter.dateModified ?? magazinePosts[0]?.frontmatter.datePublished ?? LAUNCH;

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: LAUNCH, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/chi-siamo`, lastModified: LAUNCH, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/glossario`, lastModified: LAUNCH, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/glossario/disintermediazione`, lastModified: LAUNCH, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/risorse`, lastModified: latestMagazine, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/risorse/guida-disintermediazione`, lastModified: LAUNCH, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/risorse/magazine`, lastModified: latestMagazine, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/strumenti/calcolatore-commissioni-ota`, lastModified: "2026-06-09", changeFrequency: "monthly", priority: 0.7 },
  ];

  const articles: MetadataRoute.Sitemap = [getPillar(), ...getSpokes()]
    .filter((a): a is Article => a !== null && a.frontmatter.index !== false)
    .map((a) => ({
      url: `${base}${a.href}`,
      lastModified: a.frontmatter.updated ?? LAUNCH,
      changeFrequency: "monthly" as const,
      priority: a.isPillar ? 0.9 : 0.8,
    }));

  const magazine: MetadataRoute.Sitemap = magazinePosts.map((p) => ({
    url: `${base}${p.href}`,
    lastModified: p.frontmatter.dateModified ?? p.frontmatter.datePublished ?? LAUNCH,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...articles, ...magazine];
}
