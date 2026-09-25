import api from './api'

const fallbackImageTones = ['brown', 'charcoal', 'sandstone', 'gold']

function normalizeImage(reference, index, productName) {
  if (reference && typeof reference === 'object' && reference.alt && reference.label && reference.tone) return reference

  const label = typeof reference === 'string' && reference.trim() ? reference : 'Product image placeholder'
  return {
    alt: `${productName} image placeholder`,
    label: `${label} / replace with selected product image`,
    tone: fallbackImageTones[index % fallbackImageTones.length],
  }
}

export function normalizeProduct(product) {
  const productName = product.name || 'Untitled creation'
  const rawImages = Array.isArray(product.images) ? product.images : []
  const images = rawImages.map((image, index) => normalizeImage(image, index, productName))

  return {
    ...product,
    id: product.slug || product._id,
    images: images.length ? images : [normalizeImage(null, 0, productName)],
    isCustom: Boolean(product.isCustom),
    pricingType: product.pricingType || 'quote',
  }
}

function normalizeApiError(error) {
  const status = error.response?.status
  if (!error.response) return { category: 'NETWORK_ERROR', message: 'Unable to reach the product catalogue.' }
  if (status === 404) return { category: 'NOT_FOUND', message: 'Creation not found.' }
  if (status >= 500) return { category: 'SERVER_ERROR', message: 'The product catalogue is temporarily unavailable.' }
  return { category: 'UNKNOWN_ERROR', message: 'Unable to load the product catalogue.' }
}

export async function getProducts(params = {}, signal) {
  try {
    const response = await api.get('/products', { params, signal })
    const products = Array.isArray(response.data?.data) ? response.data.data.map(normalizeProduct) : []
    return { count: response.data?.count ?? products.length, products }
  } catch (error) {
    throw normalizeApiError(error)
  }
}

export async function getProductById(id, signal) {
  try {
    const response = await api.get(`/products/${encodeURIComponent(id)}`, { signal })
    if (!response.data?.data) {
      const notFoundError = new Error('Product not found')
      notFoundError.response = { status: 404 }
      throw notFoundError
    }
    return normalizeProduct(response.data.data)
  } catch (error) {
    throw error.category ? error : normalizeApiError(error)
  }
}
