// Semua akses API dipusatkan di sini (separation of concerns).
// Public API: https://dummyjson.com
const BASE_URL = 'https://dummyjson.com'
const USD_TO_IDR = 16000

async function request(path, signal) {
  const res = await fetch(`${BASE_URL}${path}`, { signal })
  if (!res.ok) throw new Error(`Gagal memuat data (HTTP ${res.status})`)
  return res.json()
}

// Normalisasi respons API agar komponen tidak bergantung pada bentuk data mentahnya.
const normalize = (p) => ({
  id: p.id,
  name: p.title,
  category: p.category,
  price: Math.round(p.price * USD_TO_IDR),
  rating: p.rating,
  stock: p.stock,
  desc: p.description,
  brand: p.brand || 'Tanpa merek',
  image: p.thumbnail,
  images: p.images || [],
  availability: p.availabilityStatus,
})

export async function getProducts(signal) {
  const data = await request('/products?limit=0', signal)
  return data.products.map(normalize)
}

export async function getProductById(id, signal) {
  return normalize(await request(`/products/${id}`, signal))
}
