import "./globals.css";
import { Suspense } from "react";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Mersal Elite | Luxury Marketplace & Vendor Hub",
  description: "Experience the world-class marketplace for elite products, luxury vendors, and a seamless shopping journey in Sudan and beyond.",
  keywords: ["Mersal", "Elite", "Luxury Marketplace", "Sudan Shopping", "Premium Vendors", "Bento Design"],
  authors: [{ name: "Mersal Team" }],
  openGraph: {
    title: "Mersal Elite | The Gold Standard of Shopping",
    description: "Discover curated luxury products from top-tier vendors in an elite, high-fidelity digital marketplace.",
    url: "https://morsall.com",
    siteName: "Mersal Elite",
    locale: "ar_SA",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ── Maintenance Mode Check is handled via Navbar check ──


  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body>
        <Providers>
          <Suspense fallback={null}>
            <Navbar />
          </Suspense>
          <main className="pt-20">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
