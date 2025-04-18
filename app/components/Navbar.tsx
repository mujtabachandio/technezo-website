//app/components/Navbar.tsx
"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Heart} from 'lucide-react';

import { useCartStore } from '@/lib/cartStore';



export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close categories dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setCategoryOpen(false);
    };

    if (categoryOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [categoryOpen]);

  // Navigation items
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Deals', href: '/deals' },
    { name: 'New Arrivals', href: '/new-arrivals' },
    { name: 'Support', href: '/support' },
    { name: 'shop', href: '/shop' },
  ];

  // Categories for laptop shop
  

  const { cart, loadCart } = useCartStore();

  useEffect(() => {
    loadCart(); // Load the cart from localStorage on component mount
  }, [loadCart]);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black shadow-lg' : 'bg-black bg-opacity-90'
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
          <div className="flex-shrink-0 flex items-center">
            <motion.a 
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white font-bold text-xl"
            >
              TECH<span className="text-red-600">NEZO</span>
            </motion.a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {/* Regular nav items */}
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
          </nav>

          {/* Right icons */}
          <div className="flex items-center space-x-4">
            
            {/* Cart with item count */}
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

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black bg-opacity-95 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-800">
              {/* Mobile Categories Section */}
              {/* Regular navigation items */}
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-white hover:bg-red-600 rounded-md text-base font-medium"
                  whileTap={{ backgroundColor: "#EF4444" }}
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.a
                href="/wishlist"
                className="flex items-center px-3 py-2 text-white hover:bg-red-600 rounded-md text-base font-medium"
                whileTap={{ backgroundColor: "#EF4444" }}
              >
                <Heart size={18} className="mr-2" />
                Wishlist
              </motion.a>
            </div>
          </motion.div>
        )}
    
      </AnimatePresence>

    </header>
  );
}