import { Link, useParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import ProductCard from '../components/ui/ProductCard'
import ProductImageGallery from '../components/ui/ProductImageGallery'
import SectionHeading from '../components/ui/SectionHeading'
import { getProductById, getRelatedProducts, WHATSAPP_NUMBER } from '../data/productData'

function ProductDetails() {
  const { id } = useParams()
  const product = getProductById(id)

  if (!product) return <ProductNotFound />

  const whatsappHref = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : ''
  const relatedProducts = getRelatedProducts(product)

  return (
    <main>
      <div className="ds-container py-8"><nav aria-label="Breadcrumb" className="text-sm text-charcoal-soft"><Link className="hover:text-brown" to="/">Home</Link><span className="px-2" aria-hidden="true">/</span><Link className="hover:text-brown" to="/products">Products</Link><span className="px-2" aria-hidden="true">/</span><span aria-current="page">{product.name}</span></nav></div>
      <section className="ds-container pb-16 sm:pb-24"><div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"><ProductImageGallery images={product.images} name={product.name} /><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">{product.category}</p><h1 className="mt-3 font-display text-4xl text-charcoal sm:text-6xl">{product.name}</h1><div className="mt-5 flex flex-wrap gap-2"><span className="rounded-full border border-sandstone-300 px-3 py-1 text-xs font-semibold text-brown">{product.stoneType}</span><span className="rounded-full border border-sandstone-300 px-3 py-1 text-xs font-semibold text-brown">{product.pricingType === 'custom' ? 'Custom enquiry' : 'Request a quote'}</span></div><p className="mt-6 text-base leading-7 text-charcoal-soft">{product.description}</p><dl className="mt-8 grid grid-cols-2 gap-x-5 gap-y-4 border-y border-sandstone-200 py-6 text-sm"><Detail label="Stone type" value={product.stoneType} /><Detail label="Dimensions" value={product.dimensions} /><Detail label="Weight" value={product.weight} /><Detail label="Crafting time" value={product.craftingTime} /><Detail label="Availability" value={product.availability} /><Detail label="Deity / subject" value={product.deity} /></dl><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button as={Link} to={`/custom-order?product=${product.id}`}>Request a Quote</Button>{whatsappHref ? <Button as="a" href={whatsappHref} rel="noreferrer" target="_blank" variant="secondary">Ask on WhatsApp</Button> : <Button aria-disabled="true" title="WhatsApp contact will be configured later" type="button" variant="secondary">Ask on WhatsApp</Button>}</div><Link className="mt-5 inline-block border-b border-gold pb-1 text-sm font-semibold text-brown" to={`/custom-order?product=${product.id}`}>Enquire About Customization →</Link></div></div></section>
      <section className="bg-sandstone-100"><div className="ds-container grid gap-6 py-16 sm:grid-cols-3 sm:py-20"><DetailBlock title="Description" text={product.description} /><DetailBlock title="Craftsmanship Details" text={product.craftsmanshipDetails} /><DetailBlock title="Stone Information" text={product.stoneInformation} /><DetailBlock title="Dimensions" text={product.dimensions} /><DetailBlock title="Customization Options" text={product.customizationOptions} /></div></section>
      {relatedProducts.length ? <section className="ds-container ds-section"><SectionHeading eyebrow="Continue exploring">Related Creations</SectionHeading><div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{relatedProducts.map((related) => <ProductCard key={related.id} {...related} image={related.images[0]} />)}</div></section> : null}
    </main>
  )
}

function Detail({ label, value }) { return <div><dt className="text-xs uppercase tracking-[0.1em] text-brown-light">{label}</dt><dd className="mt-1 text-charcoal">{value || 'To be discussed'}</dd></div> }
function DetailBlock({ text, title }) { return <div><h2 className="font-display text-2xl text-charcoal">{title}</h2><p className="mt-3 text-sm leading-6 text-charcoal-soft">{text || 'Details will be confirmed during enquiry.'}</p></div> }
function ProductNotFound() { return <main className="ds-container ds-section text-center"><p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Catalogue</p><h1 className="mt-4 font-display text-5xl text-charcoal">Creation not found</h1><p className="mx-auto mt-4 max-w-md text-charcoal-soft">This demonstration creation is not available. Return to the collection to continue exploring.</p><Button as={Link} className="mt-8" to="/products">View Our Sculptures</Button></main> }

export default ProductDetails