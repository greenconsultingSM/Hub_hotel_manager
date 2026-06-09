import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { slugify } from "./slug";
import { getCategoria, type CtaType, type LeadKey } from "./taxonomy";

// Modulo Magazine PARALLELO a articles.ts: legge src/content/magazine e non
// tocca in alcun modo l'infrastruttura dei cluster (zero regressioni).
// Gli helper puri (toc/faq/transform/reading-time) sono volutamente duplicati:
// si unificheranno in un content-core condiviso in un secondo momento.

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "magazine");
export const MAGAZINE_BASE = "/risorse/magazine";

export type ContentType = "news" | "evergreen";

export type MagazineCta = {
  type: CtaType;
  destinazione?: LeadKey;
  href?: string;
  text?: string;
};

export type MagazineFrontmatter = {
  title: string;
  slug: string;
  contentType: ContentType;
  categoria: string; // slug tra le 11
  tags?: string[];
  descrizione?: string;
  sintesi?: string; // TL;DR citabile (GEO)
  datePublished: string; // ISO
  dateModified?: string;
  autore?: string;
  cover?: string;
  pillarHref?: string; // override del pilastro di categoria
  spokes?: { title: string; href: string }[]; // per il box "Dalla guida"
  cta?: MagazineCta;
  index?: boolean;
  // NIENTE kw_primaria: il Magazine non targetizza le keyword dei cluster.
  [key: string]: unknown;
};

export type TocItem = { id: string; text: string };
export type FaqItem = { q: string; a: string };

export type MagazinePost = {
  slug: string;
  href: string;
  frontmatter: MagazineFrontmatter;
  body: string;
  toc: TocItem[];
  faq: FaqItem[];
  readingMinutes: number;
};

function normalizeDate(v: unknown): string | undefined {
  if (v instanceof Date) return v.toISOString();
  if (typeof v === "string") return v;
  return undefined;
}

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

function extractFaq(body: string): FaqItem[] {
  const start = body.search(/^##\s+(Domande frequenti|FAQ)\b/im);
  if (start === -1) return [];
  let section = body.slice(start);
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

function transformBody(raw: string): string {
  let body = raw;
  body = body.replace(/<!--[\s\S]*?-->/g, ""); // commenti HTML (rompono MDX)
  body = body.replace(/^#\s+.+$/m, ""); // primo H1 (lo rende il template)
  return body.trim();
}

export function getMagazineSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getMagazinePost(slug: string): MagazinePost | null {
  const file = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const d = data as Record<string, unknown>;
  const fm: MagazineFrontmatter = {
    ...(data as MagazineFrontmatter),
    datePublished: normalizeDate(d.datePublished) ?? "",
    dateModified: normalizeDate(d.dateModified),
  };
  const body = transformBody(content);
  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    slug: fm.slug ?? slug,
    href: `${MAGAZINE_BASE}/${fm.slug ?? slug}`,
    frontmatter: fm,
    body,
    toc: extractToc(body),
    faq: extractFaq(content),
    readingMinutes: Math.max(1, Math.round(words / 200)),
  };
}

export function getAllMagazinePosts(): MagazinePost[] {
  return getMagazineSlugs()
    .map(getMagazinePost)
    .filter((p): p is MagazinePost => p !== null)
    .sort((a, b) => (b.frontmatter.datePublished ?? "").localeCompare(a.frontmatter.datePublished ?? ""));
}

// Solo i pezzi indicizzabili (index !== false).
export function getIndexablePosts(): MagazinePost[] {
  return getAllMagazinePosts().filter((p) => p.frontmatter.index !== false);
}

export function getPostsByCategory(categoria: string): MagazinePost[] {
  return getAllMagazinePosts().filter((p) => p.frontmatter.categoria === categoria);
}

export function getPostsByTag(tag: string): MagazinePost[] {
  return getAllMagazinePosts().filter((p) => (p.frontmatter.tags ?? []).includes(tag));
}

export function countByCategory(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const p of getAllMagazinePosts()) {
    const c = p.frontmatter.categoria;
    counts[c] = (counts[c] ?? 0) + 1;
  }
  return counts;
}

// Articolo in evidenza: il più recente indicizzabile (preferendo le news).
export function getFeaturedPost(): MagazinePost | null {
  const indexable = getIndexablePosts();
  if (indexable.length === 0) return null;
  return indexable.find((p) => p.frontmatter.contentType === "news") ?? indexable[0];
}

// Correlati: stessa categoria, poi stessi tag; esclude se stesso.
export function getRelatedPosts(post: MagazinePost, limit = 6): MagazinePost[] {
  const others = getAllMagazinePosts().filter((p) => p.slug !== post.slug && p.frontmatter.index !== false);
  const sameCat = others.filter((p) => p.frontmatter.categoria === post.frontmatter.categoria);
  const tags = new Set(post.frontmatter.tags ?? []);
  const sameTag = others.filter(
    (p) => !sameCat.includes(p) && (p.frontmatter.tags ?? []).some((t) => tags.has(t)),
  );
  return [...sameCat, ...sameTag, ...others].filter((p, i, arr) => arr.indexOf(p) === i).slice(0, limit);
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  for (const p of getAllMagazinePosts()) for (const t of p.frontmatter.tags ?? []) set.add(t);
  return [...set].sort();
}

export type Paginated<T> = { items: T[]; page: number; totalPages: number; total: number };

export function paginate<T>(items: T[], page: number, perPage = 9): Paginated<T> {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const p = Math.min(Math.max(1, page), totalPages);
  return { items: items.slice((p - 1) * perPage, p * perPage), page: p, totalPages, total };
}

// Etichetta della categoria (riusa la tassonomia; fallback allo slug).
export function categoriaLabel(slug: string): string {
  return getCategoria(slug)?.label ?? slug;
}

// Data ISO → "9 giugno 2026" (locale it-IT). Robusto a date con o senza orario.
export function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso.length <= 10 ? `${iso}T12:00:00` : iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" });
}

// URL assoluto della cover per gli schemi (passa attraverso gli URL http esterni).
export function coverUrl(cover: string | undefined, base: string): string | undefined {
  if (!cover) return undefined;
  return /^https?:\/\//.test(cover) ? cover : `${base}${cover}`;
}
