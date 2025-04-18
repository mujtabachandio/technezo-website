'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/lib/cartStore';
import { motion } from 'framer-motion';
import { CreditCard, ChevronRight, ArrowLeft, Upload, Copy } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, loadCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<'bank' | null>(null);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const bankDetails = [
    {
      name: 'Meezan Bank',
      accountTitle: 'Technezo',
      accountNumber: '01780106647118',
      iban: 'PK46MEZN0001780106647118',
    },
    {
      name: 'Bank Al Habib',
      accountTitle: 'Technezo',
      accountNumber: '11000981004341010',
      iban: 'PK24BAHL1100098100434101',
    },
    {
      name: 'Alfalah Bank',
      accountTitle: 'Technezo',
      accountNumber: '02121007798554',
      iban: 'PK28ALFH0212001007798554',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black text-white py-6 px-4 md:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center">
            <a href="/cart" className="flex items-center text-gray-300 hover:text-white mr-4">
              <ArrowLeft size={20} className="mr-2" />
              <span>Back to Cart</span>
            </a>
            <h1 className="text-2xl md:text-3xl font-bold">Checkout</h1>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 order-2 lg:order-1"
          >
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4 pb-3 border-b border-gray-200">Order Summary</h2>

              <div className="max-h-80 overflow-y-auto mb-4 pr-2">
                {cart.map((item) => (
                  <div key={item._id} className="flex py-3 border-b border-gray-100 last:border-0">
                    <div className="bg-gray-100 rounded w-16 h-16 flex items-center justify-center mr-3">
                      <span className="text-gray-400 text-xs">Image</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-gray-500 text-sm">Qty: 1</p>
                      <p className="text-red-600 font-medium">Rs {item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Payment Options */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 order-1 lg:order-2"
          >
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>

              {/* Bank Transfer Option */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setPaymentMethod('bank')}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  paymentMethod === 'bank'
                    ? 'border-red-600 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      paymentMethod === 'bank' ? 'border-red-600' : 'border-gray-400'
                    }`}
                  >
                    {paymentMethod === 'bank' && (
                      <div className="w-3 h-3 rounded-full bg-red-600"></div>
                    )}
                  </div>

                  <div className="flex items-center justify-between flex-1">
                    <div className="flex items-center">
                      <CreditCard className="mr-3 text-gray-700" size={20} />
                      <div>
                        <p className="font-medium">Bank Transfer</p>
                        <p className="text-sm text-gray-500">Transfer to our bank account</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </div>
                </div>

                {paymentMethod === 'bank' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-4 border-t border-gray-200"
                  >
                    <div className="mb-4">
                      <p className="font-bold text-gray-700 mb-3">Select Bank Account</p>
                      <div className="space-y-3">
                        {bankDetails.map((bank) => (
                          <div
                            key={bank.name}
                            onClick={() => setSelectedBank(bank.name)}
                            className={`border p-3 rounded-md cursor-pointer ${
                              selectedBank === bank.name
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">{bank.name}</p>
                                <p className="text-sm text-gray-500">Account Title: {bank.accountTitle}</p>
                              </div>
                              {selectedBank === bank.name && (
                                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                              )}
                            </div>

                            {selectedBank === bank.name && (
                              <div className="mt-3 space-y-2">
                                <div className="flex justify-between items-center bg-gray-50 p-2 rounded-md">
                                  <p className="text-sm">Account Number:</p>
                                  <div className="flex items-center">
                                    <p className="font-medium">{bank.accountNumber}</p>
                                    <button
                                      type="button"
                                      onClick={() => copyToClipboard(bank.accountNumber)}
                                      className="ml-2 text-gray-500 hover:text-gray-700"
                                    >
                                      <Copy size={16} />
                                    </button>
                                  </div>
                                </div>

                                <div className="flex justify-between items-center bg-gray-50 p-2 rounded-md">
                                  <p className="text-sm">IBAN:</p>
                                  <div className="flex items-center">
                                    <p className="font-medium">{bank.iban}</p>
                                    <button
                                      type="button"
                                      onClick={() => copyToClipboard(bank.iban)}
                                      className="ml-2 text-gray-500 hover:text-gray-700"
                                    >
                                      <Copy size={16} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-sm text-yellow-800 rounded">
                      After sending the payment, please send the receipt, your shipping address, and product name via WhatsApp.
                    </div>

                    <a
                      href={`https://wa.me/03332568818?text=${encodeURIComponent(
                        `Hello, I have sent the payment.\nHere is my receipt and details:\n\nName: \nAddress: \nProduct: `
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md"
                    >
                      <Upload className="mr-2" size={18} />
                      Send Receipt on WhatsApp
                    </a>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
