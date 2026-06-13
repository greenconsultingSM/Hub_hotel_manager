import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

// Immagine OG di default del sito (condivisioni WhatsApp/LinkedIn/X).
// Generata a build time: stessa palette del design system.
export const alt = `${SITE.name} · ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(160deg, #1f1f1f 0%, #0c0c0c 75%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 14,
              background: "#FF9634",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#2b1503",
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            H
          </div>
          {SITE.name}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#FF9634",
            }}
          >
            Per chi gestisce un hotel in autonomia
          </div>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em", maxWidth: 980 }}>
            L&apos;hub che fa crescere il tuo hotel
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.4, color: "rgba(255,255,255,0.66)", maxWidth: 900 }}>
            Guide, strumenti e analisi per disintermediare le OTA e far crescere i ricavi diretti.
          </div>
        </div>

        <div style={{ display: "flex", width: "100%", height: 10, borderRadius: 99, background: "#FF9634" }} />
      </div>
    ),
    size,
  );
}
