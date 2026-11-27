export default function FormField({ label, name, error, touched, children }) {
  const showError = touched && error
  return (
    <div className={`field ${showError ? 'invalid' : ''}`}>
      <label htmlFor={name}>{label}</label>
      {children}
      {showError && <p className="field-error" role="alert">{error}</p>}
    </div>
  )
}
