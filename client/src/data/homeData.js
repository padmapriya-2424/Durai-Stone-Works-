export const imagePlaceholders = {
  hero: {
    alt: 'Traditional stone sculpture placeholder inspired by Mahabalipuram craftsmanship',
    label: 'Hero sculpture / replace with selected heritage image',
    tone: 'charcoal',
  },
  introduction: {
    alt: 'Stone carving workshop placeholder',
    label: 'Workshop image / replace with selected workshop image',
    tone: 'brown',
  },
  introductionDetail: {
    alt: 'Close detail of carved stone placeholder',
    label: 'Craft detail / replace with selected detail image',
    tone: 'sandstone',
  },
  introductionFigure: {
    alt: 'Sculptural stone form placeholder',
    label: 'Sculpture image / replace with selected sculpture image',
    tone: 'gold',
  },
  heritage: {
    alt: 'Mahabalipuram temple stonework placeholder',
    label: 'Heritage image / replace with selected temple image',
    tone: 'brown',
  },
}

export const services = [
  { description: 'Hand-shaped figures and forms made for homes, spaces, and collections.', image: imagePlaceholders.introductionFigure, title: 'Stone Sculptures' },
  { description: 'Sculptural elements for sacred spaces, guided by proportion and purpose.', image: imagePlaceholders.heritage, title: 'Temple Art' },
  { description: 'A considered process for bringing your own reference, idea, or sketch to stone.', image: imagePlaceholders.introduction, title: 'Custom Statues' },
  { description: 'Carved columns, panels, thresholds, and details for architectural settings.', image: imagePlaceholders.introductionDetail, title: 'Architectural Stonework' },
  { description: 'Enduring stone markers shaped with clarity, dignity, and care.', image: imagePlaceholders.heritage, title: 'Monuments' },
  { description: 'Respectful restoration and hand carving for stonework that deserves another life.', image: imagePlaceholders.introductionDetail, title: 'Restoration & Carving' },
]

export const featuredCreations = [
  { category: 'Deity sculptures', description: 'A custom devotional form with a calm, balanced presence.', image: imagePlaceholders.introductionFigure, isCustom: true, name: 'Seated Ganesha', stoneType: 'Black granite' },
  { category: 'Temple sculptures', description: 'Architectural sculpture shaped for a considered sacred setting.', image: imagePlaceholders.heritage, isCustom: true, name: 'Temple Guardian', stoneType: 'Granite' },
  { category: 'Decorative sculptures', description: 'A tactile study in line, weight, and natural stone character.', image: imagePlaceholders.introductionDetail, isCustom: true, name: 'Lotus Form', stoneType: 'Soapstone' },
  { category: 'Custom statues', description: 'A made-to-order figure developed from your requirements.', image: imagePlaceholders.introduction, isCustom: true, name: 'Meditative Figure', stoneType: 'Black granite' },
  { category: 'Architectural elements', description: 'Carved stone detail intended to give a space a lasting rhythm.', image: imagePlaceholders.heritage, isCustom: true, name: 'Carved Entrance Panel', stoneType: 'Granite' },
]

export const trustPoints = [
  'Traditional craftsmanship',
  'Experienced artisans',
  'Custom-made creations',
  'Quality stone selection',
  'Attention to detail',
  'Direct artisan craftsmanship',
]

export const demoTestimonials = [
  { customer: 'Sample Customer', location: 'Chennai, Tamil Nadu', project: 'Custom Sculpture', rating: '★★★★★', text: 'Placeholder testimonial content — replace with verified customer feedback.' },
  { customer: 'Sample Customer', location: 'Bengaluru, Karnataka', project: 'Architectural Stonework', rating: '★★★★★', text: 'Sample testimonial — replace with verified customer feedback.' },
  { customer: 'Sample Customer', location: 'Singapore', project: 'Deity Sculpture', rating: '★★★★★', text: 'Demo testimonial content for the Home page preview only.' },
]