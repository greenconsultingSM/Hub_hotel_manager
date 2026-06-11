"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

// Calcolatore commissioni OTA — tool libero, 100% lato client (nessun backend).
// Modello validato: vedi CONTESTO/Sito_web/metodo-calcolatore-ota.md.
// Scelte: risparmio NETTO (sottrae il CAC del diretto); toggle IVA host senza
// P.IVA; value uplift 516/312 solo come nota (non nel calcolo).

const AIRBNB_FEE = 0.155; // host-only fee Italia/EU (Airbnb ufficiale, art. 1857)

const eur = (n: number, dp = 0) =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: dp,
    maximumFractionDigits: dp,
    useGrouping: "always",
  }).format(Number.isFinite(n) ? n : 0);

// Decimale it-IT (virgola), per il payback in mesi.
const dec1 = (n: number) => new Intl.NumberFormat("it-IT", { maximumFractionDigits: 1 }).format(n);

type State = {
  camere: number;
  occ: number;
  adr: number;
  qOTA: number;
  cOTA: number;
  hostNoVat: boolean;
  shift: number;
  cac: number;
  be: number;
};

const DEFAULTS: State = { camere: 20, occ: 70, adr: 155, qOTA: 61, cOTA: 18, hostNoVat: false, shift: 20, cac: 11, be: 100 };

// Anima il numero verso il target (easing cubic-out). Primo render statico;
// rispetta prefers-reduced-motion.
function useCountUp(target: number, ms = 600): number {
  const [shown, setShown] = useState(target);
  const prev = useRef(target);
  useEffect(() => {
    const from = prev.current;
    prev.current = target;
    if (from === target) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(from + (target - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return shown;
}

function Num({
  label,
  hint,
  suffix,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
}: {
  label: ReactNode;
  hint?: ReactNode;
  suffix?: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  const id = useId();
  // L'attributo HTML max vincola solo le freccette, non la digitazione:
  // il clamp va fatto qui, sennò "occupazione 150%" produce numeri assurdi.
  const clamp = (n: number) => {
    if (!Number.isFinite(n)) return min;
    const lo = Math.max(min, n);
    return max !== undefined ? Math.min(max, lo) : lo;
  };
  return (
    <div className="field">
      <label htmlFor={id}>
        <span>{label}</span>
        {hint && <span className="hint">{hint}</span>}
      </label>
      <div className="num">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={Number.isFinite(value) ? value : min}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(clamp(e.target.value === "" ? min : Number(e.target.value)))}
        />
        {suffix && <span className="num-suffix">{suffix}</span>}
      </div>
    </div>
  );
}

export function CommissionCalculator() {
  const [s, setS] = useState<State>(DEFAULTS);
  const set = <K extends keyof State>(k: K) => (v: State[K]) => setS((p) => ({ ...p, [k]: v }));

  const iva = s.hostNoVat ? 1.22 : 1;
  const notti = s.camere * 365 * (s.occ / 100);
  const ricavo = notti * s.adr;
  const ricavoOTA = ricavo * (s.qOTA / 100);
  const costoOTA = ricavoOTA * (s.cOTA / 100) * iva;

  const rShift = ricavoOTA * (s.shift / 100);
  const commRisp = rShift * (s.cOTA / 100) * iva;
  const costoDir = rShift * (s.cac / 100);
  const risparmio = commRisp - costoDir;

  const costoBE = s.be * 12;
  const beneficio = risparmio - costoBE;
  // Il BE "si ripaga" solo se il risparmio annuo supera il canone annuo
  // (costo ricorrente: sotto quella soglia non si ripaga MAI, non "in più mesi").
  const payback = risparmio > costoBE ? costoBE / (risparmio / 12) : null;

  const otaNet = 100 * (1 - (s.cOTA / 100) * iva);
  const dirNet = 100 * (1 - s.cac / 100);
  const airbnbNet = 100 * (1 - AIRBNB_FEE * iva);
  const channels = [
    { k: "Diretto", v: dirNet, accent: true },
    { k: "Airbnb", v: airbnbNet, accent: false },
    { k: "OTA (Booking)", v: otaNet, accent: false },
  ].sort((a, b) => b.v - a.v);

  const bigShown = useCountUp(costoOTA);

  return (
    <>
      <div className="calc-card reveal" data-d="1">
        <div className="calc-form">
          <div className="form-title">I dati della tua struttura</div>

          <Num label="Camere" value={s.camere} onChange={set("camere")} min={1} />
          <Num label="Occupazione media" hint="annua" suffix="%" value={s.occ} onChange={set("occ")} max={100} />
          <Num label="Prezzo medio a notte (ADR)" suffix="€" value={s.adr} onChange={set("adr")} />
          <Num label="Quota prenotazioni via OTA" suffix="%" value={s.qOTA} onChange={set("qOTA")} max={100} />
          <Num label="Commissione media OTA" hint="es. 15–18%" suffix="%" value={s.cOTA} onChange={set("cOTA")} max={100} step={0.5} />

          <label className="calc-toggle">
            <input type="checkbox" checked={s.hostNoVat} onChange={(e) => set("hostNoVat")(e.target.checked)} />
            <span className="switch" aria-hidden="true" />
            <span>
              Sono un host <strong>senza Partita IVA</strong>
              <em>stima: aggiunge l&apos;IVA 22% sulla commissione (non recuperabile) — verifica col tuo commercialista</em>
            </span>
          </label>

          <details className="calc-adv">
            <summary>Ipotesi avanzate (modificabili)</summary>
            <Num label="Prenotazioni OTA da spostare sul diretto" suffix="%" value={s.shift} onChange={set("shift")} max={100} />
            <Num
              label="Costo di acquisizione del diretto"
              hint="metasearch, ads…"
              suffix="%"
              value={s.cac}
              onChange={set("cac")}
              max={100}
              step={0.5}
            />
            <Num label="Booking engine" hint="canone" suffix="€/mese" value={s.be} onChange={set("be")} />
          </details>
        </div>

        <div className="calc-result">
          <div className="r-label">Quanto ti costano le OTA</div>
          <div className="r-big">{eur(bigShown)}</div>
          <div className="r-cap">
            all&apos;anno in commissioni (~{eur(costoOTA / 12)}/mese){s.hostNoVat ? ", IVA 22% inclusa" : ""}.
          </div>

          <div className="r-sub">
            <div className="r-stat">
              <div className="v">{eur(risparmio)}</div>
              <div className="k">Risparmio netto/anno spostando il {s.shift}% sul diretto</div>
            </div>
            <div className="r-stat">
              <div className="v">{eur(beneficio)}</div>
              <div className="k">Beneficio netto anno 1, tolto il booking engine ({eur(costoBE)}/anno)</div>
            </div>
            <div className="r-stat">
              <div className="v">{payback === null ? "Non si ripaga" : `${dec1(payback)} mesi`}</div>
              <div className="k">
                Payback del booking engine ({eur(s.be)}/mese)
                {payback === null ? " — con questi numeri il canone supera il risparmio" : ""}
              </div>
            </div>
          </div>

          <div className="r-note">
            Risparmio <strong>netto</strong> = commissione evitata {eur(commRisp)} − costo del diretto {eur(costoDir)}.
          </div>
        </div>
      </div>

      <div className="calc-channels reveal" data-d="2">
        <h2 className="chx-title">Quanto ti resta su 100 € di prenotazione, per canale</h2>
        <div className="chx-legend" aria-hidden="true">
          <span className="lg lg-keep" /> ti resta
          <span className="lg lg-cost" /> costo del canale
        </div>
        <div className="chx-list">
          {channels.map((c) => {
            const keep = Math.max(0, Math.min(100, c.v));
            return (
              <div className={`chx${c.accent ? " is-best" : ""}`} key={c.k}>
                <div className="chx-top">
                  <span className="chx-k">{c.k}</span>
                  <span className="chx-v">{eur(c.v, 1)}</span>
                </div>
                <div className="chx-bar">
                  <span className="seg-keep" style={{ width: `${keep}%` }} />
                  <span className="seg-cost" style={{ width: `${100 - keep}%` }} />
                </div>
              </div>
            );
          })}
        </div>
        <p className="chx-note">
          Confronto a parità di prezzo esposto. Le prenotazioni dirette tendono inoltre a valere di più (in media{" "}
          <strong>US$516 vs US$312</strong> via OTA, fonte SiteMinder): qui non lo conteggiamo, per restare prudenti.
        </p>
      </div>
    </>
  );
}
