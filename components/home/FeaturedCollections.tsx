'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { getCategories } from '@/app/actions/productActions';
import { Category } from '@/types';

export const FeaturedCollections: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const cats = await getCategories();
      setCategories(cats as any);
      setIsLoading(false);
    }
    load();
  }, []);

  return (
    <section className="py-20 bg-stone-50 font-sans">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-accent block mb-1">
              Curated Houses
            </span>
            <h2 className="font-serif text-2xl md:text-4xl font-extrabold text-noir-900 uppercase tracking-tight">
              Explore By Category
            </h2>
          </div>
          <Link 
            href="/shop" 
            className="mt-4 md:mt-0 text-xs uppercase font-bold tracking-widest text-stone-700 hover:text-accent flex items-center space-x-1 transition"
          >
            <span>View All Collections ({categories.length})</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-10">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : categories.map((cat) => (
            <Link 
              key={cat.id} 
              href={`/category/${cat.slug}`}
              className="group flex flex-col items-center space-y-3 transition-all duration-300"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white shadow-sm border border-stone-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:-translate-y-1">
                {cat.icon ? (
                  <i className={`${cat.icon} text-xl md:text-2xl`}></i>
                ) : (
                  <span className="text-lg font-bold">{cat.name.charAt(0)}</span>
                )}
              </div>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-stone-600 group-hover:text-primary transition-colors text-center">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
