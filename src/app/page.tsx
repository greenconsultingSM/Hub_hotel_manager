import Link from "next/link";
import { Icon } from "@/components/Icon";
import { SubscribeForm } from "@/components/SubscribeForm";
import { Faq, type FaqEntry } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";

const PILLAR = "/commissioni-ota";

type HeroCard = { badge: string; color: string; title?: string; meta?: string; href?: string; label?: string; soon?: boolean };
const heroCards: HeroCard[] = [
  { badge: "Disintermediazione", color: "amber", title: "Commissioni Booking e OTA: quanto costano e come ridurle", meta: "Guida · 8 min", href: PILLAR },
  { badge: "Revenue", color: "blue", label: "Revenue management — presto", soon: true },
  { badge: "Upselling", color: "green", label: "Upselling & esperienze — presto", soon: true },
];

type Cluster = { badge: string; color: string; title: string; text: string; href?: string; soon?: boolean };
const clusters: Cluster[] = [
  {
    badge: "Disintermediazione & OTA",
    color: "amber",
    title: "Riprendi il controllo della distribuzione",
    text: "Riduci la dipendenza dai portali e fai crescere le prenotazioni dirette, senza perdere visibilità.",
    href: PILLAR,
  },
  {
    badge: "Revenue management",
    color: "blue",
    title: "Tariffe che lavorano per te",
    text: "Pricing, previsioni e dati per far crescere RevPAR e occupazione tutto l'anno.",
    soon: true,
  },
  {
    badge: "Upselling & esperienze",
    color: "green",
    title: "Ogni soggiorno vale di più",
    text: "Trasforma camere, servizi ed esperienze in ricavi extra e ospiti che tornano.",
    soon: true,
  },
];

const featureArticles = [
  { title: "Commissioni Booking e OTA: quanto costano e come ridurle", href: PILLAR },
  { title: "Come pagare meno commissioni a Booking", href: `${PILLAR}/come-pagare-meno-commissioni` },
  { title: "Commissioni Booking per host e B&B", href: `${PILLAR}/commissioni-host-bnb` },
  { title: "Come aumentare le prenotazioni dirette", href: `${PILLAR}/aumentare-prenotazioni-dirette` },
];

const stats = [
  { num: "15-18%", cap: "Le OTA trattengono in media il 15-18% di commissione su ogni prenotazione intermediata di una struttura indipendente.", src: "Booking.com for Partners" },
  { num: "+60%", cap: "Una prenotazione diretta vale in media US$516 contro US$312 da OTA: circa il 60% di ricavo in più per soggiorno.", src: "SiteMinder, Hotel Booking Trends 2025" },
  { num: "~61%", cap: "Gli albergatori indipendenti cedono alle OTA circa il 61% delle proprie prenotazioni.", src: "Skift Research" },
];

const personas = [
  {
    icon: "user",
    title: "Albergatore o host indipendente",
    text: "Gestisci una struttura piccola e indossi dieci cappelli al giorno. Paghi troppe commissioni alle OTA e vuoi iniziare a vendere diretto, senza gergo tecnico e senza perdere visibilità.",
  },
  {
    icon: "users",
    title: "Struttura più strutturata",
    text: "Coordini un team e numeri da far crescere. Vuoi ridurre la dipendenza dalle OTA, riequilibrare i canali e capire quanto pesano davvero le commissioni sul tuo margine.",
  },
];

const faqItems: FaqEntry[] = [
  {
    q: "Cos'è Hub Hotel Manager?",
    a: "È un hub di contenuti dedicato agli albergatori indipendenti italiani: guide pratiche, strumenti e analisi per disintermediare le OTA e far crescere i ricavi diretti. È un progetto di Green Consulting e Staymore. Al lancio è attivo il cluster sulla disintermediazione e sulle commissioni OTA; revenue management e upselling sono in arrivo.",
  },
  {
    q: "Per chi è?",
    a: "Per chi gestisce un hotel in autonomia: dagli host e dalle strutture a conduzione familiare fino alle realtà più strutturate, che vogliono ridurre la dipendenza dalle OTA e aumentare le prenotazioni dirette.",
  },
  {
    q: "È gratis?",
    a: "Sì. Le guide e gli strumenti dell'hub sono gratuiti. Iscriviti agli aggiornamenti e ricevi i nuovi contenuti appena escono.",
  },
  {
    q: "Ogni quanto pubblicate nuovi contenuti?",
    a: "Pubblichiamo nuove guide e analisi con cadenza regolare, un cluster alla volta. Iscriviti agli aggiornamenti e ricevi i contenuti nuovi appena sono pronti.",
  },
  {
    q: "Come funzionano gli strumenti?",
    a: "Sono calcolatori e simulatori interattivi che danno una stima concreta in pochi minuti, direttamente dal browser. Il primo, il calcolatore delle commissioni OTA, è già online: ti mostra quanto stai pagando davvero ai portali e quanto risparmieresti spostando prenotazioni sul diretto. Altri sono in arrivo.",
  },
  {
    q: "Posso proporre un argomento?",
    a: "Sì. Costruiamo i contenuti a partire dai problemi reali degli albergatori. Iscriviti agli aggiornamenti e potrai segnalarci la tua sfida: la valutiamo per il calendario editoriale.",
  },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <JsonLd data={faqLd} />

      {/* Hero */}
      <section className="hero">
        <div className="wrap">
          <span className="eyebrow reveal">Per chi gestisce un hotel in autonomia</span>
          <h1 className="reveal" data-d="1">
            L&apos;hub che fa crescere<br />il tuo hotel
          </h1>
          <p className="lead reveal" data-d="2">
            Guide, strumenti e analisi per disintermediare le OTA, far crescere i ricavi diretti e valorizzare ogni
            soggiorno. Sono pensati per chi gestisce un hotel in autonomia e vuole trattenere più valore su ogni
            prenotazione.
          </p>
          <div className="hero-cta reveal" data-d="3">
            <Link className="btn btn-primary btn-lg" href={PILLAR}>
              Esplora le guide <Icon name="arrow" />
            </Link>
          </div>
          <div className="reveal" data-d="3">
            <SubscribeForm variant="hero" />
          </div>

          <div className="hero-cards">
            {heroCards.map((c) =>
              c.soon ? (
                <article className="gcard is-soon reveal" key={c.badge}>
                  <div className="thumb ph">{c.badge}</div>
                  <div className="gbody">
                    <span className={`badge ${c.color}`}>{c.badge}</span>
                    <h3 style={{ marginTop: 10 }}>{c.label}</h3>
                    <div className="meta">
                      <span className="soon-badge">presto</span>
                    </div>
                  </div>
                </article>
              ) : (
                <Link className="gcard reveal" key={c.badge} href={c.href!}>
                  <div className="thumb ph">copertina guida</div>
                  <div className="gbody">
                    <span className={`badge ${c.color}`}>{c.badge}</span>
                    <h3 style={{ marginTop: 10 }}>{c.title}</h3>
                    <div className="meta">{c.meta}</div>
                  </div>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Vetrina cluster */}
      <section className="band gray" id="cluster">
        <div className="wrap">
          <div className="sec-head center reveal">
            <span className="eyebrow">I tre pilastri</span>
            <h2 style={{ marginTop: 14 }}>Come sbloccare il vero potenziale di profitto del tuo hotel</h2>
            <p className="lead">
              Una roadmap in tre pilastri per aumentare il valore reale di ogni prenotazione. Il primo passo?
              Rivoluzionare la distribuzione, riducendo l&apos;impatto delle commissioni che oggi erodono i tuoi margini.
            </p>
          </div>
          <div className="cluster-grid">
            {clusters.map((c) => (
              <div className={`ccard reveal${c.soon ? " is-soon" : ""}`} key={c.badge}>
                <span className={`badge ${c.color}`}>{c.badge}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                {c.soon ? (
                  <span className="soon-badge" style={{ marginTop: 18 }}>presto</span>
                ) : (
                  <Link className="c-more" href={c.href!}>
                    Scopri il cluster <Icon name="arrow" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature split */}
      <section className="band">
        <div className="wrap">
          <div className="split">
            <div className="split-left reveal">
              <span className="eyebrow">Approfondimenti</span>
              <h2 style={{ marginTop: 14 }}>Trasforma le strategie in risultati concreti</h2>
              <p className="lead">
                Casi pratici e guide passo-passo progettati per essere messi in pratica fin da lunedì mattina.
                Trasformiamo le criticità della tua struttura in opportunità di guadagno. Inizia dal primo cluster
                disponibile: una guida completa alla disintermediazione per disinnescare il meccanismo delle commissioni
                e proteggere i tuoi margini.
              </p>
              <Link className="text-link" href={PILLAR}>
                Vai a tutte le guide <Icon name="arrow" />
              </Link>
            </div>
            <div className="split-panel reveal" data-d="1">
              {featureArticles.map((a) => (
                <Link className="acard" key={a.href} href={a.href}>
                  <div className="athumb ph" />
                  <div className="abody">
                    <span className="badge amber">Disintermediazione</span>
                    <h4>{a.title}</h4>
                    <div className="ameta">Guida · Disintermediazione</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="band gray">
        <div className="wrap">
          <div className="sec-head center reveal">
            <span className="eyebrow">Il mercato in numeri</span>
            <h2 style={{ marginTop: 14 }}>Perché ora conta più che mai</h2>
          </div>
          <div className="stats-grid">
            {stats.map((s) => (
              <div className="stat reveal" key={s.num}>
                <div className="num">{s.num}</div>
                <div className="cap">{s.cap}</div>
                <div className="src">Fonte: {s.src}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personas */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head center reveal">
            <span className="eyebrow">Per chi è</span>
            <h2 style={{ marginTop: 14 }}>Due percorsi, lo stesso obiettivo</h2>
            <p className="lead">
              Che tu gestisca tutto in prima persona o coordini un team, il punto è lo stesso: pagare meno commissioni e
              vendere di più sul canale diretto. Cambia solo il punto di partenza.
            </p>
          </div>
          <div className="paths">
            {personas.map((p) => (
              <div className="path reveal" key={p.title}>
                <span className="path-ico">
                  <Icon name={p.icon} />
                </span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <Link className="text-link" href={PILLAR}>
                  Inizia da qui <Icon name="arrow" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="band gray">
        <div className="wrap">
          <div className="sec-head center reveal">
            <span className="eyebrow">Domande frequenti</span>
            <h2 style={{ marginTop: 14 }}>Tutto quello che vuoi sapere</h2>
          </div>
          <Faq items={faqItems} />
        </div>
      </section>

      {/* CTA finale */}
      <section className="band dark final" id="aggiornamenti">
        <div className="wrap">
          <span className="eyebrow reveal">Aggiornamenti</span>
          <h2 className="reveal" data-d="1" style={{ marginTop: 16 }}>
            Resta un passo avanti rispetto al mercato
          </h2>
          <p className="lead reveal" data-d="2">
            Una selezione curata di contenuti attuali, guide pratiche, ebook gratuiti e analisi di casi reali. Nessuna
            teoria astratta (e niente spam), solo pillole di puro valore per far crescere il tuo hotel indipendente.
          </p>
          <div className="reveal" data-d="3">
            <SubscribeForm variant="final" />
          </div>
          <div className="note reveal" data-d="3">
            Niente spam. Puoi disiscriverti quando vuoi.
          </div>
        </div>
      </section>
    </>
  );
}
