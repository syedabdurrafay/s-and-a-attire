import Image from "next/image";

export const metadata = {
  title: "About S & A Attire | Karachi-Designed, Locally Finished Clothing",
  description:
    "S & A Attire is a Karachi-based clothing brand designing and finishing menswear locally — from ajrak-motif shirting to rigid denim. Built for the city's heat, traffic, and everyday wear.",
  keywords: [
    "S & A Attire",
    "Karachi clothing brand",
    "Pakistani menswear",
    "locally made clothes Karachi",
    "ajrak print shirts",
    "Tariq Road fashion studio",
    "Karachi tailoring",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About S & A Attire | Designed & Finished in Karachi",
    description:
      "The story behind S & A Attire — clothing designed in Karachi's Tariq Road studio and finished with local tailoring units across the city.",
    url: "/about",
    siteName: "S & A Attire",
    images: [
      {
        url: "/images/modelman.jpg",
        width: 1600,
        height: 900,
        alt: "S & A Attire model wearing locally designed menswear in Karachi",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About S & A Attire | Designed & Finished in Karachi",
    description:
      "Clothing designed in Karachi, finished locally. Discover the story behind S & A Attire.",
    images: ["/images/modelman.jpg"],
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: "S & A Attire",
    description:
      "S & A Attire designs and finishes clothing locally in Karachi, Pakistan — combining Sindhi-inspired prints, durable fabrics, and city-tested fits.",
    url: "https://www.sandaattire.com/about",
    image: "https://www.sandaattire.com/images/modelman.jpg",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karachi",
      addressRegion: "Sindh",
      addressCountry: "PK",
    },
    areaServed: {
      "@type": "City",
      name: "Karachi",
    },
    founder: {
      "@type": "Organization",
      name: "S & A Attire",
    },
  };

  return (
    <div>
      {/* Structured data for local/GEO SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mx-auto max-w-7xl px-4 py-14">
        <p className="font-mono text-xs uppercase tracking-widest2 text-rust">
          About S &amp; A Attire
        </p>
        <h1 className="font-display text-4xl sm:text-5xl mt-3 max-w-2xl leading-[0.95]">
          Cut for the city we grew up in.
        </h1>
        <p className="text-ink/70 mt-6 max-w-xl leading-relaxed">
          S &amp; A Attire is a Karachi-based clothing brand built on a simple brief: clothes
          that hold up to the city&apos;s heat, its traffic, its late nights and early starts —
          without giving up on fit or fabric. Every piece is designed in-house in Karachi and
          finished locally, from ajrak-motif shirting to denim that fades the way this city does.
        </p>
      </header>

      <div className="relative h-[24rem] sm:h-[32rem] w-full">
        <Image
          src="/images/modelman.jpg"
          alt="Model wearing S & A Attire menswear, designed and finished in Karachi, Pakistan"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      <section
        aria-labelledby="our-process-heading"
        className="mx-auto max-w-7xl px-4 py-14 grid grid-cols-1 sm:grid-cols-3 gap-10"
      >
        <h2 id="our-process-heading" className="sr-only">
          Our process
        </h2>

        <article>
          <p className="font-display text-3xl text-rust" aria-hidden="true">
            01
          </p>
          <h3 className="font-mono text-xs uppercase tracking-widest2 mt-3">
            Designed in Karachi
          </h3>
          <p className="text-ink/60 text-sm mt-2 leading-relaxed">
            Every silhouette starts on paper in our Tariq Road studio, tested against the city
            before it ever reaches the rack.
          </p>
        </article>

        <article>
          <p className="font-display text-3xl text-rust" aria-hidden="true">
            02
          </p>
          <h3 className="font-mono text-xs uppercase tracking-widest2 mt-3">
            Finished Locally
          </h3>
          <p className="text-ink/60 text-sm mt-2 leading-relaxed">
            We work with tailoring units across Karachi, keeping production close to home and
            quality easy to check.
          </p>
        </article>

        <article>
          <p className="font-display text-3xl text-rust" aria-hidden="true">
            03
          </p>
          <h3 className="font-mono text-xs uppercase tracking-widest2 mt-3">
            Built to Last
          </h3>
          <p className="text-ink/60 text-sm mt-2 leading-relaxed">
            Heavier fabrics, reinforced seams and finishes chosen for daily wear, not just the
            first wash.
          </p>
        </article>
      </section>
    </div>
  );
}