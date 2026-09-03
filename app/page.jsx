import Hero from "@/components/Hero";
import CategoryTiles from "@/components/CategoryTiles";
import SeasonBanner from "@/components/SeasonBanner";
import FeatureBar from "@/components/FeatureBar";
import ProductGrid from "@/components/ProductGrid";
import NewsletterBand from "@/components/Newsletter";
import { products } from "@/data/products";

export default function HomePage() {
  const bestOf = products.slice(0, 8);

  return (
    <>
      <Hero />
      <CategoryTiles />
      <SeasonBanner />
      <FeatureBar />
      <ProductGrid title="Best of S & A" products={bestOf} />
      <NewsletterBand />
    </>
  );
}
