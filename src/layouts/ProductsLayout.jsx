import { Link, Outlet, useLocation } from 'react-router-dom'

// Nested layout untuk /produk dan /produk/:id
export default function ProductsLayout() {
  const { pathname } = useLocation()
  const isDetail = pathname !== '/produk' && pathname !== '/produk/'
  return (
    <section className="section">
      <p className="breadcrumb">
        <Link to="/">Beranda</Link> / {isDetail ? <><Link to="/produk">Produk</Link> / Detail</> : 'Produk'}
      </p>
      <Outlet />
    </section>
  )
}
