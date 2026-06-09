import type { ReactNode } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { CLUSTER, type Article } from "@/lib/articles";

function formatDate(iso?: string): string {
  if (!iso) return "";
  try {
    return new Date(`${iso}T12:00:00`).toLocaleDateString("it-IT", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function ArticleView({
  article,
  related,
  mdxContent,
}: {
  article: Article;
  related: Article[];
  mdxContent: ReactNode;
}) {
  const fm = article.frontmatter;
  const url = `${SITE.url}${article.href}`;
  const updated = formatDate(fm.updated);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: fm.title,
    description: fm.descrizione,
    inLanguage: "it-IT",
    ...(fm.updated ? { datePublished: fm.updated, dateModified: fm.updated } : {}),
    author: { "@type": "Organization", name: "Redazione Hub Hotel Manager" },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    mainEntityOfPage: url,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
      ...(article.isPillar
        ? []
        : [{ "@type": "ListItem", position: 2, name: CLUSTER.title, item: `${SITE.url}/${CLUSTER.slug}` }]),
      { "@type": "ListItem", position: article.isPillar ? 2 : 3, name: fm.title, item: url },
    ],
  };

  const faqLd =
    article.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <>
      <JsonLd data={faqLd ? [articleLd, breadcrumbLd, faqLd] : [articleLd, breadcrumbLd]} />

      <div className="wrap">
        <nav className="breadcrumb" aria-label="Percorso">
          <div className="crumbs">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            {article.isPillar ? (
              <span className="cur">{CLUSTER.title}</span>
            ) : (
              <>
                <Link href={`/${CLUSTER.slug}`}>{CLUSTER.title}</Link>
                <span className="sep">/</span>
                <span className="cur">{fm.title}</span>
              </>
            )}
          </div>
        </nav>

        <header className="pillar-head">
          <span className="badge amber">
            <Icon name="compass" /> {CLUSTER.badge}
          </span>
          <h1>{fm.title}</h1>
          {fm.descrizione && <p className="intro">{fm.descrizione}</p>}
          <div className="pillar-meta">
            <span>{article.readingMinutes} min di lettura</span>
            <span className="dot" />
            <span>{CLUSTER.title}</span>
            {updated && (
              <>
                <span className="dot" />
                <span>Ultima verifica: {updated}</span>
              </>
            )}
          </div>
        </header>
      </div>

      <div className="wrap">
        <div className="guide-wrap">
          <div className="prose">{mdxContent}</div>

          {article.toc.length > 0 && (
            <aside className="toc" aria-label="Indice">
              <h5>In questa guida</h5>
              {article.toc.map((t) => (
                <a key={t.id} href={`#${t.id}`}>
                  {t.text}
                </a>
              ))}
            </aside>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="band gray">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Continua</span>
              <h2 style={{ marginTop: 14 }}>{article.isPillar ? "Approfondisci il cluster" : "Altri contenuti del cluster"}</h2>
            </div>
            <div className="spoke-grid">
              {related.map((a) => (
                <Link className="spoke" key={a.slug} href={a.href}>
                  <span className="badge amber">
                    <Icon name="compass" /> {CLUSTER.badge}
                  </span>
                  <h3>{a.frontmatter.title}</h3>
                  <div className="s-meta">
                    <span>{a.readingMinutes} min</span>
                    <span className="s-arrow">
                      <Icon name="arrow" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
