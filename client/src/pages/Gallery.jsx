import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import GalleryLightbox from '../components/ui/GalleryLightbox'
import PlaceholderImage from '../components/ui/PlaceholderImage'
import SectionHeading from '../components/ui/SectionHeading'
import { galleryFilters, galleryItems } from '../data/galleryData'
import { imagePlaceholders } from '../data/homeData'

function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedItem, setSelectedItem] = useState(null)
  const visibleItems = activeFilter === 'All' ? galleryItems : galleryItems.filter((item) => item.category === activeFilter)

  return (
    <main>
      <section className="bg-charcoal text-ivory" aria-labelledby="gallery-heading"><div className="ds-container grid items-center gap-10 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:py-24"><div><p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-gold-soft">Gallery / selected studies</p><h1 className="font-display text-5xl leading-tight sm:text-7xl" id="gallery-heading">Work Carved by Hand</h1><p className="mt-6 max-w-xl text-base leading-7 text-sandstone-200">A visual collection of traditional stone sculpture, temple work, carving process, and completed projects.</p></div><PlaceholderImage className="min-h-[22rem] rounded-none sm:min-h-[30rem]" image={imagePlaceholders.hero} labelPosition="center" /></div></section>
      <section className="ds-container ds-section" aria-labelledby="gallery-grid-heading"><div className="flex flex-col gap-6"><SectionHeading eyebrow="Explore the work">Gallery Studies</SectionHeading><div aria-label="Gallery filters" className="flex gap-2 overflow-x-auto pb-2" role="group">{galleryFilters.map((filter) => <button aria-pressed={activeFilter === filter} className={`min-h-11 shrink-0 rounded-stone border px-4 text-sm font-semibold transition-colors ${activeFilter === filter ? 'border-brown bg-brown text-ivory' : 'border-sandstone-300 bg-ivory text-charcoal-soft hover:border-brown hover:text-brown'}`} key={filter} type="button" onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div></div><div className="mt-10 grid auto-rows-[10rem] gap-4 sm:grid-cols-2 sm:auto-rows-[14rem] lg:grid-cols-3 lg:auto-rows-[16rem]">{visibleItems.map((item, index) => <button aria-label={`View ${item.title}`} className={`group relative text-left ${index % 5 === 0 ? 'sm:row-span-2' : ''} ${index % 4 === 0 ? 'lg:row-span-2' : ''}`} key={item.id} type="button" onClick={() => setSelectedItem(item)}><PlaceholderImage className="h-full min-h-0 rounded-stone transition-transform duration-300 group-hover:scale-[1.02]" image={item.image} labelPosition="center" /><span className="absolute inset-x-3 bottom-3 rounded-sm bg-charcoal/80 px-3 py-2 text-left text-xs font-semibold text-ivory backdrop-blur-sm">{item.title}<span className="mt-1 block font-normal text-sandstone-200">{item.category}</span></span></button>)}</div>{visibleItems.length === 0 ? <p className="mt-10 text-charcoal-soft">No gallery studies are available for this filter yet.</p> : null}</section>
      <section className="bg-brown text-ivory"><div className="ds-container flex flex-col gap-8 py-16 sm:py-20 lg:flex-row lg:items-end lg:justify-between"><div><p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-gold-soft">Begin a conversation</p><h2 className="font-display text-4xl sm:text-5xl">Have a project in mind?</h2></div><div className="flex flex-col gap-3 sm:flex-row"><Button as={Link} to="/custom-order">Request a Custom Order</Button><Button as={Link} to="/contact" variant="secondary">Contact Us</Button></div></div></section>
      <GalleryLightbox item={selectedItem} onClose={() => setSelectedItem(null)} />
    </main>
  )
}

export default Gallery