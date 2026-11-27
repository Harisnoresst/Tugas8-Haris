import CategoryFilter from '../components/CategoryFilter'
import Toolbar from '../components/Toolbar'
import ProductGrid from '../components/ProductGrid'
import Pagination from '../components/Pagination'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import useProducts from '../hooks/useProducts'

export default function ProductsPage() {
  const p = useProducts()

  return (
    <>
      <h2>Katalog produk</h2>
      {p.loading && <Spinner label="Memuat produk dari API…" />}
      {p.error && <ErrorMessage message={p.error} onRetry={p.retry} />}
      {!p.loading && !p.error && (
        <>
          <CategoryFilter categories={p.categories} active={p.category} onChange={p.setCategory} />
          <Toolbar query={p.q} onQuery={p.setQuery} sort={p.sort} onSort={p.setSort} count={p.total} />
          <ProductGrid
            products={p.items}
            emptyText={p.isFiltering ? 'Coba ganti kata kunci atau kategori.' : 'Katalog masih kosong.'}
          >
            {p.isFiltering && <button className="btn btn-primary btn-small" onClick={p.reset}>Reset filter</button>}
          </ProductGrid>
          <Pagination page={p.page} totalPages={p.totalPages} onChange={p.setPage} />
        </>
      )}
    </>
  )
}
