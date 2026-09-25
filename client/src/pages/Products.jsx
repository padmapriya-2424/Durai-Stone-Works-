import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import ProductCard from '../components/ui/ProductCard'
import SectionHeading from '../components/ui/SectionHeading'
import { getProducts } from '../services/productService'

const initialFilters = { category: 'All', deity: 'All', stoneType: 'All', size: 'All', availability: 'All', customMode: 'All', search: '', sort: 'Featured' }

function Products() {
  const [filters, setFilters] = useState(initialFilters)
  const [products, setProducts] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const requestId = useRef(0)

  const filterOptions = useMemo(() => ({
    categories: [...new Set(products.map((product) => product.category).filter(Boolean))],
    deities: [...new Set(products.map((product) => product.deity).filter(Boolean))],
    stoneTypes: [...new Set(products.map((product) => product.stoneType).filter(Boolean))],
  }), [products])

  const queryParams = useMemo(() => {
    const params = {}
    if (filters.search.trim()) params.search = filters.search.trim()
    if (filters.category !== 'All') params.category = filters.category
    if (filters.deity !== 'All') params.deity = filters.deity
    if (filters.stoneType !== 'All') params.stoneType = filters.stoneType
    if (filters.availability !== 'All') params.availability = filters.availability === 'Made to order' ? 'made-to-order' : 'available'
    if (filters.customMode !== 'All') params.isCustom = filters.customMode === 'Custom'
    return params
  }, [filters])

  useEffect(() => {
    const controller = new AbortController()
    const currentRequest = ++requestId.current
    const delay = filters.search ? 400 : 0
    const timer = window.setTimeout(async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await getProducts(queryParams, controller.signal)
        if (currentRequest !== requestId.current) return
        setProducts(result.products)
        setTotalCount(result.count)
      } catch (requestError) {
        if (requestError.name === 'CanceledError' || requestError.code === 'ERR_CANCELED' || controller.signal.aborted) return
        if (currentRequest === requestId.current) setError(requestError)
      } finally {
        if (currentRequest === requestId.current) setLoading(false)
      }
    }, delay)

    return () => {
      window.clearTimeout(timer)
      controller.abort()
    }
  }, [queryParams, filters.search])

  const visibleProducts = useMemo(() => [...products].sort((first, second) => filters.sort === 'Name A-Z' ? first.name.localeCompare(second.name) : filters.sort === 'Name Z-A' ? second.name.localeCompare(first.name) : 0), [filters.sort, products])

  function updateFilter(name, value) {
    setFilters((current) => ({ ...current, [name]: value }))
  }

  function clearFilters() {
    setFilters(initialFilters)
  }

  return (
    <main>
      <section className="border-b border-sandstone-200 bg-ivory"><div className="ds-container py-12 sm:py-16"><nav aria-label="Breadcrumb" className="mb-8 text-sm text-charcoal-soft"><Link className="hover:text-brown" to="/">Home</Link><span className="px-2" aria-hidden="true">/</span><span aria-current="page">Products</span></nav><SectionHeading eyebrow="The collection" description="Explore our collection of handcrafted stone sculptures, temple carvings, architectural elements and custom creations.">Our Sculptures</SectionHeading></div></section>
      <section className="ds-container ds-section" aria-labelledby="catalogue-heading">
        <h2 className="sr-only" id="catalogue-heading">Sculpture catalogue filters</h2>
        <div className="ds-card space-y-5 p-5 sm:p-6">
          <div><label className="ds-label" htmlFor="product-search">Search sculptures</label><input className="ds-input" id="product-search" placeholder="Search sculptures, statues, temple carvings..." type="search" value={filters.search} onChange={(event) => updateFilter('search', event.target.value)} /></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FilterSelect label="Category" name="category" options={filterOptions.categories} value={filters.category} onChange={updateFilter} />
            <FilterSelect label="Deity" name="deity" options={filterOptions.deities} value={filters.deity} onChange={updateFilter} />
            <FilterSelect label="Stone type" name="stoneType" options={filterOptions.stoneTypes} value={filters.stoneType} onChange={updateFilter} />
            <FilterSelect label="Size" name="size" options={['Small', 'Medium', 'Large']} value={filters.size} onChange={updateFilter} />
            <FilterSelect label="Availability" name="availability" options={['Made to order', 'Ready-made']} value={filters.availability} onChange={updateFilter} />
            <FilterSelect label="Creation type" name="customMode" options={['Custom', 'Ready-made']} value={filters.customMode} onChange={updateFilter} />
            <FilterSelect label="Sort" name="sort" options={['Name A-Z', 'Name Z-A']} value={filters.sort} onChange={updateFilter} />
            <div className="flex items-end"><Button className="w-full" type="button" variant="tertiary" onClick={clearFilters}>Clear Filters</Button></div>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3"><p aria-live="polite" className="text-sm text-charcoal-soft">{loading ? 'Loading our collection...' : `Showing ${visibleProducts.length} of ${totalCount} creations`}</p><p className="text-xs uppercase tracking-[0.12em] text-brown-light">Quote-led collection</p></div>
        {error ? <div aria-live="assertive" className="ds-card mt-6 p-10 text-center"><h2 className="font-display text-3xl text-charcoal">Unable to load our collection right now.</h2><p className="mt-3 text-charcoal-soft">Please check your connection and try again.</p><Button className="mt-6" type="button" onClick={() => setFilters((current) => ({ ...current }))}>Retry</Button></div> : loading ? <LoadingGrid /> : visibleProducts.length ? <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{visibleProducts.map((product) => <ProductCard key={product.id} {...product} image={product.images[0]} />)}</div> : <div className="ds-card mt-6 p-10 text-center"><h2 className="font-display text-3xl text-charcoal">No creations match your current filters.</h2><p className="mt-3 text-charcoal-soft">Try adjusting your search or filters.</p><Button className="mt-6" type="button" onClick={clearFilters}>Clear Filters</Button></div>}
      </section>
    </main>
  )
}

function FilterSelect({ label, name, options, value, onChange }) {
  return <div><label className="ds-label" htmlFor={`filter-${name}`}>{label}</label><select className="ds-input" id={`filter-${name}`} value={value} onChange={(event) => onChange(name, event.target.value)}><option>All</option>{options.map((option) => <option key={option}>{option}</option>)}</select></div>
}

function LoadingGrid() {
  return <div aria-label="Loading products" className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="status">{[1, 2, 3, 4, 5, 6].map((item) => <div className="ds-card h-96 animate-pulse bg-sandstone-100" key={item} />)}</div>
}

export default Products
