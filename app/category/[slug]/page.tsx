'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { mockDB } from '@/lib/mock-db';
import { ProductCard } from '@/components/shop/ProductCard';
import { Sparkles, ArrowLeft } from 'lucide-react';

export default function CategoryPage() {
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || "The Luxury Vault";
  const params = useParams();
  const slug = params.slug as string;

  const category = mockDB.getCategoryBySlug(slug);
  const products = mockDB.getProducts({ category: slug });

  if (!category) {
    return (
      <div className="min-h-screen bg-stone-50 py-20 flex flex-col items-center justify-center text-center">
        <h2 className="font-serif text-2xl font-bold text-noir-900 mb-2">Category Not Found</h2>
        <p className="text-xs text-stone-500 mb-6">The luxury collection category you are looking for does not exist.</p>
        <Link href="/shop" className="bg-noir-900 text-white font-sans text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-accent transition">
          Return To Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-10 font-sans">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Back navigation */}
        <Link 
          href="/shop" 
          className="inline-flex items-center space-x-2 text-xs font-bold text-stone-600 hover:text-accent transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All House Collections</span>
        </Link>

        {/* Category Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden mb-12 border border-gold-300/40 shadow-xl h-64 md:h-80 flex items-center">
          <img 
            src={category.imageUrl} 
            alt={category.name} 
            className="w-full h-full object-cover object-center absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-noir-950 via-noir-950/80 to-transparent" />

          <div className="relative z-10 p-8 md:p-12 max-w-2xl text-white">
            <span className="text-xs uppercase font-bold tracking-widest text-accent flex items-center space-x-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>{storeName} House of {category.name}</span>
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-extrabold uppercase tracking-tight">
              {category.name}
            </h1>
            <p className="text-stone-300 text-xs md:text-sm mt-3 leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-serif text-lg font-bold text-noir-900 uppercase">
              Curated Pieces ({products.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
