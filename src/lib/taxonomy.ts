// Tassonomia del Magazine: le 11 categorie come DATO (unico ponte cluster<->magazine).
// 7 verticali (= cluster, con pilastro e routing lead) + 4 trasversali (editoriali).
// Coerente con CONTESTO/Sito_web/Magazine/00-struttura-magazine.md.

export type LeadKey = "gc" | "staymore" | "partner";
export type CtaType = "pillar" | "newsletter" | "lead-magnet" | "demo";
export type CategoriaKind = "verticale" | "trasversale";
export type BadgeColor = "amber" | "blue" | "green";

export type Categoria = {
  slug: string;
  label: string;
  kind: CategoriaKind;
  descrizione: string;
  pillarHref: string; // "" per le trasversali (il pilastro lo decide l'articolo)
  lead: LeadKey | ""; // "" = trasversale → CTA newsletter
  defaultCta: CtaType;
  color: BadgeColor;
  icon: string;
};

// Destinatari lead per la CTA "demo/consulenza". L'URL "partner" è ancora da
// confermare: finché è vuoto, ArticleCta ripiega sulla newsletter.
export const LEAD: Record<LeadKey, { label: string; url: string }> = {
  gc: { label: "Green Consulting", url: "https://greenconsulting.it" },
  staymore: { label: "Staymore", url: "https://staymore.it" },
  partner: { label: "Partner", url: "" },
};

export const CATEGORIE: Categoria[] = [
  // --- Verticali (= cluster) ---
  { slug: "commissioni-ota", label: "Commissioni OTA & disintermediazione", kind: "verticale",
    descrizione: "OTA, parità tariffaria, disintermediazione e canale diretto.",
    pillarHref: "/commissioni-ota", lead: "gc", defaultCta: "demo", color: "amber", icon: "compass" },
  { slug: "canale-diretto", label: "Canale diretto & prenotazioni dirette", kind: "verticale",
    descrizione: "Booking engine, sito e prenotazioni dirette che crescono.",
    pillarHref: "/booking-engine-hotel", lead: "gc", defaultCta: "demo", color: "blue", icon: "globe" },
  { slug: "revenue-management", label: "Revenue management", kind: "verticale",
    descrizione: "Pricing, previsioni, ADR e RevPAR.",
    pillarHref: "/revenue-management", lead: "partner", defaultCta: "demo", color: "green", icon: "chart" },
  { slug: "marketing-alberghiero", label: "Marketing alberghiero", kind: "verticale",
    descrizione: "Farti trovare e scegliere: brand, SEO, social, adv.",
    pillarHref: "/marketing-alberghiero", lead: "gc", defaultCta: "demo", color: "amber", icon: "megaphone" },
  { slug: "ai-automazione", label: "AI & automazione", kind: "verticale",
    descrizione: "Intelligenza artificiale e automazioni per l'hotel.",
    pillarHref: "/ai-automazione-hotel", lead: "gc", defaultCta: "demo", color: "blue", icon: "sparkles" },
  { slug: "upselling", label: "Upselling & esperienze", kind: "verticale",
    descrizione: "Ricavi extra da ogni soggiorno: upsell, cross-sell, esperienze.",
    pillarHref: "/upselling-hotel", lead: "staymore", defaultCta: "demo", color: "green", icon: "star" },
  { slug: "software-pms", label: "Software & PMS", kind: "verticale",
    descrizione: "PMS, channel manager e stack tecnologico dell'hotel.",
    pillarHref: "/software-gestionale-hotel", lead: "partner", defaultCta: "demo", color: "blue", icon: "cpu" },
  // --- Trasversali (editoriali, soprattutto news) ---
  { slug: "mercato-dati", label: "Mercato & Dati", kind: "trasversale",
    descrizione: "Report e benchmark: ISTAT, Eurostat, STR, Skift.",
    pillarHref: "", lead: "", defaultCta: "newsletter", color: "blue", icon: "bars" },
  { slug: "normativa-fisco", label: "Normativa & Fisco", kind: "trasversale",
    descrizione: "Regole, fisco e sentenze: AdE, Cassazione, UE. (YMYL: solo tier S)",
    pillarHref: "", lead: "", defaultCta: "newsletter", color: "amber", icon: "scale" },
  { slug: "reputazione-recensioni", label: "Reputazione & Recensioni", kind: "trasversale",
    descrizione: "Recensioni, reputazione online e relazione con l'ospite.",
    pillarHref: "", lead: "", defaultCta: "newsletter", color: "green", icon: "message" },
  { slug: "tendenze-internazionali", label: "Tendenze internazionali", kind: "trasversale",
    descrizione: "USA ed estero, letti per l'albergatore italiano.",
    pillarHref: "", lead: "", defaultCta: "newsletter", color: "blue", icon: "globe" },
];

export const CATEGORIE_VERTICALI = CATEGORIE.filter((c) => c.kind === "verticale");
export const CATEGORIE_TRASVERSALI = CATEGORIE.filter((c) => c.kind === "trasversale");
export const CATEGORIA_SLUGS = CATEGORIE.map((c) => c.slug);

const BY_SLUG = new Map(CATEGORIE.map((c) => [c.slug, c]));
export function getCategoria(slug: string): Categoria | undefined {
  return BY_SLUG.get(slug);
}
