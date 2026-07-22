'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Truck, 
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatCurrency, generateWhatsAppCartOrderUrl } from '@/lib/utils';

export const DrawerCart: React.FC = () => {
  const router = useRouter();
  const { 
    cart, 
    isOpen, 
    setIsOpen, 
    removeItem, 
    updateQuantity, 
    subtotal, 
    shippingFee, 
    total, 
    appliedCoupon, 
    couponDiscount, 
    applyCouponCode, 
    removeCoupon,
    clearCart 
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ success?: boolean; text?: string }>({});
  const [loadingCoupon, setLoadingCoupon] = useState(false);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+2348012345678';
  const freeShippingThreshold = 100000;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  if (!isOpen) return null;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setLoadingCoupon(true);
    setCouponMsg({});
    const res = await applyCouponCode(couponInput.trim());
    setLoadingCoupon(false);
    setCouponMsg({ success: res.success, text: res.message });
    if (res.success) setCouponInput('');
  };

  const handleWhatsAppCheckout = () => {
    const itemsList = cart.map(item => ({
      title: item.product.title,
      price: item.product.price,
      quantity: item.quantity,
      variant: item.variant,
    }));

    const url = generateWhatsAppCartOrderUrl({
      phone: whatsappNumber,
      items: itemsList,
      total,
    });

    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-noir-950/70 backdrop-blur-sm transition-opacity duration-300">
      <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-gold-300/40">
          
          {/* Header */}
          <div className="p-5 bg-noir-900 text-white flex justify-between items-center border-b border-gold-500/30">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-gold-400" />
              <h2 className="font-serif text-lg font-bold uppercase tracking-wider">
                Shopping Bag ({cart.length})
              </h2>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-noir-800 rounded-full text-stone-400 hover:text-white transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Free Express Shipping Progress Bar */}
          <div className="bg-stone-50 p-3 px-5 border-b border-stone-200">
            <div className="flex justify-between items-center text-xs text-stone-700 mb-1.5 font-sans">
              <span className="flex items-center space-x-1 font-semibold">
                <Truck className="w-3.5 h-3.5 text-gold-600" />
                <span>
                  {subtotal >= freeShippingThreshold 
                    ? '🎉 You unlocked FREE VIP Courier Delivery!' 
                    : `Add ${formatCurrency(freeShippingThreshold - subtotal)} for Free Delivery`}
                </span>
              </span>
            </div>
            <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gold-500 h-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-noir-900">Your Bag is Empty</h3>
                  <p className="text-xs text-stone-500 mt-1 max-w-xs">
                    Explore our haute couture collections, fine jewelry, and cosmetics.
                  </p>
                </div>
                <button
                  onClick={() => { setIsOpen(false); router.push('/shop'); }}
                  className="mt-4 bg-noir-900 hover:bg-gold-600 text-white font-sans text-xs uppercase tracking-widest px-6 py-3 rounded-xl font-bold transition"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex space-x-4 p-3 bg-stone-50 rounded-2xl border border-stone-200/80 hover:border-gold-300 transition">
                  <img 
                    src={item.product.images[0]?.url} 
                    alt={item.product.title} 
                    className="w-20 h-20 object-cover rounded-xl border border-stone-200"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-xs font-bold text-stone-900 line-clamp-2">
                          {item.product.title}
                        </h4>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-stone-400 hover:text-rose-600 transition p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {item.variant && (
                        <span className="text-[10px] bg-stone-200 text-stone-700 px-2 py-0.5 rounded uppercase font-semibold inline-block mt-1">
                          {item.variant}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center space-x-2 border border-stone-300 rounded-lg bg-white p-0.5">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-stone-100 text-stone-600 rounded"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-5 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-stone-100 text-stone-600 rounded"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-sans text-xs font-bold text-noir-900">
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-stone-200 space-y-4">
              
              {/* Coupon Code Section */}
              {appliedCoupon ? (
                <div className="flex justify-between items-center p-2.5 bg-gold-50 border border-gold-300 rounded-xl text-xs">
                  <span className="flex items-center space-x-1.5 text-gold-800 font-bold">
                    <Tag className="w-4 h-4 text-gold-600" />
                    <span>Promo Applied: {appliedCoupon.code}</span>
                  </span>
                  <button onClick={removeCoupon} className="text-rose-600 font-bold hover:underline">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter Coupon (e.g. LUXURY10)"
                    className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs uppercase focus:outline-none focus:border-gold-500"
                  />
                  <button
                    type="submit"
                    disabled={loadingCoupon}
                    className="bg-stone-900 hover:bg-gold-600 text-white font-sans text-xs uppercase font-bold px-3 py-2 rounded-xl transition"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponMsg.text && (
                <p className={`text-[11px] ${couponMsg.success ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {couponMsg.text}
                </p>
              )}

              {/* Price Calculation Breakdown */}
              <div className="space-y-1.5 text-xs font-sans border-t border-stone-100 pt-3">
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
                  <span>Estimated Delivery</span>
                  <span>{shippingFee === 0 ? 'FREE' : formatCurrency(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-noir-900 font-bold text-sm border-t border-stone-200 pt-2">
                  <span>Total Amount</span>
                  <span className="text-gold-600 font-serif text-base">{formatCurrency(total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    router.push('/checkout');
                  }}
                  className="w-full bg-noir-900 hover:bg-gold-600 text-white font-sans text-xs uppercase tracking-widest py-3.5 rounded-xl font-bold transition flex items-center justify-center space-x-2 shadow-lg"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs uppercase tracking-widest py-3 rounded-xl font-bold transition flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order Directly via WhatsApp</span>
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
