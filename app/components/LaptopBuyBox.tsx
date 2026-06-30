'use client';

import { useMemo, useState } from 'react';
import { useCartStore } from '@/lib/cartStore';
import urlForImage from '@/sanity/lib/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Check } from 'lucide-react';

interface RamOption {
  label?: string;
  extraPrice?: number;
}

interface BuyBoxProduct {
  _id?: string;
  title?: string;
  price?: number;
  ram?: string;
  images?: unknown[];
  ramOptions?: RamOption[];
}

type SelectableOption = { label: string; extraPrice: number };

export default function LaptopBuyBox({ product }: { product: BuyBoxProduct }) {
  const { addToCart } = useCartStore();
  const [showNotification, setShowNotification] = useState(false);

  const basePrice = typeof product.price === 'number' ? product.price : 0;
  const baseRam = product.ram?.trim() || 'Default';

  // Build the selectable list: the base RAM first (no extra cost), followed by
  // each configured upgrade. The base RAM is skipped if it's also listed as an
  // upgrade, to avoid duplicates.
  const options: SelectableOption[] = useMemo(() => {
    const base: SelectableOption = { label: baseRam, extraPrice: 0 };
    const upgrades = (product.ramOptions ?? [])
      .filter((o): o is RamOption & { label: string } => Boolean(o && o.label))
      .map((o) => ({ label: o.label, extraPrice: o.extraPrice ?? 0 }))
      .filter((o) => o.label !== base.label);
    return [base, ...upgrades];
  }, [baseRam, product.ramOptions]);

  const [selectedLabel, setSelectedLabel] = useState(baseRam);
  const selected = options.find((o) => o.label === selectedLabel) ?? options[0];
  const totalPrice = basePrice + (selected?.extraPrice ?? 0);
  const hasChoices = options.length > 1;

  const imageUrl = useMemo(() => {
    const first = product.images?.[0];
    if (!first) return '';
    try {
      return urlForImage(first as never).width(300).height(200).url();
    } catch {
      return '';
    }
  }, [product.images]);

  const handleAddToCart = () => {
    const label = selected?.label ?? baseRam;
    addToCart({
      // Unique per RAM config so different configs are separate cart lines.
      _id: `${product._id || 'unknown'}-${label}`,
      title: `${product.title || 'Untitled Product'} — ${label} RAM`,
      price: totalPrice,
      image: imageUrl,
    });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="space-y-4">
      {/* Price */}
      <p className="text-3xl font-bold text-gray-900">
        Rs {totalPrice.toLocaleString()}
      </p>

      {/* RAM selector */}
      {hasChoices && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Choose RAM</p>
          <div className="flex flex-wrap gap-2">
            {options.map((opt) => {
              const isSelected = opt.label === selected?.label;
              return (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setSelectedLabel(opt.label)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors duration-200 ${
                    isSelected
                      ? 'border-red-600 bg-red-600 text-white'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-red-400'
                  }`}
                >
                  {opt.label}
                  {opt.extraPrice > 0 && (
                    <span className="ml-1 text-xs opacity-80">
                      +Rs {opt.extraPrice.toLocaleString()}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Add to cart + notification */}
      <div className="relative">
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
              animate={{
                opacity: 1,
                y: 0,
                transition: { type: 'spring', stiffness: 500, damping: 30 },
              }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              className="absolute top-full left-0 right-0 mt-4 bg-black text-white rounded-lg shadow-lg overflow-hidden z-10"
            >
              <div className="p-4 flex items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, transition: { delay: 0.1, type: 'spring' } }}
                  className="bg-green-500 rounded-full p-1 mr-3"
                >
                  <Check className="h-4 w-4 text-white" />
                </motion.div>

                <div className="flex-1">
                  <p className="font-medium">
                    {selected?.label ?? baseRam} RAM added to cart!
                  </p>
                  <p className="text-sm text-gray-300">
                    Rs {totalPrice.toLocaleString()} · added successfully
                  </p>
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
                animate={{ width: '100%', transition: { duration: 3, ease: 'linear' } }}
                className="h-1 bg-red-600"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
