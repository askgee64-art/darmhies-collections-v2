'use client';

import React from 'react';
import Link from 'next/link';
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Crown, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { mockDB } from '@/lib/mock-db';
import { formatCurrency } from '@/lib/utils';

export default function AdminAnalyticsOverview() {
  const products = mockDB.getProducts();
  const orders = mockDB.getOrders();
  const customers = mockDB.getCustomers();

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const lowStockProducts = products.filter(p => p.stock < 10);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 5);

  return (
    <div className="space-y-8 font-sans">
      
      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600 flex items-center space-x-1 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>Executive Command Center</span>
          </span>
          <h1 className="font-serif text-3xl font-extrabold text-noir-900 uppercase">
            Platform Analytics & KPI Overview
          </h1>
        </div>

        <Link
          href="/admin/products"
          className="bg-noir-900 hover:bg-gold-600 text-white font-sans text-xs uppercase tracking-widest font-bold px-6 py-3 rounded-xl transition shadow"
        >
          Manage Catalog (+ Add Product)
        </Link>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-2 relative overflow-hidden">
          <div className="flex justify-between items-center text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Revenue</span>
            <DollarSign className="w-5 h-5 text-gold-600" />
          </div>
          <div className="font-serif text-2xl font-bold text-noir-900">
            {formatCurrency(totalRevenue)}
          </div>
          <div className="text-[11px] text-emerald-600 font-bold flex items-center space-x-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+24.5% compared to last month</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
            <ShoppingBag className="w-5 h-5 text-gold-600" />
          </div>
          <div className="font-serif text-2xl font-bold text-noir-900">
            {orders.length} Completed Orders
          </div>
          <div className="text-[11px] text-stone-500">
            Average Order Value: <strong>{formatCurrency(totalRevenue / (orders.length || 1))}</strong>
          </div>
        </div>

        {/* Active Customers */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">VIP Client Accounts</span>
            <Users className="w-5 h-5 text-gold-600" />
          </div>
          <div className="font-serif text-2xl font-bold text-noir-900">
            {customers.length} Registered
          </div>
          <div className="text-[11px] text-emerald-600 font-bold">
            100% Account Retention Rate
          </div>
        </div>

        {/* Catalog Health */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">Vault Stock Health</span>
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <div className="font-serif text-2xl font-bold text-noir-900">
            {products.length} Active SKUs
          </div>
          <div className="text-[11px] text-amber-600 font-bold">
            {lowStockProducts.length} Products Low On Stock
          </div>
        </div>

      </div>

      {/* Tables Row: Low Stock Alerts & Best Sellers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Low Stock Inventory Warnings */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-stone-100">
            <h3 className="font-serif text-base font-bold text-noir-900 uppercase flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Low Stock Vault Inventory</span>
            </h3>
            <Link href="/admin/products" className="text-xs font-bold text-gold-600 hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {lowStockProducts.slice(0, 5).map(prod => (
              <div key={prod.id} className="flex justify-between items-center p-3 bg-stone-50 rounded-2xl text-xs">
                <div className="flex items-center space-x-3">
                  <img src={prod.images[0]?.url} alt={prod.title} className="w-10 h-10 object-cover rounded-lg border border-stone-200" />
                  <div>
                    <h5 className="font-bold text-stone-900 truncate max-w-[180px]">{prod.title}</h5>
                    <span className="text-[10px] text-stone-400">SKU: {prod.sku || 'N/A'}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-rose-600 block">{prod.stock} Units Left</span>
                  <span className="text-[10px] text-stone-400">{formatCurrency(prod.price)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Crown Best Sellers Breakdown */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-stone-100">
            <h3 className="font-serif text-base font-bold text-noir-900 uppercase flex items-center space-x-2">
              <Crown className="w-4 h-4 text-gold-500" />
              <span>Iconic Best Sellers</span>
            </h3>
            <Link href="/admin/products" className="text-xs font-bold text-gold-600 hover:underline">
              Catalog
            </Link>
          </div>

          <div className="space-y-3">
            {bestSellers.map(prod => (
              <div key={prod.id} className="flex justify-between items-center p-3 bg-stone-50 rounded-2xl text-xs">
                <div className="flex items-center space-x-3">
                  <img src={prod.images[0]?.url} alt={prod.title} className="w-10 h-10 object-cover rounded-lg border border-stone-200" />
                  <div>
                    <h5 className="font-bold text-stone-900 truncate max-w-[180px]">{prod.title}</h5>
                    <span className="text-[10px] text-stone-400">{prod.categoryName}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-serif text-xs font-bold text-noir-900 block">{formatCurrency(prod.price)}</span>
                  <span className="text-[10px] text-emerald-600 font-bold">★ {prod.rating || 5.0} Rating</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
