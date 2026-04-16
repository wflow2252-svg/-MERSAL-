"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useCart } from "@/lib/CartContext";
import { useRouter } from "next/navigation";

const categories = [
  { name: "الإلكترونيات والموبايل", icon: "smartphone", id: "electronics" },
  { name: "الأزياء والملابس", icon: "checkroom", id: "fashion" },
  { name: "المنزل والمطبخ", icon: "kitchen", id: "home" },
  { name: "الجمال والعناية", icon: "face", id: "beauty" },
  { name: "أحدث العروض", icon: "bolt", id: "offers" }
];

export default function Navbar() {
  const { data: session } = useSession();
  const { cartCount } = useCart();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCatOpen, setIsCatOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) router.push(`/shop?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <header className="w-full fixed top-0 left-0 z-[100] font-sans">
      
      {/* 1. Motta TOPBAR (Utility) */}
      <div className="bg-[#0B5364] text-white/70 py-2.5 hidden lg:block border-b border-white/5">
        <div className="responsive-container flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
           <div className="flex gap-8">
              <span className="flex items-center gap-2">
                 <span className="material-symbols-rounded text-[14px] text-secondary">verified</span> سوق مرسال النخبة المعتمد
              </span>
              <span className="flex items-center gap-2">
                 <span className="material-symbols-rounded text-[14px] text-secondary">local_shipping</span> شحن لكل ولايات السودان
              </span>
           </div>
           <div className="flex gap-6 items-center">
              <Link href="/vendor/register" className="text-secondary hover:text-white transition-colors">كن بائعاً معنا</Link>
              <div className="w-px h-3 bg-white/10" />
              <Link href="/track-order" className="hover:text-white transition-colors">تتبع طلبك</Link>
           </div>
        </div>
      </div>

      {/* 2. Motta HEADER MAIN (Branding & Search) */}
      <div className={cn(
        "bg-white transition-all duration-500",
        isScrolled ? "py-2 shadow-2xl shadow-primary/5" : "py-5 md:py-8"
      )}>
        <div className="responsive-container flex items-center gap-6 md:gap-12">
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-4 group">
            <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-2xl overflow-hidden bg-white shadow-xl shadow-primary/5 border border-border p-2">
               <Image src="/logo.jpg" alt="Logo" fill className="object-contain" priority />
            </div>
            <div className="hidden sm:flex flex-col">
               <span className="text-xl md:text-3xl font-black text-[#0B5364] tracking-tighter leading-none font-heading uppercase">Mersal</span>
               <span className="text-[9px] text-accent font-black uppercase tracking-[0.5em] mt-1">Elite Marketplace</span>
            </div>
          </Link>

          {/* Wide Search Bar */}
          <div className="flex-grow max-w-[900px] relative hidden md:block">
             <div className="flex items-center bg-[#F8F9FA] rounded-[2rem] p-1.5 border border-border focus-within:border-accent/30 focus-within:bg-white transition-all">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="ابحث عن الماركات، الأجهزة، أو المنتجات العصرية..." 
                  className="flex-grow px-8 bg-transparent outline-none text-sm font-bold text-primary placeholder:text-primary/20 text-right pr-6"
                />
                <button 
                  onClick={handleSearch}
                  className="bg-[#0B5364] text-white w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center hover:bg-accent hover:shadow-xl transition-all"
                >
                   <span className="material-symbols-rounded text-2xl">search</span>
                </button>
             </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 md:gap-6 flex-shrink-0">
             <Link href={session ? "/profile" : "/login"} className="hidden md:flex flex-col items-center gap-1 group">
                <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center text-primary/40 group-hover:bg-[#0B5364] group-hover:text-white transition-all border border-transparent">
                  {session?.user?.image ? (
                    <Image src={session.user.image} alt="User" width={32} height={32} className="rounded-lg object-cover" />
                  ) : <span className="material-symbols-rounded text-2xl">person</span>}
                </div>
             </Link>

             <Link href="/cart" className="relative group flex flex-col items-center gap-1">
                <div className="w-11 h-11 rounded-xl bg-[#0B5364] flex items-center justify-center text-white shadow-xl shadow-primary/20 group-hover:scale-105 transition-all">
                   <span className="material-symbols-rounded text-23xl">shopping_basket</span>
                   <span className="absolute -top-1.5 -right-1.5 bg-[#F29124] text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-lg">{cartCount}</span>
                </div>
             </Link>
          </div>
        </div>
      </div>

      {/* 3. Motta HEADER BOTTOM (Navigation) */}
      <div className="bg-white border-y border-border hidden md:block">
         <div className="responsive-container flex items-center">
            
            {/* Categories Button */}
            <div className="relative border-x border-border">
               <button 
                onMouseEnter={() => setIsCatOpen(true)}
                onMouseLeave={() => setIsCatOpen(false)}
                className="flex items-center gap-4 px-10 py-4 bg-[#0B5364] text-white font-black text-xs uppercase tracking-widest hover:bg-accent transition-colors"
               >
                  تسوق عبر الفئات <span className="material-symbols-rounded text-lg">grid_view</span>
               </button>
               
               {/* Dropdown Menu */}
               {isCatOpen && (
                 <div 
                   onMouseEnter={() => setIsCatOpen(true)}
                   onMouseLeave={() => setIsCatOpen(false)}
                   className="absolute top-full right-0 w-[280px] bg-white shadow-2xl border border-border py-4 animate-in fade-in slide-in-from-top-2"
                 >
                    {categories.map((cat) => (
                      <Link key={cat.id} href={`/category/${cat.id}`} className="flex items-center justify-between px-8 py-4 hover:bg-muted text-primary/60 hover:text-primary transition-all group">
                         <div className="flex items-center gap-4">
                            <span className="material-symbols-rounded text-lg text-primary/20 group-hover:text-accent">{cat.icon}</span>
                            <span className="text-sm font-bold">{cat.name}</span>
                         </div>
                         <span className="material-symbols-rounded text-sm opacity-20">chevron_left</span>
                      </Link>
                    ))}
                 </div>
               )}
            </div>

            {/* Main Nav Links */}
            <nav className="flex items-center gap-12 px-12">
               {["متجر النخبة", "أحدث العروض", "الوصل حديثاً", "تخفيضات مرسال"].map((link, i) => (
                 <Link key={i} href="/shop" className="text-xs font-black text-primary/70 hover:text-[#0B5364] transition-all uppercase tracking-widest border-b-2 border-transparent hover:border-accent py-4">
                    {link}
                 </Link>
               ))}
            </nav>

            <div className="mr-auto hidden xl:block">
               <span className="text-[10px] font-black text-accent uppercase tracking-widest flex items-center gap-2">
                  <span className="material-symbols-rounded text-lg">bolt</span> عروض تنتهي اليوم
               </span>
            </div>
         </div>
      </div>
    </header>
  );
}
