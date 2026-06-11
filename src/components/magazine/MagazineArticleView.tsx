import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SITE } from "@/lib/site";
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
            <div className="mag-hero-cover">
              <Image
                src={fm.cover}
                alt={fm.title}
                fill
                priority
                sizes="(max-width: 1100px) 100vw, 1060px"
                style={{ objectFit: "cover" }}
              />
            </div>
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

              {/* Chi scrive (E-E-A-T): stessa entità dell'author nello schema. */}
              <aside className="author-box" aria-label="Chi scrive">
                <span className="author-ico">
                  <Icon name="users" />
                </span>
                <div>
                  <strong>{fm.autore ?? "Redazione Hub Hotel Manager"}</strong>
                  <p>
                    Contenuti curati con{" "}
                    <a href={SITE.partners[0].url} target="_blank" rel="noopener">Green Consulting</a> e{" "}
                    <a href={SITE.partners[1].url} target="_blank" rel="noopener">Staymore</a>, realtà che lavorano
                    ogni giorno con gli hotel indipendenti italiani. <Link href="/chi-siamo">Scopri chi siamo</Link>.
                  </p>
                </div>
              </aside>
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
