import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, PH } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Cookie policy",
  description:
    "Quali cookie usa Hub Hotel Manager: tecnici sempre attivi e analitici (Google Analytics 4) solo dopo il tuo consenso. Come gestire o revocare le preferenze.",
  alternates: { canonical: "/cookie" },
  robots: { index: false, follow: true },
};

export default function Cookie() {
  return (
    <LegalLayout title="Cookie policy" updated="8 giugno 2026">
      <h2>1. Cosa sono i cookie</h2>
      <p>
        I cookie sono piccoli file di testo che i siti web salvano sul tuo dispositivo — computer, tablet o smartphone —
        mentre li navighi. Servono a far funzionare correttamente le pagine, a ricordare le tue scelte e, in alcuni
        casi, a raccogliere informazioni statistiche su come usi il sito. Accanto ai cookie esistono tecnologie simili
        (come i cosiddetti <em>local storage</em> e i <em>pixel</em>): in questa policy le chiamiamo tutte
        &quot;cookie&quot; per semplicità.
      </p>
      <p>
        Non tutti i cookie sono uguali. Alcuni sono indispensabili: senza di loro il sito non funziona. Altri non sono
        necessari, e per questi la legge richiede il tuo consenso preventivo: puoi accettarli o rifiutarli liberamente,
        e cambiare idea quando vuoi.
      </p>
      <p>
        Il titolare del trattamento dei dati raccolti tramite i cookie di questo sito è <strong>Staymore</strong>{" "}
        <PH>[ragione sociale, sede e dati di contatto da inserire in fase di validazione legale]</PH>. I dati possono
        essere condivisi con <strong>Green Consulting</strong> per il routing dei contatti, come descritto nella{" "}
        <Link href="/privacy">privacy policy</Link>.
      </p>
      <aside className="legal-callout">
        <span className="lc-label">In sintesi</span>
        I cookie sono piccoli file di testo salvati sul tuo dispositivo. Su questo sito usiamo cookie tecnici (sempre
        attivi) e cookie analitici (solo dopo il tuo consenso).
      </aside>

      <h2>2. Cookie tecnici (sempre attivi)</h2>
      <p>
        I cookie tecnici sono <strong>necessari al funzionamento del sito</strong> e sono sempre attivi: non richiedono
        il tuo consenso perché senza di essi le pagine non potrebbero funzionare correttamente. Rientrano in questa
        categoria, ad esempio, i cookie che ricordano le tue preferenze sui cookie stessi (così non ti riproponiamo il
        banner a ogni visita), quelli che garantiscono la sicurezza e la corretta navigazione e quelli tecnici legati
        all&apos;infrastruttura del sito.
      </p>
      <p>
        Questi cookie <strong>non vengono usati per profilarti</strong> né per finalità pubblicitarie. Trattandosi di
        cookie indispensabili, restano attivi anche se rifiuti gli altri: puoi comunque bloccarli dal tuo browser, ma in
        tal caso alcune parti del sito potrebbero non funzionare.
      </p>
      <aside className="legal-callout">
        <span className="lc-label">In sintesi</span>
        I cookie tecnici sono sempre attivi perché necessari al funzionamento del sito. Non servono a profilarti e non
        richiedono consenso.
      </aside>

      <h2>3. Cookie analitici (Google Analytics 4)</h2>
      <p>
        Usiamo <strong>Google Analytics 4</strong> per capire, in forma aggregata, come viene usato il sito: quali
        pagine sono più lette, da quali fonti arrivano i visitatori, quali contenuti funzionano meglio. Ci serve a
        migliorare le guide e gli strumenti che pubblichiamo.
      </p>
      <p>
        Questi cookie <strong>non sono necessari al funzionamento del sito</strong> e per questo li attiviamo{" "}
        <strong>solo dopo il tuo consenso esplicito</strong>, raccolto tramite il banner che vedi alla prima visita.
        Finché non scegli, gli analitici restano spenti.
      </p>
      <p>Dal banner puoi:</p>
      <ul>
        <li><strong>Accettare</strong> — attivi i cookie analitici;</li>
        <li><strong>Rifiutare</strong> — il sito continua a funzionare con i soli cookie tecnici;</li>
        <li><strong>Preferenze</strong> — scegli nel dettaglio quali categorie autorizzare.</li>
      </ul>
      <p>
        Il fornitore di questo servizio è <strong>Google</strong> (Google Ireland Ltd. / Google LLC){" "}
        <PH>[verificare il titolare effettivo del servizio e l&apos;eventuale trasferimento dati extra-UE]</PH>. Per
        maggiori informazioni puoi consultare l&apos;informativa privacy di Google.
      </p>
      <aside className="legal-callout">
        <span className="lc-label">In sintesi</span>
        I cookie analitici (Google Analytics 4) si attivano solo dopo il consenso prestato dal banner. Puoi accettare,
        rifiutare o impostare le tue preferenze; finché non scegli, restano disattivati.
      </aside>

      <h2>4. Tabella dei cookie</h2>
      <p>Di seguito l&apos;elenco dei cookie usati su questo sito, con finalità, durata e fornitore.</p>
      <table>
        <caption>Tabella — cookie impostati sul sito (da completare in fase di build).</caption>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Finalità</th>
            <th>Durata</th>
            <th>Fornitore</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><PH>[consenso cookie]</PH></td>
            <td>Tecnico</td>
            <td>Ricorda le preferenze sui cookie</td>
            <td><PH>[durata]</PH></td>
            <td>Hub Hotel Manager</td>
          </tr>
          <tr>
            <td><code>_ga</code>, <code>_ga_&lt;id&gt;</code></td>
            <td>Analitico</td>
            <td>Statistiche di navigazione aggregate</td>
            <td><PH>[durata]</PH></td>
            <td>Google</td>
          </tr>
        </tbody>
      </table>
      <p>
        <PH>
          [Da rilevare sull&apos;ambiente di produzione: nome, finalità, durata e fornitore di ciascun cookie
          effettivamente impostato. Mantenere la tabella aggiornata a ogni modifica degli strumenti.]
        </PH>
      </p>

      <h2>5. Come gestire o revocare il consenso</h2>
      <p>
        Puoi <strong>cambiare o revocare le tue scelte in qualsiasi momento</strong>, senza che questo pregiudichi il
        funzionamento dei cookie tecnici.
      </p>
      <ul>
        <li>
          <strong>Dal sito:</strong> riapri il pannello delle preferenze cookie tramite il link &quot;Preferenze
          cookie&quot; presente nel footer di ogni pagina. Da lì puoi attivare o disattivare le categorie non
          necessarie.
        </li>
        <li>
          <strong>Dal browser:</strong> puoi bloccare o eliminare i cookie già salvati dalle impostazioni del tuo
          browser. Le procedure variano da browser a browser (Chrome, Safari, Firefox, Edge): trovi le istruzioni nelle
          rispettive sezioni di aiuto. Bloccando tutti i cookie alcune funzioni del sito potrebbero non essere
          disponibili.
        </li>
      </ul>
      <p>
        La revoca del consenso vale per il futuro: i dati eventualmente già raccolti restano trattati secondo quanto
        indicato nella privacy policy.
      </p>

      <h2>6. Privacy policy e contatti</h2>
      <p>
        Per sapere quali dati personali trattiamo, con quali finalità e basi giuridiche, per quanto tempo li conserviamo
        e come esercitare i tuoi diritti, consulta la nostra <Link href="/privacy">privacy policy</Link>.
      </p>
      <p>
        <PH>[Dati di contatto del titolare Staymore e dell&apos;eventuale responsabile/DPO — da inserire in fase di validazione legale.]</PH>
      </p>
    </LegalLayout>
  );
}
