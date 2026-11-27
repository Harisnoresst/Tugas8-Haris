import { rupiah } from '../utils/format'

export default function OrderSummary({ items, total }) {
  return (
    <div className="order-summary">
      <ul>
        {items.map((i) => (
          <li key={i.id}>
            <span>{i.name} <small className="muted">× {i.qty}</small></span>
            <span>{rupiah(i.price * i.qty)}</span>
          </li>
        ))}
      </ul>
      <div className="cart-total"><span>Total</span><strong>{rupiah(total)}</strong></div>
    </div>
  )
}
