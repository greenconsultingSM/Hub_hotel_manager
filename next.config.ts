import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // URL senza trailing slash, coerenti con i link interni e i canonical.
  trailingSlash: false,
  // next/image serve AVIF/WebP ai browser che li supportano (cover magazine).
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      {
        // Cover e asset in /public/magazine: cache lunga lato CDN/browser.
        // Non immutable: i file non sono content-hashed, 7 giorni + SWR.
        source: "/magazine/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
    ];
  },
};

export default nextConfig;
