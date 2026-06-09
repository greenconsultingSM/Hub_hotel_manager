import type { ReactNode } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/Icon";
import { getCategoria } from "@/lib/taxonomy";
import { formatDate, MAGAZINE_BASE, type MagazinePost } from "@/lib/magazine";
import { articleSchema, faqSchema } from "@/lib/magazine-schema";
import { DallaGuidaBox } from "./DallaGuidaBox";
import { ArticleCta } from "./ArticleCta";
import { RelatedCarousel } from "./RelatedCarousel";

export function MagazineArticleView({
  post,
  related,
  mdxContent,
}: {
  post: MagazinePost;
  related: MagazinePost[];
  mdxContent: ReactNode;
}) {
  const fm = post.frontmatter;
  const cat = getCategoria(fm.categoria);
  const isNews = fm.contentType === "news";

  const schema: Record<string, unknown>[] = [articleSchema(post)];
  const faq = faqSchema(post);
  if (faq) schema.push(faq);

  return (
    <>
      <JsonLd data={schema} />

      <div className="wrap">
        <Breadcrumb
          items={[
            { name: "Home", href: "/" },
            { name: "Risorse", href: "/risorse" },
            { name: "Magazine", href: MAGAZINE_BASE },
            { name: fm.title },
          ]}
        />
      </div>

      <section className="band">
        <div className="wrap">
          <header className="pillar-head mag-head">
            <span className={`badge ${cat?.color ?? "blue"}`}>
              {cat?.icon && <Icon name={cat.icon} />} {cat?.label ?? fm.categoria}
            </span>
            <h1>{fm.title}</h1>
            {fm.descrizione && <p className="intro">{fm.descrizione}</p>}
            <div className="pillar-meta">
              <span>{isNews ? "Notizia" : "Analisi"}</span>
              {fm.datePublished && (
                <>
                  <span className="dot" />
                  <span>{formatDate(fm.datePublished)}</span>
                </>
              )}
              <span className="dot" />
              <span>{post.readingMinutes} min di lettura</span>
              {fm.autore && (
                <>
                  <span className="dot" />
                  <span>{fm.autore}</span>
                </>
              )}
            </div>
          </header>

          {fm.cover && (
            <div className="mag-hero-cover" style={{ backgroundImage: `url(${fm.cover})` }} role="img" aria-label={fm.title} />
          )}

          {isNews && (
            <p className="news-banner">
              <Icon name="clock" /> Notizia del {formatDate(fm.datePublished)}
              {fm.dateModified && fm.dateModified !== fm.datePublished && <> · ultima verifica {formatDate(fm.dateModified)}</>}
            </p>
          )}

          {fm.sintesi && (
            <blockquote className="mag-sintesi">
              <strong>In breve.</strong> {fm.sintesi}
            </blockquote>
          )}

          <div className="guide-wrap">
            <div className="mag-main">
              <div className="prose">{mdxContent}</div>
              <DallaGuidaBox post={post} />
            </div>

            {post.toc.length > 0 && (
              <aside className="toc" aria-label="Indice">
                <h5>In questo articolo</h5>
                {post.toc.map((t) => (
                  <a key={t.id} href={`#${t.id}`}>
                    {t.text}
                  </a>
                ))}
              </aside>
            )}
          </div>
        </div>
      </section>

      <ArticleCta cta={fm.cta} categoria={fm.categoria} />
      <RelatedCarousel posts={related} />
    </>
  );
}
