import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SubscribeForm } from "@/components/SubscribeForm";
import { getArticle } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Guida gratuita alla disintermediazione",
  description:
    "Come pagare meno commissioni alle OTA: la guida pratica per chi gestisce un hotel in autonomia. Lascia l'email e la ricevi appena esce.",
  alternates: { canonical: "/risorse/guida-disintermediazione" },
  openGraph: {
    type: "website",
    title: "Guida gratuita alla disintermediazione — Hub Hotel Manager",
    description: "Come pagare meno commissioni alle OTA: la guida pratica per chi gestisce un hotel in autonomia.",
  },
};

const learn = [
  ["Quanto pesano davvero le commissioni", " sul margine di ogni camera, con il costo reale messo nero su bianco."],
  ["Le leve concrete per ridurle", " senza perdere visibilità sui portali."],
  ["Gli aspetti fiscali spiegati con chiarezza", " — deducibilità, IVA e fattura, aggiornati alle regole 2026."],
  ["Come costruire il canale diretto", " passo dopo passo, in modo misurabile."],
  ["Gli errori da evitare", " nel percorso di disintermediazione, prima che costino margine."],
];

// Indice reale dell'ebook (master pronto, giugno 2026). Le card aprono il
// READER (decisione 2026-06-11): il Capitolo 1 si legge libero, gli altri
// aprono la pagina bloccata col gate email — la prova del metodo è l'ebook
// stesso, non gli articoli (che restano linkati dalle "Risorse correlate").
// Tuple: [etichetta, titolo, testo, gratis, esclusivo]
const chapters: [string, string, string, boolean, boolean][] = [
  ["Capitolo 01", "Quanto ti costano davvero le OTA", "Il costo reale della commissione, oltre la percentuale nominale: come incide sul margine di ogni prenotazione.", true, false],
  ["Capitolo 02", "Le leve per pagare meno", "Le azioni legittime per ridurre il costo dei portali, senza sparire dai risultati di ricerca.", false, false],
  ["Capitolo 03", "Il fisco delle commissioni", "Costo deducibile, reverse charge e i controlli da fare sulla fattura delle commissioni dell'hotel.", false, false],
  ["Capitolo 04", "Il confronto reale tra canali", "Booking, Expedia, Airbnb e metasearch: quanto costa davvero farsi trovare su ciascun canale.", false, false],
  ["Capitolo 05", "Costruire il canale diretto", "La roadmap in quattro fasi per far crescere le prenotazioni dirette e renderle misurabili.", false, false],
  ["Capitolo 06", "Il metodo in 90 giorni", "Tredici settimane scandite, ognuna con un'azione e un indicatore misurabile. Solo nell'ebook.", false, true],
  ["Capitolo 07", "L'audit della tua dipendenza OTA", "Venti domande in quattro aree, con soglie interpretate per capire da dove partire. Solo nell'ebook.", false, true],
];

// Correlate: copre i temi dell'ebook (costo delle OTA, canale diretto);
// titolo breve curato qui, cover/href dal frontmatter via getArticle.
const related = [
  { title: "Commissioni Booking e OTA: la guida completa", slug: "commissioni-ota", meta: "Pilastro · Disintermediazione" },
  { title: "Come pagare meno commissioni a Booking", slug: "come-pagare-meno-commissioni", meta: "Guida · Disintermediazione" },
  { title: "Come aumentare le prenotazioni dirette", slug: "aumentare-prenotazioni-dirette", meta: "Guida · Disintermediazione" },
];

export default function GuidaRisorsa() {
  return (
    <>
      <div className="wrap">
        <Breadcrumb
          items={[{ name: "Home", href: "/" }, { name: "Risorse" }, { name: "Guida alla disintermediazione" }]}
        />
      </div>

      {/* Hero lead-magnet */}
      <section className="band">
        <div className="wrap">
          <div className="res-hero">
            <div className="reveal">
              <span className="badge amber">
                <Icon name="book" /> Ebook gratuito — leggilo online
              </span>
              <h1>Come pagare meno commissioni alle OTA: la guida pratica per chi gestisce un hotel in autonomia</h1>
              <p className="res-sub">
                La guida completa alla disintermediazione, scritta per chi gestisce un hotel in autonomia. Ti aiuta a
                capire quanto pesano davvero le commissioni, a ridurle con le leve giuste e a costruire un canale diretto
                che cresce nel tempo. Il Capitolo 1 si legge gratis; con la tua email sblocchi tutto il resto.
              </p>
              <div className="learn-list">
                {learn.map(([strong, rest]) => (
                  <div className="li" key={strong}>
                    <span className="tick">
                      <Icon name="check" />
                    </span>
                    <span>
                      <strong>{strong}</strong>
                      {rest}
                    </span>
                  </div>
                ))}
              </div>

              {/* Assaggio in stile ebook: le prime righe vere del Capitolo 1,
                  che si legge libero nel reader (gate dal Capitolo 2). */}
              <div className="reader-teaser">
                <span className="rt-kicker">Dal Capitolo 1 — anteprima libera</span>
                <h3>Quanto ti costano davvero le OTA</h3>
                <p>
                  C&apos;è un numero che la maggior parte degli albergatori non sa dire a memoria: quanto
                  ha pagato di commissioni ai portali negli ultimi dodici mesi. Non la percentuale del contratto —
                  quella la conoscono tutti — ma la cifra esatta, in euro, che è uscita dalla cassa. Questo capitolo
                  serve a farti arrivare a quel numero, e a capire perché pesa molto più di quanto sembri…
                </p>
                <Link className="text-link" href="/risorse/guida-disintermediazione/leggi/1">
                  Continua a leggere gratis <Icon name="arrow" />
                </Link>
              </div>
            </div>

            <div className="cover-card reveal" data-d="1">
              <div className="ebook-cover">
                <span className="ec-tag">Ebook gratuito</span>
                <span>
                  <span className="ec-title">Come pagare meno commissioni alle OTA</span>
                  <span className="ec-sub" style={{ display: "block" }}>
                    La guida pratica alla disintermediazione per chi gestisce un hotel in autonomia
                  </span>
                </span>
                <span className="ec-foot">
                  <span className="brand-mark">
                    <Icon name="logo" />
                  </span>
                  Hub Hotel Manager
                </span>
              </div>
              <div className="cover-meta">
                <span className="cm-t">Ebook gratuito</span>
                <span className="cm-s">Leggilo online</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banda cattura (waitlist) */}
      <section className="band">
        <div className="wrap">
          <div className="lead-band reveal">
            <div className="lb-left">
              <h2>Leggi il Capitolo 1 gratis, sblocca il resto con l&apos;email</h2>
              <p>
                La guida si legge online, capitolo per capitolo: il primo è libero. Con nome ed email sblocchi subito
                gli altri sei — incluse le parti che esistono solo qui — e ricevi il PDF appena disponibile.
              </p>
            </div>
            <SubscribeForm
              variant="lead"
              source="ebook-guida-disintermediazione"
              cta="Sblocca la guida"
              placeholder="La tua email professionale"
              confirm="Fatto: il reader è sbloccato. Il PDF ti arriva via email appena disponibile."
              fine={
                <>
                  Niente spam: la guida e gli aggiornamenti che contano. Puoi disiscriverti quando vuoi. Trattiamo i
                  tuoi dati come spiegato nella <Link href="/privacy">Privacy</Link>.
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* Indice capitoli */}
      <section className="band gray">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Dentro la guida</span>
            <h2 style={{ marginTop: 14 }}>Cosa trovi nei capitoli</h2>
            <p className="lead">
              Un percorso pratico, dal problema all&apos;azione, pensato per essere applicato subito nella tua struttura.
            </p>
          </div>
          <div className="chap-grid">
            {chapters.map(([num, title, text, free, esclusivo], i) => (
              <article className="chap reveal" key={num}>
                <div className="chap-body">
                  <div className="chap-num">{num}</div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  {esclusivo && <span className="soon-badge">Esclusivo dell&apos;ebook</span>}
                  <Link className="text-link chap-link" href={`/risorse/guida-disintermediazione/leggi/${i + 1}`}>
                    {free ? <>Leggilo gratis nel reader <Icon name="arrow" /></> : <>Apri nel reader <Icon name="arrow" /></>}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Risorse correlate */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Risorse correlate</span>
            <h2 style={{ marginTop: 14 }}>Continua il percorso</h2>
          </div>
          <div className="related-grid">
            {related.map((r) => {
              const art = getArticle(r.slug);
              return (
                <Link className="spoke reveal" key={r.slug} href={art.href}>
                  {art.frontmatter.cover && (
                    <span className="spoke-cover" style={{ backgroundImage: `url(${art.frontmatter.cover})` }} />
                  )}
                  <span className="badge amber">
                    <Icon name="compass" /> Disintermediazione
                  </span>
                  <h3>{r.title}</h3>
                  <div className="s-meta">
                    <span>{r.meta}</span>
                    <span className="s-arrow">
                      <Icon name="arrow" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
