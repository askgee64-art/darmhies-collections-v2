# DARMHIE'S COLLECTIONS V2 — LUXURY COMMERCE PLATFORM REBUILD

**Darmhie's Collections V2** is a production-grade modern luxury e-commerce platform built for high-end fashion, fine cosmetics, 18k solid gold chains, bespoke jewelry, and designer accessories.

Designed with a **Zara & Fashion Nova level luxury aesthetic**, glassmorphism, metallic champagne gold typography, and ultra-fast Next.js App Router performance, this platform is ready for thousands of active shoppers and scalable across enterprise cloud environments.

---

## 🌟 KEY FEATURES

### 🛍️ Client Storefront Experience
- **Luxury Aesthetic**: Fluid responsive UI with champagne gold accents, glassmorphism overlays, and smooth micro-interactions.
- **7 Core House Categories**:
  1. **Clothes** — Evening gowns, Italian silk trench coats, tailored blazer sets.
  2. **Cosmetics** — 24k gold hydration serums, velveteen lip nectar sets, 18-shade eyeshadow palettes.
  3. **Jewelry** — Diamond drop chandelier earrings, Zambian emerald rings, Tahitian pearl bangles.
  4. **Chains** — Solid 18k gold iced-out Cuban links, liquid snake multi-layered chains, initial medallions.
  5. **Accessories** — Oversized tortoiseshell sunglasses, silk twill scarves, crystal headbands.
  6. **Shoes** — Crystal stiletto pumps, liquid gold sandals, croc-embossed boots.
  7. **Bags** — Full-grain French calfskin totes, crystal evening clutches, quilted crossbody purses.
- **Product Search & Multi-Filter Engine**: Live instant search, category filtering, price range sliders, sorting by price, popularity, ratings, or newest releases.
- **Product Detail Page (PDP)**: Multi-image gallery with hover zoom, variant selectors (Size/Shade), real-time stock indicators, and customer review submission modal.

### 💳 VIP Checkout & Payment Systems
- **Persistent Slide-Out Drawer Cart**: Unlocks free VIP Courier Delivery progress bar.
- **Paystack Payment Gateway Integration**: Native support for Credit/Debit Cards, USSD, Direct Bank Transfer, and Apple Pay.
- **Direct Bank Wire Option**: Display Guaranty Trust Bank corporate details and instructions.
- **WhatsApp Commerce**: Pre-formatted one-click order generation sent directly to the concierge's WhatsApp number (`NEXT_PUBLIC_WHATSAPP_NUMBER`).

### 🤖 AI Shopping Assistant & Personal Stylist
- **Embedded AI Stylist Bot**: Powered by OpenAI (with local smart query matching fallback engine).
- **Conversational Queries Supported**:
  - *"Show me gold jewelry under ₦100,000"*
  - *"I need an evening dress for a gala"*
  - *"Recommend cosmetics for glowing skin"*
  - *"Track my order #DARM-1002"*
- Directly returns product recommendations with instant **"Add to Bag"** or **"View Product"** CTAs.

### 👑 Director Admin Dashboard
- **Analytics KPI Command Center**: Gross revenue metrics, order velocity, active client count, low stock alert warnings, and best sellers breakdown.
- **Product Vault CRUD**: Add, edit, delete, tag products (`Best Seller`, `Trending`, `New Arrival`, `Featured`), assign SKUs and update stock levels.
- **Order Management**: Filter order status (`PENDING`, `PAID`, `PROCESSING`, `SHIPPED`, `DELIVERED`, `CANCELLED`), assign courier tracking waybill numbers, and view printable invoices.
- **VIP Client Directory**: Monitor purchase metrics and toggle account status (`Active VIP` / `Suspended`).
- **Promotions & Promo Codes**: Manage percentage and fixed discount coupons with minimum spend controls.
- **Editorial Releases**: Publish homepage news announcements and campaign banners.

---

## 🏗️ TECH STACK

- **Framework**: Next.js 14 / 15 App Router (`/app` architecture)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Lucide Icons
- **Database ORM**: Prisma ORM
- **Database Engine**: Supabase PostgreSQL (Migrated from legacy SQLite)
- **Storage & Auth**: Supabase Storage & Supabase Auth
- **Payments**: Paystack API
- **AI Intelligence**: OpenAI API SDK
- **State Management**: React Context (`CartContext`, `WishlistContext`, `AuthContext`)

---

## 🛠️ ENVIRONMENT VARIABLES (`.env`)

Copy `.env.example` to `.env` and fill in your Supabase, Paystack, and OpenAI API credentials:

```bash
NEXT_PUBLIC_STORE_NAME="Darmhie's Collections"
NEXT_PUBLIC_STORE_DESCRIPTION="Premium Luxury Fashion, Fine Cosmetics & 18k Solid Gold Chains"
NEXT_PUBLIC_STORE_LOGO="/logo.png"

NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
DATABASE_URL="postgresql://postgres:password@db.your-project.supabase.co:5432/postgres"

NEXTAUTH_SECRET="darmhies_collections_super_secret_jwt_key_2026"
NEXTAUTH_URL="http://localhost:3000"

PAYSTACK_SECRET_KEY="sk_test_xxx"
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="pk_test_xxx"

NEXT_PUBLIC_WHATSAPP_NUMBER="+2348012345678"

OPENAI_API_KEY="sk-proj-xxx"

ADMIN_EMAIL="admin@darmhiescollections.com"
ADMIN_PASSWORD="AdminPassword123!"
```

---

## 🚀 LOCAL DEVELOPMENT & SETUP

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

3. **Run Supabase Database Migration (Optional for local PostgreSQL)**:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

4. **Start Local Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 PROJECT STRUCTURE

```
/app
  ├── page.tsx                    # Luxury Homepage
  ├── shop/page.tsx               # Product Vault Catalog with Filters
  ├── category/[slug]/page.tsx    # Category Specific Storefront
  ├── product/[slug]/page.tsx     # Product Details Page (PDP) & Review Modal
  ├── cart/page.tsx               # Full Shopping Bag Page
  ├── checkout/page.tsx           # Multi-Payment Step Checkout
  ├── order-confirmation/[id]     # Verified Order Invoice & Tracking
  ├── auth/                       # Login & Registration Pages
  ├── account/page.tsx            # Customer VIP Portal & History
  ├── about/                      # Brand Narrative & Heritage
  ├── contact/                    # VIP Concierge Enquiries
  ├── wishlist/                   # Saved Items Page
  ├── admin/                      # Director Admin Command Center
  │     ├── page.tsx              # Analytics & Metrics Dashboard
  │     ├── products/page.tsx     # Full Product CRUD Table
  │     ├── orders/page.tsx       # Order Processing & Tracking Assignment
  │     ├── customers/page.tsx    # Customer Management & Suspension
  │     ├── coupons/page.tsx      # Discount Coupon Controls
  │     └── content/page.tsx      # Editorial Releases Management
  └── api/                        # Next.js Serverless Route Handlers
        ├── ai-assistant/         # AI Stylist Endpoint
        ├── coupons/validate/     # Coupon Code Verification
        └── paystack/verify/      # Payment Status Webhook Verifier
/components
  ├── layout/                     # Navbar, Footer, DrawerCart, FloatingWhatsApp
  ├── home/                       # Hero, Featured, Trending, BestSellers, Story
  ├── shop/                       # ProductCard, Search & Filter Components
  └── ai/                         # AIAssistantWidget Drawer Modal
/lib
  ├── mock-db.ts                  # Stateful In-Memory Fallback Engine (50+ Products)
  ├── prisma.ts                   # Prisma PostgreSQL Connection Client
  ├── supabase.ts                 # Supabase JS Client & Storage Uploaders
  ├── paystack.ts                 # Paystack API Helpers
  ├── auth.ts                     # Password Hashing & JWT Verification
  └── utils.ts                    # Naira Formatting (₦), WhatsApp Link Generator
/prisma
  ├── schema.prisma               # Supabase PostgreSQL DDL Schema
  └── seed.ts                     # Database Seeding Script
/supabase
  └── migrations/                 # DDL SQL Script for Manual SQL Execution
```

---

## ☁️ DEPLOYMENT INSTRUCTIONS

### Deploying to Vercel
1. Push the code repository to GitHub/GitLab.
2. Import the project in **Vercel**.
3. Set the Environment Variables defined in `.env.example`.
4. Vercel will automatically run `npm run build` and deploy serverless App Router endpoints.

### Deploying Database to Supabase
1. Create a project at [Supabase](https://supabase.com).
2. Get the PostgreSQL direct connection string from **Database Settings** -> **Connection String** and set it as `DATABASE_URL`.
3. Run the migration script in `supabase/migrations/20260717000000_init_schema.sql` inside the Supabase SQL Editor or run:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

---

*Handcrafted for Darmhie's Collections V2 — Rebuilt for Scale, Royalty & Timeless Elegance.*
