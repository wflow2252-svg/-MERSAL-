"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useCart } from "@/lib/CartContext";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { name: "الإلكترونيات", icon: "smartphone", id: "electronics" },
  { name: "الأزياء", icon: "checkroom", id: "fashion" },
  { name: "المنزل", icon: "kitchen", id: "home" },
  { name: "الجمال", icon: "face", id: "beauty" },
];

export default function Navbar() {
  const { data: session } = useSession();
  const { cartCount } = useCart();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full fixed top-0 left-0 z-[100]">
      {/* 1. Top Bar */}
      <div className="bg-[#011216] text-white/50 py-2 hidden md:block">
        <div className="responsive-container flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
           <span>شحن مجاني للطلبات فوق 50,000 ج.س</span>
           <div className="flex gap-6">
              <Link href="/vendor/register" className="text-[#F29124]">بيع في مرسال</Link>
              <span>العربية (SD)</span>
           </div>
        </div>
      </div>

      {/* 2. Main Header */}
      <div className={cn(
        "bg-white border-b transition-all duration-300",
        isScrolled ? "py-3 shadow-lg" : "py-5 md:py-7"
      )}>
        <div className="responsive-container flex items-center justify-between gap-4 md:gap-12">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-4 flex-shrink-0">
             <div className="w-10 h-10 md:w-14 md:h-14 relative bg-white rounded-xl shadow-md border border-black/5 p-1.5 overflow-hidden">
                <Image src="/logo.jpg" alt="Logo" fill className="object-contain" priority />
             </div>
             <div className="hidden sm:block">
                <h1 className="text-xl md:text-2xl font-black text-[#011216] tracking-tighter leading-none">MERSAL</h1>
                <p className="text-[9px] text-[#1089A4] font-black uppercase tracking-widest mt-0.5">Luxury Shop</p>
             </div>
          </Link>

          {/* Search Section */}
          <div className="flex-grow max-w-[700px] relative hidden lg:block">
             <div className="flex items-center bg-muted rounded-2xl p-1 shadow-inner focus-within:bg-white focus-within:ring-2 focus-within:ring-[#1089A4]/10 transition-all">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن أجهزة، أزياء، أو منتجات..." 
                  className="flex-grow bg-transparent px-6 py-3 text-sm font-bold text-[#011216] outline-none text-right"
                />
                <button className="bg-[#1089A4] text-white w-12 h-12 rounded-xl flex items-center justify-center hover:bg-[#011216] transition-all">
                   <span className="material-symbols-rounded">search</span>
                </button>
             </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 md:gap-8">
             <Link href={session ? "/profile" : "/login"} className="flex flex-col items-center gap-1 group">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-[#011216]/40 group-hover:bg-[#1089A4] group-hover:text-white transition-all overflow-hidden relative border border-transparent">
                  {session?.user?.image ? (
                    <Image src={session.user.image} alt="User" fill className="object-cover" />
                  ) : <span className="material-symbols-rounded text-2xl">person</span>}
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-[#011216]/30 hidden md:block">حسابي</span>
             </Link>

             <Link href="/cart" className="relative flex flex-col items-center gap-1 group">
                <div className="w-10 h-10 rounded-xl bg-[#011216] flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-all">
                   <span className="material-symbols-rounded text-2xl">shopping_basket</span>
                   {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[#F29124] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">{cartCount}</span>}
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-[#011216]/30 hidden md:block">السلة</span>
             </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
