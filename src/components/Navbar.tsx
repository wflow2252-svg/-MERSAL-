"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useCart } from "@/lib/CartContext";
import { useRouter } from "next/navigation";

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

  const handleSearch = () => {
    if (searchQuery.trim()) router.push(`/shop?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <header className="w-full fixed top-0 left-0 z-[100]">
      {/* 1. Motta Petrol Top Utility */}
      <div className="bg-[#0B5364] text-white/60 py-2.5 hidden md:block border-b border-white/5">
        <div className="responsive-container flex justify-between items-center text-[11px] font-black uppercase tracking-[0.2em]">
           <div className="flex gap-10">
              <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                 <span className="material-symbols-rounded text-[14px] text-accent">local_shipping</span> شحن مجاني للطلبات فوق 50 ألف ج.س
              </span>
           </div>
           <div className="flex gap-8 items-center">
              <Link href="/vendor/register" className="text-secondary hover:brightness-110">بيع معنا في مرسال</Link>
              <div className="w-px h-3 bg-white/10" />
              <button className="hover:text-white transition-colors">السودان (SD)</button>
           </div>
        </div>
      </div>

      {/* 2. Main High-End Header */}
      <div className={cn(
        "bg-white transition-all duration-500",
        isScrolled ? "py-3 shadow-2xl shadow-primary/5" : "py-5 md:py-8"
      )}>
        <div className="responsive-container flex items-center gap-8 md:gap-16">
          
          {/* Brand Identity */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-4 group">
            <div className="relative w-10 h-10 md:w-16 md:h-16 rounded-[1.25rem] md:rounded-[1.5rem] overflow-hidden bg-white shadow-xl shadow-primary/5 border border-border group-hover:scale-105 transition-transform p-1.5 md:p-2.5">
               <Image src="/logo.jpg" alt="Logo" fill className="object-contain" priority />
            </div>
            <div className="hidden sm:flex flex-col">
               <span className="text-xl md:text-3xl font-black text-[#0B5364] tracking-tighter leading-none font-heading uppercase">Mersal</span>
               <span className="text-[10px] text-accent font-black uppercase tracking-[0.4em] mt-1.5">Elite Market</span>
            </div>
          </Link>

          {/* Motta Centered Search Pattern */}
          <div className="flex-grow max-w-[800px] relative hidden md:block">
             <div className="flex items-center bg-muted rounded-[1.5rem] md:rounded-[2rem] p-1.5 ring-2 ring-transparent focus-within:ring-accent/10 focus-within:bg-white transition-all shadow-inner">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="ابحث عن أجهزة، أزياء، أو علامات تجارية..." 
                  className="flex-grow px-8 bg-transparent outline-none text-sm font-bold text-primary placeholder:text-primary/20 text-right pr-6"
                />
                <button 
                  onClick={handleSearch}
                  className="bg-[#0B5364] text-white w-12 h-12 md:w-14 md:h-14 rounded-2xl md:rounded-3xl flex items-center justify-center hover:bg-accent hover:shadow-xl transition-all"
                >
                   <span className="material-symbols-rounded text-2xl group-hover:scale-110 transition-transform">search</span>
                </button>
             </div>
          </div>

          {/* Action Hub */}
          <div className="flex items-center gap-4 md:gap-8 flex-shrink-0">
             <Link href={session ? "/profile" : "/login"} className="hidden md:flex flex-col items-center gap-1 group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-muted flex items-center justify-center text-primary/40 group-hover:bg-[#0B5364] group-hover:text-white transition-all overflow-hidden border border-transparent shadow-sm">
                  {session?.user?.image ? (
                    <Image src={session.user.image} alt="User" fill className="object-cover" />
                  ) : <span className="material-symbols-rounded text-2xl">person</span>}
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-primary/30 group-hover:text-primary transition-colors">حسابي</span>
             </Link>

             <Link href="/cart" className="relative group flex flex-col items-center gap-1">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-[#0B5364] flex items-center justify-center text-white shadow-2xl shadow-primary/30 group-hover:scale-105 transition-all relative">
                   <span className="material-symbols-rounded text-2xl">shopping_basket</span>
                   <span className="absolute -top-2 -right-2 bg-[#F29124] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">{cartCount}</span>
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-primary/30 group-hover:text-secondary transition-colors hidden md:block">سلة التسوق</span>
             </Link>
          </div>
        </div>
      </div>

      {/* 3. Sub-Header (Categories) */}
      <div className="bg-white border-b border-border hidden md:block">
         <div className="responsive-container flex justify-center gap-12 py-3.5">
            {categories.map((cat) => (
               <Link key={cat.id} href={`/category/${cat.id}`} className="flex items-center gap-3 text-xs font-black text-primary/60 hover:text-accent transition-colors uppercase tracking-widest group">
                  <span className="material-symbols-rounded text-lg text-primary/20 group-hover:text-accent">{cat.icon}</span>
                  {cat.name}
               </Link>
            ))}
         </div>
      </div>
    </header>
  );
}
