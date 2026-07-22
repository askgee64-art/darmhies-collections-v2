import { PrismaClient } from '@prisma/client';
import { 
  initialCategories, 
  initialProducts, 
  initialCustomers, 
  initialCoupons, 
  initialNews, 
  initialOrders 
} from '../lib/mock-db';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting Darmhie’s Collections V2 Database Seed...');

  // 1. Seed Categories
  for (const cat of initialCategories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        imageUrl: cat.imageUrl,
        isFeatured: cat.isFeatured ?? true,
      },
    });
  }
  console.log(`✅ ${initialCategories.length} Categories seeded.`);

  // 2. Seed Products & Images
  for (const prod of initialProducts) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {},
      create: {
        id: prod.id,
        title: prod.title,
        slug: prod.slug,
        description: prod.description,
        details: prod.details,
        price: prod.price,
        compareAtPrice: prod.compareAtPrice,
        costPrice: prod.costPrice,
        stock: prod.stock,
        sku: prod.sku,
        isFeatured: prod.isFeatured,
        isTrending: prod.isTrending,
        isNewArrival: prod.isNewArrival,
        isBestSeller: prod.isBestSeller,
        categoryId: prod.categoryId,
        images: {
          create: prod.images.map((img) => ({
            url: img.url,
            position: img.position,
          })),
        },
      },
    });
  }
  console.log(`✅ ${initialProducts.length} Products seeded.`);

  // 3. Seed Customers
  for (const cust of initialCustomers) {
    await prisma.customer.upsert({
      where: { email: cust.email },
      update: {},
      create: {
        id: cust.id,
        name: cust.name,
        email: cust.email,
        phone: cust.phone,
        avatarUrl: cust.avatarUrl,
        isVerified: cust.isVerified,
        isSuspended: cust.isSuspended,
      },
    });
  }
  console.log(`✅ ${initialCustomers.length} Customer accounts seeded.`);

  // 4. Seed Coupons
  for (const coup of initialCoupons) {
    await prisma.coupon.upsert({
      where: { code: coup.code },
      update: {},
      create: {
        id: coup.id,
        code: coup.code,
        discountType: coup.discountType,
        discountValue: coup.discountValue,
        minSpend: coup.minSpend,
        maxUses: coup.maxUses,
        usedCount: coup.usedCount,
        isActive: coup.isActive,
      },
    });
  }
  console.log(`✅ ${initialCoupons.length} Discount coupons seeded.`);

  // 5. Seed News Promotions
  for (const news of initialNews) {
    await prisma.news.create({
      data: {
        id: news.id,
        title: news.title,
        subtitle: news.subtitle,
        content: news.content,
        imageUrl: news.imageUrl,
        isActive: news.isActive,
      },
    });
  }
  console.log(`✅ ${initialNews.length} News editorial banners seeded.`);

  console.log('🎉 Darmhie’s Collections Database Seeding Completed Successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
