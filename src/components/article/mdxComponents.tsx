import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { slugify } from "@/lib/slug";
import { CtaWaitlist } from "./CtaWaitlist";
import { DiagramBars } from "./DiagramBars";
import { Figure } from "./Figure";

function textOf(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textOf((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

// Mappa dei componenti per MDXRemote: heading con id (per la TOC),
// link interni via next/link, più i componenti custom CtaWaitlist/Figure.
export const mdxComponents = {
  h2: ({ children, ...rest }: ComponentProps<"h2">) => (
    <h2 id={slugify(textOf(children))} {...rest}>
      {children}
    </h2>
  ),
  h3: ({ children, ...rest }: ComponentProps<"h3">) => (
    <h3 id={slugify(textOf(children))} {...rest}>
      {children}
    </h3>
  ),
  a: ({ href = "", children, ...rest }: ComponentProps<"a">) => {
    if (href.startsWith("/")) {
      return (
        <Link href={href} {...rest}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  },
  CtaWaitlist,
  DiagramBars,
  Figure,
};
