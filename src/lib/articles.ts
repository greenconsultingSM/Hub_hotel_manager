import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { slugify } from "./slug";

export const CLUSTER = {
  slug: "commissioni-ota",
  title: "Disintermediazione & OTA",
  badge: "Disintermediazione",
  color: "amber" as const,
};

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "disintermediazione");

export type Frontmatter = {
  title: string;
  slug: string;
  tipo: "pilastro" | "spoke";
  descrizione?: string;
  kw_primaria?: string;
  funnel?: string;
  destinazione?: string;
  updated?: string;
  autore?: string;
  // path relativo in /public (es. "/covers/<slug>.jpg"), 1600×900: hero 21:9,
  // thumb nelle card, og:image e schema. Assente → pagina senza hero.
  cover?: string;
  // index: false → pagina noindex,follow (es. bozza YMYL in attesa di validazione
  // di un commercialista): esclusa da sitemap e llms.txt, ma raggiungibile e crawlabile.
  index?: boolean;
  // featured: true → l'articolo entra nella vetrina curata in home (cap 4).
  // Selezione manuale: i nuovi contenuti NON entrano se non lo dichiarano.
  featured?: boolean;
  [key: string]: unknown;
};

export type TocItem = { id: string; text: string };
export type FaqItem = { q: string; a: string };

export type Article = {
  slug: string;
  isPillar: boolean;
  href: string;
  frontmatter: Frontmatter;
  body: string; // MDX pronto da compilare (senza frontmatter, H1, commenti)
  toc: TocItem[];
  faq: FaqItem[];
  readingMinutes: number;
};

function hrefFor(slug: string, isPillar: boolean): string {
  return isPillar ? `/${CLUSTER.slug}` : `/${CLUSTER.slug}/${slug}`;
}

// Estrae le voci ## per la TOC (id coerente con gli heading renderizzati).
function extractToc(body: string): TocItem[] {
  const out: TocItem[] = [];
  const re = /^##\s+(.+?)\s*$/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body))) {
    const text = m[1].replace(/[*_`]/g, "").trim();
    out.push({ id: slugify(text), text });
  }
  return out;
}

// Estrae le coppie domanda/risposta dalla sezione "Domande frequenti".
function extractFaq(body: string): FaqItem[] {
  const start = body.search(/^##\s+(Domande frequenti|FAQ)\b/im);
  if (start === -1) return [];
  let section = body.slice(start);
  // ferma alla sezione successiva o a una riga --- finale
  const next = section.slice(3).search(/^##\s+/m);
  if (next !== -1) section = section.slice(0, next + 3);
  const out: FaqItem[] = [];
  const re = /^\*\*(.+?)\*\*\s*\n([\s\S]+?)(?=\n\s*\*\*|\n\s*##|\n\s*---|\s*$)/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(section))) {
    const q = m[1].trim();
    const a = m[2].replace(/\s+/g, " ").trim();
    if (q.length > 3 && a.length > 0) out.push({ q, a });
  }
  return out;
}

// Rimuove la sezione "## Domande frequenti | FAQ" dal corpo: la FAQ viene
// renderizzata come accordion <Faq> in ArticleView (da article.faq), non come
// prosa. Stessa logica di delimitazione di extractFaq: dalla heading fino alla
// sezione `##` successiva o a un `---`/fine file.
function stripFaqSection(body: string): string {
  const start = body.search(/^##\s+(Domande frequenti|FAQ)\b/im);
  if (start === -1) return body;
  const after = body.slice(start);
  const nextHeading = after.slice(3).search(/^##\s+/m);
  const nextRule = after.slice(3).search(/^---\s*$/m);
  let end = after.length;
  if (nextHeading !== -1) end = Math.min(end, nextHeading + 3);
  if (nextRule !== -1) end = Math.min(end, nextRule + 3);
  return (body.slice(0, start) + after.slice(end)).trim();
}

// Pulisce e prepara il corpo MDX: via frontmatter (gray-matter), commenti HTML,
// primo H1, note redazionali; CTA e diagrammi diventano componenti.
function transformBody(raw: string): string {
  let body = raw;
  // commenti HTML (rompono MDX)
  body = body.replace(/<!--[\s\S]*?-->/g, "");
  // primo H1 (il titolo lo rende il template dal frontmatter)
  body = body.replace(/^#\s+.+$/m, "");
  // riga "*Fase ...*" o nota in apertura tra asterischi su singola riga: lasciata.
  // CTA waitlist: > **[CTA ...]** *"testo"*  ->  <CtaWaitlist text="testo" />
  // "[CTA finale ...]" diventa la variante compatta (titolo/bottone diversi),
  // così le due CTA nello stesso articolo non sono fotocopie.
  body = body.replace(
    /^>\s*\*\*\[CTA([^\]]*)\]\*\*\s*\*"([^"]+)"\*\s*$/gim,
    (_all, label, txt) => `\n<CtaWaitlist${/finale/i.test(label) ? " final" : ""} text="${txt.trim()}" />\n`,
  );
  // diagramma: > [diagramma: testo]  ->  <Figure note="testo" />
  body = body.replace(
    /^>\s*\[diagramma:\s*([^\]]+)\]\s*$/gim,
    (_all, note) => `\n<Figure note="${note.trim()}" />\n`,
  );
  return body.trim();
}

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getArticle(slug: string): Article {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  // gray-matter/YAML interpreta "updated: 2026-06-08" come oggetto Date:
  // lo normalizziamo a stringa ISO "YYYY-MM-DD" per evitare "Invalid Date".
  const rawUpdated = (data as Record<string, unknown>).updated;
  const fm: Frontmatter = {
    ...(data as Frontmatter),
    updated: rawUpdated instanceof Date ? rawUpdated.toISOString().slice(0, 10) : (rawUpdated as string | undefined),
  };
  const isPillar = fm.tipo === "pilastro";
  // TOC dal corpo completo (include "Domande frequenti", la cui ancora è resa
  // dall'accordion <Faq> in ArticleView); il body servito alla prosa ha invece
  // la sezione FAQ rimossa, perché viene renderizzata come accordion.
  const fullBody = transformBody(content);
  const body = stripFaqSection(fullBody);
  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    slug: fm.slug ?? slug,
    isPillar,
    href: hrefFor(fm.slug ?? slug, isPillar),
    frontmatter: fm,
    body,
    toc: extractToc(fullBody),
    faq: extractFaq(content),
    readingMinutes: Math.max(1, Math.round(words / 200)),
  };
}

export function getAllArticles(): Article[] {
  return getArticleSlugs().map(getArticle);
}

export function getPillar(): Article | null {
  return getAllArticles().find((a) => a.isPillar) ?? null;
}

export function getSpokes(): Article[] {
  return getAllArticles().filter((a) => !a.isPillar);
}

// Vetrina home curata: solo articoli con `featured: true` nel frontmatter,
// pilastro per primo, poi per data di aggiornamento decrescente, cap a 4.
export function getFeatured(): Article[] {
  return getAllArticles()
    .filter((a) => a.frontmatter.featured === true)
    .sort((a, b) => {
      if (a.isPillar !== b.isPillar) return a.isPillar ? -1 : 1;
      return (b.frontmatter.updated ?? "").localeCompare(a.frontmatter.updated ?? "");
    })
    .slice(0, 4);
}
