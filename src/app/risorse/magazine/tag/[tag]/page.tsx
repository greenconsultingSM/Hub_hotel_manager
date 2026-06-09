import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchiveView } from "@/components/magazine/ArchiveView";
import { getPostsByTag, getAllTags, getIndexablePosts, MAGAZINE_BASE } from "@/lib/magazine";

// Pagine-tag: noindex,follow (thin content) — utili alla navigazione, fuori dall'indice.
export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `${tag} — Magazine`,
    description: `Articoli del Magazine sul tema ${tag}.`,
    alternates: { canonical: `${MAGAZINE_BASE}/tag/${tag}` },
    robots: { index: false, follow: true },
  };
}

export default async function TagPage({
  params,
  searchParams,
}: {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { tag } = await params;
  const { page: ps } = await searchParams;
  const posts = getPostsByTag(tag).filter((p) => p.frontmatter.index !== false);
  if (posts.length === 0) notFound();
  const page = Math.max(1, parseInt(ps ?? "1", 10) || 1);
  const base = `${MAGAZINE_BASE}/tag/${tag}`;

  return (
    <ArchiveView
      crumbs={[
        { name: "Home", href: "/" },
        { name: "Risorse", href: "/risorse" },
        { name: "Magazine", href: MAGAZINE_BASE },
        { name: `#${tag}` },
      ]}
      eyebrow="Argomento"
      title={tag}
      intro={`Tutti gli articoli del Magazine che parlano di ${tag}.`}
      posts={posts}
      page={page}
      basePath={base}
      popular={getIndexablePosts().slice(0, 5)}
      tags={getAllTags().slice(0, 16)}
    />
  );
}
