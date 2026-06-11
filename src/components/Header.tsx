"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Icon } from "./Icon";
import { IMPARA, STRUMENTI, SIMPLE_LINKS, type NavMenu } from "@/lib/site";

function MegaItem({ item }: { item: NavMenu["items"][number] }) {
  const inner = (
    <>
      <span className="mega-ico">
        <Icon name={item.icon ?? "arrow"} />
      </span>
      <span>
        <h4>{item.label}</h4>
        <p>{item.desc}</p>
      </span>
      {item.soon && <span className="soon-badge">presto</span>}
    </>
  );
  if (item.soon || !item.href) {
    return (
      <span className="mega-link is-soon" aria-disabled="true">
        {inner}
      </span>
    );
  }
  return (
    <Link className="mega-link" href={item.href}>
      {inner}
    </Link>
  );
}

function Mega({ menu, open, onOpen, onClose }: { menu: NavMenu; open: boolean; onOpen: () => void; onClose: () => void }) {
  return (
    <div className={`nav-item${open ? " open" : ""}`} onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button className="nav-link" type="button" aria-expanded={open} onClick={() => (open ? onClose() : onOpen())}>
        {menu.label} <Icon name="chevron" className="chev" />
      </button>
      <div className="mega">
        <div className="mega-grid">
          {menu.items.map((it) => (
            <MegaItem key={it.label} item={it} />
          ))}
        </div>
        <Link className="mega-promo" href={menu.promo.href}>
          <span className="tag">{menu.promo.tag}</span>
          <h4>{menu.promo.title}</h4>
          <p>{menu.promo.text}</p>
          <span className="promo-link">
            {menu.promo.cta} <Icon name="arrow" />
          </span>
        </Link>
      </div>
    </div>
  );
}

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Ritardo di chiusura ("intent delay"): evita che il mega-menu si chiuda se il
  // mouse esce per un istante o segue un percorso diagonale verso le voci.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openMega(name: string) {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenMenu(name);
  }

  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 160);
  }

  return (
    <div className="header-zone">
      <div className="header-pad">
        <nav className="navbar" aria-label="Principale">
          <Link href="/" className="brand">
            <span className="brand-mark">
              <Icon name="logo" />
            </span>
            Hub Hotel Manager
          </Link>

          <div className="nav-links">
            <Mega menu={IMPARA} open={openMenu === "impara"} onOpen={() => openMega("impara")} onClose={scheduleClose} />
            <Mega menu={STRUMENTI} open={openMenu === "strumenti"} onOpen={() => openMega("strumenti")} onClose={scheduleClose} />
            {SIMPLE_LINKS.map((l) => (
              <Link key={l.label} className="nav-link" href={l.href ?? "/"}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="nav-right">
            <Link className="btn btn-primary" href="#aggiornamenti" aria-label="Iscriviti agli aggiornamenti">
              <span className="btn-label">Iscriviti</span> <Icon name="arrow" />
            </Link>
            <button className="mobile-toggle" aria-label="Apri il menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen((v) => !v)}>
              <Icon name="menu" />
            </button>
          </div>
        </nav>

        {mobileOpen && (
          <button className="mobile-scrim" aria-label="Chiudi il menu" onClick={() => setMobileOpen(false)} />
        )}
        {mobileOpen && (
          <div className="mobile-overlay">
            <Link href="/commissioni-ota" onClick={() => setMobileOpen(false)}>Disintermediazione & OTA</Link>
            <Link href="/strumenti/calcolatore-commissioni-ota" onClick={() => setMobileOpen(false)}>Calcolatore commissioni OTA</Link>
            <Link href="/risorse/magazine" onClick={() => setMobileOpen(false)}>Magazine</Link>
            <Link href="/glossario" onClick={() => setMobileOpen(false)}>Glossario</Link>
            <Link href="/risorse" onClick={() => setMobileOpen(false)}>Risorse</Link>
            <Link href="/chi-siamo" onClick={() => setMobileOpen(false)}>Chi siamo</Link>
            <Link className="btn btn-primary" href="#aggiornamenti" onClick={() => setMobileOpen(false)}>
              Iscriviti <Icon name="arrow" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
