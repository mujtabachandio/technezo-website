import sanityClient from '@/sanity/lib/client';
import { singleDealQuery } from '@/lib/queries';
import { LaptopDeal } from '@/types/sanity';
import Image from 'next/image';
import Link from 'next/link';
import Addtocart from '../../accessories/[slug]/addtocart';
import { ChevronRight, Home, Clock, Tag, Check, ShoppingCart, Award, Truck, Shield } from 'lucide-react';
import { format } from 'date-fns';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const slugs: { slug: { current: string } }[] = await sanityClient.fetch(`*[_type == "laptopDeal"]{slug}`);
  return slugs.map(({ slug }) => ({ slug: slug.current }));
}

export default async function DealDetailPage({ params }: Props) {
  const deal: LaptopDeal = await sanityClient.fetch(singleDealQuery(params.slug));

  if (!deal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-auto border border-gray-100">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Tag className="h-10 w-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Deal Not Found</h2>
          <p className="text-gray-600 mb-8">The deal youre looking for doesnt exist or has been removed.</p>
          <Link href="/deals" className="bg-red-600 text-white px-8 py-3 rounded-xl hover:bg-red-700 transition shadow-md inline-flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Browse All Deals
          </Link>
        </div>
      </div>
    );
  }

  // Calculate savings
  const savings = deal.originalPrice - deal.discountedPrice;
  const savingsPercentage = Math.round((savings / deal.originalPrice) * 100);

  // Format dates
  const startDate = new Date(deal.startDate);
  const endDate = new Date(deal.endDate);
  const now = new Date();
  const isActive = startDate <= now && now <= endDate;
  const isDealEnded = now > endDate;
  const isDealUpcoming = now < startDate;
  
  // Calculate days left
  const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner with Breadcrumbs */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm mb-4 text-red-100">
            <Link href="/" className="flex items-center hover:text-white transition">
              <Home size={16} className="mr-1" />
              <span>Home</span>
            </Link>
            <ChevronRight size={14} className="mx-2 text-red-200" />
            <Link href="/deals" className="hover:text-white transition">Deals</Link>
            <ChevronRight size={14} className="mx-2 text-red-200" />
            <span className="font-medium truncate max-w-xs">{deal.title}</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">{deal.title}</h1>
            
            <div className="mt-3 md:mt-0">
              <div className={`inline-flex items-center rounded-full px-4 py-1.5 ${
                isDealEnded ? 'bg-gray-700' : 
                isDealUpcoming ? 'bg-blue-600' : 
                'bg-green-600'
              }`}>
                <Clock size={16} className="mr-2" />
                <span className="font-medium">
                  {isDealEnded ? 'Deal has ended' : 
                   isDealUpcoming ? `Starts ${format(startDate, 'MMM d')}` : 
                   daysLeft <= 1 ? 'Ends today!' : `${daysLeft} days left`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-10">
          {/* Left Column - Images */}
          <div className="lg:col-span-7">
            {/* Deal Card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              {/* Sale Tag */}
              {isActive && (
                <div className="absolute z-10 top-4 left-4">
                  <div className="bg-red-600 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-md">
                    SALE {deal.discountPercentage}% OFF
                  </div>
                </div>
              )}
              
              {/* Main Image */}
              {deal.dealBanner?.asset?.url ? (
                <div className="relative aspect-[16/9] bg-white">
                  <Image
                    src={deal.dealBanner.asset.url}
                    alt={deal.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain p-6"
                    priority
                  />
                </div>
              ) : (
                <div className="aspect-[16/9] bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}

              {/* Gallery Images */}
              {deal.dealImages && deal.dealImages.length > 0 && (
                <div className="p-4 bg-gray-50 border-t border-gray-100">
                  <div className="grid grid-cols-4 gap-3">
                    {deal.dealImages.slice(0, 4).map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-white">
                        <Image
                          src={image.asset.url}
                          alt={`${deal.title} - Image ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 25vw, 15vw"
                          className="object-contain p-2 hover:scale-110 transition-transform duration-300 cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Deal Details Section */}
            <div className="mt-8 bg-white rounded-2xl p-6 lg:p-8 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Award className="h-6 w-6 text-red-600 mr-2" />
                Deal Highlights
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
                  <div className="bg-red-50 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
                    <Tag className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Premium Value</h3>
                  <p className="text-gray-600 text-sm mt-2">
                    Save {savingsPercentage}% on premium products
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
                  <div className="bg-red-50 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
                    <Clock className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Limited Time</h3>
                  <p className="text-gray-600 text-sm mt-2">
                    Special pricing for a limited period
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
                  <div className="bg-red-50 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
                    <Truck className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Fast Shipping</h3>
                  <p className="text-gray-600 text-sm mt-2">
                    Free shipping within Pakistan
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Deal Info */}
          <div className="lg:col-span-5 mt-8 lg:mt-0">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                {/* Price information */}
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm font-bold mr-3">
                      {deal.discountPercentage}% OFF
                    </div>
                    {isDealEnded ? (
                      <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm font-medium">Ended</span>
                    ) : isDealUpcoming ? (
                      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">Coming Soon</span>
                    ) : daysLeft <= 3 ? (
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">Ending Soon</span>
                    ) : (
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">Active Deal</span>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-baseline">
                      <span className="text-3xl md:text-4xl font-extrabold text-gray-900">Rs {deal.discountedPrice.toLocaleString()}</span>
                      <span className="ml-3 text-lg text-gray-500 line-through">Rs {deal.originalPrice.toLocaleString()}</span>
                    </div>
                    <div className="mt-2 text-green-600 font-medium">
                      You save: Rs {savings.toLocaleString()}
                    </div>
                  </div>
                </div>
                
                {/* Description */}
                {deal.description && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">About This Deal</h3>
                    <p className="text-gray-700">{deal.description}</p>
                  </div>
                )}
                
                {/* Deal features */}
                <div className="mb-6 border-t border-gray-100 pt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Deal Benefits</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check size={18} className="text-green-500 mt-0.5" />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-700">Special limited time offer with exclusive pricing</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check size={18} className="text-green-500 mt-0.5" />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-700">Free shipping within Pakistan on all included products</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check size={18} className="text-green-500 mt-0.5" />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-700">30-day money-back guarantee for complete satisfaction</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check size={18} className="text-green-500 mt-0.5" />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-700">1-year standard warranty on all products</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Deal validity */}
                <div className="text-sm text-gray-500 mb-6">
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1.5" />
                    <span>Valid from {format(startDate, 'MMMM d, yyyy')} to {format(endDate, 'MMMM d, yyyy')}</span>
                  </div>
                </div>
                
                {/* Add to cart */}
                <div className="mt-6">
                  {isDealEnded ? (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
                      <p className="text-gray-600 font-medium mb-3">This deal has expired</p>
                      <Link href="/deals" className="inline-flex items-center text-red-600 hover:text-red-700 font-medium">
                        <Tag className="mr-1.5 h-4 w-4" />
                        Browse other deals
                      </Link>
                    </div>
                  ) : isDealUpcoming ? (
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-center">
                      <p className="text-blue-700 font-medium mb-3">This deal will be available soon</p>
                      <button 
                        className="w-full bg-blue-100 text-blue-700 px-5 py-3 rounded-xl font-medium hover:bg-blue-200 transition cursor-not-allowed"
                        disabled
                      >
                        Available from {format(startDate, 'MMM d')}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Addtocart
                        accessory={{
                          _id: deal._id,
                          title: deal.title,
                          price: deal.discountedPrice,
                          image: deal.dealBanner?.asset?.url || '',
                        }}
                      />
                      
                      <div className="flex items-center justify-center pt-2">
                        <Shield className="h-4 w-4 text-gray-500 mr-1.5" />
                        <span className="text-sm text-gray-500">Secure checkout</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              
            </div>
          </div>
        </div>
        
        {/* Customer confidence section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-10">Why Choose This Deal?</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-red-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Tag className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Best Price</h3>
              <p className="text-gray-600 text-sm">
                Guaranteed lowest prices with savings up to {savingsPercentage}%
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Quality Assured</h3>
              <p className="text-gray-600 text-sm">
                All products are authentic with full warranty support
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Truck className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">
                Quick and reliable shipping across Pakistan
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Easy Purchase</h3>
              <p className="text-gray-600 text-sm">
                Simple checkout with multiple secure payment options
              </p>
            </div>
          </div>
          
          {!isDealEnded && !isDealUpcoming && (
            <div className="mt-12 text-center">
              <Link 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('.sticky')?.scrollIntoView({behavior: 'smooth'});
                }}
                className="bg-red-600 text-white px-8 py-4 rounded-xl hover:bg-red-700 transition shadow-md inline-flex items-center text-lg font-medium"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Get This Deal Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}