'use client';

import React from 'react';
import { Star, Quote, ShieldCheck } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || "The Luxury Vault";
  const reviews = [
    {
      id: 1,
      name: 'Dr. Folake Adeyemi',
      location: 'Victoria Island, Lagos',
      review: "{storeName} Aurelia Emerald Evening Gown was the highlight of the charity gala. The Italian silk velvet texture and corseted fit were pure perfection. White-glove delivery in 24 hours!",
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      product: 'Aurelia Emerald Velvet Evening Gown',
    },
    {
      id: 2,
      name: 'Princess Kemi Odutola',
      location: 'Maitama, Abuja',
      review: 'I ordered the 18k Iced Out Cuban Chain and Geneva Diamond Earrings. The solid gold weight and non-tarnish brilliance exceed international luxury jewelers.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
      product: '18K Iced Out Miami Cuban Chain',
    },
    {
      id: 3,
      name: 'Sandra Nwosu',
      location: 'Lekki Phase 1, Lagos',
      review: 'The Royal Glow Hydrating Serum is liquid gold. Skin feels plumped and glowing all day long. Their AI Concierge helped me pick the right shade instantly!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
      product: '{storeName} Royal Glow Hydrating Serum',
    },
  ];

  return (
    <section className="py-20 bg-stone-50 font-sans border-b border-stone-200">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-accent block mb-1">
            Client Accolades
          </span>
          <h2 className="font-serif text-2xl md:text-4xl font-extrabold text-noir-900 uppercase tracking-tight">
            Words From Our VIP Circle
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div 
              key={rev.id} 
              className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:border-gold-300 transition-all duration-300 relative flex flex-col justify-between"
            >
              <Quote className="w-10 h-10 text-gold-200 absolute top-6 right-6 pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex space-x-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-stone-700 text-xs leading-relaxed italic font-sans">
                  "{rev.review}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center space-x-3">
                <img 
                  src={rev.avatar} 
                  alt={rev.name} 
                  className="w-10 h-10 rounded-full object-cover border border-gold-300"
                />
                <div>
                  <h4 className="font-serif text-xs font-bold text-noir-900 flex items-center space-x-1">
                    <span>{rev.name}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-accent inline" />
                  </h4>
                  <span className="text-[10px] text-stone-400 block">{rev.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
