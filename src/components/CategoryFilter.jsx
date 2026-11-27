import { titleCase } from '../utils/format'

export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="chips" role="group" aria-label="Filter kategori">
      {['semua', ...categories].map((c) => (
        <button key={c} className={`chip ${active === c ? 'active' : ''}`} onClick={() => onChange(c)}>
          {c === 'semua' ? 'Semua' : titleCase(c)}
        </button>
      ))}
    </div>
  )
}
