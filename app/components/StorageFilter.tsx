'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type StorageFilterProps = {
  brands: string[];
  types: string[];
  selectedType?: string;
  selectedBrand?: string;
  selectedSort?: string;
  inStockOnly?: boolean;
};

export default function StorageFilter({
  brands,
  types,
  selectedType,
  selectedBrand,
  selectedSort,
  inStockOnly,
}: StorageFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: selectedType || '',
    brand: selectedBrand || '',
    sort: selectedSort || '',
    inStock: inStockOnly || false,
  });

  // Apply filters
  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (filters.type) params.set('type', filters.type);
    if (filters.brand) params.set('brand', filters.brand);
    if (filters.sort) params.set('sort', filters.sort);
    if (filters.inStock) params.set('inStock', 'true');
    
    router.push(`?${params.toString()}`);
    
    // Close filter on mobile after applying
    if (window.innerWidth < 768) {
      setIsFilterOpen(false);
    }
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      type: '',
      brand: '',
      sort: '',
      inStock: false,
    });
    router.push('');
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Mobile filter toggle */}
      <div className="md:hidden">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="w-full flex items-center justify-between p-4 bg-black text-white"
        >
          <span className="font-medium">Filters</span>
          <svg
            className={`w-5 h-5 transition-transform ${isFilterOpen ? 'transform rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Filter content */}
      <div className={`${isFilterOpen || 'hidden md:block'} p-4`}>
        <h2 className="font-bold text-lg mb-4 text-gray-900 hidden md:block">Filters</h2>
        
        {/* Storage Type Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-sm mb-2 text-gray-700">Storage Type</h3>
          <div className="space-y-2">
            {types.map((type) => (
              <label key={type} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="storage-type"
                  checked={filters.type === type}
                  onChange={() => setFilters({ ...filters, type })}
                  className="form-radio h-4 w-4 text-red-600 transition duration-150 ease-in-out"
                />
                <span className="ml-2 text-gray-700 text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Brand Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-sm mb-2 text-gray-700">Brand</h3>
          <select
            value={filters.brand}
            onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="">All Brands</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        
        {/* Stock Filter */}
        <div className="mb-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={() => setFilters({ ...filters, inStock: !filters.inStock })}
              className="form-checkbox h-4 w-4 text-red-600 transition duration-150 ease-in-out"
            />
            <span className="ml-2 text-gray-700 text-sm">In Stock Only</span>
          </label>
        </div>
        
        {/* Sort By */}
        <div className="mb-6">
          <h3 className="font-semibold text-sm mb-2 text-gray-700">Sort By</h3>
          <select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="capacity-asc">Capacity: Low to High</option>
            <option value="capacity-desc">Capacity: High to Low</option>
          </select>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col space-y-2">
          <button
            onClick={applyFilters}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Apply Filters
          </button>
          <button
            onClick={resetFilters}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}