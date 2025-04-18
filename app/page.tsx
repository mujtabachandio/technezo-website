import Navbar from "./components/Navbar";
import HeroSection from "./sections/Hero";
import Logo from "./sections/Company";
import Strip from "./sections/contact-strip";

import ProductSection from "./sections/Prodcut";
import Footer from "./components/Footer";
export default function Home() {
  return (
   <>
    <Navbar     />
    <HeroSection />
    <ProductSection />
    <Logo />
    <Strip />
   <Footer />
   </>
  );
}
