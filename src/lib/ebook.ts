import fs from "node:fs";
import path from "node:path";
import { createHmac } from "node:crypto";
import matter from "gray-matter";
import { cookies } from "next/headers";

// Reader ebook (decisioni gate 2026-06-10/11): Capitolo 1 libero (anteprima
// ~20%), capitoli 2-7 serviti SOLO dopo il gate email — il testo bloccato non
// deve mai raggiungere il client, quindi il check sta nel server component.

export const EBOOK = {
  slug: "guida-disintermediazione",
  titolo: "Come pagare meno commissioni alle OTA",
  sottotitolo: "La guida pratica alla disintermediazione per chi gestisce un hotel in autonomia",
  freeChapters: 1,
  source: "ebook-guida-disintermediazione", // source del lead + prefisso che attiva il cookie in /api/lead
};

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "ebook", EBOOK.slug);

export type EbookChapter = {
  num: number;
  titolo: string;
  abstract: string;
  esclusivo: boolean;
  body: string;
};

export function getChapters(): EbookChapter[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .sort()
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(CONTENT_DIR, f), "utf8"));
      return {
        num: Number(data.capitolo),
        titolo: String(data.titolo),
        abstract: String(data.abstract ?? ""),
        esclusivo: Boolean(data.esclusivo),
        body: content.trim(),
      };
    });
}

export function getChapter(num: number): EbookChapter | null {
  return getChapters().find((c) => c.num === num) ?? null;
}

// Token firmato del cookie di sblocco: HMAC dello slug. Non è una cassaforte —
// il livello di protezione è "gate email" — ma evita lo sblocco per tentativi.
const SECRET = process.env.EBOOK_GATE_SECRET ?? process.env.SUPABASE_SECRET_KEY ?? "hub-ebook-dev";
export const EBOOK_COOKIE = "hub_ebook_gd";

export function ebookToken(): string {
  return createHmac("sha256", SECRET).update(EBOOK.slug).digest("hex").slice(0, 32);
}

export async function hasEbookAccess(): Promise<boolean> {
  const jar = await cookies();
  return jar.get(EBOOK_COOKIE)?.value === ebookToken();
}
