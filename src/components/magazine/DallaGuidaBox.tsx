import Link from "next/link";
import { Icon } from "@/components/Icon";
import { getCategoria } from "@/lib/taxonomy";
import type { MagazinePost } from "@/lib/magazine";

// Box "Dalla guida": l'interlinking che porta freschezza e link equity dal
// Magazine al cluster. Pilastro (da frontmatter o categoria) + 2-3 spoke.
export function DallaGuidaBox({ post }: { post: MagazinePost }) {
  const fm = post.frontmatter;
  const cat = getCategoria(fm.categoria);
  const pillarHref = fm.pillarHref ?? cat?.pillarHref ?? "";
  if (!pillarHref) return null;
  const pillarLabel = cat?.label ?? "la guida completa";
  const spokes = (fm.spokes ?? []).slice(0, 3);

  return (
    <aside className="dalla-guida">
      <span className="dg-eyebrow">
        <Icon name="book" /> Dalla guida
      </span>
      <p className="dg-text">
        Vuoi andare a fondo? Questo tema fa parte della nostra guida su <strong>{pillarLabel}</strong>.
      </p>
      <Link className="dg-pillar" href={pillarHref}>
        Vai alla guida <Icon name="arrow" />
      </Link>
      {spokes.length > 0 && (
        <ul className="dg-spokes">
          {spokes.map((s) => (
            <li key={s.href}>
              <Link href={s.href}>
                <Icon name="arrow" /> {s.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
