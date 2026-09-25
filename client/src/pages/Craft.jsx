import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import PlaceholderImage from '../components/ui/PlaceholderImage'
import SectionHeading from '../components/ui/SectionHeading'
import ServiceCard from '../components/ui/ServiceCard'
import { imagePlaceholders } from '../data/homeData'

const craftServices = [
  ['Stone Sculptures', 'Traditional handcrafted stone sculptures created with attention to detail.', 'Homes, collections, and meaningful spaces.', imagePlaceholders.introductionFigure],
  ['Temple Sculptures', 'Stone carvings and architectural elements created for temple-related projects.', 'Temple-related spaces and architectural settings.', imagePlaceholders.heritage],
  ['Custom Statues', 'Personalized sculptures created according to customer requirements.', 'Personal commissions and reference-led projects.', imagePlaceholders.introduction],
  ['Stone Pillars', 'Traditional carved pillars and structural stone elements shaped for a considered space.', 'Entrances, halls, and architectural settings.', imagePlaceholders.introductionDetail],
  ['Architectural Stonework', 'Pillars, decorative elements, and traditional architectural pieces.', 'Residential, devotional, and architectural projects.', imagePlaceholders.heritage],
  ['Decorative Stone Carvings', 'Carved stone details that bring texture and character to a space.', 'Interiors, exteriors, and decorative settings.', imagePlaceholders.introductionDetail],
  ['Monuments', 'Stone forms created for lasting commemorative and personal purposes.', 'Memorial and commemorative spaces.', imagePlaceholders.introductionFigure],
  ['Custom Projects', 'A flexible conversation for stonework shaped around a specific vision.', 'Projects requiring a tailored stone solution.', imagePlaceholders.introduction],
]

function Craft() {
  return (
    <main>
      <section className="bg-charcoal text-ivory" aria-labelledby="craft-heading"><div className="ds-container grid items-center gap-10 py-16 lg:grid-cols-[1fr_0.8fr] lg:py-24"><div><p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-gold-soft">Our craft / services</p><h1 className="font-display text-5xl leading-tight sm:text-7xl" id="craft-heading">Traditional Skills. Timeless Creations.</h1><p className="mt-6 max-w-xl text-base leading-7 text-sandstone-200">Explore a range of stone sculpture and carving services for devotional, architectural, commemorative, and personal requirements.</p></div><PlaceholderImage className="min-h-[20rem] rounded-none sm:min-h-[28rem]" image={imagePlaceholders.heritage} labelPosition="center" /></div></section>
      <section className="ds-container ds-section" aria-labelledby="services-heading"><SectionHeading eyebrow="What we make" description="Each service begins with a conversation about the intended form, setting, stone, and requirements.">Stone Craftsmanship Services</SectionHeading><div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{craftServices.map(([title, description, useCases, image], index) => <ServiceCard image={image} key={title} number={String(index + 1).padStart(2, '0')} quoteLabel="Request a Quote" quoteTo="/custom-order" title={title} useCases={useCases} description={description} />)}</div></section>
      <section className="bg-sandstone-100"><div className="ds-container flex flex-col gap-8 py-16 sm:py-20 lg:flex-row lg:items-end lg:justify-between"><div><p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-gold">Custom conversation</p><h2 className="font-display text-4xl text-charcoal sm:text-5xl">Need a Custom Project?</h2><p className="mt-5 max-w-xl text-base leading-7 text-charcoal-soft">Bring your vision to life with a handcrafted stone creation.</p></div><div className="flex flex-col gap-3 sm:flex-row"><Button as={Link} to="/custom-order">Request a Custom Order</Button><Button as={Link} to="/contact" variant="secondary">Contact Us</Button></div></div></section>
    </main>
  )
}

export default Craft