import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const ShopContext = createContext(null)
const STORAGE_KEY = 'lapak-kampus:shop'

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_WISH': {
      const { id } = action
      return { ...state, wishlist: state.wishlist.includes(id) ? state.wishlist.filter((x) => x !== id) : [...state.wishlist, id] }
    }
    case 'ADD': {
      const { product } = action
      const exists = state.cart.some((i) => i.id === product.id)
      const cart = exists
        ? state.cart.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
        : [...state.cart, { id: product.id, name: product.name, price: product.price, image: product.image, qty: 1 }]
      return { ...state, cart }
    }
    case 'QTY':
      return { ...state, cart: state.cart.map((i) => (i.id === action.id ? { ...i, qty: i.qty + action.delta } : i)).filter((i) => i.qty > 0) }
    case 'REMOVE':
      return { ...state, cart: state.cart.filter((i) => i.id !== action.id) }
    case 'CLEAR':
      return { ...state, cart: [] }
    default:
      return state
  }
}

function init() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (saved) return { wishlist: saved.wishlist || [], cart: saved.cart || [] }
  } catch { /* ignore */ }
  return { wishlist: [], cart: [] }
}

// Global state: keranjang & favorit dibagikan ke seluruh halaman lewat Context API.
export function ShopProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, init)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) } catch { /* ignore */ }
  }, [state])

  const value = useMemo(
    () => ({
      cart: state.cart,
      wishlist: state.wishlist,
      cartCount: state.cart.reduce((n, i) => n + i.qty, 0),
      cartTotal: state.cart.reduce((n, i) => n + i.price * i.qty, 0),
      toggleWishlist: (id) => dispatch({ type: 'TOGGLE_WISH', id }),
      addToCart: (product) => dispatch({ type: 'ADD', product }),
      changeQty: (id, delta) => dispatch({ type: 'QTY', id, delta }),
      removeFromCart: (id) => dispatch({ type: 'REMOVE', id }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
    }),
    [state]
  )

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export function useShop() {
  const ctx = useContext(ShopContext)
  if (!ctx) throw new Error('useShop harus dipakai di dalam <ShopProvider>')
  return ctx
}
