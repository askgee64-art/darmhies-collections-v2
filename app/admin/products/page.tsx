'use client';

import React, { useEffect, useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  X, 
  Image as ImageIcon, 
  Sparkles,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { getProducts, createProduct, updateProduct, deleteProduct, getCategories } from '@/app/actions/productActions';
import { Product, Category } from '@/types';
import { formatCurrency } from '@/lib/utils';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadData() {
      const [prods, cats] = await Promise.all([getProducts(), getCategories()]);
      setProducts(prods as any);
      setCategories(cats as any);
      setIsLoading(false);
    }
    loadData();
  }, []);

  const [formData, setFormData] = useState({
    title: '',
    categoryId: '',
    price: 0,
    compareAtPrice: 0,
    stock: 0,
    sku: '',
    description: '',
    imageUrl: '',
    isFeatured: false,
    isTrending: false,
    isNewArrival: false,
    isBestSeller: false,
  });

  useEffect(() => {
    if (categories.length > 0 && !formData.categoryId) {
      setFormData(prev => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [categories]);

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData({
      title: '',
      categoryId: categories[0]?.id || '',
      price: 0,
      compareAtPrice: 0,
      stock: 0,
      sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      description: '',
      imageUrl: '',
      isFeatured: false,
      isTrending: false,
      isNewArrival: true,
      isBestSeller: false,
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      categoryId: product.categoryId,
      price: product.price,
      compareAtPrice: product.compareAtPrice || 0,
      stock: product.stock,
      sku: product.sku || '',
      description: product.description,
      imageUrl: product.images[0]?.url || '',
      isFeatured: product.isFeatured,
      isTrending: product.isTrending,
      isNewArrival: product.isNewArrival,
      isBestSeller: product.isBestSeller,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const res = await deleteProduct(id);
      if (res.success) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        alert('Error deleting product');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (editingProduct) {
      const res = await updateProduct(editingProduct.id, formData);
      if (res.success) {
        const updatedProds = await getProducts();
        setProducts(updatedProds as any);
        setModalOpen(false);
      } else {
        alert('Update failed');
      }
    } else {
      const res = await createProduct(formData);
      if (res.success) {
        const updatedProds = await getProducts();
        setProducts(updatedProds as any);
        setModalOpen(false);
      } else {
        alert('Create failed');
      }
    }
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-extrabold text-noir-900 uppercase">
            Vault Catalog (Product CRUD)
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Create, update, tag, and organize products across all 7 house categories.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="bg-noir-900 hover:bg-gold-600 text-white font-sans text-xs uppercase tracking-widest font-bold px-6 py-3.5 rounded-xl transition shadow flex items-center space-x-2"
        >
          <Plus className="w-4 h-4 text-gold-400" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter products by title, category or SKU..."
          className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-gold-500"
        />
        <Search className="w-4 h-4 text-stone-400 absolute left-7 top-1/2 -translate-y-1/2" />
      </div>

      {/* Product Management Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="p-4">Product Details</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Tags</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-stone-50/80 transition">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.images[0]?.url}
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded-xl border border-stone-200 shrink-0"
                      />
                      <div>
                        <h4 className="font-bold text-stone-900 truncate max-w-xs">{product.title}</h4>
                        <span className="text-[10px] text-stone-400">SKU: {product.sku || 'N/A'}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 font-semibold text-stone-800">
                    {product.categoryName || 'General'}
                  </td>

                  <td className="p-4 font-serif font-bold text-noir-900">
                    {formatCurrency(product.price)}
                  </td>

                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      product.stock > 10 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {product.stock} Units
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {product.isBestSeller && (
                        <span className="text-[9px] bg-noir-900 text-gold-300 font-bold px-1.5 py-0.5 rounded">Best</span>
                      )}
                      {product.isTrending && (
                        <span className="text-[9px] bg-gold-100 text-gold-800 font-bold px-1.5 py-0.5 rounded">Trending</span>
                      )}
                      {product.isNewArrival && (
                        <span className="text-[9px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded">New</span>
                      )}
                    </div>
                  </td>

                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEditModal(product)}
                      className="p-2 text-stone-600 hover:text-gold-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition inline-block"
                      aria-label="Edit Product"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 rounded-lg transition inline-block"
                      aria-label="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-noir-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-2xl shadow-2xl border border-gold-300 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-noir-900"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-noir-900 uppercase mb-2">
              {editingProduct ? 'Edit Product Details' : 'Add New Product to Vault'}
            </h3>
            <p className="text-xs text-stone-500 mb-6">Specify pricing, category, tags, and imagery.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-800 uppercase block mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Princess Cut Emerald & Gold Ring"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-800 uppercase block mb-1">House Category *</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold-500 font-sans"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-800 uppercase block mb-1">SKU Code</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-800 uppercase block mb-1">Price ({process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'}) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-800 uppercase block mb-1">Compare At Price ({process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'})</label>
                  <input
                    type="number"
                    value={formData.compareAtPrice}
                    onChange={(e) => setFormData({ ...formData, compareAtPrice: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-800 uppercase block mb-1">Stock Quantity *</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-800 uppercase block mb-1">Image URL (Supabase/Unsplash)</label>
                  <input
                    type="text"
                    required
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 uppercase block mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs focus:outline-none focus:border-gold-500"
                />
              </div>

              {/* Badges Checkboxes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                <label className="flex items-center space-x-2 text-xs text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isBestSeller}
                    onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                    className="rounded accent-gold-500"
                  />
                  <span>Best Seller</span>
                </label>

                <label className="flex items-center space-x-2 text-xs text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isTrending}
                    onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                    className="rounded accent-gold-500"
                  />
                  <span>Trending</span>
                </label>

                <label className="flex items-center space-x-2 text-xs text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isNewArrival}
                    onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                    className="rounded accent-gold-500"
                  />
                  <span>New Arrival</span>
                </label>

                <label className="flex items-center space-x-2 text-xs text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded accent-gold-500"
                  />
                  <span>Featured</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-noir-900 hover:bg-gold-600 text-white font-sans text-xs uppercase tracking-widest font-bold py-3.5 rounded-xl transition shadow"
              >
                {editingProduct ? 'Save Changes' : 'Create Product Entry'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
