# HarisCommerce — Katalog Produk (React + Vite + React Router)

Muhammad Haris Nur Fadillah — 1247050090

Aplikasi katalog produk dengan beberapa halaman, pencarian, filter, sorting, pagination, detail produk, keranjang, favorit, dan formulir catatan. Data produk diambil dari public API [DummyJSON](https://dummyjson.com).

## Menjalankan
```bash
npm install
npm run dev      # development
npm run build    # hasil build ada di folder dist/
```
Untuk di-hosting di website pribadi, unggah isi folder `dist/`. Router memakai **HashRouter** (`/#/produk/1`), sehingga berjalan di hosting statis tanpa konfigurasi rewrite.

## Pemenuhan ketentuan tugas

| Ketentuan | Implementasi |
| :-- | :-- |
| Min. 3 halaman, client-side routing | Beranda `/`, Produk `/produk`, Detail `/produk/:id`, Favorit `/favorit`, Keranjang `/keranjang`, Tentang `/tentang`, 404 (`src/App.jsx`) |
| Dynamic route | `/produk/:id` → `ProductDetailPage` (`useParams`) |
| Nested route | `MainLayout` (Navbar/Footer + `<Outlet/>`) dan `ProductsLayout` untuk `/produk` & `/produk/:id` |
| Navigasi tanpa reload | `Link` / `NavLink` |
| Local state | Menu mobile (`Navbar`), input pencarian (`Toolbar`), umpan balik tombol (`ProductCard`), galeri foto (`ProductDetailPage`) |
| Global state (Context API) | `context/ShopContext.jsx` — keranjang & favorit (useReducer, tersimpan di localStorage) |
| Server state | `hooks/useFetch.js` (data, loading, error, retry, abort) |
| URL state | `hooks/useProducts.js` — `?q=`, `?kategori=`, `?sort=`, `?page=` lewat `useSearchParams` |
| Form state | `hooks/useForm.js` + `components/NoteForm.jsx` |
| Fetch API | `services/productService.js` (`fetch`) |
| Loading / error / empty | `Spinner`, `ErrorMessage` (tombol "Coba lagi"), `EmptyState` |
| Search, filter, sort, pagination, detail | `useProducts` + `Toolbar`, `CategoryFilter`, `Pagination`, `ProductDetailPage` |
| Form & validasi | Controlled components; nama min. 3 karakter, catatan 10–200 karakter; pesan error per field; data disimpan lokal (`services/notesService.js`) |

## Struktur folder
```
src/
├─ components/   Navbar, Hero, Footer, Badge, Spinner, ErrorMessage, EmptyState,
│                CategoryFilter, Toolbar, Pagination, ProductCard, ProductGrid,
│                CartItem, FormField, NoteForm  (15 reusable components)
├─ pages/        HomePage, ProductsPage, ProductDetailPage, CartPage, WishlistPage, AboutPage, NotFoundPage
├─ layouts/      MainLayout, ProductsLayout
├─ context/      ShopContext.jsx
├─ hooks/        useFetch, useProducts, useForm, useNotes, useDebounce  (5 custom hooks)
├─ services/     productService.js (API), notesService.js (localStorage)
├─ utils/        format.js
└─ data/         profile.js
```
Pemisahan tanggung jawab: **tampilan** di `components/` & `pages/`, **logika** di `hooks/` & `context/`, **akses data** di `services/`.
