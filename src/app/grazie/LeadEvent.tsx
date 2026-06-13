"use client";

import { useEffect } from "react";

// Evento GA4 standard `generate_lead` con la provenienza come parametro.
// Difensivo: gtag può non esserci (GA4 non ancora cablato, consenso negato,
// ad-blocker): in quel caso non succede nulla. Zero PII nell'evento.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function LeadEvent({ source }: { source: string }) {
  useEffect(() => {
    window.gtag?.("event", "generate_lead", { lead_source: source });
  }, [source]);
  return null;
}
