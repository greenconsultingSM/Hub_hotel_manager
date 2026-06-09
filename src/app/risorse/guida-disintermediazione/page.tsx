import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SubscribeForm } from "@/components/SubscribeForm";

export const metadata: Metadata = {
  title: "Guida gratuita alla disintermediazione",
  description:
    "Come pagare meno OTA: la guida pratica per l'albergatore indipendente. Lascia l'email e la ricevi appena esce.",
  alternates: { canonical: "/risorse/guida-disintermediazione" },
  openGraph: {
    type: "website",
    title: "Guida gratuita alla disintermediazione — Hub Hotel Manager",
    description: "Come pagare meno OTA: la guida pratica per l'albergatore indipendente.",
  },
};

const learn = [
  ["Quanto pesano davvero le commissioni", " sul margine di ogni camera, con il costo reale messo nero su bianco."],
  ["Le leve concrete per ridurle", " senza perdere visibilità sui portali."],
  ["Gli aspetti fiscali spiegati con chiarezza", " — deducibilità, IVA e fattura, aggiornati alle regole 2026."],
  ["Come costruire il canale diretto", " passo dopo passo, in modo misurabile."],
  ["Gli errori da evitare", " nel percorso di disintermediazione, prima che costino margine."],
];

const chapters = [
  ["Capitolo 01", "Quanto costano davvero le OTA", "Il costo reale della commissione, oltre la percentuale nominale: come incide sul margine di ogni prenotazione."],
  ["Capitolo 02", "Le leve per ridurre le commissioni", "Le azioni legittime per pagare meno, dal contratto al canale diretto, senza sparire dai portali."],
  ["Capitolo 03", "Fisco: deducibilità, IVA e fattura", "Quando le commissioni sono deducibili a seconda del regime, come funziona l'IVA e cosa controllare in fattura, alle regole 2026."],
  ["Capitolo 04", "Costruire il canale diretto", "La roadmap per far crescere le prenotazioni dirette e renderle misurabili nel tempo."],
];

const related = [
  { badge: "Disintermediazione", title: "Commissioni Booking e OTA: la guida completa", meta: "Pilastro · Disintermediazione", href: "/commissioni-ota" },
  { badge: "Disintermediazione", title: "Come pagare meno commissioni a Booking.com", meta: "Guida · Disintermediazione", href: "/commissioni-ota/come-pagare-meno-commissioni" },
  { badge: "Disintermediazione", title: "Come aumentare le prenotazioni dirette", meta: "Guida · Disintermediazione", href: "/commissioni-ota/aumentare-prenotazioni-dirette" },
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
                <Icon name="book" /> Ebook gratuito — in arrivo
              </span>
              <h1>Come pagare meno OTA: la guida pratica per l&apos;albergatore indipendente</h1>
              <p className="res-sub">
                La guida completa alla disintermediazione, scritta per chi gestisce un hotel in autonomia. Ti aiuta a
                capire quanto pesano davvero le commissioni, a ridurle con le leve giuste e a costruire un canale diretto
                che cresce nel tempo. La stiamo finendo di scrivere: lascia l&apos;email e la ricevi appena esce.
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
            </div>

            <div className="cover-card reveal" data-d="1">
              <div className="cover-ph ph">copertina ebook</div>
              <div className="cover-meta">
                <span className="cm-t">Ebook gratuito</span>
                <span className="cm-s">In arrivo</span>
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
              <h2>Lascia l&apos;email e ricevi la guida appena esce</h2>
              <p>
                Non è ancora scaricabile: la stiamo completando. Iscriviti alla lista d&apos;attesa e sarai tra i primi
                a riceverla, senza altre mail di mezzo.
              </p>
            </div>
            <SubscribeForm
              variant="lead"
              source="waitlist-ebook"
              cta="Avvisami"
              placeholder="La tua email professionale"
              confirm="Perfetto. Ti scriviamo appena la guida è pronta."
              fine={
                <>
                  Niente spam: ti scriviamo solo per avvisarti dell&apos;uscita. Puoi disiscriverti quando vuoi.
                  Trattiamo i tuoi dati come spiegato nella <Link href="/privacy">Privacy</Link>.
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
            {chapters.map(([num, title, text]) => (
              <article className="chap reveal" key={num}>
                <div className="chap-ph ph">capitolo</div>
                <div className="chap-body">
                  <div className="chap-num">{num}</div>
                  <h3>{title}</h3>
                  <p>{text}</p>
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
            {related.map((r) => (
              <Link className="spoke reveal" key={r.href} href={r.href}>
                <span className="badge amber">
                  <Icon name="compass" /> {r.badge}
                </span>
                <h3>{r.title}</h3>
                <div className="s-meta">
                  <span>{r.meta}</span>
                  <span className="s-arrow">
                    <Icon name="arrow" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
