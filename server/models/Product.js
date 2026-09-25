const mongoose = require('mongoose')

const dimensionsSchema = new mongoose.Schema({
  height: Number,
  width: Number,
  depth: Number,
  unit: { type: String, trim: true },
}, { _id: false })

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true, trim: true },
  category: { type: String, required: true, index: true, trim: true },
  deity: { type: String, trim: true },
  stoneType: { type: String, required: true, index: true, trim: true },
  dimensions: dimensionsSchema,
  weight: { type: String, trim: true },
  craftingTime: { type: String, trim: true },
  description: { type: String, required: true, trim: true },
  craftsmanshipDetails: { type: String, trim: true },
  stoneInformation: { type: String, trim: true },
  customizationOptions: [{ type: String, trim: true }],
  images: [{ type: String, trim: true }],
  availability: { type: String, enum: ['available', 'unavailable', 'made-to-order'], default: 'made-to-order', index: true },
  isCustom: { type: Boolean, default: false, index: true },
  pricingType: { type: String, enum: ['quote', 'contact'], default: 'quote' },
  featured: { type: Boolean, default: false, index: true },
}, { timestamps: true })

productSchema.index({ name: 'text', category: 'text', deity: 'text', stoneType: 'text', description: 'text' })

module.exports = mongoose.model('Product', productSchema)
