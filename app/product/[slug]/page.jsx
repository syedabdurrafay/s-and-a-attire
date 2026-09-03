import { products } from "@/data/products";
import ProductClient from "./ProductClient";

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductPage({ params }) {
  return <ProductClient params={params} />;
}