'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Package, 
  MapPin, 
  Heart, 
  LogOut, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink,
  Clock
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { mockDB } from '@/lib/mock-db';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function AccountPage() {
  const router = useRouter();
  const { user, logout, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>('orders');

  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [saveMsg, setSaveMsg] = useState(false);

  const orders = mockDB.getOrders();

  if (!user) {
    return (
      <div className="min-h-screen bg-stone-50 py-20 flex flex-col items-center justify-center text-center font-sans">
        <h2 className="font-serif text-2xl font-bold text-noir-900 mb-2">Access Portal Restricted</h2>
        <p className="text-xs text-stone-500 mb-6">Please sign in to view your orders and profile.</p>
        <Link href="/auth/login" className="bg-noir-900 text-white font-sans text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-xl hover:bg-gold-600 transition">
          Sign In
        </Link>
      </div>
    );
  }

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name: editName, phone: editPhone });
    setSaveMsg(true);
    setTimeout(() => setSaveMsg(false), 2000);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12 font-sans">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Customer Profile Header Banner */}
        <div className="bg-noir-950 text-white rounded-3xl p-8 md:p-10 mb-8 border border-gold-500/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-5 relative z-10">
            <img
              src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-gold-400 shadow-xl"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-white">
                  {user.name}
                </h1>
                <ShieldCheck className="w-5 h-5 text-gold-400" />
              </div>
              <p className="text-xs text-stone-400 mt-1">{user.email}</p>
              <div className="inline-flex items-center space-x-1 bg-gold-500/10 border border-gold-500/30 text-gold-300 text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full mt-2">
                <Sparkles className="w-3 h-3 text-gold-400" />
                <span>Verified VIP Circle Member</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => { logout(); router.push('/auth/login'); }}
            className="relative z-10 bg-rose-900/50 hover:bg-rose-800 text-rose-200 border border-rose-700/50 text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-xl transition flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Dashboard Tabs & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Tabs Menu Sidebar */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm h-fit space-y-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center space-x-3 ${
                activeTab === 'orders' ? 'bg-noir-900 text-gold-300' : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Order History ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center space-x-3 ${
                activeTab === 'addresses' ? 'bg-noir-900 text-gold-300' : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Saved Delivery Addresses</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center space-x-3 ${
                activeTab === 'profile' ? 'bg-noir-900 text-gold-300' : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Account Settings</span>
            </button>

            <Link
              href="/wishlist"
              className="w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-stone-600 hover:bg-stone-100 transition flex items-center space-x-3"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Saved Wishlist</span>
            </Link>
          </div>

          {/* Tab Views */}
          <div className="lg:col-span-3">
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h2 className="font-serif text-xl font-bold text-noir-900 uppercase mb-4">
                  Orders & Live Tracking
                </h2>

                {orders.length === 0 ? (
                  <div className="bg-white rounded-2xl p-10 text-center text-xs text-stone-500 border border-stone-200">
                    No order history recorded yet.
                  </div>
                ) : (
                  orders.map(ord => (
                    <div
                      key={ord.id}
                      className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row justify-between pb-4 border-b border-stone-100 space-y-2 sm:space-y-0">
                        <div>
                          <span className="font-serif text-sm font-bold text-noir-900">{ord.orderNumber}</span>
                          <span className="text-[10px] text-stone-400 block">{formatDate(ord.createdAt)}</span>
                        </div>

                        <div className="flex items-center space-x-3">
                          <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${
                            ord.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {ord.status}
                          </span>
                          <span className="font-serif text-sm font-bold text-gold-600">
                            {formatCurrency(ord.totalAmount)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {ord.items.map(item => (
                          <div key={item.id} className="flex items-center space-x-3 text-xs text-stone-700">
                            {item.imageUrl && (
                              <img src={item.imageUrl} alt={item.title} className="w-10 h-10 object-cover rounded-lg border border-stone-200" />
                            )}
                            <div className="flex-1 min-w-0">
                              <span className="font-bold text-stone-900 truncate block">{item.title}</span>
                              <span className="text-[10px] text-stone-400">Qty: {item.quantity} {item.variant ? `(${item.variant})` : ''}</span>
                            </div>
                            <span className="font-serif font-bold text-noir-900">{formatCurrency(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-stone-100 flex justify-between items-center text-xs">
                        <span className="text-stone-500 text-[11px]">Method: <strong>{ord.paymentMethod}</strong></span>
                        <Link
                          href={`/order-confirmation/${ord.id}`}
                          className="text-gold-600 font-bold hover:underline flex items-center space-x-1"
                        >
                          <span>View Invoice & Receipt</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
                <h2 className="font-serif text-xl font-bold text-noir-900 uppercase">
                  Saved Address Vault
                </h2>
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-1">
                  <span className="font-bold text-noir-900 block">{user.name} (Primary VIP Address)</span>
                  <p className="text-stone-600">15 Admiralty Way, Lekki Phase 1, Lagos State, Nigeria</p>
                  <p className="text-stone-500 text-[11px] pt-1">Phone: {user.phone}</p>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-6">
                <h2 className="font-serif text-xl font-bold text-noir-900 uppercase">
                  Personal Profile
                </h2>

                {saveMsg && (
                  <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl">
                    ✓ Profile details saved successfully.
                  </div>
                )}

                <form onSubmit={handleProfileSave} className="space-y-4 max-w-md">
                  <div>
                    <label className="text-xs font-bold text-stone-800 uppercase block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-800 uppercase block mb-1">
                      WhatsApp Phone
                    </label>
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-noir-900 hover:bg-gold-600 text-white font-sans text-xs uppercase font-bold px-6 py-3 rounded-xl transition"
                  >
                    Save Profile
                  </button>
                </form>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
