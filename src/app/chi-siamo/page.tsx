import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SubscribeSection } from "@/components/SubscribeSection";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Chi siamo",
  description: "Uno spazio creato da Green Consulting e Staymore per aiutare gli albergatori indipendenti a crescere.",
  alternates: { canonical: "/chi-siamo" },
  openGraph: {
    type: "website",
    title: "Chi siamo — Hub Hotel Manager",
    description: "Uno spazio creato da Green Consulting e Staymore per aiutare gli albergatori indipendenti a crescere.",
  },
};

type DoCard = { icon: string; title: string; text: string; href: string; cta: string; soon?: boolean };
const doCards: DoCard[] = [
  {
    icon: "compass",
    title: "Guide",
    text: "Guide approfondite organizzate per area tematica. La prima disponibile è il cluster sulla disintermediazione e sulle commissioni OTA: come funzionano, quanto costano davvero e come ridurle.",
    href: "/commissioni-ota",
    cta: "Vai alle guide",
  },
  {
    icon: "book",
    title: "Glossario",
    text: "I termini chiave di distribuzione, commissioni e ricavi, spiegati in modo chiaro. Un punto di riferimento veloce quando un concetto non torna.",
    href: "/glossario",
    cta: "Apri il glossario",
  },
  {
    icon: "calc",
    title: "Strumenti",
    text: "Calcolatori e simulatori per stimare costi e opportunità in pochi minuti. Il primo, il calcolatore delle commissioni OTA, è già online.",
    href: "/strumenti/calcolatore-commissioni-ota",
    cta: "Scopri il calcolatore",
  },
  {
    icon: "download",
    title: "Risorse",
    text: "Il Magazine con le notizie del settore lette per l'albergatore e gli approfondimenti scaricabili: la guida alla disintermediazione è la prima in preparazione.",
    href: "/risorse",
    cta: "Esplora le risorse",
  },
];

// Roadmap a 7 cluster (stessa fonte della home): 1 online + 6 in arrivo.
const clusterInArrivo = [
  "Revenue management",
  "Upselling & esperienze",
  "Prenotazioni dirette",
  "Marketing alberghiero",
  "AI & automazione",
  "Software & PMS",
];

const aboutLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Chi siamo — Hub Hotel Manager",
  url: `${SITE.url}/chi-siamo`,
  inLanguage: "it-IT",
  about: {
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    sameAs: SITE.partners.map((p) => p.url),
  },
};

export default function ChiSiamo() {
  return (
    <>
      <JsonLd data={aboutLd} />

      <div className="wrap">
        <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Chi siamo" }]} />
      </div>

      {/* Hero */}
      <section className="band">
        <div className="wrap">
          <div className="about-intro reveal">
            <span className="eyebrow">Chi siamo</span>
            <h1 style={{ marginTop: 14 }}>Uno spazio per chi gestisce un hotel in autonomia</h1>
            <div className="body">
              <p className="lede">
                Hub Hotel Manager raccoglie in un unico posto guide pratiche, strumenti e analisi affidabili. Sono
                pensati per aiutare l&apos;albergatore indipendente italiano a crescere. È un progetto di Green
                Consulting e Staymore.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Perché nasce */}
      <section className="band gray">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Perché nasce</span>
            <h2 style={{ marginTop: 14 }}>Da soli davanti a OTA, costi e complessità</h2>
          </div>
          <div className="rich-narrow reveal">
            <p>
              Chi gestisce un hotel indipendente si trova spesso solo a decidere. Davanti ha le commissioni dei
              portali, i costi che crescono e una complessità che cambia ogni stagione. Le competenze ci sono, ma sono
              sparse tra fonti diverse, spesso poco affidabili. E quasi mai sono pensate per chi non ha un ufficio
              dedicato alle spalle.
            </p>
            <p>
              Hub Hotel Manager nasce per mettere ordine. È un posto solo, in cui trovi informazioni verificate e
              strumenti che si possano usare davvero, senza scorciatoie e senza gergo.
            </p>
          </div>
        </div>
      </section>

      {/* La nostra missione */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">La nostra missione</span>
            <h2 style={{ marginTop: 14 }}>Dare strumenti affidabili, in un unico posto</h2>
          </div>
          <div className="rich-narrow reveal">
            <p>
              La nostra missione è semplice: mettere a disposizione dell&apos;albergatore indipendente guide pratiche,
              strumenti e analisi su cui poter contare, raccolti in un unico spazio. Ogni contenuto parte da un problema
              concreto della gestione quotidiana e arriva a qualcosa che puoi mettere in pratica.
            </p>
            <p>
              I dati che pubblichiamo provengono da fonti verificate e citate. Crediamo infatti che una decisione valga
              quanto le informazioni su cui si basa. Niente promesse facili: solo materiale chiaro, aggiornato e
              costruito per chi gestisce una struttura giorno per giorno.
            </p>
            <p>
              L&apos;hub cresce un pilastro alla volta: il primo, su disintermediazione e commissioni OTA, è{" "}
              <Link href="/commissioni-ota">già online</Link>.
            </p>
          </div>
          <div className="soon-row left reveal">
            <span className="soon-label">In arrivo:</span>
            {clusterInArrivo.map((c) => (
              <span className="soon-chip" key={c}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Cosa trovi */}
      <section className="band gray">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Cosa trovi</span>
            <h2 style={{ marginTop: 14 }}>Quattro modi per orientarti</h2>
          </div>
          <div className="do-grid">
            {doCards.map((c) => (
              <article className="do-card reveal" key={c.title}>
                <span className="do-ico">
                  <Icon name={c.icon} />
                </span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <div className="do-foot">
                  {c.soon && <span className="soon-badge">in arrivo</span>}
                  <Link className="c-more" href={c.href}>
                    {c.cta} <Icon name="arrow" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Chi c'è dietro */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Chi c&apos;è dietro</span>
            <h2 style={{ marginTop: 14 }}>Le persone e le realtà dietro l&apos;hub</h2>
          </div>

          <div className="redazione-block reveal">
            <h3>La redazione</h3>
            <p>
              I contenuti sono curati dalla redazione di Hub Hotel Manager, che li scrive, li verifica e li tiene
              aggiornati. Ogni dato sensibile riporta la data dell&apos;ultima verifica e rimanda alle fonti utilizzate.
            </p>
          </div>

          <div className="promoter-grid reveal">
            <div className="partner-block">
              <div className="pl">
                <span className="pn">Green Consulting</span>
                <span className="pk">consulenza</span>
              </div>
              <div className="partner-text">
                <h3>Green Consulting</h3>
                <p>
                  Green Consulting è una realtà di consulenza che lavora a fianco delle strutture ricettive.{" "}
                  <a href="https://greenconsulting.it" target="_blank" rel="noopener noreferrer">
                    greenconsulting.it
                  </a>
                </p>
              </div>
            </div>

            <div className="partner-block">
              <div className="pl">
                <span className="pn">Staymore</span>
                <span className="pk">tecnologia &amp; distribuzione</span>
              </div>
              <div className="partner-text">
                <h3>Staymore</h3>
                <p>
                  Staymore è una realtà che affianca gli albergatori sul fronte di tecnologia e distribuzione.{" "}
                  <a href="https://staymore.it" target="_blank" rel="noopener noreferrer">
                    staymore.it
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="rich-narrow reveal" style={{ marginTop: 28 }}>
            <p>
              Insieme mettono le rispettive competenze al servizio di chi gestisce una struttura indipendente. Così
              nasce questo spazio di contenuti e strumenti.
            </p>
          </div>
        </div>
      </section>

      <SubscribeSection source="chi-siamo" />
    </>
  );
}
