'use client'
import Hero from "./home/hero/page";
import Product from "./home/product/page"
import Why from "../components/Why"
import Now from "../components/Now"

export default function Home() {
  return (
    <div>
      <Hero />
      <Product />
      <Now
        title="Radiant Results Guaranteed"
        subtitle="SALE"
        description="Discover the best in beauty — curated just for you. Shop now and transform your look."
        imageSrc="/now.png"
        ctaText="SHOP NOW"
      />
      <Why />
    </div>
  );
}
