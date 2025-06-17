// src/app/components/scanner.tsx
'use client';

import { Scanner, IDetectedBarcode, TrackFunction } from '@yudiel/react-qr-scanner';
import { useState } from 'react';

interface QRCodeScannerProps {
  onDetected: (code: string) => void;
  deviceId?: string;
  tracker?: TrackFunction;
}

export default function QRCodeScanner({
  onDetected,
  deviceId,
  tracker,
}: QRCodeScannerProps) {
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleScan = (results: IDetectedBarcode[]) => {
    if (isProcessing) return;
    const result = results?.[0]?.rawValue;
    if (result) {
      setIsProcessing(true);
      onDetected(result);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Scanner
        onScan={handleScan}
        onError={(err) => {
          const message = err instanceof Error ? err.message : 'An unknown error occurred.';
          setError(message);
          console.error('Scanner error:', err);
        }}
        formats={[
            "qr_code", "ean_13", "code_128", "upc_a", "itf" // Common formats
        ]}
        constraints={{
          deviceId: deviceId,
          facingMode: deviceId ? undefined : 'environment', // Use environment if no specific device is set
        }}
        components={{
          onOff: true,
          torch: true,
          zoom: true,
          finder: true,
          tracker: tracker,
        }}
        allowMultiple={false}
        classNames={{
          container: 'w-full border rounded-lg shadow-lg relative overflow-hidden',
          video: 'rounded-lg',
        }}
      />
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </div>
  );
}