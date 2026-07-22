'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, ShieldCheck, Sparkles, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function DirectorLoginPage() {
  const router = useRouter();
  const { loginAdmin } = useAuth();

  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || "The Luxury Vault";

  const [emailOrUser, setEmailOrUser] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await loginAdmin(emailOrUser, password);
    if (res.success) {
      router.push('/admin');
    } else {
      setError(res.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-noir-950 flex items-center justify-center font-sans px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -ml-48 -mb-48"></div>

      <div className="bg-noir-900 border border-white/10 rounded-[40px] p-8 md:p-12 w-full max-w-md shadow-2xl space-y-8 relative z-10">
        
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 bg-primary/20 border border-primary/40 px-4 py-1.5 rounded-full text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Secure Director Access</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-white font-extrabold tracking-tight uppercase">
            Command Center
          </h1>
          <p className="text-xs text-stone-400 font-medium tracking-wide">
            Unauthorized access to {storeName} is strictly prohibited.
          </p>
        </div>

        {error && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold rounded-2xl text-center animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-stone-500 uppercase tracking-widest ml-1">
              Admin Identity
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={emailOrUser}
                onChange={(e) => setEmailOrUser(e.target.value)}
                placeholder="Username or Email"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white focus:outline-none focus:border-primary focus:bg-white/10 transition-all font-medium"
              />
              <User className="w-5 h-5 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-stone-500 uppercase tracking-widest ml-1">
              Command Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white focus:outline-none focus:border-primary focus:bg-white/10 transition-all font-medium"
              />
              <Lock className="w-5 h-5 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover text-white font-black text-xs uppercase tracking-[0.2em] py-5 rounded-2xl transition shadow-2xl shadow-primary/20 flex items-center justify-center space-x-3 group"
          >
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>{loading ? 'Verifying...' : 'Authorize Access'}</span>
          </button>
        </form>

        <div className="pt-6 border-t border-white/5 flex items-center justify-center">
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-stone-500 hover:text-white transition text-[10px] font-black uppercase tracking-widest"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Return to Public Site</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
