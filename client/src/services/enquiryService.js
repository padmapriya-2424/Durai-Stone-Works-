import api from './api'

function normalizeError(error) {
  const status = error.response?.status
  if (!error.response) {
    return { message: 'We couldn\'t send your enquiry right now. Please check your connection and try again.', status: null }
  }
  if (status === 400) {
    return { message: 'Please check the information you entered.', status }
  }
  if (status === 429) {
    return { message: 'Too many requests. Please wait a moment and try again.', status }
  }
  if (status >= 500) {
    return { message: 'We couldn\'t process your enquiry right now. Please try again.', status }
  }
  return { message: 'We couldn\'t send your enquiry right now. Please try again.', status }
}

export function mapCustomOrderEnquiry(form, files = [], productId = null) {
  const dimensions = {
    height: form.height ? Number(form.height) : undefined,
    width: form.width ? Number(form.width) : undefined,
    depth: form.depth ? Number(form.depth) : undefined,
    unit: form.unit || undefined,
  }

  return {
    fullName: form.fullName.trim(),
    email: form.email.trim().toLowerCase(),
    phone: form.phone.trim(),
    preferredContactMethod: form.contactMethod ? form.contactMethod.toLowerCase() : undefined,
    projectType: form.projectType || undefined,
    preferredStone: form.stone || undefined,
    dimensions,
    quantity: Number(form.quantity),
    budget: form.budget || undefined,
    deliveryDate: form.deliveryDate || undefined,
    description: form.description.trim(),
    referenceFiles: files.map((item) => item.file.name),
    consentToContact: Boolean(form.consent),
    preferWhatsApp: Boolean(form.whatsappPreference),
    ...(productId ? { productId } : {}),
  }
}

export function mapContactEnquiry(form) {
  return {
    fullName: form.fullName.trim(),
    email: form.email.trim().toLowerCase(),
    phone: form.phone?.trim() || '',
    preferredContactMethod: 'email',
    projectType: form.subject,
    preferredStone: undefined,
    description: form.message.trim(),
    consentToContact: Boolean(form.consent),
    preferWhatsApp: false,
  }
}

export async function createEnquiry(data) {
  try {
    const response = await api.post('/enquiries', data)
    return response.data
  } catch (error) {
    throw normalizeError(error)
  }
}
