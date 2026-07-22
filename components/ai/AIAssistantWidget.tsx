'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  X, 
  Send, 
  Sparkles, 
  RefreshCw
} from 'lucide-react';
import { AIMessage, Product } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

export const AIAssistantWidget: React.FC = () => {
  const { addItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || "{storeName} Vault";

  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      content: `Greetings ✨ I am your ${storeName} AI Personal Stylist. Ask me anything about outfit recommendations, sizing, or tracking your order!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const promptSuggestions = [
    "Show me gold jewelry under $100",
    "I need an evening dress for a gala",
    "Recommend cosmetics for glowing skin",
    "Track order #DARM-1002",
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    const userMsg: AIMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.trim() }),
      });

      const data = await res.json();

      const assistantMsg: AIMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        content: data.reply || "Here are my curated recommendations for you:",
        recommendedProducts: data.recommendedProducts || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          content: "I'm having a connection glitch, but you can explore all our collections in the store catalog!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-40 bg-stone-900 hover:bg-primary text-white px-4 py-3 rounded-full shadow-2xl border-2 border-stone-700 hover:border-rose-400 flex items-center space-x-2 transition-all duration-300 group font-sans"
      >
        <div className="relative">
          <Sparkles className="w-5 h-5 text-rose-400 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-ping" />
        </div>
        <span className="text-xs uppercase font-extrabold tracking-widest hidden sm:inline">
          AI Fashion Stylist
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-y-0 left-0 md:left-6 md:bottom-20 md:top-auto md:h-[600px] w-full md:w-[420px] z-50 bg-white md:rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-left-4 duration-300 font-sans">
          
          <div className="p-4 bg-stone-900 text-white flex justify-between items-center border-b border-stone-800">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-rose-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider">
                  {storeName} AI Stylist
                </h3>
                <span className="text-[10px] text-emerald-400 flex items-center space-x-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online & Active</span>
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-stone-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-end space-x-2 max-w-[85%]">
                  {msg.sender === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px] shrink-0 font-bold">
                      ✨
                    </div>
                  )}

                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-primary text-white rounded-br-none shadow font-medium'
                        : 'bg-white text-stone-800 border border-stone-200 shadow-sm rounded-bl-none font-medium'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>

                {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                  <div className="mt-3 space-y-2 w-full pl-8">
                    <span className="text-[10px] font-extrabold uppercase text-primary tracking-wider">
                      Handpicked Recommendations:
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {msg.recommendedProducts.map((product) => (
                        <div
                          key={product.id}
                          className="p-2.5 bg-white border border-stone-200 hover:border-rose-400 rounded-xl flex items-center space-x-3 transition group"
                        >
                          <img 
                            src={product.images[0]?.url} 
                            alt={product.title} 
                            className="w-14 h-14 object-cover rounded-lg border border-stone-100"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="text-xs font-bold text-stone-900 truncate group-hover:text-primary">
                              {product.title}
                            </h5>
                            <p className="text-[10px] text-stone-500">{product.categoryName}</p>
                            <span className="text-xs font-extrabold text-primary">
                              {formatCurrency(product.price)}
                            </span>
                          </div>

                          <div className="flex flex-col space-y-1">
                            <Link
                              href={`/product/${product.slug}`}
                              onClick={() => setIsOpen(false)}
                              className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 text-[10px] uppercase font-bold rounded text-center"
                            >
                              View
                            </Link>
                            <button
                              onClick={() => addItem(product, 1)}
                              className="px-2 py-1 bg-primary hover:bg-primary text-white text-[10px] uppercase font-bold rounded text-center"
                            >
                              + Bag
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <span className="text-[9px] text-stone-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-2 text-stone-500 text-xs pl-8 font-bold">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-primary" />
                <span>Curating recommendations...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="px-3 py-2 bg-stone-100 border-t border-stone-200 overflow-x-auto whitespace-nowrap flex space-x-2 text-[11px]">
            {promptSuggestions.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="bg-white border border-stone-300 hover:border-primary text-stone-700 px-3 py-1 rounded-full hover:text-primary transition shrink-0 font-semibold"
              >
                {prompt}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-stone-200 flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask for fashion tips, gifts, prices..."
              className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-primary font-medium"
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="bg-primary hover:bg-primary disabled:opacity-50 text-white p-2.5 rounded-xl transition"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
