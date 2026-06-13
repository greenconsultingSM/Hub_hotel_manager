import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// robots.txt, GEO-friendly: consentiamo ESPLICITAMENTE i bot AI (citabilità).
// Le pagine sottili/legali NON sono bloccate qui: usano meta robots noindex,follow,
// così i crawler le leggono, NON le indicizzano e seguono comunque i link
// (bloccarle in robots.txt impedirebbe persino di vedere il tag noindex).
// Vedi seo-geo-tecnico.md §D.

const AI_BOTS = [
  "GPTBot", // OpenAI (training)
  "OAI-SearchBot", // OpenAI (ricerca/risposte)
  "ChatGPT-User", // OpenAI (navigazione su richiesta utente)
  "ClaudeBot", // Anthropic (training)
  "Claude-Web", // Anthropic (navigazione)
  "PerplexityBot", // Perplexity
  "Google-Extended", // Google (Gemini/AI Overviews)
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
