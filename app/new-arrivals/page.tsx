import client from "@/sanity/lib/client";
import urlFor from "@/sanity/lib/image";
import Link from "next/link";
import Image from "next/image";
import AddToCart from "./addtocart";

type Laptop = {
  _id: string;
  title: string;
  slug: { current: string };
  brand: string;
  price: number;
  ram: string;
  processor: string;
  images: string[];
};

export default async function NewArrivalsPage() {
  const laptops: Laptop[] = await client.fetch(`
    *[_type == "newArrivalLaptop"] | order(_createdAt desc){
      _id, title, slug, brand, price, ram, processor, images
    }
  `);

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
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-700 md:ml-2">New Arrivals</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Page Title */}
      <div className="border-b border-gray-200 pb-4 mb-8">
        <h1 className="text-3xl font-extrabold text-black">New Arrivals</h1>
        <p className="mt-2 text-gray-600">Discover our latest collection of premium laptops</p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {laptops.map((laptop) => {
          const mainImageUrl = urlFor(laptop.images?.[0]).width(400).height(300).url();
          return (
            <div key={laptop._id} className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <Link href={`/new-arrivals/${laptop.slug.current}`}>
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={mainImageUrl}
                      alt={laptop.title}
                      width={400}
                      height={300}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 text-xs font-semibold uppercase rounded-bl-lg">
                    New
                  </div>
                </Link>
              </div>

              <div className="p-4">
                <Link href={`/new-arrivals/${laptop.slug.current}`}>
                  <h2 className="text-lg font-bold text-gray-900 hover:text-red-600 transition-colors duration-200 line-clamp-1">{laptop.title}</h2>
                  <p className="text-gray-500 font-medium mt-1">{laptop.brand}</p>
                  
                  <div className="mt-3 space-y-1">
                    <p className="text-sm text-gray-700 flex items-center">
                      <span className="w-20 text-gray-500">Processor:</span> 
                      <span className="font-medium">{laptop.processor}</span>
                    </p>
                    <p className="text-sm text-gray-700 flex items-center">
                      <span className="w-20 text-gray-500">RAM:</span> 
                      <span className="font-medium">{laptop.ram}</span>
                    </p>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-red-600 font-bold text-xl">Rs. {laptop.price.toLocaleString()}</p>
                  </div>
                </Link>

                <div className="mt-4">
                  <AddToCart
                    product={{
                      _id: laptop._id,
                      title: laptop.title,
                      price: laptop.price,
                      image: mainImageUrl,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {laptops.length === 0 && (
        <div className="text-center py-16">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No new arrivals yet</h3>
          <p className="mt-1 text-sm text-gray-500">Check back soon for our latest laptops.</p>
        </div>
      )}
    </div>
  );
}