'use client';

import React, { useState } from 'react';
import { Tag, Plus, X } from 'lucide-react';
import { mockDB } from '@/lib/mock-db';
import { Coupon } from '@/types';
import { formatCurrency } from '@/lib/utils';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(mockDB.getCoupons());
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    code: '',
    discountType: 'PERCENTAGE' as 'PERCENTAGE' | 'FIXED',
    discountValue: 15,
    minSpend: 50000,
  });

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code) return;

    const newCoup = mockDB.createCoupon({
      code: formData.code.toUpperCase(),
      discountType: formData.discountType,
      discountValue: Number(formData.discountValue),
      minSpend: Number(formData.minSpend),
      isActive: true,
    });

    setCoupons([newCoup, ...coupons]);
    setModalOpen(false);
    setFormData({ code: '', discountType: 'PERCENTAGE', discountValue: 15, minSpend: 50000 });
  };

  return (
    <div className="space-y-8 font-sans">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-extrabold text-noir-900 uppercase">
            Promo Codes & Coupons
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Configure discount structures and promotional campaign voucher codes.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-noir-900 hover:bg-gold-600 text-white font-sans text-xs uppercase tracking-widest font-bold px-6 py-3.5 rounded-xl transition shadow flex items-center space-x-2"
        >
          <Plus className="w-4 h-4 text-gold-400" />
          <span>Create Coupon</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="p-4">Coupon Code</th>
                <th className="p-4">Discount</th>
                <th className="p-4">Minimum Spend</th>
                <th className="p-4">Times Used</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-100 text-stone-700">
              {coupons.map((coup) => (
                <tr key={coup.id} className="hover:bg-stone-50/80 transition">
                  <td className="p-4 font-serif font-bold text-noir-900 text-sm">
                    <span className="bg-gold-50 border border-gold-300 text-gold-800 px-3 py-1 rounded-lg">
                      {coup.code}
                    </span>
                  </td>

                  <td className="p-4 font-bold text-stone-800">
                    {coup.discountType === 'PERCENTAGE' 
                      ? `${coup.discountValue}% OFF` 
                      : `-${formatCurrency(coup.discountValue)}`}
                  </td>

                  <td className="p-4 text-stone-600">
                    {formatCurrency(coup.minSpend)}
                  </td>

                  <td className="p-4 font-bold text-stone-800">
                    {coup.usedCount} Redemptions
                  </td>

                  <td className="p-4">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-noir-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-gold-300 relative">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-noir-900">
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-lg font-bold text-noir-900 uppercase mb-4">
              Create New Coupon Code
            </h3>

            <form onSubmit={handleCreateCoupon} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-800 uppercase block mb-1">Promo Code Name *</label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g. VIP2026"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold-500 uppercase font-mono font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 uppercase block mb-1">Discount Type</label>
                <select
                  value={formData.discountType}
                  onChange={(e: any) => setFormData({ ...formData, discountType: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs font-sans font-bold focus:outline-none focus:border-gold-500"
                >
                  <option value="PERCENTAGE">Percentage (%) Discount</option>
                  <option value="FIXED">Fixed Amount ({process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'}) Discount</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 uppercase block mb-1">Discount Value</label>
                <input
                  type="number"
                  required
                  value={formData.discountValue}
                  onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 uppercase block mb-1">Minimum Order Spend ({process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'})</label>
                <input
                  type="number"
                  required
                  value={formData.minSpend}
                  onChange={(e) => setFormData({ ...formData, minSpend: Number(e.target.value) })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-noir-900 hover:bg-gold-600 text-white font-sans text-xs uppercase font-bold py-3 rounded-xl transition shadow"
              >
                Publish Coupon
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
