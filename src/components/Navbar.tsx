"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useCart } from "@/lib/CartContext";

const categories = [
  { name: "الإلكترونيات والموبايل", icon: "smartphone", id: "electronics" },
  { name: "الأزياء والملابس", icon: "checkroom", id: "fashion" },
  { name: "المنزل والمطبخ", icon: "kitchen", id: "home" },
  { name: "الجمال والعناية", icon: "face", id: "beauty" },
  { name: "أحدث العروض", icon: "bolt", id: "offers" }
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCatOpen, setIsCatOpen] = useState(false);

  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full fixed top-0 left-0 z-[100] font-sans flex justify-center mt-6 transition-all duration-700 pointer-events-none">
      
      {/* Floating Island Navigation */}
      <div className={cn(
        "bg-white/95 backdrop-blur-3xl transition-all duration-700 overflow-visible pointer-events-auto",
        isScrolled 
           ? "w-[95%] md:w-[85%] rounded-[3rem] py-3 shadow-[0_40px_80px_rgba(3,141,177,0.15)] border border-primary/10 mt-2" 
           : "w-[98%] md:w-[95%] rounded-[3rem] py-4 shadow-2xl border border-transparent"
      )}>
        <div className="px-6 md:px-12 flex items-center justify-between gap-6 md:gap-16">
          
          {/* Logo & Branding */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative w-12 h-12 md:w-[60px] md:h-[60px] rounded-[1.5rem] overflow-hidden bg-white shadow-xl shadow-primary/10 border border-primary/5 p-2 group-hover:rotate-[10deg] group-hover:scale-110 transition-transform duration-500">
               <Image src="/logo.jpg" alt="Logo" fill className="object-contain" priority />
            </div>
            <div className="hidden sm:flex flex-col">
               <span className="text-xl md:text-2xl font-black text-primary tracking-tighter leading-none font-heading uppercase group-hover:text-secondary transition-colors">Mersal</span>
               <span className="text-[9px] text-secondary font-black uppercase tracking-[0.4em] mt-1">Sovereign App</span>
            </div>
          </Link>

          {/* Central Interactive Search Bar (Neo-Luxury Style) */}
          <div className="flex-grow max-w-[600px] relative hidden lg:block group/search">
             <div className="flex items-center bg-muted/60 rounded-[2.5rem] p-1.5 border border-primary/5 group-focus-within/search:bg-white group-focus-within/search:shadow-[0_20px_50px_rgba(3,141,177,0.1)] group-focus-within/search:border-primary/20 transition-all duration-500 relative z-50">
                
                {/* Category Dropdown Pill */}
                <div 
                   className="relative flex-none"
                   onMouseEnter={() => setIsCatOpen(true)}
                   onMouseLeave={() => setIsCatOpen(false)}
                >
                   <button className="flex items-center gap-2 bg-white text-primary px-6 py-4 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.1em] hover:bg-primary hover:text-white transition-all shadow-sm">
                      <span className="material-symbols-rounded text-lg">apps</span> <span className="hidden xl:block">التصنيفات</span>
                   </button>
                   
                   {/* Dazzling Dropdown Menu */}
                   <div className={cn(
                     "absolute top-[120%] right-0 w-[320px] bg-white/95 backdrop-blur-3xl shadow-[0_50px_100px_rgba(3,141,177,0.2)] border border-primary/10 py-6 rounded-[2.5rem] transition-all duration-500 origin-top",
                     isCatOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
                   )}>
                      {categories.map((cat) => (
                        <Link key={cat.id} href={`/category/${cat.id}`} className="flex items-center justify-between px-8 py-4 hover:bg-muted/80 text-primary/70 hover:text-primary transition-all group/item mx-4 rounded-2xl">
                           <div className="flex items-center gap-4">
                              <span className="material-symbols-rounded text-[22px] text-secondary/30 group-hover/item:text-secondary group-hover/item:scale-125 transition-transform">{cat.icon}</span>
                              <span className="text-sm font-black tracking-tight group-hover/item:translate-x-[-5px] transition-transform">{cat.name}</span>
                           </div>
                           <span className="material-symbols-rounded text-sm opacity-20">chevron_left</span>
                        </Link>
                      ))}
                   </div>
                </div>

                <input 
                  type="text" 
                  placeholder="ابحث عن المنتجات الفاخرة..." 
                  className="flex-grow px-8 bg-transparent outline-none text-[13px] font-bold text-primary placeholder:text-primary/40 text-right"
                />
                <button className="bg-primary text-white w-12 h-12 md:w-[52px] md:h-[52px] rounded-full flex items-center justify-center hover:bg-secondary hover:scale-110 hover:shadow-xl transition-all mr-2 flex-none">
                   <span className="material-symbols-rounded text-[22px]">search</span>
                </button>
             </div>
          </div>

          {/* User & Actions Hub */}
          <div className="flex items-center gap-4 md:gap-8 flex-none">
             {isAuthenticated ? (
               <Link href="/profile" className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-muted text-primary/40 hover:bg-primary hover:text-white transition-all overflow-hidden border-2 border-transparent hover:border-secondary shadow-sm relative group overflow-visible">
                 {session?.user?.image ? (
                   <Image src={session.user.image} alt="Profile" width={56} height={56} className="object-cover" />
                 ) : <span className="material-symbols-rounded text-2xl group-hover:scale-110 transition-transform">person_check</span>}
                 {/* Floating Label */}
                 <div className="absolute -bottom-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all bg-primary text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-full pointer-events-none shadow-lg">حسابي</div>
               </Link>
             ) : (
               <Link href="/login" className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-muted text-primary/50 hover:bg-primary hover:text-white transition-all border border-primary/5 hover:border-transparent shadow-sm relative group overflow-visible">
                  <span className="material-symbols-rounded text-2xl group-hover:scale-110 transition-transform">login</span>
                  <div className="absolute -bottom-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all bg-primary text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-full pointer-events-none shadow-lg">دخول</div>
               </Link>
             )}

             <div className="w-px h-8 bg-primary/10 hidden sm:block" />

             <Link href="/cart" className="relative group flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-gradient-to-br from-primary to-accent text-white shadow-xl shadow-primary/30 hover:scale-110 transition-all border border-white/20">
                <span className="material-symbols-rounded text-[28px] group-hover:-rotate-[-10deg] transition-transform">shopping_bag</span>
                <span className="absolute -top-3 -right-3 bg-secondary text-white text-[11px] font-black w-8 h-8 rounded-full flex items-center justify-center border-[3px] border-white shadow-2xl font-inter group-hover:animate-bounce">{cartCount}</span>
             </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
