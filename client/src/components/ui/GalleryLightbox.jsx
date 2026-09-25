import { useEffect } from 'react'
import PlaceholderImage from './PlaceholderImage'

function GalleryLightbox({ item, onClose }) {
  useEffect(() => {
    if (!item) return undefined

    function handleEscape(event) {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div aria-labelledby="lightbox-title" aria-modal="true" className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/90 p-4 sm:p-8" role="dialog">
      <button aria-label="Close image viewer" className="absolute right-4 top-4 inline-flex min-h-11 min-w-11 items-center justify-center rounded-stone border border-sandstone-300 text-2xl text-ivory hover:bg-charcoal-soft" type="button" onClick={onClose}>×</button>
      <div className="grid max-h-[90vh] w-full max-w-5xl overflow-auto rounded-stone bg-ivory md:grid-cols-[1.15fr_0.85fr]">
        <PlaceholderImage className="min-h-[20rem] rounded-none md:min-h-[32rem]" image={item.image} labelPosition="center" />
        <div className="p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">{item.category}</p>
          <h2 className="mt-3 font-display text-3xl text-charcoal" id="lightbox-title">{item.title}</h2>
          <p className="mt-5 text-sm font-semibold text-brown">{item.location}</p>
          <p className="mt-5 text-base leading-7 text-charcoal-soft">{item.description}</p>
        </div>
      </div>
    </div>
  )
}

export default GalleryLightbox