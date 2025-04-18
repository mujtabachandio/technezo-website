'use client';

import { useEffect, useState, ChangeEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import  client  from '@/sanity/lib/client';

import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const builder = imageUrlBuilder(client);

const urlFor = (src: SanityImageSource) =>
  builder.image(src).width(300).height(200).url();


//
// ─── TYPES ────────────────────────────────────────────────────────────────
//

interface LaptopImage {
  asset: {
    _ref: string;
    _type: string;
  };
}

interface LaptopSlug {
  current: string;
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
// ─── SIDEBAR COMPONENT ─────────────────────────────────────────────────────
//

interface FilterSidebarProps {
  availableBrands: string[];
  availableRAMs: string[];
  availableGraphics: string[];
  availableConditions: string[];
  selectedFilters: FilterCriteria;
  onFilterChange: (filter: FilterCriteria) => void;
  onClear: () => void;
}

const FilterSidebar = ({
  availableBrands,
  availableRAMs,
  availableGraphics,
  availableConditions,
  selectedFilters,
  onFilterChange,
  onClear,
}: FilterSidebarProps) => {
  const handleCheckboxChange = (
    field: 'brands' | 'rams' | 'graphics' | 'conditions',
    value: string
  ) => {
    let updated = [...selectedFilters[field]];
    if (updated.includes(value)) {
      updated = updated.filter((item) => item !== value);
    } else {
      updated.push(value);
    }
    onFilterChange({ ...selectedFilters, [field]: updated });
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value === '' ? null : Number(value);
    onFilterChange({ ...selectedFilters, [name]: numericValue });
  };

  const handleQuickToggle = (field: 'inStockOnly' | 'featured') => {
    onFilterChange({ ...selectedFilters, [field]: !selectedFilters[field] });
  };

  return (
    <aside className="w-full md:w-1/4 p-6 border-r border-gray-200 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Filters</h2>
        <button onClick={onClear} className="text-sm text-blue-600 hover:text-blue-800">
          Clear All
        </button>
      </div>

      {/* Brand */}
      <div className="mb-6">
        <h3 className="font-medium text-lg text-gray-700 mb-2">Brand</h3>
        <div className="space-y-2">
          {availableBrands.map((brand) => (
            <label key={brand} className="flex items-center">
              <input
                type="checkbox"
                value={brand}
                checked={selectedFilters.brands.includes(brand)}
                onChange={() => handleCheckboxChange('brands', brand)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* RAM */}
      <div className="mb-6">
        <h3 className="font-medium text-lg text-gray-700 mb-2">RAM</h3>
        <div className="space-y-2">
          {availableRAMs.map((ram) => (
            <label key={ram} className="flex items-center">
              <input
                type="checkbox"
                value={ram}
                checked={selectedFilters.rams.includes(ram)}
                onChange={() => handleCheckboxChange('rams', ram)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">{ram}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Graphics Card */}
      <div className="mb-6">
        <h3 className="font-medium text-lg text-gray-700 mb-2">Graphics Card</h3>
        <div className="space-y-2">
          {availableGraphics.map((gpu) => (
            <label key={gpu} className="flex items-center">
              <input
                type="checkbox"
                value={gpu}
                checked={selectedFilters.graphics.includes(gpu)}
                onChange={() => handleCheckboxChange('graphics', gpu)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">{gpu}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-medium text-lg text-gray-700 mb-2">Price Range</h3>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-xs text-gray-500 mb-1">Min ($)</label>
            <input
              type="number"
              name="minPrice"
              value={selectedFilters.minPrice ?? ''}
              onChange={handlePriceChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-xs text-gray-500 mb-1">Max ($)</label>
            <input
              type="number"
              name="maxPrice"
              value={selectedFilters.maxPrice ?? ''}
              onChange={handlePriceChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="5000"
            />
          </div>
        </div>
      </div>

      {/* Condition */}
      <div className="mb-6">
        <h3 className="font-medium text-lg text-gray-700 mb-2">Condition</h3>
        <div className="space-y-2">
          {availableConditions.map((cond) => (
            <label key={cond} className="flex items-center">
              <input
                type="checkbox"
                value={cond}
                checked={selectedFilters.conditions.includes(cond)}
                onChange={() => handleCheckboxChange('conditions', cond)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">{cond}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Quick Filters */}
      <div className="mb-6">
        <h3 className="font-medium text-lg text-gray-700 mb-2">Quick Filters</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={selectedFilters.inStockOnly}
              onChange={() => handleQuickToggle('inStockOnly')}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-600">In Stock Only</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={selectedFilters.featured}
              onChange={() => handleQuickToggle('featured')}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-600">Featured Products</span>
          </label>
        </div>
      </div>
    </aside>
  );
};

//
// ─── GROUPED PRODUCT SECTION ──────────────────────────────────────────────
//

type Section = {
  title: string;
  filter: (p: Laptop) => boolean;
};

const SECTIONS: Section[] = [
  { title: 'Gaming Laptops', filter: (p: Laptop) => p.isGaming === true },
  { title: 'New Laptops', filter: (p: Laptop) => p.condition === 'New' },
  { title: 'Used Laptops', filter: (p: Laptop) => p.condition === 'Used' },
];

//
// ─── PRODUCT CARD COMPONENT ─────────────────────────────────────────────────
//

const ProductCard = ({ product }: { product: Laptop }) => (
  <Link href={`/laptop/${product.slug.current}`} key={product._id}>
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full"
    >
      <div className="relative h-48 bg-gray-100 flex items-center justify-center p-4">
        {product.images[0] ? (
          <Image
            src={urlFor(product.images[0])}
            alt={product.title}
            width={300}
            height={200}
            className="object-contain rounded"
          />
        ) : (
          <div className="text-gray-400">No image available</div>
        )}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {product.featured && (
            <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-md">Featured</span>
          )}
          {product.isGaming && (
            <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-md">Gaming</span>
          )}
          {!product.available && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-md">Out of Stock</span>
          )}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2 flex items-center">
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">{product.condition}</span>
          <span className="ml-2 px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-md">{product.brand}</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{product.title}</h3>
        <div className="text-sm text-gray-500 mb-3 flex justify-between">
          <span>{product.ram} RAM</span>
          <span>{product.gpu}</span>
        </div>
        <div className="mt-auto">
          <p className="text-2xl font-bold text-blue-600">
            Rs.{product.price.toLocaleString()}
          </p>
        </div>
      </div>
    </motion.div>
  </Link>
);

//
// ─── HOMEPAGE ─────────────────────────────────────────────────────────────
//

export default function HomePage() {
  const [allProducts, setAllProducts] = useState<Laptop[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Laptop[]>([]);
  const [filters, setFilters] = useState<FilterCriteria>(initialFilters);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Apply sidebar filters to all products.
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
      result = result.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== null) {
      result = result.filter((p) => p.price <= filters.maxPrice!);
    }
    if (filters.inStockOnly) {
      result = result.filter((p) => p.available === true);
    }
    if (filters.featured) {
      result = result.filter((p) => p.featured === true);
    }

    setFilteredProducts(result);
  }, [filters, allProducts]);

  // Compute available filter option values from all products.
  const availableBrands = Array.from(new Set(allProducts.map((p) => p.brand))).filter(Boolean);
  const availableRAMs = Array.from(new Set(allProducts.map((p) => p.ram))).filter(Boolean);
  const availableGraphics = Array.from(new Set(allProducts.map((p) => p.gpu))).filter(Boolean);
  const availableConditions = Array.from(new Set(allProducts.map((p) => p.condition))).filter(Boolean);

  const handleClearFilters = () => setFilters(initialFilters);

  // Group filtered products into sections.
  const displaySections = SECTIONS.filter(
    (section) => filteredProducts.filter(section.filter).length > 0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex bg-gradient-to-r from-red-500 to-red-600 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">TECHNEZO YOUR OWN LAPTOP BRAND</h1>
            </div>
            <div className="hidden md:flex items-center">
              {/* Future navigation/menu can go here */}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar for Filters */}
          <FilterSidebar
            availableBrands={availableBrands}
            availableRAMs={availableRAMs}
            availableGraphics={availableGraphics}
            availableConditions={availableConditions}
            selectedFilters={filters}
            onFilterChange={setFilters}
            onClear={handleClearFilters}
          />

          {/* Main Content */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
              </div>
            ) : displaySections.length > 0 ? (
              <div className="space-y-12">
                {displaySections.map((section) => {
                  const productsForSection = filteredProducts.filter(section.filter);
                  return (
                    <section key={section.title}>
                      <div className="flex items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
                        <div className="ml-4 h-px bg-gray-200 flex-grow"></div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {productsForSection.map((product) => (
                          <ProductCard key={product._id} product={product} />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M9 16h.01M15 16h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-800">No products found</h3>
                <p className="mt-1 text-gray-500">Try adjusting your filters to find products.</p>
                <div className="mt-6">
                  <button
                    onClick={handleClearFilters}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
