'use client';

import React, { useState } from 'react';
import { Newspaper, Plus, X } from 'lucide-react';
import { mockDB } from '@/lib/mock-db';
import { NewsPromotion } from '@/types';
import { formatDate } from '@/lib/utils';

export default function AdminContentPage() {
  const [news, setNews] = useState<NewsPromotion[]>(mockDB.getNews());
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    content: '',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800',
  });

  const handleCreateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    mockDB.createNews({
      title: formData.title,
      subtitle: formData.subtitle,
      content: formData.content,
      imageUrl: formData.imageUrl,
      isActive: true,
    });

    setNews([...mockDB.getNews()]);
    setModalOpen(false);
    setFormData({ title: '', subtitle: '', content: '', imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800' });
  };

  return (
    <div className="space-y-8 font-sans">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-extrabold text-noir-900 uppercase">
            News & Banners Management
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Publish brand editorial releases, campaign banners, and VIP event announcements.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-noir-900 hover:bg-gold-600 text-white font-sans text-xs uppercase tracking-widest font-bold px-6 py-3.5 rounded-xl transition shadow flex items-center space-x-2"
        >
          <Plus className="w-4 h-4 text-gold-400" />
          <span>Publish Article</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              {item.imageUrl && (
                <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover rounded-2xl border border-stone-200" />
              )}
              <span className="text-[10px] text-stone-400 font-bold block">{formatDate(item.createdAt)}</span>
              <h3 className="font-serif text-lg font-bold text-noir-900 uppercase">{item.title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">{item.content}</p>
            </div>

            <div className="pt-3 border-t border-stone-100 flex justify-between items-center text-xs">
              <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full">
                Active Release
              </span>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-noir-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-gold-300 relative">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-noir-900">
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-lg font-bold text-noir-900 uppercase mb-4">
              Publish Editorial Banner
            </h3>

            <form onSubmit={handleCreateNews} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-800 uppercase block mb-1">Headline Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Autumn Gold Fine Collection Release"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 uppercase block mb-1">Subtitle</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 uppercase block mb-1">Banner Image URL</label>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 uppercase block mb-1">Article Content *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs focus:outline-none focus:border-gold-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-noir-900 hover:bg-gold-600 text-white font-sans text-xs uppercase font-bold py-3 rounded-xl transition shadow"
              >
                Publish Campaign Release
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
