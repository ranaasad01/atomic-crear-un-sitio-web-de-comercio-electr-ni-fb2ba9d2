import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AtomicLangToggle from "@/components/AtomicLangToggle"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumière — Moda & Estilo Premium",
  description:
    "Descubre nuestra colección exclusiva de moda y accesorios premium. Calidad excepcional, diseño atemporal.",
  keywords: ["moda", "ropa", "accesorios", "premium", "estilo", "tienda online"],
  openGraph: {
    title: "Lumière — Moda & Estilo Premium",
    description: "Descubre nuestra colección exclusiva de moda y accesorios premium.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#fafaf8] text-[#1a1a2e] antialiased font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
            <AtomicLangToggle />
    </body>
    </html>
  );
}