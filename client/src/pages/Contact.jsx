import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import ContactForm from '../components/ContactForm'
import PlaceholderImage from '../components/ui/PlaceholderImage'
import SectionHeading from '../components/ui/SectionHeading'
import { businessData } from '../data/businessData'
import { imagePlaceholders } from '../data/homeData'

const validPhone = /^[+\d][\d\s()-]{7,}$/.test(businessData.phone)
const validEmail = /^\S+@\S+\.\S+$/.test(businessData.email)
const validWhatsApp = /^\d{8,15}$/.test(businessData.whatsapp)
const socialLinks = [
  { label: businessData.instagram, url: businessData.instagramUrl },
  { label: businessData.facebook, url: businessData.facebookUrl },
  { label: businessData.youtube, url: businessData.youtubeUrl },
]

function Contact() {
  return (
    <main>
      <section className="bg-charcoal text-ivory" aria-labelledby="contact-heading"><div className="ds-container grid items-center gap-10 py-16 lg:grid-cols-[1fr_0.8fr] lg:py-24"><div><p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-gold-soft">Contact / start a conversation</p><h1 className="font-display text-5xl leading-tight sm:text-7xl" id="contact-heading">Let's Talk About Your Project</h1><p className="mt-6 max-w-xl text-base leading-7 text-sandstone-200">Whether you have a sculpture in mind or need traditional stonework, we'd be happy to discuss your requirements.</p></div><PlaceholderImage className="min-h-[20rem] rounded-none sm:min-h-[28rem]" image={imagePlaceholders.introduction} labelPosition="center" /></div></section>

      <section className="ds-container ds-section" aria-label="Contact options"><SectionHeading eyebrow="Reach the studio">Contact Options</SectionHeading><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><ContactOption label="Phone" value={businessData.phone} href={validPhone ? `tel:${businessData.phone.replace(/\s/g, '')}` : ''} /><ContactOption label="WhatsApp" value={businessData.whatsapp} href={validWhatsApp ? `https://wa.me/${businessData.whatsapp}` : ''} /><ContactOption label="Email" value={businessData.email} href={validEmail ? `mailto:${businessData.email}` : ''} /><ContactOption label="Location" value={businessData.location} /></div></section>

      <section className="bg-sandstone-100" aria-label="Contact form and studio information"><div className="ds-container ds-section grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20"><div><SectionHeading eyebrow="Send a message" description="For a detailed sculpture or stonework requirement, use our custom order enquiry instead.">A Simple Conversation</SectionHeading><div className="mt-10"><ContactForm /></div></div><aside className="space-y-8 lg:sticky lg:top-24"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">Studio information</p><h2 className="mt-3 font-display text-3xl text-charcoal">A direct line to the work</h2><p className="mt-4 text-base leading-7 text-charcoal-soft">We keep the first conversation simple, personal, and focused on understanding what you need.</p></div><PlaceholderImage className="min-h-[18rem]" image={imagePlaceholders.introductionDetail} labelPosition="center" /><div><h2 className="font-display text-2xl text-charcoal">Social presence</h2><div className="mt-4 flex flex-wrap gap-4 text-sm">{socialLinks.map((social) => social.url ? <a className="border-b border-gold pb-1 font-semibold text-brown" href={social.url} key={social.label} rel="noreferrer" target="_blank">{social.label}</a> : <span className="text-charcoal-soft" key={social.label}>{social.label} unavailable</span>)}</div></div>{businessData.businessHours ? <div><h2 className="font-display text-2xl text-charcoal">Business hours</h2><p className="mt-3 text-sm text-charcoal-soft">{businessData.businessHours}</p></div> : null}</aside></div></section>

      <section className="ds-container ds-section" aria-label="Visit us"><div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20"><div><SectionHeading eyebrow="The place">Visit Us</SectionHeading><p className="mt-5 text-base leading-7 text-charcoal-soft">{businessData.location}</p></div><div className="flex min-h-64 items-center justify-center rounded-stone border border-sandstone-300 bg-sandstone-100 p-8 text-center"><p className="max-w-sm text-sm leading-6 text-brown">Location map will be added once the business location details are finalized.</p></div></div></section>

      <section className="bg-brown text-ivory"><div className="ds-container flex flex-col gap-8 py-16 sm:py-20 lg:flex-row lg:items-end lg:justify-between"><div><p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-gold-soft">Detailed requirements</p><h2 className="font-display text-4xl sm:text-5xl">Planning Something Custom?</h2><p className="mt-5 max-w-xl text-base leading-7 text-sandstone-200">For sculptures, statues, temple work, or architectural stonework, tell us about your project in more detail.</p></div><Button as={Link} to="/custom-order">Start a Custom Order</Button></div></section>
    </main>
  )
}

function ContactOption({ href, label, value }) {
  const content = <><span className="flex h-9 w-9 items-center justify-center rounded-full bg-sandstone-100 text-sm font-bold text-brown" aria-hidden="true">{label.charAt(0)}</span><span><span className="block text-xs font-bold uppercase tracking-[0.14em] text-gold">{label}</span><span className="mt-2 block break-words text-sm text-charcoal-soft">{value}</span><span className="mt-3 block text-xs font-semibold text-brown">{href ? 'Open contact' : 'Placeholder detail'}</span></span></>
  return href ? <a aria-label={`${label}: ${value}`} className="ds-card flex gap-4 p-5 transition-colors hover:border-brown" href={href}>{content}</a> : <div className="ds-card flex gap-4 p-5">{content}</div>
}

export default Contact