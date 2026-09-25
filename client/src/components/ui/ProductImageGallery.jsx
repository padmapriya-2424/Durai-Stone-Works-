import { useState } from 'react'
import PlaceholderImage from './PlaceholderImage'

function ProductImageGallery({ images = [], name }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = images[activeIndex] || images[0]

  if (!activeImage) return <div className="ds-card p-6 text-sm text-charcoal-soft">Product image placeholder unavailable.</div>

  return (
    <div className="space-y-4">
      <PlaceholderImage className="min-h-[24rem] sm:min-h-[34rem]" image={{ ...activeImage, alt: `${name}: ${activeImage.alt}` }} labelPosition="center" />
      <div aria-label={`${name} image thumbnails`} className="grid grid-cols-2 gap-3 sm:grid-cols-3" role="group">
        {images.map((image, index) => <button aria-label={`Show image ${index + 1} of ${name}`} aria-pressed={activeIndex === index} className={`rounded-stone border-2 p-1 transition-colors ${activeIndex === index ? 'border-gold' : 'border-transparent hover:border-sandstone-300'}`} key={`${image.label}-${index}`} type="button" onClick={() => setActiveIndex(index)}><PlaceholderImage className="min-h-24 rounded-sm" image={image} labelPosition="center" /></button>)}
      </div>
    </div>
  )
}

export default ProductImageGallery