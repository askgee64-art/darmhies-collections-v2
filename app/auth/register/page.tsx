'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, User, Phone, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { registerUser } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await registerUser(name, email, phone);
    if (res.success) {
      router.push('/account');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-16 flex items-center justify-center font-sans px-4">
      <div className="bg-white rounded-3xl p-8 md:p-12 w-full max-w-md shadow-2xl border border-stone-200/80 space-y-6 relative overflow-hidden">
        
        <div className="text-center space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-600 flex items-center justify-center space-x-1">
            <Sparkles className="w-3 h-3 text-gold-500" />
            <span>Join The Circle</span>
          </span>
          <h1 className="font-serif text-2xl md:text-3xl font-extrabold text-noir-900 uppercase">
            Create Account
          </h1>
          <p className="text-xs text-stone-500">
            Enjoy priority order tracking, exclusive discounts, and private trunk previews.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-stone-800 uppercase block mb-1">
              Full Name *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Chief Mrs. Zainab Balogun"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-gold-500"
              />
              <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-800 uppercase block mb-1">
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="zainab@example.com"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-gold-500"
              />
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-800 uppercase block mb-1">
              WhatsApp Phone Number *
            </label>
            <div className="relative">
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+2348012345678"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-gold-500"
              />
              <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-800 uppercase block mb-1">
              Password *
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-gold-500"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-noir-900 hover:bg-gold-600 text-white font-sans text-xs uppercase tracking-widest font-bold py-3.5 rounded-xl transition shadow-lg"
          >
            <span>{loading ? 'Creating Profile...' : 'Complete VIP Registration'}</span>
          </button>
        </form>

        <div className="text-center text-xs text-stone-500 pt-2 border-t border-stone-100">
          Already have a member account?{' '}
          <Link href="/auth/login" className="font-bold text-gold-600 hover:underline">
            Sign In Here
          </Link>
        </div>

      </div>
    </div>
  );
}
