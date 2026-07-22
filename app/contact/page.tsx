'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, Sparkles } from 'lucide-react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+2348012345678';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-16 font-sans">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs uppercase font-bold tracking-[0.3em] text-gold-600 flex items-center justify-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>24/7 Client Concierge</span>
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-noir-900 uppercase">
            Get In Touch
          </h1>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            Our private client styling advisors are ready to assist you with bespoke fitting, jewelry customization, or corporate gift reservations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Info Side */}
          <div className="space-y-4">
            <div className="p-6 bg-noir-950 text-white rounded-3xl border border-gold-500/30 space-y-4 shadow-xl">
              <h3 className="font-serif text-lg font-bold text-white uppercase border-b border-stone-800 pb-3">
                Lagos Concierge
              </h3>

              <div className="space-y-3 text-xs text-stone-300 font-sans">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <span>VIP Lounge: Plot 15, Admiralty Way, Lekki Phase 1, Lagos, Nigeria</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>{whatsappNumber}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>concierge@darmhiescollections.com</span>
                </div>
              </div>

              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-bold uppercase tracking-wider py-3 rounded-xl flex items-center justify-center space-x-2 transition shadow mt-4"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat On WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Form Side */}
          <div className="md:col-span-2 bg-white p-8 rounded-3xl border border-stone-200/80 shadow-md">
            {sent ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h3 className="font-serif text-lg font-bold text-noir-900">Message Transmitted</h3>
                <p className="text-xs text-stone-500">
                  Thank you darling. A personal styling concierge will reply to your email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-noir-900 uppercase pb-2 border-b border-stone-100">
                  Send A Direct Note
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-800 uppercase block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Lady Fatima"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-800 uppercase block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="fatima@example.com"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-800 uppercase block mb-1">Inquiry Topic</label>
                  <select className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold-500 font-sans">
                    <option>Product Sizing & Fit Advice</option>
                    <option>Solid Gold Chain Customization</option>
                    <option>Order Tracking Inquiry</option>
                    <option>Bridal & Gala Wholesale Enquiries</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-800 uppercase block mb-1">Your Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your request..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs focus:outline-none focus:border-gold-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-noir-900 hover:bg-gold-600 text-white font-sans text-xs uppercase tracking-widest font-bold py-3.5 rounded-xl transition flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4 text-gold-400" />
                  <span>Transmit Note</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
