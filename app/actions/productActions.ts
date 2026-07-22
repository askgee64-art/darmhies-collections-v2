'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getProducts() {
  try {
    return await prisma.product.findMany({
      include: {
        category: true,
        images: {
          orderBy: { position: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function createProduct(data: any) {
  try {
    const product = await prisma.product.create({
      data: {
        title: data.title,
        slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: data.description,
        price: data.price,
        compareAtPrice: data.compareAtPrice,
        stock: data.stock,
        sku: data.sku,
        categoryId: data.categoryId,
        isFeatured: data.isFeatured,
        isTrending: data.isTrending,
        isNewArrival: data.isNewArrival,
        isBestSeller: data.isBestSeller,
        images: {
          create: {
            url: data.imageUrl,
            position: 0,
          },
        },
      },
    });
    revalidatePath('/admin/products');
    revalidatePath('/shop');
    return { success: true, product };
  } catch (error) {
    console.error('Error creating product:', error);
    return { success: false, error: 'Failed to create product' };
  }
}

export async function updateProduct(id: string, data: any) {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        compareAtPrice: data.compareAtPrice,
        stock: data.stock,
        sku: data.sku,
        categoryId: data.categoryId,
        isFeatured: data.isFeatured,
        isTrending: data.isTrending,
        isNewArrival: data.isNewArrival,
        isBestSeller: data.isBestSeller,
      },
    });
    
    // Simple image update logic for now
    if (data.imageUrl) {
        await prisma.productImage.deleteMany({ where: { productId: id } });
        await prisma.productImage.create({
            data: {
                productId: id,
                url: data.imageUrl,
                position: 0
            }
        });
    }

    revalidatePath('/admin/products');
    revalidatePath('/shop');
    return { success: true, product };
  } catch (error) {
    console.error('Error updating product:', error);
    return { success: false, error: 'Failed to update product' };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });
    revalidatePath('/admin/products');
    revalidatePath('/shop');
    return { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { success: false, error: 'Failed to delete product' };
  }
}

export async function getCategories() {
  try {
    return await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getFilteredProducts(filters: any) {
    try {
        const where: any = {};
        if (filters.category) {
            where.category = { slug: filters.category };
        }
        if (filters.search) {
            where.OR = [
                { title: { contains: filters.search, mode: 'insensitive' } },
                { description: { contains: filters.search, mode: 'insensitive' } },
                { sku: { contains: filters.search, mode: 'insensitive' } },
            ];
        }
        if (filters.trending) where.isTrending = true;
        if (filters.bestSeller) where.isBestSeller = true;
        if (filters.newArrival) where.isNewArrival = true;
        if (filters.featured) where.isFeatured = true;

        let orderBy: any = { createdAt: 'desc' };
        if (filters.sortBy === 'price-asc') orderBy = { price: 'asc' };
        if (filters.sortBy === 'price-desc') orderBy = { price: 'desc' };

        return await prisma.product.findMany({
            where,
            include: {
                category: true,
                images: { orderBy: { position: 'asc' } },
            },
            orderBy
        });
    } catch (error) {
        console.error('Error filtering products:', error);
        return [];
    }
}
