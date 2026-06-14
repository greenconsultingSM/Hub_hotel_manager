import { SITE } from "@/lib/site";
import { getPillar, getSpokes, type Article } from "@/lib/articles";
import { getIndexablePosts, MAGAZINE_BASE } from "@/lib/magazine";

// /llms.txt, indice curato per gli assistenti AI (spec llmstxt.org).
// Generato da SITE.url + articoli REALMENTE pubblicati: elenca solo pagine
// esistenti (mai URL verso spoke non ancora portate → niente 404 che
// danneggerebbero la citabilità). Si aggiorna da solo a ogni nuovo articolo.
// Vedi seo-geo-tecnico.md §C.

export const dynamic = "force-static";

// Ordine di lettura curato delle guide (le sconosciute finiscono in coda).
const GUIDE_ORDER = ["come-pagare-meno-commissioni", "aumentare-prenotazioni-dirette"];
const rank = (slug: string) => {
  const i = GUIDE_ORDER.indexOf(slug);
  return i === -1 ? 999 : i;
};

export function GET() {
  const base = SITE.url;
  const pillar = getPillar();
  const spokes = [...getSpokes()].sort((a, b) => rank(a.slug) - rank(b.slug));

  const guides = [pillar, ...spokes].filter((a): a is Article => a !== null && a.frontmatter.index !== false);
  const guideLines = guides
    .map((a) => `- [${a.frontmatter.title}](${base}${a.href}): ${a.frontmatter.descrizione ?? ""}`.trimEnd())
    .join("\n");

  // Magazine: solo i pezzi indicizzabili, dal più recente. Si aggiorna da solo.
  const magazineLines = getIndexablePosts()
    .map((p) => {
      const date = (p.frontmatter.datePublished ?? "").slice(0, 10);
      const desc = p.frontmatter.sintesi ?? p.frontmatter.descrizione ?? "";
      return `- [${p.frontmatter.title}](${base}${p.href}): ${date ? `(${date}) ` : ""}${desc}`.trimEnd();
    })
    .join("\n");

  const body = `# ${SITE.name}

> Hub di contenuti indipendente per gli albergatori italiani: guide pratiche, strumenti e analisi su come ridurre le commissioni delle OTA (Booking, Expedia) e far crescere le prenotazioni dirette. Un progetto di Green Consulting e Tourism Innovation Lab.

Testo integrale dei contenuti: ${base}/llms-full.txt

## Guide alla disintermediazione e alle commissioni OTA
${guideLines}

## Strumenti
- [Calcolatore commissioni OTA](${base}/strumenti/calcolatore-commissioni-ota): strumento gratuito (nessuna registrazione) per stimare quanto si paga di commissioni alle OTA ogni anno e quanto si risparmierebbe, al netto dei costi del diretto, spostando prenotazioni sul canale diretto; include confronto canali OTA/diretto/Airbnb e payback del booking engine.

## Magazine, notizie e analisi di settore
- [Magazine](${base}${MAGAZINE_BASE}): notizie e analisi su distribuzione, OTA, AI e mercato alberghiero, lette per l'albergatore italiano.
${magazineLines}

## Glossario
- [Disintermediazione](${base}/glossario/disintermediazione): ridurre il ruolo degli intermediari (OTA) spostando la prenotazione sul canale diretto.

## Risorse
- [Guida gratuita alla disintermediazione](${base}/risorse/guida-disintermediazione): ebook pratico sulla disintermediazione, in arrivo (iscrizione via email).

## Chi siamo
- [Chi siamo](${base}/chi-siamo): la missione dell'hub e chi c'è dietro (Green Consulting e Tourism Innovation Lab).
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
