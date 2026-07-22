'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Star, Eye, MessageCircle } from 'lucide-react';
import { Product } from '@/types';
import { formatCurrency, generateWhatsAppOrderUrl } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+2348012345678';
  const waUrl = generateWhatsAppOrderUrl({
    phone: whatsappNumber,
    productTitle: product.title,
    price: product.price,
  });

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-stone-200/80 hover:border-gold-400/80 transition-all duration-300 hover:shadow-xl flex flex-col justify-between font-sans relative">
      
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col space-y-1">
        {product.isBestSeller && (
          <span className="bg-noir-900 text-gold-300 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
            Best Seller
          </span>
        )}
        {product.isNewArrival && (
          <span className="bg-gold-500 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
            New Arrival
          </span>
        )}
        {product.compareAtPrice && product.compareAtPrice > product.price && (
          <span className="bg-rose-600 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
            Save {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
          </span>
        )}
      </div>

      {/* Wishlist Toggle Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product);
        }}
        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition backdrop-blur-md ${
          isWishlisted 
            ? 'bg-rose-500 text-white' 
            : 'bg-white/80 text-stone-700 hover:text-rose-500 hover:bg-white'
        }`}
        aria-label="Toggle Wishlist"
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
      </button>

      {/* Image Container */}
      <Link href={`/product/${product.slug}`} className="block relative h-64 overflow-hidden bg-stone-100">
        <img 
          src={product.images[0]?.url || 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800'} 
          alt={product.title} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
        />
        {product.images[1] && (
          <img 
            src={product.images[1].url} 
            alt={product.title} 
            className="w-full h-full object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
          />
        )}
      </Link>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
            {product.categoryName}
          </span>
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-serif text-sm font-bold text-stone-900 group-hover:text-gold-600 line-clamp-1 transition mt-0.5">
              {product.title}
            </h3>
          </Link>
        </div>

        {/* Rating and Price */}
        <div className="space-y-1.5">
          <div className="flex items-center space-x-1 text-xs text-amber-500">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-stone-800 text-[11px]">{product.rating || 4.9}</span>
            <span className="text-stone-400 text-[10px]">({product.reviewCount || 12})</span>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="font-serif font-bold text-base text-noir-900">
              {formatCurrency(product.price)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xs text-stone-400 line-through">
                {formatCurrency(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          <button
            onClick={() => addItem(product, 1)}
            className="w-full bg-noir-900 hover:bg-gold-600 text-white font-sans text-[11px] uppercase tracking-wider font-bold py-2.5 rounded-xl transition flex items-center justify-center space-x-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add To Bag</span>
          </button>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-[11px] uppercase tracking-wider font-bold py-2.5 rounded-xl transition flex items-center justify-center space-x-1"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>

      </div>

    </div>
  );
};
