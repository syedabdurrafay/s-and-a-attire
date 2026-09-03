"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const TILES = [
  {
    label: "Check Shirts",
    tagline: "Classic plaids, tailored fit.",
    href: "/shop?category=Check%20Shirts",
  },
  {
    label: "Shirts",
    tagline: "Everyday essentials, sharp fit.",
    href: "/shop?category=Shirts",
  },
  {
    label: "Polo Shirts",
    tagline: "Smart-casual, all day comfort.",
    href: "/shop?category=Polo%20Shirts",
  },
  {
    label: "T-Shirts",
    tagline: "Essential layers, built to move.",
    href: "/shop?category=T-Shirts",
  },
  {
    label: "Hoodies",
    tagline: "Cozy layers for the city cold.",
    href: "/shop?category=Hoodies",
  },
  {
    label: "Jeans",
    tagline: "Durable denim, everyday fit.",
    href: "/shop?category=Jeans",
  },
  {
    label: "Dress Pants",
    tagline: "Tailored fits for sharper days.",
    href: "/shop?category=Dress%20Pants",
  },
];

export default function CategoryTiles() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId;
    let scrollPosition = 0;
    const speed = 0.5;

    const scroll = () => {
      scrollPosition += speed;
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };

    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId);
    };

    const handleMouseLeave = () => {
      scroll();
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    scroll();

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="bg-[#252422] py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
            Shop by Category
          </h2>
          <div className="mt-2 h-1 w-20 bg-gradient-to-r from-white/60 to-white mx-auto rounded-full" />
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden scroll-smooth cursor-grab px-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {[...TILES, ...TILES].map((tile, index) => (
            <Link
              key={`${tile.label}-${index}`}
              href={tile.href}
              className="group flex-shrink-0 w-80 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-black/30"
            >
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <h3 className="font-display text-2xl font-bold text-white group-hover:text-white transition-colors">
                    {tile.label}
                  </h3>
                  <p className="text-white/70 text-sm mt-2 leading-relaxed">
                    {tile.tagline}
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-white/20">
                  <span className="inline-flex items-center font-mono text-xs uppercase tracking-widest text-white/80 group-hover:text-white group-hover:gap-2 transition-all">
                    Explore Collection
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}