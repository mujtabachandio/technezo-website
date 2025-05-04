import client from '@/sanity/lib/client'
import urlForImage from '@/sanity/lib/image'
import Image from 'next/image'
import { singleRamQuery } from '@/lib/queries'
import { BadgeCheck, XCircle, ArrowLeft, ShoppingCart, Shield, Truck, Award } from 'lucide-react'
import Link from 'next/link'

interface Props {
  params: { slug: string }
}

export default async function RamDetailPage({ params }: Props) {
  const product = await client.fetch(singleRamQuery, { slug: params.slug })

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <XCircle className="w-16 h-16 text-red-600 mb-4" />
        <h1 className="text-2xl font-bold text-black mb-2">Product Not Found</h1>
        <p className="text-gray-600 mb-6">The product you&lsquo;re looking for doesn&lsquo;t exist or has been removed.</p>
        <Link 
          href="/ram" 
          className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to All Products
        </Link>
      </div>
    )
  }

  // Format price with commas
  const formattedPrice = product.price?.toLocaleString() || '0'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-red-600 transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/ram" className="text-gray-500 hover:text-red-600 transition-colors">RAM</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-800 font-medium truncate">{product.title}</span>
          </div>
        </div>
      </div>

      {/* Back Button - Mobile Only */}
      <div className="container mx-auto px-4 py-4 md:hidden">
        <Link 
          href="/ram" 
          className="inline-flex items-center gap-2 text-black hover:text-red-600 transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Back to RAM</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Product Image Section */}
            <div className="w-full lg:w-1/2">
              <div className="relative h-full">
                {/* Image Container */}
                <div className="bg-white p-8 flex items-center justify-center h-[400px] md:h-[500px] border-b lg:border-b-0 lg:border-r">
                  {product.image ? (
                    <Image
                      src={urlForImage(product.image).url()}
                      alt={product.title}
                      width={600}
                      height={600}
                      className="object-contain max-h-full max-w-full transition-all duration-300 hover:scale-105"
                      priority
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-400">
                      No Image Available
                    </div>
                  )}
                </div>
                
                {/* Status Badge */}
                {product.inStock ? (
                  <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    IN STOCK
                  </div>
                ) : (
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    OUT OF STOCK
                  </div>
                )}
                
                {/* Brand Badge */}
                <div className="absolute top-4 right-4 bg-black text-white text-xs font-bold px-3 py-1 rounded-full">
                  {product.brand}
                </div>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="w-full lg:w-1/2 p-6 md:p-8 lg:p-10">
              {/* Title and Brand */}
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-black mb-2">{product.title}</h1>
                <div className="flex items-center text-gray-600">
                  <Award size={16} className="mr-1" />
                  <span>{product.brand} Official Product</span>
                </div>
              </div>
              
              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-2xl md:text-3xl font-bold text-red-600">PKR {formattedPrice}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="ml-2 text-gray-500 line-through">PKR {product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                
                {/* Stock Status */}
                <div className="mt-2">
                  {product.inStock ? (
                    <div className="flex items-center text-green-600">
                      <BadgeCheck size={18} className="mr-1" /> 
                      <span className="font-medium">In Stock</span>
                      {product.stockQuantity && (
                        <span className="ml-2 text-gray-600">({product.stockQuantity} available)</span>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <XCircle size={18} className="mr-1" /> 
                      <span className="font-medium">Out of Stock</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Specifications */}
              <div className="mb-8">
                <h2 className="text-lg font-bold text-black mb-3 flex items-center">
                  <span>Specifications</span>
                  <div className="ml-2 h-1 w-8 bg-red-600"></div>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="text-sm text-gray-500 mb-1">Capacity</div>
                    <div className="text-black font-semibold">{product.capacity} GB</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="text-sm text-gray-500 mb-1">Type</div>
                    <div className="text-black font-semibold">{product.type}</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="text-sm text-gray-500 mb-1">Speed</div>
                    <div className="text-black font-semibold">{product.speed} MHz</div>
                  </div>
                  
                  {product.latency && (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <div className="text-sm text-gray-500 mb-1">Latency</div>
                      <div className="text-black font-semibold">{product.latency}</div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Description */}
              <div className="mb-8">
                <h2 className="text-lg font-bold text-black mb-3 flex items-center">
                  <span>Description</span>
                  <div className="ml-2 h-1 w-8 bg-red-600"></div>
                </h2>
                <div className="text-gray-700 leading-relaxed">
                  {product.description ? (
                    <p>{product.description}</p>
                  ) : (
                    <p className="text-gray-500 italic">No description available for this product.</p>
                  )}
                </div>
              </div>
              
              {/* Add to Cart Button */}
              <div className="mt-8">
                <button 
                  className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium text-lg 
                  ${product.inStock 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  } transition-colors`}
                  disabled={!product.inStock}
                >
                  <ShoppingCart size={20} />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
              
              {/* Additional Info */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
                <div className="flex flex-col items-center">
                  <Truck className="h-5 w-5 text-gray-700 mb-2" />
                  <span className="text-gray-700">Fast Delivery</span>
                </div>
                <div className="flex flex-col items-center">
                  <Shield className="h-5 w-5 text-gray-700 mb-2" />
                  <span className="text-gray-700">1 Year Warranty</span>
                </div>
                <div className="flex flex-col items-center">
                  <BadgeCheck className="h-5 w-5 text-gray-700 mb-2" />
                  <span className="text-gray-700">Genuine Product</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link 
            href="/ram" 
            className="inline-flex items-center gap-2 text-black hover:text-red-600 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back to All RAM Products</span>
          </Link>
        </div>
      </div>
    </div>
  )
}