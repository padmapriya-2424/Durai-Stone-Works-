import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './ui/Button'
import { Input, Select, Textarea, Choice } from './ui/FormControls'
import { createEnquiry, mapContactEnquiry } from '../services/enquiryService'

const initialForm = { fullName: '', email: '', phone: '', subject: '', message: '', consent: false }
const subjects = ['General Enquiry', 'Product Enquiry', 'Custom Sculpture', 'Temple / Architectural Work', 'Gallery / Project Enquiry', 'Other']

function ContactForm() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const submittingRef = useRef(false)

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setSubmitError('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (submittingRef.current) return

    const nextErrors = {}
    if (!form.fullName.trim()) nextErrors.fullName = 'Please enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Please enter a valid email address.'
    if (!form.phone.trim()) nextErrors.phone = 'Please enter a phone number.'
    if (form.phone && !/^[+\d][\d\s()-]{7,}$/.test(form.phone)) nextErrors.phone = 'Please enter a valid phone number.'
    if (!form.subject) nextErrors.subject = 'Please choose a subject.'
    if (!form.message.trim()) nextErrors.message = 'Please enter a message.'
    if (form.message.length > 1000) nextErrors.message = 'Please keep your message within 1000 characters.'
    if (!form.consent) nextErrors.consent = 'Please confirm that you agree to be contacted regarding your enquiry.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    submittingRef.current = true
    setIsSubmitting(true)
    setSubmitError('')

    createEnquiry(mapContactEnquiry(form))
      .then(() => setSubmitted(true))
      .catch((error) => setSubmitError(error.message))
      .finally(() => {
        submittingRef.current = false
        setIsSubmitting(false)
      })
  }

  if (submitted) {
    return (
      <div className="ds-card p-8 text-center sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Enquiry submitted</p>
        <h2 className="mt-4 font-display text-4xl text-charcoal">Message Ready to Send</h2>
        <p className="mx-auto mt-5 max-w-xl leading-7 text-charcoal-soft">Thank you! Your enquiry has been submitted successfully. Our team will contact you soon.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button type="button" onClick={() => { setForm(initialForm); setErrors({}); setSubmitError(''); setSubmitted(false) }}>Send Another Message</Button>
          <Button as={Link} to="/" variant="secondary">Back to Home</Button>
        </div>
      </div>
    )
  }

  return (
    <form className="ds-card space-y-5 p-6 sm:p-8" noValidate onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input error={errors.fullName} label="Full Name" name="fullName" required value={form.fullName} onChange={(event) => updateField('fullName', event.target.value)} />
        <Input error={errors.email} label="Email" name="email" required type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} />
        <Input error={errors.phone} label="Phone" name="phone" required type="tel" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} />
        <Select error={errors.subject} label="Subject" name="subject" required value={form.subject} onChange={(event) => updateField('subject', event.target.value)}>
          <option value="">Choose a subject</option>
          {subjects.map((subject) => <option key={subject}>{subject}</option>)}
        </Select>
        <div className="sm:col-span-2">
          <Textarea error={errors.message} hint={`${form.message.length} / 1000`} label="Message" maxLength="1000" name="message" placeholder="How can we help you?" required value={form.message} onChange={(event) => updateField('message', event.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <Choice
            name="consent"
            required
            checked={form.consent}
            onChange={(event) => updateField('consent', event.target.checked)}
            error={errors.consent}
          >
            I agree to be contacted by Durai Stone Works regarding my enquiry.
          </Choice>
        </div>
      </div>
      <Button loading={isSubmitting} type="submit">Send Message</Button>
      {submitError ? <p className="mt-4 text-sm text-[#9c493d]" role="alert">{submitError}</p> : null}
    </form>
  )
}

export default ContactForm