'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/lib/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingCart, AlertCircle } from 'lucide-react';

export default function CartPage() {
  const { cart, loadCart, removeFromCart } = useCartStore();

  useEffect(() => {
    loadCart(); // Load the cart from localStorage on component mount
  }, [loadCart]);

  const handleRemove = (productId: string) => {
    removeFromCart(productId); // Remove the product from the cart by ID
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0); // Calculate total price
  };

  function push(url: string): void {
    window.location.href = url; // Navigate to the specified URL
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-black text-white py-8 px-6 md:px-12"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <ShoppingCart size={32} className="text-red-600" />
            <h1 className="text-3xl md:text-4xl font-bold">Your Cart</h1>
          </div>
          <p className="mt-2 text-gray-300">Review and update your selected items</p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {cart.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="bg-gray-100 p-6 rounded-full mb-4">
              <AlertCircle size={48} className="text-red-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven&lsquo;t added any products yet.</p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/shop"
              className="bg-red-600 text-white px-6 py-3 rounded font-medium"
            >
              Continue Shopping
            </motion.a>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AnimatePresence>
                {cart.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white border border-gray-200 rounded-lg mb-4 overflow-hidden shadow hover:shadow-md transition-shadow"
                  >
                    <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-gray-100 rounded-md w-16 h-16 flex items-center justify-center">
                          {/* Placeholder for product image */}
                          <span className="text-gray-400 text-xs">Image</span>
                        </div>
                        <div>
                          <h2 className="text-lg font-bold">{item.title}</h2>
                          <p className="text-red-600 font-medium">Rs {item.price.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center mt-4 md:mt-0">
                        <div className="flex items-center border rounded mr-4">
                          <button className="px-3 py-1 hover:bg-gray-100">-</button>
                          <span className="px-3 py-1">1</span>
                          <button className="px-3 py-1 hover:bg-gray-100">+</button>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleRemove(item._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 size={20} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-black text-white p-6 rounded-lg sticky top-4"
              >
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Subtotal</span>
                    <span>Rs {calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Shipping</span>
                    <span>tax</span>
                  </div>
                  <div className="border-t border-gray-700 pt-3 mt-3">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-red-500">Rs {calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-medium transition-colors"
                  onClick={() => push('/checkout')}
                >
                  
                  Proceed to Checkout
                </motion.button>
                
                <div className="mt-6 text-center">
                  <a href="/shop" className="text-gray-300 hover:text-white text-sm inline-flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Continue Shopping
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
