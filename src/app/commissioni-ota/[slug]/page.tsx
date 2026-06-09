import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getPillar, getSpokes, CLUSTER, type Article } from "@/lib/articles";
import { mdxComponents } from "@/components/article/mdxComponents";
import { ArticleView } from "@/components/article/ArticleView";

export function generateStaticParams() {
  return getSpokes().map((a) => ({ slug: a.slug }));
}

function findSpoke(slug: string): Article | undefined {
  return getSpokes().find((a) => a.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = findSpoke(slug);
  if (!article) return {};
  return {
    title: article.frontmatter.title,
    description: article.frontmatter.descrizione,
    alternates: { canonical: `/${CLUSTER.slug}/${slug}` },
    // Bozza YMYL in attesa di validazione: noindex,follow finché non è validata.
    ...(article.frontmatter.index === false ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "article",
      title: article.frontmatter.title,
      description: article.frontmatter.descrizione,
    },
  };
}

export default async function SpokePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = findSpoke(slug);
  if (!article) notFound();

  const { content } = await compileMDX({
    source: article.body,
    components: mdxComponents,
    options: { parseFrontmatter: false, mdxOptions: { remarkPlugins: [remarkGfm] } },
  });

  const pillar = getPillar();
  const related = [
    ...(pillar ? [pillar] : []),
    ...getSpokes().filter((a) => a.slug !== slug),
  ].slice(0, 3);

  return <ArticleView article={article} related={related} mdxContent={content} />;
}
