'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ArrowLeft } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/shop/ProductCard';

export default function WishlistPage() {
  const { wishlist, clearWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-stone-50 py-12 font-sans">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-serif text-3xl font-extrabold text-noir-900 uppercase">
              Saved Wishlist ({wishlist.length})
            </h1>
            <p className="text-xs text-stone-500 mt-1">Your private vault of coveted haute pieces.</p>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-xs font-bold text-rose-600 hover:underline"
            >
              Clear Wishlist
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center space-y-4 border border-stone-200 shadow-sm max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto text-rose-500">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-noir-900">Your Wishlist is Empty</h3>
            <p className="text-xs text-stone-500">
              Bookmark your favorite dresses, solid gold chains, and beauty products by clicking the heart icon.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-noir-900 hover:bg-gold-600 text-white font-sans text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl font-bold transition shadow-lg"
            >
              Explore House Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
