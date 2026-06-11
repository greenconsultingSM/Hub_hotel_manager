import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { ScrollReveal } from "@/components/ScrollReveal";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Hub Hotel Manager — Guide e strumenti per il tuo hotel",
    template: "%s — Hub Hotel Manager",
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: "Redazione Hub Hotel Manager" }],
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: SITE.name,
    title: "Hub Hotel Manager — Guide e strumenti per il tuo hotel",
    description: SITE.description,
  },
  // L'immagine la fornisce opengraph-image.tsx (file convention); la card
  // grande fa sì che X/Twitter la usi come og:image fallback.
  twitter: {
    card: "summary_large_image",
    title: "Hub Hotel Manager — Guide e strumenti per il tuo hotel",
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  logo: `${SITE.url}/opengraph-image`,
  sameAs: SITE.partners.map((p) => p.url),
};

const siteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  inLanguage: "it-IT",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={jakarta.variable}>
      <body>
        <noscript>
          <style>{".reveal{opacity:1 !important;transform:none !important}"}</style>
        </noscript>
        <a href="#contenuto" className="skip-link">Vai al contenuto</a>
        <JsonLd data={[orgLd, siteLd]} />
        <Header />
        <main id="contenuto">{children}</main>
        <Footer />
        <CookieBanner />
        <ScrollReveal />
      </body>
    </html>
  );
}
