import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { LeadEvent } from "./LeadEvent";

// Thank-you page post-iscrizione (decisione gate 2026-06-11): conferma +
// next-step per provenienza + evento GA4 generate_lead (in LeadEvent).
// noindex: pagina di servizio, non deve comparire in SERP.
export const metadata: Metadata = {
  title: "Grazie, sei dei nostri",
  robots: { index: false, follow: false },
};

type NextStep = { title: string; desc: string; href: string; cta: string };

// Next-step consigliato per fonte di iscrizione (fallback: percorso standard).
const STEPS: Record<string, NextStep> = {
  "guida-disintermediazione": {
    title: "Nel frattempo, parti dalla guida online",
    desc: "La guida completa alle commissioni OTA è già leggibile sul sito: l'ebook che riceverai la approfondisce.",
    href: "/commissioni-ota",
    cta: "Leggi la guida",
  },
  calcolatore: {
    title: "Riduci quei numeri che hai appena visto",
    desc: "La guida alla disintermediazione ti mostra come spostare prenotazioni sul canale diretto.",
    href: "/commissioni-ota",
    cta: "Vai alla guida",
  },
  glossario: {
    title: "Dalle parole ai numeri",
    desc: "Prova il calcolatore: scopri quanto paghi davvero di commissioni ogni anno.",
    href: "/strumenti/calcolatore-commissioni-ota",
    cta: "Calcola le tue commissioni",
  },
};

const DEFAULT_STEP: NextStep = {
  title: "Inizia dal punto giusto",
  desc: "Scopri quanto ti costano davvero le OTA: è il primo numero da conoscere.",
  href: "/strumenti/calcolatore-commissioni-ota",
  cta: "Prova il calcolatore",
};

export default async function Grazie({ searchParams }: { searchParams: Promise<{ da?: string }> }) {
  const { da } = await searchParams;
  const source = da ?? "aggiornamenti";
  const step = STEPS[source] ?? DEFAULT_STEP;
  const isWaitlist = source === "guida-disintermediazione";

  return (
    <section className="band">
      <div className="wrap" style={{ textAlign: "center", padding: "72px 0" }}>
        <LeadEvent source={source} />
        <span className="eyebrow">Fatto ✓</span>
        <h1 style={{ marginTop: 14 }}>{isWaitlist ? "Sei in lista!" : "Sei dei nostri!"}</h1>
        <p className="lead" style={{ margin: "16px auto 0", maxWidth: 560 }}>
          {isWaitlist
            ? "Ti avviseremo via email appena la guida è pronta. Niente spam, promesso."
            : "Iscrizione registrata. Ti scriviamo solo quando esce qualcosa di utile, niente spam, puoi disiscriverti quando vuoi."}
        </p>
        <div
          style={{
            margin: "40px auto 0",
            maxWidth: 520,
            padding: "26px 28px",
            border: "1px solid var(--line)",
            borderRadius: "var(--r-lg)",
            background: "var(--panel)",
            textAlign: "left",
          }}
        >
          <h2 style={{ fontSize: 19, margin: 0 }}>{step.title}</h2>
          <p style={{ margin: "10px 0 18px", color: "var(--ink-soft)", fontSize: 15.5, lineHeight: 1.55 }}>
            {step.desc}
          </p>
          <Link className="btn btn-primary" href={step.href}>
            {step.cta} <Icon name="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
