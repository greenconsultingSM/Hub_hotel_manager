import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getPillar, getSpokes, CLUSTER } from "@/lib/articles";
import { mdxComponents } from "@/components/article/mdxComponents";
import { ArticleView } from "@/components/article/ArticleView";

export function generateMetadata(): Metadata {
  const pillar = getPillar();
  if (!pillar) return {};
  return {
    title: pillar.frontmatter.title,
    description: pillar.frontmatter.descrizione,
    alternates: { canonical: `/${CLUSTER.slug}` },
    openGraph: {
      type: "article",
      title: pillar.frontmatter.title,
      description: pillar.frontmatter.descrizione,
      url: `/${CLUSTER.slug}`,
      ...(pillar.frontmatter.updated ? { modifiedTime: pillar.frontmatter.updated } : {}),
      ...(pillar.frontmatter.cover ? { images: [{ url: pillar.frontmatter.cover, width: 1600, height: 900 }] } : {}),
    },
  };
}

export default async function PillarPage() {
  const pillar = getPillar();
  if (!pillar) notFound();
  const { content } = await compileMDX({
    source: pillar.body,
    components: mdxComponents,
    // blockJS: false — l'MDX è contenuto locale di prima parte; serve per le
    // props-espressione dei componenti (es. <DiagramBars bars={[...]}/>).
    // blockDangerousJS resta attivo di default.
    options: { parseFrontmatter: false, blockJS: false, mdxOptions: { remarkPlugins: [remarkGfm] } },
  });
  return <ArticleView article={pillar} related={getSpokes()} mdxContent={content} />;
}
