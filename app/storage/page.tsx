// pages/storage/index.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import client from "@/sanity/lib/client";

interface StorageProduct {
  _id: string;
  title: string;
  brand: string;
  type: string;
  capacity: number;
  interface: string;
  readSpeed?: number;
  writeSpeed?: number;
  price: number;
  inStock: boolean;
  stockQuantity?: number;
  description?: string;
  image: {
    asset: {
      _ref: string;
      url: string;
    };
  };
  slug: {
    current: string;
  };
}

export default function StoragePage() {
  const [products, setProducts] = useState<StorageProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<StorageProduct[]>([]);
  const [activeFilters, setActiveFilters] = useState({
    type: "",
    brand: "",
    interface: "",
    minCapacity: 0,
    maxPrice: 0,
    inStock: false,
  });

  useEffect(() => {
    async function fetchProducts() {
      const query = `*[_type == "storage"] {
        _id,
        title,
        brand,
        type,
        capacity,
        interface,
        readSpeed,
        writeSpeed,
        price,
        inStock,
        stockQuantity,
        description,
        "image": {
          "asset": {
            "_ref": image.asset._ref,
            "url": image.asset->url
          }
        },
        slug
      }`;
      const data = await client.fetch(query);
      setProducts(data);
      setFilteredProducts(data);
    }

    fetchProducts();
  }, []);

  const allTypes = [...new Set(products.map((p) => p.type))];
  const allBrands = [...new Set(products.map((p) => p.brand))];
  const allInterfaces = [...new Set(products.map((p) => p.interface).filter(Boolean))];
  const maxPriceValue = Math.max(...products.map((p) => p.price), 0);

  const handleFilterChange = (filterType: string, value: string | number | boolean) => {
    const newFilters = { ...activeFilters, [filterType]: value };
    setActiveFilters(newFilters);

    let result = [...products];

    if (newFilters.type) result = result.filter((p) => p.type === newFilters.type);
    if (newFilters.brand) result = result.filter((p) => p.brand === newFilters.brand);
    if (newFilters.interface) result = result.filter((p) => p.interface === newFilters.interface);
    if (newFilters.minCapacity > 0) result = result.filter((p) => p.capacity >= newFilters.minCapacity);
    if (newFilters.maxPrice > 0) result = result.filter((p) => p.price <= newFilters.maxPrice);
    if (newFilters.inStock) result = result.filter((p) => p.inStock);

    setFilteredProducts(result);
  };

  const resetFilters = () => {
    const reset = {
      type: "",
      brand: "",
      interface: "",
      minCapacity: 0,
      maxPrice: 0,
      inStock: false,
    };
    setActiveFilters(reset);
    setFilteredProducts(products);
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(price);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Storage Devices</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow-md">
            <div className="mb-4">
              <h2 className="font-semibold text-lg text-gray-700 mb-2">Filters</h2>
              <button onClick={resetFilters} className="text-sm text-blue-600 hover:text-blue-800">
                Reset All
              </button>
            </div>

            {/* Type Filter */}
            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-2">Storage Type</h3>
              <div className="space-y-1">
                {allTypes.map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      checked={activeFilters.type === type}
                      onChange={() => handleFilterChange("type", type)}
                      className="mr-2"
                    />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
                {activeFilters.type && (
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      checked={activeFilters.type === ""}
                      onChange={() => handleFilterChange("type", "")}
                      className="mr-2"
                    />
                    <span className="text-sm">Any</span>
                  </label>
                )}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-2">Brand</h3>
              <select
                value={activeFilters.brand}
                onChange={(e) => handleFilterChange("brand", e.target.value)}
                className="w-full rounded border-gray-300 text-sm p-2"
              >
                <option value="">All Brands</option>
                {allBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Interface Filter */}
            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-2">Interface</h3>
              <select
                value={activeFilters.interface}
                onChange={(e) => handleFilterChange("interface", e.target.value)}
                className="w-full rounded border-gray-300 text-sm p-2"
              >
                <option value="">All Interfaces</option>
                {allInterfaces.map((iface) => (
                  <option key={iface} value={iface}>
                    {iface}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Capacity */}
            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-2">Min Capacity (GB)</h3>
              <input
                type="number"
                value={activeFilters.minCapacity}
                onChange={(e) => handleFilterChange("minCapacity", Number(e.target.value))}
                className="w-full rounded border-gray-300 text-sm p-2"
              />
            </div>

            {/* Max Price */}
            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-2">Max Price</h3>
              <input
                type="range"
                min="0"
                max={maxPriceValue}
                value={activeFilters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", Number(e.target.value))}
                className="w-full"
              />
              <div className="text-sm text-gray-600 mt-1">{formatPrice(activeFilters.maxPrice)}</div>
            </div>

            {/* In Stock */}
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={activeFilters.inStock}
                  onChange={(e) => handleFilterChange("inStock", e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">In Stock Only</span>
              </label>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link
                  key={product._id}
                  href={`/storage/${product.slug.current}`}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition duration-200 p-4"
                >
                  <Image
                    src={product.image.asset.url}
                    alt={product.title}
                    width={300}
                    height={200}
                    className="object-contain w-full h-48 mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                  <p className="text-sm text-gray-600">{product.brand}</p>
                  <p className="text-sm text-gray-600">Capacity: {product.capacity} GB</p>
                  <p className="text-sm text-gray-600">Interface: {product.interface}</p>
                  <p className="text-blue-600 font-bold mt-2">{formatPrice(product.price)}</p>
                </Link>
              ))
            ) : (
              <p className="text-gray-600 col-span-full text-center">No products found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
