
'use client';

import { useState } from 'react';
import type { ProductInfo } from '@/app/api/product-info/route'; // Import the type

interface ResultDisplayProps {
  data: ProductInfo;
  onScanAgain: () => void;
}

// Helper to get Tailwind CSS classes based on color
const colorClasses = {
  green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
};

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
    <div className="flex flex-col items-center gap-4 p-6 border rounded-lg shadow-lg bg-white dark:bg-gray-800 w-full max-w-md">
    
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
        {data.productName}
      </h2>

      {/* Eco Score */}
      <div className={`w-full text-center p-3 rounded-lg font-semibold text-lg ${colorClasses[data.color]}`}>
        {data.ecoScoreLabel}
      </div>

      {/* Barcode Display */}
      <div className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-center break-words">
        <p className="text-xs text-gray-500 dark:text-gray-400">Barcode</p>
        <p className="text-gray-800 dark:text-gray-200 font-mono">{data.barcode}</p>
      </div>

      <div className="flex gap-4 w-full mt-2">
        <button
          onClick={handleCopy}
          className="flex-1 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors disabled:bg-green-500 disabled:cursor-not-allowed"
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