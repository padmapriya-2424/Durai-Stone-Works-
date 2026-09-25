const Enquiry = require('../models/Enquiry')
const Product = require('../models/Product')
const { collectEnquiryErrors } = require('../utils/validation')

async function createEnquiry(request, response, next) {
  try {
    const validationErrors = collectEnquiryErrors(request.body)
    if (validationErrors.length) {
      return response.status(400).json({ success: false, message: 'Validation failed', errors: validationErrors })
    }

    if (request.body.productId) {
      const productExists = await Product.exists({ _id: request.body.productId })
      if (!productExists) {
        return response.status(400).json({ success: false, message: 'Referenced product was not found', errors: [{ field: 'productId', message: 'Referenced product was not found' }] })
      }
    }

    const enquiry = await Enquiry.create(request.body)
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
