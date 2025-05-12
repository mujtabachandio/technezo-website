import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

const Address: React.FC = () => {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Our Location</h2>
          <div className="w-20 h-1 bg-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-md">
            Visit us at our office or get in touch through the following details.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Address Information */}
          <div className="bg-gray-50 p-8 rounded-2xl shadow-xl border-l-4 border-red-600">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              {/* Logo & Address */}
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-red-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <Image 
                    src="/main-logo.jpg"
                    alt="Technezo Logo"
                    width={160}
                    height={160}
                    className="mb-3 rounded shadow-md"
                  />
                  <p className="text-gray-700 leading-relaxed">
                    Shop #G38, Regal Trade Square,<br />
                    Regal Chowk, Near Skin Hospital,<br />
                    Saddar, Karachi, Pakistan
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Google Map */}
          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
            <iframe
              title="Google Map"
              className="w-full h-[400px]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.087644837801!2d67.0243043!3d24.860856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f00ca56cb07%3A0x2fbed304f83f1391!2sTechnezo!5e0!3m2!1sen!2s!4v1747066838226!5m2!1sen!2s"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Address;
