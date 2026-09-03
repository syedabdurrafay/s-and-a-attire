// app/product/[slug]/page.jsx
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/data/products";
import ProductDetailsClient from "./ProductDetailsClient";

// Required for Next.js static export / GitHub Pages
export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Main page component (Server Component)
export default function ProductPage({ params }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="py-20 text-center">Loading product...</div>}>
      <ProductDetailsClient product={product} />
    </Suspense>
  );
}