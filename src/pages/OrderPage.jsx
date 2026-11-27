import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import OrderSummary from '../components/OrderSummary'
import StatusBadge from '../components/StatusBadge'
import { getOrder, markOrderPaid } from '../services/ordersService'
import { PAYMENT_METHODS } from './CheckoutPage'
import { rupiah } from '../utils/format'

const fmtDate = (iso) => new Date(iso).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })

export default function OrderPage() {
  const { orderId } = useParams()
  const [order, setOrder] = useState(() => getOrder(orderId))
  const [checked, setChecked] = useState(false) // centang "sudah bayar"

  if (!order) {
    return (
      <section className="section">
        <EmptyState title="Pesanan tidak ditemukan" text="Kode pesanan tidak valid atau data sudah dihapus.">
          <Link to="/produk" className="btn btn-primary btn-small">Ke katalog</Link>
        </EmptyState>
      </section>
    )
  }

  const method = PAYMENT_METHODS[order.method]
  const paid = order.status === 'dibayar'
  const confirm = () => setOrder(markOrderPaid(order.id))

  return (
    <section className="section">
      <h2>Pesanan {order.id}</h2>
      <div className="checkout">
        <div className="card note-card">
          <div className="order-head">
            <StatusBadge status={order.status} />
            <small className="muted">Dibuat {fmtDate(order.createdAt)}</small>
          </div>
          <OrderSummary items={order.items} total={order.total} />
          <p className="muted">Penerima: <strong>{order.customer.name}</strong> · {order.customer.phone}<br />{order.customer.address}</p>
        </div>

        <div className="card note-card">
          <h3>Pembayaran</h3>
          <p><strong>{method.label}</strong><br /><span className="muted">{method.info}</span></p>
          {order.method !== 'cod' && <p>Transfer tepat <strong>{rupiah(order.total)}</strong>.</p>}

          {paid ? (
            <div className="paid-box" role="status">
              ✓ Pembayaran dikonfirmasi pada {fmtDate(order.paidAt)}. Terima kasih!
            </div>
          ) : (
            <>
              <label className="check">
                <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
                <span>{order.method === 'cod' ? 'Saya sudah membayar saat barang diterima' : 'Saya sudah melakukan pembayaran'}</span>
              </label>
              <button className="btn btn-primary" disabled={!checked} onClick={confirm}>Konfirmasi pembayaran</button>
            </>
          )}
          <Link to="/produk" className="link">Lanjut belanja →</Link>
        </div>
      </div>
    </section>
  )
}
