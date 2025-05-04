// pages/warranty.tsx
import React from 'react';
import Head from 'next/head';
import { FaShieldAlt, FaExchangeAlt, FaTools, FaExclamationTriangle, FaShoppingBag, FaPhoneAlt, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const WarrantyPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Warranty & Return Policy | Technezo</title>
        <meta name="description" content="Learn about Technezo's warranty coverage and return policies to ensure a confident shopping experience." />
      </Head>

      {/* Hero Section */}
      <section className="bg-black text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Warranty & Return Policy</h1>
            <p className="text-lg md:text-xl">
              At <span className="font-bold">Technezo</span>, your satisfaction is our top priority. 
              Were committed to offering dependable products with straightforward, fair policies.
            </p>
          </div>
        </div>
      </section>

      {/* Warranty Coverage Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-red-600 p-3 rounded-full mr-4">
                <FaShieldAlt className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Warranty Coverage</h2>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8 shadow-md">
              <h3 className="text-xl font-bold mb-3">15-Day Warranty</h3>
              <p className="text-lg mb-6">
                All laptops include a 15-day warranty. If you experience any functional or technical 
                issues within this period, our support team is ready to help resolve the problem.
              </p>

              <h3 className="text-xl font-bold mb-3">Same Model Replacement</h3>
              <p className="text-lg">
                If a verified issue arises during the warranty period and cannot be resolved, 
                we will replace the laptop with the same model—subject to availability.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4">Warranty Exclusions:</h3>
              <p className="text-lg mb-4">The following are not covered under warranty:</p>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start">
                  <span className="text-red-600 mr-3 mt-1">•</span>
                  <span>Physical damage from drops, mishandling, or impact</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-3 mt-1">•</span>
                  <span>Any display-related issues or screen damage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-3 mt-1">•</span>
                  <span>Electrical damage, including faults from power surges or misuse</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Return & Replacement Policy Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-red-600 p-3 rounded-full mr-4">
                <FaExchangeAlt className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Return & Replacement Policy</h2>
            </div>
            
            <div className="bg-white rounded-lg p-6 mb-8 shadow-md">
              <h3 className="text-xl font-bold mb-3">3-Day Replacement Window</h3>
              <p className="text-lg">
                You may request a replacement within the first 3 days of purchase—no questions asked—provided 
                the laptop is returned in the <span className="font-bold">same condition</span> as sold.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4">Eligibility for Return or Warranty Claim:</h3>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start">
                  <span className="text-red-600 mr-3 mt-1">•</span>
                  <span>The item must be returned in its original condition and packaging</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-3 mt-1">•</span>
                  <span>Proof of purchase (invoice or receipt) is mandatory</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-3 mt-1">•</span>
                  <span>The issue must fall within the scope of warranty coverage</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How to Claim Warranty Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-red-600 p-3 rounded-full mr-4">
                <FaTools className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">How to Claim Warranty</h2>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Contact Us:</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <div className="flex items-center mr-6">
                    <FaPhoneAlt className="text-red-600 mr-2" />
                    <FaWhatsapp className="text-red-600" />
                  </div>
                  <span className="text-lg"><span className="font-semibold">Phone/WhatsApp:</span> 0333-2568818 | 0345-3773999</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-red-600 mr-4" />
                  <span className="text-lg"><span className="font-semibold">Email:</span> technezo@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">Assessment:</h3>
                <p className="text-lg">
                  Our technical team will inspect the laptop to verify the reported issue.
                </p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">Resolution:</h3>
                <p className="text-lg">
                  Depending on the assessment, we will either:
                </p>
                <ul className="mt-3 space-y-2 text-lg">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 mt-1">•</span>
                    <span>Resolve the issue</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 mt-1">•</span>
                    <span>Replace it with the same model (if available)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 mt-1">•</span>
                    <span>Or take the appropriate action in line with our policy</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notes Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-red-600 p-3 rounded-full mr-4">
                <FaExclamationTriangle className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Important Notes</h2>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 shadow-md">
              <ul className="space-y-4 text-lg">
                <li className="flex items-start">
                  <span className="text-red-600 mr-3 mt-1">•</span>
                  <span>
                    Warranty is valid <span className="font-bold">for 15 days</span> from the date of purchase. 
                    Claims after this period will not be accepted.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-3 mt-1">•</span>
                  <span>
                    <span className="font-bold">Returns due to change of mind</span> are accepted only within 
                    the <span className="font-bold">first 3 days</span> of purchase.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-3 mt-1">•</span>
                  <span>
                    Any <span className="font-bold">unauthorized repairs, tampering with warranty stickers, or alterations</span> will 
                    void the warranty.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-3 mt-1">•</span>
                  <span>
                    <span className="font-bold">Damage caused by mishandling or electrical issues</span> is not covered under 
                    the warranty.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Shop with Confidence Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-red-600 p-3 rounded-full">
                <FaShoppingBag className="text-white text-2xl" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-6">Shop with Confidence</h2>
            <p className="text-lg mb-8">
              At <span className="font-bold">Technezo</span>, we aim to provide a seamless and dependable shopping experience. 
              If you have any questions, concerns, or need support, our team is always here to assist you.
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default WarrantyPage;