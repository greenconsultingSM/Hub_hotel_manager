// Configurazione centrale del sito: brand, URL, navigazione, footer.
// Coerente con CONTESTO/Sito_web/Landing_page_home/globali-header-footer.md.
// "soon: true" = voce/elemento "presto": non cliccabile, badge tenue.

export const SITE = {
  name: "Hub Hotel Manager",
  tagline: "Fai crescere il tuo hotel",
  description:
    "Guide pratiche, strumenti e analisi per disintermediare le OTA e far crescere i ricavi diretti del tuo hotel.",
  // Dominio ancora da definire: aggiornare quando si sceglie.
  url: "https://hubhotelmanager.it",
  locale: "it_IT",
  partners: [
    { name: "Green Consulting", url: "https://greenconsulting.it" },
    { name: "Staymore", url: "https://staymore.it" },
  ],
} as const;

export type NavItem = {
  label: string;
  href?: string;
  desc?: string;
  icon?: string; // chiave per <Icon name=...>
  soon?: boolean;
};

export type NavMenu = {
  label: string;
  items: NavItem[];
  promo: { tag: string; title: string; text: string; href: string; cta: string };
};

// Mega-menu "Impara"
export const IMPARA: NavMenu = {
  label: "Impara",
  items: [
    { label: "Disintermediazione & OTA", desc: "Riduci le commissioni e vendi diretto", icon: "compass", href: "/commissioni-ota" },
    { label: "Revenue management", desc: "Pricing, previsioni e RevPAR", icon: "chart", soon: true },
    { label: "Upselling & esperienze", desc: "Ricavi extra da ogni soggiorno", icon: "star", soon: true },
    { label: "Distribuzione", desc: "Channel manager e canali diretti", icon: "globe", soon: true },
    { label: "Marketing & brand", desc: "Farti trovare e scegliere", icon: "megaphone", soon: true },
    { label: "Operations", desc: "Efficienza e gestione del team", icon: "wrench", soon: true },
  ],
  promo: {
    tag: "In evidenza",
    title: "La guida alle commissioni OTA",
    text: "Sta per uscire la guida completa alla disintermediazione. Lascia l'email e la ricevi appena è pronta.",
    href: "/risorse/guida-disintermediazione",
    cta: "Vai alla guida",
  },
};

// Mega-menu "Strumenti"
export const STRUMENTI: NavMenu = {
  label: "Strumenti",
  items: [
    { label: "Calcolatore commissioni OTA", desc: "Quanto stai pagando davvero", icon: "calc", href: "/strumenti/calcolatore-commissioni-ota" },
    { label: "Simulatore di pricing", desc: "Trova la tariffa giusta", icon: "pricing", soon: true },
    { label: "Template & checklist", desc: "Pronti all'uso, da scaricare", icon: "check", soon: true },
    { label: "Benchmark di mercato", desc: "Confrontati con il settore", icon: "bars", soon: true },
  ],
  promo: {
    tag: "Disponibile",
    title: "Quanto ti costano davvero le OTA?",
    text: "È online: calcola gratis quanto paghi alle OTA e quanto risparmieresti col diretto. Nessuna registrazione.",
    href: "/strumenti/calcolatore-commissioni-ota",
    cta: "Scopri lo strumento",
  },
};

export const SIMPLE_LINKS: NavItem[] = [
  { label: "Risorse", href: "/risorse" },
  { label: "Chi siamo", href: "/chi-siamo" },
];

export const FOOTER_COLS: { title: string; items: NavItem[] }[] = [
  {
    title: "Impara",
    items: [
      { label: "Disintermediazione & OTA", href: "/commissioni-ota" },
      { label: "Revenue management", soon: true },
      { label: "Upselling & esperienze", soon: true },
      { label: "Distribuzione", soon: true },
      { label: "Marketing & brand", soon: true },
    ],
  },
  {
    title: "Strumenti",
    items: [
      { label: "Calcolatore commissioni OTA", href: "/strumenti/calcolatore-commissioni-ota" },
      { label: "Simulatore di pricing", soon: true },
      { label: "Template & checklist", soon: true },
      { label: "Benchmark di mercato", soon: true },
    ],
  },
  {
    title: "Risorse",
    items: [
      { label: "Magazine", href: "/risorse/magazine" },
      { label: "Tutte le guide", href: "/commissioni-ota" },
      { label: "Glossario", href: "/glossario" },
      { label: "Guida alla disintermediazione", href: "/risorse/guida-disintermediazione" },
      { label: "Chi siamo", href: "/chi-siamo" },
    ],
  },
];

export const LEGAL_LINKS: NavItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Cookie", href: "/cookie" },
  { label: "Termini", href: "/termini" },
];
