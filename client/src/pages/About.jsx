import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import PlaceholderImage from '../components/ui/PlaceholderImage'
import SectionHeading from '../components/ui/SectionHeading'
import { imagePlaceholders } from '../data/homeData'

const values = ['Quality', 'Authentic Craftsmanship', 'Customer Trust', 'Attention to Detail', 'Preservation of Tradition']
const craftSteps = ['Stone Selection', 'Design / Requirement', 'Carving', 'Detailing', 'Finishing', 'Final Inspection']

function About() {
  return (
    <main>
      <section className="bg-charcoal text-ivory" aria-labelledby="about-heading">
        <div className="ds-container grid items-center gap-10 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:py-24">
          <div><p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-gold-soft">About Durai Stone Works</p><h1 className="font-display text-5xl leading-tight sm:text-7xl" id="about-heading">A Tradition Carved in Stone</h1><p className="mt-6 max-w-lg text-base leading-7 text-sandstone-200">Traditional stone craftsmanship based near Mahabalipuram, Tamil Nadu, shaped around careful making and meaningful spaces.</p></div>
          <PlaceholderImage className="min-h-[24rem] rounded-none sm:min-h-[34rem]" image={imagePlaceholders.hero} labelPosition="center" />
        </div>
      </section>

      <section className="ds-container ds-section" aria-labelledby="story-heading">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"><SectionHeading eyebrow="The studio" description="Durai Stone Works is a family-run traditional stone craftsmanship business based near Mahabalipuram, Tamil Nadu. Its work includes hand-carved stone sculptures, temple sculptures, architectural stonework, custom statues, and traditional Indian stone carvings.">Our Story</SectionHeading><PlaceholderImage className="min-h-[22rem] sm:min-h-[30rem]" image={imagePlaceholders.introduction} /></div>
      </section>

      <section className="bg-sandstone-100" aria-labelledby="craftsmanship-heading"><div className="ds-container ds-section"><SectionHeading eyebrow="The process" description="Each commission follows a clear sequence, allowing the requirements, stone, and finish to be considered at every stage.">Our Craftsmanship</SectionHeading><div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{craftSteps.map((step, index) => <div className="border-t border-sandstone-300 py-5" key={step}><p className="font-display text-2xl text-gold">0{index + 1}</p><h3 className="mt-4 font-display text-2xl text-charcoal">{step}</h3><p className="mt-2 text-sm leading-6 text-charcoal-soft">A considered stage in bringing a stone creation from requirement to final inspection.</p></div>)}</div></div></section>

      <section className="ds-container ds-section" aria-labelledby="values-heading"><SectionHeading eyebrow="What guides the work">Our Values</SectionHeading><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{values.map((value, index) => <article className="border-t-2 border-gold pt-4" key={value}><p className="font-display text-xl text-gold">0{index + 1}</p><h3 className="mt-4 font-display text-xl text-charcoal">{value}</h3></article>)}</div></section>

      <section className="bg-sandstone-100" aria-labelledby="artisans-heading"><div className="ds-container ds-section"><SectionHeading eyebrow="People behind the making">Meet the Artisans</SectionHeading><div className="mt-10 grid gap-6 sm:grid-cols-3">{[1, 2, 3].map((number) => <article className="ds-card overflow-hidden" key={number}><PlaceholderImage className="rounded-none" image={{ alt: 'Artisan profile placeholder', label: 'Artisan profile / replace with verified image', tone: number === 2 ? 'brown' : 'sandstone' }} /><div className="p-5"><h3 className="font-display text-2xl text-charcoal">Artisan Profile</h3><p className="mt-2 text-sm font-semibold text-brown">Stone Sculptor</p><p className="mt-4 text-sm leading-6 text-charcoal-soft">Placeholder profile - replace with verified artisan information.</p></div></article>)}</div></div></section>

      <section className="ds-container ds-section" aria-labelledby="workshop-heading"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><SectionHeading eyebrow="The workshop">Our Workshop</SectionHeading><Link className="w-fit border-b border-gold pb-1 text-sm font-semibold text-brown" to="/gallery">Explore Our Gallery →</Link></div><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><PlaceholderImage image={imagePlaceholders.introduction} labelPosition="center" /><PlaceholderImage image={imagePlaceholders.introductionDetail} labelPosition="center" /><PlaceholderImage image={imagePlaceholders.introductionFigure} labelPosition="center" /><PlaceholderImage image={imagePlaceholders.heritage} labelPosition="center" /></div></section>

      <section className="bg-brown text-ivory"><div className="ds-container flex flex-col gap-8 py-16 sm:py-20 lg:flex-row lg:items-end lg:justify-between"><div><p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-gold-soft">Begin a conversation</p><h2 className="font-display text-4xl sm:text-5xl">Bring Your Vision to Stone</h2></div><div className="flex flex-col gap-3 sm:flex-row"><Button as={Link} to="/custom-order">Start a Custom Order</Button><Button as={Link} className="border-sandstone-300 text-sandstone-100 hover:bg-brown-light" to="/contact" variant="secondary">Contact Us</Button></div></div></section>
    </main>
  )
}

export default About