"use client";

import React, { useEffect } from "react";

const Review = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="bg-white py-10 px-4 md:px-8">
      <div className=" mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">What Our Customers Say</h2>
        <p className="text-gray-600 mb-10">
          Real feedback from real people. See why they love us!
        </p>
        <div className=" overflow-hidden">
          <div
            className="elfsight-app-11370709-3213-41b4-89ed-686c1515b079"
            data-elfsight-app-lazy
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Review;
