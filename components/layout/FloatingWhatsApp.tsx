'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [openPopover, setOpenPopover] = useState(false);
  const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+2348012345678').replace(/[^0-9]/g, '');
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || "Store Concierge";

  const directWhatsAppUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello ${storeName}! 👋 I would like to make an inquiry.`)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end font-sans">
      
      {openPopover && (
        <div className="mb-3 w-72 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-stone-900 p-4 text-white flex justify-between items-center border-b border-stone-800">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider">{storeName} Support</span>
            </div>
            <button onClick={() => setOpenPopover(false)} className="text-stone-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3 bg-stone-50">
            <div className="p-3 bg-white rounded-xl border border-stone-200 text-xs text-stone-700 leading-relaxed font-medium">
              👋 Welcome to <strong>{storeName}</strong>! How may we assist you today?
            </div>

            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center justify-center space-x-2 transition shadow"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Start Live Chat</span>
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpenPopover(!openPopover)}
        className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl flex items-center justify-center relative transition-transform duration-300 hover:scale-105 group border-2 border-white"
        aria-label="Contact Concierge on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-white flex items-center justify-center">
          <Sparkles className="w-2.5 h-2.5 text-white" />
        </span>
      </button>

    </div>
  );
};
