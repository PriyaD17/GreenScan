'use client';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/scan");
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-10">GreenScan</h1>
      <p className="text-center text-gray-600 mt-4">Scan products to check their eco-friendliness</p>
      <div className="flex justify-center mt-8">
        <button
          onClick={handleRedirect}
          className="px-6 py-3 bg-blue-500 text-black rounded-lg hover:bg-green-600 transition"
        >
          Start Scanning
        </button>
      </div>
    </div>
  );
}
