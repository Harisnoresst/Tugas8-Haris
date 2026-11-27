import { useEffect, useState } from 'react'
import useDebounce from '../hooks/useDebounce'

export default function Toolbar({ query, onQuery, sort, onSort, count }) {
  const [text, setText] = useState(query) // local state input; URL diperbarui setelah debounce
  const debounced = useDebounce(text, 300)

  useEffect(() => { if (debounced !== query) onQuery(debounced) }, [debounced]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { setText(query) }, [query])

  return (
    <div className="toolbar">
      <input type="search" value={text} onChange={(e) => setText(e.target.value)} placeholder="Cari nama atau merek produk…" aria-label="Cari produk" />
      <select value={sort} onChange={(e) => onSort(e.target.value)} aria-label="Urutkan">
        <option value="default">Urutkan: Bawaan</option>
        <option value="nama">Nama A–Z</option>
        <option value="murah">Harga terendah</option>
        <option value="mahal">Harga tertinggi</option>
        <option value="rating">Rating tertinggi</option>
      </select>
      <span className="result-count">{count} produk</span>
    </div>
  )
}
