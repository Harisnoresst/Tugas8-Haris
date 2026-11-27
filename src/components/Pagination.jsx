export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
  return (
    <nav className="pagination" aria-label="Halaman">
      <button className="chip" disabled={page === 1} onClick={() => onChange(page - 1)}>‹ Sebelumnya</button>
      {pages.map((p, i) => (
        <span key={p} className="page-item">
          {i > 0 && p - pages[i - 1] > 1 && <span className="ellipsis">…</span>}
          <button className={`chip ${p === page ? 'active' : ''}`} onClick={() => onChange(p)} aria-current={p === page ? 'page' : undefined}>{p}</button>
        </span>
      ))}
      <button className="chip" disabled={page === totalPages} onClick={() => onChange(page + 1)}>Berikutnya ›</button>
    </nav>
  )
}
