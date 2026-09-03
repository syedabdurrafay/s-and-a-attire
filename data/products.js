// Static catalog for S & A Attire.
// All product photography is local, served from /public/images.
// No external image services or placeholders are used.

// Updated categories - Men's wear only
export const categories = [
  "Check Shirts",
  "Shirts",
  "Polo Shirts",
  "T-Shirts",
  "Hoodies",
  "Jeans",
  "Dress Pants",
];

// Must match the CATEGORIES array in ProductGrid.jsx exactly.
export const productTypes = [
  "Check Shirts",
  "Shirts",
  "Polo Shirts",
  "T-Shirts",
  "Hoodies",
  "Jeans",
  "Dress Pants",
];

export const products = [
  // Check Shirts
  {
    slug: "check-shirt-classic",
    name: "Check Shirt — Classic",
    category: "Check Shirts",
    type: "Check Shirts",
    price: 3900,
    image: "/images/shirt2.jpg",
    blurb: "Everyday checked shirt in a classic weave, tailored for a clean, regular fit.",
    details: ["100% cotton yarn-dyed check", "Regular fit", "Button-down collar", "Machine wash cold"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    sold: true,
  },
  {
    slug: "check-shirt-slim",
    name: "Check Shirt — Slim",
    category: "Check Shirts",
    type: "Check Shirts",
    price: 3900,
    image: "/images/shirt3.jpg",
    blurb: "Same signature check, cut closer to the body for a slimmer silhouette.",
    details: ["100% cotton yarn-dyed check", "Slim fit", "Button-down collar", "Machine wash cold"],
    sizes: ["S", "M", "L", "XL"],
    sold: true,
  },
  {
    slug: "check-flannel",
    name: "Check Flannel",
    category: "Check Shirts",
    type: "Check Shirts",
    price: 4450,
    image: "/images/shirt4.jpeg",
    blurb: "Brushed flannel check, soft-handed and warm for Karachi's cooler nights.",
    details: ["Brushed cotton flannel", "Regular fit", "Single chest pocket", "Machine wash cold, tumble dry low"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    sold: true,
  },
  {
    slug: "micro-check",
    name: "Micro-Check Shirt",
    category: "Check Shirts",
    type: "Check Shirts",
    price: 4100,
    image: "/images/shirt5.jpg",
    blurb: "Fine micro-check pattern for a subtler, boardroom-ready take on the checked shirt.",
    details: ["Cotton poplin, micro-check weave", "Regular fit", "Spread collar", "Machine wash cold"],
    sizes: ["S", "M", "L", "XL"],
    sold: true,
  },
  {
    slug: "weekend-check",
    name: "Weekend Check Shirt",
    category: "Check Shirts",
    type: "Check Shirts",
    price: 4100,
    image: "/images/shirt6.jpeg",
    blurb: "A relaxed, oversized check shirt built for easy weekend wear.",
    details: ["Cotton flannel check", "Oversized fit", "Dropped shoulder seam", "Machine wash cold"],
    sizes: ["S", "M", "L", "XL"],
    sold: true,
  },

  // Shirts
  {
    slug: "classic-white-shirt",
    name: "Classic White Shirt",
    category: "Shirts",
    type: "Shirts",
    price: 3500,
    image: "/images/shirt1.jpg",
    blurb: "Everyday essential white shirt with a sharp, tailored fit.",
    details: ["100% cotton", "Regular fit", "Spread collar", "Machine wash cold"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    sold: false,
  },
  {
    slug: "oxford-blue-shirt",
    name: "Oxford Blue Shirt",
    category: "Shirts",
    type: "Shirts",
    price: 3800,
    image: "/images/shirt7.jpg",
    blurb: "Classic Oxford weave in a versatile blue shade.",
    details: ["100% cotton Oxford", "Regular fit", "Button-down collar", "Machine wash cold"],
    sizes: ["S", "M", "L", "XL"],
    sold: false,
  },
  {
    slug: "linen-blend-shirt",
    name: "Linen Blend Shirt",
    category: "Shirts",
    type: "Shirts",
    price: 4200,
    image: "/images/shirt8.jpg",
    blurb: "Lightweight linen blend for Karachi's warmer days.",
    details: ["55% linen, 45% cotton", "Relaxed fit", "Spread collar", "Machine wash cold"],
    sizes: ["S", "M", "L", "XL"],
    sold: false,
  },

  // Polo Shirts
  {
    slug: "classic-polo-navy",
    name: "Classic Polo — Navy",
    category: "Polo Shirts",
    type: "Polo Shirts",
    price: 3200,
    image: "/images/polo1.jpg",
    blurb: "Smart-casual polo with all-day comfort and a classic fit.",
    details: ["100% cotton pique", "Regular fit", "Ribbed collar", "Machine wash cold"],
    sizes: ["S", "M", "L", "XL"],
    sold: false,
  },
  {
    slug: "polo-white",
    name: "Polo Shirt — White",
    category: "Polo Shirts",
    type: "Polo Shirts",
    price: 3200,
    image: "/images/polo2.jpg",
    blurb: "Clean white polo, perfect for layering or wearing solo.",
    details: ["100% cotton pique", "Regular fit", "Ribbed collar", "Machine wash cold"],
    sizes: ["S", "M", "L", "XL"],
    sold: false,
  },
  {
    slug: "polo-maroon",
    name: "Polo Shirt — Maroon",
    category: "Polo Shirts",
    type: "Polo Shirts",
    price: 3400,
    image: "/images/polo3.jpg",
    blurb: "Rich maroon polo for a pop of color in your wardrobe.",
    details: ["100% cotton pique", "Regular fit", "Ribbed collar", "Machine wash cold"],
    sizes: ["S", "M", "L", "XL"],
    sold: false,
  },

  // T-Shirts
  {
    slug: "essential-tshirt-black",
    name: "Essential T-Shirt — Black",
    category: "T-Shirts",
    type: "T-Shirts",
    price: 2500,
    image: "/images/tshirt1.jpg",
    blurb: "Essential black tee built to move and last.",
    details: ["100% cotton jersey", "Regular fit", "Crew neck", "Machine wash cold"],
    sizes: ["S", "M", "L", "XL"],
    sold: false,
  },
  {
    slug: "essential-tshirt-white",
    name: "Essential T-Shirt — White",
    category: "T-Shirts",
    type: "T-Shirts",
    price: 2500,
    image: "/images/tshirt2.jpg",
    blurb: "Crisp white tee, your go-to everyday layer.",
    details: ["100% cotton jersey", "Regular fit", "Crew neck", "Machine wash cold"],
    sizes: ["S", "M", "L", "XL"],
    sold: false,
  },
  {
    slug: "essential-tshirt-grey",
    name: "Essential T-Shirt — Grey",
    category: "T-Shirts",
    type: "T-Shirts",
    price: 2500,
    image: "/images/tshirt3.jpg",
    blurb: "Versatile grey tee for any occasion.",
    details: ["100% cotton jersey", "Regular fit", "Crew neck", "Machine wash cold"],
    sizes: ["S", "M", "L", "XL"],
    sold: false,
  },

  // Hoodies
  {
    slug: "classic-hoodie-black",
    name: "Classic Hoodie — Black",
    category: "Hoodies",
    type: "Hoodies",
    price: 5500,
    image: "/images/hoodie1.jpg",
    blurb: "Cozy black hoodie for the city cold.",
    details: ["80% cotton, 20% polyester", "Regular fit", "Kangaroo pocket", "Machine wash cold"],
    sizes: ["S", "M", "L", "XL"],
    sold: false,
  },
  {
    slug: "classic-hoodie-grey",
    name: "Classic Hoodie — Grey",
    category: "Hoodies",
    type: "Hoodies",
    price: 5500,
    image: "/images/hoodie2.jpg",
    blurb: "Soft grey hoodie for everyday comfort.",
    details: ["80% cotton, 20% polyester", "Regular fit", "Kangaroo pocket", "Machine wash cold"],
    sizes: ["S", "M", "L", "XL"],
    sold: false,
  },
  {
    slug: "zip-hoodie-navy",
    name: "Zip Hoodie — Navy",
    category: "Hoodies",
    type: "Hoodies",
    price: 5800,
    image: "/images/hoodie3.jpg",
    blurb: "Full-zip hoodie in deep navy.",
    details: ["80% cotton, 20% polyester", "Regular fit", "Full zip closure", "Machine wash cold"],
    sizes: ["S", "M", "L", "XL"],
    sold: false,
  },

  // Jeans
  {
    slug: "slim-fit-jeans-blue",
    name: "Slim Fit Jeans — Blue",
    category: "Jeans",
    type: "Jeans",
    price: 4500,
    image: "/images/jeans1.jpg",
    blurb: "Durable blue denim with a modern slim fit.",
    details: ["100% cotton denim", "Slim fit", "Classic 5-pocket", "Machine wash cold"],
    sizes: ["30", "32", "34", "36", "38"],
    sold: false,
  },
  {
    slug: "skinny-jeans-black",
    name: "Skinny Fit Jeans — Black",
    category: "Jeans",
    type: "Jeans",
    price: 4700,
    image: "/images/jeans2.jpg",
    blurb: "Black skinny jeans for a sleeker silhouette.",
    details: ["98% cotton, 2% elastane", "Skinny fit", "Classic 5-pocket", "Machine wash cold"],
    sizes: ["30", "32", "34", "36"],
    sold: false,
  },
  {
    slug: "regular-jeans-grey",
    name: "Regular Fit Jeans — Grey",
    category: "Jeans",
    type: "Jeans",
    price: 4300,
    image: "/images/jeans3.jpg",
    blurb: "Comfortable grey jeans with a classic regular fit.",
    details: ["100% cotton denim", "Regular fit", "Classic 5-pocket", "Machine wash cold"],
    sizes: ["30", "32", "34", "36", "38"],
    sold: false,
  },

  // Dress Pants
  {
    slug: "tailored-pants-black",
    name: "Tailored Dress Pants — Black",
    category: "Dress Pants",
    type: "Dress Pants",
    price: 4800,
    image: "/images/pants1.jpg",
    blurb: "Sharp black dress pants for formal occasions.",
    details: ["70% polyester, 30% viscose", "Regular fit", "Flat front", "Dry clean only"],
    sizes: ["30", "32", "34", "36", "38"],
    sold: false,
  },
  {
    slug: "tailored-pants-navy",
    name: "Tailored Dress Pants — Navy",
    category: "Dress Pants",
    type: "Dress Pants",
    price: 4800,
    image: "/images/pants2.jpg",
    blurb: "Navy dress pants for a polished look.",
    details: ["70% polyester, 30% viscose", "Regular fit", "Flat front", "Dry clean only"],
    sizes: ["30", "32", "34", "36"],
    sold: false,
  },
  {
    slug: "tailored-pants-charcoal",
    name: "Tailored Dress Pants — Charcoal",
    category: "Dress Pants",
    type: "Dress Pants",
    price: 5000,
    image: "/images/pants3.jpg",
    blurb: "Charcoal dress pants for versatile styling.",
    details: ["70% polyester, 30% viscose", "Slim fit", "Flat front", "Dry clean only"],
    sizes: ["30", "32", "34", "36"],
    sold: false,
  },
];

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category) {
  if (!category || category === "All") return products;
  return products.filter((p) => p.category === category);
}

export function getProductsByType(type) {
  if (!type || type === "All") return products;
  return products.filter((p) => p.type === type);
}

export function formatPKR(amount) {
  return `Rs. ${amount.toLocaleString("en-PK")}`;
}

// Every product now has a real local image, so this just returns it directly.
export function getProductImage(product) {
  return product.image;
}