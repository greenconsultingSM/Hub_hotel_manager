import { MagazineCard } from "./MagazineCard";
import type { MagazinePost } from "@/lib/magazine";

// Carosello "Continua a leggere": SSR con link reali e crawlabili (non lazy),
// così l'interlinking passa davvero. Scroll orizzontale via CSS.
export function RelatedCarousel({ posts, title = "Continua a leggere" }: { posts: MagazinePost[]; title?: string }) {
  if (posts.length === 0) return null;
  return (
    <section className="band gray">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Magazine</span>
          <h2 style={{ marginTop: 14 }}>{title}</h2>
        </div>
        <div className="mag-carousel" role="list">
          {posts.map((p) => (
            <div className="mag-carousel-item" role="listitem" key={p.slug}>
              <MagazineCard post={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
