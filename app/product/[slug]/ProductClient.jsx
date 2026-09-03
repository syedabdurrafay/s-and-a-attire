"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, formatPKR, products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductGrid from "@/components/ProductGrid";

// Required for Next.js static export / GitHub Pages
export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductPage({ params }) {
  const product = getProductBySlug(params.slug);
  const { addItem } = useCart();

  const [size, setSize] = useState(null);
  const [error, setError] = useState(false);

  if (!product) {
    notFound();
  }

  const related = products
    .filter(
      (p) =>
        p.category === product.category &&
        p.slug !== product.slug
    )
    .slice(0, 4);

  function handleAddToCart() {
    if (!size) {
      setError(true);
      return;
    }

    setError(false);
    addItem(product, size);
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8">

        {/* Breadcrumb */}
        <nav className="font-mono text-xs uppercase tracking-widest2 text-ink/50 mb-8">
          <Link
            href="/"
            className="hover:text-rust focus-ring"
          >
            Home
          </Link>

          <span className="mx-2">/</span>

          <Link
            href={`/shop?category=${product.category}`}
            className="hover:text-rust focus-ring"
          >
            {product.category}
          </Link>

          <span className="mx-2">/</span>

          <span className="text-ink">
            {product.name}
          </span>
        </nav>

        {/* Product */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Product Image */}
          <div className="relative aspect-[3/4] bg-paperDim">
            <Image
              src={`https://picsum.photos/seed/${product.seed}/900/1200`}
              alt={product.name}
              fill
              priority
              className="object-cover grayscale"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Product Information */}
          <div className="lg:pt-4">

            <p className="font-mono text-xs uppercase tracking-widest2 text-rust">
              {product.category}
            </p>

            <h1 className="font-display text-3xl sm:text-4xl mt-3 leading-tight">
              {product.name}
            </h1>

            <p className="font-mono text-xl mt-4">
              {formatPKR(product.price)}
            </p>

            <p className="text-ink/70 mt-6 max-w-md leading-relaxed">
              {product.blurb}
            </p>

            {/* Size Selection */}
            <div className="mt-8">
              <p className="font-mono text-xs uppercase tracking-widest2 mb-3">
                Size{" "}
                {error && (
                  <span className="text-rust normal-case">
                    — please select a size
                  </span>
                )}
              </p>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSize(s);
                      setError(false);
                    }}
                    className={`min-w-[3rem] px-3 py-2 font-mono text-sm border transition-colors focus-ring ${
                      size === s
                        ? "bg-ink text-paper border-ink"
                        : "border-ink/20 hover:border-ink"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Add To Bag */}
            <button
              onClick={handleAddToCart}
              className="mt-8 w-full sm:w-auto bg-ink text-paper px-10 py-4 font-mono text-xs uppercase tracking-widest2 hover:bg-rust transition-colors focus-ring"
            >
              Add to Bag
            </button>

            {/* Details */}
            <div className="mt-10 border-t border-ink/10 pt-6">
              <p className="font-mono text-xs uppercase tracking-widest2 mb-3">
                Details
              </p>

              <ul className="flex flex-col gap-2 text-sm text-ink/70">
                {product.details.map((d) => (
                  <li
                    key={d}
                    className="flex gap-2"
                  >
                    <span className="text-rust">
                      —
                    </span>

                    <span>
                      {d}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <ProductGrid
          title="You May Also Like"
          products={related}
          viewAllHref={`/shop?category=${product.category}`}
        />
      )}
    </>
  );
}