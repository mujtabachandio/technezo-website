"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import AddToCart from '../addtocart';



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
  image: { asset: { url: string } };
  slug: { current: string };
}

export default function ProductClient({
  product,
  relatedProducts,
}: {
  product: StorageProduct;
  relatedProducts: StorageProduct[];
}) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);

  const inc = () => {
    if (product.inStock && product.stockQuantity && quantity < product.stockQuantity) {
      setQuantity((q) => q + 1);
    }
  };

  const dec = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  
  return (
    <div className="h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/">Home</Link> /{' '}
          <Link href="/storage">Storage</Link> /{' '}
          <span className="text-gray-800">{product.title}</span>
        </nav>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 md:flex">
          {/* Product Image */}
          <div className="md:w-1/2 relative h-40 md:h-[500px] bg-gray-100">
            <Image
              src={product.image.asset.url}
              alt={product.title}
              fill
              className="object-contain p-8"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 p-6 h-screen">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-blue-600 font-semibold mb-4 text-lg">
              {formatPrice(product.price)}
            </p>

            {/* Specs */}
            <dl className="grid grid-cols-2 gap-y-2 text-sm border-y border-gray-200 py-4 mb-4">
              <dt className="text-gray-500">Brand</dt><dd>{product.brand}</dd>
              <dt className="text-gray-500">Type</dt><dd>{product.type}</dd>
              <dt className="text-gray-500">Capacity</dt><dd>{product.capacity} GB</dd>
              {product.interface && (
                <>
                  <dt className="text-gray-500">Interface</dt>
                  <dd>{product.interface}</dd>
                </>
              )}
              {product.readSpeed && (
                <>
                  <dt className="text-gray-500">Read Speed</dt>
                  <dd>{product.readSpeed} MB/s</dd>
                </>
              )}
              {product.writeSpeed && (
                <>
                  <dt className="text-gray-500">Write Speed</dt>
                  <dd>{product.writeSpeed} MB/s</dd>
                </>
              )}
              <dt className="text-gray-500">Availability</dt>
              <dd className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                {product.inStock
                  ? `In Stock (${product.stockQuantity})`
                  : 'Out of Stock'}
              </dd>
            </dl>

            {/* Description */}
            {product.description && (
              <div className="mb-6">
                <h2 className="font-semibold mb-1">Description</h2>
                <p className="text-gray-600 text-sm">{product.description}</p>
              </div>
            )}

            {/* Quantity Selector */}
            {product.inStock && (
              <div className="flex items-center mb-6 space-x-4">
                <div>
                  <label className="block text-sm mb-1">Quantity</label>
                  <div className="flex border border-gray-300 rounded-md overflow-hidden">
                    <button
                      onClick={dec}
                      className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
                      disabled={quantity <= 1}
                    >
                      –
                    </button>
                    <span className="px-4 py-1">{quantity}</span>
                    <button
                      onClick={inc}
                      className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
                      disabled={
                        product.stockQuantity !== undefined &&
                        quantity >= product.stockQuantity
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
            

            {/* Add to Cart Button */}
            
              <AddToCart
              product={{
                ...product,
                image: product.image.asset.url,
              }}
              />
          </div>
        </div>
      </div>
    </div>
  );
}
