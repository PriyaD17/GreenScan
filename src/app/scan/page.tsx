// src/app/scan/page.tsx
'use client';

import { useState } from 'react';
import QRCodeScanner from '@/app/components/scanner';
import ResultDisplay from '@/app/components/ResultDisplay';
import { useDevices, outline, boundingBox, centerText, TrackFunction } from '@yudiel/react-qr-scanner';
import type { ProductInfo } from '@/app/api/product-info/route'; 

export default function ScanPage() {
  const [productData, setProductData] = useState<ProductInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [deviceId, setDeviceId] = useState<string | undefined>(undefined);
  const [tracker, setTracker] = useState<string>('centerText');
  const devices = useDevices();

  const handleDetected = async (code: string) => {
    setIsLoading(true);
    setError(null);
    setProductData(null);

    try {
      const response = await fetch('/api/product-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ barcode: code }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get product data.');
      }

      const data: ProductInfo = await response.json();
      setProductData(data);

    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScanAgain = () => {
    setProductData(null);
    setError(null);
  };

  function getTracker(): TrackFunction | undefined {
    switch (tracker) {
      case 'outline': return outline;
      case 'boundingBox': return boundingBox;
      case 'centerText': return centerText;
      default: return undefined;
    }
  }

  const showScanner = !productData && !isLoading && !error;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 gap-8 bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold">GreenScan</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          {isLoading && 'Fetching product information...'}
          {error && `Error: ${error}`}
          {productData && "Here's the result from your scan."}
          {showScanner && 'Position a barcode or QR code inside the frame.'}
        </p>
      </div>

      {productData && !isLoading && (
        <ResultDisplay data={productData} onScanAgain={handleScanAgain} />
      )}

      {showScanner && (
        <div className="w-full max-w-md flex flex-col gap-4">
          <div className="flex gap-2 justify-center">
            <select className="p-2 border rounded-md bg-white dark:bg-gray-700" onChange={(e) => setDeviceId(e.target.value)}>
              <option value={undefined}>Default Camera</option>
              {devices.map((device) => ( <option key={device.deviceId} value={device.deviceId}>{device.label}</option> ))}
            </select>
            <select className="p-2 border rounded-md bg-white dark:bg-gray-700" value={tracker} onChange={(e) => setTracker(e.target.value)}>
              <option value="centerText">Center Text</option>
              <option value="outline">Outline</option>
              <option value="boundingBox">Bounding Box</option>
              <option value="none">No Tracker</option>
            </select>
          </div>
          <QRCodeScanner onDetected={handleDetected} deviceId={deviceId} tracker={getTracker()} />
        </div>
      )}

      {/* Show an error display with a "try again" button */}
      {error && !isLoading && (
        <div className="flex flex-col items-center gap-4 p-6 border border-red-300 rounded-lg shadow-lg bg-red-50 dark:bg-gray-800 w-full max-w-md">
            <p className="text-red-700 dark:text-red-300">Could not retrieve product information.</p>
            <button
                onClick={handleScanAgain}
                className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
            >
                Scan Again
            </button>
        </div>
      )}
    </main>
  );
}