'use client'

import { useEffect, useState } from 'react'
import client from '@/sanity/lib/client'
import urlForImage from '@/sanity/lib/image'
import { Ram } from '@/types/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { allRamsQuery } from '@/lib/queries'
import { ChevronDown, ChevronUp, X, Search, Sliders } from 'lucide-react'

export default function RamPage() {
  const [products, setProducts] = useState<Ram[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Ram[]>([])
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Filter data
  const [brands, setBrands] = useState<string[]>([])
  const [ddrTypes, setDdrTypes] = useState<string[]>([])
  const [capacityOptions, setCapacityOptions] = useState<number[]>([])
  const [speedOptions, setSpeedOptions] = useState<number[]>([])

  // Active filters
  const [activeBrand, setActiveBrand] = useState<string | null>(null)
  const [activeDdrType, setActiveDdrType] = useState<string | null>(null)
  const [activeCapacity, setActiveCapacity] = useState<number | null>(null)
  const [activeSpeed, setActiveSpeed] = useState<number | null>(null)
  const [stockFilter, setStockFilter] = useState<boolean | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Accordion open state
  const [openSections, setOpenSections] = useState({
    brands: true,
    ddrType: true,
    capacity: true,
    speed: false,
    stock: false,
  })

  // Fetch products once
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      try {
        const result: Ram[] = await client.fetch(allRamsQuery)
        setProducts(result)
        setFilteredProducts(result)
        // build unique filter options
        setBrands([...new Set(result.map(p => p.brand))].sort())
        setDdrTypes([...new Set(result.map(p => p.type))].sort())
        setCapacityOptions([...new Set(result.map(p => p.capacity))].sort((a, b) => a - b))
        setSpeedOptions([...new Set(result.map(p => p.speed))].sort((a, b) => a - b))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])
  const toggleSection = (sec: keyof typeof openSections) =>
    setOpenSections(s => ({ ...s, [sec]: !s[sec] }))

  const clearAllFilters = () => {
    setActiveBrand(null)
    setActiveDdrType(null)
    setActiveCapacity(null)
    setActiveSpeed(null)
    setStockFilter(null)
    setSearchQuery('')
  }

  const isFilterActive =
    Boolean(activeBrand || activeDdrType || activeCapacity || activeSpeed || stockFilter !== null || searchQuery)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">
            Memory <span className="text-red-600">Solutions</span>
          </h1>
          <div className="relative w-full md:w-1/2 lg:w-1/3">
            <input
              type="text"
              placeholder="Search RAM modules..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 text-white py-2 pl-10 pr-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X size={16}/>
              </button>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(o => !o)}
            className="md:hidden flex items-center gap-2 bg-red-600 px-3 py-2 rounded-md"
          >
            <Sliders size={18}/> Filters
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className={`
          ${sidebarOpen? 'block':'hidden'} md:block
          w-full md:w-1/4 lg:w-1/5 bg-white p-5 rounded-xl shadow
          fixed md:static top-20 inset-x-0 z-30 max-h-[80vh] overflow-y-auto
        `}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Filters</h2>
            {isFilterActive && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-red-600 hover:underline"
              >
                Clear All
              </button>
            )}
          </div>

          {/* dynamic filters */}
          {(
            [
              { title: 'Brand', options: brands,   value: activeBrand,   setter: setActiveBrand,   key: 'brands' },
              { title: 'DDR Type', options: ddrTypes, value: activeDdrType, setter: setActiveDdrType, key: 'ddrType' },
              { title: 'Capacity', options: capacityOptions, value: activeCapacity, setter: setActiveCapacity, key: 'capacity' },
              { title: 'Speed', options: speedOptions,     value: activeSpeed,    setter: setActiveSpeed,    key: 'speed' },
            ] as const
          ).map(({ title, options, value, setter, key }) => (
            <div key={key} className="mb-6">
              <button
                onClick={() => toggleSection(key)}
                className="w-full flex justify-between items-center font-semibold mb-2"
              >
                {title}
                {openSections[key] ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
              </button>
              {openSections[key] && (
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => setter(null)}
                      className={`w-full text-left py-1 px-3 rounded ${value === null ? 'bg-red-600 text-white' : 'hover:bg-gray-100'}`}
                    >
                      All {title}
                    </button>
                  </li>
                  {options.map(opt => (
                    <li key={opt}>
                      <button
                        onClick={() => setter(value === opt ? null : (opt as any))}
                        className={`w-full text-left py-1 px-3 rounded ${
                          value === opt ? 'bg-red-600 text-white' : 'hover:bg-gray-100'
                        }`}
                      >
                        {opt}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Stock */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('stock')}
              className="w-full flex justify-between items-center font-semibold mb-2"
            >
              Availability
              {openSections.stock ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
            </button>
            {openSections.stock && (
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setStockFilter(null)}
                    className={`w-full text-left py-1 px-3 rounded ${stockFilter === null ? 'bg-red-600 text-white' : 'hover:bg-gray-100'}`}
                  >
                    All Items
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setStockFilter(true)}
                    className={`w-full text-left py-1 px-3 rounded ${stockFilter === true ? 'bg-red-600 text-white' : 'hover:bg-gray-100'}`}
                  >
                    In Stock
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setStockFilter(false)}
                    className={`w-full text-left py-1 px-3 rounded ${stockFilter === false ? 'bg-red-600 text-white' : 'hover:bg-gray-100'}`}
                  >
                    Out of Stock
                  </button>
                </li>
              </ul>
            )}
          </div>
        </aside>

        {/* Product grid */}
        <main className="w-full md:w-3/4 lg:w-4/5">
          {loading ? (
            <div className="text-center text-gray-600">Loading…</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center text-gray-600">No products found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map(p => (
                <Link key={p._id} href={`/ram/${p.slug.current}`} className="group bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col">
                  <div className="relative w-full h-40 mb-4">
                    {p.image ? (
                      <Image
                        src={urlForImage(p.image).url()}
                        alt={''}
                        layout="fill"
                        objectFit="contain"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800">{p.title}</h3>
                  <p className="text-sm text-gray-500">{p.brand} • {p.capacity}GB • {p.speed}MHz</p>
                  <p className="mt-auto text-red-600 font-bold text-lg">Rs {p.price.toLocaleString()}</p>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
