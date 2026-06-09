import Link from "next/link";
import { Icon } from "@/components/Icon";
import { SubscribeForm } from "@/components/SubscribeForm";
import { CATEGORIE_VERTICALI } from "@/lib/taxonomy";
import { MAGAZINE_BASE, type MagazinePost } from "@/lib/magazine";

// Sidebar della landing/archivi: newsletter + più letti + argomenti (tag) + guide.
export function MagazineSidebar({ popular, tags }: { popular: MagazinePost[]; tags: string[] }) {
  return (
    <aside className="mag-sidebar">
      <div className="mag-widget mag-widget-news">
        <h4>La rassegna per l&apos;albergatore</h4>
        <p>Le notizie e i numeri che contano per il tuo hotel, una mail quando vale la pena.</p>
        <SubscribeForm variant="gate" source="magazine-sidebar" cta="Iscrivimi" placeholder="La tua email" confirm="Perfetto, ci sei." />
      </div>

      {popular.length > 0 && (
        <div className="mag-widget">
          <h4>Più letti</h4>
          <ul className="mag-poplist">
            {popular.map((p, i) => (
              <li key={p.slug}>
                <Link href={p.href}>
                  <span className="mp-n">{i + 1}</span>
                  {p.frontmatter.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tags.length > 0 && (
        <div className="mag-widget">
          <h4>Argomenti</h4>
          <div className="mag-tagcloud">
            {tags.map((t) => (
              <Link key={t} className="mag-tag" href={`${MAGAZINE_BASE}/tag/${t}`}>
                <Icon name="tag" /> {t}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mag-widget">
        <h4>Le guide</h4>
        <ul className="mag-guidelist">
          {CATEGORIE_VERTICALI.map((c) => (
            <li key={c.slug}>
              <Link href={c.pillarHref}>
                <Icon name="arrow" /> {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
