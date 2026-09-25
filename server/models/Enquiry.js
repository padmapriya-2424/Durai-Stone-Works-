const mongoose = require('mongoose')

const dimensionsSchema = new mongoose.Schema({
  height: Number,
  width: Number,
  depth: Number,
  unit: { type: String, enum: ['cm', 'inch', 'inches', 'feet'], trim: true },
}, { _id: false })

const enquirySchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  preferredContactMethod: { type: String, enum: ['email', 'phone', 'whatsapp'], trim: true },
  projectType: { type: String, trim: true },
  preferredStone: { type: String, trim: true },
  dimensions: dimensionsSchema,
  quantity: { type: Number, min: 1 },
  budget: { type: String, trim: true },
  deliveryDate: Date,
  description: { type: String, required: true, trim: true, maxlength: 1000 },
  referenceFiles: [{ type: String, trim: true }],
  consentToContact: { type: Boolean, required: true, validate: { validator: Boolean, message: 'Consent to contact is required' } },
  preferWhatsApp: { type: Boolean, default: false },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  status: { type: String, enum: ['new', 'reviewing', 'quoted', 'in-progress', 'completed', 'cancelled'], default: 'new' },
}, { timestamps: true })

enquirySchema.path('consentToContact').validate((value) => value === true, 'Consent to contact is required')

module.exports = mongoose.model('Enquiry', enquirySchema)
