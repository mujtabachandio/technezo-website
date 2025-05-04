// app/products/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  FilterIcon,
  XIcon,
  ShoppingCartIcon,
  ChevronDownIcon,
} from "lucide-react";
import client from "@/sanity/lib/client";

interface StorageDevice {
  _id: string;
  title: string;
  brand: string;
  type: string;
  capacity: number;
  interface?: string;
  readSpeed?: number;
  writeSpeed?: number;
  price: number;
  inStock: boolean;
  stockQuantity?: number;
  description?: string;
  image: string; // already resolved URL
  slug: { current: string };
}

const capacityRanges = [
  { min: 0, max: 500, label: "Up to 500GB" },
  { min: 501, max: 1000, label: "501GB - 1TB" },
  { min: 1001, max: 2000, label: "1TB - 2TB" },
  { min: 2001, max: Infinity, label: "Over 2TB" },
];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // filter state
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    searchParams.get("brand")
  );
  const [selectedType, setSelectedType] = useState<string | null>(
    searchParams.get("type")
  );
  const [selectedInterface, setSelectedInterface] = useState<string | null>(
    searchParams.get("interface")
  );
  const [selectedCapacityRange, setSelectedCapacityRange] = useState<
    number | null
  >(searchParams.get("capacity") ? parseInt(searchParams.get("capacity")!) : null);
  const [inStockOnly, setInStockOnly] = useState(
    searchParams.get("inStock") === "true"
  );
  const [sortBy, setSortBy] = useState<string>(
    searchParams.get("sort") || "price-asc"
  );
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // product data
  const [products, setProducts] = useState<StorageDevice[]>([]);
  const [filtered, setFiltered] = useState<StorageDevice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // filter options
  const [allBrands, setAllBrands] = useState<string[]>([]);
  const allTypes = ["SSD", "HDD", "NVMe"];
  const allInterfaces = ["SATA", "NVMe (PCIe)", "M.2 SATA", "USB 3.0"];

  // fetch
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const query = `*[_type == "storage"] {
        _id, title, brand, type, capacity, interface, readSpeed, writeSpeed,
        price, inStock, stockQuantity, description,
        "image": image.asset->url,
        "slug": slug.current
      }`;
      try {
        const data: StorageDevice[] = await client.fetch(query);
        setProducts(data);
        setAllBrands(Array.from(new Set(data.map((p) => p.brand))));
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // sync URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedBrand) params.set("brand", selectedBrand);
    if (selectedType) params.set("type", selectedType);
    if (selectedInterface) params.set("interface", selectedInterface);
    if (selectedCapacityRange != null)
      params.set("capacity", selectedCapacityRange.toString());
    if (inStockOnly) params.set("inStock", "true");
    if (sortBy) params.set("sort", sortBy);
    router.replace(`/products?${params.toString()}`, { scroll: false });
  }, [
    selectedBrand,
    selectedType,
    selectedInterface,
    selectedCapacityRange,
    inStockOnly,
    sortBy,
    router,
  ]);

  // filter & sort
  useEffect(() => {
    let res = [...products];
    if (selectedBrand) res = res.filter((p) => p.brand === selectedBrand);
    if (selectedType) res = res.filter((p) => p.type === selectedType);
    if (selectedInterface)
      res = res.filter((p) => p.interface === selectedInterface);
    if (selectedCapacityRange != null) {
      const r = capacityRanges[selectedCapacityRange];
      res = res.filter((p) => p.capacity >= r.min && p.capacity <= r.max);
    }
    if (inStockOnly) res = res.filter((p) => p.inStock);
    switch (sortBy) {
      case "price-asc":
        res.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        res.sort((a, b) => b.price - a.price);
        break;
      case "capacity-asc":
        res.sort((a, b) => a.capacity - b.capacity);
        break;
      case "capacity-desc":
        res.sort((a, b) => b.capacity - a.capacity);
        break;
    }
    setFiltered(res);
  }, [
    products,
    selectedBrand,
    selectedType,
    selectedInterface,
    selectedCapacityRange,
    inStockOnly,
    sortBy,
  ]);

  const resetFilters = () => {
    setSelectedBrand(null);
    setSelectedType(null);
    setSelectedInterface(null);
    setSelectedCapacityRange(null);
    setInStockOnly(false);
    setSortBy("price-asc");
  };

  const handleAddToCart = (e: React.MouseEvent, p: StorageDevice) => {
    e.preventDefault();
    if (!p.inStock) return;
    alert(`Added "${p.title}" to cart`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white py-4 shadow-md sticky top-0 z-30">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Storage Devices</h1>
          <nav className="hidden md:flex space-x-6">
            <Link href="/">Home</Link>
            <Link href="/products" className="text-red-400">
              Products
            </Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Mobile Filters */}
      <div className="container mx-auto px-4 py-4 lg:hidden flex justify-between">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center bg-red-600 text-white px-4 py-2 rounded-md"
        >
          <FilterIcon className="mr-2" /> Filters
        </button>
        <div className="w-1/2 relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full border-gray-300 rounded-md p-2 pr-8"
          >
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
            <option value="capacity-asc">Cap ↑</option>
            <option value="capacity-desc">Cap ↓</option>
          </select>
          <ChevronDownIcon className="absolute right-2 top-3 text-gray-500" />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-2 text-sm text-gray-600">
        <Link href="/">Home</Link> / <span className="font-medium">Products</span>{" "}
        {selectedType && (
          <>
            / <span className="font-medium text-red-600">{selectedType}</span>
          </>
        )}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:flex lg:space-x-8 py-6">
        {/* Mobile modal */}
        {showMobileFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
            <div className="bg-white w-4/5 h-full p-4 overflow-auto">
              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <button onClick={() => setShowMobileFilters(false)}>
                  <XIcon />
                </button>
              </div>
              {/* reuse desktop filter markup below */}
              {/* ... */}
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            <div className="space-y-6">
              {/* Type */}
              <div>
                <h3 className="font-semibold mb-2">Type</h3>
                {allTypes.map((t) => (
                  <label key={t} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedType === t}
                      onChange={() =>
                        setSelectedType(selectedType === t ? null : t)
                      }
                      className="rounded text-red-600"
                    />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
              {/* Brand */}
              <div>
                <h3 className="font-semibold mb-2">Brand</h3>
                {allBrands.map((b) => (
                  <label key={b} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedBrand === b}
                      onChange={() =>
                        setSelectedBrand(selectedBrand === b ? null : b)
                      }
                      className="rounded text-red-600"
                    />
                    <span>{b}</span>
                  </label>
                ))}
              </div>
              {/* Interface */}
              <div>
                <h3 className="font-semibold mb-2">Interface</h3>
                {allInterfaces.map((i) => (
                  <label key={i} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedInterface === i}
                      onChange={() =>
                        setSelectedInterface(
                          selectedInterface === i ? null : i
                        )
                      }
                      className="rounded text-red-600"
                    />
                    <span>{i}</span>
                  </label>
                ))}
              </div>
              {/* Capacity */}
              <div>
                <h3 className="font-semibold mb-2">Capacity</h3>
                {capacityRanges.map((r, idx) => (
                  <label key={idx} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedCapacityRange === idx}
                      onChange={() =>
                        setSelectedCapacityRange(
                          selectedCapacityRange === idx ? null : idx
                        )
                      }
                      className="rounded text-red-600"
                    />
                    <span>{r.label}</span>
                  </label>
                ))}
              </div>
              {/* In Stock */}
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={() => setInStockOnly(!inStockOnly)}
                  className="rounded text-red-600"
                />
                <span>In Stock Only</span>
              </label>
              {/* Reset */}
              <button
                onClick={resetFilters}
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </aside>

        {/* Products */}
        <main className="flex-1">
          {/* Active Filters */}
          {(selectedBrand ||
            selectedType ||
            selectedInterface ||
            selectedCapacityRange != null ||
            inStockOnly) && (
            <div className="mb-4 flex flex-wrap gap-2">
              {selectedBrand && (
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full flex items-center">
                  Brand: {selectedBrand}
                  <XIcon
                    className="ml-2 cursor-pointer"
                    onClick={() => setSelectedBrand(null)}
                    size={12}
                  />
                </span>
              )}
              {selectedType && (
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full flex items-center">
                  Type: {selectedType}
                  <XIcon
                    className="ml-2 cursor-pointer"
                    onClick={() => setSelectedType(null)}
                    size={12}
                  />
                </span>
              )}
              {selectedInterface && (
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full flex items-center">
                  Interface: {selectedInterface}
                  <XIcon
                    className="ml-2 cursor-pointer"
                    onClick={() => setSelectedInterface(null)}
                    size={12}
                  />
                </span>
              )}
              {selectedCapacityRange != null && (
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full flex items-center">
                  Capacity: {capacityRanges[selectedCapacityRange].label}
                  <XIcon
                    className="ml-2 cursor-pointer"
                    onClick={() => setSelectedCapacityRange(null)}
                    size={12}
                  />
                </span>
              )}
              {inStockOnly && (
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full flex items-center">
                  In Stock Only
                  <XIcon
                    className="ml-2 cursor-pointer"
                    onClick={() => setInStockOnly(false)}
                    size={12}
                  />
                </span>
              )}
              <button
                onClick={resetFilters}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Desktop Sort */}
          <div className="hidden lg:flex justify-between items-center mb-6">
            <p className="text-gray-600">{filtered.length} Products</p>
            <div className="relative w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border-gray-300 rounded-md p-2 pr-8"
              >
                <option value="price-asc">Price ↑</option>
                <option value="price-desc">Price ↓</option>
                <option value="capacity-asc">Cap ↑</option>
                <option value="capacity-desc">Cap ↓</option>
              </select>
              <ChevronDownIcon className="absolute right-2 top-3 text-gray-500" />
            </div>
          </div>

          {/* Loading */}
          {isLoading ? (
            <p className="text-center py-10">Loading...</p>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <XIcon className="mx-auto text-red-600" size={48} />
              <p className="mt-4 text-gray-600">No products match filters.</p>
              <button
                onClick={resetFilters}
                className="mt-4 bg-red-600 text-white px-6 py-2 rounded"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <Link
                  key={product._id}
                  href={`/products/${product.slug.current}`}
                  className="border rounded-lg overflow-hidden bg-white hover:shadow-lg transition"
                >
                  <div className="relative h-48 bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      style={{ objectFit: "contain" }}
                      className="p-4"
                    />
                    {!product.inStock && (
                      <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                        Out of Stock
                      </div>
                    )}
                    {product.inStock &&
                      product.stockQuantity != null &&
                      product.stockQuantity <= 5 && (
                        <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                          Low Stock: {product.stockQuantity}
                        </div>
                      )}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-semibold text-red-600">
                        {product.brand}
                      </span>
                      <span className="text-sm bg-gray-100 px-2 py-0.5 rounded">
                        {product.type}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-1 line-clamp-2 hover:text-red-600 transition">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {product.capacity}GB • {product.interface}
                    </p>
                    {(product.readSpeed || product.writeSpeed) && (
                      <p className="text-xs text-gray-500 mb-3">
                        Read: {product.readSpeed} • Write: {product.writeSpeed} MB/s
                      </p>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">
                        PKR {product.price.toLocaleString()}
                      </span>
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        disabled={!product.inStock}
                        className={`p-2 rounded-full transition ${
                          product.inStock
                            ? "bg-red-600 text-white hover:bg-red-700"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        <ShoppingCartIcon size={16} />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
