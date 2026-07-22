# Deployment Guide: Darmhie's Collections V2

Follow these steps to deploy your luxury fashion platform to Vercel with a real Supabase database.

## Phase 1: Supabase Database Setup
1. **Create Project:** Go to [Supabase](https://supabase.com) and create a new project.
2. **Get Connection String:** 
   - Go to **Project Settings** > **Database**.
   - Copy the **Connection String** (Transaction mode, port 6543 or Session mode, port 5432).
   - It will look like: `postgresql://postgres.[YOUR-PROJECT-ID]:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres`
3. **Update .env:** Paste this into your `DATABASE_URL` in your `.env` file.

## Phase 2: Prepare for Deployment
1. **Git Init:** Initialize a git repository in your project folder:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   ```
2. **GitHub:** Create a new private repository on GitHub and push your code.

## Phase 3: Vercel Deployment
1. **Import Project:** Go to [Vercel](https://vercel.com) and import your GitHub repository.
2. **Environment Variables:** In the Vercel dashboard, add all the variables from your `.env` file:
   - `NEXT_PUBLIC_STORE_NAME`
   - `NEXT_PUBLIC_ADMIN_USER`
   - `NEXT_PUBLIC_ADMIN_PASS`
   - `DATABASE_URL`
   - `NEXT_PUBLIC_THEME_PRIMARY` (e.g., `#009146`)
   - `PAYSTACK_SECRET_KEY`
   - `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`
   - ...and all others in your `.env`.
3. **Build Command:** Vercel will automatically detect Next.js. The build command should be `npm run build`.

## Phase 4: Push Database Schema
Once your `DATABASE_URL` is set, run this on your local machine to create the tables in Supabase:
```bash
npx prisma db push
```

## Phase 5: Initial Data (Optional)
To add the base categories (Clothes, Cosmetics, etc.) to your live site:
```bash
npx prisma db seed
```

## Important URLs
- **Admin Dashboard:** `https://your-domain.com/admin`
- **Private Admin Login:** `https://your-domain.com/director-login`
- **Public Shop:** `https://your-domain.com/shop`

---
*Created for Darmhie's Collections — Rebuilt for Scale, Royalty & Timeless Elegance.*
