import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  const symbol = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
  const code = process.env.NEXT_PUBLIC_CURRENCY_CODE || 'USD';

  if (symbol === '₦' || code === 'NGN') {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: code,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export function generateWhatsAppOrderUrl(params: {
  phone: string;
  productTitle: string;
  price: number;
  variant?: string;
  productUrl?: string;
}) {
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || "Store Concierge";
  const cleanPhone = params.phone.replace(/[^0-9]/g, '');
  const message = `Hello ${storeName}! 👋\n\nI am interested in placing an order for:\n🛍️ *${params.productTitle}* ${params.variant ? `(${params.variant})` : ''}\n💰 Price: *${formatCurrency(params.price)}*\n\nPlease confirm availability and payment details. Thank you!✨`;
  
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function generateWhatsAppCartOrderUrl(params: {
  phone: string;
  items: Array<{ title: string; price: number; quantity: number; variant?: string }>;
  total: number;
  customerName?: string;
}) {
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || "Store Concierge";
  const cleanPhone = params.phone.replace(/[^0-9]/g, '');
  let itemsText = params.items
    .map((item, idx) => `${idx + 1}. *${item.title}* ${item.variant ? `(${item.variant})` : ''} x${item.quantity} - ${formatCurrency(item.price * item.quantity)}`)
    .join('\n');

  const message = `Hello ${storeName}! 👋\n\nI would like to complete my luxury order:\n\n*Customer:* ${params.customerName || 'Valued Client'}\n\n*Selected Products:*\n${itemsText}\n\n🏷️ *Total Order Amount:* *${formatCurrency(params.total)}*\n\nPlease assist me with payment/confirmation details. Thank you! ✨`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
