import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { Faq } from "@/components/Faq";
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

// Autore "redazione estesa" (E-E-A-T): stessa entità in schema e in pagina,
// agganciata all'Organization del layout via @id e sameAs dei partner.
const AUTHOR_LD = {
  "@type": "Organization",
  "@id": `${SITE.url}/#redazione`,
  name: "Redazione Hub Hotel Manager",
  url: `${SITE.url}/chi-siamo`,
  description:
    "La redazione di Hub Hotel Manager: contenuti curati con Green Consulting e Tourism Innovation Lab, realtà che lavorano ogni giorno con gli hotel indipendenti italiani.",
  sameAs: SITE.partners.map((p) => p.url),
  parentOrganization: { "@id": `${SITE.url}/#organization` },
};

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
  const isTofu = (fm.funnel ?? "").toUpperCase() === "TOFU";

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: fm.title,
    description: fm.descrizione,
    inLanguage: "it-IT",
    ...(fm.updated ? { datePublished: fm.updated, dateModified: fm.updated } : {}),
    ...(fm.cover ? { image: `${SITE.url}${fm.cover}` } : {}),
    author: AUTHOR_LD,
    publisher: {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
      logo: { "@type": "ImageObject", url: `${SITE.url}/opengraph-image` },
    },
    mainEntityOfPage: url,
    speakable: { "@type": "SpeakableSpecification", cssSelector: [".pillar-head h1", ".pillar-head .intro"] },
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

        {fm.cover && (
          <div className="guide-hero-cover">
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

        {/* Chi scrive (E-E-A-T): stessa entità dell'author nello schema. */}
        <aside className="author-box" aria-label="Chi scrive">
          <span className="author-ico">
            <Icon name="users" />
          </span>
          <div>
            <strong>Redazione Hub Hotel Manager</strong>
            <p>
              Contenuti curati con <a href={SITE.partners[0].url} target="_blank" rel="noopener">Green Consulting</a> e{" "}
              <a href={SITE.partners[1].url} target="_blank" rel="noopener">Tourism Innovation Lab</a>, realtà che lavorano ogni
              giorno con gli hotel indipendenti italiani. <Link href="/chi-siamo">Scopri chi siamo</Link>.
            </p>
          </div>
        </aside>
      </div>

      {/* FAQ collassabili: stesse coppie del JSON-LD FAQPage (article.faq).
          L'id combacia con lo slug TOC "Domande frequenti" → "domande-frequenti". */}
      {article.faq.length > 0 && (
        <div className="wrap">
          <h2 id="domande-frequenti" className="faq-articolo-title">
            Domande frequenti
          </h2>
          <Faq items={article.faq} />
        </div>
      )}

      {/* CTA per stadio di funnel: il TOFU (pilastro) spinge al calcolatore,
          che rende il problema concreto; nei MOFU resta la cattura email
          inline (CtaWaitlist) e un rimando contestuale allo strumento. */}
      {isTofu ? (
        <section className="band dark">
          <div className="wrap calc-cta">
            <h2>Quanto ti costano davvero le OTA?</h2>
            <p className="lead">
              Mettici i tuoi numeri: il calcolatore ti mostra in due minuti quanto paghi di commissioni ogni anno e
              quanto recupereresti spostando prenotazioni sul canale diretto. Gratis, senza registrazione.
            </p>
            <Link className="btn btn-primary" href="/strumenti/calcolatore-commissioni-ota">
              Calcola le tue commissioni <Icon name="arrow" />
            </Link>
          </div>
        </section>
      ) : (
        <div className="wrap">
          <p className="tool-note">
            <Icon name="calc" /> Vuoi capire quanto pesano questi numeri sulla tua struttura?{" "}
            <Link href="/strumenti/calcolatore-commissioni-ota">Prova il calcolatore commissioni OTA</Link>: gratuito,
            senza registrazione.
          </p>
        </div>
      )}

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
                  {a.frontmatter.cover && (
                    <span className="spoke-cover" style={{ backgroundImage: `url(${a.frontmatter.cover})` }} />
                  )}
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
