"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const SHOP_CATEGORIES = [
  { label: "Check Shirts", href: "/shop?category=Check%20Shirts" },
  { label: "Shirts", href: "/shop?category=Shirts" },
  { label: "Polo Shirts", href: "/shop?category=Polo%20Shirts" },
  { label: "T-Shirts", href: "/shop?category=T-Shirts" },
  { label: "Hoodies", href: "/shop?category=Hoodies" },
  { label: "Jeans", href: "/shop?category=Jeans" },
  { label: "Dress Pants", href: "/shop?category=Dress%20Pants" },
];

const NAV_LINKS = [{ label: "About", href: "/about" }];

export default function Header() {
  const { count, setIsOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40 bg-paper">
      {/* Promo bar — scrolling ticker */}
      <div className="bg-indigo text-paper text-[11px] tracking-widest2 uppercase font-mono overflow-hidden">
        <div className="relative flex whitespace-nowrap py-2">
          <div className="flex animate-marquee gap-16 pr-16">
            <span>Free delivery in Karachi on orders above Rs. 5,000</span>
            <span>Free delivery in Karachi on orders above Rs. 5,000</span>
            <span>Free delivery in Karachi on orders above Rs. 5,000</span>
            <span>Free delivery in Karachi on orders above Rs. 5,000</span>
          </div>
          <div className="flex animate-marquee gap-16 pr-16" aria-hidden="true">
            <span>Free delivery in Karachi on orders above Rs. 5,000</span>
            <span>Free delivery in Karachi on orders above Rs. 5,000</span>
            <span>Free delivery in Karachi on orders above Rs. 5,000</span>
            <span>Free delivery in Karachi on orders above Rs. 5,000</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b border-ink/10">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between gap-4">
          <button
            className="lg:hidden focus-ring p-1"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
              <path d="M0 1H22M0 8H22M0 15H22" stroke="#14110E" strokeWidth="1.5" />
            </svg>
          </button>

          <nav className="hidden lg:flex items-center gap-8 font-mono text-xs uppercase tracking-widest2 flex-1">
            {/* Shop dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
            >
              <button
                className="flex items-center gap-1.5 hover:text-rust focus-ring"
                aria-haspopup="true"
                aria-expanded={shopOpen}
              >
                Shop
                <svg
                  width="9"
                  height="6"
                  viewBox="0 0 9 6"
                  fill="none"
                  className={`transition-transform ${shopOpen ? "rotate-180" : ""}`}
                >
                  <path d="M1 1L4.5 5L8 1" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </button>

              {shopOpen && (
                <div className="absolute top-full left-0 pt-3">
                  <div className="bg-paper border border-ink/15 shadow-lg min-w-[220px] py-2">
                    <Link
                      href="/shop"
                      className="block px-5 py-2.5 hover:bg-ink/5 hover:text-rust focus-ring border-b border-ink/10 mb-1 font-medium"
                    >
                      All Products
                    </Link>
                    {SHOP_CATEGORIES.map((cat) => (
                      <Link
                        key={cat.label}
                        href={cat.href}
                        className="block px-5 py-2.5 hover:bg-ink/5 hover:text-rust focus-ring"
                      >
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {NAV_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-rust focus-ring">
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/"
            className="font-display text-2xl sm:text-3xl tracking-tight text-center flex-1 lg:flex-none"
          >
            S &amp; A
          </Link>

          <div className="flex items-center gap-4 sm:gap-5 flex-1 justify-end font-mono text-xs uppercase tracking-widest2">
            <Link href="/shop" className="hidden sm:inline hover:text-rust focus-ring" aria-label="Search products">
              Search
            </Link>
            <Link href="/contact" className="hidden sm:inline hover:text-rust focus-ring" aria-label="Contact us">
              Contact Us
            </Link>
            <button
              onClick={() => setIsOpen(true)}
              className="relative focus-ring hover:text-rust"
              aria-label={`Open cart, ${count} items`}
            >
              Cart ({count})
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="lg:hidden border-t border-ink/10 px-4 py-4 flex flex-col gap-1 font-mono text-xs uppercase tracking-widest2">
            <button
              className="flex items-center justify-between py-3"
              onClick={() => setMobileShopOpen((v) => !v)}
              aria-expanded={mobileShopOpen}
            >
              Shop
              <svg
                width="9"
                height="6"
                viewBox="0 0 9 6"
                fill="none"
                className={`transition-transform ${mobileShopOpen ? "rotate-180" : ""}`}
              >
                <path d="M1 1L4.5 5L8 1" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </button>

            {mobileShopOpen && (
              <div className="flex flex-col pl-4 border-l border-ink/10 mb-2">
                <Link
                  href="/shop"
                  onClick={() => setMenuOpen(false)}
                  className="py-2.5 hover:text-rust focus-ring font-medium"
                >
                  All Products
                </Link>
                {SHOP_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.label}
                    href={cat.href}
                    onClick={() => setMenuOpen(false)}
                    className="py-2.5 hover:text-rust focus-ring"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            )}

            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 hover:text-rust focus-ring"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="py-3 hover:text-rust focus-ring border-t border-ink/10 mt-2 pt-4"
            >
              Contact Us
            </Link>
          </nav>
        )}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 18s linear infinite;
        }
      `}</style>
    </div>
  );
}