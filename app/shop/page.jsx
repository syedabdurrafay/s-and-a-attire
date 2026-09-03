"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { categories, products } from "@/data/products";

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategory = searchParams.get("category") || "All";

  const filtered = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  function setCategory(category) {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    const qs = params.toString();
    router.push(`/shop${qs ? `?${qs}` : ""}`);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-10">
        <p className="font-mono text-xs uppercase tracking-widest2 text-rust">Shop</p>
        <h1 className="font-display text-3xl sm:text-4xl mt-2">
          {activeCategory === "All" ? "All Products" : activeCategory}
        </h1>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 font-mono text-xs uppercase tracking-widest2 border transition-colors focus-ring ${
              activeCategory === cat
                ? "bg-ink text-paper border-ink"
                : "border-ink/20 hover:border-ink"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-ink/60">No products found in this category yet.</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-20">Loading…</div>}>
      <ShopContent />
    </Suspense>
  );
}
