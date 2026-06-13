import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { SubscribeForm } from "@/components/SubscribeForm";
import { Faq, type FaqEntry } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { getFeatured, getPillar } from "@/lib/articles";
import { getAllMagazinePosts, MAGAZINE_BASE } from "@/lib/magazine";
import { MagazineCard } from "@/components/magazine/MagazineCard";

const PILLAR = "/commissioni-ota";
const CALCOLATORE = "/strumenti/calcolatore-commissioni-ota";

// Metadata della home: title assoluto (niente template "%s — ...") e
// description orientata alle query di ingresso (commissioni OTA, diretto).
export const metadata: Metadata = {
  title: { absolute: "Hub Hotel Manager — Guide e strumenti per il tuo hotel" },
  description:
    "L'hub per gli albergatori indipendenti italiani: guide pratiche, strumenti e analisi per ridurre le commissioni OTA, disintermediare e far crescere le prenotazioni dirette del tuo hotel.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Hub Hotel Manager — Guide e strumenti per il tuo hotel",
    description:
      "Guide pratiche, strumenti e analisi per ridurre le commissioni OTA e far crescere le prenotazioni dirette del tuo hotel.",
    url: SITE.url,
  },
};

// Roadmap a 7 cluster (master: CONTESTO/Sito_web/Cluster/00-master-keyword.md).
// In home: card piena solo per il cluster attivo; i futuri restano chip "in
// arrivo" e si promuovono a card al lancio.
const clusterAttivo = {
  badge: "Disintermediazione & OTA",
  title: "Riprendi il controllo della distribuzione",
  text: "Riduci la dipendenza dai portali e fai crescere le prenotazioni dirette, senza perdere visibilità. Guida completa, casi pratici e strumenti: il primo pilastro dell'hub è già online.",
};
const clusterInArrivo = [
  "Revenue management",
  "Upselling & esperienze",
  "Prenotazioni dirette",
  "Marketing alberghiero",
  "AI & automazione",
  "Software & PMS",
];

const stats = [
  { num: "15-18%", cap: "Le OTA trattengono in media il 15-18% di commissione su ogni prenotazione intermediata di una struttura indipendente.", src: "Stime di settore convergenti" },
  { num: "+65%", cap: "Una prenotazione diretta vale in media US$516 contro US$312 da OTA: circa il 65% di ricavo in più per soggiorno.", src: "SiteMinder, Hotel Booking Trends (dati 2025)" },
  { num: "~61%", cap: "Gli albergatori indipendenti cedono alle OTA circa il 61% delle proprie prenotazioni.", src: "Cloudbeds, State of Independent Lodging 2025" },
];

const personas = [
  {
    icon: "user",
    title: "Gestisci tutto in prima persona",
    text: "Indossi dieci cappelli al giorno: titolare, direttore, a volte receptionist. Paghi troppe commissioni alle OTA e vuoi iniziare a vendere diretto, senza gergo tecnico e senza perdere visibilità.",
    ctaText: "Vai alla guida sulle commissioni OTA",
    ctaHref: PILLAR,
  },
  {
    icon: "users",
    title: "Coordini un team",
    text: "Un team da guidare e numeri da far crescere. Vuoi ridurre la dipendenza dalle OTA, riequilibrare i canali e capire quanto pesano davvero le commissioni sul tuo margine.",
    ctaText: "Calcola il peso delle commissioni",
    ctaHref: CALCOLATORE,
  },
];

const faqItems: FaqEntry[] = [
  {
    q: "Cos'è Hub Hotel Manager?",
    a: "È un hub di contenuti dedicato agli albergatori indipendenti italiani: guide pratiche, strumenti e analisi per disintermediare le OTA e far crescere i ricavi diretti. È un progetto di Green Consulting e Tourism Innovation Lab. Al lancio è attivo il cluster sulla disintermediazione e sulle commissioni OTA; revenue management e upselling sono in arrivo.",
  },
  {
    q: "Per chi è?",
    a: "Per chi gestisce un hotel in autonomia: dalle strutture a conduzione familiare fino alle realtà più strutturate, che vogliono ridurre la dipendenza dalle OTA e aumentare le prenotazioni dirette.",
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
  const pillarCover = getPillar()?.frontmatter.cover;
  const featured = getFeatured();
  const latestPosts = getAllMagazinePosts().slice(0, 3);
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
          {/* Una sola cattura email in pagina (banda finale): qui restano le due
              azioni di ingresso — guide e calcolatore. */}
          <div className="hero-cta reveal" data-d="3">
            <Link className="btn btn-primary btn-lg" href={PILLAR}>
              Esplora le guide <Icon name="arrow" />
            </Link>
            <Link className="btn btn-ghost btn-lg" href={CALCOLATORE}>
              Calcola le tue commissioni
            </Link>
          </div>
        </div>
      </section>

      {/* Il problema, subito: i numeri del mercato */}
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

      {/* Pilastri: card piena per l'attivo + chip per i 6 in arrivo */}
      <section className="band" id="cluster">
        <div className="wrap">
          <div className="sec-head center reveal">
            <span className="eyebrow">I pilastri dell&apos;hub</span>
            <h2 style={{ marginTop: 14 }}>Come sbloccare il vero potenziale di profitto del tuo hotel</h2>
            <p className="lead">
              Una roadmap in sette pilastri per aumentare il valore reale di ogni prenotazione. Il primo passo?
              Rivoluzionare la distribuzione, riducendo l&apos;impatto delle commissioni che oggi erodono i tuoi margini.
            </p>
          </div>
          <Link className="pillar-card reveal" href={PILLAR}>
            <span
              className="pc-cover"
              style={pillarCover ? { backgroundImage: `url(${pillarCover})` } : undefined}
            />
            <span className="pc-body">
              <span className="badge amber">{clusterAttivo.badge}</span>
              <h3>{clusterAttivo.title}</h3>
              <p>{clusterAttivo.text}</p>
              <span className="c-more">
                Scopri il cluster <Icon name="arrow" />
              </span>
            </span>
          </Link>
          <div className="soon-row reveal" data-d="1">
            <span className="soon-label">In arrivo:</span>
            {clusterInArrivo.map((c) => (
              <span className="soon-chip" key={c}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Calcolatore: il problema sui tuoi numeri */}
      <section className="band dark">
        <div className="wrap calc-cta">
          <span className="eyebrow reveal">Lo strumento</span>
          <h2 className="reveal" data-d="1" style={{ marginTop: 16 }}>Quanto ti costano davvero le OTA?</h2>
          <p className="lead reveal" data-d="2">
            Mettici i tuoi numeri: il calcolatore ti mostra in due minuti quanto paghi di commissioni ogni anno e
            quanto recupereresti spostando prenotazioni sul canale diretto. Gratis, senza registrazione.
          </p>
          <div className="reveal" data-d="3">
            <Link className="btn btn-primary" href={CALCOLATORE}>
              Calcola le tue commissioni <Icon name="arrow" />
            </Link>
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
              {featured.map((art) => {
                const cover = art.frontmatter.cover;
                return (
                  <Link className="acard" key={art.slug} href={art.href}>
                    {cover ? (
                      <div
                        className="athumb"
                        style={{ backgroundImage: `url(${cover})`, backgroundSize: "cover", backgroundPosition: "center" }}
                      />
                    ) : (
                      <div className="athumb cover-gen amber">
                        <Icon name="compass" />
                      </div>
                    )}
                    <div className="abody">
                      <span className="badge amber">Disintermediazione</span>
                      <h4>{art.frontmatter.title}</h4>
                      <div className="ameta">Guida · Disintermediazione</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Ultime dal Magazine: si auto-alimenta a ogni pubblicazione */}
      <section className="band gray">
        <div className="wrap">
          <div className="sec-head center reveal">
            <span className="eyebrow">Dal Magazine</span>
            <h2 style={{ marginTop: 14 }}>Le ultime per il tuo hotel</h2>
            <p className="lead">
              Notizie e analisi dal settore — OTA, mercato, tecnologia — spiegate per l&apos;albergatore italiano, con i
              numeri e le fonti.
            </p>
          </div>
          <div className="home-mag-grid">
            {latestPosts.map((p) => (
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
                <Link className="text-link" href={p.ctaHref}>
                  {p.ctaText} <Icon name="arrow" />
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
