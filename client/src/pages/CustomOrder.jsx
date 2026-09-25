import CustomOrderForm from '../components/CustomOrderForm'
import PlaceholderImage from '../components/ui/PlaceholderImage'
import SectionHeading from '../components/ui/SectionHeading'
import { businessData } from '../data/businessData'
import { imagePlaceholders } from '../data/homeData'

function CustomOrder() {
  return (
    <main>
      <section className="bg-charcoal text-ivory" aria-labelledby="custom-order-heading"><div className="ds-container grid items-center gap-10 py-16 lg:grid-cols-[1fr_0.75fr] lg:py-24"><div><p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-gold-soft">Custom order / enquiry</p><h1 className="font-display text-5xl leading-tight sm:text-7xl" id="custom-order-heading">Bring Your Vision to Stone</h1><p className="mt-6 max-w-xl text-base leading-7 text-sandstone-200">Tell us about your sculpture or stonework requirement and our team will review the details with you.</p></div><PlaceholderImage className="min-h-[20rem] rounded-none sm:min-h-[28rem]" image={imagePlaceholders.introduction} labelPosition="center" /></div></section>
      <section className="ds-container ds-section"><div className="grid items-start gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-20"><div><SectionHeading eyebrow="Start a conversation" description="Tell us what you have in mind. Our artisans can understand the requirement and discuss the possibilities with you." /><div className="mt-10"><CustomOrderForm /></div></div><aside className="ds-card space-y-7 p-6 lg:sticky lg:top-24"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">Consultation</p><h2 className="mt-3 font-display text-3xl text-charcoal">Let's discuss your project</h2></div><ul className="grid gap-4 text-sm leading-6 text-charcoal-soft"><li>Custom sculptures</li><li>Temple and architectural work</li><li>Stone selection guidance</li><li>Project discussions</li></ul><div className="border-t border-sandstone-200 pt-6 text-sm text-charcoal-soft"><p>{businessData.phone}</p><p className="mt-2">{businessData.whatsapp}</p><p className="mt-2">{businessData.email}</p><p className="mt-2">{businessData.location}</p></div></aside></div></section>
    </main>
  )
}

export default CustomOrder
