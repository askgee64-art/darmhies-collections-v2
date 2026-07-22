import { NextResponse } from 'next/server';
import { mockDB } from '@/lib/mock-db';
import OpenAI from 'openai';

const openaiApiKey = process.env.OPENAI_API_KEY;
const openai = openaiApiKey ? new OpenAI({ apiKey: openaiApiKey }) : null;

export async function POST(req: Request) {
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || "The Luxury Vault";
  const currencySymbol = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
  
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ reply: 'Please enter a search query or question.' });
    }

    const products = mockDB.getProducts();
    const categories = mockDB.getCategories();

    // Smart query pattern matcher for local instant fallback engine
    const lowerQ = query.toLowerCase();

    // Check order tracking query
    if (lowerQ.includes('track') || lowerQ.includes('order')) {
      const orderMatch = mockDB.getOrders().find(o => lowerQ.includes(o.orderNumber.toLowerCase()));
      if (orderMatch) {
        return NextResponse.json({
          reply: `Order #${orderMatch.orderNumber} is currently ${orderMatch.status}. Total: ${currencySymbol}${orderMatch.totalAmount.toLocaleString()}. ${orderMatch.trackingNumber ? `Waybill Tracking ID: ${orderMatch.trackingNumber}` : 'Preparing for VIP courier dispatch.'}`,
          recommendedProducts: [],
        });
      } else {
        return NextResponse.json({
          reply: `I couldn't find a matching order ID in this session. You can view all active orders in your Customer Portal account page or provide an order code.`,
          recommendedProducts: [],
        });
      }
    }

    // Try OpenAI if API key exists
    if (openai) {
      try {
        const systemPrompt = `You are the AI Personal Stylist & Commerce Assistant for "${storeName}", a luxury e-commerce house selling Clothes, Cosmetics, Fine Jewelry, 18k Solid Gold Chains, Accessories, Shoes, and Leather Bags.
Provide a warm, opulent, helpful response in under 3 sentences.`;

        const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: query },
          ],
          max_tokens: 150,
        });

        const replyText = completion.choices[0]?.message?.content || 'Here are my curated selections for you:';
        const matchedProds = mockDB.getProducts({ search: query }).slice(0, 3);

        return NextResponse.json({
          reply: replyText,
          recommendedProducts: matchedProds.length > 0 ? matchedProds : products.slice(0, 3),
        });
      } catch (err) {
        console.warn('OpenAI API call failed or unconfigured, falling back to smart engine');
      }
    }

    // Default Fallback Smart Catalog Matcher
    let matches = mockDB.getProducts({ search: query });

    // Price filters in prompt e.g. "under 20000"
    const priceMatch = lowerQ.match(new RegExp(`under\\s*\\${currencySymbol}?(\\d[\\d,]*)`, 'i')) || lowerQ.match(new RegExp(`below\\s*\\${currencySymbol}?(\\d[\\d,]*)`, 'i'));
    if (priceMatch) {
      const maxPrice = Number(priceMatch[1].replace(/,/g, ''));
      matches = matches.filter(p => p.price <= maxPrice);
    }

    if (matches.length === 0) {
      matches = products.filter(p => p.isFeatured || p.isBestSeller).slice(0, 3);
    } else {
      matches = matches.slice(0, 3);
    }

    return NextResponse.json({
      reply: `✨ Based on your search for "${query}", I have selected these regal pieces from the ${storeName} Vault for your wardrobe:`,
      recommendedProducts: matches,
    });
  } catch (error) {
    console.error('AI Assistant API Error:', error);
    return NextResponse.json(
      { reply: 'Our concierge service is experiencing high traffic. Please browse our shop catalog!' },
      { status: 500 }
    );
  }
}
