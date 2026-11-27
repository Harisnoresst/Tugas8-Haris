import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="footer">
      <p><strong>{profile.nama}</strong> (NIM {profile.nim}) · {profile.prodi}, {profile.kampus}. Tugas Pengembangan Website.</p>
    </footer>
  )
}
