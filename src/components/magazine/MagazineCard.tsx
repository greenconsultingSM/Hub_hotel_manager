import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import { getCategoria } from "@/lib/taxonomy";
import { formatDate, type MagazinePost } from "@/lib/magazine";

// Card di un articolo del Magazine. Con cover (se presente) + badge categoria +
// pill "Notizia" sulle news. `featured` la rende grande (con sintesi).
// Cover via next/image (fill): AVIF/WebP responsive e lazy-load automatici.
export function MagazineCard({ post, featured = false }: { post: MagazinePost; featured?: boolean }) {
  const fm = post.frontmatter;
  const cat = getCategoria(fm.categoria);
  const isNews = fm.contentType === "news";

  return (
    <Link className={`mag-card${featured ? " is-featured" : ""}`} href={post.href}>
      <div className="mag-cover">
        {fm.cover && (
          <Image
            src={fm.cover}
            alt={fm.title}
            fill
            sizes={featured ? "(max-width: 860px) 100vw, 560px" : "(max-width: 700px) 100vw, 400px"}
            style={{ objectFit: "cover" }}
          />
        )}
        {!fm.cover && (
          <span className={`cover-gen ${cat?.color ?? "blue"}`}>
            <Icon name={cat?.icon ?? "newspaper"} />
            <span className="cg-label">{cat?.label ?? "Magazine"}</span>
          </span>
        )}
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
