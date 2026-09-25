const mongoose = require('mongoose')
const Product = require('../models/Product')
const { escapeRegex } = require('../utils/validation')

async function getProducts(request, response, next) {
  try {
    const { search, category, stoneType, deity, availability, isCustom, featured } = request.query
    const query = {}

    if (search) {
      const safeSearch = new RegExp(escapeRegex(String(search).slice(0, 100)), 'i')
      query.$or = [
        { name: safeSearch },
        { category: safeSearch },
        { deity: safeSearch },
        { stoneType: safeSearch },
        { description: safeSearch },
      ]
    }
    if (category) query.category = String(category)
    if (stoneType) query.stoneType = String(stoneType)
    if (deity) query.deity = String(deity)
    if (availability) query.availability = String(availability)
    if (isCustom === 'true' || isCustom === 'false') query.isCustom = isCustom === 'true'
    if (featured === 'true' || featured === 'false') query.featured = featured === 'true'

    const products = await Product.find(query).sort({ featured: -1, createdAt: -1 }).lean()
    response.json({ success: true, count: products.length, data: products })
  } catch (error) {
    next(error)
  }
}

async function getProductById(request, response, next) {
  try {
    const identifier = request.params.id
    const query = mongoose.isValidObjectId(identifier) ? { _id: identifier } : { slug: identifier }
    const product = await Product.findOne(query).lean()

    if (!product) {
      return response.status(404).json({ success: false, message: 'Product not found' })
    }

    return response.json({ success: true, data: product })
  } catch (error) {
    return next(error)
  }
}

module.exports = { getProductById, getProducts }
