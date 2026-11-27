import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'

export default function NotFoundPage() {
  return (
    <section className="section">
      <EmptyState title="404 — Halaman tidak ditemukan" text="Alamat yang kamu buka tidak tersedia.">
        <Link to="/" className="btn btn-primary btn-small">Kembali ke beranda</Link>
      </EmptyState>
    </section>
  )
}
