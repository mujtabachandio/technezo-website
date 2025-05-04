import Link from 'next/link';
import Image from 'next/image';
import sanityClient from '@/sanity/lib/client';
import { allAccessoriesQuery, accessoriesByCategoryQuery } from '@/lib/queries';
import { LaptopAccessory } from '@/types/sanity';
import CategorySidebar from '@/app/components/CategorySidebar';
import  urlFor  from '@/sanity/lib/image';

export default async function AccessoriesPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = searchParams.category;
  const accessories: LaptopAccessory[] = category
    ? await sanityClient.fetch(accessoriesByCategoryQuery, { category })
    : await sanityClient.fetch(allAccessoriesQuery);

  const types = Array.from(
    new Set(accessories.map((a) => a.type).filter((t): t is string => !!t))
  );

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-7xl mx-auto p-4 md:flex gap-6">
        <aside className="hidden md:block md:w-1/4 lg:w-1/5">
          <CategorySidebar
            categories={types}
            basePath="/accessories"
            selected={category}
          />
        </aside>

        <main className="flex-1">
          <h1 className="text-3xl font-bold mb-6 border-b-2 border-red-600 inline-block">
            {category ? `${category} Accessories` : 'All Accessories'}
          </h1>

          {accessories.length === 0 ? (
            <p className="text-gray-600">No accessories found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {accessories.map((accessory) => (
                <Link
                  key={accessory._id}
                  href={`/accessories/${accessory.slug.current}`}
                  className="block bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition"
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={
                        accessory.images[0]
                          ? urlFor(accessory.images[0]).width(400).height(300).url()
                          : '/placeholder-image.png'
                      }
                      alt={accessory.title}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">
                      {accessory.title}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {accessory.brand}
                    </p>
                    <p className="mt-2 text-red-600 font-bold">
                      PKR {accessory.price.toLocaleString()}
                    </p>
                    {!accessory.available && (
                      <p className="text-red-500 text-sm mt-1">
                        Out of Stock
                      </p>
                    )}
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
