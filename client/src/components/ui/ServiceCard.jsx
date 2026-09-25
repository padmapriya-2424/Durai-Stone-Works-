import { Link } from 'react-router-dom'
import PlaceholderImage from './PlaceholderImage'

function ServiceCard({ description, image, number, quoteLabel = 'Learn more', quoteTo = '/craft', title, useCases }) {
  return (
    <article className="ds-card overflow-hidden">
      {image ? <PlaceholderImage className="rounded-none" image={image} /> : null}
      <div className="p-5">
        <p className="font-display text-2xl text-gold">{number}</p>
        <h3 className="mt-5 font-display text-2xl text-charcoal">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-charcoal-soft">{description}</p>
        {useCases ? <p className="mt-4 text-xs uppercase tracking-[0.08em] text-brown-light">Typical use: {useCases}</p> : null}
        <Link className="mt-5 inline-block border-b border-gold pb-1 text-sm font-semibold text-brown transition-colors hover:border-brown hover:text-charcoal" to={quoteTo}>{quoteLabel} →</Link>
      </div>
    </article>
  )
}

export default ServiceCard