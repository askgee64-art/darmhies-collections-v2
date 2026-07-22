'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';

export default function CartPage() {
  const router = useRouter();
  const { cart, removeItem, updateQuantity, subtotal, shippingFee, total, couponDiscount, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 py-20 flex flex-col items-center justify-center text-center font-sans">
        <div className="w-20 h-20 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-600 mb-4">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-noir-900 mb-2">Your Bag is Empty</h2>
        <p className="text-xs text-stone-500 mb-6 max-w-xs">
          Discover our new arrivals, haute dresses, fine jewelry, and cosmetics elixirs.
        </p>
        <Link 
          href="/shop" 
          className="bg-noir-900 hover:bg-gold-600 text-white font-sans text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl font-bold transition shadow-lg"
        >
          Explore The Vault
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12 font-sans">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-serif text-3xl font-extrabold text-noir-900 uppercase">
              Shopping Bag ({cart.length})
            </h1>
            <p className="text-xs text-stone-500 mt-1">Review your selections before VIP checkout.</p>
          </div>

          <button
            onClick={clearCart}
            className="text-xs font-bold text-rose-600 hover:underline"
          >
            Clear Bag
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items Table */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <img
                    src={item.product.images[0]?.url}
                    alt={item.product.title}
                    className="w-20 h-20 object-cover rounded-xl border border-stone-200"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gold-600">
                      {item.product.categoryName}
                    </span>
                    <h3 className="font-serif text-sm font-bold text-stone-900">
                      {item.product.title}
                    </h3>
                    {item.variant && (
                      <span className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-semibold inline-block mt-1">
                        Variant: {item.variant}
                      </span>
                    )}
                    <div className="text-xs font-bold text-noir-900 mt-1 font-serif">
                      {formatCurrency(item.product.price)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6 justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                  <div className="flex items-center space-x-2 border border-stone-300 rounded-lg bg-stone-50 p-1">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 hover:bg-stone-200 rounded text-stone-700"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 hover:bg-stone-200 rounded text-stone-700"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="font-serif text-sm font-bold text-noir-900 min-w-[90px] text-right">
                    {formatCurrency(item.product.price * item.quantity)}
                  </span>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-stone-400 hover:text-rose-600 transition p-1"
                    aria-label="Remove Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 text-xs font-bold text-stone-600 hover:text-gold-600 transition pt-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>

          {/* Order Summary Sidebar */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-md h-fit space-y-6">
            <h3 className="font-serif text-base font-bold text-noir-900 uppercase tracking-wider pb-4 border-b border-stone-100">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount</span>
                  <span>-{formatCurrency(couponDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>VIP Express Shipping</span>
                <span>{shippingFee === 0 ? 'FREE' : formatCurrency(shippingFee)}</span>
              </div>
              <div className="flex justify-between text-noir-900 font-bold text-base border-t border-stone-200 pt-3">
                <span>Total</span>
                <span className="font-serif text-gold-600">{formatCurrency(total)}</span>
              </div>
            </div>

            <button
              onClick={() => router.push('/checkout')}
              className="w-full bg-noir-900 hover:bg-gold-600 text-white font-sans text-xs uppercase tracking-widest font-bold py-4 rounded-xl transition shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-500 space-y-2">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-gold-600 shrink-0" />
                <span>100% Secure Encrypted Paystack & Bank Transfer</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
