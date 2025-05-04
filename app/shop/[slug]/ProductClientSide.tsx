'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Check } from 'lucide-react';

// Define the Product type
interface Product {
  _id?: string;
  title?: string;
  price?: number;
  description?: string;
  image?: string;
  [key: string]: string | number | boolean | undefined; // Limiting to known types
}

interface ProductClientSideProps {
  product: Product;
}

export default function ProductClientSide({ product }: ProductClientSideProps) {
  const { addToCart } = useCartStore();
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const handleAddToCart = () => {
    addToCart({
      _id: product._id || 'unknown', // Fallback for _id if not provided
      title: product.title || 'Untitled Product', // Fallback for title
      price: product.price || 0, // Fallback to 0 if price is undefined
      image: product.image || '', // Fallback to an empty string if image is undefined
    });
    setShowNotification(true);

    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div className="mt-4 relative">
      <button
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 w-full flex items-center justify-center"
        onClick={handleAddToCart}
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        Add to Cart
      </button>

      {/* Custom animated notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { type: 'spring', stiffness: 500, damping: 30 },
            }}
            exit={{
              opacity: 0,
              y: -10,
              transition: { duration: 0.2 },
            }}
            className="absolute top-full left-0 right-0 mt-4 bg-black text-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-4 flex items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  transition: { delay: 0.1, type: 'spring' },
                }}
                className="bg-green-500 rounded-full p-1 mr-3"
              >
                <Check className="h-4 w-4 text-white" />
              </motion.div>

              <div className="flex-1">
                <p className="font-medium">{product.title || 'Product'} added to cart!</p>
                <p className="text-sm text-gray-300">Your item has been added successfully</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowNotification(false)}
                className="ml-2 text-gray-400 hover:text-white"
              >
                ✕
              </motion.button>
            </div>

            <motion.div
              initial={{ width: '0%' }}
              animate={{
                width: '100%',
                transition: { duration: 3, ease: 'linear' },
              }}
              className="h-1 bg-red-600"
            ></motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
