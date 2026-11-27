import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import ProductGrid from '../components/ProductGrid'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import useFetch from '../hooks/useFetch'
import { getProducts } from '../services/productService'

export default function HomePage() {
  const { data, loading, error, retry } = useFetch(getProducts, [])
  const top = data ? [...data].sort((a, b) => b.rating - a.rating).slice(0, 4) : []

  return (
    <>
      <Hero />
      <section className="section">
        <div className="section-head">
          <h2>Produk rating tertinggi</h2>
          <Link to="/produk" className="link">Lihat semua →</Link>
        </div>
        {loading && <Spinner />}
        {error && <ErrorMessage message={error} onRetry={retry} />}
        {data && <ProductGrid products={top} emptyText="Belum ada produk." />}
      </section>
    </>
  )
}
