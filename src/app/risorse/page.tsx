import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Breadcrumb } from "@/components/Breadcrumb";

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

const cards = [
  {
    icon: "newspaper",
    title: "Magazine",
    text: "Notizie di settore e analisi con dati e fonti verificate, lette per l'albergatore italiano: OTA, mercato, fisco, marketing e tecnologia.",
    href: "/risorse/magazine",
    cta: "Vai al Magazine",
  },
  {
    icon: "book",
    title: "Guida alla disintermediazione",
    text: "L'ebook pratico su come pagare meno OTA e costruire un canale diretto che cresce nel tempo. In arrivo: lascia l'email.",
    href: "/risorse/guida-disintermediazione",
    cta: "Scopri la guida",
  },
];

export default function RisorseHub() {
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

          <div className="do-grid">
            {cards.map((c) => (
              <Link className="do-card" key={c.href} href={c.href}>
                <span className="do-ico">
                  <Icon name={c.icon} />
                </span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <span className="do-foot">
                  <span className="c-more">
                    {c.cta} <Icon name="arrow" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
