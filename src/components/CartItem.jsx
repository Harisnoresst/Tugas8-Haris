import { Link } from 'react-router-dom'
import { rupiah } from '../utils/format'

export default function CartItem({ item, onQty, onRemove }) {
  return (
    <li className="cart-item">
      <span className="mini tone-sky"><img src={item.image} alt="" /></span>
      <div className="cart-info">
        <Link to={`/produk/${item.id}`}><strong>{item.name}</strong></Link>
        <span>{rupiah(item.price * item.qty)}</span>
        <div className="qty">
          <button onClick={() => onQty(item.id, -1)} aria-label="Kurangi">−</button>
          <span>{item.qty}</span>
          <button onClick={() => onQty(item.id, 1)} aria-label="Tambah">+</button>
          <button className="link danger" onClick={() => onRemove(item.id)}>Hapus</button>
        </div>
      </div>
    </li>
  )
}
