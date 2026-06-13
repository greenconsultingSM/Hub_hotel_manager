import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ArchiveView } from "@/components/magazine/ArchiveView";
import { getCategoria, CATEGORIA_SLUGS } from "@/lib/taxonomy";
import { getPostsByCategory, getAllTags, getIndexablePosts, MAGAZINE_BASE } from "@/lib/magazine";
import { collectionSchema } from "@/lib/magazine-schema";

export function generateStaticParams() {
  return CATEGORIA_SLUGS.map((cat) => ({ cat }));
}

export async function generateMetadata({ params }: { params: Promise<{ cat: string }> }): Promise<Metadata> {
  const { cat } = await params;
  const c = getCategoria(cat);
  if (!c) return {};
  // Thin content: la categoria entra nell'indice solo quando ha almeno
  // 2 articoli pubblicati; prima resta noindex,follow (navigabile, crawlabile).
  const count = getPostsByCategory(cat).filter((p) => p.frontmatter.index !== false).length;
  return {
    title: `${c.label} · Magazine`,
    description: c.descrizione,
    alternates: { canonical: `${MAGAZINE_BASE}/categoria/${cat}` },
    ...(count < 2 ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "website",
      title: `${c.label} · Magazine · Hub Hotel Manager`,
      description: c.descrizione,
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ cat: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { cat } = await params;
  const { page: ps } = await searchParams;
  const c = getCategoria(cat);
  if (!c) notFound();
  const page = Math.max(1, parseInt(ps ?? "1", 10) || 1);
  const posts = getPostsByCategory(cat).filter((p) => p.frontmatter.index !== false);
  const base = `${MAGAZINE_BASE}/categoria/${cat}`;

  return (
    <>
      <JsonLd data={collectionSchema(`${c.label} · Magazine`, base, posts)} />
      <ArchiveView
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Risorse", href: "/risorse" },
          { name: "Magazine", href: MAGAZINE_BASE },
          { name: c.label },
        ]}
        eyebrow={c.kind === "verticale" ? "Categoria" : "Approfondimento"}
        title={c.label}
        intro={c.descrizione}
        posts={posts}
        page={page}
        basePath={base}
        popular={getIndexablePosts().slice(0, 5)}
        tags={getAllTags().slice(0, 16)}
      />
    </>
  );
}
