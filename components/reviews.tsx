'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
  isLocalGuide?: boolean;
}

const reviews: Review[] = [
  {
    author: "Arsalan Abbassi",
    rating: 5,
    text: "I purchased two laptops from Technezo I liked their service and impressed with 3 days money back policy.. highly recommended",
    date: "6 months ago"
  },
  {
    author: "Parkash Mohan",
    rating: 5,
    text: "Completely satisfied! Product and service highly recommend. Mr Harish is very helpful and accommodating.",
    date: "2 weeks ago"
  },
  {
    author: "Sumair Peter",
    rating: 5,
    text: "I'm a regular here and always happy with my purchases. Great selection, friendly staff!",
    date: "2 weeks ago"
  },
  {
    author: "Lajpat Rai",
    rating: 5,
    text: "I Buy Approx 8 Laptops in A Year and It was Great Experience their Quality Is Outclass They will Give You Affordable Rates according To Market.",
    date: "6 months ago"
  },
  {
    author: "kashif elahi",
    rating: 5,
    text: "My overall experience is good. Whenever I deal with them. They treat very well the way they cooprate. The way they claim warranty it's really amazing. Their staff is good as well.",
    date: "5 months ago"
  },
  {
    author: "Apsara Bhatia",
    rating: 5,
    text: "I always buy laptops from Technezo, and I've always relied on them. Their laptops are trustworthy, and I highly recommend checking them out for anyone looking for reliable devices.",
    date: "5 months ago"
  },
  {
    author: "Irshad Noor",
    rating: 5,
    text: "Service is really amazing. They gave return warranty for several days which was not given by anyone. And last but no least his personality is such an amazing the way of talking is very polite, behavior.",
    date: "6 months ago"
  },
  {
    author: "Muhammad Asim Aziz",
    rating: 5,
    text: "Great service! The owner was kind, honest and fixed my laptop quickly at a fair price. Highly recommend!",
    date: "6 months ago"
  },
  {
    author: "Faizan Ali",
    rating: 5,
    text: "Astonishing Service, and the owner Mr. Haresh is an amazing person, sharing the best techs in his capacity, a trusted person, without any doubt. ❤️❤️",
    date: "3 months ago",
    isLocalGuide: true
  },
  {
    author: "Danish",
    rating: 5,
    text: "Highly knowledgeable staff, found the perfect laptop for my needs, best price in town, amazing customer service and went above and beyond to help me choose the right laptop.",
    date: "5 months ago"
  },
  {
    author: "faheem uddin",
    rating: 5,
    text: "100% Satisfied with the services of TECHNEZO, I am very very impressed with the services, and return policy",
    date: "a month ago"
  },
  {
    author: "Gian Chand",
    rating: 5,
    text: "We got wonderful laptops from Technezo I personally recommend for good price and good product",
    date: "5 months ago"
  },
  {
    author: "vishal lohana",
    rating: 5,
    text: "Great dealing with kind hospitality, and budget friendly prices literally I had wonderful experience. It's must recommended",
    date: "3 months ago"
  },
  {
    author: "DR.MADAN LAL",
    rating: 5,
    text: "ONLY TRUSTED PLACE TO BUY PREMIUM QUALITY LAPTOPS AND ACCESSORIES, WITH FULL RETURN POLICY. I BOUGHT MANY LAPTOPS AND SATISFIED. THANKS GOD BLESS",
    date: "6 months ago"
  },
  {
    author: "Jarar Alee",
    rating: 5,
    text: "Bought laptops from this shop couple of times. Very much recommended.",
    date: "5 months ago",
    isLocalGuide: true
  }
];

export default function Reviews() {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const currentReviews = reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Customer Reviews</h2>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {currentReviews.map((review, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                  {review.author.charAt(0)}
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-lg">{review.author}</h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xl ${
                          i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{review.text}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{review.date}</span>
                {review.isLocalGuide && (
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
                    Local Guide
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
} 