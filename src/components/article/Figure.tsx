// Placeholder per diagramma/figura reale (da disegnare in seguito).
export function Figure({ note }: { note: string }) {
  return (
    <figure className="guide-figure">
      <div className="ph" style={{ height: 300 }}>
        diagramma
      </div>
      <figcaption>{note}</figcaption>
    </figure>
  );
}
