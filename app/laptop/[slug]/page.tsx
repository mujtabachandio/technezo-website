import  client  from '@/sanity/lib/client';
import Link from 'next/link';
import dynamicImport from 'next/dynamic';
import { notFound } from 'next/navigation';
import AddToCart from '@/app/new-arrivals/addtocart';

// Force dynamic rendering to always fetch fresh price data (bypasses SSG cache)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const ImageGallery = dynamicImport(() => import('@/app/components/ImageGallery'), {
  ssr: false,
});

// ─── Static Params (SSG) ─────────────────────────────── //
export async function generateStaticParams() {
  const slugs = await client.fetch(`*[_type == "laptop"]{ "slug": slug.current }`);
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

// ─── Page Component ───────────────────────────────────── //
export default async function LaptopDetailPage({ params }: { params: { slug: string } }) {
  // Fetch with no CDN for price-critical data to ensure fresh values
  // Explicitly select price field to ensure we get the correct value
  const laptop = await client.withConfig({ useCdn: false }).fetch(
    `*[_type == "laptop" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      brand,
      model,
      processor,
      generation,
      ram,
      storage,
      gpu,
      displaySize,
      screenSize,
      resolution,
      touchScreen,
      os,
      warranty,
      condition,
      price,
      images,
      description,
      available,
      featured,
      isGaming
    }`,
    { slug: params.slug }
  );

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
            </div>

            <div className="border-t border-b border-gray-200 py-6">
              <dl className="grid grid-cols-1 gap-y-4">
                {[
                  ['Brand', laptop.brand],
                  ['Processor', laptop.processor],
                  ['Generation', laptop.generation],
                  ['RAM', laptop.ram],
                  ['Storage', laptop.storage],
                  ['Screen Size', laptop.screenSize ? `${laptop.screenSize}"` : null],
                  ['GPU', laptop.gpu],
                  ['Resolution', laptop.resolution],
                  ['OS', laptop.os],
                  ['Warranty', laptop.warranty],
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
              <AddToCart product={laptop} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
