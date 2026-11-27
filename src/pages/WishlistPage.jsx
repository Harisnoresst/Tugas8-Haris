import { Link } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import useFetch from '../hooks/useFetch'
import { useShop } from '../context/ShopContext'
import { getProducts } from '../services/productService'

export default function WishlistPage() {
  const { wishlist } = useShop()
  const { data, loading, error, retry } = useFetch(getProducts, [])
  const items = data ? data.filter((p) => wishlist.includes(p.id)) : []

  return (
    <section className="section">
      <h2>Produk favorit</h2>
      {loading && <Spinner />}
      {error && <ErrorMessage message={error} onRetry={retry} />}
      {data && (
        <ProductGrid products={items} emptyTitle="Belum ada favorit" emptyText="Tekan ikon hati pada produk untuk menyimpannya di sini.">
          <Link to="/produk" className="btn btn-primary btn-small">Jelajahi produk</Link>
        </ProductGrid>
      )}
    </section>
  )
}
