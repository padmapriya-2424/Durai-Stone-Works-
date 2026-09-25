import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import PlaceholderImage from '../components/ui/PlaceholderImage'
import ProductCard from '../components/ui/ProductCard'
import SectionHeading from '../components/ui/SectionHeading'
import ServiceCard from '../components/ui/ServiceCard'
import TestimonialCard from '../components/ui/TestimonialCard'
import { demoTestimonials, featuredCreations, imagePlaceholders, services, trustPoints } from '../data/homeData'

function Home() {
  return (
    <main>
      <section className="relative overflow-hidden bg-charcoal text-ivory" aria-labelledby="hero-heading">
        <div className="ds-container grid min-h-[calc(100svh-4rem)] items-center gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-24">
          <div className="relative z-10 max-w-2xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-gold-soft">Durai Stone Works / Mahabalipuram</p>
            <h1 className="font-display text-5xl leading-[0.98] sm:text-6xl lg:text-8xl" id="hero-heading">Crafting Stone.<br />Preserving Heritage.</h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-sandstone-200 sm:text-lg">Traditional stone sculptures and architectural craftsmanship, handcrafted with generations of skill.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button as={Link} to="/products">Explore Our Work</Button>
              <Button as={Link} className="border-sandstone-300 text-sandstone-100 hover:bg-charcoal-soft" to="/custom-order" variant="secondary">Request a Custom Sculpture</Button>
            </div>
          </div>
          <div className="relative lg:pl-8">
            <PlaceholderImage className="min-h-[24rem] rounded-none sm:min-h-[34rem] lg:min-h-[42rem]" image={imagePlaceholders.hero} labelPosition="center" />
            <div className="absolute -bottom-4 -left-2 border-l-2 border-gold px-4 py-3 text-xs uppercase tracking-[0.14em] text-sandstone-200 sm:left-4">
              Stone / craft / place
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-xs uppercase tracking-[0.18em] text-sandstone-300 sm:flex">
          <span className="h-10 w-px bg-gold" /> Scroll to explore
        </div>
      </section>

      <section className="ds-container ds-section" aria-labelledby="introduction-heading">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="A living craft" description="Durai Stone Works brings together the measured language of traditional carving and the care required to make each commission feel at home in the present.">Where Stone Becomes Art</SectionHeading>
            <p className="mt-6 max-w-lg text-base leading-7 text-charcoal-soft">From the first conversation to the final finish, every piece begins with attention: to the stone, to the intended space, and to the person who will live with it.</p>
            <Link className="mt-8 inline-block border-b border-gold pb-1 text-sm font-semibold text-brown transition-colors hover:border-brown hover:text-charcoal" to="/about">Discover Our Story →</Link>
          </div>
          <div className="grid grid-cols-[1.25fr_0.75fr] items-end gap-4 sm:gap-6">
            <PlaceholderImage className="min-h-[22rem] sm:min-h-[32rem]" image={imagePlaceholders.introduction} />
            <div className="grid gap-4 sm:gap-6">
              <PlaceholderImage className="min-h-40 sm:min-h-52" image={imagePlaceholders.introductionDetail} />
              <PlaceholderImage className="min-h-48 sm:min-h-64" image={imagePlaceholders.introductionFigure} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sandstone-100" aria-labelledby="craft-heading">
        <div className="ds-container ds-section">
          <SectionHeading eyebrow="The work" description="A focused range of stone craft, made for devotional, architectural, commemorative, and personal spaces.">Craftsmanship Highlights</SectionHeading>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => <ServiceCard key={service.title} {...service} number={String(index + 1).padStart(2, '0')} />)}
          </div>
        </div>
      </section>

      <section className="ds-container ds-section" aria-labelledby="featured-heading">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Selected work" description="A glimpse of our finest handcrafted work.">Featured Creations</SectionHeading>
          <Link className="w-fit border-b border-gold pb-1 text-sm font-semibold text-brown transition-colors hover:border-brown hover:text-charcoal" to="/products">View All Creations →</Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCreations.map((creation) => <ProductCard key={creation.name} {...creation} />)}
        </div>
      </section>

      <section className="border-y border-sandstone-200 bg-ivory" aria-labelledby="trust-heading">
        <div className="ds-container ds-section">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <SectionHeading eyebrow="Our promise">Crafted With Care</SectionHeading>
            <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {trustPoints.map((point, index) => <li className="flex items-start gap-4 border-t border-sandstone-200 pt-4 text-base text-charcoal-soft" key={point}><span className="font-display text-xl text-gold">0{index + 1}</span><span>{point}</span></li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="ds-container ds-section" aria-labelledby="heritage-heading">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <PlaceholderImage className="min-h-[22rem] sm:min-h-[32rem]" image={imagePlaceholders.heritage} />
          <div>
            <SectionHeading eyebrow="The place" description="Mahabalipuram gives this work its setting: a place where stone, architecture, and making remain closely connected. Our work carries that sense of permanence into commissions shaped around today’s requirements.">Rooted in the Stone-Carving Heritage of Mahabalipuram</SectionHeading>
            <Link className="mt-8 inline-block border-b border-gold pb-1 text-sm font-semibold text-brown transition-colors hover:border-brown hover:text-charcoal" to="/about">Explore Our Heritage →</Link>
          </div>
        </div>
      </section>

      <section className="bg-brown text-ivory" aria-labelledby="custom-heading">
        <div className="ds-container flex flex-col gap-8 py-16 sm:py-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-gold-soft">Begin a conversation</p>
            <h2 className="font-display text-4xl leading-tight sm:text-5xl">Have Something Special in Mind?</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-sandstone-200">From a single sculpture to complete temple stonework, discuss your requirements with our artisans.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            <Button as={Link} to="/custom-order">Start a Custom Order</Button>
            <Button as={Link} className="border-sandstone-300 text-sandstone-100 hover:bg-brown-light" to="/contact" variant="secondary">Contact Us</Button>
          </div>
        </div>
      </section>

      <section className="ds-container ds-section" aria-labelledby="testimonials-heading">
        <SectionHeading align="center" eyebrow="Words from the journey" description="Development placeholders shown until verified customer feedback is available.">A Considered Experience</SectionHeading>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {demoTestimonials.map((testimonial) => <TestimonialCard key={`${testimonial.customer}-${testimonial.project}`} {...testimonial} />)}
        </div>
      </section>
    </main>
  )
}

export default Home