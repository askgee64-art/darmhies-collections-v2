'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Crown, ArrowRight, Loader2 } from 'lucide-react';
import { getFilteredProducts } from '@/app/actions/productActions';
import { ProductCard } from '@/components/shop/ProductCard';
import { Product } from '@/types';

export const BestSellers: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const bestSellers = await getFilteredProducts({ bestSeller: true });
      setProducts(bestSellers.slice(0, 4) as any);
      setIsLoading(false);
    }
    load();
  }, []);

  return (
    <section className="py-20 bg-stone-900 text-white font-sans relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-primary flex items-center space-x-1.5 mb-1">
              <Crown className="w-4 h-4 text-primary" />
              <span>Crown Icons</span>
            </span>
            <h2 className="font-serif text-2xl md:text-4xl font-extrabold text-white uppercase tracking-tight">
              Best Sellers
            </h2>
          </div>
          <Link 
            href="/shop?bestSeller=true" 
            className="mt-4 md:mt-0 text-xs uppercase font-bold tracking-widest text-stone-300 hover:text-primary flex items-center space-x-1 transition"
          >
            <span>View All Iconic Pieces</span>
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
