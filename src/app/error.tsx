"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="band">
      <div className="wrap" style={{ textAlign: "center", padding: "72px 0" }}>
        <span className="eyebrow">Errore</span>
        <h1 style={{ marginTop: 14 }}>Qualcosa è andato storto</h1>
        <p className="lead" style={{ margin: "16px auto 0", maxWidth: 560 }}>
          Si è verificato un errore imprevisto. Puoi riprovare oppure tornare alla home.
        </p>
        <div className="hero-cta" style={{ justifyContent: "center", marginTop: 28 }}>
          <button className="btn btn-primary" onClick={reset}>
            Riprova
          </button>
          <Link className="btn btn-ghost" href="/">
            Torna alla home
          </Link>
        </div>
      </div>
    </section>
  );
}
