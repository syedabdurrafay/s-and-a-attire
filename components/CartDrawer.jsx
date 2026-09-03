"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatPKR } from "@/data/products";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQty, subtotal } = useCart();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-ink/50 z-50"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[26rem] bg-paper z-50 shadow-2xl transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-ink/10">
          <h2 className="font-display text-lg">Your Bag ({items.length})</h2>
          <button onClick={() => setIsOpen(false)} className="focus-ring text-2xl leading-none" aria-label="Close cart">
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3 py-20">
              <p className="text-ink/60">Your bag is empty.</p>
              <Link
                href="/shop"
                onClick={() => setIsOpen(false)}
                className="font-mono text-xs uppercase tracking-widest2 underline hover:text-rust focus-ring"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-6">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4">
                  <div className="relative h-24 w-20 shrink-0 bg-paperDim">
                    <Image
                      src={`https://picsum.photos/seed/${item.seed}/200/240`}
                      alt={item.name}
                      fill
                      className="object-cover grayscale"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm leading-snug">{item.name}</p>
                      <button
                        onClick={() => removeItem(item.key)}
                        className="text-ink/50 hover:text-rust focus-ring text-xs shrink-0"
                        aria-label={`Remove ${item.name}`}
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-ink/60 text-xs mt-1 font-mono">Size {item.size}</p>
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <div className="flex items-center border border-ink/20">
                        <button
                          className="w-7 h-7 focus-ring"
                          onClick={() => updateQty(item.key, item.qty - 1)}
                          aria-label="Decrease quantity"
                        >
                          &minus;
                        </button>
                        <span className="w-7 text-center text-sm font-mono">{item.qty}</span>
                        <button
                          className="w-7 h-7 focus-ring"
                          onClick={() => updateQty(item.key, item.qty + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-mono text-sm">{formatPKR(item.price * item.qty)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-ink/10 px-6 py-5">
            <div className="flex items-center justify-between font-mono text-sm mb-4">
              <span>Subtotal</span>
              <span>{formatPKR(subtotal)}</span>
            </div>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block text-center bg-ink text-paper py-3 font-mono text-xs uppercase tracking-widest2 hover:bg-rust transition-colors focus-ring"
            >
              Checkout via WhatsApp
            </Link>
            <p className="text-ink/50 text-xs mt-3 text-center">
              Orders are confirmed manually over WhatsApp — no online payment required yet.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
