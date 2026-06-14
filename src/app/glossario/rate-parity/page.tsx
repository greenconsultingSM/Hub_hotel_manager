import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CtaWaitlist } from "@/components/article/CtaWaitlist";
import { SubscribeSection } from "@/components/SubscribeSection";
import { SITE } from "@/lib/site";

const DEFINITION =
  "La rate parity (o parità tariffaria) è la clausola con cui un hotel si impegna a non offrire prezzi o condizioni migliori sui propri canali rispetto a quanto espone sulle OTA (Portolano Cavallo). Esempio: se una camera è a 100 euro su Booking, con una parity attiva non potresti venderla a 90 sul tuo sito.";

export const metadata: Metadata = {
  title: "Rate parity: cos'è",
  description:
    "Cos'è la rate parity in ambito alberghiero: definizione, esempio pratico e perché in Italia ed Europa le clausole di parità tariffaria sono ormai vietate.",
  alternates: { canonical: "/glossario/rate-parity" },
  openGraph: {
    type: "article",
    title: "Rate parity: cos'è (voce di glossario)",
    description:
      "Cos'è la rate parity in ambito alberghiero: definizione, esempio pratico e perché le clausole di parità tariffaria sono ormai vietate.",
    images: ["/opengraph-image"],
  },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
};

const definedTermLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  name: "Rate parity",
  description: DEFINITION,
  inLanguage: "it-IT",
  inDefinedTermSet: {
    "@type": "DefinedTermSet",
    name: "Glossario dell'albergatore",
    url: `${SITE.url}/glossario`,
  },
};

export default function VoceRateParity() {
  return (
    <>
      <JsonLd data={definedTermLd} />

      <div className="wrap">
        <Breadcrumb
          items={[{ name: "Home", href: "/" }, { name: "Glossario", href: "/glossario" }, { name: "Rate parity" }]}
        />
      </div>

      <section className="band">
        <div className="wrap">
          <article className="entry-card reveal">
            <div className="e-top">
              <span className="badge amber">
                <Icon name="compass" /> Rate parity
              </span>
              <span className="e-name">Rate parity</span>
            </div>

            <div className="entry-def">
              <div className="ed-label">Definizione</div>
              <p>{DEFINITION}</p>
            </div>

            <div className="entry-body">
              <p>
                La rate parity è una clausola contrattuale, non una legge di mercato: nasce dagli accordi tra hotel e
                portali per garantire che l&apos;OTA non venga &quot;scavalcata&quot; da un prezzo più basso sul canale
                diretto. Per anni ha bloccato la leva più semplice a disposizione di un albergatore, premiare chi
                prenota sul proprio sito.
              </p>

              <h2>Cosa è cambiato</h2>
              <p>
                In Italia ogni clausola di parità è{" "}
                <span className="hl">nulla per legge dal 2017</span> (Legge 124/2017, art. 1 comma 166). E
                nell&apos;area economica europea le parity sono vietate dal Digital Markets Act, che rende gli hotel
                liberi di praticare prezzi diversi, anche migliori, sui propri canali (Commissione UE, comunicato
                IP/24/5828).
              </p>
              <p>
                In pratica: oggi puoi legittimamente offrire una tariffa più bassa sul tuo sito rispetto a Booking o
                Expedia. La parity non è più un vincolo da subire, ma un&apos;eredità del passato che molti albergatori
                continuano a rispettare per abitudine, lasciando sul tavolo la principale leva del canale diretto.
              </p>

              <h2>Esempio pratico</h2>
              <p>
                Una camera è esposta a 100 euro su Booking.com. Con una clausola di parity attiva, l&apos;hotel non
                potrebbe venderla a meno sul proprio sito. Oggi, però, quella clausola è priva di effetto: l&apos;hotel
                può proporre la stessa camera a 95 euro sul canale diretto, oppure mantenere i 100 euro aggiungendo un
                vantaggio esclusivo (colazione inclusa, late check-out, upgrade). Il risultato è lo stesso: rendere il
                diretto più conveniente del portale e spostare margine dalla commissione OTA alla struttura.
              </p>
            </div>

            <div className="entry-link">
              <Link href="/commissioni-ota/rate-parity">
                Approfondisci: Rate parity, cos&apos;è e come usarla per spingere il canale diretto <Icon name="arrow" />
              </Link>
              <Link href="/commissioni-ota">
                Vai alla guida: Commissioni Booking e OTA <Icon name="arrow" />
              </Link>
            </div>
          </article>

          <div style={{ marginTop: 32 }}>
            <CtaWaitlist text="Sta per uscire la guida completa per usare la rate parity a tuo favore e spingere il canale diretto. Lascia la tua email e la ricevi appena è pronta." />
          </div>
        </div>
      </section>

      <SubscribeSection source="glossario-rate-parity" />
    </>
  );
}
