import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { SITE } from "@/lib/site";

export type Crumb = { name: string; href?: string };

// Breadcrumb visivo + schema BreadcrumbList.
// L'ultima voce è la pagina corrente (senza link). Le voci intermedie senza
// href (es. "Risorse" quando non esiste una pagina indice) restano testo.
export function Breadcrumb({ items }: { items: Crumb[] }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      ...(c.href ? { item: `${SITE.url}${c.href}` } : {}),
    })),
  };

  return (
    <>
      <JsonLd data={ld} />
      <nav className="breadcrumb" aria-label="Percorso">
        <div className="crumbs">
          {items.map((c, i) => {
            const isLast = i === items.length - 1;
            return (
              <span key={`${c.name}-${i}`} style={{ display: "contents" }}>
                {i > 0 && <span className="sep">/</span>}
                {c.href && !isLast ? (
                  <Link href={c.href}>{c.name}</Link>
                ) : (
                  <span className={isLast ? "cur" : undefined}>{c.name}</span>
                )}
              </span>
            );
          })}
        </div>
      </nav>
    </>
  );
}
