import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Button from './ui/Button'
import { Choice, FileUpload, Input, Select, Textarea } from './ui/FormControls'
import { getProductById } from '../data/productData'

const initialForm = { fullName: '', email: '', phone: '', contactMethod: '', projectType: '', stone: '', height: '', width: '', depth: '', unit: 'cm', quantity: '1', budget: '', deliveryDate: '', description: '', consent: false, whatsappPreference: false }
const projectTypes = ['Deity Sculpture', 'Temple Sculpture', 'Custom Statue', 'Architectural Stonework', 'Decorative Stone Carving', 'Monument', 'Restoration', 'Other']
const stoneOptions = ['Black Granite', 'Granite', 'Sandstone', 'Natural Stone', 'Not Sure']
const budgetOptions = ['Under ₹50,000', '₹50,000 – ₹1,00,000', '₹1,00,000 – ₹2,50,000', '₹2,50,000 – ₹5,00,000', 'Above ₹5,00,000', 'Not Sure']
const acceptedTypes = ['image/jpeg', 'image/png', 'image/webp']
const maxFileSize = 5 * 1024 * 1024

function CustomOrderForm() {
  const [searchParams] = useSearchParams()
  const product = getProductById(searchParams.get('product'))
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [files, setFiles] = useState([])
  const [fileError, setFileError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const filesRef = useRef([])
  const minDate = useMemo(() => new Date().toISOString().split('T')[0], [])

  useEffect(() => {
    filesRef.current = files
  }, [files])

  useEffect(() => () => filesRef.current.forEach((file) => URL.revokeObjectURL(file.preview)), [])

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  function validate() {
    const nextErrors = {}
    if (!form.fullName.trim()) nextErrors.fullName = 'Please enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Please enter a valid email address.'
    if (!/^[+\d][\d\s()-]{7,}$/.test(form.phone)) nextErrors.phone = 'Please enter a valid phone number.'
    if (!form.contactMethod) nextErrors.contactMethod = 'Please choose a contact method.'
    if (!form.projectType) nextErrors.projectType = 'Please choose a project type.'
    if (!form.stone) nextErrors.stone = 'Please choose a preferred stone.'
    if (!Number.isInteger(Number(form.quantity)) || Number(form.quantity) < 1) nextErrors.quantity = 'Quantity must be a positive whole number.'
    if (form.deliveryDate && form.deliveryDate < minDate) nextErrors.deliveryDate = 'Please choose today or a future date.'
    if (!form.description.trim()) nextErrors.description = 'Please describe your project.'
    if (form.description.length > 1000) nextErrors.description = 'Please keep the description within 1000 characters.'
    if (!form.consent) nextErrors.consent = 'Consent is required to submit this enquiry.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0 && !fileError
  }

  function handleFiles(event) {
    const selected = Array.from(event.target.files || [])
    const nextError = selected.length + files.length > 5 ? 'Please select no more than 5 files.' : selected.find((file) => !acceptedTypes.includes(file.type)) ? 'Only JPG, JPEG, PNG, and WEBP images are accepted.' : selected.find((file) => file.size > maxFileSize) ? 'Each image must be 5 MB or smaller.' : ''
    setFileError(nextError)
    if (nextError) return
    setFiles((current) => [...current, ...selected.map((file) => ({ file, preview: URL.createObjectURL(file) }))])
    event.target.value = ''
  }

  function removeFile(index) {
    setFiles((current) => {
      const removed = current[index]
      URL.revokeObjectURL(removed.preview)
      return current.filter((_, fileIndex) => fileIndex !== index)
    })
    setFileError('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    window.setTimeout(() => { setIsSubmitting(false); setIsSubmitted(true) }, 500)
  }

  if (isSubmitted) return <SuccessState onReset={() => { setForm(initialForm); setFiles([]); setErrors({}); setIsSubmitted(false) }} />

  return (
    <form className="space-y-10" noValidate onSubmit={handleSubmit}>
      {product ? <div className="border-l-2 border-gold bg-sandstone-100 p-4"><p className="text-xs font-bold uppercase tracking-[0.14em] text-brown">Enquiring about</p><p className="mt-2 font-display text-2xl text-charcoal">{product.name}</p><p className="mt-1 text-sm text-charcoal-soft">{product.category} · {product.stoneType}</p></div> : null}
      <fieldset className="space-y-5"><legend className="font-display text-3xl text-charcoal">Contact Details</legend><div className="grid gap-5 sm:grid-cols-2"><Input error={errors.fullName} label="Full Name" name="fullName" required value={form.fullName} onChange={(event) => updateField('fullName', event.target.value)} /><Input error={errors.email} label="Email Address" name="email" required type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} /><Input error={errors.phone} label="Phone Number" name="phone" required type="tel" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} /><Select error={errors.contactMethod} label="Preferred Contact Method" name="contactMethod" required value={form.contactMethod} onChange={(event) => updateField('contactMethod', event.target.value)}><option value="">Choose one</option><option>Email</option><option>Phone</option><option>WhatsApp</option></Select></div></fieldset>
      <fieldset className="space-y-5 border-t border-sandstone-200 pt-10"><legend className="font-display text-3xl text-charcoal">Project Details</legend><div className="grid gap-5 sm:grid-cols-2"><Select error={errors.projectType} label="Project Type" name="projectType" required value={form.projectType} onChange={(event) => updateField('projectType', event.target.value)}><option value="">Choose a project type</option>{projectTypes.map((option) => <option key={option}>{option}</option>)}</Select><Select error={errors.stone} label="Preferred Stone" name="stone" required value={form.stone} onChange={(event) => updateField('stone', event.target.value)}><option value="">Choose a stone preference</option>{stoneOptions.map((option) => <option key={option}>{option}</option>)}</Select><div className="sm:col-span-2"><p className="ds-label">Dimensions <span className="font-normal normal-case tracking-normal">(optional)</span></p><div className="grid gap-3 sm:grid-cols-4"><Input label="Height" name="height" placeholder="Height" type="number" value={form.height} onChange={(event) => updateField('height', event.target.value)} /><Input label="Width" name="width" placeholder="Width" type="number" value={form.width} onChange={(event) => updateField('width', event.target.value)} /><Input label="Depth" name="depth" placeholder="Depth" type="number" value={form.depth} onChange={(event) => updateField('depth', event.target.value)} /><Select label="Unit" name="unit" value={form.unit} onChange={(event) => updateField('unit', event.target.value)}><option>cm</option><option>inch</option><option>feet</option></Select></div></div><Input error={errors.quantity} label="Quantity" name="quantity" required type="number" min="1" step="1" value={form.quantity} onChange={(event) => updateField('quantity', event.target.value)} /><Select label="Estimated Budget" name="budget" hint="Enquiry range only - no automatic quotation is calculated." value={form.budget} onChange={(event) => updateField('budget', event.target.value)}><option value="">Choose a range</option>{budgetOptions.map((option) => <option key={option}>{option}</option>)}</Select><Input error={errors.deliveryDate} hint="Final timelines will be discussed after reviewing the project requirements." label="Preferred Delivery Date" name="deliveryDate" min={minDate} type="date" value={form.deliveryDate} onChange={(event) => updateField('deliveryDate', event.target.value)} /><div className="sm:col-span-2"><Textarea error={errors.description} hint={`${form.description.length} / 1000`} label="Tell us about your project" name="description" maxLength="1000" placeholder="Describe the sculpture, design, style, intended use, or any details that may help us understand your requirement." required value={form.description} onChange={(event) => updateField('description', event.target.value)} /></div></div></fieldset>
      <fieldset className="space-y-5 border-t border-sandstone-200 pt-10"><legend className="font-display text-3xl text-charcoal">Reference Images</legend><FileUpload accept=".jpg,.jpeg,.png,.webp" error={fileError} hint="JPG, JPEG, PNG, or WEBP. Maximum 5 MB per file, up to 5 files." label="Reference images or sketches" multiple name="references" onChange={handleFiles} />{files.length ? <div className="grid gap-3 sm:grid-cols-2">{files.map((item, index) => <div className="flex min-w-0 items-center gap-3 border border-sandstone-200 p-3" key={`${item.file.name}-${index}`}><img alt="Selected reference preview" className="h-16 w-16 rounded-sm object-cover" src={item.preview} /><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-charcoal">{item.file.name}</p><p className="text-xs text-charcoal-soft">{(item.file.size / 1024 / 1024).toFixed(2)} MB</p></div><button aria-label={`Remove ${item.file.name}`} className="min-h-10 px-2 text-sm font-semibold text-brown hover:text-charcoal" type="button" onClick={() => removeFile(index)}>Remove</button></div>)}</div> : null}</fieldset>
      <fieldset className="space-y-4 border-t border-sandstone-200 pt-10"><legend className="font-display text-3xl text-charcoal">Your Preference</legend><div><Choice checked={form.consent} name="consent" required onChange={(event) => updateField('consent', event.target.checked)}>I agree to be contacted regarding this enquiry.</Choice>{errors.consent ? <p className="mt-2 text-sm text-[#9c493d]" id="consent-error">{errors.consent}</p> : null}</div><Choice checked={form.whatsappPreference} name="whatsappPreference" onChange={(event) => updateField('whatsappPreference', event.target.checked)}>I would prefer to continue this enquiry on WhatsApp.</Choice></fieldset>
      <div className="flex flex-col gap-3 border-t border-sandstone-200 pt-8 sm:flex-row"><Button loading={isSubmitting} type="submit">Submit Enquiry</Button><Button type="button" variant="secondary" onClick={() => { updateField('contactMethod', 'WhatsApp'); document.querySelector('[name="contactMethod"]')?.focus() }}>Prefer WhatsApp</Button></div>
    </form>
  )
}

function SuccessState({ onReset }) {
  return <div className="ds-card p-8 text-center sm:p-12"><p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Development demo state</p><h2 className="mt-4 font-display text-4xl text-charcoal">Enquiry Received</h2><p className="mx-auto mt-5 max-w-xl leading-7 text-charcoal-soft">Thank you for sharing your project details. This demonstration currently stores the enquiry only in the browser interface. Backend submission will be connected in a later phase.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Button type="button" onClick={onReset}>Submit Another Enquiry</Button><Button as={Link} to="/" variant="secondary">Back to Home</Button></div></div>
}

export default CustomOrderForm
