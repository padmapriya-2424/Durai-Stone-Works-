function SectionHeading({ eyebrow, children, description, align = 'left' }) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow ? <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-gold">{eyebrow}</p> : null}
      <h2 className="font-display text-3xl leading-tight text-charcoal sm:text-4xl">{children}</h2>
      {description ? <p className="mt-4 max-w-xl text-base leading-7 text-charcoal-soft">{description}</p> : null}
    </div>
  )
}

export default SectionHeading