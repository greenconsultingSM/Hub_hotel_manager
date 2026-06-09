import Link from "next/link";
import { Icon } from "@/components/Icon";
import { SubscribeForm } from "@/components/SubscribeForm";
import { getCategoria, LEAD } from "@/lib/taxonomy";
import type { MagazineCta } from "@/lib/magazine";

// CTA primaria per-articolo, parametrica (successore di CtaWaitlist).
// Tipi: pillar | newsletter | lead-magnet | demo. Il default è quello della
// categoria; la scelta finale si decide al Gate 2 del comando /news.
// Nota: la "demo → partner" ripiega su newsletter finché manca l'URL del partner.

type Resolved =
  | { kind: "link"; title: string; text: string; href: string; cta: string; external?: boolean }
  | { kind: "newsletter"; title: string; text: string; source: string };

function resolve(cta: MagazineCta | undefined, categoria: string): Resolved {
  const cat = getCategoria(categoria);
  const type = cta?.type ?? cat?.defaultCta ?? "newsletter";

  if (type === "newsletter") {
    return {
      kind: "newsletter",
      title: "Resta aggiornato",
      text: cta?.text ?? "Una mail quando esce qualcosa di utile per il tuo hotel. Niente spam.",
      source: `magazine-${categoria}`,
    };
  }

  if (type === "lead-magnet") {
    return {
      kind: "link",
      title: "Approfondisci con la guida",
      text: cta?.text ?? "Scarica la risorsa gratuita e applica subito quello che hai letto.",
      href: cta?.href ?? "/risorse/guida-disintermediazione",
      cta: "Vai alla risorsa",
    };
  }

  if (type === "pillar") {
    const href = cta?.href ?? cat?.pillarHref ?? "/commissioni-ota";
    return {
      kind: "link",
      title: "Leggi la guida completa",
      text: cta?.text ?? "Il quadro completo sul tema, passo dopo passo.",
      href,
      cta: "Apri la guida",
    };
  }

  // demo / consulenza
  const dest = cta?.destinazione ?? (cat?.lead || undefined);
  const lead = dest ? LEAD[dest] : undefined;
  const url = cta?.href ?? lead?.url ?? "";
  if (!url) {
    // partner senza URL confermato → ripiego newsletter
    return {
      kind: "newsletter",
      title: "Vuoi un confronto sul tema?",
      text: cta?.text ?? "Lascia la mail: ti mettiamo in contatto con il partner giusto.",
      source: `magazine-demo-${categoria}`,
    };
  }
  return {
    kind: "link",
    title: cta?.text ? "Richiedi una consulenza" : `Parlane con ${lead?.label ?? "un esperto"}`,
    text: cta?.text ?? "Un confronto senza impegno con chi questo lavoro lo fa ogni giorno.",
    href: url,
    cta: "Richiedi una consulenza",
    external: true,
  };
}

export function ArticleCta({ cta, categoria }: { cta?: MagazineCta; categoria: string }) {
  const r = resolve(cta, categoria);

  if (r.kind === "newsletter") {
    return (
      <section className="band">
        <div className="wrap">
          <div className="lead-band">
            <div className="lb-left">
              <h2>{r.title}</h2>
              <p>{r.text}</p>
            </div>
            <SubscribeForm variant="lead" source={r.source} cta="Iscrivimi" placeholder="La tua email professionale" confirm="Perfetto. Ti scriviamo solo quando vale la pena." />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="band">
      <div className="wrap">
        <aside className="inline-cta">
          <div>
            <h3>{r.title}</h3>
            <p>{r.text}</p>
          </div>
          {r.external ? (
            <a className="btn btn-primary" href={r.href} target="_blank" rel="noopener noreferrer">
              {r.cta} <Icon name="arrow" />
            </a>
          ) : (
            <Link className="btn btn-primary" href={r.href}>
              {r.cta} <Icon name="arrow" />
            </Link>
          )}
        </aside>
      </div>
    </section>
  );
}
