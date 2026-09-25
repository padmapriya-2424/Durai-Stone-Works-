import Button from './Button'
import PlaceholderImage from './PlaceholderImage'
import StatusBadge from './StatusBadge'
import { Link } from 'react-router-dom'

function ProductCard({ category, description, id, image, isCustom = true, name, stoneType }) {
  return (
    <article className="ds-card overflow-hidden">
      <PlaceholderImage className="rounded-none" image={image || { alt: `${name} image placeholder`, label: 'Stone study', tone: 'brown' }} />
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-gold">{category}</p>
            <h3 className="font-display text-2xl text-charcoal">{name}</h3>
          </div>
          {isCustom ? <StatusBadge status="attention">Custom</StatusBadge> : null}
        </div>
        <p className="text-sm text-charcoal-soft">{description || `Hand-finished ${stoneType} sculpture, made to order.`}</p>
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brown-light">{stoneType}</p>
        <Button as={Link} className="w-full" to={id ? `/products/${id}` : '/custom-order'} variant="secondary">{id ? 'View Details' : 'Request a quote'}</Button>
      </div>
    </article>
  )
}

export default ProductCard