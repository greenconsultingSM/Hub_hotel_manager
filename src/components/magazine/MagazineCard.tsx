import Link from "next/link";
import { Icon } from "@/components/Icon";
import { getCategoria } from "@/lib/taxonomy";
import { formatDate, type MagazinePost } from "@/lib/magazine";

// Card di un articolo del Magazine. Con cover (se presente) + badge categoria +
// pill "Notizia" sulle news. `featured` la rende grande (con sintesi).
export function MagazineCard({ post, featured = false }: { post: MagazinePost; featured?: boolean }) {
  const fm = post.frontmatter;
  const cat = getCategoria(fm.categoria);
  const isNews = fm.contentType === "news";

  return (
    <Link className={`mag-card${featured ? " is-featured" : ""}`} href={post.href}>
      <div className="mag-cover" style={fm.cover ? { backgroundImage: `url(${fm.cover})` } : undefined}>
        {!fm.cover && <span className="mag-cover-ph">{cat?.label ?? "Magazine"}</span>}
        {isNews && <span className="mag-pill"><Icon name="newspaper" /> Notizia</span>}
      </div>
      <div className="mag-body">
        <span className={`badge ${cat?.color ?? "blue"}`}>
          {cat?.icon && <Icon name={cat.icon} />} {cat?.label ?? fm.categoria}
        </span>
        <h3>{fm.title}</h3>
        {featured && (fm.sintesi || fm.descrizione) && (
          <p className="mag-ex">{fm.sintesi ?? fm.descrizione}</p>
        )}
        <div className="mag-meta">
          {fm.datePublished && <span>{formatDate(fm.datePublished)}</span>}
          {fm.datePublished && <span className="dot" />}
          <span>{post.readingMinutes} min</span>
        </div>
      </div>
    </Link>
  );
}
