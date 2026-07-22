'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { loginUser, loginAdmin } = useAuth();

  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || "Darmhie's Vault";

  const [isAdminMode, setIsAdminMode] = useState(false);
  const [emailOrUser, setEmailOrUser] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await loginUser(emailOrUser);
    if (res.success) {
      router.push('/account');
    } else {
      setError(res.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-16 flex items-center justify-center font-sans px-4">
      <div className="bg-white rounded-3xl p-8 md:p-12 w-full max-w-md shadow-2xl border border-stone-200/80 space-y-6 relative overflow-hidden">
        
        <div className="text-center space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-primary flex items-center justify-center space-x-1">
            <Sparkles className="w-3 h-3 text-primary" />
            <span>{storeName} Portal</span>
          </span>
          <h1 className="font-extrabold text-2xl md:text-3xl text-stone-900 uppercase">
            Welcome Back
          </h1>
          <p className="text-xs text-stone-500 font-medium">
            Sign in to manage your luxury profile and orders.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-stone-800 uppercase block mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={emailOrUser}
                onChange={(e) => setEmailOrUser(e.target.value)}
                placeholder="user@example.com"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-primary font-medium"
              />
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover text-white font-sans text-xs uppercase tracking-widest font-extrabold py-3.5 rounded-full transition shadow-lg shadow-primary/30 flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In To Account'}</span>
          </button>
        </form>

        <div className="text-center text-xs text-stone-500 pt-2 border-t border-stone-100 font-medium">
          Don't have an account?{' '}
          <Link href="/auth/register" className="font-extrabold text-primary hover:underline">
            Register Here
          </Link>
        </div>

        <div className="pt-4 text-center">
           <Link href="/director-login" className="text-[9px] font-black uppercase tracking-widest text-stone-400 hover:text-stone-900 transition">
             Corporate Director Access
           </Link>
        </div>

      </div>
    </div>
  );
}
