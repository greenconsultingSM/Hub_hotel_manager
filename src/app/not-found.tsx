import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Pagina non trovata",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="band">
      <div className="wrap" style={{ textAlign: "center", padding: "72px 0" }}>
        <span className="eyebrow">Errore 404</span>
        <h1 style={{ marginTop: 14 }}>Pagina non trovata</h1>
        <p className="lead" style={{ margin: "16px auto 0", maxWidth: 560 }}>
          La pagina che cerchi non esiste o è stata spostata. Riparti dalle guide
          sulla disintermediazione o dal calcolatore delle commissioni OTA.
        </p>
        <div className="hero-cta" style={{ justifyContent: "center", marginTop: 28 }}>
          <Link className="btn btn-primary" href="/">
            Torna alla home <Icon name="arrow" />
          </Link>
          <Link className="btn btn-ghost" href="/commissioni-ota">
            Esplora le guide
          </Link>
        </div>
      </div>
    </section>
  );
}
