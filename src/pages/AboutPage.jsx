import { profile } from '../data/profile'

export default function AboutPage() {
  return (
    <section className="section">
      <h2>Tentang</h2>
      <div className="card about">
        <p><strong>HarisCommerce</strong> adalah aplikasi katalog produk berbasis React + React Router. Data produk diambil dari public API <a href="https://dummyjson.com" target="_blank" rel="noreferrer">DummyJSON</a>.</p>
        <ul>
          <li>Nama: {profile.nama}</li>
          <li>NIM: {profile.nim}</li>
          <li>Program Studi: {profile.prodi}</li>
          <li>Kampus: {profile.kampus}</li>
        </ul>
      </div>
    </section>
  )
}
