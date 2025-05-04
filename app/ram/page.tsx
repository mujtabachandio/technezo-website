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

  // Filter states
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

  const [openSections, setOpenSections] = useState({
    brands: true,
    ddrType: true,
    capacity: true,
    speed: false,
    stock: false,
  })

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const result: Ram[] = await client.fetch(allRamsQuery)
        setProducts(result)
        setFilteredProducts(result)

        setBrands(Array.from(new Set(result.map(p => p.brand))).sort())
        setDdrTypes(Array.from(new Set(result.map(p => p.type))).sort())
        setCapacityOptions(Array.from(new Set(result.map(p => p.capacity))).sort((a, b) => a - b))
        setSpeedOptions(Array.from(new Set(result.map(p => p.speed))).sort((a, b) => a - b))
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    let result = [...products]

    if (activeBrand) result = result.filter(p => p.brand === activeBrand)
    if (activeDdrType) result = result.filter(p => p.type === activeDdrType)
    if (activeCapacity) result = result.filter(p => p.capacity === activeCapacity)
    if (activeSpeed) result = result.filter(p => p.speed === activeSpeed)
    if (stockFilter !== null) result = result.filter(p => p.inStock === stockFilter)

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query)
      )
    }

    setFilteredProducts(result)
  }, [products, activeBrand, activeDdrType, activeCapacity, activeSpeed, stockFilter, searchQuery])

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const clearAllFilters = () => {
    setActiveBrand(null)
    setActiveDdrType(null)
    setActiveCapacity(null)
    setActiveSpeed(null)
    setStockFilter(null)
    setSearchQuery('')
  }

  const isFilterActive = activeBrand || activeDdrType || activeCapacity || activeSpeed || stockFilter !== null || searchQuery

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Memory <span className="text-red-600">Solutions</span></h1>
          <div className="relative w-full md:w-1/2 lg:w-1/3">
            <input
              type="text"
              placeholder="Search RAM modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 text-white py-2 pl-10 pr-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden flex items-center gap-2 bg-red-600 px-3 py-2 rounded-md"
          >
            <Sliders size={18} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-1/4 lg:w-1/5 bg-white p-5 rounded-xl shadow-md fixed md:static top-20 left-0 right-0 z-30 max-h-[80vh] overflow-y-auto`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Filters</h2>
            {isFilterActive && (
              <button onClick={clearAllFilters} className="text-sm text-red-600 hover:text-red-800 font-medium">
                Clear All
              </button>
            )}
          </div>

          {/* Dynamic Filter Sections */}
          {[
            { title: 'Brand', options: brands, value: activeBrand, setter: setActiveBrand, key: 'brands' },
            { title: 'DDR Type', options: ddrTypes, value: activeDdrType, setter: setActiveDdrType, key: 'ddrType' },
            { title: 'Capacity (GB)', options: capacityOptions, value: activeCapacity, setter: setActiveCapacity, key: 'capacity' },
            { title: 'Speed (MHz)', options: speedOptions, value: activeSpeed, setter: setActiveSpeed, key: 'speed' },
          ].map(({ title, options, value, setter, key }) => (
            <div key={key} className="mb-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection(key as keyof typeof openSections)}>
                <h3 className="font-semibold text-gray-800">{title}</h3>
                {openSections[key as keyof typeof openSections] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
              {openSections[key as keyof typeof openSections] && (
                <ul className="mt-2 space-y-1">
                  {options.map((option) => (
                    <li
                      key={option}
                      onClick={() => setter(value === option ? null : (option as any))}
                      className={`cursor-pointer text-sm p-1 rounded hover:bg-gray-100 ${
                      value === option ? 'font-bold text-red-600' : ''
                      }`}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Stock Filter */}
          <div className="mb-6">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('stock')}>
              <h3 className="font-semibold text-gray-800">Stock</h3>
              {openSections.stock ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
            {openSections.stock && (
              <div className="mt-2 space-y-1">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" checked={stockFilter === null} onChange={() => setStockFilter(null)} />
                  <span>All</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" checked={stockFilter === true} onChange={() => setStockFilter(true)} />
                  <span>In Stock</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" checked={stockFilter === false} onChange={() => setStockFilter(false)} />
                  <span>Out of Stock</span>
                </label>
              </div>
            )}
          </div>
        </aside>

        {/* Products Grid */}
        <main className="w-full md:w-3/4 lg:w-4/5">
          {loading ? (
            <p className="text-center text-gray-600">Loading RAM modules...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center text-gray-600">No RAM products match the selected filters.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link key={product._id} href={`/shop/ram/${product.slug.current}`}>
                  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col">
                    <div className="relative w-full h-40 mb-4">
                      {product.image && (
                        <Image
                          src={urlForImage(product.image).url()}
                          alt={""}
                          fill
                          className="object-contain"
                        />
                      )}
                    </div>
                    <h3 className="font-semibold text-lg text-gray-800">{product.title}</h3>
                    <p className="text-sm text-gray-500">{product.brand} - {product.type}</p>
                    <p className="text-sm text-gray-500">{product.capacity}GB / {product.speed}MHz</p>
                    <p className="text-red-600 font-bold mt-2">Rs {product.price?.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
