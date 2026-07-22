'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Facebook, Send, CreditCard, Sparkles, Heart } from 'lucide-react';
import { mockDB } from '@/lib/mock-db';

export const Footer: React.FC = () => {
  const categories = mockDB.getCategories();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || "{storeName} Vault";
  const storeLocation = process.env.NEXT_PUBLIC_STORE_LOCATION || "New York, USA";
  const storeDesc = process.env.NEXT_PUBLIC_STORE_DESCRIPTION || "Your Shopping Destination for Everything";

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-300 font-sans border-t border-stone-800 pt-16 pb-12 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800/80">
          
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex flex-col items-start group inline-block">
              <span className="font-extrabold text-2xl md:text-3xl tracking-tight text-white group-hover:text-rose-400 transition uppercase">
                {storeName}
              </span>
            </Link>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              {storeDesc}
            </p>

            <div className="pt-2 flex items-center space-x-3">
              <span className="text-xs font-bold text-stone-400 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>{storeLocation}</span>
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider border-l-2 border-primary pl-3">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link href={`/category/${cat.slug}`} className="hover:text-rose-400 transition">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider border-l-2 border-primary pl-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><Link href="/about" className="hover:text-rose-400 transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-rose-400 transition">Contact Support</Link></li>
              <li><Link href="/account" className="hover:text-rose-400 transition">Track Order</Link></li>
              <li><Link href="/wishlist" className="hover:text-rose-400 transition">Saved Wishlist</Link></li>
              <li><Link href="/shop" className="hover:text-rose-400 transition">Shop Vault</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider border-l-2 border-primary pl-3">
              Newsletter
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Subscribe for exclusive previews, promo alerts, and flash sales.
            </p>

            {subscribed ? (
              <div className="p-3 bg-primary/10 border border-primary/30 rounded-xl text-rose-300 text-xs flex items-center space-x-2 font-bold">
                <Sparkles className="w-4 h-4 text-rose-400" />
                <span>Subscribed successfully!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl py-2.5 px-3 pr-10 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-primary"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary text-white p-1.5 rounded-lg transition"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-stone-500 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-1">
            <span>© {new Date().getFullYear()} {storeName}. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5 text-stone-400 font-bold">
              <CreditCard className="w-4 h-4 text-primary" />
              <span>Secured Checkout</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
