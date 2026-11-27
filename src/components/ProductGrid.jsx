import ProductCard from './ProductCard'
import EmptyState from './EmptyState'

export default function ProductGrid({ products, emptyTitle = 'Produk tidak ditemukan', emptyText = 'Coba ganti kata kunci atau kategori.', children }) {
  if (products.length === 0) return <EmptyState title={emptyTitle} text={emptyText}>{children}</EmptyState>
  return (
    <div className="grid">
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  )
}
