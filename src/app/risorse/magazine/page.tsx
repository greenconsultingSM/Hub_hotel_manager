import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { Breadcrumb } from "@/components/Breadcrumb";
import { JsonLd } from "@/components/JsonLd";
import { SubscribeForm } from "@/components/SubscribeForm";
import { MagazineCard } from "@/components/magazine/MagazineCard";
import { CategoryGrid } from "@/components/magazine/CategoryGrid";
import { Pagination } from "@/components/magazine/Pagination";
import { MagazineSidebar } from "@/components/magazine/MagazineSidebar";
import {
  getIndexablePosts,
  getFeaturedPost,
  countByCategory,
  getAllTags,
  paginate,
  MAGAZINE_BASE,
} from "@/lib/magazine";
import { collectionSchema } from "@/lib/magazine-schema";

export const metadata: Metadata = {
  title: "Magazine · notizie e analisi per il tuo hotel",
  description:
    "Notizie di settore e analisi con dati e fonti verificate, spiegate per l'albergatore italiano: OTA, mercato, fisco, marketing e tecnologia.",
  alternates: {
    canonical: MAGAZINE_BASE,
    types: { "application/rss+xml": `${MAGAZINE_BASE}/feed.xml` },
  },
  openGraph: {
    type: "website",
    title: "Magazine · Hub Hotel Manager",
    description: "Notizie e analisi di settore per l'albergatore italiano.",
    images: ["/opengraph-image"],
  },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
};

const PER_PAGE = 9;

export default async function MagazineLanding({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page: pageStr } = await searchParams;
  const page = Math.max(1, parseInt(pageStr ?? "1", 10) || 1);

  const all = getIndexablePosts();
  const featured = getFeaturedPost();
  const news = all.filter((p) => p.frontmatter.contentType === "news" && p.slug !== featured?.slug).slice(0, 4);
  const feedAll = all.filter((p) => p.slug !== featured?.slug);
  const { items: feed, totalPages } = paginate(feedAll, page, PER_PAGE);
  const counts = countByCategory();
  const tags = getAllTags().slice(0, 16);
  const popular = all.slice(0, 5);
  const isEmpty = all.length === 0;

  return (
    <>
      <JsonLd data={collectionSchema("Magazine · Hub Hotel Manager", MAGAZINE_BASE, all)} />

      <div className="wrap">
        <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Risorse", href: "/risorse" }, { name: "Magazine" }]} />
      </div>

      <section className="band">
        <div className="wrap">
          <div className="mag-pagehead">
            <span className="eyebrow">
              <Icon name="newspaper" /> Magazine
            </span>
            <h1>Notizie e analisi per chi gestisce un hotel</h1>
            <p className="lead">
              Quello che succede nel settore (OTA, mercato, fisco, tecnologia) spiegato per l&apos;albergatore italiano,
              con i numeri e le fonti.
            </p>
          </div>

          <div className="mag-layout">
            <div className="mag-feed-col">
              {isEmpty ? (
                <div className="mag-empty">
                  <span className="badge blue">
                    <Icon name="sparkles" /> In arrivo
                  </span>
                  <h3>Il Magazine sta per partire</h3>
                  <p>
                    Stiamo preparando i primi articoli: notizie di settore e analisi con dati e fonti verificate, scritte
                    per chi gestisce un hotel in autonomia. Lascia la mail e sarai tra i primi a leggerli.
                  </p>
                  <SubscribeForm
                    variant="lead"
                    source="magazine-empty"
                    cta="Avvisami"
                    placeholder="La tua email professionale"
                    confirm="Perfetto. Ti scriviamo all'uscita dei primi articoli."
                  />
                </div>
              ) : (
                <>
                  {featured && (
                    <div className="mag-featured-wrap">
                      <span className="eyebrow">In evidenza</span>
                      <MagazineCard post={featured} featured />
                    </div>
                  )}

                  {news.length > 0 && (
                    <div className="mag-block">
                      <div className="mag-block-head">
                        <h3>Ultime notizie</h3>
                      </div>
                      <div className="mag-grid">
                        {news.map((p) => (
                          <MagazineCard key={p.slug} post={p} />
                        ))}
                      </div>
                    </div>
                  )}

                  {feed.length > 0 && (
                    <div className="mag-block">
                      <div className="mag-block-head">
                        <h3>Dal Magazine</h3>
                      </div>
                      <div className="mag-grid">
                        {feed.map((p) => (
                          <MagazineCard key={p.slug} post={p} />
                        ))}
                      </div>
                      <Pagination page={page} totalPages={totalPages} basePath={MAGAZINE_BASE} />
                    </div>
                  )}
                </>
              )}
            </div>

            <MagazineSidebar popular={popular} tags={tags} />
          </div>
        </div>
      </section>

      <section className="band gray">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Esplora</span>
            <h2 style={{ marginTop: 14 }}>Tutte le categorie</h2>
          </div>
          <CategoryGrid counts={counts} />
        </div>
      </section>
    </>
  );
}
