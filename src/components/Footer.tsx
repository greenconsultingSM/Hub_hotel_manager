import Link from "next/link";
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

          {FOOTER_COLS.map((col) => (
            <div className="foot-col" key={col.title}>
              <h5>{col.title}</h5>
              {col.items.map((it) =>
                it.soon || !it.href ? (
                  <span key={it.label} className="is-soon" style={{ display: "block", padding: "7px 0", color: "rgba(255,255,255,.4)" }}>
                    {it.label} <span className="soon-badge" style={{ background: "rgba(255,255,255,.08)" }}>presto</span>
                  </span>
                ) : (
                  <Link key={it.label} href={it.href}>
                    {it.label}
                  </Link>
                ),
              )}
            </div>
          ))}
        </div>

        <div className="foot-partners">
          <span className="pp">Un progetto di</span>
          {SITE.partners.map((p) => (
            <a className="pplogo" key={p.name} href={p.url} target="_blank" rel="noopener noreferrer">
              {p.name}
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
