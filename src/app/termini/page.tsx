import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, PH } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Termini e condizioni",
  description:
    "Termini e condizioni d'uso del sito Hub Hotel Manager: proprietà dei contenuti, uso consentito, disclaimer informativo e limitazioni di responsabilità.",
  alternates: { canonical: "/termini" },
  robots: { index: false, follow: true },
};

export default function Termini() {
  return (
    <LegalLayout title="Termini e condizioni d'uso" updated="8 giugno 2026" dateLabel="Ultimo aggiornamento">
      <p className="intro">
        Il sito Hub Hotel Manager (di seguito il &quot;Sito&quot;) è un hub di contenuti informativi dedicato agli
        albergatori indipendenti, gestito da <strong>Tourism Innovation Lab</strong>{" "}
        <PH>[ragione sociale, sede legale e P.IVA]</PH> (di seguito il &quot;Titolare&quot; o il &quot;Gestore&quot;),
        nell&apos;ambito di un progetto realizzato insieme a <strong>Green Consulting</strong>.
      </p>
      <p>
        Ti invitiamo a leggere con attenzione i presenti termini e condizioni (di seguito i &quot;Termini&quot;) prima
        di utilizzare il Sito.
      </p>

      <h2>1. Oggetto e accettazione</h2>
      <p>
        I presenti Termini disciplinano l&apos;accesso e l&apos;uso del Sito e dei contenuti in esso pubblicati (guide,
        articoli, glossario, risorse, strumenti e ogni altro materiale, di seguito i &quot;Contenuti&quot;).
      </p>
      <p>
        Accedendo al Sito e utilizzandolo, dichiari di aver letto, compreso e accettato i presenti Termini. Se non
        intendi accettarli, ti invitiamo a non utilizzare il Sito.
      </p>
      <p>
        I Termini si applicano a chiunque acceda al Sito, a prescindere dal fatto che si iscriva agli aggiornamenti o a
        una lista d&apos;attesa.
      </p>

      <h2>2. Proprietà intellettuale dei contenuti</h2>
      <p>
        Tutti i Contenuti del Sito — testi, guide, articoli, voci di glossario, immagini, grafici, diagrammi, loghi,
        marchi, layout e codice — sono di proprietà del Titolare o dei rispettivi titolari dei diritti e sono protetti
        dalla normativa applicabile in materia di diritto d&apos;autore e proprietà industriale.
      </p>
      <p>
        I marchi e i segni distintivi presenti sul Sito, inclusi &quot;Hub Hotel Manager&quot;, &quot;Green
        Consulting&quot; e &quot;Tourism Innovation Lab&quot;, appartengono ai rispettivi titolari e non possono essere utilizzati
        senza autorizzazione scritta.
      </p>
      <p>
        Salvo quanto consentito alla sezione 3, non è permesso copiare, riprodurre, distribuire, pubblicare, modificare
        o utilizzare i Contenuti, in tutto o in parte, per finalità diverse dalla consultazione personale, senza il
        preventivo consenso scritto del Titolare.
      </p>

      <h2>3. Uso consentito del sito</h2>
      <p>
        Il Sito è messo a disposizione per la <strong>consultazione personale e a scopo informativo</strong>.
      </p>
      <p>Ti è consentito:</p>
      <ul>
        <li>consultare e leggere i Contenuti per uso personale o professionale interno;</li>
        <li>condividere i link alle pagine del Sito;</li>
        <li>citare brevi estratti dei Contenuti indicando in modo chiaro la fonte e, ove possibile, un collegamento alla pagina originale.</li>
      </ul>
      <p>Ti è invece vietato:</p>
      <ul>
        <li>utilizzare il Sito per finalità illecite o in violazione dei presenti Termini;</li>
        <li>riprodurre o ripubblicare interi Contenuti su altri siti, pubblicazioni o servizi senza autorizzazione;</li>
        <li>introdurre virus, codice malevolo o tentare di compromettere il funzionamento, la sicurezza o la disponibilità del Sito;</li>
        <li>raccogliere dati dal Sito tramite strumenti automatizzati in modo da pregiudicarne il funzionamento o violare diritti di terzi.</li>
      </ul>
      <p>Il Titolare può sospendere o limitare l&apos;accesso al Sito in caso di uso non conforme ai presenti Termini.</p>

      <h2>4. Disclaimer — natura informativa dei contenuti</h2>
      <p>
        I Contenuti del Sito, <strong>incluso il materiale di natura fiscale, normativa, di gestione e di revenue</strong>,
        hanno <strong>finalità esclusivamente informativa e divulgativa</strong> e{" "}
        <strong>non costituiscono consulenza professionale</strong> di alcun tipo (fiscale, legale, contabile,
        finanziaria o gestionale), né un parere personalizzato sulla tua specifica situazione.
      </p>
      <p>
        I Contenuti non sostituiscono in alcun modo il parere di un professionista qualificato.{" "}
        <strong>Verifica sempre la tua posizione con un consulente di fiducia</strong> (ad esempio un commercialista o un
        avvocato) prima di assumere decisioni basate su quanto letto sul Sito.
      </p>
      <p>
        I dati, le percentuali e i riferimenti normativi sono riportati alla data indicata e possono variare nel tempo:
        normative e prassi cambiano, e i Contenuti potrebbero non essere aggiornati al momento della tua consultazione.
        Sui contenuti sensibili è indicata una nota di &quot;ultima verifica&quot; con la relativa data.
      </p>

      <h2>5. Limitazione di responsabilità</h2>
      <p>
        Il Titolare cura i Contenuti con la massima attenzione, ma <strong>non garantisce</strong> che siano completi,
        esatti, aggiornati o adatti a uno specifico scopo.
      </p>
      <p>Nei limiti consentiti dalla legge applicabile, il Titolare non è responsabile per:</p>
      <ul>
        <li>eventuali danni diretti o indiretti derivanti dall&apos;uso o dal mancato uso del Sito o dei Contenuti;</li>
        <li>decisioni assunte sulla base dei Contenuti senza la previa verifica con un professionista;</li>
        <li>interruzioni, indisponibilità, errori o malfunzionamenti temporanei del Sito.</li>
      </ul>
      <p>
        Resta ferma ogni responsabilità che non possa essere esclusa o limitata in base alla normativa imperativa
        applicabile, inclusa quella verso i consumatori.
      </p>

      <h2>6. Link esterni</h2>
      <p>
        Il Sito può contenere collegamenti a siti web, fonti e servizi di terzi (ad esempio fonti istituzionali, report
        di settore o pagine dei partner).
      </p>
      <p>
        Tali collegamenti sono forniti per comodità e a scopo informativo. Il Titolare non controlla i siti di terzi e{" "}
        <strong>non è responsabile</strong> dei loro contenuti, della loro disponibilità, né delle relative politiche su
        privacy e trattamento dei dati.
      </p>
      <p>
        L&apos;accesso e l&apos;uso dei siti di terzi avvengono sotto la tua esclusiva responsabilità e sono regolati
        dai termini e dalle informative dei rispettivi gestori.
      </p>

      <h2>7. Legge applicabile e foro competente</h2>
      <p>I presenti Termini sono regolati dalla <strong>legge italiana</strong>.</p>
      <p>
        Per ogni controversia relativa all&apos;interpretazione, all&apos;esecuzione o alla validità dei presenti
        Termini è competente il <strong>Foro di <PH>[città del foro competente — sede del Titolare]</PH></strong>, fatta
        salva l&apos;applicazione del foro inderogabile previsto dalla legge a tutela del consumatore, ove applicabile.
      </p>

      <h2>8. Modifiche ai termini</h2>
      <p>
        Il Titolare può modificare o aggiornare i presenti Termini in qualsiasi momento, ad esempio per adeguarli a
        modifiche normative o all&apos;evoluzione del Sito.
      </p>
      <p>
        Le modifiche hanno effetto dalla pubblicazione sul Sito. La data dell&apos;ultimo aggiornamento è indicata in
        testa alla pagina. L&apos;uso del Sito successivo alla pubblicazione delle modifiche comporta l&apos;accettazione
        dei Termini aggiornati.
      </p>
      <p>Ti invitiamo a consultare periodicamente questa pagina per verificare eventuali aggiornamenti.</p>

      <p>
        Per qualsiasi richiesta relativa ai presenti Termini puoi fare riferimento al Titolare, <strong>Tourism Innovation Lab</strong>{" "}
        <PH>[recapiti]</PH>. Per il trattamento dei dati personali, consulta l&apos;
        <Link href="/privacy">Informativa privacy</Link>; per l&apos;uso dei cookie, la{" "}
        <Link href="/cookie">Cookie policy</Link>.
      </p>
    </LegalLayout>
  );
}
