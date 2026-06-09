"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "hhm-cookie-consent";

// Banner cookie: tecnici sempre attivi; analitici (GA4) solo dopo "Accetta".
// La scelta è salvata in localStorage. Il wiring di GA4 va aggiunto in seguito.
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      // localStorage non disponibile: non mostrare nulla
    }
  }, []);

  function choose(value: "all" | "essential") {
    try {
      localStorage.setItem(KEY, value);
    } catch {}
    // TODO(analytics): se value === "all", inizializzare GA4 con consenso.
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Preferenze cookie">
      <p>
        Usiamo cookie tecnici e, con il tuo consenso, cookie analitici (Google Analytics) per capire come
        viene usato il sito. Dettagli nella <Link href="/cookie">cookie policy</Link>.
      </p>
      <div className="cookie-actions">
        <button className="btn btn-primary" onClick={() => choose("all")}>
          Accetta
        </button>
        <button className="btn btn-soft" onClick={() => choose("essential")}>
          Solo tecnici
        </button>
      </div>
    </div>
  );
}
