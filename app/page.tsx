'use client'
import Hero from "./home/hero/page";
import Product from "./home/product/page"
import { WhyBeYours } from "./home/why/page"
import { RadiantResults } from "./home/now/page"

export default function Home() {
  return (
    <div>
      <Hero />
      <Product />
      <RadiantResults
        title="Radiant Results Guaranteed"
        subtitle="SALE"
        description="Discover the best in beauty — curated just for you. Shop now and transform your look."
        imageSrc="/now.png"
        ctaText="SHOP NOW"
      />
      <WhyBeYours />
    </div>
  );
}
