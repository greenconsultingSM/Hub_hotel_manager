import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SubscribeSection } from "@/components/SubscribeSection";

export const metadata: Metadata = {
  title: "Glossario dell'albergatore",
  description: "I termini chiave di distribuzione, commissioni e ricavi, spiegati in modo chiaro.",
  alternates: { canonical: "/glossario" },
  openGraph: {
    type: "website",
    title: "Glossario dell'albergatore — Hub Hotel Manager",
    description: "I termini chiave di distribuzione, commissioni e ricavi, spiegati in modo chiaro.",
  },
};

const DEF =
  "In ambito alberghiero, la disintermediazione è il processo con cui una struttura riduce o elimina il ruolo degli intermediari — le OTA come Booking.com ed Expedia — spostando la prenotazione sul proprio canale diretto. L'obiettivo non è abbandonare i portali, ma riequilibrare i canali per trattenere una quota maggiore del margine su ogni camera venduta.";

export default function Glossario() {
  return (
    <>
      <div className="wrap">
        <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Risorse" }, { name: "Glossario" }]} />
      </div>

      {/* Hero glossario */}
      <section className="band">
        <div className="wrap">
          <div className="gloss-head reveal">
            <span className="eyebrow">Risorse</span>
            <h1 style={{ marginTop: 14 }}>Glossario dell&apos;albergatore</h1>
            <p className="sub">
              I termini di distribuzione, commissioni e ricavi che incontri ogni giorno, spiegati in modo chiaro e con
              un esempio concreto. Niente definizioni da manuale: solo quello che ti serve per leggere i tuoi numeri e
              prendere decisioni migliori.
            </p>
            <p className="gloss-note">
              <Icon name="compass" /> Glossario in crescita: nuove voci in arrivo man mano che pubblichiamo le guide. Si
              parte dalla disintermediazione, il tema da cui nasce l&apos;hub.
            </p>
          </div>

          {/* Griglia voci (una sola al lancio) */}
          <div className="term-grid">
            <article className="term-card reveal">
              <span className="badge amber">
                <Icon name="compass" /> Disintermediazione
              </span>
              <span className="t-name">Disintermediazione</span>
              <span className="t-def">{DEF}</span>
              <div className="t-links">
                <Link className="t-arrow" href="/glossario/disintermediazione">
                  Leggi la voce completa <Icon name="arrow" />
                </Link>
                <Link className="t-arrow" href="/commissioni-ota">
                  Approfondisci nella guida <Icon name="arrow" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <SubscribeSection source="glossario" />
    </>
  );
}
