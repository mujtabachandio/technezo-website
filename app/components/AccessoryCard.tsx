'use client'

import Link from 'next/link'
import Image from 'next/image'
import urlFor from '@/sanity/lib/image'
import AccessoryClientSide from '../accessories/[slug]/addtocart'

// Define the type for the accessory
type Accessory = {
  _id: string;
  title: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  category?: string;
  slug: {
    current: string;
  };
  images: { _key: string; asset: { url: string } }[];
};

// Define the Props type for AccessoryCard
type Props = {
  accessory: Accessory;
};

export default function AccessoryCard({ accessory }: Props) {
  // Get the image URL for the accessory
  const imageUrl = urlFor(accessory.images?.[0]).url()

  return (
    <div className="border p-5 bg-white rounded-xl hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between h-full">
      <Link href={`/accessories/${accessory.slug.current}`} className="flex-grow block">
        <div className="relative w-full pt-[75%] overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt={accessory.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover absolute inset-0 transition-transform duration-500 hover:scale-105"
          />
          {accessory.discountPercentage && accessory.discountPercentage > 0 && (
            <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md text-xs font-medium">
              {accessory.discountPercentage}% OFF
            </div>
          )}
        </div>
        <div className="mt-4 space-y-2">
          <h3 className="text-lg font-bold line-clamp-2">{accessory.title}</h3>
          <p className="text-sm text-gray-600">{accessory.brand}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-red-600 font-bold text-lg">PKR {accessory.price.toLocaleString()}</p>
            {accessory.originalPrice && accessory.originalPrice > accessory.price && (
              <span className="text-gray-400 line-through text-sm">PKR {accessory.originalPrice.toLocaleString()}</span>
            )}
          </div>
          {accessory.category && (
            <p className="text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1 inline-block">{accessory.category}</p>
          )}
        </div>
      </Link>
      <div className="mt-4">
        <AccessoryClientSide
          accessory={{
            _id: accessory._id,
            title: accessory.title,
            price: accessory.price,
            image: imageUrl,
          }}
        />
      </div>
    </div>
  )
}
