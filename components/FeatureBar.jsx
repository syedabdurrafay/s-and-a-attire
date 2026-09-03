const FEATURES = [
  {
    title: "Fast Delivery",
    body: "Quick & safe delivery",
    icon: (
      <path
        d="M2 8h13v9H2zM15 11h4l3 3v3h-7zM6.5 21a2 2 0 100-4 2 2 0 000 4zM17.5 21a2 2 0 100-4 2 2 0 000 4z"
        stroke="#14110E"
        strokeWidth="1.4"
        fill="none"
      />
    ),
  },
  {
    title: "Easy Returns",
    body: "Within 15 days",
    icon: (
      <path
        d="M3 12a9 9 0 109-9M3 12V5m0 7h7"
        stroke="#14110E"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Quality Assured",
    body: "Best fabric, best stitch",
    icon: (
      <path
        d="M12 2l3 6 6.5.9-4.7 4.6 1.1 6.5L12 17l-5.9 3 1.1-6.5L2.5 8.9 9 8z"
        stroke="#14110E"
        strokeWidth="1.4"
        fill="none"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Secure Payment",
    body: "COD & 100% secure checkout",
    icon: (
      <path
        d="M3 6h18v13H3zM3 10h18M7 15h4"
        stroke="#14110E"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
    ),
  },
];

function FeatureItem({ f }) {
  return (
    <div className="flex items-center gap-3 px-8 shrink-0">
      <svg width="30" height="30" viewBox="0 0 24 24" className="shrink-0">
        {f.icon}
      </svg>
      <div className="whitespace-nowrap">
        <p className="font-mono text-xs uppercase tracking-widest2">{f.title}</p>
        <p className="text-ink/60 text-xs mt-1">{f.body}</p>
      </div>
    </div>
  );
}

export default function FeatureBar() {
  return (
    <section className="border-b border-ink/10 overflow-hidden">
      <div className="marquee-track flex w-max py-10">
        {/* Render the list twice back-to-back so the loop is seamless */}
        <div className="flex">
          {FEATURES.map((f, i) => (
            <FeatureItem key={`a-${i}`} f={f} />
          ))}
        </div>
        <div className="flex" aria-hidden="true">
          {FEATURES.map((f, i) => (
            <FeatureItem key={`b-${i}`} f={f} />
          ))}
        </div>
      </div>
    </section>
  );
}