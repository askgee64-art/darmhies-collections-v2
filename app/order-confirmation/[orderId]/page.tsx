'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  CheckCircle2, 
  MessageCircle, 
  Printer, 
  PackageCheck, 
  Truck, 
  MapPin, 
  ShoppingBag, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { mockDB } from '@/lib/mock-db';
import { formatCurrency, formatDate, generateWhatsAppOrderUrl } from '@/lib/utils';

export default function OrderConfirmationPage() {
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || "The Luxury Vault";
  const params = useParams();
  const orderId = params.orderId as string;

  const order = mockDB.getOrderById(orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-stone-50 py-20 flex flex-col items-center justify-center text-center">
        <h2 className="font-serif text-2xl font-bold text-noir-900 mb-2">Order Not Found</h2>
        <p className="text-xs text-stone-500 mb-6">We could not locate reference for this order.</p>
        <Link href="/shop" className="bg-noir-900 text-white font-sans text-xs uppercase tracking-widest px-6 py-3 rounded-xl">
          Return To Shop
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+2348012345678';
  const dispatchMessage = `Hello {storeName}! 👋 I would like to inquire about dispatch for my Order *${order.orderNumber}* (Total: ${formatCurrency(order.totalAmount)}).`;
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(dispatchMessage)}`;

  return (
    <div className="min-h-screen bg-stone-50 py-12 font-sans">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        
        {/* Success Card Header */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-stone-200 shadow-md space-y-6 mb-8 text-center relative overflow-hidden">
          <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-600 shadow-lg">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-accent flex items-center justify-center space-x-1 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Thank You For Your Order</span>
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-noir-900">
              Order Confirmed: {order.orderNumber}
            </h1>
            <p className="text-xs text-stone-500 mt-2">
              A confirmation summary has been logged for <strong>{order.customerEmail || 'Valued Client'}</strong>.
            </p>
          </div>

          {/* Timeline Tracking Status */}
          <div className="pt-6 border-t border-stone-100 max-w-xl mx-auto">
            <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold uppercase tracking-wider">
              <div className="text-emerald-600 space-y-1">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto font-bold text-xs">✓</div>
                <span>Order Placed</span>
              </div>
              <div className={order.status !== 'PENDING' ? 'text-emerald-600 space-y-1' : 'text-stone-300 space-y-1'}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mx-auto font-bold text-xs ${order.status !== 'PENDING' ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-500'}`}>✓</div>
                <span>Payment Paid</span>
              </div>
              <div className={['PROCESSING', 'SHIPPED', 'DELIVERED'].includes(order.status) ? 'text-emerald-600 space-y-1' : 'text-stone-300 space-y-1'}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mx-auto font-bold text-xs ${['PROCESSING', 'SHIPPED', 'DELIVERED'].includes(order.status) ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-500'}`}>✓</div>
                <span>Dispatched</span>
              </div>
              <div className={order.status === 'DELIVERED' ? 'text-emerald-600 space-y-1' : 'text-stone-300 space-y-1'}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mx-auto font-bold text-xs ${order.status === 'DELIVERED' ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-500'}`}>✓</div>
                <span>Delivered</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl flex items-center space-x-2 shadow transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Confirm Dispatch on WhatsApp</span>
            </a>

            <button
              onClick={handlePrint}
              className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl flex items-center space-x-2 transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print Order Receipt</span>
            </button>
          </div>
        </div>

        {/* Detailed Invoice Card */}
        <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-md space-y-8">
          
          <div className="flex flex-col sm:flex-row justify-between pb-6 border-b border-stone-200 space-y-4 sm:space-y-0">
            <div>
              <span className="text-[10px] uppercase font-bold text-accent tracking-wider">
                {storeName} Luxury Collections
              </span>
              <h3 className="font-serif text-lg font-bold text-noir-900">Official Client Receipt</h3>
              <p className="text-xs text-stone-500">Date: {formatDate(order.createdAt)}</p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs font-bold text-stone-800 block">Status: <strong className="text-emerald-600 uppercase">{order.status}</strong></span>
              <span className="text-xs font-bold text-stone-800 block mt-1">Payment Method: {order.paymentMethod}</span>
              {order.trackingNumber && (
                <span className="text-xs text-accent font-bold block mt-1">Tracking ID: {order.trackingNumber}</span>
              )}
            </div>
          </div>

          {/* Delivery Address & Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2 text-xs text-stone-700 bg-stone-50 p-5 rounded-2xl border border-stone-200">
              <h4 className="font-serif font-bold text-noir-900 uppercase flex items-center space-x-1.5 text-xs">
                <MapPin className="w-4 h-4 text-accent" />
                <span>Shipping Destination</span>
              </h4>
              <p className="font-bold text-stone-900">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country}</p>
              <p className="pt-1">Phone: {order.shippingAddress.phone}</p>
            </div>

            {/* Order Items Table */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-noir-900 uppercase text-xs">Items Summary</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {order.items.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-xs p-2 bg-stone-50 rounded-xl">
                    <div>
                      <span className="font-bold text-stone-900 block truncate max-w-[200px]">{item.title}</span>
                      <span className="text-[10px] text-stone-500">Qty: {item.quantity} {item.variant ? `(${item.variant})` : ''}</span>
                    </div>
                    <span className="font-serif font-bold text-noir-900">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Total Calculation */}
              <div className="pt-3 border-t border-stone-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(order.subtotal)}</span>
                </div>
                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount</span>
                    <span>-{formatCurrency(order.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Shipping</span>
                  <span>{order.shippingFee === 0 ? 'FREE' : formatCurrency(order.shippingFee)}</span>
                </div>
                <div className="flex justify-between text-noir-900 font-bold text-sm border-t border-stone-200 pt-2">
                  <span>Total Amount</span>
                  <span className="font-serif text-accent">{formatCurrency(order.totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
