import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem'
import EmptyState from '../components/EmptyState'
import { useShop } from '../context/ShopContext'
import { rupiah } from '../utils/format'

export default function CartPage() {
  const { cart, cartTotal, changeQty, removeFromCart, clearCart } = useShop()
  return (
    <section className="section">
      <h2>Keranjang</h2>
      {cart.length === 0 ? (
        <EmptyState title="Keranjang masih kosong" text="Tambahkan produk dari katalog.">
          <Link to="/produk" className="btn btn-primary btn-small">Ke katalog</Link>
        </EmptyState>
      ) : (
        <div className="card cart-page">
          <ul className="cart-list">
            {cart.map((i) => <CartItem key={i.id} item={i} onQty={changeQty} onRemove={removeFromCart} />)}
          </ul>
          <div className="cart-total"><span>Total</span><strong>{rupiah(cartTotal)}</strong></div>
          <Link to="/checkout" className="btn btn-primary">Lanjut ke pembayaran</Link>
          <button className="link danger" onClick={clearCart}>Kosongkan keranjang</button>
        </div>
      )}
    </section>
  )
}
