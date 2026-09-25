import { NavLink } from 'react-router-dom'
import { businessData } from '../data/businessData'

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/craft' },
  { label: 'Products', to: '/products' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Custom Order', to: '/custom-order' },
  { label: 'Contact', to: '/contact' },
]

const socialLinks = [businessData.instagram, businessData.facebook, businessData.youtube]

function Footer() {
  return (
    <footer className="border-t border-charcoal-soft bg-charcoal text-sandstone-200">
      <div className="ds-container grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10 lg:py-16">
        <div>
          <NavLink className="font-display text-3xl text-ivory" to="/">Durai Stone Works</NavLink>
          <p className="mt-4 max-w-xs text-sm leading-6 text-sandstone-300">Traditional Stone Sculptures &amp; Craftsmanship</p>
          <p className="mt-8 text-xs uppercase tracking-[0.14em] text-gold-soft">Handcrafted in Mahabalipuram, Tamil Nadu, India.</p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-gold-soft">Explore</h2>
          <div className="mt-5 grid gap-3">
            {footerLinks.map((link) => (
              <NavLink className="w-fit text-sm transition-colors hover:text-ivory" key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-gold-soft">Contact</h2>
          <div className="mt-5 grid gap-3 text-sm">
            <span>{businessData.phone}</span>
            <span>{businessData.whatsapp}</span>
            <span>{businessData.email}</span>
            <span>{businessData.location}</span>
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-gold-soft">Follow the craft</h2>
          <div className="mt-5 grid gap-3 text-sm">
            {socialLinks.map((label) => (
              <a
                aria-disabled="true"
                className="w-fit cursor-default text-sandstone-300 transition-colors hover:text-ivory"
                href="#"
                key={label}
                onClick={(event) => event.preventDefault()}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-charcoal-soft">
        <div className="ds-container py-5 text-xs text-sandstone-300">© Durai Stone Works. Traditional craft, thoughtfully made.</div>
      </div>
    </footer>
  )
}

export default Footer