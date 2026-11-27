export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="state-box error" role="alert">
      <strong>Oops, terjadi kesalahan</strong>
      <p>{message}</p>
      {onRetry && <button className="btn btn-primary btn-small" onClick={onRetry}>Coba lagi</button>}
    </div>
  )
}
