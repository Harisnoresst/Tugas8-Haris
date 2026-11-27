import { Link, useNavigate } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import FormField from '../components/FormField'
import OrderSummary from '../components/OrderSummary'
import useForm from '../hooks/useForm'
import { useShop } from '../context/ShopContext'
import { createOrder } from '../services/ordersService'

export const PAYMENT_METHODS = {
  transfer: { label: 'Transfer Bank', info: 'BCA 1234567890 a.n. HarisCommerce' },
  ewallet: { label: 'E-Wallet (DANA/OVO/GoPay)', info: '0812-3456-7890 a.n. HarisCommerce' },
  cod: { label: 'Bayar di Tempat (COD)', info: 'Bayar tunai saat barang diterima.' },
}

const initial = { name: '', phone: '', address: '', method: 'transfer' }

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Nama penerima wajib diisi.'
  else if (v.name.trim().length < 3) e.name = 'Nama minimal 3 karakter.'
  if (!v.phone.trim()) e.phone = 'Nomor HP wajib diisi.'
  else if (!/^(\+62|62|0)8\d{7,12}$/.test(v.phone.replace(/[\s-]/g, ''))) e.phone = 'Nomor HP tidak valid (contoh: 081234567890).'
  if (!v.address.trim()) e.address = 'Alamat wajib diisi.'
  else if (v.address.trim().length < 10) e.address = 'Alamat minimal 10 karakter.'
  return e
}

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useShop()
  const navigate = useNavigate()
  const { values, errors, touched, isValid, handleChange, handleBlur, touchAll } = useForm(initial, validate)

  if (cart.length === 0) {
    return (
      <section className="section">
        <h2>Pembayaran</h2>
        <EmptyState title="Keranjang kosong" text="Tambahkan produk dulu sebelum checkout.">
          <Link to="/produk" className="btn btn-primary btn-small">Ke katalog</Link>
        </EmptyState>
      </section>
    )
  }

  const submit = (e) => {
    e.preventDefault()
    touchAll()
    if (!isValid) return
    const order = createOrder({
      customer: { name: values.name.trim(), phone: values.phone.trim(), address: values.address.trim() },
      method: values.method,
      items: cart,
      total: cartTotal,
    })
    clearCart()
    navigate(`/pesanan/${order.id}`, { replace: true })
  }

  return (
    <section className="section">
      <h2>Pembayaran (Checkout)</h2>
      <div className="checkout">
        <form className="card note-card note-form" onSubmit={submit} noValidate>
          <h3>Data pengiriman</h3>
          <FormField label="Nama penerima" name="name" error={errors.name} touched={touched.name}>
            <input id="name" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
          </FormField>
          <FormField label="Nomor HP" name="phone" error={errors.phone} touched={touched.phone}>
            <input id="phone" name="phone" inputMode="tel" value={values.phone} onChange={handleChange} onBlur={handleBlur} placeholder="081234567890" />
          </FormField>
          <FormField label="Alamat lengkap" name="address" error={errors.address} touched={touched.address}>
            <textarea id="address" name="address" rows="3" value={values.address} onChange={handleChange} onBlur={handleBlur} />
          </FormField>
          <FormField label="Metode pembayaran" name="method">
            <select id="method" name="method" value={values.method} onChange={handleChange}>
              {Object.entries(PAYMENT_METHODS).map(([k, m]) => <option key={k} value={k}>{m.label}</option>)}
            </select>
          </FormField>
          <button type="submit" className="btn btn-primary">Buat pesanan</button>
        </form>
        <div className="card note-card">
          <h3>Ringkasan pesanan</h3>
          <OrderSummary items={cart} total={cartTotal} />
          <Link to="/keranjang" className="link">← Ubah keranjang</Link>
        </div>
      </div>
    </section>
  )
}
