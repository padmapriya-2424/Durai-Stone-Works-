const toneClasses = {
  brown: 'bg-brown text-sandstone-200',
  charcoal: 'bg-charcoal text-sandstone-200',
  gold: 'bg-gold text-charcoal',
  sandstone: 'bg-sandstone-200 text-brown',
}

function PlaceholderImage({ className = '', image, labelPosition = 'bottom' }) {
  const positionClass = labelPosition === 'center' ? 'items-center justify-center text-center' : 'items-end'

  return (
    <div
      aria-label={image.alt}
      className={`relative isolate flex min-h-40 overflow-hidden rounded-stone ${toneClasses[image.tone] || toneClasses.sandstone} ${positionClass} ${className}`}
      role="img"
    >
      <span aria-hidden="true" className="absolute -right-10 -top-12 h-48 w-48 rounded-full border border-current opacity-20" />
      <span aria-hidden="true" className="absolute -bottom-20 -left-8 h-44 w-44 rotate-45 border border-current opacity-20" />
      <span className="relative z-10 max-w-[18rem] p-4 text-[0.68rem] font-semibold uppercase tracking-[0.14em] opacity-90">{image.label}</span>
    </div>
  )
}

export default PlaceholderImage