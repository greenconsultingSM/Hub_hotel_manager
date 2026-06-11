"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "@/components/Icon";

// Gate email del reader ebook. A differenza di SubscribeForm non reindirizza
// a /grazie: il valore promesso è la lettura, quindi dopo il submit (cookie di
// sblocco impostato da /api/lead) si fa refresh e il server renderizza il
// capitolo completo. Il PDF arriva via email (automazione AC, post-deploy).
export function EbookGate({ source }: { source: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
          destinazione: "gc",
        }),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !data.ok) {
        setError(typeof data.error === "string" ? data.error : "qualcosa è andato storto, riprova");
        setBusy(false);
        return;
      }
      router.refresh(); // il cookie è impostato: il server ora serve il capitolo
    } catch {
      setError("connessione non riuscita, riprova");
      setBusy(false);
    }
  }

  return (
    <div className="reader-gate">
      <span className="badge amber">
        <Icon name="book" /> Continua a leggere
      </span>
      <h2>Sblocca tutta la guida con la tua email</h2>
      <p>
        Il Capitolo 1 è libero. Lascia nome ed email e leggi subito gli altri sei — incluse le parti che esistono solo
        qui: il metodo in 90 giorni e l&apos;audit in 20 domande. Il PDF ti arriva via email appena disponibile.
      </p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="azienda" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp-field" />
        <input type="text" name="nome" placeholder="Il tuo nome" required aria-label="Il tuo nome" />
        <input type="email" name="email" placeholder="La tua email professionale" required aria-label="La tua email" />
        <button className="btn btn-primary" type="submit" disabled={busy}>
          {busy ? "Un attimo…" : "Sblocca la guida"} <Icon name="arrow" />
        </button>
      </form>
      {error && <p className="gate-error">{error}</p>}
      <p className="gate-fine">
        Niente spam: la guida e gli aggiornamenti che contano. Puoi disiscriverti quando vuoi. Trattiamo i tuoi dati
        come spiegato nella <Link href="/privacy">Privacy</Link>.
      </p>
    </div>
  );
}
