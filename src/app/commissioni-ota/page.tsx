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
    },
  };
}

export default async function PillarPage() {
  const pillar = getPillar();
  if (!pillar) notFound();
  const { content } = await compileMDX({
    source: pillar.body,
    components: mdxComponents,
    options: { parseFrontmatter: false, mdxOptions: { remarkPlugins: [remarkGfm] } },
  });
  return <ArticleView article={pillar} related={getSpokes()} mdxContent={content} />;
}
