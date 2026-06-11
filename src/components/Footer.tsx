import Link from "next/link";
import Image from "next/image";
import { Icon } from "./Icon";
import { SubscribeForm } from "./SubscribeForm";
import { SITE, FOOTER_COLS, LEGAL_LINKS } from "@/lib/site";

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <Link href="/" className="brand">
              <span className="brand-mark">
                <Icon name="logo" />
              </span>
              Hub Hotel Manager
            </Link>
            <p>
              Fai crescere il tuo hotel. Guide, strumenti e analisi per chi gestisce in autonomia.
            </p>
            <SubscribeForm variant="footer" />
          </div>

          {FOOTER_COLS.map((col) => {
            const active = col.items.filter((it) => !it.soon && it.href);
            const soon = col.items.filter((it) => it.soon || !it.href);
            return (
              <div className="foot-col" key={col.title}>
                <h5>{col.title}</h5>
                {active.map((it) => (
                  <Link key={it.label} href={it.href!}>
                    {it.label}
                  </Link>
                ))}
                {/* le voci future in una riga sola: il footer mostra solo ciò che esiste */}
                {soon.length > 0 && (
                  <p className="foot-soon">In arrivo: {soon.map((it) => it.label).join(" · ")}</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="foot-partners">
          <span className="pp">Un progetto di</span>
          {SITE.partners.map((p) => (
            <a className="pplogo" key={p.name} href={p.url} target="_blank" rel="noopener noreferrer">
              <Image src={p.logo} alt={p.name} width={p.logoWidth} height={p.logoHeight} />
            </a>
          ))}
          <span className="pp" style={{ flexBasis: "100%", marginTop: 4 }}>
            Uno spazio pensato per la crescita dell&apos;albergatore indipendente.
          </span>
        </div>

        <div className="foot-bottom">
          <div className="cr">© 2026 Hub Hotel Manager. Tutti i diritti riservati.</div>
          <div className="legal">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.label} href={l.href ?? "/"}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
