export type CategorySlug = 
  | 'clothes' 
  | 'cosmetics' 
  | 'jewelry' 
  | 'chains' 
  | 'accessories' 
  | 'shoes' 
  | 'bags';

export interface Category {
  id: string;
  name: string;
  slug: CategorySlug | string;
  description?: string;
  imageUrl?: string;
  icon?: string;
  isFeatured?: boolean;
}

export interface ProductImage {
  id: string;
  url: string;
  altText?: string;
  position: number;
}

export interface ProductVariant {
  id: string;
  name: string; // e.g., "Size", "Color", "Shade"
  options: string[]; // e.g., ["S", "M", "L", "XL"] or ["Rose Gold", "18K Gold", "Silver"]
}

export interface Review {
  id: string;
  productId: string;
  customerId: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  title?: string;
  comment: string;
  isVerified: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  details?: string;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  stock: number;
  sku?: string;
  isFeatured: boolean;
  isTrending: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  categoryId: string;
  categoryName?: string;
  categorySlug?: string;
  images: ProductImage[];
  variants?: ProductVariant[];
  rating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  variant?: string;
  quantity: number;
}

export interface CustomerAddress {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  isDefault?: boolean;
}

export interface OrderItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  quantity: number;
  variant?: string;
  imageUrl?: string;
}

export type OrderStatus = 'PENDING' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
export type PaymentMethod = 'PAYSTACK' | 'BANK_TRANSFER' | 'FLUTTERWAVE' | 'STRIPE' | 'PAYPAL';

export interface Order {
  id: string;
  orderNumber: string;
  customerId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  shippingAddress: CustomerAddress;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentReference?: string;
  notes?: string;
  trackingNumber?: string;
  couponCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'PERCENTAGE' | 'FIXED';
  discountValue: number;
  minSpend: number;
  maxUses?: number;
  usedCount: number;
  isActive: boolean;
  expiresAt?: string;
}

export interface NewsPromotion {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  imageUrl?: string;
  link?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  isVerified: boolean;
  isSuspended: boolean;
  totalOrders?: number;
  totalSpent?: number;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'SUPER_ADMIN';
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  recommendedProducts?: Product[];
}
