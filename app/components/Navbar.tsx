"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/lib/cartStore";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false); // For desktop hover
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false); // For mobile toggle

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about" },
    { name: "Shop", href: "/shop" },
  ];

  const categoryItems = [
    { name: "Deals", href: "/deals" },
    { name: "New Arrivals", href: "/new-arrivals" },
    { name: "Laptop Accessories", href: "/accessories" },
  ];

  const { cart, loadCart } = useCartStore();
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black shadow-lg" : "bg-black bg-opacity-90"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-red-500 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 text-white font-bold text-xl"
          >
            <Image
              src="/web-logo.png"
              alt="Technezo Logo"
              width={150}
              height={400}
              className="rounded-full object-contain"
              priority
            />
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-white hover:text-red-500 px-1 py-2 text-sm font-medium"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.a>
            ))}

            {/* Categories Dropdown (Desktop) */}
            <div
              className="relative"
              onMouseEnter={() => setCategoryOpen(true)}
              onMouseLeave={() => setCategoryOpen(false)}
            >
              <button className="flex items-center text-white hover:text-red-500 text-sm font-medium">
                Categories <ChevronDown size={16} className="ml-1" />
              </button>
              <AnimatePresence>
                {categoryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 mt-2 w-48 bg-black shadow-lg rounded-md z-50"
                  >
                    {categoryItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-white hover:bg-red-600"
                      >
                        {item.name}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Cart Icon */}
          <div className="flex items-center space-x-4">
            <motion.a
              href="/cart"
              className="text-white hover:text-red-500 relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </motion.a>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black bg-opacity-95 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-800">
              {/* Mobile nav items */}
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-white hover:bg-red-600 rounded-md text-base font-medium"
                >
                  {item.name}
                </motion.a>
              ))}

              {/* Mobile Categories Toggle */}
              <button
                onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
                className="w-full text-left px-3 py-2 text-white hover:bg-red-600 rounded-md flex items-center justify-between"
              >
                Categories <ChevronDown size={16} />
              </button>
              <AnimatePresence>
                {mobileCategoryOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="pl-6 space-y-1"
                  >
                    {categoryItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 text-white hover:bg-red-600 rounded-md text-base font-medium"
                      >
                        {item.name}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
