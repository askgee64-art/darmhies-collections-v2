'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function WelcomeOnboardingPage() {
  const router = useRouter();

  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || "The Luxury Vault";
  const slogan = process.env.NEXT_PUBLIC_STORE_SLOGAN || "Your Shopping Destination for Everything";
  const storeDescription = process.env.NEXT_PUBLIC_STORE_DESCRIPTION || "Explore 50+ luxury dresses, 18k solid gold chains, Zambian emeralds, and glowing cosmetics elixirs.";

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-sm rounded-[44px] overflow-hidden shadow-2xl border-4 border-stone-800 flex flex-col justify-between h-[730px] relative bg-black">
        
        {/* Full Bleed Background Photo */}
        <img 
          src={process.env.NEXT_PUBLIC_ONBOARDING_BACKGROUND_IMAGE || "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800"} 
          alt="Luxury Fashion Background" 
          className="absolute inset-0 w-full h-full object-cover object-center brightness-90"
        />

        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 via-60% to-black/95 z-0" />

        {/* Status Bar */}
        <div className="relative z-10 flex justify-between items-center text-xs font-extrabold text-white px-6 pt-4 text-shadow">
          <span>9:41</span>
          <div className="flex space-x-1.5">
            <i className="fa-solid fa-signal"></i>
            <i className="fa-solid fa-wifi"></i>
            <i className="fa-solid fa-battery-full"></i>
          </div>
        </div>

        {/* Floating Glassmorphism Tiles */}
        <div className="relative z-10 px-5 pt-4 grid grid-cols-3 gap-2">
          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-1 h-20 shadow-lg overflow-hidden">
            <img src={process.env.NEXT_PUBLIC_ONBOARDING_TOP_TILE_IMAGE_1 || "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=300"} alt="Jewelry" className="w-full h-full object-cover rounded-xl" />
          </div>
          <div className="col-span-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-1 h-20 shadow-lg overflow-hidden">
            <img src={process.env.NEXT_PUBLIC_ONBOARDING_TOP_TILE_IMAGE_2 || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400"} alt="Couture" className="w-full h-full object-cover rounded-xl" />
          </div>
        </div>

        {/* Glass Container Bottom Card */}
        <div className="relative z-10 bg-noir-900/80 backdrop-blur-2xl border-t border-white/20 rounded-t-[36px] p-6 text-center space-y-3.5 shadow-2xl">
          
          <div className="inline-flex items-center space-x-1.5 bg-primary/20 border border-primary text-primary px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-primary" />
            <span>{storeName}</span>
          </div>

          <h1 className="font-black text-2xl text-white leading-snug tracking-tight text-shadow">
            {slogan}
          </h1>

          <p className="text-xs text-stone-300 leading-relaxed font-medium px-1">
            {storeDescription}
          </p>

          <button
            onClick={() => router.push('/shop')}
            className="w-full bg-primary hover:bg-primary text-white font-black text-xs uppercase tracking-wider py-4 rounded-full transition shadow-xl shadow-primary/40 flex items-center justify-center space-x-2"
          >
            <span>Let's Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-xs text-stone-400 font-medium pt-1">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-black text-rose-400 underline ml-1">
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
