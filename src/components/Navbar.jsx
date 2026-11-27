import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useShop } from '../context/ShopContext'

const links = [
  { to: '/', label: 'Beranda', end: true },
  { to: '/produk', label: 'Produk' },
  { to: '/favorit', label: 'Favorit' },
  { to: '/tentang', label: 'Tentang' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false) // local state: buka/tutup menu mobile
  const { cartCount, wishlist } = useShop()
  const close = () => setMenuOpen(false)

  return (
    <header className="navbar">
      <Link to="/" className="brand" onClick={close}><span /> HarisCommerce</Link>
      <button className="menu-toggle" onClick={() => setMenuOpen((o) => !o)} aria-expanded={menuOpen} aria-label="Buka menu">
        {menuOpen ? '✕' : '☰'}
      </button>
      <nav aria-label="Navigasi utama" className={menuOpen ? 'open' : ''}>
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.end} onClick={close} className={({ isActive }) => (isActive ? 'active' : '')}>
            {l.label}{l.to === '/favorit' && wishlist.length > 0 ? ` (${wishlist.length})` : ''}
          </NavLink>
        ))}
        <Link to="/keranjang" className="cart-btn" onClick={close} aria-label={`Buka keranjang, ${cartCount} barang`}>
          🛒 Keranjang <span className="count">{cartCount}</span>
        </Link>
      </nav>
    </header>
  )
}
