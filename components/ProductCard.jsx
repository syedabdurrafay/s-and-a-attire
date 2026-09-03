import Link from "next/link";
import Image from "next/image";
import { formatPKR, getProductImage } from "@/data/products";

export default function ProductCard({ product }) {
  const isSold = product.sold === true;
  const imageSrc = getProductImage(product);

  return (
    <Link
      href={`/product/${product.slug}`}
      className={`group block focus-ring ${isSold ? "pointer-events-none" : ""}`}
      aria-disabled={isSold}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-paperDim">
        <Image
          src={imageSrc}
          alt={`${product.name} — ${product.blurb}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        <span className="absolute top-3 left-3 bg-ink text-paper font-mono text-[10px] uppercase tracking-widest2 px-2 py-1">
          {product.category}
        </span>

        {isSold && (
          <span className="absolute top-3 right-3 bg-red-600 text-paper font-mono text-[10px] uppercase tracking-widest2 px-2 py-1">
            Sold
          </span>
        )}
      </div>

      <div className="mt-3 flex items-start justify-between gap-2">
        <h3 className="text-sm leading-snug">{product.name}</h3>
        <p className="font-mono text-sm shrink-0">{formatPKR(product.price)}</p>
      </div>
    </Link>
  );
}