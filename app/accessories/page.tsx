import sanityClient from '@/sanity/lib/client';
import { allAccessoriesQuery, accessoriesByCategoryQuery, allAccessoryCategoriesQuery } from '@/lib/queries';
import { LaptopAccessory } from '@/types/sanity';
import AccessoryCard from '../components/AccessoryCard';
import AccessorySidebar from '@/app/components/CategorySidebar';
import Link from 'next/link';

export default async function AccessoriesPage({ searchParams }: { searchParams: { category?: string } }) {
  const category = searchParams?.category;
  
  const accessories: LaptopAccessory[] = category
    ? await sanityClient.fetch(accessoriesByCategoryQuery, { category })
    : await sanityClient.fetch(allAccessoriesQuery);

  const categoriesRaw: string[] = await sanityClient.fetch(allAccessoryCategoriesQuery);
  const categories = [...new Set(categoriesRaw.filter(Boolean))];  // Remove any falsey values

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white py-3 px-6 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center text-sm">
            <Link href="/" className="text-gray-600 hover:text-red-600 transition">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/accessories" className={`${!category ? 'font-medium text-red-600' : 'text-gray-600 hover:text-red-600 transition'}`}>
              Accessories
            </Link>
            {category && (
              <>
                <span className="mx-2 text-gray-400">/</span>
                <span className="font-medium text-red-600">{category}</span>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-black border-b-2 border-red-600 pb-2 inline-block">
          {category ? `${category} Accessories` : 'Laptop Accessories'}
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:hidden mb-4">
            <details className="bg-white rounded-xl border shadow-sm">
              <summary className="cursor-pointer p-4 font-bold text-xl flex justify-between items-center">
                Categories
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-4 pb-4">
                <AccessorySidebar categories={categories} />
              </div>
            </details>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {accessories.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-xl border">
                <p className="text-gray-600">No accessories found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {accessories.map(accessory => (
                  <AccessoryCard key={accessory._id} accessory={accessory} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
