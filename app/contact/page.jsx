"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <p className="font-mono text-xs uppercase tracking-widest2 text-rust">Contact</p>
      <h1 className="font-display text-4xl sm:text-5xl mt-3">Get in Touch</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
        <div>
          <p className="text-ink/70 max-w-md leading-relaxed">
            Questions about an order, sizing, or a bulk request? Reach us directly — we usually
            reply within a few hours.
          </p>

          <ul className="mt-8 flex flex-col gap-6">
            <li>
              <p className="font-mono text-xs uppercase tracking-widest2 text-rust">WhatsApp</p>
              <p className="mt-1">+92 300 1234567</p>
            </li>
            <li>
              <p className="font-mono text-xs uppercase tracking-widest2 text-rust">Email</p>
              <p className="mt-1">hello@saattire.pk</p>
            </li>
            <li>
              <p className="font-mono text-xs uppercase tracking-widest2 text-rust">Instagram</p>
              <p className="mt-1">@saattire.pk</p>
            </li>
            <li>
              <p className="font-mono text-xs uppercase tracking-widest2 text-rust">Studio</p>
              <p className="mt-1">Tariq Road, Karachi, Pakistan</p>
            </li>
          </ul>
        </div>

        <div>
          {submitted ? (
            <div className="border border-ink/10 p-8">
              <p className="font-display text-xl">Message sent.</p>
              <p className="text-ink/60 mt-2 text-sm">
                Thanks for reaching out — we&apos;ll get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label htmlFor="name" className="font-mono text-xs uppercase tracking-widest2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="mt-2 w-full border border-ink/20 px-4 py-3 text-sm bg-transparent focus-ring"
                />
              </div>
              <div>
                <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="mt-2 w-full border border-ink/20 px-4 py-3 text-sm bg-transparent focus-ring"
                />
              </div>
              <div>
                <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  className="mt-2 w-full border border-ink/20 px-4 py-3 text-sm bg-transparent focus-ring"
                />
              </div>
              <button
                type="submit"
                className="bg-ink text-paper px-8 py-4 font-mono text-xs uppercase tracking-widest2 hover:bg-rust transition-colors focus-ring w-fit"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
