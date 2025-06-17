// src/app/components/ResultDisplay.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ProductInfo } from '@/app/api/product-info/route';
import { Leaf, TriangleAlert, ShieldX, Copy, Scan } from 'lucide-react';

const scoreDetails = {
  green: {
    label: 'Sustainable',
    Icon: Leaf,
    bgColor: 'bg-emerald-500', 
  },
  yellow: {
    label: 'Partially Sustainable',
    Icon: TriangleAlert,
    bgColor: 'bg-amber-500',
  },
  red: {
    label: 'Not Sustainable',
    Icon: ShieldX,
    bgColor: 'bg-rose-600',
  },
  gray: {
    label: 'Not Available',
    Icon: TriangleAlert,
    bgColor: 'bg-slate-600',
  }
};

const nutrientLevelClasses = {
  low: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  moderate: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  high: 'bg-red-500/20 text-red-300 border-red-500/30',
};

const capitalize = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

export default function ResultDisplay({ data, onScanAgain }: { data: ProductInfo; onScanAgain: () => void; }) {
  const [copied, setCopied] = useState(false);
  const details = scoreDetails[data.color];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(data.barcode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    // Main card container with a dark navy-like background
    <div className="w-full max-w-md mx-auto bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl shadow-emerald-900/50 overflow-hidden animate-fade-in">
        
        {/* --- Header Section: Contains the score banner --- */}
        <div className={`relative p-5 text-white ${details.bgColor}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <details.Icon className="w-10 h-10 flex-shrink-0" />
                    <div>
                        <p className="font-bold text-xl">{details.label}</p>
                        <p className="opacity-80 text-sm">Eco-Score Analysis Complete</p>
                    </div>
                </div>
                <div className="text-4xl font-black opacity-50">
                  {data.ecoScoreGrade?.toUpperCase()}
                </div>
            </div>
        </div>

        {/* --- Content Body Section: Contains the image and all details --- */}
        <div className="px-6 pb-6 pt-0 space-y-5">
            {/* Image Container: uses negative margin to pull the image up */}
            {data.imageUrl && (
                <div className="relative h-20"> 
                    {/* This div creates space for the absolutely positioned image */}
                    <div className="absolute left-1/2 -translate-x-1/2 -top-10">
                        <Image
                            src={data.imageUrl}
                            alt={data.productName || 'Product'}
                            width={128} // 32 * 4
                            height={128} // 32 * 4
                            className="rounded-xl object-contain bg-white border-4 border-slate-700 shadow-lg"
                        />
                    </div>
                </div>
            )}

            {/* Product Header */}
            <div className="text-center pt-2">
                <h1 className="text-3xl font-bold text-white">{data.productName}</h1>
                <p className="text-lg text-slate-400 mt-1">{data.brand}</p>
            </div>
            
            {/* Nutrient Badges */}
            {data.nutrientLevels && Object.keys(data.nutrientLevels).length > 0 && (
              <div className="flex flex-wrap justify-center gap-3">
                {Object.entries(data.nutrientLevels).map(([key, value]) => (
                  <span key={key} className={`px-4 py-1 text-sm font-semibold rounded-full border ${nutrientLevelClasses[value as keyof typeof nutrientLevelClasses] || 'bg-gray-500/20'}`}>
                    {capitalize(key.replace('-', ' '))}
                  </span>
                ))}
              </div>
            )}

            {/* Ingredients */}
            {data.ingredientsText && (
              <div className="text-center pt-2">
                <h3 className="text-lg font-semibold text-emerald-400">Ingredients</h3>
                <p className="text-slate-400 mt-1 text-sm leading-relaxed">{data.ingredientsText}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
                <button onClick={onScanAgain} className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-all transform hover:scale-105">
                    <Scan className="w-5 h-5"/>
                    Scan Another
                </button>
                <button onClick={handleCopy} className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-slate-800/80 text-slate-300 font-semibold rounded-lg hover:bg-slate-800 transition-colors">
                    <Copy className="w-5 h-5"/>
                    {copied ? 'Copied!' : 'Copy Code'}
                </button>
            </div>
        </div>
    </div>
  );
}