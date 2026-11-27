import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import useFetch from './useFetch'
import { getProducts } from '../services/productService'

export const PAGE_SIZE = 12

const SORTERS = {
  default: (a, b) => a.id - b.id,
  murah: (a, b) => a.price - b.price,
  mahal: (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating,
  nama: (a, b) => a.name.localeCompare(b.name),
}

// Menggabungkan server state (fetch) + URL state (q, kategori, sort, halaman).
export default function useProducts() {
  const { data, loading, error, retry } = useFetch((signal) => getProducts(signal), [])
  const [params, setParams] = useSearchParams()

  const q = params.get('q') || ''
  const category = params.get('kategori') || 'semua'
  const sort = params.get('sort') || 'default'
  const page = Math.max(1, Number(params.get('page')) || 1)

  const update = (changes, resetPage = true) => {
    const next = new URLSearchParams(params)
    Object.entries(changes).forEach(([k, v]) => {
      if (!v || v === 'semua' || v === 'default') next.delete(k)
      else next.set(k, v)
    })
    if (resetPage) next.delete('page')
    setParams(next, { replace: true })
  }

  const categories = useMemo(() => (data ? [...new Set(data.map((p) => p.category))].sort() : []), [data])

  const filtered = useMemo(() => {
    if (!data) return []
    const kw = q.trim().toLowerCase()
    return data
      .filter((p) => category === 'semua' || p.category === category)
      .filter((p) => !kw || p.name.toLowerCase().includes(kw) || p.brand.toLowerCase().includes(kw))
      .sort(SORTERS[sort] || SORTERS.default)
  }, [data, q, category, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const items = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  return {
    items,
    total: filtered.length,
    categories,
    loading,
    error,
    retry,
    q,
    category,
    sort,
    page: currentPage,
    totalPages,
    isFiltering: q !== '' || category !== 'semua',
    setQuery: (v) => update({ q: v }),
    setCategory: (v) => update({ kategori: v }),
    setSort: (v) => update({ sort: v }),
    setPage: (p) => update({ page: p > 1 ? String(p) : '' }, false),
    reset: () => setParams({}, { replace: true }),
  }
}
