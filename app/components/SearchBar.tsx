'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import client from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const builder = imageUrlBuilder(client);
const urlFor = (src: SanityImageSource): string =>
  builder.image(src).width(200).height(150).url();

interface SearchProduct {
  _id: string;
  title: string;
  slug: { current: string };
  price: number;
  brand?: string;
  type: 'laptop' | 'accessory' | 'ram' | 'storage';
  image?: SanityImageSource | { asset?: { url?: string } | { _ref?: string; _type?: string } };
  available?: boolean;
  inStock?: boolean;
}

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [allProducts, setAllProducts] = useState<SearchProduct[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch all products on mount
  useEffect(() => {
    async function fetchAllProducts() {
      try {
        // Fetch laptops
        const laptops = await client.fetch(`
          *[_type == "laptop" && available == true]{
            _id,
            title,
            slug,
            price,
            brand,
            images[0],
            available,
            "type": "laptop"
          }
        `);

        // Fetch accessories
        const accessories = await client.fetch(`
          *[_type == "laptopAccessory" && available == true]{
            _id,
            title,
            slug,
            price,
            brand,
            images[0],
            available,
            "type": "accessory"
          }
        `);

        // Fetch RAM
        const rams = await client.fetch(`
          *[_type == "ram" && inStock == true]{
            _id,
            title,
            slug,
            price,
            brand,
            image{
              asset->{
                url
              }
            },
            inStock,
            "type": "ram"
          }
        `);

        // Fetch storage
        const storage = await client.fetch(`
          *[_type == "storage" && inStock == true]{
            _id,
            title,
            slug,
            price,
            brand,
            image{
              asset->{
                url
              }
            },
            inStock,
            "type": "storage"
          }
        `);

        const all = [
          ...laptops.map((p: any) => ({ ...p, type: 'laptop' as const })),
          ...accessories.map((p: any) => ({ ...p, type: 'accessory' as const })),
          ...rams.map((p: any) => ({ ...p, type: 'ram' as const })),
          ...storage.map((p: any) => ({ ...p, type: 'storage' as const })),
        ];

        setAllProducts(all);
      } catch (error) {
        console.error('Error fetching products for search:', error);
      }
    }

    fetchAllProducts();
  }, []);

  // Search function
  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    const query = searchQuery.toLowerCase().trim();

    // Debounce search
    const timeoutId = setTimeout(() => {
      const filtered = allProducts.filter((product) => {
        const searchableText = [
          product.title,
          product.brand,
          product.type,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        return searchableText.includes(query);
      });

      setSearchResults(filtered.slice(0, 8)); // Limit to 8 results
      setShowResults(true);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, allProducts]);

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getProductUrl = (product: SearchProduct) => {
    switch (product.type) {
      case 'laptop':
        return `/shop/${product.slug.current}`;
      case 'accessory':
        return `/accessories/${product.slug.current}`;
      case 'ram':
        return `/ram/${product.slug.current}`;
      case 'storage':
        return `/storage/${product.slug.current}`;
      default:
        return '/';
    }
  };

  const getImageUrl = (product: SearchProduct): string => {
    if (!product.image) return '/placeholder-image.png';
    
    // Handle RAM/storage images with asset.url
    if (typeof product.image === 'object' && 'asset' in product.image) {
      if (product.image.asset && typeof product.image.asset === 'object' && 'url' in product.image.asset) {
        return (product.image.asset as { url: string }).url;
      }
    }
    
    // Handle Sanity image source (laptops/accessories)
    try {
      return urlFor(product.image as SanityImageSource);
    } catch {
      return '/placeholder-image.png';
    }
  };

  return (
    <div ref={searchRef} className="relative flex-1 max-w-md mx-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery.trim().length > 0 && setShowResults(true)}
          className="w-full pl-10 pr-10 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('');
              setShowResults(false);
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-black border border-gray-700 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50"
          >
            {isSearching ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="animate-spin text-red-500" size={24} />
              </div>
            ) : searchResults.length === 0 ? (
              <div className="p-6 text-center text-gray-400">
                <p>No products found</p>
                <p className="text-sm mt-1">Try a different search term</p>
              </div>
            ) : (
              <div className="py-2">
                <div className="px-4 py-2 text-xs text-gray-400 border-b border-gray-700">
                  Found {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
                </div>
                {searchResults.map((product) => (
                  <Link
                    key={product._id}
                    href={getProductUrl(product)}
                    onClick={() => {
                      setSearchQuery('');
                      setShowResults(false);
                    }}
                    className="block px-4 py-3 hover:bg-gray-800 transition-colors border-b border-gray-800 last:border-0"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative w-16 h-16 bg-gray-700 rounded flex-shrink-0">
                        <Image
                          src={getImageUrl(product)}
                          alt={product.title}
                          fill
                          className="object-contain p-1 rounded"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium text-sm truncate">
                          {product.title}
                        </h3>
                        {product.brand && (
                          <p className="text-gray-400 text-xs mt-1">{product.brand}</p>
                        )}
                        <p className="text-red-500 font-bold text-sm mt-1">
                          Rs {product.price?.toLocaleString() || 'N/A'}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded capitalize">
                          {product.type}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

