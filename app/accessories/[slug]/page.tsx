import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import sanityClient from '@/sanity/lib/client';
import { singleAccessoryQuery} from '@/lib/queries';
import { LaptopAccessory } from '@/types/sanity';
import CategorySidebar from '@/app/components/CategorySidebar';
import  urlFor  from '@/sanity/lib/image';
import AddToCart from '../addtocart';

type PageProps = { params: { slug: string } };

export async function generateStaticParams() {
  const list: { slug: { current: string } }[] = await sanityClient.fetch(
    `*[_type=='laptopAccessory']{slug}`
  );
  return list.map((item) => ({ slug: item.slug.current }));
}

export default async function AccessoryPage({ params }: PageProps) {
  const accessory: LaptopAccessory | null = await sanityClient.fetch(
    singleAccessoryQuery,
    { slug: params.slug }
  );
  if (!accessory) notFound();

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 shadow-sm py-3">
        <div className="max-w-7xl mx-auto px-4 text-sm flex gap-1">
          <Link href="/">Home</Link> /{' '}
          <Link href="/accessories">Accessories</Link> /{' '}
          <span className="font-semibold text-red-600">
            {accessory.title}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:flex gap-6">
        {/* Sidebar */}
        <aside className="hidden md:block md:w-1/4 lg:w-1/5">
          <CategorySidebar
            categories={[accessory.type || 'Unknown']}
            basePath="/accessories"
            selected={accessory.type}
          />
        </aside>

        {/* Main */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative w-full h-96 bg-gray-50 rounded-lg border">
                <Image
                  src={urlFor(accessory.images[0]).width(600).height(600).url()}
                  alt={accessory.title}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {accessory.images.slice(1).map((img, idx) => (
                  <div
                    key={idx}
                    className="relative w-20 h-20 bg-gray-50 rounded border"
                  >
                    <Image
                      src={urlFor(img).width(200).height(200).url()}
                      alt={`${accessory.title} ${idx + 2}`}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {accessory.title}
              </h1>
              <p className="text-gray-600 mb-4">
                {accessory.brand}
              </p>
              <p className="text-red-600 text-2xl font-semibold mb-4">
                PKR {accessory.price.toLocaleString()}
              </p>
              <p
                className={`mb-2 ${
                  accessory.available ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {accessory.available ? 'In Stock' : 'Out of Stock'}
              </p>
              {typeof accessory.stock === 'number' && (
                <p className="text-gray-500 mb-4">
                  Stock: {accessory.stock}
                </p>
              )}
              <p className="prose prose-sm max-w-none mb-6">
                {accessory.description}
              </p>
              <AddToCart
                product={{
                  ...accessory,
                  image: urlFor(accessory.images[0]).width(600).height(600).url(),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
