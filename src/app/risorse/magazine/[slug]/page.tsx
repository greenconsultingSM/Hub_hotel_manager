import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getMagazineSlugs, getMagazinePost, getRelatedPosts, coverUrl, MAGAZINE_BASE } from "@/lib/magazine";
import { magazineMdxComponents } from "@/components/magazine/magazineMdx";
import { MagazineArticleView } from "@/components/magazine/MagazineArticleView";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return getMagazineSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getMagazinePost(slug);
  if (!post) return {};
  const fm = post.frontmatter;
  const img = coverUrl(fm.cover, SITE.url);
  return {
    title: fm.title,
    description: fm.descrizione ?? fm.sintesi,
    alternates: { canonical: `${MAGAZINE_BASE}/${slug}` },
    ...(fm.index === false ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "article",
      title: fm.title,
      description: fm.descrizione ?? fm.sintesi,
      url: `${SITE.url}${MAGAZINE_BASE}/${slug}`,
      ...(fm.datePublished ? { publishedTime: fm.datePublished } : {}),
      ...(fm.dateModified ?? fm.datePublished ? { modifiedTime: fm.dateModified ?? fm.datePublished } : {}),
      ...(img ? { images: [img] } : {}),
    },
  };
}

export default async function MagazinePostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getMagazinePost(slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.body,
    components: magazineMdxComponents,
    options: { parseFrontmatter: false, mdxOptions: { remarkPlugins: [remarkGfm] } },
  });

  return <MagazineArticleView post={post} related={getRelatedPosts(post, 6)} mdxContent={content} />;
}
