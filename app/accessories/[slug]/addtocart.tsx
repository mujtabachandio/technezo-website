'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Check } from 'lucide-react';

interface Accessory {
  _id?: string;
  title?: string;
  price?: number;
  image?: string;
  [key: string]: string | number | boolean | undefined;
}

interface Props {
  accessory: Accessory;
}

export default function AccessoryClientSide({ accessory }: Props) {
  const { addToCart } = useCartStore();
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      _id: accessory._id || 'unknown-id',
      title: accessory.title || 'Untitled Accessory',
      price: accessory.price || 0,
      image: accessory.image || '',
    });

    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="mt-2 relative">
      <button
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 w-full flex items-center justify-center"
        onClick={handleAddToCart}
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        Add to Cart
      </button>

      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-4 bg-black text-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-4 flex items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, transition: { delay: 0.1 } }}
                className="bg-green-500 rounded-full p-1 mr-3"
              >
                <Check className="h-4 w-4 text-white" />
              </motion.div>
              <div className="flex-1">
                <p className="font-medium">{accessory.title} added to cart!</p>
                <p className="text-sm text-gray-300">Accessory added successfully</p>
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
