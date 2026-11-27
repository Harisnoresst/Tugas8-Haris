export default function StatusBadge({ status }) {
  const paid = status === 'dibayar'
  return <span className={`status ${paid ? 'paid' : 'pending'}`}>{paid ? 'Sudah dibayar' : 'Menunggu pembayaran'}</span>
}
