
'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ProductInfo } from '@/app/api/product-info/route';
import { Leaf, TriangleAlert, ShieldX, Copy, Scan } from 'lucide-react';


const scoreDetails = {
  green: {
    label: 'Sustainable',
    Icon: Leaf,
    gradient: 'from-green-400 to-emerald-600',
    shadow: 'shadow-green-500/50',
  },
  yellow: {
    label: 'Partially Sustainable',
    Icon: TriangleAlert,
    gradient: 'from-yellow-400 to-amber-600',
    shadow: 'shadow-yellow-500/50',
  },
  red: {
    label: 'Not Sustainable',
    Icon: ShieldX,
    gradient: 'from-red-500 to-rose-700',
    shadow: 'shadow-red-500/50',
  },
  gray: {
    label: 'Not Available',
    Icon: TriangleAlert,
    gradient: 'from-slate-500 to-slate-700',
    shadow: 'shadow-slate-500/50',
  }
};

const nutrientLevelClasses = {
  low: 'bg-green-500/20 text-green-300 border-green-500/30',
  moderate: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
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
    <div className="w-full max-w-lg mx-auto bg-slate-900/50 backdrop-blur-xl border border-emerald-400/20 rounded-2xl shadow-2xl shadow-emerald-900/50 overflow-hidden animate-fade-in">

      <div className={`relative p-6 text-white bg-gradient-to-br ${details.gradient} shadow-lg ${details.shadow}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <details.Icon className="w-12 h-12" />
            <div>
              <p className="font-bold text-2xl">{details.label}</p>
              <p className="opacity-80">Eco-Score Analysis Complete</p>
            </div>
          </div>
          <div className="text-4xl font-black opacity-80 border-2 border-white/20 rounded-full w-16 h-16 flex items-center justify-center bg-slate-800/50">
            {data.ecoScoreGrade?.toUpperCase()[0] === 'U' ? "NA" : data.ecoScoreGrade?.toUpperCase()}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">


        <div className="text-center">
          {data.imageUrl && (
            <Image
              src={data.imageUrl}
              alt={data.productName || 'Product'}
              width={128}
              height={128}
              className="rounded-xl object-contain mx-auto my-2 mb-4 border-4 border-slate-700 bg-white shadow-xl"
            />
          )}
          <h1 className="text-3xl font-bold text-white">{data.productName}</h1>
          <p className="text-lg text-slate-400">{data.brand}</p>
        </div>


        {data.nutrientLevels && (
          <div className="flex flex-wrap justify-center gap-2">
            {Object.entries(data.nutrientLevels).map(([key, value]) => (
              <span key={key} className={`px-3 py-1 text-sm font-semibold rounded-full border ${nutrientLevelClasses[value as 'low' | 'moderate' | 'high'] || 'bg-gray-500/20'}`}>
                {capitalize(key.replace('-', ' '))}
              </span>
            ))}
          </div>
        )}


        {data.ingredientsText && (
          <div>
            <h3 className="text-lg font-semibold text-emerald-300">Ingredients</h3>
            <p className="text-slate-400 mt-1 text-sm leading-relaxed">{data.ingredientsText}</p>
          </div>
        )}

        {data.allergens && data.allergens.length > 0 && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg">
            <h3 className="font-bold text-rose-300">Allergen Alert</h3>
            <p className="text-rose-400 mt-1">Contains: {data.allergens.map(a => capitalize(a.replace('en:', ''))).join(', ')}</p>
          </div>
        )}


        <div className="flex gap-4 pt-4 border-t border-slate-700/50">
          <button onClick={onScanAgain} className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-emerald-500 text-slate-900 font-bold rounded-lg hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 transition-all transform hover:scale-105">
            <Scan className="w-5 h-5" />
            Scan Another
          </button>
          <button onClick={handleCopy} className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-slate-700/50 text-slate-300 font-semibold rounded-lg hover:bg-slate-700 transition-colors">
            <Copy className="w-5 h-5" />
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
      </div>
    </div>
  );
}