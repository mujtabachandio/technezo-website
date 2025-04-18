import  client  from '@/sanity/lib/client';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

const ImageGallery = dynamic(() => import('@/app/components/ImageGallery'), {
  ssr: false,
});


// ─── Static Params (SSG) ─────────────────────────────── //
export async function generateStaticParams() {
  const slugs = await client.fetch(`*[_type == "laptop"]{ "slug": slug.current }`);
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

// ─── Page Component ───────────────────────────────────── //
export default async function LaptopDetailPage({ params }: { params: { slug: string } }) {
  const laptop = await client.fetch(`*[_type == "laptop" && slug.current == $slug][0]`, {
    slug: params.slug,
  });

  if (!laptop) return notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ─── Breadcrumbs ───────────────────────── */}
      <nav className="flex items-center text-sm font-medium text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-900 transition-colors duration-200">
          Home
        </Link>
        <span className="mx-2">{'>'}</span>
        <Link href="/shop" className="hover:text-gray-900 transition-colors duration-200">
          Shop
        </Link>
        <span className="mx-2">{'>'}</span>
        <span className="text-gray-900">{laptop.title}</span>
      </nav>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        {/* ─── Product Header ───────────────────── */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-8 border-b border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900">{laptop.title}</h1>
          <div className="flex items-center mt-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 ml-auto">
              {laptop.condition}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* ─── Image Gallery ───────────────────── */}
          <div className="p-6 border-r border-gray-200">
            {laptop.images?.length > 0 ? (
              <ImageGallery images={laptop.images} title={laptop.title} />
            ) : (
              <div className="bg-gray-100 rounded-xl p-4 flex items-center justify-center h-80">
                <p className="text-gray-500">No image available</p>
              </div>
            )}
          </div>

          {/* ─── Laptop Details ───────────────────── */}
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <p className="text-3xl font-bold text-gray-900">
                  Rs {laptop.price?.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">Inclusive of all taxes</p>
              </div>

              <div className="text-green-600 text-sm font-medium flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                In Stock - Ready to Ship
              </div>
            </div>

            <div className="border-t border-b border-gray-200 py-6">
              <dl className="grid grid-cols-1 gap-y-4">
                {[
                  ['Brand', laptop.brand],
                  ['Processor', laptop.processor],
                  ['GPU', laptop.gpu],
                  ['RAM', laptop.ram],
                  ['Storage', laptop.storage],
                  ['Screen Size', laptop.screenSize ? `${laptop.screenSize}"` : null],
                  ['Resolution', laptop.resolution],
                  ['OS', laptop.os],
                  ['Warranty', laptop.warranty],
                  ['Generation', laptop.generation],
                ].map(([label, value], idx) =>
                  value ? (
                    <div className="grid grid-cols-3 gap-4" key={idx}>
                      <dt className="text-sm font-medium text-gray-500">{label}</dt>
                      <dd className="text-sm text-gray-900 col-span-2 font-medium">{value}</dd>
                    </div>
                  ) : null
                )}
              </dl>
            </div>

            <div className="space-y-4">
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75L3 10.5m0 0L2.25 14.25M3 10.5h18M21.75 6.75L21 10.5m0 0l.75 3.75M21 10.5H3"
                  />
                </svg>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
