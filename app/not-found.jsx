import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 text-center">
      <p className="font-display text-6xl sm:text-8xl">404</p>
      <p className="text-ink/60 mt-4">This page doesn&apos;t exist — but the rest of the shop does.</p>
      <Link
        href="/"
        className="inline-block mt-8 bg-ink text-paper px-8 py-4 font-mono text-xs uppercase tracking-widest2 hover:bg-rust transition-colors focus-ring"
      >
        Back Home
      </Link>
    </div>
  );
}
