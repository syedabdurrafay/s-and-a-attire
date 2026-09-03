import { Archivo_Black, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
  // Add fallback to prevent build failures
  fallback: ['Impact', 'Arial Black', 'sans-serif'],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  // Add fallback to prevent build failures
  fallback: ['system-ui', 'Arial', 'sans-serif'],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
  // Add fallback to prevent build failures
  fallback: ['Courier New', 'monospace'],
});

export const metadata = {
  title: "S & A Attire — Karachi",
  description:
    "S & A Attire is a Karachi-based clothing label for men, women and kids. Everyday fits, cut for the city.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${archivoBlack.variable} ${inter.variable} ${spaceMono.variable}`}>
      <body className="font-body bg-paper text-ink antialiased">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}