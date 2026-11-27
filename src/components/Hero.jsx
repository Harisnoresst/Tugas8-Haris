import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="hero">
      <img className="hero-bg" src={`${import.meta.env.BASE_URL}images/hero.jpg`} alt="Banner toko" />
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-content">
        <h1>Perlengkapan Kuliah &amp; Kerja dalam Satu Tempat</h1>
        <p className="lead">Temukan tas, elektronik, alat tulis, dan aksesori pilihan untuk aktivitas harianmu.</p>
        <Link to="/produk" className="btn hero-btn">Lihat Katalog</Link>
      </div>
    </section>
  )
}
