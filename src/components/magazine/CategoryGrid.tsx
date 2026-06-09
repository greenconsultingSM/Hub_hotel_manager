import Link from "next/link";
import { Icon } from "@/components/Icon";
import { CATEGORIE } from "@/lib/taxonomy";
import { MAGAZINE_BASE } from "@/lib/magazine";

// "Esplora per categoria": le 11 categorie con icona, descrizione e conteggio.
export function CategoryGrid({ counts }: { counts: Record<string, number> }) {
  return (
    <div className="mag-cat-grid">
      {CATEGORIE.map((c) => (
        <Link key={c.slug} className="mag-cat" href={`${MAGAZINE_BASE}/categoria/${c.slug}`}>
          <span className={`mag-cat-ico ${c.color}`}>
            <Icon name={c.icon} />
          </span>
          <span className="mag-cat-body">
            <span className="mag-cat-name">{c.label}</span>
            <span className="mag-cat-desc">{c.descrizione}</span>
          </span>
          <span className="mag-cat-count">{counts[c.slug] ?? 0}</span>
        </Link>
      ))}
    </div>
  );
}
