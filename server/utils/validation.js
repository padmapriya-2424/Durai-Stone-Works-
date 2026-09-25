const mongoose = require('mongoose')

function isValidEmail(value) {
  return typeof value === 'string' && /^\S+@\S+\.\S+$/.test(value)
}

function isValidPhone(value) {
  return typeof value === 'string' && /^[+\d][\d\s()\-]{7,}$/.test(value)
}

function collectEnquiryErrors(body) {
  const errors = []
  const add = (field, message) => errors.push({ field, message })

  if (!body.fullName || typeof body.fullName !== 'string' || !body.fullName.trim()) add('fullName', 'Please provide your full name')
  if (!isValidEmail(body.email)) add('email', 'Please provide a valid email')
  if (!isValidPhone(body.phone)) add('phone', 'Please provide a valid phone number')
  if (!body.description || typeof body.description !== 'string' || !body.description.trim()) add('description', 'Please provide a project description')
  if (typeof body.description === 'string' && body.description.length > 1000) add('description', 'Description must be 1000 characters or fewer')
  if (body.quantity !== undefined && (!Number.isInteger(Number(body.quantity)) || Number(body.quantity) < 1)) add('quantity', 'Quantity must be a positive integer')
  if (body.deliveryDate) {
    const deliveryDate = new Date(body.deliveryDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (Number.isNaN(deliveryDate.getTime()) || deliveryDate < today) add('deliveryDate', 'Delivery date must not be in the past')
  }
  if (body.consentToContact !== true) add('consentToContact', 'Consent to contact is required')
  if (body.productId !== undefined && body.productId !== null && !mongoose.isValidObjectId(body.productId)) add('productId', 'Product ID is invalid')

  return errors
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

module.exports = { collectEnquiryErrors, escapeRegex, isValidEmail, isValidPhone }
