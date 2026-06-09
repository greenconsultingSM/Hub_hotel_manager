import type { ReactNode } from "react";

// Layout condiviso per le pagine legali (privacy, cookie, termini).
// Tutte noindex e marcate "BOZZA DA VALIDARE" finché non passano la
// validazione legale. I segnaposto nel testo usano <span className="placeholder">.
export function LegalLayout({
  title,
  updated,
  dateLabel = "Ultima verifica",
  children,
}: {
  title: string;
  updated: string;
  dateLabel?: string;
  children: ReactNode;
}) {
  return (
    <section className="band">
      <div className="wrap">
        <header className="legal-head">
          <h1>{title}</h1>
          <div className="legal-meta">
            {dateLabel}: {updated}
          </div>
          <div className="legal-warn">
            <span aria-hidden="true">⚠</span>
            <span>Bozza da validare legalmente: non è testo legale definitivo. Alcuni dati sono ancora segnaposto.</span>
          </div>
        </header>
        <div className="legal-prose">{children}</div>
      </div>
    </section>
  );
}

// Segnaposto evidenziato nel testo legale.
export function PH({ children }: { children: ReactNode }) {
  return <span className="placeholder">{children}</span>;
}
