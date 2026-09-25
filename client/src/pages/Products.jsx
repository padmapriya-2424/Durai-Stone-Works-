import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import ProductCard from '../components/ui/ProductCard'
import SectionHeading from '../components/ui/SectionHeading'
import { demoProducts, productCategories, productDeities, productStoneTypes } from '../data/productData'

const initialFilters = { category: 'All', deity: 'All', stoneType: 'All', size: 'All', availability: 'All', customMode: 'All', search: '', sort: 'Featured' }

function Products() {
  const [filters, setFilters] = useState(initialFilters)

  const visibleProducts = useMemo(() => {
    const search = filters.search.trim().toLowerCase()
    const filtered = demoProducts.filter((product) => {
      const searchable = [product.name, product.category, product.stoneType, product.deity, product.description].join(' ').toLowerCase()
      return (!search || searchable.includes(search)) && (filters.category === 'All' || product.category === filters.category) && (filters.deity === 'All' || product.deity === filters.deity) && (filters.stoneType === 'All' || product.stoneType === filters.stoneType) && (filters.size === 'All' || product.size === filters.size) && (filters.availability === 'All' || product.availability === filters.availability) && (filters.customMode === 'All' || (filters.customMode === 'Custom' ? product.isCustom : !product.isCustom))
    })
    return [...filtered].sort((first, second) => filters.sort === 'Name A-Z' ? first.name.localeCompare(second.name) : filters.sort === 'Name Z-A' ? second.name.localeCompare(first.name) : demoProducts.indexOf(first) - demoProducts.indexOf(second))
  }, [filters])

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
            <FilterSelect label="Category" name="category" options={productCategories} value={filters.category} onChange={updateFilter} />
            <FilterSelect label="Deity" name="deity" options={productDeities} value={filters.deity} onChange={updateFilter} />
            <FilterSelect label="Stone type" name="stoneType" options={productStoneTypes} value={filters.stoneType} onChange={updateFilter} />
            <FilterSelect label="Size" name="size" options={['Small', 'Medium', 'Large']} value={filters.size} onChange={updateFilter} />
            <FilterSelect label="Availability" name="availability" options={['Made to order', 'Ready-made']} value={filters.availability} onChange={updateFilter} />
            <FilterSelect label="Creation type" name="customMode" options={['Custom', 'Ready-made']} value={filters.customMode} onChange={updateFilter} />
            <FilterSelect label="Sort" name="sort" options={['Name A-Z', 'Name Z-A']} value={filters.sort} onChange={updateFilter} />
            <div className="flex items-end"><Button className="w-full" type="button" variant="tertiary" onClick={clearFilters}>Clear Filters</Button></div>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3"><p className="text-sm text-charcoal-soft" aria-live="polite">Showing {visibleProducts.length} of {demoProducts.length} demo creations</p><p className="text-xs uppercase tracking-[0.12em] text-brown-light">Quote-led collection</p></div>
        {visibleProducts.length ? <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{visibleProducts.map((product) => <ProductCard key={product.id} {...product} image={product.images[0]} />)}</div> : <div className="ds-card mt-6 p-10 text-center"><h2 className="font-display text-3xl text-charcoal">No creations found</h2><p className="mt-3 text-charcoal-soft">Try adjusting your search or filters.</p><Button className="mt-6" type="button" onClick={clearFilters}>Clear Filters</Button></div>}
      </section>
    </main>
  )
}

function FilterSelect({ label, name, options, value, onChange }) {
  return <div><label className="ds-label" htmlFor={`filter-${name}`}>{label}</label><select className="ds-input" id={`filter-${name}`} value={value} onChange={(event) => onChange(name, event.target.value)}><option>All</option>{options.map((option) => <option key={option}>{option}</option>)}</select></div>
}

export default Products