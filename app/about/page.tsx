import React from 'react';
import { Sparkles, ShieldCheck, Gem, Crown, Heart, Award } from 'lucide-react';

export default function AboutPage() {
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || "The Luxury Vault";
  return (
    <div className="min-h-screen bg-stone-50 py-16 font-sans">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        
        {/* Header Hero Banner */}
        <div className="bg-noir-950 text-white rounded-3xl p-8 md:p-16 border border-accent/30 shadow-2xl text-center space-y-4 relative overflow-hidden mb-12">
          <span className="text-xs uppercase font-bold tracking-[0.3em] text-accent flex items-center justify-center space-x-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>The Heritage of Excellence</span>
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-extrabold tracking-tight">
            About {storeName}
          </h1>
          <p className="text-stone-300 text-xs md:text-sm max-w-2xl mx-auto leading-relaxed">
            Where African royalty, Italian leather craftsmanship, and Parisian cosmetics unite to create an unyielding benchmark of timeless luxury.
          </p>
        </div>

        {/* Narrative & Pillars */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-stone-200/80 shadow-md space-y-10">
          
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-noir-900 uppercase">
              Our Founding Vision
            </h2>
            <p className="text-stone-700 text-xs md:text-sm leading-relaxed">
              Established as Nigeria’s premier luxury fashion and cosmetics house, {storeName} was born out of a desire to eliminate compromise in high fashion. We cater to tastemakers, royalty, executives, and fashion connoisseurs who demand exquisite materials, flawless craftsmanship, and absolute authenticity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-stone-100">
            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <Gem className="w-8 h-8 text-accent" />
              <h3 className="font-serif text-sm font-bold text-noir-900 uppercase">Pure Authenticity</h3>
              <p className="text-stone-600 text-xs">
                Solid 18k gold PVD vacuum plating, certified gemstones, and organic Mulberry silks.
              </p>
            </div>

            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <Crown className="w-8 h-8 text-accent" />
              <h3 className="font-serif text-sm font-bold text-noir-900 uppercase">Haute Exclusivity</h3>
              <p className="text-stone-600 text-xs">
                Every collection is created in numbered, limited runs to ensure you remain singular in room.
              </p>
            </div>

            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <Award className="w-8 h-8 text-accent" />
              <h3 className="font-serif text-sm font-bold text-noir-900 uppercase">VIP Service</h3>
              <p className="text-stone-600 text-xs">
                Dedicated personal AI & human styling concierges with same-day express delivery across major cities.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
