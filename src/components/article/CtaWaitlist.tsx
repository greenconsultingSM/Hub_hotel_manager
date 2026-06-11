import Link from "next/link";
import { Icon } from "@/components/Icon";

// CTA inline negli articoli: rimanda alla waitlist dell'ebook.
// `final` = la ripresa a fine articolo: titolo e bottone diversi dalla prima.
export function CtaWaitlist({ text, final = false }: { text: string; final?: boolean }) {
  return (
    <aside className="inline-cta">
      <div>
        <h3>{final ? "Ricevi la guida appena esce" : "Guida alla disintermediazione"}</h3>
        <p>{text}</p>
      </div>
      <Link className="btn btn-primary" href="/risorse/guida-disintermediazione">
        {final ? "Avvisami" : "Lascia l'email"} <Icon name="arrow" />
      </Link>
    </aside>
  );
}
