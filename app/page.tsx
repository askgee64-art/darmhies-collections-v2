import React from 'react';
import { Hero } from '@/components/home/Hero';
import { FeaturedCollections } from '@/components/home/FeaturedCollections';
import { TrendingProducts } from '@/components/home/TrendingProducts';
import { BestSellers } from '@/components/home/BestSellers';
import { BrandStory } from '@/components/home/BrandStory';
import { Testimonials } from '@/components/home/Testimonials';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <FeaturedCollections />
      <TrendingProducts />
      <BestSellers />
      <BrandStory />
      <Testimonials />
    </main>
  );
}
