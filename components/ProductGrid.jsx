"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import ProductCard from "./ProductCard";

const CATEGORIES = [
  "All",
  "Check Shirts",
  "Shirts",
  "Polo Shirts",
  "T-Shirts",
  "Hoodies",
  "Jeans",
  "Dress Pants",
];

const AVAILABILITY_FILTERS = [
  { label: "All", value: "all" },
  { label: "Available", value: "available" },
  { label: "Sold Out", value: "sold" },
];

export default function ProductGrid({ title, products, viewAllHref = "/shop" }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Initialize from the URL so links like /shop?category=Check%20Shirts work.
  const urlCategory = searchParams.get("category");
  const initialCategory =
    urlCategory && CATEGORIES.includes(urlCategory) ? urlCategory : "All";

  const [category, setCategory] = useState(initialCategory);
  const [availability, setAvailability] = useState("all");

  // Keep the filter in sync if the URL changes (e.g. clicking a tile
  // while already on /shop, or using the browser back button).
  useEffect(() => {
    const current = searchParams.get("category");
    setCategory(current && CATEGORIES.includes(current) ? current : "All");
  }, [searchParams]);

  function selectCategory(cat) {
    setCategory(cat);
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "All") {
      params.delete("category");
    } else {
      params.set("category", cat);
    }
    const query = params.toString();
    router.push(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
  }

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const categoryMatch = category === "All" || p.category === category;
      const availabilityMatch =
        availability === "all" ||
        (availability === "available" && !p.sold) ||
        (availability === "sold" && p.sold);
      return categoryMatch && availabilityMatch;
    });
  }, [products, category, availability]);

  return (
    <section id="shop-grid" className="mx-auto max-w-7xl px-4 py-14 scroll-mt-24">
      <div className="flex items-end justify-between mb-8">
        <h2 className="font-display text-2xl sm:text-3xl">{title}</h2>
        <Link
          href={viewAllHref}
          className="font-mono text-xs uppercase tracking-widest2 hover:text-rust focus-ring"
        >
          View All &rarr;
        </Link>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => selectCategory(cat)}
            aria-pressed={category === cat}
            className={`font-mono text-[11px] uppercase tracking-widest2 px-4 py-2 border transition-colors focus-ring ${
              category === cat
                ? "bg-ink text-paper border-ink"
                : "border-ink/20 text-ink/70 hover:border-ink hover:text-ink"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Availability filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {AVAILABILITY_FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setAvailability(f.value)}
            aria-pressed={availability === f.value}
            className={`font-mono text-[11px] uppercase tracking-widest2 px-4 py-2 border transition-colors focus-ring ${
              availability === f.value
                ? "bg-rust text-paper border-rust"
                : "border-ink/20 text-ink/70 hover:border-rust hover:text-rust"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <p className="font-mono text-sm text-ink/60 py-10 text-center">
          No products match this filter.
        </p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
          {filteredProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}