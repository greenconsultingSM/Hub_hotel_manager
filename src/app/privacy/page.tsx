import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, PH } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Informativa sulla privacy",
  description:
    "Come Hub Hotel Manager tratta i tuoi dati personali: titolare, finalità, base giuridica, conservazione e diritti ai sensi del Regolamento UE 2016/679.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function Privacy() {
  return (
    <LegalLayout title="Informativa sulla privacy" updated="8 giugno 2026">
      <p className="intro">
        La presente informativa descrive come vengono trattati i tuoi dati personali quando navighi su Hub Hotel Manager
        e quando ti iscrivi per ricevere i nostri aggiornamenti o la nostra guida. Il trattamento avviene nel rispetto
        del Regolamento (UE) 2016/679 (&quot;GDPR&quot;) e della normativa italiana applicabile.
      </p>

      <h2>1. Titolare del trattamento e contatti</h2>
      <p>
        Il titolare del trattamento dei dati personali raccolti tramite questo sito è{" "}
        <strong>STAYMORE <PH>[ragione sociale completa — segnaposto]</PH></strong>, con sede legale in{" "}
        <PH>[indirizzo, CAP, città, provincia — segnaposto]</PH>, <strong>P.IVA <PH>[numero — segnaposto]</PH></strong>.
      </p>
      <p>
        Per ogni richiesta relativa al trattamento dei tuoi dati personali o per l&apos;esercizio dei tuoi diritti puoi
        scrivere a <PH>[email del titolare — segnaposto]</PH>.
      </p>
      <p>
        <strong>Responsabile della protezione dei dati (DPO):</strong>{" "}
        <PH>[nominativo e contatti del DPO, se nominato — segnaposto]</PH>.
      </p>

      <h2>2. Dati che raccogliamo</h2>
      <p>Trattiamo le seguenti categorie di dati personali.</p>
      <ul>
        <li>
          <strong>Indirizzo email.</strong> Lo raccogliamo quando compili volontariamente uno dei nostri moduli: il
          modulo &quot;iscriviti per gli aggiornamenti&quot; (presente nell&apos;area iscrizione e nel footer) e i
          moduli di lista d&apos;attesa per la guida alla disintermediazione e per il calcolatore delle commissioni. Per
          questi moduli il conferimento dell&apos;email è facoltativo, ma necessario per ricevere il servizio richiesto:
          senza email non possiamo inviarti gli aggiornamenti né la guida.
        </li>
        <li>
          <strong>Dati di navigazione e cookie analitici.</strong> Quando visiti il sito vengono raccolti dati relativi
          alla tua navigazione (ad esempio pagine visitate, durata della visita, dispositivo e provenienza del traffico)
          tramite <strong>Google Analytics 4 (GA4)</strong>. Questi dati sono raccolti solo dopo che hai prestato il
          consenso ai cookie analitici nel banner; in assenza di consenso restano attivi solo i cookie tecnici
          necessari al funzionamento del sito. Per il dettaglio sui cookie utilizzati e sulla loro durata consulta la{" "}
          <Link href="/cookie">Cookie Policy</Link>.
        </li>
      </ul>
      <p>
        Non raccogliamo categorie particolari di dati (art. 9 GDPR) e non ti chiediamo dati diversi da quelli sopra
        indicati.
      </p>

      <h2>3. Perché trattiamo i tuoi dati (finalità)</h2>
      <p>Trattiamo i tuoi dati personali per le seguenti finalità.</p>
      <ul>
        <li>
          <strong>Invio degli aggiornamenti e della guida.</strong> Per inviarti, all&apos;indirizzo email che ci
          fornisci, la comunicazione periodica con strumenti, analisi e casi pratici, e per consegnarti la guida alla
          disintermediazione o l&apos;accesso al calcolatore quando ti iscrivi alle relative liste d&apos;attesa.
        </li>
        <li>
          <strong>Analisi statistiche sull&apos;utilizzo del sito.</strong> Per comprendere in forma aggregata come
          vengono usate le nostre pagine e migliorare i contenuti, tramite i cookie analitici di GA4 e previo tuo
          consenso.
        </li>
      </ul>
      <p>
        Non utilizziamo i tuoi dati per attività di profilazione né per processi decisionali automatizzati che producano
        effetti giuridici sulla tua persona.
      </p>

      <h2>4. Base giuridica del trattamento</h2>
      <p>
        La base giuridica di tutti i trattamenti descritti in questa informativa è il{" "}
        <strong>consenso dell&apos;interessato</strong> ai sensi dell&apos;art. 6, par. 1, lett. a) del GDPR:
      </p>
      <ul>
        <li>per l&apos;invio degli aggiornamenti e della guida, il consenso che presti compilando e inviando il modulo con il tuo indirizzo email;</li>
        <li>per le analisi statistiche, il consenso che presti accettando i cookie analitici nel banner.</li>
      </ul>
      <p>
        Il consenso è libero, specifico e revocabile in qualsiasi momento (vedi la sezione &quot;I tuoi diritti&quot;).
        La revoca non pregiudica la liceità del trattamento effettuato prima della revoca stessa.
      </p>

      <h2>5. Per quanto tempo conserviamo i dati</h2>
      <p>
        Conserviamo il tuo indirizzo email <PH>[periodo di conservazione da definire — segnaposto]</PH>, ovvero fino a
        quando non revochi il consenso o non ti disiscrivi; da quel momento il dato viene cancellato o reso anonimo
        entro <PH>[termine da definire — segnaposto]</PH>.
      </p>
      <p>
        I dati raccolti tramite i cookie analitici sono conservati per i periodi indicati nella{" "}
        <Link href="/cookie">Cookie Policy</Link> e secondo le impostazioni di conservazione di Google Analytics 4.
      </p>

      <h2>6. A chi comunichiamo i dati</h2>
      <p>I tuoi dati non vengono diffusi né venduti a terzi.</p>
      <p>
        Per le finalità sopra indicate i dati possono essere comunicati a{" "}
        <strong>GREEN CONSULTING <PH>[ragione sociale — segnaposto]</PH></strong>, co-promotore del progetto, per
        l&apos;eventuale gestione e instradamento delle richieste che ci invii.
      </p>
      <p>
        I tuoi dati sono inoltre trattati, per nostro conto, dai seguenti fornitori che agiscono in qualità di{" "}
        <strong>responsabili del trattamento</strong> ai sensi dell&apos;art. 28 GDPR, sulla base di un apposito
        accordo:
      </p>
      <table>
        <caption>Tabella — fornitori che trattano i dati come responsabili.</caption>
        <thead>
          <tr>
            <th>Fornitore</th>
            <th>Servizio</th>
            <th>Ruolo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Supabase</strong></td>
            <td>Database e archiviazione degli iscritti</td>
            <td>Responsabile del trattamento</td>
          </tr>
          <tr>
            <td><strong>ActiveCampaign</strong></td>
            <td>Invio delle email e gestione delle liste</td>
            <td>Responsabile del trattamento</td>
          </tr>
          <tr>
            <td><strong>Vercel</strong></td>
            <td>Hosting e distribuzione del sito</td>
            <td>Responsabile del trattamento</td>
          </tr>
          <tr>
            <td><strong>Google (Google Analytics 4)</strong></td>
            <td>Analisi statistica della navigazione</td>
            <td>Responsabile del trattamento</td>
          </tr>
        </tbody>
      </table>
      <p>
        <PH>
          [Da completare prima del go-live: ragione sociale completa di ciascun fornitore, sottoscrizione dei relativi
          DPA e qualificazione del ruolo di Green Consulting (titolare autonomo, contitolare o responsabile).]
        </PH>
      </p>

      <h2>7. Trasferimenti dei dati fuori dall&apos;Unione Europea</h2>
      <p>
        Alcuni dei fornitori sopra indicati possono trattare i dati al di fuori dello Spazio Economico Europeo. In tal
        caso il trasferimento avviene nel rispetto degli artt. 44 e seguenti del GDPR, sulla base di{" "}
        <PH>[garanzie adeguate da verificare — segnaposto]</PH> (ad esempio decisione di adeguatezza della Commissione
        europea, adesione al Data Privacy Framework UE–USA o Clausole Contrattuali Standard).
      </p>

      <h2>8. I tuoi diritti</h2>
      <p>In qualità di interessato, ai sensi degli artt. 15-22 del GDPR, hai diritto di:</p>
      <ul>
        <li><strong>accedere</strong> ai tuoi dati personali e ottenerne una copia (art. 15);</li>
        <li>chiederne la <strong>rettifica</strong> se inesatti o l&apos;<strong>integrazione</strong> se incompleti (art. 16);</li>
        <li>chiederne la <strong>cancellazione</strong> nei casi previsti (art. 17);</li>
        <li>chiedere la <strong>limitazione</strong> del trattamento (art. 18);</li>
        <li>ricevere i tuoi dati in formato strutturato e ottenerne la <strong>portabilità</strong> verso un altro titolare (art. 20);</li>
        <li><strong>opporti</strong> al trattamento (art. 21);</li>
        <li><strong>revocare il consenso</strong> in qualsiasi momento, senza che ciò pregiudichi la liceità del trattamento basato sul consenso prestato prima della revoca.</li>
      </ul>
      <p>
        Per esercitare questi diritti puoi scrivere a <PH>[email del titolare/DPO — segnaposto]</PH>. Puoi inoltre
        disiscriverti dalle nostre comunicazioni in ogni momento tramite l&apos;apposito link presente in fondo a
        ciascuna email.
      </p>
      <p>
        Se ritieni che il trattamento dei tuoi dati violi la normativa, hai diritto di proporre{" "}
        <strong>reclamo al Garante per la protezione dei dati personali</strong> (
        <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">www.garanteprivacy.it</a>) o
        all&apos;autorità di controllo dello Stato membro in cui risiedi o lavori.
      </p>

      <h2>9. Modifiche a questa informativa</h2>
      <p>
        Possiamo aggiornare questa informativa per adeguarla a modifiche normative, organizzative o tecniche. La versione
        vigente è sempre pubblicata su questa pagina, con la data di ultimo aggiornamento indicata in alto. Ti invitiamo
        a consultarla periodicamente; in caso di modifiche sostanziali che richiedano un nuovo consenso, te ne daremo
        apposita comunicazione.
      </p>
      <p>
        Vedi anche la <Link href="/cookie">Cookie Policy</Link> e i <Link href="/termini">Termini e condizioni</Link>.
      </p>
    </LegalLayout>
  );
}
