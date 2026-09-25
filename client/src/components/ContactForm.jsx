import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './ui/Button'
import { Input, Select, Textarea } from './ui/FormControls'

const initialForm = { fullName: '', email: '', phone: '', subject: '', message: '' }
const subjects = ['General Enquiry', 'Product Enquiry', 'Custom Sculpture', 'Temple / Architectural Work', 'Gallery / Project Enquiry', 'Other']

function ContactForm() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}
    if (!form.fullName.trim()) nextErrors.fullName = 'Please enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Please enter a valid email address.'
    if (!form.subject) nextErrors.subject = 'Please choose a subject.'
    if (!form.message.trim()) nextErrors.message = 'Please enter a message.'
    if (form.message.length > 1000) nextErrors.message = 'Please keep your message within 1000 characters.'
    setErrors(nextErrors)
    if (!Object.keys(nextErrors).length) setSubmitted(true)
  }

  if (submitted) {
    return <div className="ds-card p-8 text-center sm:p-10"><p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Development demo state</p><h2 className="mt-4 font-display text-4xl text-charcoal">Message Ready to Send</h2><p className="mx-auto mt-5 max-w-xl leading-7 text-charcoal-soft">This contact form is currently running in frontend demo mode. Backend submission will be connected in a later phase.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Button type="button" onClick={() => { setForm(initialForm); setErrors({}); setSubmitted(false) }}>Send Another Message</Button><Button as={Link} to="/" variant="secondary">Back to Home</Button></div></div>
  }

  return <form className="ds-card space-y-5 p-6 sm:p-8" noValidate onSubmit={handleSubmit}><div className="grid gap-5 sm:grid-cols-2"><Input error={errors.fullName} label="Full Name" name="fullName" required value={form.fullName} onChange={(event) => updateField('fullName', event.target.value)} /><Input error={errors.email} label="Email" name="email" required type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} /><Input label="Phone" name="phone" type="tel" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} /><Select error={errors.subject} label="Subject" name="subject" required value={form.subject} onChange={(event) => updateField('subject', event.target.value)}><option value="">Choose a subject</option>{subjects.map((subject) => <option key={subject}>{subject}</option>)}</Select><div className="sm:col-span-2"><Textarea error={errors.message} hint={`${form.message.length} / 1000`} label="Message" maxLength="1000" name="message" placeholder="How can we help you?" required value={form.message} onChange={(event) => updateField('message', event.target.value)} /></div></div><Button type="submit">Send Message</Button></form>
}

export default ContactForm