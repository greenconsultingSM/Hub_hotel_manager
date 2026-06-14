import { SITE } from "@/lib/site";
import { getPillar, getSpokes, type Article } from "@/lib/articles";
import { getIndexablePosts, MAGAZINE_BASE } from "@/lib/magazine";

// /llms-full.txt, versione estesa di /llms.txt (spec llmstxt.org): non solo
// l'indice, ma il TESTO COMPLETO dei contenuti pubblicati (guide + magazine),
// così un assistente AI può ingerire il corpus senza visitare ogni pagina.
// Generato dai contenuti reali: si aggiorna da solo. Vedi /llms.txt.

export const dynamic = "force-static";

const GUIDE_ORDER = ["come-pagare-meno-commissioni", "aumentare-prenotazioni-dirette"];
const rank = (slug: string) => {
  const i = GUIDE_ORDER.indexOf(slug);
  return i === -1 ? 999 : i;
};

// Ripulisce l'MDX in testo piano: via commenti, import/export e tag dei
// componenti React (DiagramBars, CtaWaitlist, ...), che non sono prosa.
function toPlain(mdx: string): string {
  return mdx
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/^(?:import|export) .*$/gm, "")
    .replace(/<[A-Z][A-Za-z0-9]*[\s\S]*?\/>/g, "")
    .replace(/<\/?[A-Z][A-Za-z0-9]*[^>]*>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function guideBlock(a: Article): string {
  const fm = a.frontmatter;
  const faq =
    a.faq.length > 0
      ? `\n\n### Domande frequenti\n${a.faq.map((f) => `**${f.q}**\n${f.a}`).join("\n\n")}`
      : "";
  return `# ${fm.title}\n${SITE.url}${a.href}\n\n${fm.descrizione ?? ""}\n\n${toPlain(a.body)}${faq}`;
}

export function GET() {
  const base = SITE.url;
  const pillar = getPillar();
  const spokes = [...getSpokes()].sort((a, b) => rank(a.slug) - rank(b.slug));
  const guides = [pillar, ...spokes].filter(
    (a): a is Article => a !== null && a.frontmatter.index !== false,
  );

  const guideText = guides.map(guideBlock).join("\n\n---\n\n");

  const magazineText = getIndexablePosts()
    .map((p) => {
      const fm = p.frontmatter;
      const date = (fm.datePublished ?? "").slice(0, 10);
      return `# ${fm.title}\n${base}${p.href}${date ? ` (${date})` : ""}\n\n${
        fm.sintesi ?? fm.descrizione ?? ""
      }\n\n${toPlain(p.body)}`;
    })
    .join("\n\n---\n\n");

  const body = `# ${SITE.name} — corpus completo

> Versione estesa di ${base}/llms.txt: il testo integrale delle guide e degli
> articoli del Magazine pubblicati su Hub Hotel Manager. Un progetto di Green
> Consulting e Tourism Innovation Lab. I contenuti fiscali hanno scopo
> informativo: verifica sempre la tua posizione con il commercialista.

# Guide

${guideText}

---

# Magazine

${magazineText}
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
