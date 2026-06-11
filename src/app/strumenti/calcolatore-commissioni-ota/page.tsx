import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CommissionCalculator } from "@/components/CommissionCalculator";
import { JsonLd } from "@/components/JsonLd";
import { SubscribeSection } from "@/components/SubscribeSection";
import { SITE } from "@/lib/site";

const GC = SITE.partners.find((p) => p.name === "Green Consulting")?.url ?? "https://greenconsulting.it";

// Tool libero (nessun gate), INDICIZZATO (go-live 2026-06-09). La superficie
// fiscale è un solo toggle opzionale (IVA 22% host senza P.IVA), presentato come
// stima e coperto da disclaimer "non sostituisce il commercialista": non è
// contenuto YMYL di guida, quindi non è gated sulla validazione del commercialista
// (che resta necessaria solo per la spoke deducibilita-iva-fattura). Gap booking
// engine IT chiuso (metodo-calcolatore-ota §6, 2026-06-09).
export const metadata: Metadata = {
  title: "Calcolatore commissioni OTA",
  description:
    "Calcola gratis quanto paghi davvero di commissioni a Booking e alle OTA e quanto risparmieresti, al netto dei costi, spostando prenotazioni sul diretto. Nessuna registrazione.",
  alternates: { canonical: "/strumenti/calcolatore-commissioni-ota" },
  robots: { index: true, follow: true },
};

// WebApplication: dice a Google e ai crawler AI che questa pagina è uno
// strumento interattivo gratuito, non solo contenuto testuale.
const appLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calcolatore commissioni OTA",
  url: `${SITE.url}/strumenti/calcolatore-commissioni-ota`,
  description:
    "Strumento gratuito per stimare quanto si paga di commissioni alle OTA ogni anno e quanto si risparmierebbe, al netto dei costi del diretto, spostando prenotazioni sul canale diretto.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  inLanguage: "it-IT",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  publisher: { "@id": `${SITE.url}/#organization` },
};

export default function CalcolatoreCommissioniOta() {
  return (
    <>
      <JsonLd data={appLd} />
      <div className="wrap">
        <Breadcrumb
          items={[{ name: "Home", href: "/" }, { name: "Strumenti" }, { name: "Calcolatore commissioni OTA" }]}
        />
      </div>

      <section className="band">
        <div className="wrap">
          <div className="tool-head reveal">
            <span className="badge amber">
              <Icon name="calc" /> Strumento gratuito
            </span>
            <h1>Calcolatore commissioni OTA</h1>
            <p className="sub">
              Scopri quanto paghi davvero di commissioni ai portali ogni anno e quanto recupereresti — al netto dei
              costi del diretto — spostando una parte delle prenotazioni sul tuo canale diretto.
            </p>
          </div>

          <p className="lead" style={{ marginTop: 28 }}>
            Niente registrazione: i numeri restano sul tuo schermo. I campi sono pre-compilati con benchmark di mercato
            italiani — sostituiscili con i tuoi per una stima sulla tua struttura.
          </p>

          <CommissionCalculator />

          <p className="tool-note">
            Stime indicative a scopo informativo, basate sui dati che inserisci e su benchmark di mercato (commissioni
            OTA 15–18%, costo del diretto ~11%, booking engine ~€100/mese, Airbnb host-only 15,5%). La{" "}
            <strong>ritenuta della cedolare secca (21%)</strong> è un&apos;imposta dovuta a prescindere dal canale e
            non entra nel confronto. Le voci fiscali non sostituiscono il parere di un commercialista.{" "}
            <Link href="/commissioni-ota">Approfondisci le commissioni OTA</Link>.
          </p>
        </div>
      </section>

      {/* Banda chiara ambrata: stacca la consulenza (GC) dalla newsletter scura
          che segue — niente muro scuro di due bande consecutive. */}
      <section className="band calc-gc">
        <div className="wrap calc-cta">
          <h2>Vuoi recuperare davvero questo margine?</h2>
          <p className="lead">
            Il risparmio sul diretto non è automatico: serve un canale che converta — booking engine, sito e marketing
            che lavorano insieme. Green Consulting aiuta gli hotel indipendenti a costruirlo.
          </p>
          <a className="btn btn-primary" href={GC} target="_blank" rel="noopener">
            Parla con Green Consulting <Icon name="arrow" />
          </a>
        </div>
      </section>

      {/* Cattura email post-risultato (funnel BOFU): chi ha appena visto quanto
          paga alle OTA è il lead più caldo del sito. Unica cattura in pagina. */}
      <SubscribeSection source="calcolatore" />
    </>
  );
}
