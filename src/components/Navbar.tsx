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
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full fixed top-0 left-0 z-[100] font-sans">
      
      {/* 1. Motta TOPBAR (Utility) */}
      <div className="bg-primary text-white/50 py-3 hidden lg:block border-b border-white/5">
        <div className="responsive-container flex justify-between items-center text-[9px] font-black uppercase tracking-[0.25em]">
           <div className="flex gap-10 font-inter">
              <span className="flex items-center gap-2">
                 <span className="material-symbols-rounded text-secondary text-[14px]">verified</span> سوق مرسال النخبة المعتمد
              </span>
              <span className="flex items-center gap-2">
                 <span className="material-symbols-rounded text-secondary text-[14px]">local_shipping</span> شحن لكل ولايات السودان
              </span>
           </div>
           <div className="flex gap-8 items-center">
              <Link href="/vendor/register" className="text-secondary hover:text-white transition-colors">كن بائعاً معنا</Link>
              <Link href="/track-order" className="hover:text-white transition-colors">تتبع طلبك</Link>
           </div>
        </div>
      </div>

      {/* 2. Motta HEADER MAIN (Branding & Search) */}
      <div className={cn(
        "bg-white/95 backdrop-blur-3xl transition-all duration-500 border-b border-border/5",
        isScrolled ? "py-3 shadow-2xl" : "py-6 md:py-8"
      )}>
        <div className="responsive-container flex items-center justify-between gap-6 md:gap-16">
          
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-2xl overflow-hidden bg-white shadow-xl shadow-primary/5 border border-border/5 p-2">
               <Image src="/logo.jpg" alt="Logo" fill className="object-contain" priority />
            </div>
            <div className="hidden sm:flex flex-col">
               <span className="text-xl md:text-3xl font-black text-primary tracking-tighter leading-none font-heading uppercase">Mersal</span>
               <span className="text-[9px] text-accent font-black uppercase tracking-[0.5em] mt-1">Elite Marketplace</span>
            </div>
          </Link>

          <div className="flex-grow max-w-[800px] relative hidden lg:block">
             <div className="flex items-center bg-muted rounded-[2rem] p-1.5 border border-border/10 focus-within:bg-white focus-within:shadow-2xl focus-within:shadow-primary/5 transition-all">
                <input 
                  type="text" 
                  placeholder="ما الذي تبحث عنه اليوم؟" 
                  className="flex-grow px-8 bg-transparent outline-none text-xs font-bold text-primary placeholder:text-primary/20 text-right pr-6"
                />
                <button className="bg-primary text-white w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center hover:bg-black hover:shadow-xl transition-all">
                   <span className="material-symbols-rounded text-2xl">search</span>
                </button>
             </div>
          </div>

          <div className="flex items-center gap-3 md:gap-8">
             {isAuthenticated ? (
               <Link href="/profile" className="flex flex-col items-center gap-1 group">
                 <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-primary/40 group-hover:bg-primary group-hover:text-white transition-all overflow-hidden border-2 border-accent/20">
                   {session?.user?.image ? (
                     <Image src={session.user.image} alt="Profile" width={48} height={48} className="object-cover" />
                   ) : <span className="material-symbols-rounded text-2xl text-primary">person</span>}
                 </div>
                 <span className="text-[8px] font-black text-primary/40 uppercase tracking-widest hidden md:block">حسابي</span>
               </Link>
             ) : (
               <Link href="/login" className="flex flex-col items-center gap-1 group">
                  <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-primary/30 group-hover:bg-primary group-hover:text-white transition-all border border-border/10">
                    <span className="material-symbols-rounded text-2xl">person</span>
                  </div>
                  <span className="text-[8px] font-black text-primary/40 uppercase tracking-widest hidden md:block">دخول</span>
               </Link>
             )}

             <Link href="/cart" className="relative group flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20 group-hover:scale-105 transition-all">
                   <span className="material-symbols-rounded text-2xl">shopping_basket</span>
                   <span className="absolute -top-2 -right-2 bg-secondary text-white text-[9px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-lg font-inter">{cartCount}</span>
                </div>
             </Link>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-xl border-b border-border/5 hidden lg:block">
         <div className="responsive-container flex items-center">
            
            <div 
              className="relative"
              onMouseEnter={() => setIsCatOpen(true)}
              onMouseLeave={() => setIsCatOpen(false)}
            >
               <button className="flex items-center gap-4 px-12 py-5 bg-primary text-white font-black text-xs uppercase tracking-widest hover:bg-black transition-colors">
                  <span className="material-symbols-rounded text-lg">grid_view</span> تسوق عبر الفئات
               </button>
               
               {isCatOpen && (
                 <div className="absolute top-full right-0 w-[300px] bg-white shadow-2xl border border-border/5 py-4 elite-shadow animate-in fade-in slide-in-from-top-2">
                    {categories.map((cat) => (
                      <Link key={cat.id} href={`/category/${cat.id}`} className="flex items-center justify-between px-10 py-4 hover:bg-muted text-primary/60 hover:text-primary transition-all group">
                         <div className="flex items-center gap-4">
                            <span className="material-symbols-rounded text-lg text-primary/10 group-hover:text-accent">{cat.icon}</span>
                            <span className="text-sm font-bold">{cat.name}</span>
                         </div>
                         <span className="material-symbols-rounded text-sm opacity-20">chevron_left</span>
                      </Link>
                    ))}
                 </div>
               )}
            </div>

            <nav className="flex items-center gap-14 px-14 mr-4">
               {["متجر النخبة", "أحدث العروض", "الوصل حديثاً", "العتبات"].map((link, i) => (
                 <Link key={i} href="/shop" className="text-[10px] font-black text-primary/60 hover:text-primary transition-all uppercase tracking-[0.25em] relative py-5 group">
                    {link}
                    <span className="absolute bottom-0 inset-x-0 h-1 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-right" />
                 </Link>
               ))}
            </nav>

            <div className="mr-auto">
               <span className="text-[10px] font-black text-accent uppercase tracking-widest flex items-center gap-2">
                  <span className="material-symbols-rounded text-lg animate-pulse">bolt</span> عروض مرسال تبدأ الآن
               </span>
            </div>
         </div>
      </div>
    </header>
  );
}
