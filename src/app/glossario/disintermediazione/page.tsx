import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CtaWaitlist } from "@/components/article/CtaWaitlist";
import { SubscribeSection } from "@/components/SubscribeSection";
import { SITE } from "@/lib/site";

const DEFINITION =
  "In ambito alberghiero, la disintermediazione è il processo con cui una struttura riduce o elimina il ruolo degli intermediari — le OTA come Booking.com ed Expedia — spostando la prenotazione sul proprio canale diretto (sito web e motore di prenotazione). L'obiettivo non è abbandonare i portali, ma riequilibrare i canali per trattenere una quota maggiore del margine su ogni camera venduta.";

export const metadata: Metadata = {
  title: "Disintermediazione: cos'è",
  description:
    "Cos'è la disintermediazione in ambito alberghiero: definizione, esempio pratico e perché conviene spostare le prenotazioni dalle OTA al canale diretto.",
  alternates: { canonical: "/glossario/disintermediazione" },
  openGraph: {
    type: "article",
    title: "Disintermediazione: cos'è (voce di glossario)",
    description:
      "Cos'è la disintermediazione in ambito alberghiero: definizione, esempio pratico e perché conviene il canale diretto.",
  },
};

const definedTermLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  name: "Disintermediazione",
  description: DEFINITION,
  inLanguage: "it-IT",
  inDefinedTermSet: {
    "@type": "DefinedTermSet",
    name: "Glossario dell'albergatore",
    url: `${SITE.url}/glossario`,
  },
};

export default function VoceDisintermediazione() {
  return (
    <>
      <JsonLd data={definedTermLd} />

      <div className="wrap">
        <Breadcrumb
          items={[{ name: "Home", href: "/" }, { name: "Glossario", href: "/glossario" }, { name: "Disintermediazione" }]}
        />
      </div>

      <section className="band">
        <div className="wrap">
          <article className="entry-card reveal">
            <div className="e-top">
              <span className="badge amber">
                <Icon name="compass" /> Disintermediazione
              </span>
              <span className="e-name">Disintermediazione</span>
            </div>

            <div className="entry-def">
              <div className="ed-label">Definizione</div>
              <p>{DEFINITION}</p>
            </div>

            <div className="entry-body">
              <p>
                Il termine descrive un movimento, non un interruttore: nessuna struttura passa al 100% diretto da un
                giorno all&apos;altro. Disintermediare significa spostare gradualmente quote di domanda dai portali al
                diretto, dove il margine resta interamente tuo.
              </p>

              <h2>Perché conta per un albergatore</h2>
              <p>
                Ogni prenotazione che arriva da un&apos;OTA costa una commissione media del{" "}
                <span className="hl">15-18%</span>, che incide sul margine e non sul fatturato (Booking.com for
                Partners; Skift Research). La disintermediazione è la leva con cui recuperi quel margine.
              </p>
              <p>
                Il divario economico tra i due canali è netto. Secondo SiteMinder, il ricavo medio per prenotazione
                generato dal sito diretto è di circa <span className="hl">US$516</span>, contro i{" "}
                <span className="hl">US$312</span> di una prenotazione via OTA — quasi il 60% in più a parità di
                prenotazione (SiteMinder, Hotel Booking Trends 2025). Eppure gli hotel indipendenti continuano a cedere
                circa il <span className="hl">61%</span> delle proprie prenotazioni ai portali (Skift Research).
              </p>

              <h2>Esempio pratico</h2>
              <p>
                Un B&amp;B riceve 100 prenotazioni al mese, tutte da Booking.com, con una commissione del 18%. Avviando
                un percorso di disintermediazione — sito con motore di prenotazione, un vantaggio esclusivo per chi
                prenota diretto, cura della relazione post-soggiorno — sposta 20 di quelle prenotazioni sul canale
                diretto. Su quelle 20 non versa più la commissione: il margine torna intero. Le altre 80 continuano ad
                arrivare da Booking, che resta un canale utile per intercettare nuova domanda. È disintermediazione
                &quot;intelligente&quot;: meno dipendenza da un solo canale, senza rinunciare alla visibilità.
              </p>
            </div>

            <div className="entry-link">
              <Link href="/commissioni-ota">
                Approfondisci nella guida: Commissioni Booking e OTA <Icon name="arrow" />
              </Link>
              <Link href="/commissioni-ota/aumentare-prenotazioni-dirette">
                Come aumentare le prenotazioni dirette <Icon name="arrow" />
              </Link>
              <Link href="/commissioni-ota/come-pagare-meno-commissioni">
                Come pagare meno commissioni a Booking <Icon name="arrow" />
              </Link>
            </div>
          </article>

          <div style={{ marginTop: 32 }}>
            <CtaWaitlist text="Sta per uscire la guida completa alla disintermediazione per l'albergatore indipendente. Lascia la tua email e la ricevi appena è pronta." />
          </div>
        </div>
      </section>

      <SubscribeSection source="glossario-disintermediazione" />
    </>
  );
}
