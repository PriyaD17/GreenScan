// src/app/components/ResultDisplay.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ProductInfo } from '@/app/api/product-info/route';

interface ResultDisplayProps {
  data: ProductInfo;
  onScanAgain: () => void;
}

// Helpers for styling the badges
const mainColorClasses = {
  green: 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700',
  yellow: 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700',
  red: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-200 dark:border-red-700',
  gray: 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600',
};

const nutrientLevelClasses = {
  low: 'bg-green-100 text-green-800',
  moderate: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

// A helper to format text consistently
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function ResultDisplay({ data, onScanAgain }: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.barcode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Left Side: Image */}
        {data.imageUrl && (
            <div className="md:w-1/3 p-4 flex-shrink-0">
                <Image
                    src={data.imageUrl}
                    alt={data.productName || 'Product Image'}
                    width={200}
                    height={300}
                    className="rounded-lg object-cover w-full h-auto"
                />
            </div>
        )}

        {/* Right Side: Details */}
        <div className="w-full p-6 flex flex-col justify-between">
          <div>
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{data.brand}</div>
            <h1 className="block mt-1 text-2xl leading-tight font-bold text-black dark:text-white">{data.productName}</h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">{data.quantity}</p>
          </div>
          <span  className='text-lg mt-2'>
            
            Eco Score
                
            </span>
          <div className={`mt-4 w-full text-center p-3 rounded-lg font-semibold text-lg border ${mainColorClasses[data.color]}`}>
            {data.ecoScoreLabel}
          </div>
        </div>
      </div>

      {/* Accordion-style details below the main card */}
      <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4">
        {/* At a Glance */}
        {data.nutrientLevels && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">At a Glance</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {Object.entries(data.nutrientLevels).map(([key, value]) => (
                <span key={key} className={`px-2 py-1 text-xs font-bold rounded-full ${nutrientLevelClasses[value as keyof typeof nutrientLevelClasses] || 'bg-gray-200'}`}>
                  {capitalize(key.replace('-', ' '))} is {value}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Nutrition Facts */}
        {data.nutriments && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Nutrition Facts (per 100g)</h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-2">
              {Object.entries(data.nutriments)
                .filter(([, value]) => value !== undefined)
                .map(([key, value]) => (
                  <li key={key}>{capitalize(key.replace('-', ' '))} : {value} {key === 'energy-kcal' ? 'kcal' : 'g'}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Ingredients */}
        {data.ingredientsText && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Ingredients</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{data.ingredientsText}</p>
          </div>
        )}

        {/* Allergens */}
        {data.allergens && data.allergens.length > 0 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900 dark:border-red-700">
                <h3 className="font-bold text-red-800 dark:text-red-200">Allergen Information</h3>
                <p className="text-red-700 dark:text-red-300 mt-1">
                    Contains: {data.allergens.map(a => a.replace('en:', '')).join(', ')}
                </p>
            </div>
        )}
      </div>

      {/* Action Buttons Footer */}
      <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex gap-4">
        <button
          onClick={handleCopy}
          className="flex-1 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors disabled:bg-green-500"
          disabled={copied}
        >
          {copied ? 'Copied!' : 'Copy Barcode'}
        </button>
        <button
          onClick={onScanAgain}
          className="flex-1 px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
        >
          Scan Again
        </button>
      </div>
    </div>
  );
}