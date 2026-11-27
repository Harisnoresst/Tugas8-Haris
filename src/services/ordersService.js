// Penyimpanan pesanan lokal (localStorage). Tidak butuh server.
const KEY = 'lapak-kampus:orders'

export function loadOrders() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || []
  } catch {
    return []
  }
}

function save(orders) {
  try { localStorage.setItem(KEY, JSON.stringify(orders)) } catch { /* ignore */ }
}

export function createOrder({ customer, method, items, total }) {
  const order = {
    id: 'ORD-' + Date.now().toString(36).toUpperCase(),
    createdAt: new Date().toISOString(),
    status: 'menunggu', // menunggu | dibayar
    paidAt: null,
    customer,
    method,
    items,
    total,
  }
  save([order, ...loadOrders()])
  return order
}

export function getOrder(id) {
  return loadOrders().find((o) => o.id === id) || null
}

export function markOrderPaid(id) {
  const orders = loadOrders().map((o) => (o.id === id ? { ...o, status: 'dibayar', paidAt: new Date().toISOString() } : o))
  save(orders)
  return orders.find((o) => o.id === id) || null
}
