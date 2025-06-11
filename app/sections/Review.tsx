"use client";

import React from "react";
import Reviews from "@/components/reviews";

const Review = () => {
  return (
    <section className="bg-white py-10 px-4 md:px-8">
      <div className="mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">What Our Customers Say</h2>
        <p className="text-gray-600 mb-10">
          Real feedback from real people. See why they love us!
        </p>
        <Reviews />
      </div>
    </section>
  );
};

export default Review;
