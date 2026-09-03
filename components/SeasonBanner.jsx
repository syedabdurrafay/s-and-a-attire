import Link from "next/link";
import Image from "next/image";

export default function SeasonBanner() {
  return (
    <section className="relative bg-ink text-paper" aria-labelledby="season-heading">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 items-stretch">
        {/* Image side — fills the entire column, no gaps */}
        <div className="relative w-full h-[70vh] sm:h-[80vh] lg:h-auto order-2 lg:order-1 overflow-hidden">
          <Image
            src="/images/m1.jpg"
            alt="Model wearing the S & A Attire check shirt, part of the new season Karachi menswear collection"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Text side */}
        <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-14 sm:py-16 lg:py-24 order-1 lg:order-2 text-center lg:text-left items-center lg:items-start">
          <p className="font-mono text-xs uppercase tracking-widest2 text-rust-light">
            New Season — Karachi, Pakistan
          </p>
          <h2
            id="season-heading"
            className="font-display text-4xl sm:text-5xl leading-[0.95] mt-4"
          >
            NEW
            <br />
            VIBES
          </h2>
          <p className="text-paper/70 mt-6 max-w-xs sm:max-w-sm">
            The season&apos;s edit from S &amp; A Attire — lightweight layers, tapered cuts and
            the check shirting Karachi actually wears. Designed locally, finished for the city&apos;s
            heat and pace.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-block bg-paper text-ink px-6 py-3 font-mono text-xs uppercase tracking-widest2 hover:bg-rust hover:text-paper transition-colors w-fit focus-ring"
          >
            Explore The New Season Collection
          </Link>
        </div>
      </div>
    </section>
  );
}