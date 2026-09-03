"use client";

import { useState } from "react";

export function MotifDivider() {
  return <div className="motif-strip h-3 w-full" role="presentation" aria-hidden="true" />;
}

export default function NewsletterBand() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="bg-indigo text-paper">
      <div className="mx-auto max-w-7xl px-4 py-14 flex flex-col items-center text-center">
        <h2 className="font-display text-2xl sm:text-3xl">Join the List</h2>
        <p className="text-paper/70 mt-3 max-w-sm">
          New drops, restocks and Karachi-only early access — straight to your inbox.
        </p>
        {submitted ? (
          <p className="mt-6 font-mono text-xs uppercase tracking-widest2 text-rust-light">
            You&apos;re on the list.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex w-full max-w-sm gap-2">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@email.com"
              className="flex-1 bg-transparent border border-paper/30 px-4 py-3 text-sm placeholder:text-paper/40 focus-ring"
            />
            <button
              type="submit"
              className="bg-paper text-ink px-5 py-3 font-mono text-xs uppercase tracking-widest2 hover:bg-rust hover:text-paper transition-colors focus-ring shrink-0"
            >
              Join
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
