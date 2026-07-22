'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Tag, 
  Newspaper, 
  LogOut, 
  ShieldCheck, 
  Sparkles,
  Home
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || "The Luxury Vault";
  const pathname = usePathname();
  const router = useRouter();
  const { admin, logout } = useAuth();

  const navItems = [
    { name: 'Analytics & Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Product Vault (CRUD)', href: '/admin/products', icon: Package },
    { name: 'Order Processing', href: '/admin/orders', icon: ShoppingBag },
    { name: 'VIP Clients Management', href: '/admin/customers', icon: Users },
    { name: 'Coupons & Promos', href: '/admin/coupons', icon: Tag },
    { name: 'News & Announcements', href: '/admin/content', icon: Newspaper },
  ];

  return (
    <div className="min-h-screen bg-stone-100 font-sans flex flex-col md:flex-row">
      
      {/* Admin Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-noir-950 text-stone-300 p-6 flex flex-col justify-between border-r border-accent/20 shrink-0">
        <div>
          <div className="pb-6 border-b border-stone-800/80 mb-6">
            <Link href="/admin" className="flex flex-col group">
              <span className="font-serif text-xl font-bold tracking-widest text-white group-hover:text-accent transition uppercase">
                {storeName}
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase font-sans text-accent font-bold -mt-0.5">
                Director Command
              </span>
            </Link>
          </div>

          <nav className="space-y-1.5 font-sans text-xs uppercase tracking-wider font-semibold">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3.5 py-3 rounded-xl transition ${
                    isActive 
                      ? 'bg-accent text-noir-900 font-bold shadow-lg' 
                      : 'text-stone-400 hover:text-white hover:bg-noir-900'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-stone-800/80 space-y-3">
          <Link
            href="/"
            className="flex items-center space-x-2 text-xs text-stone-400 hover:text-accent transition px-2"
          >
            <Home className="w-4 h-4" />
            <span>Visit Public Storefront</span>
          </Link>

          <button
            onClick={() => { logout(); router.push('/auth/login'); }}
            className="w-full bg-stone-900 hover:bg-rose-950 text-rose-300 border border-stone-800 text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl transition flex items-center justify-center space-x-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit Director Mode</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Workspace Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}
