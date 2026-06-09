import Link from "next/link";
import { Icon } from "@/components/Icon";

// CTA inline negli articoli: rimanda alla waitlist dell'ebook.
export function CtaWaitlist({ text }: { text: string }) {
  return (
    <aside className="inline-cta">
      <div>
        <h3>Guida alla disintermediazione</h3>
        <p>{text}</p>
      </div>
      <Link className="btn btn-primary" href="/risorse/guida-disintermediazione">
        Lascia l&apos;email <Icon name="arrow" />
      </Link>
    </aside>
  );
}
