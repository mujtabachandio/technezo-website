'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import client from '@/sanity/lib/client';

interface Review {
  name: string;
  isVerified?: boolean;
  rating: number;
  reviewText: string;
  date: string;
  reviewCount?: string;
}

// Hardcoded reviews from README.md
const hardcodedReviews: Review[] = [
  {
    name: 'Mohammad Riyan',
    isVerified: true,
    rating: 5,
    reviewText: 'I recently bought a laptop from Technezo, and I was really impressed by their professionalism and excellent customer service. The best part is their 3-day return policy, which they actually honor even if you\'re simply not satisfied with the product.',
    date: '2024-12-01',
    reviewCount: '2 reviews',
  },
  {
    name: 'zaka ali',
    isVerified: true,
    rating: 5,
    reviewText: 'I have got best laptop service was excellent even after the purchase of my laptop technezo staff was personally were in contact iam very satisfied with there service and it\'s my second laptop which i have purchase from them and they offer best laptop deals and they provide value for money',
    date: '2024-12-10',
    reviewCount: '2 reviews · 2 photos',
  },
  {
    name: 'Afzal Ahmed',
    isVerified: true,
    rating: 5,
    reviewText: 'Review: Excellent Laptop Purchase Experience. I recently purchased a laptop from TECHNEZO/ Brand DELL Latitude 7470 6th generation 8/256 with 2k display Touch, and I\'m extremely satisfied with both the product and service.',
    date: '2024-07-01',
    reviewCount: '1 review · 4 photos',
  },
  {
    name: 'Zaheer Ahmed',
    isVerified: true,
    rating: 5,
    reviewText: 'I bought a laptop from here, the quality is excellent and it had a 3 day replacement warranty. I even got it replaced myself, even though I went after 4 days. They also provide a 15-day checking warranty. Their service and way of dealing are the best.',
    date: '2024-12-10',
    reviewCount: '1 review',
  },
  {
    name: 'Rizwan Mumtaz',
    isVerified: true,
    rating: 5,
    reviewText: 'I am giving it five stars because Alhamdulillah I have bought 8 to 10 laptops from this shop for my czns and friends and I have not had any problems. Their dealing style is also very good. Along with a three-day return policy, they are also providing excellent after-sales service.',
    date: '2024-06-01',
    reviewCount: '1 review · 1 photo',
  },
  {
    name: 'Roshni Bharwani',
    isVerified: true,
    rating: 5,
    reviewText: 'I recently purchased a laptop and I\'m blown away by its performance considering the price i think I got an excellent deal the laptop is really good and I\'m loving it so far',
    date: '2024-12-10',
    reviewCount: '1 review · 1 photo',
  },
  {
    name: 'Mayur Assnani',
    isVerified: true,
    rating: 5,
    reviewText: 'First I bought an HP laptop from Technezo, and the quality plus service were so impressive that it forced me to buy a Dell laptop within the next two weeks. Both arrived safe and sound through TCS courier, saving me time and money. On top of that, their customer service is outstanding.',
    date: '2024-10-01',
    reviewCount: '1 review',
  },
  {
    name: 'S M',
    isVerified: true,
    rating: 5,
    reviewText: 'After searching Regal centre, I meet Mr. Haresh at Technezo.. He guide us properly and gave best options that comes under our budget and we finalise one.. He is very genuine and promised nothing extra where in the market people made false promises.',
    date: '2024-12-17',
    reviewCount: 'Local Guide · 4 reviews · 2 photos',
  },
  {
    name: 'Ahmed Awan',
    isVerified: true,
    rating: 5,
    reviewText: 'I recently purchased a laptop from this shop and I must say, I had a great experience. The staff was extremely polite, helpful, and genuinely guided me in selecting the right device according to my needs. The person I dealt with was very professional.',
    date: '2024-08-01',
    reviewCount: '1 review',
  },
  {
    name: 'Ayub Nazeer',
    isVerified: true,
    rating: 5,
    reviewText: 'I have been a customer of TECHNEZO from 3 years and have bought 3 laptops from them. I am very satisfied with the quality and performance of their laptops. One great thing is that they recommend the best options based on your preferences at reasonable prices.',
    date: '2024-08-01',
    reviewCount: '1 review',
  },
  {
    name: 'Muhammad Qasim',
    isVerified: true,
    rating: 5,
    reviewText: 'I\'ve been a satisfied customer of Haresh Bhai l for more than 4 years. He\'s a great person who offers really reasonable prices. The 3-day return and 15 day checking policy is unmatched in the market. Highly recommended!',
    date: '2024-11-01',
    reviewCount: '6 reviews',
  },
  {
    name: 'Akber Ali',
    isVerified: true,
    rating: 5,
    reviewText: 'I am a shopkeeper and have frequently purchased goods from them for my store. To date, I have not encountered any issues with the products, and the quality has consistently met my expectations. My experience with them has been highly satisfactory and professional.',
    date: '2024-11-01',
    reviewCount: '1 review',
  },
  {
    name: 'Anees Ahmed',
    isVerified: true,
    rating: 5,
    reviewText: 'I\'ve visited this computer store multiple times and every experience has been nothing short of excellent. From their in-store staff to their online service, they\'ve consistently delivered top-notch customer care. I\'ve purchased laptops both online and in-store.',
    date: '2024-10-01',
    reviewCount: 'Local Guide · 151 reviews · 366 photos',
  },
  {
    name: 'Hasnain Ali',
    isVerified: true,
    rating: 5,
    reviewText: 'I recently bought a used laptop from Technezo and had a great experience. The owner was professional, transparent, and took time to explain everything clearly. The laptop quality exceeded my expectations.',
    date: '2024-07-01',
    reviewCount: '4 reviews',
  },
  {
    name: 'Harshi Kesh',
    isVerified: true,
    rating: 5,
    reviewText: 'Bought a laptop from Mr. Haresh and I\'m honestly loving it. Great deal, fair price, and the laptop works perfectly. Smooth experience overall. Highly recommended!',
    date: '2024-12-17',
    reviewCount: '1 review',
  },
  {
    name: 'Syed Ammad Shah',
    isVerified: true,
    rating: 5,
    reviewText: 'I bought 2 laptops from their shop. They give a 3 day money back warranty, which I liked the most. They talk nicely and are very helpful. Really good service!',
    date: '2024-08-01',
    reviewCount: '1 review',
  },
];

// Default values (fallback if CMS data not available)
const defaultOverallRating = 4.9;
const defaultTotalReviews = 209;

export default function GoogleReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [overallRating, setOverallRating] = useState(defaultOverallRating);
  const [totalReviews, setTotalReviews] = useState(defaultTotalReviews);

  // Fetch overall rating and total reviews from Sanity CMS
  useEffect(() => {
    async function fetchReviewStats() {
      try {
        const data = await client.fetch(`
          *[_type == "googleReviews"][0]{
            overallRating,
            totalReviews
          }
        `);
        
        if (data) {
          if (data.overallRating !== undefined) {
            setOverallRating(data.overallRating);
          }
          if (data.totalReviews !== undefined) {
            setTotalReviews(data.totalReviews);
          }
        }
      } catch (error) {
        console.error('Error fetching review stats:', error);
        // Keep default values on error
      }
    }
    
    fetchReviewStats();
  }, []);

  const reviewsData = {
    overallRating,
    totalReviews,
    reviews: hardcodedReviews,
  };

  const reviewsPerPage = 3;
  const totalPages = Math.ceil(reviewsData.reviews.length / reviewsPerPage);
  const currentReviews = reviewsData.reviews.slice(
    currentIndex * reviewsPerPage,
    (currentIndex + 1) * reviewsPerPage
  );

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return '1 day ago';
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 14) return '1 week ago';
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      if (diffDays < 60) return '1 month ago';
      if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
      return '1 year ago';
    } catch {
      return 'Recently';
    }
  };

  const getProfileInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const getProfileColor = (name: string) => {
    const colors = [
      'bg-purple-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-red-500',
      'bg-teal-500',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <section className="bg-white py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            {/* Google Logo */}
            <div className="flex items-center space-x-2">
              <Image
                src="/google-logo.webp"
                alt="Google"
                width={92}
                height={30}
                className="h-7 w-auto"
                priority
              />
              <span className="text-xl md:text-2xl font-normal text-gray-900">Reviews</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            {/* Rating Section */}
            <div className="flex items-center space-x-2">
              <span className="text-3xl md:text-4xl font-normal text-gray-900">
                {reviewsData.overallRating.toFixed(1)}
              </span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 md:w-6 md:h-6 ${
                      i < Math.floor(reviewsData.overallRating)
                        ? 'text-yellow-400 fill-current'
                        : i < reviewsData.overallRating
                        ? 'text-yellow-400 fill-current opacity-50'
                        : 'text-gray-300'
                    }`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 text-base md:text-lg">
                ({reviewsData.totalReviews.toLocaleString()})
              </span>
            </div>

            {/* Review Button */}
            <a
              href="https://www.google.com/maps/place/Technezo/data=!4m2!3m1!1s0x0:0x2fbed304f83f1391?sa=X&ved=1t:2428&ictx=111"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 rounded-md font-medium transition-colors text-sm md:text-base"
            >
              Review us on Google
            </a>
          </div>
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          {/* Left Arrow */}
          {totalPages > 1 && (
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-10 bg-white rounded-full p-1.5 md:p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
            </button>
          )}

          {/* Reviews Container */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 md:px-0"
              >
                {currentReviews.map((review, idx) => (
                  <div
                    key={`${review.name}-${idx}`}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    {/* Profile Header */}
                    <div className="flex items-start space-x-3 mb-3">
                      <div className="relative flex-shrink-0">
                        <div
                          className={`w-10 h-10 rounded-full ${getProfileColor(
                            review.name
                          )} flex items-center justify-center text-white font-semibold text-sm relative`}
                        >
                          {getProfileInitial(review.name)}
                          <div className="absolute bottom-0 right-0 w-4 h-4 bg-white rounded-full flex items-center justify-center border border-gray-200">
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="#4285F4"
                              className="w-3 h-3"
                            >
                              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1">
                          <h4 className="font-medium text-gray-900 text-sm truncate">
                            {review.name}
                          </h4>
                          {review.isVerified && (
                            <Check className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{formatDate(review.date)}</p>
                        {review.reviewCount && (
                          <p className="text-xs text-gray-400 mt-0.5">{review.reviewCount}</p>
                        )}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-sm text-gray-700 line-clamp-3">{review.reviewText}</p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Arrow */}
          {totalPages > 1 && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 z-10 bg-white rounded-full p-1.5 md:p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              aria-label="Next reviews"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
            </button>
          )}
        </div>

        {/* Pagination Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-6">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-gray-600 w-8' : 'bg-gray-300'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

