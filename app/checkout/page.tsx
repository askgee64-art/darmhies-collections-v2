'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  CreditCard, 
  Building2, 
  ShieldCheck, 
  Lock
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { mockDB } from '@/lib/mock-db';
import { formatCurrency } from '@/lib/utils';
import { getPaystackPublicKey } from '@/lib/paystack';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, shippingFee, total, couponDiscount, appliedCoupon, clearCart } = useCart();
  const { user } = useAuth();

  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || "Store Concierge";
  const bankName = process.env.NEXT_PUBLIC_BANK_NAME || "Guaranty Trust Bank (GTBank)";
  const bankAccName = process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME || `${storeName.toUpperCase()} LTD`;
  const bankAccNum = process.env.NEXT_PUBLIC_BANK_ACCOUNT_NUMBER || "0123456789";
  const paystackPublicKey = getPaystackPublicKey();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: '',
    city: 'Lekki',
    state: 'Lagos State',
    country: 'Nigeria',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'PAYSTACK' | 'BANK_TRANSFER'>('PAYSTACK');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 py-20 flex flex-col items-center justify-center text-center font-sans">
        <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">No Items To Checkout</h2>
        <p className="text-xs text-stone-500 mb-6">Your shopping bag is currently empty.</p>
        <button
          onClick={() => router.push('/shop')}
          className="bg-stone-900 text-white font-sans text-xs font-extrabold uppercase tracking-widest px-8 py-3.5 rounded-2xl hover:bg-primary transition"
        >
          Return To Shop
        </button>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.street) {
      alert('Please complete all shipping address fields.');
      return;
    }

    setIsSubmitting(true);

    const orderItems = cart.map(i => ({
      id: `oi-${Math.random().toString(36).substr(2, 6)}`,
      productId: i.product.id,
      title: i.product.title,
      price: i.product.price,
      quantity: i.quantity,
      variant: i.variant,
      imageUrl: i.product.images[0]?.url,
    }));

    const reference = `REF_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;

    const createdOrder = mockDB.createOrder({
      customerId: user?.id,
      customerName: formData.fullName,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      shippingAddress: {
        id: `addr-${Date.now()}`,
        fullName: formData.fullName,
        phone: formData.phone,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        country: formData.country,
      },
      items: orderItems,
      subtotal,
      discountAmount: couponDiscount,
      shippingFee,
      totalAmount: total,
      paymentMethod,
      paymentStatus: paymentMethod === 'PAYSTACK' ? 'COMPLETED' : 'PENDING',
      paymentReference: reference,
      status: paymentMethod === 'PAYSTACK' ? 'PAID' : 'PENDING',
      notes: formData.notes,
      couponCode: appliedCoupon?.code,
    });

    clearCart();
    setIsSubmitting(false);

    router.push(`/order-confirmation/${createdOrder.id}`);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12 font-sans">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="mb-8">
          <h1 className="font-extrabold text-3xl text-stone-900 uppercase">
            VIP Order Checkout
          </h1>
          <p className="text-xs text-stone-500 mt-1 font-medium">
            Complete your information for delivery.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            
            {/* Delivery Details */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-stone-200/80 shadow-md space-y-6">
              <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider pb-3 border-b border-stone-100">
                1. Delivery & Contact Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-800 uppercase block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-800 uppercase block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-800 uppercase block mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1234567890"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-800 uppercase block mb-1">
                    State / Region *
                  </label>
                  <input
                    type="text"
                    required
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State / Region"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 uppercase block mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  placeholder="Street Address, House Number..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 uppercase block mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Special instructions..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-stone-200/80 shadow-md space-y-6">
              <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider pb-3 border-b border-stone-100">
                2. Select Payment Gateway
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label
                  onClick={() => setPaymentMethod('PAYSTACK')}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition flex items-start space-x-3 ${
                    paymentMethod === 'PAYSTACK'
                      ? 'border-primary bg-rose-50/40'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'PAYSTACK'}
                    onChange={() => setPaymentMethod('PAYSTACK')}
                    className="mt-1 accent-primary"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <CreditCard className="w-4 h-4 text-primary" />
                      <span className="font-extrabold text-sm text-stone-900">Paystack Gateway</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1">
                      Card, USSD, Apple Pay, or online transfer.
                    </p>
                    <p className="text-[9px] text-stone-400 font-mono mt-1">
                      Key: {paystackPublicKey.substring(0, 10)}...
                    </p>
                  </div>
                </label>

                <label
                  onClick={() => setPaymentMethod('BANK_TRANSFER')}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition flex items-start space-x-3 ${
                    paymentMethod === 'BANK_TRANSFER'
                      ? 'border-primary bg-rose-50/40'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'BANK_TRANSFER'}
                    onChange={() => setPaymentMethod('BANK_TRANSFER')}
                    className="mt-1 accent-primary"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-4 h-4 text-primary" />
                      <span className="font-extrabold text-sm text-stone-900">Direct Bank Transfer</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1">
                      Transfer directly to official corporate account.
                    </p>
                  </div>
                </label>
              </div>

              {/* Bank Details Displayed Dynamically from .env */}
              {paymentMethod === 'BANK_TRANSFER' && (
                <div className="p-5 bg-stone-900 text-stone-200 rounded-2xl space-y-2 text-xs border border-stone-800">
                  <span className="text-rose-400 font-extrabold uppercase tracking-wider block text-[10px]">
                    {storeName} Bank Transfer Instructions
                  </span>
                  <p><strong>Bank:</strong> {bankName}</p>
                  <p><strong>Account Name:</strong> {bankAccName}</p>
                  <p><strong>Account Number:</strong> {bankAccNum}</p>
                  <p className="text-[10px] text-stone-400 pt-1">
                    * Use your Full Name or Order Reference as payment note.
                  </p>
                </div>
              )}

            </div>

          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-md h-fit space-y-6">
            <h3 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider pb-3 border-b border-stone-100">
              Your Order ({cart.length})
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map(item => (
                <div key={item.id} className="flex items-center space-x-3 text-xs">
                  <img
                    src={item.product.images[0]?.url}
                    alt={item.product.title}
                    className="w-12 h-12 object-cover rounded-lg border border-stone-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-stone-900 truncate">{item.product.title}</h5>
                    <p className="text-[10px] text-stone-400">Qty: {item.quantity} {item.variant ? `| ${item.variant}` : ''}</p>
                  </div>
                  <span className="font-extrabold text-stone-900">
                    {formatCurrency(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-stone-100 pt-4 text-xs font-sans">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount</span>
                  <span>-{formatCurrency(couponDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Shipping Fee</span>
                <span>{shippingFee === 0 ? 'FREE' : formatCurrency(shippingFee)}</span>
              </div>
              <div className="flex justify-between text-stone-900 font-black text-lg border-t border-stone-200 pt-3">
                <span>Total Due</span>
                <span className="text-primary">{formatCurrency(total)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary disabled:opacity-50 text-white font-sans text-xs uppercase tracking-widest font-extrabold py-4 rounded-full transition shadow-xl shadow-primary/30 flex items-center justify-center space-x-2"
            >
              <Lock className="w-4 h-4 text-white" />
              <span>{isSubmitting ? 'Processing Order...' : 'Complete VIP Order'}</span>
            </button>

            <div className="flex items-center justify-center space-x-2 text-[10px] text-stone-400 font-sans font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>256-Bit SSL Encrypted Transaction</span>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
