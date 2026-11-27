// Penyimpanan data lokal (catatan/ulasan) di localStorage.
const KEY = 'lapak-kampus:notes'

export function loadNotes() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || []
  } catch {
    return []
  }
}

export function saveNotes(notes) {
  try {
    localStorage.setItem(KEY, JSON.stringify(notes))
  } catch {
    /* abaikan jika storage penuh / diblokir */
  }
}
