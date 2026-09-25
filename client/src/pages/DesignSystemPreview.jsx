import Button from '../components/ui/Button'
import { Choice, FileUpload, Input, Select, Textarea } from '../components/ui/FormControls'
import ProductCard from '../components/ui/ProductCard'
import SectionHeading from '../components/ui/SectionHeading'
import ServiceCard from '../components/ui/ServiceCard'
import StatusBadge from '../components/ui/StatusBadge'

const palette = [
  ['Sandstone', 'var(--color-sandstone-200)', '#e5d4bb'],
  ['Ivory', 'var(--color-ivory)', '#fffdf8'],
  ['Charcoal', 'var(--color-charcoal)', '#302c27'],
  ['Deep brown', 'var(--color-brown)', '#604534'],
  ['Muted gold', 'var(--color-gold)', '#a9864f'],
]

function DesignSystemPreview() {
  return (
    <main className="min-h-screen bg-sandstone-50">
      <header className="border-b border-sandstone-200 bg-charcoal text-ivory">
        <div className="ds-container py-12 sm:py-16">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold-soft">Durai Stone Works / Phase 2</p>
          <h1 className="max-w-3xl font-display text-4xl leading-tight sm:text-6xl">A quiet, considered language for stone.</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-sandstone-200 sm:text-lg">Design system preview for a premium traditional stone-art studio near Mahabalipuram.</p>
        </div>
      </header>

      <div className="ds-container ds-section space-y-20">
        <section aria-labelledby="palette-heading">
          <SectionHeading eyebrow="01 / Palette" description="Warm mineral tones create a grounded canvas, with bronze used as a measured accent rather than decoration.">Color palette</SectionHeading>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {palette.map(([name, color, hex]) => (
              <div className="overflow-hidden rounded-stone border border-sandstone-200 bg-ivory" key={name}>
                <div className="h-24" style={{ backgroundColor: color }} />
                <div className="p-3">
                  <p className="text-sm font-semibold text-charcoal">{name}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-brown-light">{hex}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="type-heading">
          <SectionHeading eyebrow="02 / Typography" description="A literary serif carries heritage statements; a clear sans-serif keeps navigation, forms, and metadata practical.">Typography hierarchy</SectionHeading>
          <div className="mt-8 grid gap-6 rounded-stone border border-sandstone-200 bg-ivory p-6 sm:p-8">
            <div>
              <p className="ds-label">Display</p>
              <p className="font-display text-5xl leading-none text-charcoal sm:text-7xl">Carved with patience.</p>
            </div>
            <div className="grid gap-5 border-t border-sandstone-200 pt-6 sm:grid-cols-3">
              <div><p className="ds-label">H1 / H2</p><p className="font-display text-3xl text-charcoal">The enduring form</p></div>
              <div><p className="ds-label">H3</p><p className="font-display text-2xl text-charcoal">Crafted in granite</p></div>
              <div><p className="ds-label">Body / small</p><p className="text-base leading-7 text-charcoal-soft">Details should feel calm, legible, and worth lingering over.</p></div>
            </div>
          </div>
        </section>

        <section aria-labelledby="buttons-heading">
          <SectionHeading eyebrow="03 / Actions">Buttons and statuses</SectionHeading>
          <div className="mt-8 flex flex-wrap items-center gap-3 rounded-stone border border-sandstone-200 bg-ivory p-6">
            <Button>Request a quote</Button>
            <Button variant="secondary">WhatsApp us</Button>
            <Button variant="tertiary">View details</Button>
            <Button disabled>Unavailable</Button>
            <Button loading>Sending request</Button>
            <StatusBadge status="approved">Approved</StatusBadge>
            <StatusBadge status="attention">Needs review</StatusBadge>
            <StatusBadge>Draft</StatusBadge>
          </div>
        </section>

        <section aria-labelledby="forms-heading">
          <SectionHeading eyebrow="04 / Form controls" description="Labels, focus rings, errors, disabled states, and generous tap targets are built into the control conventions.">Enquiry form language</SectionHeading>
          <div className="mt-8 grid gap-6 rounded-stone border border-sandstone-200 bg-ivory p-6 sm:grid-cols-2 sm:p-8">
            <Input label="Full name" name="preview-name" placeholder="Your name" required />
            <Input error="Please enter a valid email address." label="Email address" name="preview-email" placeholder="you@example.com" />
            <Select label="Preferred stone" name="preview-stone" defaultValue="granite">
              <option value="granite">Black granite</option>
              <option value="soapstone">Soapstone</option>
            </Select>
            <Input disabled label="Estimated budget" name="preview-budget" placeholder="Available after consultation" />
            <Textarea hint="A few details help the artisan understand your intent." label="Project description" name="preview-description" placeholder="Tell us about the sculpture..." />
            <FileUpload accept="image/*,.pdf" label="Reference image" name="preview-file" />
            <div className="flex flex-wrap items-center gap-5 sm:col-span-2">
              <Choice defaultChecked name="preview-consent">I agree to be contacted about this enquiry.</Choice>
              <Choice name="preview-contact" type="radio">Prefer WhatsApp</Choice>
            </div>
          </div>
        </section>

        <section aria-labelledby="cards-heading">
          <SectionHeading eyebrow="05 / Content cards" description="Cards stay lightly framed and useful: structure comes from proportion, spacing, and typography instead of heavy decoration.">Craft and collection cards</SectionHeading>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <ProductCard category="Deity sculpture" name="Seated Ganesha" stoneType="black granite" />
            <ServiceCard description="From initial sketch to final polish, each commission is guided by a master sculptor." number="01" title="Custom sculpture" />
            <ServiceCard description="Thoughtful packing and experienced coordination carry each finished work onward." number="02" title="Global delivery" />
          </div>
        </section>
      </div>
    </main>
  )
}

export default DesignSystemPreview