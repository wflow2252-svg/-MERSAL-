"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useCart } from "@/lib/CartContext";
import { useRouter, useSearchParams } from "next/navigation";

const categories = [
  { name: "الإلكترونيات", icon: "smartphone", id: "electronics" },
  { name: "الأزياء", icon: "checkroom", id: "fashion" },
  { name: "المنزل", icon: "kitchen", id: "home" },
  { name: "الجمال", icon: "face", id: "beauty" },
  { name: "الأطفال", icon: "toys", id: "toys" },
];

export default function Navbar() {
  const { data: session } = useSession();
  const { cartCount } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) router.push(`/shop?q=${encodeURIComponent(searchQuery)}`);
    else router.push('/shop');
  };

  return (
    <header className="w-full fixed top-0 left-0 z-[100]">
      {/* 1. Motta Top Utility Bar */}
      <div className="bg-[#011216] text-white/40 py-2.5 hidden md:block">
        <div className="responsive-container flex justify-between items-center text-[11px] font-bold">
           <div className="flex gap-8">
              <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                 <span className="material-symbols-rounded text-[14px] text-[#1089A4]">local_shipping</span> شحن مجاني للطلبات فوق 50,000 ج.س
              </span>
           </div>
           <div className="flex gap-8 items-center">
              <Link href="/vendor/register" className="text-[#F29124] hover:brightness-110">بيع في مرسال</Link>
              <div className="w-px h-3 bg-white/10" />
              <button className="hover:text-white">العربية (SD)</button>
           </div>
        </div>
      </div>

      {/* 2. Main High-End Header */}
      <div className={cn(
        "bg-white border-b transition-all duration-500",
        isScrolled ? "py-3 shadow-md border-transparent" : "py-5 md:py-8 border-border"
      )}>
        <div className="responsive-container flex items-center gap-6 md:gap-12">
          
          {/* Brand Logo - Premium Scaling */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-3 group">
            <div className="relative w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl overflow-hidden bg-white shadow-sm ring-1 ring-black/5 group-hover:scale-105 transition-transform p-1.5 md:p-2">
               <Image src="/logo.jpg" alt="Logo" fill className="object-contain" priority />
            </div>
            {!isScrolled && (
              <div className="hidden lg:flex flex-col">
                <span className="text-xl md:text-2xl font-extrabold text-[#011216] tracking-tight font-heading leading-none">Mersal</span>
                <span className="text-[10px] text-[#1089A4] font-bold uppercase tracking-widest mt-1">Elite Market</span>
              </div>
            )}
          </Link>

          {/* Integrated Categories Dropdown (Motta Style) */}
          <div className="hidden xl:block relative group">
             <button className="btn-motta-ghost px-6 py-3.5">
                <span className="material-symbols-rounded">menu</span>
                الأقسـام
             </button>
             {/* Mega Menu Placeholder Style */}
             <div className="absolute top-full right-0 mt-2 w-[240px] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 bg-white shadow-lg rounded-3xl border border-border p-3 flex flex-col gap-1">
                {categories.map((cat) => (
                  <Link key={cat.id} href={`/category/${cat.id}`} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-muted text-sm font-bold text-[#011216]/60 hover:text-[#1089A4] transition-all">
                    <span className="material-symbols-rounded text-xl opacity-40">{cat.icon}</span>
                    {cat.name}
                  </Link>
                ))}
             </div>
          </div>

          {/* Central Search Bar - The Modern Focus */}
          <div className="flex-grow max-w-[800px] relative hidden md:block">
             <div className="flex items-center bg-muted rounded-2xl p-1.5 ring-1 ring-transparent focus-within:ring-[#1089A4]/20 focus-within:bg-white transition-all shadow-sm">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="ابحث عن أجهزة، ماركات أزياء، أو منتجات..." 
                  className="flex-grow px-6 bg-transparent outline-none text-sm font-bold text-[#011216] placeholder:text-[#1089A4]/20 text-right"
                />
                <button 
                  onClick={handleSearch}
                  className="btn-motta-primary px-8 py-3 rounded-xl"
                >
                  <span className="material-symbols-rounded text-xl group-hover:scale-110 transition-transform">search</span>
                </button>
             </div>
          </div>

          {/* Actions - Profile & Cart */}
          <div className="flex items-center gap-4 md:gap-8 flex-shrink-0">
             <Link href={session ? "/profile" : "/login"} className="hidden md:flex flex-col items-center gap-1 group transition-all">
                <div className="w-10 h-10 rounded-2xl bg-muted flex items-center justify-center text-[#011216]/40 group-hover:bg-[#1089A4] group-hover:text-white transition-all overflow-hidden border border-transparent group-hover:border-white shadow-sm relative">
                  {session?.user?.image ? (
                    <Image src={session.user.image} alt="User" fill className="object-cover" />
                  ) : (
                    <span className="material-symbols-rounded text-2xl">person</span>
                  )}
                </div>
                <span className="text-[10px] font-bold text-[#011216]/40 group-hover:text-[#1089A4] transition-colors">{session ? "حسابي" : "دخول"}</span>
             </Link>

             <Link href="/cart" className="relative group flex flex-col items-center gap-1 transition-all">
                <div className="w-10 h-10 rounded-2xl bg-[#011216] flex items-center justify-center text-white shadow-xl shadow-[#011216]/20 group-hover:scale-105 transition-all relative">
                   <span className="material-symbols-rounded text-2xl">shopping_basket</span>
                   <span className="absolute -top-2 -right-2 bg-[#F29124] text-[#011216] text-[10px] font-extrabold w-5 h-5 rounded-lg flex items-center justify-center border-2 border-white shadow-sm">{cartCount}</span>
                </div>
                <span className="text-[10px] font-bold text-[#011216]/40 group-hover:text-[#F29124] transition-colors hidden md:block">السلة</span>
             </Link>

             <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-[#011216]/60"
             >
                <span className="material-symbols-rounded text-3xl">segment</span>
             </button>
          </div>
        </div>
      </div>

      {/* 3. Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm lg:hidden overflow-hidden">
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="absolute inset-y-0 right-0 w-[85%] max-w-[400px] bg-white shadow-2xl p-10 flex flex-col">
               <div className="flex items-center justify-between mb-12">
                  <span className="text-2xl font-extrabold text-[#1089A4] tracking-tighter font-heading">MERSAL</span>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center"><span className="material-symbols-rounded">close</span></button>
               </div>
               <nav className="flex flex-col gap-4">
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="p-5 bg-muted/40 rounded-3xl font-bold flex items-center gap-6 hover:bg-[#1089A4]/5 transition-all text-[#011216]">
                    <span className="material-symbols-rounded opacity-40">home</span> الرئيسية
                  </Link>
                  <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="p-5 bg-muted/40 rounded-3xl font-bold flex items-center gap-6 hover:bg-[#1089A4]/5 transition-all text-[#011216]">
                    <span className="material-symbols-rounded opacity-40">shopping_bag</span> المتجر
                  </Link>
                  <Link href="/offers" onClick={() => setIsMobileMenuOpen(false)} className="p-5 bg-muted/40 rounded-3xl font-bold flex items-center gap-6 hover:bg-[#1089A4]/5 transition-all text-[#011216]">
                    <span className="material-symbols-rounded opacity-40">bolt</span> عروض حصرية
                  </Link>
               </nav>
               <div className="mt-auto pt-10 border-t flex flex-col gap-4">
                  <Link href="/vendor/register" className="p-5 bg-[#F29124] text-[#011216] rounded-3xl font-bold text-center">كن مورداً معنا</Link>
                  <div className="flex items-center gap-4 p-5 bg-muted rounded-3xl">
                     <div className="w-10 h-10 rounded-full bg-white shadow-sm overflow-hidden relative">
                        {session?.user?.image && <Image src={session.user.image} alt="User" fill />}
                     </div>
                     <span className="font-bold text-sm">{session?.user?.name || "زائر مرسال"}</span>
                  </div>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

