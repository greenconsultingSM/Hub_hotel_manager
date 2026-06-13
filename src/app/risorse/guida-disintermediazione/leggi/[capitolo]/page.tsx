import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Icon } from "@/components/Icon";
import { Breadcrumb } from "@/components/Breadcrumb";
import { EbookGate } from "@/components/ebook/EbookGate";
import { mdxComponents } from "@/components/article/mdxComponents";
import { EBOOK, getChapter, getChapters, hasEbookAccess } from "@/lib/ebook";

// Reader dell'ebook. Il capitolo 1 è l'anteprima libera; i capitoli 2-7 sono
// renderizzati SOLO se il cookie di sblocco è presente: il testo gated non
// raggiunge mai il client prima del gate (niente blur aggirabile).
// noindex: il reader converte, le query le coprono le guide del cluster.

export async function generateMetadata({ params }: { params: Promise<{ capitolo: string }> }): Promise<Metadata> {
  const { capitolo } = await params;
  const chap = getChapter(Number(capitolo));
  if (!chap) return {};
  return {
    title: `${EBOOK.titolo} · Capitolo ${chap.num}: ${chap.titolo}`,
    description: chap.abstract,
    robots: { index: false, follow: true },
  };
}

export default async function ReaderPage({ params }: { params: Promise<{ capitolo: string }> }) {
  const { capitolo } = await params;
  const num = Number(capitolo);
  const chap = getChapter(num);
  if (!chap) notFound();

  const unlocked = num <= EBOOK.freeChapters || (await hasEbookAccess());
  const all = getChapters();
  const prev = all.find((c) => c.num === num - 1);
  const next = all.find((c) => c.num === num + 1);

  return (
    <>
      <div className="wrap">
        <Breadcrumb
          items={[
            { name: "Home", href: "/" },
            { name: "Risorse", href: "/risorse" },
            { name: "Guida alla disintermediazione", href: "/risorse/guida-disintermediazione" },
            { name: `Capitolo ${chap.num}` },
          ]}
        />
      </div>

      <div className="wrap reader-wrap">
        <header className="reader-head">
          <span className="eyebrow">{EBOOK.titolo} · Reader</span>
          <div className="reader-progress" role="navigation" aria-label="Capitoli">
            {all.map((c) => (
              <Link
                key={c.num}
                href={`/risorse/guida-disintermediazione/leggi/${c.num}`}
                className={`rp-dot${c.num === num ? " is-current" : ""}`}
                title={`Capitolo ${c.num}: ${c.titolo}`}
              >
                {c.num}
              </Link>
            ))}
          </div>
          <h1>
            Capitolo {chap.num}: {chap.titolo}
          </h1>
          {chap.esclusivo && <span className="badge amber">Esclusivo dell&apos;ebook</span>}
        </header>

        {unlocked ? (
          <ReaderBody body={chap.body} />
        ) : (
          <>
            <p className="reader-abstract">{chap.abstract}</p>
            <EbookGate source={EBOOK.source} />
          </>
        )}

        <nav className="reader-nav" aria-label="Navigazione capitoli">
          {prev ? (
            <Link className="btn btn-ghost" href={`/risorse/guida-disintermediazione/leggi/${prev.num}`}>
              ← Capitolo {prev.num}
            </Link>
          ) : (
            <Link className="btn btn-ghost" href="/risorse/guida-disintermediazione">
              ← La guida
            </Link>
          )}
          {next && (
            <Link className="btn btn-primary" href={`/risorse/guida-disintermediazione/leggi/${next.num}`}>
              Capitolo {next.num} <Icon name="arrow" />
            </Link>
          )}
        </nav>
      </div>
    </>
  );
}

async function ReaderBody({ body }: { body: string }) {
  const { content } = await compileMDX({
    source: body,
    components: mdxComponents,
    // blockJS: false, MDX locale di prima parte (vedi pagine cluster): serve
    // per le props-espressione di <DiagramBars bars={[...]}/>.
    options: { parseFrontmatter: false, blockJS: false, mdxOptions: { remarkPlugins: [remarkGfm] } },
  });
  return <div className="prose reader-prose">{content}</div>;
}
