import { createHashRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import ProductsLayout from './layouts/ProductsLayout'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import WishlistPage from './pages/WishlistPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderPage from './pages/OrderPage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'
import { ShopProvider } from './context/ShopContext'

// HashRouter dipakai agar aplikasi aman di-hosting statis (website pribadi) tanpa konfigurasi rewrite server.
const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'produk',
        element: <ProductsLayout />, // nested route
        children: [
          { index: true, element: <ProductsPage /> },
          { path: ':id', element: <ProductDetailPage /> }, // dynamic route
        ],
      },
      { path: 'favorit', element: <WishlistPage /> },
      { path: 'keranjang', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'pesanan/:orderId', element: <OrderPage /> },
      { path: 'tentang', element: <AboutPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default function App() {
  return (
    <ShopProvider>
      <RouterProvider router={router} />
    </ShopProvider>
  )
}
