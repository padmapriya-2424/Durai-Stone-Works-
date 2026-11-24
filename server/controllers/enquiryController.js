const Enquiry = require('../models/Enquiry')
const Product = require('../models/Product')
const { collectEnquiryErrors } = require('../utils/validation')

function collectReferenceFileErrors(referenceFiles) {
  if (referenceFiles === undefined) return []
  if (!Array.isArray(referenceFiles)) {
    return [{ field: 'referenceFiles', message: 'Reference files must be an array of filenames' }]
  }
  if (referenceFiles.length > 5) {
    return [{ field: 'referenceFiles', message: 'No more than 5 reference filenames are allowed' }]
  }

  return referenceFiles.flatMap((filename, index) => {
    const field = `referenceFiles.${index}`
    if (typeof filename !== 'string') {
      return [{ field, message: 'Reference file must be a filename string' }]
    }
    if (!filename || filename.trim() !== filename || filename.length > 255) {
      return [{ field, message: 'Reference filename must be 1 to 255 characters without surrounding whitespace' }]
    }
    if (/^data:/i.test(filename) || /base64/i.test(filename)) {
      return [{ field, message: 'Reference file contents are not accepted; provide a filename only' }]
    }
    if (/[\\/]/.test(filename) || /[\u0000-\u001F\u007F-\u009F]/.test(filename)) {
      return [{ field, message: 'Reference filename contains an invalid path separator or control character' }]
    }
    if (!/^[\p{L}\p{N} ._()\-]+$/u.test(filename) || filename === '.' || filename === '..') {
      return [{ field, message: 'Reference filename contains unsupported characters' }]
    }
    return []
  })
}

async function createEnquiry(request, response, next) {
  try {
    const validationErrors = [
      ...collectEnquiryErrors(request.body),
      ...collectReferenceFileErrors(request.body.referenceFiles),
    ]
    if (validationErrors.length) {
      return response.status(400).json({ success: false, message: 'Validation failed', errors: validationErrors })
    }

    if (request.body.productId) {
      const productExists = await Product.exists({ _id: request.body.productId })
      if (!productExists) {
        return response.status(400).json({ success: false, message: 'Referenced product was not found', errors: [{ field: 'productId', message: 'Referenced product was not found' }] })
      }
    }

    const {
      fullName,
      email,
      phone,
      preferredContactMethod,
      projectType,
      preferredStone,
      dimensions,
      quantity,
      budget,
      deliveryDate,
      description,
      referenceFiles,
      consentToContact,
      preferWhatsApp,
      productId,
    } = request.body

    const enquiryData = {
      fullName,
      email,
      phone,
      preferredContactMethod,
      projectType,
      preferredStone,
      dimensions: dimensions && {
        height: dimensions.height,
        width: dimensions.width,
        depth: dimensions.depth,
        unit: dimensions.unit,
      },
      quantity,
      budget,
      deliveryDate,
      description,
      referenceFiles: referenceFiles || [],
      consentToContact,
      preferWhatsApp,
      productId,
      status: 'new',
    }

    const enquiry = await Enquiry.create(enquiryData)
    return response.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      data: {
        id: enquiry._id,
        status: enquiry.status,
        createdAt: enquiry.createdAt,
      },
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = { createEnquiry }
