import { useState } from 'react'
import { Link } from 'react-router-dom'
import Badge from './Badge'
import { rupiah, titleCase } from '../utils/format'
import { useShop } from '../context/ShopContext'

export default function ProductCard({ product }) {
  const { wishlist, toggleWishlist, addToCart } = useShop()
  const [added, setAdded] = useState(false) // local state: umpan balik tombol
  const liked = wishlist.includes(product.id)

  const handleAdd = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <article className="card product">
      <div className="thumb tone-sky">
        <Link to={`/produk/${product.id}`} aria-label={`Lihat detail ${product.name}`}>
          <img src={product.image} alt={product.name} loading="lazy" />
        </Link>
        <button className={`heart ${liked ? 'on' : ''}`} onClick={() => toggleWishlist(product.id)} aria-pressed={liked} aria-label={liked ? 'Hapus dari favorit' : 'Tambah ke favorit'}>
          {liked ? '♥' : '♡'}
        </button>
        {product.stock <= 10 && (
          <span className={`stock ${product.stock <= 5 ? 'stock-low' : ''}`}><Badge tone="coral">Sisa {product.stock}</Badge></span>
        )}
      </div>
      <div className="product-info">
        <Badge tone="sky">{titleCase(product.category)}</Badge>
        <h3>{product.name}</h3>
        <div className="price-row">
          <strong className="price">{rupiah(product.price)}</strong>
          <span className="rating">★ {product.rating.toFixed(1)}</span>
        </div>
        <div className="card-actions">
          <Link className="link" to={`/produk/${product.id}`}>Lihat detail</Link>
          <button className="btn btn-small btn-primary" onClick={handleAdd}>{added ? 'Ditambahkan ✓' : '+ Keranjang'}</button>
        </div>
      </div>
    </article>
  )
}
