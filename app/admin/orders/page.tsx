'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Search, 
  ExternalLink, 
  Truck, 
  CheckCircle2, 
  Clock, 
  XCircle,
  Sparkles
} from 'lucide-react';
import { mockDB } from '@/lib/mock-db';
import { Order, OrderStatus } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockDB.getOrders());
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [trackingModalOrder, setTrackingModalOpen] = useState<Order | null>(null);
  const [trackingInput, setTrackingInput] = useState('');

  const statusOptions: Array<OrderStatus | 'ALL'> = [
    'ALL',
    'PENDING',
    'PAID',
    'PROCESSING',
    'SHIPPED',
    'DELIVERED',
    'CANCELLED',
  ];

  const filteredOrders = orders.filter(
    o => filterStatus === 'ALL' || o.status === filterStatus
  );

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    mockDB.updateOrderStatus(orderId, newStatus);
    setOrders([...mockDB.getOrders()]);
  };

  const handleSaveTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingModalOrder && trackingInput) {
      mockDB.updateOrderStatus(trackingModalOrder.id, trackingModalOrder.status, trackingInput);
      setOrders([...mockDB.getOrders()]);
      setTrackingModalOpen(null);
      setTrackingInput('');
    }
  };

  return (
    <div className="space-y-8 font-sans">
      
      <div>
        <h1 className="font-serif text-3xl font-extrabold text-noir-900 uppercase">
          Order Processing & Dispatch Command
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Monitor incoming purchases, update delivery status, and issue tracking IDs.
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {statusOptions.map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
              filterStatus === st
                ? 'bg-noir-900 text-gold-300 shadow-md'
                : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="p-4">Order ID & Date</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Dispatch Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-stone-50/80 transition">
                  <td className="p-4">
                    <span className="font-serif font-bold text-noir-900 block">{ord.orderNumber}</span>
                    <span className="text-[10px] text-stone-400">{formatDate(ord.createdAt)}</span>
                  </td>

                  <td className="p-4">
                    <span className="font-bold text-stone-900 block">{ord.customerName}</span>
                    <span className="text-[10px] text-stone-400">{ord.customerEmail}</span>
                  </td>

                  <td className="p-4 font-serif font-bold text-gold-600">
                    {formatCurrency(ord.totalAmount)}
                  </td>

                  <td className="p-4">
                    <span className="bg-stone-100 text-stone-800 font-bold text-[10px] px-2.5 py-1 rounded">
                      {ord.paymentMethod}
                    </span>
                  </td>

                  <td className="p-4">
                    <select
                      value={ord.status}
                      onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatus)}
                      className="bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-noir-900 focus:outline-none focus:border-gold-500"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="PAID">Paid</option>
                      <option value="PROCESSING">Processing</option>
                      <option value="SHIPPED">Shipped</option>
                      <option value="DELIVERED">Delivered</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </td>

                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setTrackingModalOpen(ord);
                        setTrackingInput(ord.trackingNumber || '');
                      }}
                      className="p-2 text-gold-600 hover:bg-gold-50 bg-stone-50 rounded-lg transition inline-block font-bold text-[11px]"
                      aria-label="Assign Tracking Code"
                    >
                      Tracking ID
                    </button>

                    <Link
                      href={`/order-confirmation/${ord.id}`}
                      target="_blank"
                      className="p-2 text-stone-600 hover:text-noir-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition inline-block"
                      aria-label="View Invoice"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tracking Number Input Modal */}
      {trackingModalOrder && (
        <div className="fixed inset-0 z-50 bg-noir-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-gold-300 relative">
            <h3 className="font-serif text-lg font-bold text-noir-900 uppercase mb-2">
              Assign Courier Tracking Code
            </h3>
            <p className="text-xs text-stone-500 mb-4">Order #{trackingModalOrder.orderNumber}</p>

            <form onSubmit={handleSaveTracking} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-800 uppercase block mb-1">
                  Tracking Code / Waybill Ref
                </label>
                <input
                  type="text"
                  required
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  placeholder="e.g. TRK-VIP-9921"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setTrackingModalOpen(null)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold uppercase rounded-xl"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-noir-900 hover:bg-gold-600 text-white text-xs font-bold uppercase rounded-xl"
                >
                  Save Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
