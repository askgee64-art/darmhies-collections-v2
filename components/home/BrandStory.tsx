'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, Sparkles, Clock } from 'lucide-react';

export const BrandStory: React.FC = () => {
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || "The Luxury Vault";
  return (
    <section className="py-20 bg-white font-sans">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Visual Grid */}
          <div className="grid grid-cols-2 gap-4 relative">
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop" 
                alt="Fine Jewelry Craftsmanship" 
                className="w-full h-64 object-cover rounded-2xl shadow-lg border border-stone-200"
              />
              <img 
                src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop" 
                alt="Leather Artisan Craft" 
                className="w-full h-48 object-cover rounded-2xl shadow-lg border border-stone-200"
              />
            </div>
            <div className="space-y-4 pt-8">
              <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop" 
                alt="Haute Couture Fashion" 
                className="w-full h-48 object-cover rounded-2xl shadow-lg border border-stone-200"
              />
              <img 
                src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop" 
                alt="Cosmetics Elixir" 
                className="w-full h-64 object-cover rounded-2xl shadow-lg border border-stone-200"
              />
            </div>

            {/* Floating Medal */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-noir-950 text-white p-4 rounded-2xl shadow-2xl border border-accent flex items-center space-x-3">
              <Sparkles className="w-8 h-8 text-accent" />
              <div>
                <span className="font-serif text-sm font-bold text-white block">{storeName} V2</span>
                <span className="text-[10px] text-stone-400 uppercase tracking-widest">Heritage & Excellence</span>
              </div>
            </div>
          </div>

          {/* Brand Narrative */}
          <div className="space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-accent block">
              The Atelier Legacy
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-extrabold text-noir-900 leading-tight">
              Crafted For Those Who <br />
              <span className="italic font-serif text-accent">Refuse To Compromise</span>
            </h2>

            <p className="text-stone-600 text-xs md:text-sm leading-relaxed font-light">
              Founded on the belief that true luxury lies in uncompromised details, {storeName} marries African regal heritage with contemporary global elegance. Each piece—from our 18k solid gold chains to our Italian velvet evening silhouettes—is crafted in limited quantities to ensure exclusivity.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-200">
              <div className="flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-xs font-bold text-noir-900 uppercase">Solid Authenticity</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">Real 18k gold PVD vacuum coating, lab diamonds, and organic French silks.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Truck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-xs font-bold text-noir-900 uppercase">White Glove Delivery</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">Dispatched in velvet jewelry pouches and custom presentation boxes.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-block bg-noir-900 hover:bg-accent text-white font-sans text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl font-bold transition shadow-lg"
              >
                Discover Our Heritage
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
