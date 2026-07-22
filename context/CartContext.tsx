'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Coupon } from '@/types';

interface CartContextType {
  cart: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (product: Product, quantity?: number, variant?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  couponDiscount: number;
  applyCouponCode: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  subtotal: number;
  shippingFee: number;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);

  // Load cart from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('darmhie_cart');
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved cart');
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('darmhie_cart', JSON.stringify(cart));
  }, [cart]);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingFee = subtotal > 100000 || cart.length === 0 ? 0 : 5000;
  const total = Math.max(0, subtotal - couponDiscount + shippingFee);
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const addItem = (product: Product, quantity = 1, variant?: string) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.productId === product.id && item.variant === variant
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          productId: product.id,
          product,
          variant,
          quantity,
        };
        return [...prev, newItem];
      }
    });

    setIsOpen(true);
  };

  const removeItem = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setCouponDiscount(0);
  };

  const applyCouponCode = async (code: string) => {
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, subtotal }),
      });
      const data = await res.json();
      if (data.valid) {
        setAppliedCoupon(data.coupon);
        setCouponDiscount(data.discount);
        return { success: true, message: `Coupon ${code.toUpperCase()} applied! Discount: ₦${data.discount.toLocaleString()}` };
      } else {
        return { success: false, message: data.message || 'Invalid coupon code' };
      }
    } catch (e) {
      return { success: false, message: 'Network error validating coupon' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        setIsOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        appliedCoupon,
        couponDiscount,
        applyCouponCode,
        removeCoupon,
        subtotal,
        shippingFee,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
