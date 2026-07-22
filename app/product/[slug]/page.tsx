'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  MessageCircle, 
  Truck, 
  ShieldCheck, 
  Share2, 
  Plus, 
  Minus, 
  Check, 
  Sparkles, 
  ArrowLeft,
  ChevronDown,
  X
} from 'lucide-react';
import { mockDB } from '@/lib/mock-db';
import { formatCurrency, generateWhatsAppOrderUrl } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/shop/ProductCard';

export default function ProductDetailsPage() {
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || "The Luxury Vault";
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const product = mockDB.getProductBySlug(slug);
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product?.variants?.[0]?.options[0] || ''
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'shipping' | 'care'>('details');
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-stone-50 py-20 flex flex-col items-center justify-center text-center">
        <h2 className="font-serif text-2xl font-bold text-noir-900 mb-2">Product Not Found</h2>
        <p className="text-xs text-stone-500 mb-6">The luxury item you requested is unavailable or has been archived.</p>
        <Link href="/shop" className="bg-noir-900 text-white font-sans text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-accent transition">
          Return To Vault Catalog
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const relatedProducts = mockDB.getProducts({ category: product.categorySlug }).filter(p => p.id !== product.id).slice(0, 4);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+2348012345678';
  const whatsappUrl = generateWhatsAppOrderUrl({
    phone: whatsappNumber,
    productTitle: product.title,
    price: product.price,
    variant: selectedVariant,
  });

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    mockDB.addReview(product.id, {
      customerId: `cust-anon-${Date.now()}`,
      customerName: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      isVerified: true,
    });
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewModalOpen(false);
      setReviewSubmitted(false);
      setNewReview({ name: '', rating: 5, comment: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-10 font-sans">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Breadcrumb / Back button */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/shop" 
            className="inline-flex items-center space-x-2 text-xs font-bold text-stone-600 hover:text-accent transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Shop</span>
          </Link>

          <span className="text-xs text-stone-400 font-sans">
            Home / <span className="text-stone-700 font-bold">{product.categoryName}</span> / {product.title}
          </span>
        </div>

        {/* Main PDP Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-6 md:p-10 rounded-3xl border border-stone-200/80 shadow-md mb-16">
          
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-[450px] md:h-[550px] bg-stone-100 rounded-2xl overflow-hidden border border-stone-200 group">
              <img 
                src={product.images[selectedImageIndex]?.url || product.images[0]?.url} 
                alt={product.title} 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500 cursor-zoom-in"
              />

              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition ${
                  isWishlisted ? 'bg-primary text-white' : 'bg-white/90 text-stone-700 hover:text-primary'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Gallery Strip */}
            {product.images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                      selectedImageIndex === idx ? 'border-accent ring-2 ring-gold-300' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={product.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Purchasing Box */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-accent tracking-widest bg-gold-50 px-3 py-1 rounded-full border border-gold-200">
                  {product.categoryName}
                </span>

                <button 
                  onClick={handleShare}
                  className="text-stone-400 hover:text-noir-900 flex items-center space-x-1 text-xs font-bold transition"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copiedShare ? 'Copied Link!' : 'Share'}</span>
                </button>
              </div>

              <h1 className="font-serif text-2xl md:text-3xl font-extrabold text-noir-900 leading-tight">
                {product.title}
              </h1>

              {/* Rating Summary */}
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(product.rating || 5) ? 'fill-amber-400' : 'text-stone-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-stone-800 font-sans">{product.rating || 4.9} / 5.0</span>
                <span className="text-xs text-stone-400 font-sans">({product.reviewCount || 18} Verified Reviews)</span>
              </div>

              {/* Pricing Tag */}
              <div className="flex items-baseline space-x-3 pt-2">
                <span className="font-serif text-2xl md:text-3xl font-bold text-noir-900">
                  {formatCurrency(product.price)}
                </span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="text-sm text-stone-400 line-through">
                    {formatCurrency(product.compareAtPrice)}
                  </span>
                )}
              </div>

              <p className="text-xs text-stone-600 leading-relaxed pt-2">
                {product.description}
              </p>

              {/* Variant Selector */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                    Select {product.variants[0].name}: <span className="text-accent">{selectedVariant}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants[0].options.map(opt => (
                      <button
                        key={opt}
                        onClick={() => setSelectedVariant(opt)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition uppercase tracking-wider ${
                          selectedVariant === opt
                            ? 'bg-noir-900 text-gold-300 border-2 border-accent shadow'
                            : 'bg-stone-100 text-stone-700 border border-stone-200 hover:border-gold-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                  Quantity
                </label>
                <div className="flex items-center space-x-3 w-fit border border-stone-300 rounded-xl p-1 bg-stone-50">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-stone-200 rounded-lg text-stone-700"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-bold w-8 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-stone-200 rounded-lg text-stone-700"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Availability Alert */}
              <div className="text-[11px] text-emerald-700 font-bold flex items-center space-x-1.5 pt-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>In Stock — Express Delivery Available Across Lagos & Abuja</span>
              </div>

            </div>

            {/* Purchasing CTAs */}
            <div className="space-y-3 pt-6 border-t border-stone-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => addItem(product, quantity, selectedVariant)}
                  className="w-full bg-noir-900 hover:bg-accent text-white font-sans text-xs uppercase tracking-widest font-bold py-4 rounded-xl transition shadow-lg flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Bag</span>
                </button>

                <button
                  onClick={() => {
                    addItem(product, quantity, selectedVariant);
                    router.push('/checkout');
                  }}
                  className="w-full bg-accent hover:bg-accent text-noir-900 font-sans text-xs uppercase tracking-widest font-bold py-4 rounded-xl transition shadow-lg flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Buy Now</span>
                </button>
              </div>

              {/* WhatsApp Order Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs uppercase tracking-widest font-bold py-3.5 rounded-xl transition flex items-center justify-center space-x-2 shadow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order via WhatsApp Concierge</span>
              </a>
            </div>

          </div>

        </div>

        {/* Accordion Tabs for Product Specs */}
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-stone-200 shadow-md mb-16">
          <div className="flex border-b border-stone-200 mb-6 overflow-x-auto space-x-8 text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-4 border-b-2 transition ${
                activeTab === 'details' ? 'border-accent text-noir-900' : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}
            >
              Product Details & Materials
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`pb-4 border-b-2 transition ${
                activeTab === 'shipping' ? 'border-accent text-noir-900' : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}
            >
              VIP Courier Shipping & Returns
            </button>
            <button
              onClick={() => setActiveTab('care')}
              className={`pb-4 border-b-2 transition ${
                activeTab === 'care' ? 'border-accent text-noir-900' : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}
            >
              Care Instructions
            </button>
          </div>

          <div className="text-xs text-stone-600 leading-relaxed font-sans max-w-3xl">
            {activeTab === 'details' && (
              <div className="space-y-2">
                <p>{product.details || product.description}</p>
                <p><strong>SKU:</strong> {product.sku || 'DRM-VAULT-2026'}</p>
                <p><strong>Craftsmanship:</strong> Hand-finished by {storeName} master artisans.</p>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-2">
                <p>🚀 <strong>Lagos Express:</strong> Same-day dispatch for orders confirmed before 12:00 PM.</p>
                <p>✈️ <strong>Nationwide Delivery:</strong> 1-3 business days via priority insured couriers.</p>
                <p>📦 <strong>White-Glove Packaging:</strong> Delivered in {storeName} signed luxury velvet boxes.</p>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-2">
                <p>✨ Store fine gold and jewelry pieces in their velvet pouches away from moisture.</p>
                <p>✨ For silk and velvet garments, dry clean only to preserve texture and luster.</p>
              </div>
            )}
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-stone-200 shadow-md mb-16">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-serif text-xl font-bold text-noir-900 uppercase">
                Customer Reviews ({product.reviewCount || 12})
              </h3>
              <p className="text-xs text-stone-500 mt-1">Authentic feedback from verified clients.</p>
            </div>

            <button
              onClick={() => setReviewModalOpen(true)}
              className="bg-stone-900 hover:bg-accent text-white font-sans text-xs uppercase font-bold px-5 py-2.5 rounded-xl transition"
            >
              Write A Review
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-serif text-xs font-bold text-noir-900">Zainab B.</span>
                <span className="text-[10px] text-stone-400">Verified Buyer</span>
              </div>
              <div className="flex space-x-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-stone-700">"Exceeded all my expectations! The quality and weight felt truly regal. Will definitely order again!"</p>
            </div>

            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-serif text-xs font-bold text-noir-900">Chief Mrs. Kemi</span>
                <span className="text-[10px] text-stone-400">Verified Buyer</span>
              </div>
              <div className="flex space-x-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-stone-700">"Beautiful packaging and super fast delivery. The finish on this piece is breathtaking."</p>
            </div>
          </div>
        </div>

        {/* Review Submission Modal */}
        {reviewModalOpen && (
          <div className="fixed inset-0 z-50 bg-noir-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-gold-300 relative">
              <button 
                onClick={() => setReviewModalOpen(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-noir-900"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-serif text-lg font-bold text-noir-900 uppercase mb-2">
                Write a Review
              </h3>
              <p className="text-xs text-stone-500 mb-4">Share your feedback regarding {product.title}</p>

              {reviewSubmitted ? (
                <div className="p-4 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl text-center">
                  ✨ Thank you darling! Your review has been submitted.
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      placeholder="e.g. Lady Amina"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Rating</label>
                    <select
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-accent"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5/5 Exceptional)</option>
                      <option value={4}>⭐⭐⭐⭐ (4/5 Excellent)</option>
                      <option value={3}>⭐⭐⭐ (3/5 Good)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Your Comments</label>
                    <textarea
                      required
                      rows={3}
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      placeholder="Describe the fit, quality, or delivery speed..."
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs focus:outline-none focus:border-accent"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-noir-900 hover:bg-accent text-white font-sans text-xs uppercase font-bold py-3 rounded-xl transition"
                  >
                    Submit Review
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div>
            <h3 className="font-serif text-2xl font-bold text-noir-900 uppercase mb-8">
              Complementary Pieces
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(rel => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
