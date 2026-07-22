'use client';

import React, { useState } from 'react';
import { Users, ShieldAlert, ShieldCheck, Search } from 'lucide-react';
import { mockDB } from '@/lib/mock-db';
import { Customer } from '@/types';
import { formatCurrency } from '@/lib/utils';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockDB.getCustomers());
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter(
    c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleSuspend = (id: string) => {
    mockDB.toggleCustomerSuspend(id);
    setCustomers([...mockDB.getCustomers()]);
  };

  return (
    <div className="space-y-8 font-sans">
      
      <div>
        <h1 className="font-serif text-3xl font-extrabold text-noir-900 uppercase">
          VIP Customer Directory
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Review client purchase metrics and manage account permissions.
        </p>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-gold-500"
        />
        <Search className="w-4 h-4 text-stone-400 absolute left-7 top-1/2 -translate-y-1/2" />
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="p-4">Customer Profile</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Orders Placed</th>
                <th className="p-4">Total Spent</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Account Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filteredCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-stone-50/80 transition">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img src={c.avatarUrl} alt={c.name} className="w-10 h-10 rounded-full object-cover border border-gold-300" />
                      <div>
                        <h4 className="font-bold text-stone-900">{c.name}</h4>
                        <span className="text-[10px] text-stone-400">{c.email}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 font-mono text-[11px] text-stone-600">
                    {c.phone || 'N/A'}
                  </td>

                  <td className="p-4 font-bold text-stone-800">
                    {c.totalOrders || 0} Orders
                  </td>

                  <td className="p-4 font-serif font-bold text-gold-600">
                    {formatCurrency(c.totalSpent || 0)}
                  </td>

                  <td className="p-4">
                    {c.isSuspended ? (
                      <span className="bg-rose-100 text-rose-800 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">
                        Suspended
                      </span>
                    ) : (
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">
                        Active VIP
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleToggleSuspend(c.id)}
                      className={`px-3 py-1.5 rounded-xl font-bold uppercase text-[10px] transition ${
                        c.isSuspended 
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                          : 'bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white'
                      }`}
                    >
                      {c.isSuspended ? 'Reactivate' : 'Suspend'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
