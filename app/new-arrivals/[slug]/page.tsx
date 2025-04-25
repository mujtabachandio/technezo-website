import client from '@/sanity/lib/client';
import urlFor from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCart from '../addtocart';

// Define the type for slug items
type SlugItem = {
  slug: {
    current: string;
  };
};

// Define the type for the data fetched in NewArrivalDetail
type NewArrivalLaptop = {
  _id: string;
  title: string;
  brand: string;
  model?: string;
  price: number;
  originalPrice?: number;
  images: { _type: string; asset: { _ref: string } }[];
  processor?: string;
  ram?: string;
  storage?: string;
  generation?: string;
};

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const slugs: SlugItem[] = await client.fetch(`*[_type == "newArrivalLaptop"]{ slug }`);
  return slugs.map((item) => ({ slug: item.slug.current }));
}

export default async function NewArrivalDetail({ params }: Props) {
  const data: NewArrivalLaptop | null = await client.fetch(
    `*[_type == "newArrivalLaptop" && slug.current == $slug][0]`,
    { slug: params.slug }
  );

  if (!data) return notFound();

  const mainImageUrl = urlFor(data.images?.[0]).width(600).height(400).url();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-red-600">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
              <Link href="/new-arrivals" className="ml-1 text-sm font-medium text-gray-500 hover:text-red-600 md:ml-2">
                New Arrivals
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-700 truncate max-w-xs md:ml-2">{data.title}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="bg-white p-2 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="relative aspect-video">
              <Image
                src={mainImageUrl}
                alt={data.title}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-4 gap-2">
            {data.images?.map((img, i) => (
              <div key={i} className="border border-gray-200 rounded-lg overflow-hidden hover:border-red-500 transition-colors">
                <div className="relative aspect-square">
                  <Image
                    src={urlFor(img).width(150).height(150).url()}
                    alt={`${data.title} - Image ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="150px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          {/* Badge */}
          <div className="mb-3">
            <span className="bg-red-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-full">New Arrival</span>
          </div>

          {/* Title and Basic Info */}
          <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>
          <p className="text-gray-600 mb-2">{data.brand} {data.model ? `- ${data.model}` : ''}</p>
          <div className="mt-2 mb-6">
            <span className="text-2xl font-bold text-red-600">Rs. {data.price?.toLocaleString()}</span>
            {data.originalPrice && (
              <span className="ml-2 text-gray-500 line-through">Rs. {data.originalPrice?.toLocaleString()}</span>
            )}
          </div>

          {/* Add to Cart Button */}
          <div className="mb-8">
            <AddToCart
              product={{
                _id: data._id,
                title: data.title,
                price: data.price,
                image: mainImageUrl,
              }}
            />
          </div>

          {/* Specs */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-6">
            <h2 className="font-bold text-lg mb-3 text-gray-900">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
              {data.processor && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                  </svg>
                  <div>
                    <span className="text-gray-600 text-sm">Processor</span>
                    <p className="font-medium text-black">{data.processor}</p>
                  </div>
                </div>
              )}
              {data.generation && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  <div>
                    <span className="text-gray-600 text-sm">Generation</span>
                    <p className="font-medium text-black">{data.generation}</p>
                  </div>
                </div>
              )}
              {data.ram && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 8l4 4m0 0l-4 4m4-4H10"></path>
                  </svg>
                  <div>
                    <span className="text-gray-600 text-sm">RAM</span>
                    <p className="font-medium text-black">{data.ram}</p>
                  </div>
                </div>
              )}
              {data.storage && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v2m6 3v2m-6-5v2m6 4v2m-6 3v2m-6-1H3"></path>
                  </svg>
                  <div>
                    <span className="text-gray-600 text-sm">Storage</span>
                    <p className="font-medium text-black">{data.storage}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
