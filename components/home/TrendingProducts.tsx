'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { getFilteredProducts } from '@/app/actions/productActions';
import { ProductCard } from '@/components/shop/ProductCard';
import { Product } from '@/types';

export const TrendingProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const list = await getFilteredProducts({ trending: true });
      setProducts(list.slice(0, 8) as any);
      setIsLoading(false);
    }
    load();
  }, []);

  return (
    <section className="py-20 bg-white font-sans border-b border-stone-200">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-primary flex items-center space-x-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span>Coveted By Tastemakers</span>
            </span>
            <h2 className="font-serif text-2xl md:text-4xl font-extrabold text-noir-900 uppercase tracking-tight">
              Trending Collections
            </h2>
          </div>
          <Link 
            href="/shop?trending=true" 
            className="mt-4 md:mt-0 text-xs uppercase font-bold tracking-widest text-stone-700 hover:text-primary flex items-center space-x-1 transition"
          >
            <span>Explore All Trending</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
