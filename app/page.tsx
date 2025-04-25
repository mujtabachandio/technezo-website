'use client';

import { useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './sections/Hero';
import Logo from './sections/Company';
import Strip from './sections/contact-strip';
import ProductSection from './sections/Prodcut'; // fixed typo
import Footer from './components/Footer';

export default function Home() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <Navbar />
      <HeroSection />
      <ProductSection />
      <Logo />
      
      {/* Elfsight Widget */}
      <div className="elfsight-app-898d2430-f5ef-4290-a471-b2948fade6ba" data-elfsight-app-lazy></div>

      <Strip />
      <Footer />
    </>
  );
}
