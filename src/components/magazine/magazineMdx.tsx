import Link from "next/link";
import type { ComponentProps } from "react";
import { mdxComponents } from "@/components/article/mdxComponents";

// Set MDX del Magazine: riusa quello dei cluster (heading con id, componenti),
// ma sui link ESTERNI aggiunge rel="nofollow" — così il blocco "Fonti" non
// cede link equity in uscita. Nessuna modifica al set dei cluster.
export const magazineMdxComponents = {
  ...mdxComponents,
  a: ({ href = "", children, ...rest }: ComponentProps<"a">) => {
    if (href.startsWith("/") || href.startsWith("#")) {
      return (
        <Link href={href} {...rest}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="nofollow noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  },
};
