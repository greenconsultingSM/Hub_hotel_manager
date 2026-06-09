"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Aggiunge la classe ".in" agli elementi ".reveal" quando entrano nel viewport.
// Replica lo scroll-reveal del mockup. Montato una volta nel layout, ma l'effetto
// si ri-esegue a ogni cambio rotta (pathname): nella navigazione client di Next
// il layout non si rimonta, quindi senza questo gli elementi .reveal delle nuove
// pagine non verrebbero mai osservati e resterebbero invisibili (opacity:0).
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.in)"));
    if (!els.length) return;

    if (typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
