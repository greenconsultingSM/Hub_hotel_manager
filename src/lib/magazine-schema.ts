import { SITE } from "./site";
import { categoriaLabel, coverUrl, type MagazinePost } from "./magazine";

// Builder JSON-LD per il Magazine. NewsArticle sulle news (unico eleggibile a
// Top Stories), Article sugli evergreen; CollectionPage+ItemList sulle liste;
// FAQPage quando il pezzo ha una sezione FAQ. Il BreadcrumbList lo emette il
// componente <Breadcrumb> della pagina.

export function articleSchema(post: MagazinePost): Record<string, unknown> {
  const fm = post.frontmatter;
  const url = `${SITE.url}${post.href}`;
  const img = coverUrl(fm.cover, SITE.url);
  return {
    "@context": "https://schema.org",
    "@type": fm.contentType === "news" ? "NewsArticle" : "Article",
    headline: fm.title,
    description: fm.descrizione ?? fm.sintesi,
    inLanguage: "it-IT",
    ...(fm.datePublished ? { datePublished: fm.datePublished } : {}),
    dateModified: fm.dateModified ?? fm.datePublished,
    ...(img ? { image: [img] } : {}),
    author: { "@type": "Organization", name: fm.autore ?? "Team Hub Hotel Manager", url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    mainEntityOfPage: url,
    articleSection: categoriaLabel(fm.categoria),
    ...(fm.tags && fm.tags.length ? { keywords: fm.tags.join(", ") } : {}),
  };
}

export function faqSchema(post: MagazinePost): Record<string, unknown> | null {
  if (post.faq.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function collectionSchema(name: string, pathname: string, posts: MagazinePost[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    url: `${SITE.url}${pathname}`,
    inLanguage: "it-IT",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE.url}${p.href}`,
        name: p.frontmatter.title,
      })),
    },
  };
}
