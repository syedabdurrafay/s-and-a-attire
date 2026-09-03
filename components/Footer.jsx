import Link from "next/link";
import { MotifDivider } from "./Newsletter";

export default function Footer() {
  return (
    <footer className="bg-paper border-t border-ink/10">
      <MotifDivider />
      <div className="mx-auto max-w-7xl px-4 py-14 grid grid-cols-2 sm:grid-cols-4 gap-10">
        <div className="col-span-2 sm:col-span-1">
          <p className="font-display text-2xl text-ink">S &amp; A</p>
          <p className="text-ink/60 text-sm mt-4 max-w-[16rem]">
            A Karachi-based clothing label. Everyday fits, cut for the city, for men, women and
            kids.
          </p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest2 text-rust-light">Shop</p>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-ink/70">
            <li><Link href="/shop?category=Men" className="hover:text-rust focus-ring">Men</Link></li>
            <li><Link href="/shop?category=Women" className="hover:text-rust focus-ring">Women</Link></li>
            <li><Link href="/shop?category=Kids" className="hover:text-rust focus-ring">Kids</Link></li>
            <li><Link href="/shop" className="hover:text-rust focus-ring">New In</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest2 text-rust-light">Company</p>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-ink/70">
            <li><Link href="/about" className="hover:text-rust focus-ring">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-rust focus-ring">Contact</Link></li>
            <li><Link href="/contact" className="hover:text-rust focus-ring">Track Order</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest2 text-rust-light">Visit</p>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-ink/70">
            <li>Tariq Road, Karachi</li>
            <li>+92 300 1234567</li>
            <li>hello@saattire.pk</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink/10">
        <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink/50 font-mono">
          <p>&copy; {new Date().getFullYear()} S &amp; A Attire. All rights reserved.</p>
          <p>Designed &amp; built in Karachi, Pakistan.</p>
        </div>
      </div>
    </footer>
  );
}