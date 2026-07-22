import { Product, Category, Order, Customer, Coupon, NewsPromotion, Review } from '@/types';

// Check if demo data should be populated or kept 100% clean
const isDemoEnabled = process.env.ENABLE_DEMO_DATA === 'true';

export const initialCategories: Category[] = isDemoEnabled ? [
  {
    id: 'cat-1',
    name: 'Clothes',
    slug: 'clothes',
    description: 'Fashion apparel and evening wear.',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800',
    icon: 'fa-solid fa-shirt',
    isFeatured: true,
  },
  {
    id: 'cat-2',
    name: 'Cosmetics',
    slug: 'cosmetics',
    description: 'Beauty and skincare formulas.',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800',
    icon: 'fa-solid fa-wand-magic-sparkles',
    isFeatured: true,
  },
  {
    id: 'cat-3',
    name: 'Jewelry',
    slug: 'jewelry',
    description: 'Fine jewelry and accessories.',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800',
    icon: 'fa-solid fa-gem',
    isFeatured: true,
  },
  {
    id: 'cat-4',
    name: 'Chains',
    slug: 'chains',
    description: 'Chains and pendants.',
    imageUrl: 'https://images.unsplash.com/photo-1611591475172-43a915a1f6a6?q=80&w=800',
    icon: 'fa-solid fa-link',
    isFeatured: true,
  },
  {
    id: 'cat-5',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Style accessories and scarves.',
    imageUrl: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=800',
    icon: 'fa-solid fa-glasses',
    isFeatured: true,
  },
  {
    id: 'cat-6',
    name: 'Shoes',
    slug: 'shoes',
    description: 'Footwear collection.',
    imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800',
    icon: 'fa-solid fa-shoe-prints',
    isFeatured: true,
  },
  {
    id: 'cat-7',
    name: 'Bags',
    slug: 'bags',
    description: 'Handbags and purses.',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800',
    icon: 'fa-solid fa-bag-shopping',
    isFeatured: true,
  },
] : [
  { id: 'cat-1', name: 'Clothes', slug: 'clothes', description: 'Clothes category', icon: 'fa-solid fa-shirt' },
  { id: 'cat-2', name: 'Cosmetics', slug: 'cosmetics', description: 'Cosmetics category', icon: 'fa-solid fa-wand-magic-sparkles' },
  { id: 'cat-3', name: 'Jewelry', slug: 'jewelry', description: 'Jewelry category', icon: 'fa-solid fa-gem' },
  { id: 'cat-4', name: 'Chains', slug: 'chains', description: 'Chains category', icon: 'fa-solid fa-link' },
  { id: 'cat-5', name: 'Accessories', slug: 'accessories', description: 'Accessories category', icon: 'fa-solid fa-glasses' },
  { id: 'cat-6', name: 'Shoes', slug: 'shoes', description: 'Shoes category', icon: 'fa-solid fa-shoe-prints' },
  { id: 'cat-7', name: 'Bags', slug: 'bags', description: 'Bags category', icon: 'fa-solid fa-bag-shopping' },
];

export const initialProducts: Product[] = isDemoEnabled ? [
  {
    id: 'prod-101',
    title: 'Aurelia Emerald Velvet Evening Gown',
    slug: 'aurelia-emerald-velvet-evening-gown',
    description: 'Handcrafted evening gown.',
    price: 185,
    stock: 12,
    sku: 'SKU-001',
    isFeatured: true,
    isTrending: true,
    isNewArrival: true,
    isBestSeller: true,
    categoryId: 'cat-1',
    categoryName: 'Clothes',
    categorySlug: 'clothes',
    images: [{ id: 'img-1', url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800', position: 0 }],
    rating: 4.9,
    reviewCount: 28,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
] : [];

export const initialCustomers: Customer[] = [];
export const initialCoupons: Coupon[] = [];
export const initialNews: NewsPromotion[] = [];
export const initialOrders: Order[] = [];

let productsDataStore: Product[] = [...initialProducts];
let categoriesDataStore: Category[] = [...initialCategories];
let ordersDataStore: Order[] = [...initialOrders];
let customersDataStore: Customer[] = [...initialCustomers];
let couponsDataStore: Coupon[] = [...initialCoupons];
let newsDataStore: NewsPromotion[] = [...initialNews];

export const mockDB = {
  getProducts: (filters?: {
    category?: string;
    search?: string;
    featured?: boolean;
    trending?: boolean;
    newArrival?: boolean;
    bestSeller?: boolean;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'rating' | 'popular';
  }) => {
    let list = [...productsDataStore];

    if (filters?.category) {
      const catNorm = filters.category.toLowerCase();
      list = list.filter(p => p.categorySlug?.toLowerCase() === catNorm || p.categoryId === filters.category);
    }

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryName?.toLowerCase().includes(q) ||
          (p.sku && p.sku.toLowerCase().includes(q))
      );
    }

    if (filters?.featured) list = list.filter(p => p.isFeatured);
    if (filters?.trending) list = list.filter(p => p.isTrending);
    if (filters?.newArrival) list = list.filter(p => p.isNewArrival);
    if (filters?.bestSeller) list = list.filter(p => p.isBestSeller);

    if (filters?.minPrice !== undefined) list = list.filter(p => p.price >= filters.minPrice!);
    if (filters?.maxPrice !== undefined) list = list.filter(p => p.price <= filters.maxPrice!);

    if (filters?.sortBy) {
      if (filters.sortBy === 'price-asc') list.sort((a, b) => a.price - b.price);
      else if (filters.sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
      else if (filters.sortBy === 'rating') list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      else if (filters.sortBy === 'popular') list.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
      else if (filters.sortBy === 'newest') list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return list;
  },

  getProductBySlug: (slug: string) => {
    return productsDataStore.find(p => p.slug === slug || p.id === slug);
  },

  getCategories: () => categoriesDataStore,

  getCategoryBySlug: (slug: string) => {
    return categoriesDataStore.find(c => c.slug === slug || c.id === slug);
  },

  getOrders: () => ordersDataStore,

  getOrderById: (id: string) => {
    return ordersDataStore.find(o => o.id === id || o.orderNumber === id);
  },

  createOrder: (orderData: Partial<Order>): Order => {
    const id = `ord-${Date.now()}`;
    const orderNumber = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id,
      orderNumber,
      customerId: orderData.customerId,
      customerName: orderData.customerName || 'Valued Client',
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      shippingAddress: orderData.shippingAddress!,
      items: orderData.items || [],
      subtotal: orderData.subtotal || 0,
      discountAmount: orderData.discountAmount || 0,
      shippingFee: orderData.shippingFee || 0,
      totalAmount: orderData.totalAmount || 0,
      status: orderData.status || 'PENDING',
      paymentMethod: orderData.paymentMethod || 'PAYSTACK',
      paymentStatus: orderData.paymentStatus || 'PENDING',
      paymentReference: orderData.paymentReference || `REF_${Date.now()}`,
      notes: orderData.notes,
      couponCode: orderData.couponCode,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    ordersDataStore.unshift(newOrder);
    return newOrder;
  },

  updateOrderStatus: (id: string, status: Order['status'], trackingNumber?: string) => {
    const order = ordersDataStore.find(o => o.id === id || o.orderNumber === id);
    if (order) {
      order.status = status;
      if (status === 'PAID') order.paymentStatus = 'COMPLETED';
      if (trackingNumber) order.trackingNumber = trackingNumber;
      order.updatedAt = new Date().toISOString();
    }
    return order;
  },

  getCustomers: () => customersDataStore,

  toggleCustomerSuspend: (customerId: string) => {
    const cust = customersDataStore.find(c => c.id === customerId);
    if (cust) {
      cust.isSuspended = !cust.isSuspended;
    }
    return cust;
  },

  getCoupons: () => couponsDataStore,

  validateCoupon: (code: string, subtotal: number) => {
    const coup = couponsDataStore.find(c => c.code.toUpperCase() === code.toUpperCase() && c.isActive);
    if (!coup) return { valid: false, message: 'Invalid or inactive promo code' };
    if (subtotal < coup.minSpend) {
      return { valid: false, message: `Minimum spend required for this code` };
    }
    let discount = 0;
    if (coup.discountType === 'PERCENTAGE') {
      discount = (subtotal * coup.discountValue) / 100;
    } else {
      discount = coup.discountValue;
    }
    return { valid: true, discount, coupon: coup };
  },

  createCoupon: (coupon: Omit<Coupon, 'id' | 'usedCount'>) => {
    const newCoup: Coupon = {
      ...coupon,
      id: `coup-${Date.now()}`,
      usedCount: 0,
    };
    couponsDataStore.unshift(newCoup);
    return newCoup;
  },

  getNews: () => newsDataStore,

  createNews: (news: Omit<NewsPromotion, 'id' | 'createdAt'>) => {
    const newPromotion: NewsPromotion = {
      ...news,
      id: `news-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    newsDataStore.unshift(newPromotion);
    return newPromotion;
  },

  createProduct: (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product => {
    const id = `prod-${Date.now()}`;
    const slug = productData.slug || productData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const category = categoriesDataStore.find(c => c.id === productData.categoryId);

    const newProd: Product = {
      ...productData,
      id,
      slug,
      categoryName: category?.name,
      categorySlug: category?.slug,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    productsDataStore.unshift(newProd);
    return newProd;
  },

  updateProduct: (id: string, productData: Partial<Product>): Product | null => {
    const index = productsDataStore.findIndex(p => p.id === id);
    if (index === -1) return null;
    const existing = productsDataStore[index];
    const updated = {
      ...existing,
      ...productData,
      updatedAt: new Date().toISOString(),
    };
    productsDataStore[index] = updated;
    return updated;
  },

  deleteProduct: (id: string) => {
    productsDataStore = productsDataStore.filter(p => p.id !== id);
    return true;
  },

  addReview: (productId: string, review: Omit<Review, 'id' | 'productId' | 'createdAt'>) => {
    const product = productsDataStore.find(p => p.id === productId);
    if (product) {
      product.reviewCount = (product.reviewCount || 0) + 1;
      const newRatingSum = (product.rating || 5) * (product.reviewCount - 1) + review.rating;
      product.rating = Number((newRatingSum / product.reviewCount).toFixed(1));
    }
    return review;
  }
};
