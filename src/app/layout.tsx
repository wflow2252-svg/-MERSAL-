import "./globals.css";
import { Suspense } from "react";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.jpg",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
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
          
          <div className="flex flex-col min-h-screen">
             <div className="pt-32">
                <Breadcrumbs />
             </div>
             
             <main className="flex-grow">
                {children}
             </main>

             <div className="mt-32">
                <Footer />
             </div>
          </div>
          
          {/* Scroll to top button - Hidden by default, script will handle visibility if needed */}
          <button 
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
             className="fixed bottom-10 left-10 w-14 h-14 rounded-2xl bg-primary text-white shadow-2xl shadow-primary/40 border border-white/20 z-[90] flex items-center justify-center hover:scale-110 active:scale-95 transition-all opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto group"
          >
             <span className="material-symbols-rounded text-2xl group-hover:-translate-y-1 transition-transform">keyboard_double_arrow_up</span>
          </button>
        </Providers>
      </body>
    </html>
  );
}

