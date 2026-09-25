import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import Home from './pages/Home'
import About from './pages/About'
import Craft from './pages/Craft'
import Gallery from './pages/Gallery'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import CustomOrder from './pages/CustomOrder'
import Contact from './pages/Contact'

function RoutingTestView() {
  const location = useLocation()

  return (
    <main className="ds-container ds-section">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-gold">Phase 3 / Layout test</p>
      <h1 className="font-display text-4xl text-charcoal sm:text-6xl">Page Content</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-charcoal-soft">Navbar and Footer are ready to frame the public pages that will be built in later phases.</p>
      <p className="mt-8 border-l-2 border-gold pl-4 text-sm text-brown">Current route: {location.pathname}</p>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <PublicLayout>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<About />} path="/about" />
          <Route element={<Craft />} path="/craft" />
          <Route element={<Gallery />} path="/gallery" />
          <Route element={<Products />} path="/products" />
          <Route element={<ProductDetails />} path="/products/:id" />
          <Route element={<CustomOrder />} path="/custom-order" />
          <Route element={<Contact />} path="/contact" />
          <Route element={<RoutingTestView />} path="*" />
        </Routes>
      </PublicLayout>
    </BrowserRouter>
  )
}

export default App
