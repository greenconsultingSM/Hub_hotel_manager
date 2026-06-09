import { SubscribeForm } from "./SubscribeForm";

// Sezione iscrizione condivisa (CTA finale ricorrente).
// Definita in globali-header-footer.md: occhiello "Aggiornamenti",
// titolo "Le guide migliori, direttamente nella tua casella", form + nota.
export function SubscribeSection({ source = "aggiornamenti" }: { source?: string }) {
  return (
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
          <SubscribeForm variant="final" source={source} />
        </div>
        <div className="note reveal" data-d="3">
          Niente spam. Puoi disiscriverti quando vuoi.
        </div>
      </div>
    </section>
  );
}
