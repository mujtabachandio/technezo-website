import Link from 'next/link'
import Image from 'next/image'
import { LaptopAccessory } from '@/types/sanity'

export default function AccessoryCard({ accessory }: { accessory: LaptopAccessory }) {
  return (
    <Link
      href={`/accessories/${accessory.slug.current}`}
      className="block bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition"
    >
      <div className="relative w-full h-48">
        <Image
          src={accessory.images[0]?.asset.url || '/placeholder-image.jpg'}
          alt={accessory.title}
          fill
          className="object-contain p-4"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{accessory.title}</h3>
        <p className="text-sm text-gray-600">{accessory.brand}</p>
        <p className="text-red-600 font-bold mt-2">PKR {accessory.price}</p>
      </div>
    </Link>
  )
}
