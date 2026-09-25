import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Button from './ui/Button'

const navigationLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Our Craft', to: '/craft' },
  { label: 'Products', to: '/products' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Custom Order', to: '/custom-order' },
  { label: 'Contact', to: '/contact' },
]

function linkClassName({ isActive }) {
  return `border-b-2 py-2 text-sm font-semibold tracking-wide transition-colors ${
    isActive
      ? 'border-gold text-brown'
      : 'border-transparent text-charcoal-soft hover:border-gold-soft hover:text-brown'
  }`
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-sandstone-200 bg-ivory/95 backdrop-blur-sm">
      <nav aria-label="Primary navigation" className="ds-container relative flex min-h-16 items-center justify-between gap-6">
        <NavLink
          aria-label="Durai Stone Works home"
          className="shrink-0 font-display text-xl text-charcoal transition-colors hover:text-brown sm:text-2xl"
          to="/"
          onClick={closeMenu}
        >
          Durai Stone Works
        </NavLink>

        <div className="hidden items-center gap-5 lg:flex">
          {navigationLinks.map((link) => (
            <NavLink className={linkClassName} end={link.to === '/'} key={link.to} to={link.to}>
              {link.label}
            </NavLink>
          ))}
          <Button className="ml-1 whitespace-nowrap" onClick={() => navigate('/custom-order')}>
            Request a Quote
          </Button>
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-stone border border-sandstone-300 text-charcoal transition-colors hover:bg-sandstone-100 lg:hidden"
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" className="text-2xl leading-none">{isMenuOpen ? '×' : '☰'}</span>
        </button>

        {isMenuOpen ? (
          <div className="fixed inset-x-0 top-16 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-sandstone-200 bg-ivory p-5 shadow-[0_16px_30px_rgba(57,43,31,0.1)] lg:hidden" id="mobile-navigation">
            <div className="flex flex-col gap-2">
              {navigationLinks.map((link) => (
                <NavLink className={linkClassName} end={link.to === '/'} key={link.to} to={link.to} onClick={closeMenu}>
                  {link.label}
                </NavLink>
              ))}
              <Button className="mt-3 w-full" onClick={() => { closeMenu(); navigate('/custom-order') }}>
                Request a Quote
              </Button>
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  )
}

export default Navbar