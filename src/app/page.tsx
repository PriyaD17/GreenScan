// src/app/page.tsx
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, ScanLine, Leaf, ShieldCheck} from 'lucide-react';
import { useRouter } from "next/navigation";

// This is a conceptual placeholder for a dynamic, animated background.
// In a real project, you might use a library like 'react-tsparticles' or a custom Three.js canvas.
const AuroraBackground = () => (
  <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
    <div
      className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2
                 bg-radial-gradient from-emerald-950/50 to-slate-950"
    />
    {/* Add particle effects or other animations here */}
  </div>
);

// This placeholder represents an animated phone mockup that feels alive.
// You would build this with Framer Motion or a similar library.
const AnimatedPhoneMockup = () => (
  <div className="relative w-80 h-[580px] bg-slate-800/80 backdrop-blur-xl border border-emerald-400/20 rounded-4xl shadow-2xl shadow-emerald-900/50">
    <div className="absolute inset-1.5 bg-slate-950 rounded-3xl overflow-hidden p-4 flex flex-col items-center">
       <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <h2 className="text-2xl font-bold text-emerald-400">GreenScan</h2>
            <p className="text-slate-400 text-center">Revealing Eco-Truth</p>
            <div className="w-48 h-48 mt-4 relative">
                <Leaf className="w-full h-full text-emerald-500/30"/>
                {/* The glowing scanner line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-400 shadow-[0_0_15px_2px_rgba(52,211,153,0.7)] animate-scan-vertical" />
            </div>
            <p className="mt-4 text-xs text-slate-500">Point at any barcode</p>
       </div>
    </div>
  </div>
);


export default function LandingPage() {
  const router = useRouter();

  const handleStartScanning = () => {
    router.push("/scan");
  };
  
  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 overflow-x-hidden">
      <AuroraBackground />

      {/* ------------------------- */}
      {/* ----- Navigation Bar ---- */}
      {/* ------------------------- */}
      <header className="fixed top-0 left-0 w-full p-4 z-50">
        <nav className="container mx-auto flex justify-between items-center bg-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-xl p-2">
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-emerald-400" />
            <span className="text-xl font-bold">GreenScan</span>
          </div>
          <Button 
            onClick={handleStartScanning} 
            className="bg-emerald-500 text-slate-900 font-bold hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 transition-all duration-300 transform hover:scale-105"
          >
            Scan Now <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </nav>
      </header>

      <main className="container mx-auto px-4 pt-32">
        {/* -------------------- */}
        {/* ----- Hero Section ---- */}
        {/* -------------------- */}
        <section className="relative flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
              The Truth is in the Barcode.
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0">
              Stop guessing. Start knowing. Instantly decode the environmental impact of any product with a single, powerful scan. Your shopping will never be the same.
            </p>
            <div className="flex gap-4 justify-center lg:justify-start pt-4">
              <Button 
                onClick={handleStartScanning}
                size="lg" 
                className="bg-emerald-500 text-slate-900 font-bold text-lg px-8 py-6 rounded-full hover:bg-emerald-400 shadow-2xl shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105"
              >
                Unleash the Scanner
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 flex items-center justify-center">
            <AnimatedPhoneMockup />
          </div>
        </section>

        {/* -------------------- */}
        {/* --- Features Section --- */}
        {/* -------------------- */}
        <section className="py-24 md:py-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">One Scan. Total Clarity.</h2>
            <p className="mt-4 text-lg text-slate-400">Everything you need to make a conscious choice.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-slate-900/50 border-emerald-400/20 shadow-2xl shadow-emerald-900/30 hover:border-emerald-400/50 transition-colors">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 bg-emerald-900/50 border border-emerald-400/30 rounded-lg">
                  <Leaf className="w-8 h-8 text-emerald-400" />
                </div>
                <CardTitle className="text-2xl">Instant Eco-Score</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">Go from barcode to a clear, color-coded sustainability rating in seconds. Green, Yellow, or Red—the power is in your hands.</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/50 border-emerald-400/20 shadow-2xl shadow-emerald-900/30 hover:border-emerald-400/50 transition-colors">
              <CardHeader className="flex flex-row items-center gap-4">
                 <div className="p-3 bg-emerald-900/50 border border-emerald-400/30 rounded-lg">
                  <ScanLine className="w-8 h-8 text-emerald-400" />
                </div>
                <CardTitle className="text-2xl">Full Ingredient Deep-Dive</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">We dont just stop at the score. Get a full breakdown of ingredients, allergens, and nutritional information to know exactly what you are buying.</p>
              </CardContent>
            </Card>
             <Card className="bg-slate-900/50 border-emerald-400/20 shadow-2xl shadow-emerald-900/30 hover:border-emerald-400/50 transition-colors">
              <CardHeader className="flex flex-row items-center gap-4">
                 <div className="p-3 bg-emerald-900/50 border border-emerald-400/30 rounded-lg">
                  <ShieldCheck className="w-8 h-8 text-emerald-400" />
                </div>
                <CardTitle className="text-2xl">Powered by a Global Database</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">Leveraging the vast, community-driven Open Food Facts database, GreenScan gives you access to a world of product knowledge.</p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* -------------------- */}
        {/* --- Testimonial Section --- */}
        {/* -------------------- */}
        <section className="py-24">
            <Card className="bg-gradient-to-br from-emerald-900/60 to-slate-900/50 border-slate-700/50 p-8 md:p-12 text-center">
                <p className="text-2xl md:text-3xl font-medium italic text-white">GreenScan completely changed how I shop. I feel like I have a superpower in the grocery aisle. Its not just an app; its a movement.</p>
                <div className="flex items-center justify-center gap-4 mt-8">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-bold">Alex Johnson</p>
                        <p className="text-sm text-slate-400">Early Adopter</p>
                    </div>
                </div>
            </Card>
        </section>

      </main>

      {/* -------------------- */}
      {/* --- Footer ---- */}
      {/* -------------------- */}
      <footer className="border-t border-slate-800 mt-24 py-8">
        <div className="container mx-auto text-center text-slate-500">
          <p>© {new Date().getFullYear()} GreenScan. All Rights Reserved.</p>
          <p className="mt-2 text-xs">Join the movement for a more transparent world.</p>
        </div>
      </footer>
    </div>
  );
}