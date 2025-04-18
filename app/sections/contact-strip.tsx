// components/Banner.js
import { Headphones,MessageCircle,Phone } from 'lucide-react';
import React from 'react';


const Banner = () => {
  return (
    <div className="bg-indigo-700 text-white py-6 px-8 shadow-md rounded-md">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center justify-center text-center gap-4">
        <h2 className="text-2xl md:text-3xl font-bold">
          Questions? Talk to a Specialist
        </h2>
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6">
          <div className="flex items-center gap-2 hover:underline">
            <span className="text-xl material-icons"><Phone/></span>
            <a href="tel:03332568818" className="transition hover:text-gray-200">
              03332568818
            </a>
          </div>
          <div className="flex items-center gap-2 hover:underline">
            <span className="text-xl material-icons"><Headphones/></span>
            <a href="#chat" className="transition hover:text-gray-200">
              Chat now
            </a>
          </div>
          <div className="flex items-center gap-2 hover:underline">
            <span className="text-xl material-icons"><MessageCircle/></span>
            <a href="#message" className="transition hover:text-gray-200">
              Message us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
