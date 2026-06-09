import Link from "next/link";

// Paginazione via ?page=N (link reali, crawlabili). La pagina 1 è l'URL base.
export function Pagination({ page, totalPages, basePath }: { page: number; totalPages: number; basePath: string }) {
  if (totalPages <= 1) return null;
  const href = (p: number) => (p <= 1 ? basePath : `${basePath}?page=${p}`);
  return (
    <nav className="mag-pagination" aria-label="Paginazione">
      {page > 1 ? (
        <Link className="mp-link" href={href(page - 1)}>‹ Più recenti</Link>
      ) : (
        <span className="mp-link is-off">‹ Più recenti</span>
      )}
      <span className="mp-status">Pagina {page} di {totalPages}</span>
      {page < totalPages ? (
        <Link className="mp-link" href={href(page + 1)}>Meno recenti ›</Link>
      ) : (
        <span className="mp-link is-off">Meno recenti ›</span>
      )}
    </nav>
  );
}
