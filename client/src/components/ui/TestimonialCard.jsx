function TestimonialCard({ customer, location, project, rating, text }) {
  return (
    <article className="ds-card flex h-full flex-col p-6">
      <p className="text-sm tracking-[0.2em] text-gold" aria-label={`${rating} rating`}>{rating}</p>
      <blockquote className="mt-5 flex-1 font-display text-xl leading-8 text-charcoal">“{text}”</blockquote>
      <footer className="mt-8 border-t border-sandstone-200 pt-4 text-sm text-charcoal-soft">
        <p className="font-semibold text-charcoal">{customer}</p>
        <p className="mt-1">{location} · {project}</p>
      </footer>
    </article>
  )
}

export default TestimonialCard