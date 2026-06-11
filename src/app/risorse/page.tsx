import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Breadcrumb } from "@/components/Breadcrumb";
import { getAllMagazinePosts, MAGAZINE_BASE } from "@/lib/magazine";
import { MagazineCard } from "@/components/magazine/MagazineCard";

export const metadata: Metadata = {
  title: "Risorse — Magazine e guide per il tuo hotel",
  description:
    "Le risorse di Hub Hotel Manager: il Magazine con le notizie del settore e le guide pratiche per far crescere il tuo hotel.",
  alternates: { canonical: "/risorse" },
  openGraph: {
    type: "website",
    title: "Risorse — Hub Hotel Manager",
    description: "Magazine e guide pratiche per l'albergatore italiano.",
  },
};

export default function RisorseHub() {
  const posts = getAllMagazinePosts();
  const latest = posts.slice(0, 3);
  const magCover = posts[0]?.frontmatter.cover;
  return (
    <>
      <div className="wrap">
        <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Risorse" }]} />
      </div>

      <section className="band">
        <div className="wrap">
          <div className="mag-pagehead">
            <span className="eyebrow">Risorse</span>
            <h1>Notizie, dati e guide per far crescere il tuo hotel</h1>
            <p className="lead">
              Il Magazine con quello che succede nel settore, spiegato per chi gestisce un hotel, e le guide pratiche da
              applicare subito.
            </p>
          </div>

          <div className="res-grid">
            <Link className="gcard reveal" href={MAGAZINE_BASE}>
              {magCover ? (
                <div
                  className="thumb"
                  style={{ backgroundImage: `url(${magCover})`, backgroundSize: "cover", backgroundPosition: "center" }}
                />
              ) : (
                <div className="thumb cover-gen blue">
                  <Icon name="newspaper" />
                  <span className="cg-label">Magazine</span>
                </div>
              )}
              <div className="gbody">
                <span className="badge blue">
                  <Icon name="newspaper" /> Magazine
                </span>
                <h3 style={{ marginTop: 10 }}>Le notizie del settore, lette per l&apos;albergatore</h3>
                <div className="meta">Notizie e analisi con dati e fonti · in aggiornamento continuo</div>
              </div>
            </Link>

            <Link className="gcard reveal" data-d="1" href="/risorse/guida-disintermediazione">
              <div className="thumb cover-gen amber">
                <Icon name="book" />
                <span className="cg-label">Ebook gratuito</span>
              </div>
              <div className="gbody">
                <span className="badge amber">
                  <Icon name="book" /> Guida gratuita
                </span>
                <h3 style={{ marginTop: 10 }}>Come pagare meno OTA: l&apos;ebook in arrivo</h3>
                <div className="meta">Lascia l&apos;email · lo ricevi appena esce</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Le ultime dal Magazine: si auto-alimenta a ogni pubblicazione */}
      {latest.length > 0 && (
        <section className="band gray">
          <div className="wrap">
            <div className="sec-head center reveal">
              <span className="eyebrow">Dal Magazine</span>
              <h2 style={{ marginTop: 14 }}>Le ultime uscite</h2>
            </div>
            <div className="home-mag-grid">
              {latest.map((p) => (
                <MagazineCard post={p} key={p.slug} />
              ))}
            </div>
            <div className="sec-foot center reveal">
              <Link className="text-link" href={MAGAZINE_BASE}>
                Tutto il Magazine <Icon name="arrow" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
