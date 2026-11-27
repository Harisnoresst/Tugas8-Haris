export const rupiah = (n) => 'Rp' + Math.round(n).toLocaleString('id-ID')

export const titleCase = (s = '') => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
