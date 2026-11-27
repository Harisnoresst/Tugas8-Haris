import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Badge from '../components/Badge'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'
import NoteForm from '../components/NoteForm'
import useFetch from '../hooks/useFetch'
import useNotes from '../hooks/useNotes'
import { useShop } from '../context/ShopContext'
import { getProductById } from '../services/productService'
import { rupiah, titleCase } from '../utils/format'

export default function ProductDetailPage() {
  const { id } = useParams() // dynamic route /produk/:id
  const { data: product, loading, error, retry } = useFetch((s) => getProductById(id, s), [id])
  const { wishlist, toggleWishlist, addToCart } = useShop()
  const { notes, add, remove } = useNotes(Number(id))
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => setActiveImg(0), [id])

  if (loading) return <Spinner label="Memuat detail produk…" />
  if (error) {
    return (
      <>
        <ErrorMessage message={error} onRetry={retry} />
        <p><Link to="/produk" className="link">← Kembali ke katalog</Link></p>
      </>
    )
  }
  if (!product) return <EmptyState title="Produk tidak ditemukan" text="Produk dengan ID tersebut tidak tersedia." />

  const gallery = product.images.length ? product.images : [product.image]
  const liked = wishlist.includes(product.id)

  return (
    <>
      <div className="detail">
        <div className="detail-gallery">
          <div className="thumb tone-sky detail-main"><img src={gallery[activeImg]} alt={product.name} /></div>
          {gallery.length > 1 && (
            <div className="detail-thumbs">
              {gallery.map((g, i) => (
                <button key={g} className={i === activeImg ? 'on' : ''} onClick={() => setActiveImg(i)} aria-label={`Foto ${i + 1}`}><img src={g} alt="" /></button>
              ))}
            </div>
          )}
        </div>
        <div className="detail-info">
          <Badge tone="sky">{titleCase(product.category)}</Badge>
          <h2>{product.name}</h2>
          <p className="muted">Merek: {product.brand} · ★ {product.rating.toFixed(1)}</p>
          <strong className="price big">{rupiah(product.price)}</strong>
          <p>{product.desc}</p>
          <p className="muted">Stok: {product.stock} · {product.availability}</p>
          <div className="detail-actions">
            <button className="btn btn-primary" onClick={() => addToCart(product)}>+ Tambah ke keranjang</button>
            <button className="btn btn-ghost" onClick={() => toggleWishlist(product.id)} aria-pressed={liked}>{liked ? '♥ Favorit' : '♡ Tambah favorit'}</button>
          </div>
        </div>
      </div>

      <div className="notes">
        <div className="card note-card">
          <h3>Tambah catatan</h3>
          <NoteForm onSubmit={add} />
        </div>
        <div className="card note-card">
          <h3>Catatan ({notes.length})</h3>
          {notes.length === 0 ? (
            <p className="muted">Belum ada catatan untuk produk ini.</p>
          ) : (
            <ul className="note-list">
              {notes.map((n) => (
                <li key={n.id}>
                  <div><strong>{n.name}</strong> <span className="rating">{'★'.repeat(n.rating)}</span></div>
                  <p>{n.message}</p>
                  <button className="link danger" onClick={() => remove(n.id)}>Hapus</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}
