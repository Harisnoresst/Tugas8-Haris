import { useEffect, useState } from 'react'
import { loadNotes, saveNotes } from '../services/notesService'

// Custom hook untuk data lokal (catatan/ulasan) per produk.
export default function useNotes(productId) {
  const [notes, setNotes] = useState(loadNotes)

  useEffect(() => saveNotes(notes), [notes])

  const forProduct = notes.filter((n) => n.productId === productId)
  const add = (note) => setNotes((all) => [{ id: Date.now(), productId, createdAt: new Date().toISOString(), ...note }, ...all])
  const remove = (id) => setNotes((all) => all.filter((n) => n.id !== id))

  return { notes: forProduct, add, remove }
}
