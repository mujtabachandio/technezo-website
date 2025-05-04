
import sanityClient from '@/sanity/lib/client';
import { allDealsQuery, dealsByCategoryQuery } from '@/lib/queries';
import { LaptopDeal } from '@/types/sanity';
import Image from 'next/image';
import Link from 'next/link';
import { Home, ChevronRight, Clock } from 'lucide-react';
import { format } from 'date-fns';

export default async function DealsPage({ searchParams }: { searchParams: { category?: string } }) {
  const category = searchParams?.category;
  const deals: LaptopDeal[] = category
    ? await sanityClient.fetch(dealsByCategoryQuery, { category })
    : await sanityClient.fetch(allDealsQuery);

  // Function to format deal expiry info
  const getDealTimingInfo = (startDate: string, endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    
    if (now > end) {
      return { status: 'expired', text: 'Expired' };
    }
    
    const start = new Date(startDate);
    if (now < start) {
      return { 
        status: 'upcoming', 
        text: `Starts ${format(start, 'MMM d')}` 
      };
    }
    
    const daysLeft = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return { 
      status: 'active', 
      text: daysLeft <= 1 ? 'Ends today!' : `${daysLeft} days left` 
    };
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 py-3 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center text-sm">
            <Link href="/" className="flex items-center text-gray-600 hover:text-red-600">
              <Home size={16} className="mr-1" />
              <span>Home</span>
            </Link>
            <ChevronRight size={14} className="mx-2 text-gray-400" />
            {category ? (
              <>
                <Link href="/deals" className="text-gray-600 hover:text-red-600">Deals</Link>
                <ChevronRight size={14} className="mx-2 text-gray-400" />
                <span className="text-red-600 font-medium">{category}</span>
              </>
            ) : (
              <span className="text-red-600 font-medium">Deals</span>
            )}
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-black">
            {category ? `${category} Deals` : 'Laptop Deals'}
          </h1>
          <p className="mt-2 text-gray-600">
            Discover the best deals and save big on your next purchase
          </p>
        </div>

        {/* Filter Chips (optional) */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Link href="/deals" className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!category ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
            All Deals
          </Link>
          {['Gaming', 'Business', 'Student'].map((cat) => (
            <Link 
              key={cat} 
              href={`/deals?category=${cat}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === cat ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {deals.length > 0 ? (
            deals.map((deal) => {
              const timingInfo = getDealTimingInfo(deal.startDate, deal.endDate);
              
              return (
                <Link key={deal._id} href={`/deals/${deal.slug.current}`} className="group">
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition duration-300 h-full flex flex-col">
                    <div className="relative">
                      {deal.dealBanner?.asset?.url ? (
                        <div className="aspect-[16/9] relative overflow-hidden">
                          <Image
                            src={deal.dealBanner.asset.url}
                            alt={deal.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition duration-300"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[16/9] bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                      <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 m-3 rounded-full text-sm font-bold">
                        {deal.discountPercentage}% OFF
                      </div>
                    </div>
                    
                    <div className="p-4 flex-1 flex flex-col">
                      <h2 className="text-lg font-semibold text-black group-hover:text-red-600 transition-colors line-clamp-2">
                        {deal.title}
                      </h2>
                      
                      {deal.description && (
                        <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                          {deal.description}
                        </p>
                      )}
                      
                      <div className="mt-auto pt-4">
                        <div className="flex items-baseline">
                          <span className="line-through text-gray-500 text-sm mr-2">
                            Rs {deal.originalPrice.toLocaleString()}
                          </span>
                          <span className="text-red-600 font-bold text-xl">
                            Rs {deal.discountedPrice.toLocaleString()}
                          </span>
                        </div>
                        
                        <div className={`flex items-center mt-2 text-xs ${
                          timingInfo.status === 'active' ? 'text-green-600' : 
                          timingInfo.status === 'upcoming' ? 'text-blue-600' : 'text-gray-500'
                        }`}>
                          <Clock size={14} className="mr-1" />
                          <span>{timingInfo.text}</span>
                        </div>
                        
                        <div className="mt-3 inline-block">
                          <span className={`text-white text-sm px-3 py-1 rounded ${
                            timingInfo.status === 'expired' ? 'bg-gray-500' : 'bg-black'
                          }`}>
                            {timingInfo.status === 'expired' ? 'Deal Ended' : 'View Deal'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No deals found in this category.</p>
              <Link href="/deals" className="mt-4 inline-block text-red-600 hover:underline">
                View all deals
              </Link>
            </div>
          )}
        </div>
        
        {/* Sign up Banner */}
        <div className="mt-12 bg-black text-white p-8 rounded-xl">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-3">Dont Miss Out on Exclusive Deals</h3>
            <p className="mb-6 text-gray-300">Sign up for our newsletter to receive the latest deals and promotions directly to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}