"use client";

import { Fragment, type ReactNode, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "./Icon";

export type FaqEntry = { q: string; a: string };

// Renderer inline sicuro (niente dangerouslySetInnerHTML): converte il markdown
// inline usato nelle risposte degli articoli — **grassetto**, *corsivo* e
// [testo](url) — in JSX. Gli href interni ("/...") usano next/link; quelli
// esterni un <a target=_blank rel=noopener>. Le FAQ della home (testo semplice)
// passano inalterate.
function renderInline(text: string): ReactNode {
  // Tokenizza su grassetto, corsivo e link senza sovrapposizioni: il grassetto
  // (**) prima del corsivo (*) per non spezzare gli asterischi doppi.
  const re = /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(\[([^\]]+)\]\(([^)]+)\))/g;
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(<Fragment key={key++}>{text.slice(last, m.index)}</Fragment>);
    if (m[2] !== undefined) {
      out.push(<strong key={key++}>{m[2]}</strong>);
    } else if (m[4] !== undefined) {
      out.push(<em key={key++}>{m[4]}</em>);
    } else if (m[6] !== undefined && m[7] !== undefined) {
      const label = m[6];
      const href = m[7];
      if (href.startsWith("/")) {
        out.push(
          <Link key={key++} href={href}>
            {label}
          </Link>,
        );
      } else {
        out.push(
          <a key={key++} href={href} target="_blank" rel="noopener">
            {label}
          </a>,
        );
      }
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(<Fragment key={key++}>{text.slice(last)}</Fragment>);
  return out;
}

function FaqItem({ entry }: { entry: FaqEntry }) {
  const [open, setOpen] = useState(false);
  const inner = useRef<HTMLDivElement>(null);

  return (
    <div className={`faq-item${open ? " open" : ""}`}>
      <button className="faq-q" type="button" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        {entry.q}
        <span className="pm">
          <Icon name="plus" />
        </span>
      </button>
      <div
        className="faq-a"
        style={{ maxHeight: open ? (inner.current?.scrollHeight ?? 600) : 0 }}
      >
        <div className="faq-a-inner" ref={inner}>
          {renderInline(entry.a)}
        </div>
      </div>
    </div>
  );
}

export function Faq({ items }: { items: FaqEntry[] }) {
  return (
    <div className="faq">
      {items.map((it) => (
        <FaqItem key={it.q} entry={it} />
      ))}
    </div>
  );
}
