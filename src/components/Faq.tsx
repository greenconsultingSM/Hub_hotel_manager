"use client";

import { useRef, useState } from "react";
import { Icon } from "./Icon";

export type FaqEntry = { q: string; a: string };

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
          {entry.a}
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
