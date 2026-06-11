// Inietta snippet JSON-LD (schema.org) nella pagina.
// Con più oggetti emette UNO <script> per oggetto (non un array top-level):
// l'array senza @context manda in errore i parser ingenui (estensioni SEO ecc.).
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
