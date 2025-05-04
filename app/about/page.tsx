// pages/about.tsx
import React from 'react';
import Head from 'next/head';
import { FaCheck, FaExchangeAlt, FaTools, FaGem, FaHandshake, FaWrench, FaEnvelope } from 'react-icons/fa';
import { HiCurrencyDollar } from 'react-icons/hi';
import { IoMdLaptop } from 'react-icons/io';
import { MdAccessibility } from 'react-icons/md';
import Navbar from '../components/Navbar';

const AboutPage: React.FC = () => {
  return (
    <>
     <Navbar/>
      <Head>
        <title>About Us | Technezo</title>
        <meta name="description" content="Learn about Technezo - your trusted destination for high-quality laptops and accessories." />
      </Head>

      {/* Hero Section */}
      <section className="bg-black text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Technezo</h1>
            <p className="text-xl md:text-2xl mb-8 italic">Your Tech. Your Zone. Technezo.</p>
            <p className="text-lg md:text-xl">
              Your trusted destination for high-quality laptops and accessories. 
              We&apos;re passionate about technology and committed to delivering top-tier products, 
              fair prices, and real support — every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Journey</h2>
            <h3 className="text-xl md:text-2xl mb-6 text-center text-red-600 font-semibold">
              From a Dining Table Spark to a Trusted Tech Destination
            </h3>
            <div className="space-y-6 text-lg">
              <p>
                In 2020, during the heart of the COVID-19 pandemic, life was changing fast — and so was the world of technology. 
                One evening, over tea at the dining table, a simple conversation turned into a powerful idea. 
                We realized how essential technology had become in everyday life — powering work, education, connection, and creativity.
              </p>
              <p>
                That moment lit a spark. With a passion for tech and a clear purpose in mind, Technezo was born — 
                built on the belief that everyone deserves access to dependable, high-performance technology backed by honest advice and genuine care.
              </p>
              <p>
                Since then, our mission has been simple: deliver more than just products — deliver trust, value, and a customer-first experience. 
                Today, Technezo is proud to serve students, professionals, gamers, and everyday users across the tech spectrum.
              </p>
              <p className="font-semibold text-center italic">
                Technezo — Inspired by a spark. Grown through trust. Focused on you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">What We Offer</h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-red-600 p-4 rounded-full mb-6">
                <IoMdLaptop className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Laptops</h3>
              <p className="text-lg">
                From powerful gaming rigs to sleek and reliable work/study laptops — 
                we have something for every need and budget.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-red-600 p-4 rounded-full mb-6">
                <MdAccessibility className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Accessories</h3>
              <p className="text-lg">
                Explore a wide range of essential and trending accessories to upgrade 
                your setup and enhance your tech experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Commitment to You</h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900 p-8 rounded-lg flex flex-col items-center text-center">
              <div className="bg-red-600 p-4 rounded-full mb-6">
                <FaExchangeAlt className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4">3-Day Return Warranty</h3>
              <p className="text-lg">
                Not fully satisfied? No worries — return your laptop within 3 days 
                in its original condition. No questions asked.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-lg flex flex-col items-center text-center">
              <div className="bg-red-600 p-4 rounded-full mb-6">
                <FaTools className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4">15-Day Checking Warranty</h3>
              <p className="text-lg">
                If your laptop shows any issues within 15 days, we&apos;ll repair or replace it — 
                free of charge. Your peace of mind is our priority.
              </p>
            </div>
          </div>
          <p className="text-lg text-center max-w-3xl mx-auto mt-12">
            With Technezo, you&apos;re not just buying a product — you&apos;re gaining confidence, reliability, and ongoing support.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Choose Technezo?</h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 flex flex-col items-center text-center">
              <div className="bg-red-600 p-3 rounded-full mb-4">
                <FaGem className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Top Quality</h3>
              <p>
                We handpick laptops and accessories from trusted brands known for their 
                performance, durability, and long-term value.
              </p>
            </div>
            <div className="p-6 flex flex-col items-center text-center">
              <div className="bg-red-600 p-3 rounded-full mb-4">
                <HiCurrencyDollar className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fair Prices</h3>
              <p>
                We believe great tech shouldn&apos;t cost a fortune. That&apos;s why we offer 
                competitive pricing without compromising on quality.
              </p>
            </div>
            <div className="p-6 flex flex-col items-center text-center">
              <div className="bg-red-600 p-3 rounded-full mb-4">
                <FaHandshake className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Friendly Support</h3>
              <p>
                Whether you&apos;re browsing or need help after your purchase, our team is 
                always here to assist you — clearly and kindly.
              </p>
            </div>
            <div className="p-6 flex flex-col items-center text-center">
              <div className="bg-red-600 p-3 rounded-full mb-4">
                <FaWrench className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">After-Sales Service</h3>
              <p>
                Our relationship doesn&apos;t end after checkout. We&apos;re with you for the long run, 
                making sure your tech keeps performing at its best.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Join the Technezo Community</h2>
            <p className="text-lg mb-8">
              We&apos;re not just a store — we&apos;re a growing community of tech lovers.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4 w-full md:w-auto">
                <FaCheck className="text-red-600 text-xl flex-shrink-0" />
                <p>Follow us on social media for the latest updates, tips, and deals.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4 w-full md:w-auto">
                <FaEnvelope className="text-red-600 text-xl flex-shrink-0" />
                <p>Subscribe to our mailing list for exclusive offers and early access to sales.</p>
              </div>
            </div>
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-4">Thank You for Choosing Technezo</h3>
              <p className="text-lg">
                We&apos;re honored to be a part of your tech journey. Whether you&apos;re upgrading or just getting started, 
                we&apos;re here to help you move forward with confidence.
              </p>
            </div>
            <div className="bg-red-600 text-white py-4 px-8 rounded-lg inline-block">
              <p className="text-lg font-semibold">
                Visit us in-store or shop online anytime —<br />
                Let&apos;s build something great together.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;