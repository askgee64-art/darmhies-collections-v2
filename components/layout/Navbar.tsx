'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Search, 
  Menu, 
  X, 
  PhoneCall, 
  Sparkles, 
  ChevronRight,
  ShieldCheck,
  Truck,
  MapPin
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { getCategories, getFilteredProducts } from '@/app/actions/productActions';
import { formatCurrency } from '@/lib/utils';
import { Category, Product } from '@/types';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { itemCount, setIsOpen: openCartDrawer } = useCart();
  const { wishlist } = useWishlist();
  const { user, admin } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || "The Luxury Vault";
  const storeLocation = process.env.NEXT_PUBLIC_STORE_LOCATION || "New York, USA";

  useEffect(() => {
    async function load() {
        const cats = await getCategories();
        setCategories(cats as any);
    }
    load();
  }, []);

  useEffect(() => {
    async function search() {
        if (searchQuery.trim()) {
            const results = await getFilteredProducts({ search: searchQuery });
            setSearchResults(results.slice(0, 5) as any);
        } else {
            setSearchResults([]);
        }
    }
    const timer = setTimeout(search, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300 font-sans">
      {/* Top Announcement Bar */}
      <div className="bg-primary text-white text-xs py-2 px-4 flex justify-between items-center font-bold tracking-wider">
        <div className="container mx-auto flex justify-between items-center text-[11px]">
          <div className="hidden md:flex items-center space-x-6">
            <span className="flex items-center space-x-1">
              <Truck className="w-3.5 h-3.5 text-white" />
              <span>Complimentary VIP Express Shipping Available</span>
            </span>
            <span className="flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-white" />
              <span>Location: {storeLocation}</span>
            </span>
          </div>
          <div className="flex items-center space-x-4 mx-auto md:mx-0">
            <span className="flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-white animate-pulse" />
              <span>{storeName}</span>
            </span>
            <Link 
              href={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+2348012345678').replace(/[^0-9]/g, '')}`} 
              target="_blank" 
              className="hover:text-stone-200 transition flex items-center space-x-1 font-bold"
            >
              <PhoneCall className="w-3 h-3" />
              <span>VIP Care</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={`transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-white border-b border-stone-200 py-4'}`}>
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Mobile Hamburger Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-800 hover:text-primary transition"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Dynamic Brand Logo */}
          <Link href="/" className="flex flex-col items-center group">
            <span className="font-extrabold text-xl sm:text-2xl md:text-3xl tracking-tight text-stone-900 group-hover:text-primary transition uppercase">
              {storeName}
            </span>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center space-x-8 font-sans text-xs tracking-widest uppercase font-bold text-stone-700">
            <Link href="/" className={`hover:text-primary transition py-1 border-b-2 ${pathname === '/' ? 'border-primary text-primary' : 'border-transparent'}`}>
              Home
            </Link>
            <Link href="/shop" className={`hover:text-primary transition py-1 border-b-2 ${pathname === '/shop' ? 'border-primary text-primary' : 'border-transparent'}`}>
              Shop All
            </Link>
            {categories.slice(0, 5).map(cat => (
              <Link 
                key={cat.id} 
                href={`/category/${cat.slug}`}
                className={`hover:text-primary transition py-1 border-b-2 ${pathname === `/category/${cat.slug}` ? 'border-primary text-primary' : 'border-transparent'}`}
              >
                {cat.name}
              </Link>
            ))}
            <Link href="/about" className={`hover:text-primary transition py-1 border-b-2 ${pathname === '/about' ? 'border-primary text-primary' : 'border-transparent'}`}>
              About
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5 text-stone-800">
            <button 
              onClick={() => setSearchOpen(true)}
              className="p-2 hover:text-primary transition relative"
              aria-label="Search Products"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link 
              href="/wishlist" 
              className="p-2 hover:text-primary transition relative"
              aria-label="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link 
              href={admin ? '/admin' : user ? '/account' : '/auth/login'} 
              className="p-2 hover:text-primary transition hidden sm:flex items-center space-x-1"
              aria-label="Account Portal"
            >
              <User className="w-5 h-5" />
              {admin ? (
                <span className="text-[10px] bg-stone-900 text-rose-400 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                  Admin
                </span>
              ) : user ? (
                <span className="text-xs font-bold hidden md:inline max-w-[80px] truncate">
                  {user.name}
                </span>
              ) : null}
            </Link>

            {/* Cart Button */}
            <button 
              onClick={() => openCartDrawer(true)}
              className="p-2 bg-primary hover:bg-primary text-white rounded-full transition relative shadow-md flex items-center justify-center"
              aria-label="Open Cart Drawer"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-stone-900 text-white text-[10px] font-bold w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Quick Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-6 shadow-2xl border border-stone-200 relative">
            <button 
              onClick={() => setSearchOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 transition"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="font-extrabold text-lg text-stone-900 mb-2 uppercase">
              Search {storeName}
            </h3>

            <form onSubmit={handleSearchSubmit} className="relative mb-4">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search catalog by product name..."
                className="w-full pl-12 pr-28 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:border-primary font-sans text-xs font-semibold"
                autoFocus
              />
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary text-white text-xs uppercase px-4 py-2 rounded-xl font-extrabold transition"
              >
                Search
              </button>
            </form>

            {searchResults.length > 0 && (
              <div className="space-y-3 pt-2 border-t border-stone-100">
                <span className="text-[10px] uppercase font-bold text-stone-400">Matches</span>
                <div className="space-y-2">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center space-x-4 p-2 hover:bg-stone-50 rounded-xl transition group"
                    >
                      <img 
                        src={product.images[0]?.url} 
                        alt={product.title} 
                        className="w-12 h-12 object-cover rounded-lg border border-stone-200"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-stone-900 group-hover:text-primary truncate">
                          {product.title}
                        </h4>
                        <p className="text-[11px] text-stone-500">{product.categoryName}</p>
                      </div>
                      <span className="text-xs font-extrabold text-primary">
                        {formatCurrency(product.price)}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
