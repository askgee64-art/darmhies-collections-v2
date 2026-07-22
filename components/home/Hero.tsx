'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Star, Truck } from 'lucide-react';

export const Hero: React.FC = () => {
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || "The Luxury Vault";
  const storeDescription = process.env.NEXT_PUBLIC_STORE_DESCRIPTION || "Discover our curated collection of luxury items.";
  const slogan = process.env.NEXT_PUBLIC_STORE_SLOGAN || "Unveiling Royal Elegance & Charm";

  return (
    <section className="relative min-h-[85vh] bg-noir-950 flex items-center overflow-hidden border-b border-primary/20">
      
      {/* Background Hero Fashion Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1800&auto=format&fit=crop" 
          alt={`${storeName} Haute Couture`} 
          className="w-full h-full object-cover object-center opacity-30 scale-105 animate-pulse-glow"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-noir-950 via-noir-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-transparent to-noir-950/40" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 py-16 md:py-24">
        <div className="max-w-2xl space-y-6">
          
          {/* Top VIP Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/30 backdrop-blur-md px-4 py-1.5 rounded-full text-primary text-xs font-sans uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span>{storeName} Premium Collection</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-extrabold tracking-tight leading-[1.1]">
            {slogan.split(' ').slice(0, 2).join(' ')} <br />
            <span className="text-primary italic font-serif">{slogan.split(' ').slice(2).join(' ')}</span>
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-stone-300 text-sm md:text-base leading-relaxed font-light max-w-xl">
            {storeDescription}
          </p>

          {/* Call To Actions */}
          <div className="pt-4 flex flex-wrap gap-4 font-sans">
            <Link 
              href="/shop" 
              className="bg-primary hover:bg-primary-hover text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition duration-300 flex items-center space-x-3 shadow-xl hover:shadow-primary/20"
            >
              <span>Explore The Vault</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link 
              href="/category/jewelry" 
              className="bg-noir-900/80 hover:bg-noir-800 text-stone-200 border border-stone-700 hover:border-primary font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition duration-300 backdrop-blur-md"
            >
              Gold & Chains
            </Link>
          </div>

          {/* Social Proof Stats Bar */}
          <div className="pt-8 border-t border-stone-800/80 grid grid-cols-3 gap-6 max-w-lg">
            <div>
              <span className="font-serif text-xl md:text-2xl font-bold text-white block">10,000+</span>
              <span className="text-[10px] uppercase tracking-wider text-stone-400">Clients Served</span>
            </div>
            <div>
              <span className="font-serif text-xl md:text-2xl font-bold text-white block flex items-center">
                4.9 <Star className="w-4 h-4 text-accent fill-accent ml-1 inline" />
              </span>
              <span className="text-[10px] uppercase tracking-wider text-stone-400">Verified Reviews</span>
            </div>
            <div>
              <span className="font-serif text-xl md:text-2xl font-bold text-white block">100%</span>
              <span className="text-[10px] uppercase tracking-wider text-stone-400">Authentic Materials</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
