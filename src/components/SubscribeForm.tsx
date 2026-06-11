"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "./Icon";

type Variant = "hero" | "final" | "footer" | "lead" | "gate";

// Form di cattura lead → POST /api/lead (Supabase + sync ActiveCampaign).
// Decisioni gate 2026-06-10/11: nome OBBLIGATORIO su tutti i form; honeypot
// anti-bot; dopo il submit redirect alla pagina /grazie?da=<source> (lì parte
// l'evento GA4 generate_lead). La fonte (`source`) segmenta liste e tag.
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
  confirm?: string; // mantenuto per compatibilità: oggi si reindirizza a /grazie
  placeholder?: string;
  fine?: ReactNode;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  void confirm;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setError(null);
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: fd.get("email"),
          nome: fd.get("nome"),
          azienda: fd.get("azienda"), // honeypot
          source,
        }),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (res.ok && data.ok) {
        router.push(`/grazie?da=${encodeURIComponent(source)}`);
        return;
      }
      setError(typeof data.error === "string" ? data.error : "Qualcosa è andato storto, riprova.");
    } catch {
      setError("Connessione non riuscita, riprova.");
    } finally {
      setBusy(false);
    }
  }

  const dark = variant === "final" || variant === "footer" || variant === "lead";
  const nameField = (
    <input
      className="sf-name"
      type="text"
      name="nome"
      required
      placeholder="Il tuo nome"
      aria-label="Nome"
      autoComplete="name"
    />
  );
  const honeypot = (
    <input className="hp" type="text" name="azienda" tabIndex={-1} autoComplete="off" aria-hidden="true" />
  );
  const errorMsg = error && <p className="sf-error" role="alert">{error}</p>;

  // --- Footer: compatto, nome + riga email/freccia ---
  if (variant === "footer") {
    return (
      <form className={`sf-stack on-dark`} onSubmit={handleSubmit} data-fonte={source}>
        {honeypot}
        {nameField}
        <div className="foot-news">
          <input type="email" name="email" required placeholder="Iscriviti per gli aggiornamenti" aria-label="Email" autoComplete="email" />
          <button type="submit" aria-label="Iscriviti" disabled={busy}>
            <Icon name="arrow" />
          </button>
        </div>
        {errorMsg}
      </form>
    );
  }

  // --- Lead band (ebook/waitlist): nome + riga input/bottone ---
  if (variant === "lead") {
    return (
      <form className="sf-stack on-dark lead-form" onSubmit={handleSubmit} data-fonte={source}>
        {honeypot}
        {nameField}
        <div className="lf-row">
          <input type="email" name="email" required placeholder={placeholder ?? "La tua email professionale"} aria-label="Email" autoComplete="email" />
          <button className="btn btn-primary" type="submit" disabled={busy}>
            {busy ? "Un attimo…" : (cta ?? "Avvisami")} <Icon name="arrow" />
          </button>
        </div>
        {errorMsg}
        {fine && <p className="lf-fine">{fine}</p>}
      </form>
    );
  }

  // --- Gate: nome + pill email/bottone ---
  if (variant === "gate") {
    return (
      <>
        <form className="sf-stack" onSubmit={handleSubmit} data-fonte={source}>
          {honeypot}
          {nameField}
          <div className="gate-form">
            <input type="email" name="email" required placeholder={placeholder ?? "La tua email"} aria-label="Email" autoComplete="email" />
            <button className="btn btn-primary" type="submit" disabled={busy}>
              {busy ? "Un attimo…" : (cta ?? "Avvisami")} <Icon name="arrow" />
            </button>
          </div>
          {errorMsg}
        </form>
        {fine && <p className="g-fine">{fine}</p>}
      </>
    );
  }

  // --- Hero / Final: nome + pill email/bottone ---
  const rowClass = variant === "hero" ? "hero-form" : "subscribe";
  return (
    <form className={`sf-stack${dark ? " on-dark" : ""}`} onSubmit={handleSubmit} data-fonte={source}>
      {honeypot}
      {nameField}
      <div className={rowClass}>
        <input type="email" name="email" required placeholder={placeholder ?? "La tua email"} aria-label="Email" autoComplete="email" />
        <button className="btn btn-primary" type="submit" disabled={busy}>
          {busy ? "Un attimo…" : (cta ?? "Iscriviti")} <Icon name="arrow" />
        </button>
      </div>
      {errorMsg}
    </form>
  );
}
