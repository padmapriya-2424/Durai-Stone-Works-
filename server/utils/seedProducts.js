const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const mongoose = require('mongoose')
const connectDB = require('../config/db')
const Product = require('../models/Product')

const sourceProducts = [
  { id: 'seated-ganesha', name: 'Seated Ganesha', category: 'Deity Sculptures', deity: 'Ganesha', stoneType: 'Black Granite', description: 'A demonstration devotional sculpture with a calm, balanced presence.', craftsmanshipDetails: 'Demo craftsmanship notes for future verified product content.', stoneInformation: 'Black granite information to be confirmed for the selected piece.', customizationOptions: ['Size, posture, and finish can be discussed.'], images: ['Sculpture image placeholder', 'Craft detail placeholder'], availability: 'made-to-order', isCustom: true, pricingType: 'quote' },
  { id: 'temple-guardian', name: 'Temple Guardian', category: 'Temple Sculptures', deity: 'Guardian figure', stoneType: 'Granite', description: 'A demonstration temple-related form for architectural and devotional settings.', craftsmanshipDetails: 'Demo craftsmanship notes for future verified product content.', stoneInformation: 'Granite information to be confirmed for the selected piece.', customizationOptions: ['Scale and details can be discussed.'], images: ['Heritage image placeholder', 'Workshop image placeholder'], availability: 'made-to-order', isCustom: true, pricingType: 'contact' },
  { id: 'lotus-form', name: 'Lotus Form', category: 'Decorative Sculptures', deity: 'Not applicable', stoneType: 'Natural Stone', description: 'A demonstration study in line, weight, and natural stone character.', craftsmanshipDetails: 'Demo craftsmanship notes for future verified product content.', stoneInformation: 'Natural stone information to be confirmed for the selected piece.', customizationOptions: ['Form and scale can be discussed.'], images: ['Craft detail placeholder', 'Sculpture image placeholder'], availability: 'made-to-order', isCustom: true, pricingType: 'quote' },
  { id: 'meditative-figure', name: 'Meditative Figure', category: 'Custom Statues', deity: 'Custom subject', stoneType: 'Black Granite', description: 'A made-to-order demonstration figure developed from customer requirements.', craftsmanshipDetails: 'Demo craftsmanship notes for future verified product content.', stoneInformation: 'Black granite information to be confirmed for the selected piece.', customizationOptions: ['Reference, pose, scale, and finish can be discussed.'], images: ['Workshop image placeholder', 'Sculpture image placeholder'], availability: 'made-to-order', isCustom: true, pricingType: 'contact' },
  { id: 'entrance-panel', name: 'Carved Entrance Panel', category: 'Architectural Elements', deity: 'Not applicable', stoneType: 'Sandstone', description: 'A demonstration architectural detail intended to give an entrance a lasting rhythm.', craftsmanshipDetails: 'Demo craftsmanship notes for future verified product content.', stoneInformation: 'Sandstone information to be confirmed for the selected piece.', customizationOptions: ['Pattern, scale, and surface treatment can be discussed.'], images: ['Heritage image placeholder', 'Craft detail placeholder'], availability: 'made-to-order', isCustom: true, pricingType: 'quote' },
  { id: 'temple-pillar-study', name: 'Temple Pillar Study', category: 'Temple Sculptures', deity: 'Not applicable', stoneType: 'Granite', description: 'A demonstration pillar study for temple-related architectural requirements.', craftsmanshipDetails: 'Demo craftsmanship notes for future verified product content.', stoneInformation: 'Granite information to be confirmed for the selected piece.', customizationOptions: ['Profile, scale, and carving detail can be discussed.'], images: ['Heritage image placeholder', 'Workshop image placeholder'], availability: 'made-to-order', isCustom: true, pricingType: 'contact' },
  { id: 'deity-study', name: 'Deity Study', category: 'Deity Sculptures', deity: 'Custom deity', stoneType: 'Natural Stone', description: 'A demonstration study for a custom deity sculpture requirement.', craftsmanshipDetails: 'Demo craftsmanship notes for future verified product content.', stoneInformation: 'Natural stone information to be confirmed for the selected piece.', customizationOptions: ['Subject, posture, scale, and finish can be discussed.'], images: ['Sculpture image placeholder', 'Heritage image placeholder'], availability: 'made-to-order', isCustom: true, pricingType: 'quote' },
  { id: 'stone-bowl', name: 'Stone Bowl Form', category: 'Decorative Sculptures', deity: 'Not applicable', stoneType: 'Sandstone', description: 'A demonstration decorative form shaped for a quiet interior or garden setting.', craftsmanshipDetails: 'Demo craftsmanship notes for future verified product content.', stoneInformation: 'Sandstone information to be confirmed for the selected piece.', customizationOptions: ['Size and finish can be discussed.'], images: ['Craft detail placeholder', 'Workshop image placeholder'], availability: 'made-to-order', isCustom: true, pricingType: 'quote' },
  { id: 'memorial-form', name: 'Memorial Form', category: 'Custom Statues', deity: 'Custom subject', stoneType: 'Granite', description: 'A demonstration commemorative form created around a personal requirement.', craftsmanshipDetails: 'Demo craftsmanship notes for future verified product content.', stoneInformation: 'Granite information to be confirmed for the selected piece.', customizationOptions: ['Form, inscription, and finish can be discussed.'], images: ['Workshop image placeholder', 'Heritage image placeholder'], availability: 'made-to-order', isCustom: true, pricingType: 'contact' },
  { id: 'carved-threshold', name: 'Carved Threshold', category: 'Architectural Elements', deity: 'Not applicable', stoneType: 'Natural Stone', description: 'A demonstration threshold element for a traditional architectural setting.', craftsmanshipDetails: 'Demo craftsmanship notes for future verified product content.', stoneInformation: 'Natural stone information to be confirmed for the selected piece.', customizationOptions: ['Pattern, dimensions, and finish can be discussed.'], images: ['Craft detail placeholder', 'Heritage image placeholder'], availability: 'made-to-order', isCustom: true, pricingType: 'quote' },
]

async function seedProducts() {
  await connectDB()
  let inserted = 0
  let skipped = 0

  for (const product of sourceProducts) {
    const exists = await Product.exists({ slug: product.id })
    if (exists) {
      skipped += 1
      continue
    }
    await Product.create({ ...product, slug: product.id })
    inserted += 1
  }

  console.log(`Product seed complete: ${inserted} inserted, ${skipped} skipped`)
}

seedProducts()
  .catch((error) => {
    console.error(`Product seed failed: ${error.message}`)
    process.exitCode = 1
  })
  .finally(async () => {
    await mongoose.connection.close()
  })
