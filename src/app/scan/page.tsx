
'use client';

import { useState } from 'react';
import QRCodeScanner from '@/app/components/scanner';
import ResultDisplay from '@/app/components/ResultDisplay';
import { useDevices } from '@yudiel/react-qr-scanner';
import type { ProductInfo } from '@/app/api/product-info/route';
import { Leaf, TriangleAlert, Camera} from 'lucide-react';

// A placeholder for the dynamic background from the landing page
const AuroraBackground = () => (
  <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden bg-slate-950">
    <div className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 bg-radial-gradient from-emerald-950/30 to-slate-950" />
  </div>
);

// Our new futuristic loading indicator
const LoadingIndicator = () => (
    <div className="flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 border-4 border-emerald-400/20 border-t-emerald-400 rounded-full animate-spin-slow"></div>
        <p className="text-emerald-300 text-lg">Analyzing Data Stream...</p>
    </div>
);

// The Main Scanner Page Component
export default function ScanPage() {
  const [productData, setProductData] = useState<ProductInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deviceId, setDeviceId] = useState<string | undefined>(undefined);
  const devices = useDevices();

  const handleDetected = async (code: string) => {
    setIsLoading(true);
    setError(null);
    setProductData(null);

    try {
      const response = await fetch('/api/product-info', {
        method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ barcode: code }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get product data.');
      }
      const data: ProductInfo = await response.json();
      setProductData(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleScanAgain = () => {
    setProductData(null);
    setError(null);
  };
  
  const showScanner = !productData && !isLoading && !error;

  return (
    <div className="min-h-screen w-full text-slate-100 overflow-hidden">
        <AuroraBackground />

        {/* Consistent Header */}
        <header className="fixed top-0 left-0 w-full p-4 z-50">
            <nav className="container mx-auto flex justify-between items-center bg-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-xl p-2">
                <div className="flex items-center gap-2">
                    <Leaf className="w-6 h-6 text-emerald-400" />
                    <span className="text-xl font-bold">GreenScan</span>
                </div>
                <p className="text-sm text-emerald-300">Live Analysis Mode</p>
            </nav>
        </header>
        
        <main className="min-h-screen flex flex-col items-center justify-center p-4">
            {isLoading && <LoadingIndicator />}

            {error && !isLoading && (
                <div className="text-center p-8 bg-slate-800/50 border border-red-500/30 rounded-lg">
                    <TriangleAlert className="w-12 h-12 mx-auto text-red-400 mb-4" />
                    <h2 className="text-2xl font-bold text-red-300">Analysis Failed</h2>
                    <p className="mt-2 text-slate-400">{error}</p>
                    <button
                        onClick={handleScanAgain}
                        className="mt-6 bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-400 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            )}
            
            {productData && !isLoading && (
                <ResultDisplay data={productData} onScanAgain={handleScanAgain} />
            )}

            {showScanner && (
                <div className="w-full max-w-md flex flex-col items-center gap-6">
                    {/* The Scanner HUD */}
                    <div className="relative w-full aspect-square bg-slate-900/30 rounded-2xl overflow-hidden border border-emerald-400/20 shadow-2xl shadow-emerald-900/50">
                        <QRCodeScanner onDetected={handleDetected} deviceId={deviceId} />
                        {/* HUD Overlay Elements */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-emerald-400 rounded-tl-lg animate-pulse-glow" />
                            <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-emerald-400 rounded-tr-lg animate-pulse-glow" />
                            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-emerald-400 rounded-bl-lg animate-pulse-glow" />
                            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-emerald-400 rounded-br-lg animate-pulse-glow" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-emerald-400/20 rounded-full" />
                        </div>
                    </div>
                    {/* Scanner Controls */}
                    <div className="w-full p-3 bg-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-xl flex items-center gap-4">
                        <Camera className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                        <select
                            className="w-full bg-transparent text-slate-200 border-none outline-none focus:ring-0"
                            onChange={(e) => setDeviceId(e.target.value)}
                        >
                            <option className="bg-slate-800" value={undefined}>Default Camera</option>
                            {devices.map((device) => (
                                <option className="bg-slate-800" key={device.deviceId} value={device.deviceId}>
                                    {device.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </main>
    </div>
  );
}