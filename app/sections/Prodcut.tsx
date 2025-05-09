'use client';

import { useEffect, useState, ChangeEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import client from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const builder = imageUrlBuilder(client);
const urlFor = (src: SanityImageSource) =>
  builder.image(src).width(300).height(200).url();

//
// ─── TYPES ────────────────────────────────────────────────────────────────
//

interface LaptopImage {
  asset: { _ref: string; _type: string };
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
  processor: string;
  displaySize: string;
  resolution: string;
  touchScreen: boolean;
  generation: string;
  gpu: string;
  available: boolean;
}

type FilterCriteria = {
  brands: string[];
  processors: string[];
  displaySizes: string[];
  resolutions: string[];
  graphics: string[];
  generations: string[];
  touchOptions: string[]; // "Touch" | "Non-Touch"
  minPrice: number | null;
  maxPrice: number | null;
  inStockOnly: boolean;
  featured: boolean;
};

const initialFilters: FilterCriteria = {
  brands: [],
  processors: [],
  displaySizes: [],
  resolutions: [],
  graphics: [],
  generations: [],
  touchOptions: [],
  minPrice: null,
  maxPrice: null,
  inStockOnly: false,
  featured: false,
};

//
// ─── FILTER SIDEBAR ────────────────────────────────────────────────────────
//

interface FilterSidebarProps {
  availableBrands: string[];
  availableProcessors: string[];
  availableDisplaySizes: string[];
  availableResolutions: string[];
  availableGraphics: string[];
  availableGenerations: string[];
  selectedFilters: FilterCriteria;
  onFilterChange: (f: FilterCriteria) => void;
  onClear: () => void;
}

function FilterSidebar({
  availableBrands,
  availableProcessors,
  availableDisplaySizes,
  availableResolutions,
  availableGraphics,
  availableGenerations,
  selectedFilters,
  onFilterChange,
  onClear,
}: FilterSidebarProps) {
  const handleCheckboxChange = (
    field:
      | 'brands'
      | 'processors'
      | 'displaySizes'
      | 'resolutions'
      | 'graphics'
      | 'generations'
      | 'touchOptions',
    value: string
  ) => {
    const current = selectedFilters[field];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange({ ...selectedFilters, [field]: updated });
  };

  const handlePrice = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const num = value === '' ? null : Number(value);
    onFilterChange({ ...selectedFilters, [name]: num });
  };

  const handleQuick = (field: 'inStockOnly' | 'featured') => {
    onFilterChange({ ...selectedFilters, [field]: !selectedFilters[field] });
  };

  return (
    <aside className="w-full md:w-1/4 p-6 border-r bg-white rounded shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Filters</h2>
        <button onClick={onClear} className="text-sm text-blue-600 hover:underline">
          Clear All
        </button>
      </div>
      
      {/* Quick */}
      <div className="mt-6">
        <h3 className="font-medium mb-2">Quick</h3>
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={selectedFilters.inStockOnly}
            onChange={() => handleQuick('inStockOnly')}
            className="mr-2"
          />{' '}
          In Stock Only
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={selectedFilters.featured}
            onChange={() => handleQuick('featured')}
            className="mr-2"
          />{' '}
          Featured
        </label>
      </div>



      {/* Price */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Price</h3>
        <div className="flex space-x-2">
          <input
            type="number"
            name="minPrice"
            value={selectedFilters.minPrice ?? ''}
            onChange={handlePrice}
            placeholder="Min"
            className="w-1/2 p-2 border rounded"
          />
          <input
            type="number"
            name="maxPrice"
            value={selectedFilters.maxPrice ?? ''}
            onChange={handlePrice}
            placeholder="Max"
            className="w-1/2 p-2 border rounded"
          />
        </div>
      </div>

      {/* Reusable checkbox groups */}
      <FilterGroup
        title="Generation"
        options={availableGenerations}
        selected={selectedFilters.generations}
        onChange={(val) => handleCheckboxChange('generations', val)}
      />
      
      <FilterGroup
        title="Brand"
        options={availableBrands}
        selected={selectedFilters.brands}
        onChange={(val) => handleCheckboxChange('brands', val)}
      />
      <FilterGroup
        title="Processor"
        options={availableProcessors}
        selected={selectedFilters.processors}
        onChange={(val) => handleCheckboxChange('processors', val)}
      />
      <FilterGroup
        title="Display Size"
        options={availableDisplaySizes}
        selected={selectedFilters.displaySizes}
        onChange={(val) => handleCheckboxChange('displaySizes', val)}
      />
      <FilterGroup
        title="Resolution"
        options={availableResolutions}
        selected={selectedFilters.resolutions}
        onChange={(val) => handleCheckboxChange('resolutions', val)}
      />
      <FilterGroup
        title="Graphics"
        options={availableGraphics}
        selected={selectedFilters.graphics}
        onChange={(val) => handleCheckboxChange('graphics', val)}
      />
      
      <FilterGroup
        title="Touch Screen"
        options={['Touch', 'Non-Touch']}
        selected={selectedFilters.touchOptions}
        onChange={(val) => handleCheckboxChange('touchOptions', val)}
      />

      
    </aside>
  );
}

function FilterGroup({
  title,
  options,
  selected,
  onChange,
}: {
  title: string;
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="mb-6">
      <h3 className="font-medium mb-2">{title}</h3>
      <div className="space-y-1">
        {options.map((opt) => (
          <label key={opt} className="flex items-center">
            <input
              type="checkbox"
              checked={selected.includes(opt)}
              onChange={() => onChange(opt)}
              className="mr-2"
            />
            <span className="text-sm">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

//
// ─── PRODUCT CARD ─────────────────────────────────────────────────────────
//

function ProductCard({ product }: { product: Laptop }) {
  return (
    <Link href={`/laptop/${product.slug.current}`} key={product._id}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg flex flex-col h-full"
      >
        <div className="relative h-48 bg-gray-100 flex items-center justify-center">
          {product.images[0] ? (
            <Image
              src={urlFor(product.images[0])}
              alt={product.title}
              width={300}
              height={200}
              className="object-contain"
            />
          ) : (
            <span className="text-gray-400">No image</span>
          )}
          <div className="absolute top-2 left-2 space-x-1">
            {product.featured && (
              <span className="bg-yellow-500 text-white px-2 py-1 text-xs rounded">
                Featured
              </span>
            )}
            {product.isGaming && (
              <span className="bg-purple-600 text-white px-2 py-1 text-xs rounded">
                Gaming
              </span>
            )}
            {!product.available && (
              <span className="bg-red-500 text-white px-2 py-1 text-xs rounded">
                Out of Stock
              </span>
            )}
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="mb-2 flex space-x-2 text-xs">
            <span className="px-2 py-1 bg-gray-200 rounded">
              {product.condition}
            </span>
            <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded">
              {product.brand}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
            {product.title}
          </h3>
          <div className="text-sm text-gray-500 mb-3">
            {product.processor} • {product.displaySize} • {product.resolution} •{' '}
            {product.gpu}
          </div>
          <div className="mt-auto text-2xl font-bold text-blue-600">
            Rs.{product.price.toLocaleString()}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

//
// ─── SECTIONS ─────────────────────────────────────────────────────────────
//

type Section = {
  title: string;
  filter: (p: Laptop) => boolean;
};

const SECTIONS: Section[] = [
  { title: 'Gaming Laptops', filter: (p) => p.isGaming },
  { title: 'New Laptops', filter: (p) => p.condition === 'New' },
  { title: 'Used Laptops', filter: (p) => p.condition === 'Used' },
];

//
// ─── HOME PAGE ─────────────────────────────────────────────────────────────
//

export default function HomePage() {
  const [allProducts, setAllProducts] = useState<Laptop[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Laptop[]>([]);
  const [filters, setFilters] = useState<FilterCriteria>(initialFilters);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch on mount
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const data = await client.fetch('*[_type=="laptop"]');
        setAllProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = allProducts;
    const {
      brands,
      processors,
      displaySizes,
      resolutions,
      graphics,
      generations,
      touchOptions,
      minPrice,
      maxPrice,
      inStockOnly,
      featured,
    } = filters;

    if (brands.length)
      result = result.filter((p) => brands.includes(p.brand));
    if (processors.length)
      result = result.filter((p) => processors.includes(p.processor));
    if (displaySizes.length)
      result = result.filter((p) => displaySizes.includes(p.displaySize));
    if (resolutions.length)
      result = result.filter((p) => resolutions.includes(p.resolution));
    if (graphics.length)
      result = result.filter((p) => graphics.includes(p.gpu));
    if (generations.length)
      result = result.filter((p) => generations.includes(p.generation));

    if (touchOptions.length) {
      result = result.filter((p) => {
        const key = p.touchScreen ? 'Touch' : 'Non-Touch';
        return touchOptions.includes(key);
      });
    }

    if (minPrice !== null) result = result.filter((p) => p.price >= minPrice);
    if (maxPrice !== null) result = result.filter((p) => p.price <= maxPrice);
    if (inStockOnly) result = result.filter((p) => p.available);
    if (featured) result = result.filter((p) => p.featured);

    setFilteredProducts(result);
  }, [filters, allProducts]);

  // Derive options
  const availableBrands = Array.from(
    new Set(allProducts.map((p) => p.brand))
  ).filter(Boolean);
  const availableProcessors = Array.from(
    new Set(allProducts.map((p) => p.processor))
  ).filter(Boolean);
  const availableDisplaySizes = Array.from(
    new Set(allProducts.map((p) => p.displaySize))
  ).filter(Boolean);
  const availableResolutions = Array.from(
    new Set(allProducts.map((p) => p.resolution))
  ).filter(Boolean);
  const availableGraphics = Array.from(
    new Set(allProducts.map((p) => p.gpu))
  ).filter(Boolean);
  const availableGenerations = Array.from(
    new Set(allProducts.map((p) => p.generation))
  ).filter(Boolean);

  const displaySections = SECTIONS.filter((section) =>
    filteredProducts.some(section.filter)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex justify-center bg-gradient-to-r from-red-500 to-red-600 text-white p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold">Your Tech. Your Zone. Technezo</h1>
      </header>

      <div className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-8">
        <FilterSidebar
          availableBrands={availableBrands}
          availableProcessors={availableProcessors}
          availableDisplaySizes={availableDisplaySizes}
          availableResolutions={availableResolutions}
          availableGraphics={availableGraphics}
          availableGenerations={availableGenerations}
          selectedFilters={filters}
          onFilterChange={setFilters}
          onClear={() => setFilters(initialFilters)}
        />

        <main className="flex-1">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin h-12 w-12 border-t-2 border-blue-500 rounded-full" />
            </div>
          ) : displaySections.length > 0 ? (
            displaySections.map((section) => {
              const items = filteredProducts.filter(section.filter);
              return (
                <section key={section.title} className="mb-12">
                  <div className="flex items-center mb-4">
                    <h2 className="text-2xl font-bold">{section.title}</h2>
                    <div className="flex-grow h-px bg-gray-200 ml-4" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((p) => (
                      <ProductCard key={p._id} product={p} />
                    ))}
                  </div>
                </section>
              );
            })
          ) : (
            <div className="text-center py-20">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M9 16h.01M15 16h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium">No products found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your filters.</p>
              <button
                onClick={() => setFilters(initialFilters)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
