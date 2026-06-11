// Diagramma a barre orizzontali per confronti numerici negli articoli.
// SVG/CSS nativo del design system: testo vero (accessibile e citabile dagli
// LLM), dati come props nell'MDX. Animazione di crescita via .reveal (CSS-only).
type DiagramBar = {
  label: string;
  display: string; // valore formattato mostrato a destra (es. "US$516")
  value: number; // valore numerico per la larghezza relativa
  accent?: boolean; // barra in evidenza (colore brand)
  delta?: string; // badge opzionale (es. "+60% per soggiorno")
};

export function DiagramBars({
  title,
  bars,
  caption,
}: {
  title?: string;
  bars: DiagramBar[];
  caption?: string;
}) {
  const max = Math.max(...bars.map((b) => b.value));
  return (
    <figure className="guide-figure reveal">
      <div className="diagram-bars" role="img" aria-label={caption ?? title}>
        {title && <div className="db-title">{title}</div>}
        {bars.map((b) => (
          <div className={`db-row${b.accent ? " is-accent" : ""}`} key={b.label}>
            <div className="db-head">
              <span className="db-label">{b.label}</span>
              <span className="db-values">
                {b.delta && <span className="db-delta">{b.delta}</span>}
                <span className="db-value">{b.display}</span>
              </span>
            </div>
            <div className="db-track">
              <span className="db-fill" style={{ width: `${(b.value / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
