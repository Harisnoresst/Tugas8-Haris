export default function EmptyState({ title, text, children }) {
  return (
    <div className="empty">
      <strong>{title}</strong>
      <p>{text}</p>
      {children}
    </div>
  )
}
