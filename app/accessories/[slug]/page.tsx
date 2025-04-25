import client from '@/sanity/lib/client'
import { singleAccessoryQuery } from '@/lib/queries'
import Image from 'next/image'
import urlFor from '@/sanity/lib/image'
import Addtocart from '../../accessories/[slug]/addtocart'
import Link from 'next/link'

// Define the type for the accessory
type Accessory = {
  _id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: { _key: string; asset: { url: string } }[];
  category?: string;
  brand?: string;
  type?: string;
  connectivity?: string;
  warranty?: string;
};

// Define the Props type for the page
type Props = { params: { slug: string } }

export async function generateStaticParams() {
  // Define the type of fetched data
  const data: { slug: { current: string } }[] = await client.fetch(
    `*[_type == "laptopAccessory"]{slug}`
  )
  return data.map((item) => ({ slug: item.slug.current }))
}

export default async function AccessoryPage({ params }: Props) {
  // Fetch the accessory data using the slug
  const accessory: Accessory | null = await client.fetch(singleAccessoryQuery, { slug: params.slug })

  // Ensure we have all the required data before rendering
  if (!accessory) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center p-6">
          <div className="h-8 w-64 bg-gray-200 rounded mb-6"></div>
          <div className="h-64 w-64 bg-gray-200 rounded-lg mb-6"></div>
          <div className="h-4 w-48 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  // Make sure we have an image before attempting to use it
  const mainImageUrl = accessory.images && accessory.images.length > 0
    ? urlFor(accessory.images[0]).url()
    : '/placeholder-image.jpg'

  // Get additional images if available
  const additionalImages = accessory.images && accessory.images.length > 1
    ? accessory.images.slice(1).map((img) => urlFor(img).url())
    : []

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto py-3 px-4">
          <div className="text-sm overflow-x-auto whitespace-nowrap">
            <Link href="/" className="text-gray-500 hover:text-red-600 transition">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/accessories" className="text-gray-500 hover:text-red-600 transition">Accessories</Link>
            {accessory.category && (
              <>
                <span className="mx-2 text-gray-400">/</span>
                <Link href={`/accessories?category=${encodeURIComponent(accessory.category)}`} className="text-gray-500 hover:text-red-600 transition">
                  {accessory.category}
                </Link>
              </>
            )}
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-red-600 font-medium">{accessory.title}</span>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-6 px-4">
        <Link href="/accessories" className="inline-flex items-center text-red-600 hover:text-red-700 mb-6 transition group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Accessories
        </Link>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 md:p-8">
            {/* Mobile view heading */}
            <h1 className="text-2xl md:text-3xl font-bold text-black mb-2 md:hidden">{accessory.title}</h1>
            <p className="text-red-600 font-bold text-xl mb-4 md:hidden">PKR {accessory.price?.toLocaleString()}</p>
            
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Product Images */}
              <div className="w-full lg:w-1/2">
                <div className="aspect-square relative w-full bg-white rounded-lg overflow-hidden mb-4 border">
                  <Image
                    src={mainImageUrl}
                    alt={accessory.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-contain p-4"
                    priority
                  />
                </div>
                
                {/* Additional images if available */}
                {additionalImages.length > 0 && (
                  <div className="grid grid-cols-5 gap-2">
                    <div className="aspect-square relative bg-white rounded border cursor-pointer">
                      <Image
                        src={mainImageUrl}
                        alt={accessory.title}
                        fill
                        sizes="(max-width: 768px) 20vw, 100px"
                        className="object-contain p-2"
                      />
                      <div className="absolute inset-0 border-2 border-red-600 rounded pointer-events-none"></div>
                    </div>
                    
                    {additionalImages.map((img, index) => (
                      <div key={index} className="aspect-square relative bg-white rounded border cursor-pointer hover:border-red-600 transition">
                        <Image
                          src={img}
                          alt={`${accessory.title} - Image ${index + 2}`}
                          fill
                          sizes="(max-width: 768px) 20vw, 100px"
                          className="object-contain p-2"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Product Info */}
              <div className="w-full lg:w-1/2">
                {/* Desktop view heading */}
                <div className="hidden md:block">
                  <h1 className="text-3xl font-bold text-black mb-2">{accessory.title}</h1>
                  <div className="flex items-center mb-4">
                    <span className="bg-red-100 text-red-600 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                      {accessory.category || accessory.type}
                    </span>
                    <span className="text-gray-500">{accessory.brand}</span>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                  <div className="hidden md:block">
                    <p className="text-2xl font-bold text-red-600">PKR {accessory.price?.toLocaleString()}</p>
                    {accessory.originalPrice && accessory.originalPrice > accessory.price && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 line-through text-sm">PKR {accessory.originalPrice?.toLocaleString()}</span>
                        <span className="bg-red-600 text-white text-xs px-1.5 py-0.5 rounded">
                          Save {Math.round(((accessory.originalPrice - accessory.price) / accessory.originalPrice) * 100)}%
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center text-sm text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    In Stock
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="prose prose-sm max-w-none text-gray-700">
                    <p>{accessory.description}</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <h3 className="text-lg font-semibold">Specifications</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                    {accessory.brand && (
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600">Brand:</span>
                        <span className="font-medium text-black">{accessory.brand}</span>
                      </div>
                    )}
                    {accessory.type && (
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium text-black">{accessory.type}</span>
                      </div>
                    )}
                    {accessory.connectivity && (
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600">Connectivity:</span>
                        <span className="font-medium text-black">{accessory.connectivity}</span>
                      </div>
                    )}
                    {accessory.warranty && (
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600">Warranty:</span>
                        <span className="font-medium text-black">{accessory.warranty}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                  <div className="mb-4">
                    <Addtocart
                      accessory={{
                        _id: accessory._id,
                        title: accessory.title,
                        price: accessory.price,
                        image: mainImageUrl,
                      }}
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-6">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
                      </svg>
                      <span className="text-sm">Need Help? Call our support at +92-xxxx-xxxxxx</span>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">Free Delivery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
