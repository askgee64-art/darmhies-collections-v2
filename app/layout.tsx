import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DrawerCart } from '@/components/layout/DrawerCart';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { AIAssistantWidget } from '@/components/ai/AIAssistantWidget';

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_STORE_NAME || "Darmhie's Collections V2 — Luxury Fashion & Beauty",
  description: process.env.NEXT_PUBLIC_STORE_DESCRIPTION || 'Haute couture gowns, fine 18k gold chains, cosmetics, jewelry, and luxury accessories.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const primaryColor = process.env.NEXT_PUBLIC_THEME_PRIMARY || '#FF384C';
  const primaryHover = process.env.NEXT_PUBLIC_THEME_PRIMARY_HOVER || '#E02D40';
  const accentColor = process.env.NEXT_PUBLIC_THEME_ACCENT || '#D4AF37';
  const bgLight = process.env.NEXT_PUBLIC_THEME_BG_LIGHT || '#F8F9FA';
  const bgDark = process.env.NEXT_PUBLIC_THEME_BG_DARK || '#111115';

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --primary: ${primaryColor};
            --primary-hover: ${primaryHover};
            --accent: ${accentColor};
            --background: ${bgLight};
            --foreground: ${bgDark};
            --ring: ${primaryColor};
          }
          .bg-primary { background-color: ${primaryColor} !important; }
          .text-primary { color: ${primaryColor} !important; }
          .border-primary { border-color: ${primaryColor} !important; }
          .hover\\:bg-primary:hover { background-color: ${primaryColor} !important; }
          .hover\\:text-primary:hover { color: ${primaryColor} !important; }
          
          /* Override rose classes if still used */
          .bg-rose-500, .bg-rose-600 { background-color: ${primaryColor} !important; }
          .text-rose-500, .text-rose-600 { color: ${primaryColor} !important; }
          .border-rose-500, .border-rose-600 { border-color: ${primaryColor} !important; }
          .hover\\:bg-rose-600:hover { background-color: ${primaryHover} !important; }
          .hover\\:text-rose-600:hover { color: ${primaryHover} !important; }
        `}} />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground font-sans antialiased selection:bg-primary selection:text-white">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              
              {/* Global Header */}
              <Navbar />

              {/* Dynamic Page Content */}
              <div className="flex-1">
                {children}
              </div>

              {/* Global Interactive Slide-Over Drawer Cart */}
              <DrawerCart />

              {/* Global Floating WhatsApp VIP Action Button */}
              <FloatingWhatsApp />

              {/* Global Embedded AI Personal Stylist */}
              <AIAssistantWidget />

              {/* Global Luxury Footer */}
              <Footer />

            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
