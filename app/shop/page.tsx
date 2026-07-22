'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, SlidersHorizontal, Search, X, Sparkles, Loader2 } from 'lucide-react';
import { getFilteredProducts, getCategories } from '@/app/actions/productActions';
import { ProductCard } from '@/components/shop/ProductCard';
import { Product, Category } from '@/types';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';
  const initialTrending = searchParams.get('trending') === 'true';
  const initialBestSeller = searchParams.get('bestSeller') === 'true';

  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || "The Luxury Vault";
  const storeDescription = process.env.NEXT_PUBLIC_STORE_DESCRIPTION || "Explore our curated collection of luxury items.";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'rating' | 'popular'>('newest');
  const [filterTrending, setFilterTrending] = useState(initialTrending);
  const [filterBestSeller, setFilterBestSeller] = useState(initialBestSeller);
  const [filterNewArrival, setFilterNewArrival] = useState(false);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
        const cats = await getCategories();
        setCategories(cats as any);
    }
    loadCategories();
  }, []);

  useEffect(() => {
    async function loadProducts() {
        setIsLoading(true);
        const list = await getFilteredProducts({
            category: selectedCategory || undefined,
            search: searchQuery || undefined,
            trending: filterTrending || undefined,
            bestSeller: filterBestSeller || undefined,
            newArrival: filterNewArrival || undefined,
            sortBy,
        });
        setProducts(list as any);
        setIsLoading(false);
    }
    loadProducts();
  }, [selectedCategory, searchQuery, filterTrending, filterBestSeller, filterNewArrival, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory('');
    setSearchQuery('');
    setFilterTrending(false);
    setFilterBestSeller(false);
    setFilterNewArrival(false);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen bg-stone-50 py-10 font-sans">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Page Header */}
        <div className="bg-noir-900 text-white rounded-3xl p-8 md:p-12 mb-10 border border-primary/30 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs uppercase font-bold tracking-widest text-primary flex items-center space-x-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>{storeName} Catalog</span>
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-extrabold tracking-tight">
              The {storeName} Vault
            </h1>
            <p className="text-stone-300 text-xs md:text-sm mt-3 leading-relaxed">
              {storeDescription}
            </p>
          </div>
        </div>

        {/* Search & Sorting Bar */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Live Search Input */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by title or sku..."
              className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-accent"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-noir-900"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-end">
            <span className="text-xs font-bold text-stone-500 font-sans">
              Showing <strong className="text-noir-900 font-serif">{products.length}</strong> items
            </span>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-stone-400" />
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-accent font-sans font-bold"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm h-fit space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-stone-100">
              <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-noir-900 flex items-center space-x-2">
                <Filter className="w-4 h-4 text-accent" />
                <span>Filters</span>
              </h3>
              {(selectedCategory || searchQuery || filterTrending || filterBestSeller || filterNewArrival) && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] text-primary font-bold hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                Categories
              </span>
              <button
                onClick={() => setSelectedCategory('')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition ${
                  selectedCategory === '' ? 'bg-primary text-white font-bold' : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                All Collections
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition flex justify-between items-center ${
                    selectedCategory === cat.slug ? 'bg-primary text-white font-bold' : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {cat.icon && <i className={`${cat.icon} w-4`}></i>}
                    <span>{cat.name}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Curated Status Filter Toggles */}
            <div className="space-y-2 pt-4 border-t border-stone-100">
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                Tags & Status
              </span>
              <label className="flex items-center space-x-2 text-xs text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterBestSeller}
                  onChange={(e) => setFilterBestSeller(e.target.checked)}
                  className="rounded accent-accent"
                />
                <span>Best Sellers</span>
              </label>

              <label className="flex items-center space-x-2 text-xs text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterTrending}
                  onChange={(e) => setFilterTrending(e.target.checked)}
                  className="rounded accent-accent"
                />
                <span>Trending Pieces</span>
              </label>

              <label className="flex items-center space-x-2 text-xs text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterNewArrival}
                  onChange={(e) => setFilterNewArrival(e.target.checked)}
                  className="rounded accent-accent"
                />
                <span>New Arrivals</span>
              </label>
            </div>

          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center space-y-4 border border-stone-200">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-bold text-noir-900">No matching products found</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Try clearing your filters or search for another luxury term like "Emerald", "18k", "Dress", or "Bag".
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-2 bg-noir-900 text-white font-sans text-xs uppercase tracking-widest px-6 py-3 rounded-xl font-bold hover:bg-accent transition"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
