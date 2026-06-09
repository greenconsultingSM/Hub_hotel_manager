import { Breadcrumb, type Crumb } from "@/components/Breadcrumb";
import { MagazineCard } from "./MagazineCard";
import { Pagination } from "./Pagination";
import { MagazineSidebar } from "./MagazineSidebar";
import { paginate, type MagazinePost } from "@/lib/magazine";

// Vista condivisa per gli archivi (categoria / tag): head + griglia + paginazione + sidebar.
export function ArchiveView({
  crumbs,
  eyebrow,
  title,
  intro,
  posts,
  page,
  basePath,
  popular,
  tags,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  intro?: string;
  posts: MagazinePost[];
  page: number;
  basePath: string;
  popular: MagazinePost[];
  tags: string[];
}) {
  const { items, totalPages, total } = paginate(posts, page, 9);
  return (
    <>
      <div className="wrap">
        <Breadcrumb items={crumbs} />
      </div>
      <section className="band">
        <div className="wrap">
          <div className="mag-pagehead">
            <span className="eyebrow">{eyebrow}</span>
            <h1>{title}</h1>
            {intro && <p className="lead">{intro}</p>}
          </div>

          <div className="mag-layout">
            <div className="mag-feed-col">
              {total === 0 ? (
                <div className="mag-empty">
                  <h3>Ancora nessun articolo</h3>
                  <p>Stiamo lavorando ai primi contenuti di questa sezione. Torna presto.</p>
                </div>
              ) : (
                <div className="mag-block">
                  <div className="mag-grid">
                    {items.map((p) => (
                      <MagazineCard key={p.slug} post={p} />
                    ))}
                  </div>
                  <Pagination page={page} totalPages={totalPages} basePath={basePath} />
                </div>
              )}
            </div>
            <MagazineSidebar popular={popular} tags={tags} />
          </div>
        </div>
      </section>
    </>
  );
}
