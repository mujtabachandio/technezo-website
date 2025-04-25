//laptop acc page fetching from sanity 
'use client';

import { useEffect, useState, ChangeEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import  client  from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const builder = imageUrlBuilder(client);

const urlFor = (src: SanityImageSource): string =>
  builder.image(src).width(300).height(200).url();


//
// ─── TYPES ─────────────────────────────────────────────────────────────
//

interface LaptopSlug {
  current: string;
}

interface LaptopImage {
  [key: string]: unknown;
}


interface Laptop {
  _id: string;
  title: string;
  price: number;
  images: LaptopImage[];
  slug: LaptopSlug;
  condition: string;
  featured: boolean;
  isGaming: boolean;
  ram: string;
  brand: string;
  gpu: string;
  available: boolean;
}

type FilterCriteria = {
  brands: string[];
  rams: string[];
  graphics: string[];
  conditions: string[];
  minPrice: number | null;
  maxPrice: number | null;
  inStockOnly: boolean;
  featured: boolean;
};

const initialFilters: FilterCriteria = {
  brands: [],
  rams: [],
  graphics: [],
  conditions: [],
  minPrice: null,
  maxPrice: null,
  inStockOnly: false,
  featured: false,
};

//
// ─── ANIMATION VARIANTS ─────────────────────────────────────────────────────────
//

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    y: -10,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

//
// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────
//

export default function ShopPage() {
  const [allProducts, setAllProducts] = useState<Laptop[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Laptop[]>([]);
  const [filters, setFilters] = useState<FilterCriteria>(initialFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Fetch all products from Sanity on component mount.
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const data = await client.fetch(`*[_type == "laptop"]`);
        setAllProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // Apply filters every time either filters or product list changes.
  useEffect(() => {
    let result = allProducts;

    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }
    if (filters.rams.length > 0) {
      result = result.filter((p) => filters.rams.includes(p.ram));
    }
    if (filters.graphics.length > 0) {
      result = result.filter((p) => filters.graphics.includes(p.gpu));
    }
    if (filters.conditions.length > 0) {
      result = result.filter((p) => filters.conditions.includes(p.condition));
    }
    if (filters.minPrice !== null) {
      result = result.filter((p) => filters.minPrice !== null && p.price >= filters.minPrice);
    }
    if (filters.maxPrice !== null) {
      result = result.filter((p) => filters.maxPrice !== null && p.price <= filters.maxPrice);
    }
    if (filters.inStockOnly) {
      result = result.filter((p) => p.available === true);
    }
    if (filters.featured) {
      result = result.filter((p) => p.featured === true);
    }

    setFilteredProducts(result);
  }, [filters, allProducts]);

  // Generate available filter options.
  const availableBrands = Array.from(new Set(allProducts.map((p) => p.brand))).filter(Boolean);
  const availableRAMs = Array.from(new Set(allProducts.map((p) => p.ram))).filter(Boolean);
  const availableGraphics = Array.from(new Set(allProducts.map((p) => p.gpu))).filter(Boolean);
  const availableConditions = Array.from(new Set(allProducts.map((p) => p.condition))).filter(Boolean);

  // Handler functions for the filters.
  const handleCheckboxChange = (
    field: 'brands' | 'rams' | 'graphics' | 'conditions',
    value: string
  ) => {
    let updated = [...filters[field]];
    if (updated.includes(value)) {
      updated = updated.filter((item) => item !== value);
    } else {
      updated.push(value);
    }
    setFilters({ ...filters, [field]: updated });
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value === '' ? null : Number(value);
    setFilters({ ...filters, [name]: numericValue });
  };

  const handleQuickToggle = (field: 'inStockOnly' | 'featured') => {
    setFilters({ ...filters, [field]: !filters[field] });
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
  };

  const toggleMobileFilters = () => {
    setIsMobileFiltersOpen(!isMobileFiltersOpen);
  };

  return (
    
    <div className="min-h-screen bg-gray-50">
     <Navbar />
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="flex bg-gradient-to-r from-red-600 to-red-800 shadow-xl sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between h-16 items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Technezo - Laptops</h1>
            </div>
            <button 
              onClick={toggleMobileFilters}
              className="md:hidden flex items-center text-white"
            >
              <span className="mr-2">Filters</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main layout: Sidebar and Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* Mobile Filters Overlay */}
        <motion.div 
          className={`fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden ${isMobileFiltersOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isMobileFiltersOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          onClick={toggleMobileFilters}
        />

        {/* Mobile Filters Sidebar */}
        <motion.aside 
          className={`fixed right-0 top-0 h-full w-4/5 max-w-xs bg-white z-50 md:hidden overflow-y-auto ${isMobileFiltersOpen ? 'block' : 'hidden'}`}
          initial={{ x: "100%" }}
          animate={{ x: isMobileFiltersOpen ? 0 : "100%" }}
          transition={{ type: "spring", damping: 25 }}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Filters</h2>
              <button onClick={toggleMobileFilters} className="text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Mobile filters content - same as desktop but in mobile drawer */}
            {/* Brand Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-lg text-gray-700 mb-2">Brand</h3>
              <div className="space-y-2">
                {availableBrands.map((brand) => (
                  <label key={brand} className="flex items-center">
                    <input
                      type="checkbox"
                      value={brand}
                      checked={filters.brands.includes(brand)}
                      onChange={() => handleCheckboxChange('brands', brand)}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* RAM Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-lg text-gray-700 mb-2">RAM</h3>
              <div className="space-y-2">
                {availableRAMs.map((ram) => (
                  <label key={ram} className="flex items-center">
                    <input
                      type="checkbox"
                      value={ram}
                      checked={filters.rams.includes(ram)}
                      onChange={() => handleCheckboxChange('rams', ram)}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{ram}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Graphics Card Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-lg text-gray-700 mb-2">Graphics Card</h3>
              <div className="space-y-2">
                {availableGraphics.map((gpu) => (
                  <label key={gpu} className="flex items-center">
                    <input
                      type="checkbox"
                      value={gpu}
                      checked={filters.graphics.includes(gpu)}
                      onChange={() => handleCheckboxChange('graphics', gpu)}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{gpu}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Condition Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-lg text-gray-700 mb-2">Condition</h3>
              <div className="space-y-2">
                {availableConditions.map((cond) => (
                  <label key={cond} className="flex items-center">
                    <input
                      type="checkbox"
                      value={cond}
                      checked={filters.conditions.includes(cond)}
                      onChange={() => handleCheckboxChange('conditions', cond)}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{cond}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium text-lg text-gray-700 mb-2">Price Range</h3>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-xs text-gray-500 mb-1">Min (Rs.)</label>
                  <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice ?? ''}
                    onChange={handlePriceChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500"
                    placeholder="0"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-xs text-gray-500 mb-1">Max (Rs.)</label>
                  <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice ?? ''}
                    onChange={handlePriceChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500"
                    placeholder="5000"
                  />
                </div>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="mb-6">
              <h3 className="font-medium text-lg text-gray-700 mb-2">Quick Filters</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.inStockOnly}
                    onChange={() => handleQuickToggle('inStockOnly')}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">In Stock Only</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.featured}
                    onChange={() => handleQuickToggle('featured')}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Featured Products</span>
                </label>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClearFilters}
              className="w-full py-2 mt-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300"
            >
              Clear All Filters
            </motion.button>
          </div>
        </motion.aside>

        {/* Desktop Sidebar */}
        <motion.aside 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:block w-full md:w-1/4 p-6 border border-gray-200 bg-white rounded-lg shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Filters</h2>
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              onClick={handleClearFilters} 
              className="text-sm text-red-600 hover:text-red-800"
            >
              Clear All
            </motion.button>
          </div>

          {/* Brand Filter */}
          <div className="mb-6">
            <h3 className="font-medium text-lg text-gray-800 mb-2 border-b border-gray-200 pb-2">Brand</h3>
            <div className="space-y-2 mt-3">
              {availableBrands.map((brand) => (
                <label key={brand} className="flex items-center">
                  <input
                    type="checkbox"
                    value={brand}
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleCheckboxChange('brands', brand)}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* RAM Filter */}
          <div className="mb-6">
            <h3 className="font-medium text-lg text-gray-800 mb-2 border-b border-gray-200 pb-2">RAM</h3>
            <div className="space-y-2 mt-3">
              {availableRAMs.map((ram) => (
                <label key={ram} className="flex items-center">
                  <input
                    type="checkbox"
                    value={ram}
                    checked={filters.rams.includes(ram)}
                    onChange={() => handleCheckboxChange('rams', ram)}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{ram}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Graphics Card Filter */}
          <div className="mb-6">
            <h3 className="font-medium text-lg text-gray-800 mb-2 border-b border-gray-200 pb-2">Graphics Card</h3>
            <div className="space-y-2 mt-3">
              {availableGraphics.map((gpu) => (
                <label key={gpu} className="flex items-center">
                  <input
                    type="checkbox"
                    value={gpu}
                    checked={filters.graphics.includes(gpu)}
                    onChange={() => handleCheckboxChange('graphics', gpu)}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{gpu}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Condition Filter */}
          <div className="mb-6">
            <h3 className="font-medium text-lg text-gray-800 mb-2 border-b border-gray-200 pb-2">Condition</h3>
            <div className="space-y-2 mt-3">
              {availableConditions.map((cond) => (
                <label key={cond} className="flex items-center">
                  <input
                    type="checkbox"
                    value={cond}
                    checked={filters.conditions.includes(cond)}
                    onChange={() => handleCheckboxChange('conditions', cond)}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{cond}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="font-medium text-lg text-gray-800 mb-2 border-b border-gray-200 pb-2">Price Range</h3>
            <div className="flex space-x-4 mt-3">
              <div className="w-1/2">
                <label className="block text-xs text-gray-500 mb-1">Min ($)</label>
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice ?? ''}
                  onChange={handlePriceChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 transition-all duration-300"
                  placeholder="0"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-xs text-gray-500 mb-1">Max ($)</label>
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice ?? ''}
                  onChange={handlePriceChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 transition-all duration-300"
                  placeholder="5000"
                />
              </div>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="mb-6">
            <h3 className="font-medium text-lg text-gray-800 mb-2 border-b border-gray-200 pb-2">Quick Filters</h3>
            <div className="space-y-2 mt-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={() => handleQuickToggle('inStockOnly')}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="ml-2 text-sm text-gray-700">In Stock Only</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.featured}
                  onChange={() => handleQuickToggle('featured')}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="ml-2 text-sm text-gray-700">Featured Products</span>
              </label>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClearFilters}
            className="w-full py-2 mt-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-300 font-medium"
          >
            Reset All Filters
          </motion.button>
        </motion.aside>

        {/* Product Listing */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="w-full md:w-3/4"
        >
          {isLoading ? (
            <motion.div 
              className="flex justify-center items-center h-64"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <div className="rounded-full h-16 w-16 border-t-4 border-red-600 border-solid"></div>
            </motion.div>
          ) : filteredProducts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center py-20 bg-white rounded-lg shadow-sm border border-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500 mt-4 text-lg">No products match the selected filters.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearFilters}
                className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-300"
              >
                Clear all filters
              </motion.button>
            </motion.div>
          ) : (
            <>
              <div className="mb-6 bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
                <p className="text-gray-700">
                  Showing <span className="font-semibold">{filteredProducts.length}</span> products
                </p>
                <p className="text-sm text-gray-500">
                  {filters.brands.length > 0 || 
                   filters.rams.length > 0 || 
                   filters.graphics.length > 0 || 
                   filters.conditions.length > 0 || 
                   filters.minPrice !== null || 
                   filters.maxPrice !== null || 
                   filters.inStockOnly || 
                   filters.featured ? (
                    <button 
                      onClick={handleClearFilters}
                      className="text-red-600 hover:underline"
                    >
                      Clear filters
                    </button>
                  ) : (
                    'No filters applied'
                  )}
                </p>
              </div>
              
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product._id}
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <Link
                      href={`/shop/${product.slug.current}`}
                      className="block h-full"
                    >
                      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100">
                        <div className="relative h-48 bg-gray-50 flex items-center justify-center p-4">
                          {product.images[0] ? (
                            <Image
                              src={urlFor(product.images[0])}
                              alt={product.title}
                              width={300}
                              height={200}
                              className="object-contain rounded h-full w-auto"
                            />
                          ) : (
                            <div className="text-gray-400">No image available</div>
                          )}
                          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                            {product.featured && (
                              <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-md shadow-sm">
                                Featured
                              </span>
                            )}
                            {product.isGaming && (
                              <span className="bg-black text-white text-xs px-2 py-1 rounded-md shadow-sm">
                                Gaming
                              </span>
                            )}
                            {!product.available && (
                              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-md shadow-sm">
                                Out of Stock
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                          <div className="mb-3 flex items-center flex-wrap gap-2">
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
                              {product.condition}
                            </span>
                            <span className="px-2 py-1 bg-red-50 text-red-600 text-xs font-medium rounded-md">
                              {product.brand}
                            </span>
                          </div>
                          <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-lg">
                            {product.title}
                          </h3>
                          <div className="text-sm text-gray-600 mb-4 flex justify-between">
                            <span className="bg-gray-50 px-2 py-1 rounded">{product.ram} RAM</span>
                            <span className="bg-gray-50 px-2 py-1 rounded">{product.gpu}</span>
                          </div>
                          <div className="mt-auto pt-3 border-t border-gray-100">
                            <p className="text-2xl font-bold text-black">
                              Rs.{product.price.toLocaleString()}
                            </p>
                            {product.available ? (
                              <p className="text-xs text-green-600 mt-1">In Stock & Ready to Ship</p>
                            ) : (
                              <p className="text-xs text-red-600 mt-1">Currently Unavailable</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </div>  
  );
}