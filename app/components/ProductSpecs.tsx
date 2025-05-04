// components/ProductSpecs.tsx
'use client';

import { useState } from 'react';
import type { StorageDevice } from '@/app/storage/[slug]/page';

type ProductSpecsProps = {
  device: StorageDevice;
};

export default function ProductSpecs({ device }: ProductSpecsProps) {
  const [activeTab, setActiveTab] = useState('specifications');

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('specifications')}
          className={`flex-1 py-3 px-4 text-center font-medium text-sm ${
            activeTab === 'specifications'
              ? 'bg-red-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Specifications
        </button>
        <button
          onClick={() => setActiveTab('performance')}
          className={`flex-1 py-3 px-4 text-center font-medium text-sm ${
            activeTab === 'performance'
              ? 'bg-red-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Performance
        </button>
      </div>

      {/* Tab content */}
      <div className="p-6">
        {activeTab === 'specifications' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold mb-4 text-gray-900">General Information</h3>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-gray-600">Brand</td>
                    <td className="py-3 font-medium text-gray-900">{device.brand}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-gray-600">Type</td>
                    <td className="py-3 font-medium text-gray-900">{device.type}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-gray-600">Capacity</td>
                    <td className="py-3 font-medium text-gray-900">{device.capacity} GB</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-gray-600">Interface</td>
                    <td className="py-3 font-medium text-gray-900">{device.interface || 'N/A'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-gray-900">Features</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-red-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>
                    {device.type === 'SSD' && 'No moving parts for increased reliability'}
                    {device.type === 'HDD' && 'Traditional storage with large capacity at lower cost'}
                    {device.type === 'NVMe' && 'Ultra-fast PCIe interface for maximum performance'}
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-red-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>
                    {device.capacity >= 1000 ? 'Ideal for large file storage and backup' : 'Perfect for operating system and applications'}
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-red-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Compatible with most modern computers and laptops</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900">Performance Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Read/Write Speeds</h4>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 text-gray-600