"use client";

import { useState, type ReactNode } from "react";
import { Icon } from "./Icon";

type Variant = "hero" | "final" | "footer" | "lead" | "gate";

// Form di iscrizione/waitlist. STUB: il backend (Supabase + ActiveCampaign
// Staymore) è ancora da collegare. La sottomissione mostra solo una conferma in
// pagina. La fonte (`source`) serve a segmentare la lista una volta collegato.
export function SubscribeForm({
  variant,
  source = "aggiornamenti",
  cta,
  confirm,
  placeholder,
  fine,
}: {
  variant: Variant;
  source?: string;
  cta?: string;
  confirm?: string;
  placeholder?: string;
  fine?: ReactNode;
}) {
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO(backend): inviare l'email a Supabase/ActiveCampaign con fonte=source.
    setDone(true);
  }

  // --- Footer: input compatto con freccia ---
  if (variant === "footer") {
    if (done) return <p style={{ marginTop: 24, color: "rgba(255,255,255,.6)", fontSize: 14 }}>Grazie! Ti scriviamo appena esce qualcosa di utile.</p>;
    return (
      <form className="foot-news" onSubmit={handleSubmit} data-fonte={source}>
        <input type="email" required placeholder="Iscriviti per gli aggiornamenti" aria-label="Email" />
        <button type="submit" aria-label="Iscriviti">
          <Icon name="arrow" />
        </button>
      </form>
    );
  }

  // --- Lead band (ebook): banda scura con riga input + bottone ---
  if (variant === "lead") {
    if (done) return <p className="lf-done">{confirm ?? "Perfetto. Ti scriviamo appena è pronta."}</p>;
    return (
      <form className="lead-form" onSubmit={handleSubmit} data-fonte={source}>
        <div className="lf-row">
          <input type="email" required placeholder={placeholder ?? "La tua email professionale"} aria-label="Email" />
          <button className="btn btn-primary" type="submit">
            {cta ?? "Avvisami"} <Icon name="arrow" />
          </button>
        </div>
        {fine && <p className="lf-fine">{fine}</p>}
      </form>
    );
  }

  // --- Gate (calcolatore in arrivo): input pill + bottone ---
  if (variant === "gate") {
    if (done) {
      return (
        <>
          <p className="g-done">{confirm ?? "Perfetto. Ti scriviamo appena è online."}</p>
          {fine && <p className="g-fine">{fine}</p>}
        </>
      );
    }
    return (
      <>
        <form className="gate-form" onSubmit={handleSubmit} data-fonte={source}>
          <input type="email" required placeholder={placeholder ?? "La tua email"} aria-label="Email" />
          <button className="btn btn-primary" type="submit">
            {cta ?? "Avvisami"} <Icon name="arrow" />
          </button>
        </form>
        {fine && <p className="g-fine">{fine}</p>}
      </>
    );
  }

  // --- Hero / Final: input largo + bottone primario ---
  const className = variant === "hero" ? "hero-form" : "subscribe";
  const label = cta ?? "Iscriviti";

  if (done) {
    const color = variant === "final" ? "rgba(255,255,255,.8)" : "var(--ink-soft)";
    return <p style={{ marginTop: 18, color, fontSize: 15 }}>{confirm ?? "Ci sei. Ti scriviamo appena esce qualcosa di utile."}</p>;
  }

  return (
    <form className={className} onSubmit={handleSubmit} data-fonte={source}>
      <input type="email" required placeholder={placeholder ?? "La tua email"} aria-label="Email" />
      <button className="btn btn-primary" type="submit">
        {label} <Icon name="arrow" />
      </button>
    </form>
  );
}
