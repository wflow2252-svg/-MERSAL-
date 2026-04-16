"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useCart } from "@/lib/CartContext";
import { useRouter, useSearchParams } from "next/navigation";

const sidebarCategories = [
  { 
    name: "الإلكترونيات والموبايل", 
    icon: "smartphone", 
    id: "electronics",
    subItems: ["الموبايلات", "أطقم الصوت", "الكاميرات", "أجهزة الكمبيوتر", "الألعاب والترفيه"],
    featured: { title: "تكنولوجيا المستقبل", desc: "خصم 20% على آبل", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=300" }
  },
  { 
    name: "الأزياء والملابس", 
    icon: "apparel", 
    id: "fashion",
    subItems: ["رجالي", "نسائي", "أطفال", "أحذية", "إكسسوارات"],
    featured: { title: "مجموعة الشتاء", desc: "أناقة بلا حدود", image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=300" }
  },
  { 
    name: "المنزل والمطبخ", 
    icon: "home", 
    id: "home",
    subItems: ["أثاث", "ديكور", "أدوات مطبخ", "إضاءة", "مستلزمات الحديقة"],
    featured: { title: "منزلك أجمل", desc: "تخفيضات تصل لـ 40%", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=300" }
  },
  {
    name: "الجمال والعناية",
    icon: "content_cut",
    id: "beauty",
    subItems: ["عطور", "مكياج", "عناية بالبشرة", "منتجات الشعر"],
    featured: { title: "جمالك الطبيعي", desc: "أرقى الماركات", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=300" }
  },
  {
    name: "ألعاب الأطفال",
    icon: "toys",
    id: "toys",
    subItems: ["ألعاب تعليمية", "دمى", "سيارات ريموت", "ألعاب خارجية"],
    featured: { title: "عالم السعادة", desc: "ألعاب آمنة ومبدعة", image: "https://images.unsplash.com/photo-1532330393533-443990a51d10?auto=format&fit=crop&q=80&w=300" }
  }
];

export default function Navbar() {
  const { data: session } = useSession();
  const { cartCount } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<any>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/shop');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="w-full z-[100] flex flex-col kill-scroll">
      {/* 1. Top Bar (Desktop Only) */}
      <div className="bg-[#021D24] text-white/50 py-3 border-b border-white/5 hidden md:flex justify-between items-center text-[10px] font-black uppercase">
        <div className="responsive-container flex justify-between items-center w-full">
          <div className="flex gap-10 items-center">
            <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group">
              <span className="material-symbols-rounded text-sm text-[#1089A4] group-hover:scale-110 transition-transform">call</span> 0900000000
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group">
              <span className="material-symbols-rounded text-sm text-[#F29124] group-hover:scale-110 transition-transform">location_on</span> الخرطوم، السودان
            </span>
          </div>
          <div className="flex gap-10 items-center">
            <Link href="/vendor/register" className="text-[#F29124] hover:brightness-125 transition-all animate-pulse">كن مورداً معنا</Link>
            <div className="w-px h-3 bg-white/10" />
            <div className="relative">
              <div 
                className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors"
                onClick={() => setIsLangOpen(!isLangOpen)}
              >
                <span>العربية</span>
                <span className={cn("material-symbols-rounded text-[14px] transition-transform", isLangOpen && "rotate-180")}>expand_more</span>
              </div>
              
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-4 bg-[#021D24] border border-white/10 rounded-2xl p-4 shadow-3xl z-[300] min-w-[150px] overflow-hidden"
                  >
                     {["العربية", "English"].map((lang) => (
                       <div key={lang} className="p-3 hover:bg-white/5 rounded-xl cursor-pointer text-[10px] font-black text-white/40 hover:text-white transition-all flex items-center justify-between">
                          {lang} {lang === "العربية" && <span className="material-symbols-rounded text-xs text-[#F29124]">check</span>}
                       </div>
                     ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation - Restored Premium Balance */}
      <div className={cn(
        "bg-white transition-all duration-700 w-full z-[100] kill-scroll",
        isScrolled ? "fixed top-0 left-0 right-0 py-3 md:py-4 shadow-lg glass border-b border-white/50" : "py-5 md:py-10"
      )}>
        <div className="responsive-container flex items-center justify-between gap-4 md:gap-16 relative">
          
          {/* Logo - Consolidated Responsive Branding */}
          <Link href="/" className="flex items-center gap-3 md:gap-6 flex-shrink-0 group">
            <div className="relative w-12 h-12 md:w-20 md:h-20 overflow-hidden rounded-2xl bg-white border-2 border-border/5 shadow-xl group-hover:scale-105 transition-all p-2 ring-4 ring-muted/20">
               <Image src="/logo.jpg" alt="Logo" fill className="object-contain" priority />
            </div>
            {!isScrolled && (
              <div className="flex flex-col">
                <span className="text-xl md:text-3xl font-black tracking-tighter text-[#021D24] uppercase leading-none font-heading">Mersal</span>
                <span className="text-[9px] md:text-[11px] text-[#F29124] font-black uppercase leading-none hidden sm:block mt-1">Marketplace</span>
              </div>
            )}
          </Link>

          {/* Desktop Search Bar - Balanced Fluid Width */}
          <div className={cn(
            "hidden lg:flex flex-grow max-w-[clamp(400px,50vw,750px)] rounded-full border-2 transition-all duration-500",
            isScrolled ? "bg-white border-border/20 shadow-md" : "bg-muted border-transparent"
          )}>
            <div className="px-8 py-4 text-[11px] font-black text-[#021D24]/40 uppercase flex items-center gap-3 border-l-2 border-border/50 cursor-pointer hover:text-[#1089A4] transition-all whitespace-nowrap group relative">
              الأقسـام <span className="material-symbols-rounded text-xl group-hover:translate-y-1 transition-transform">keyboard_arrow_down</span>
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="ابحث عن أجهزة، أزياء، أو ما تحلم به..." 
              className="flex-grow px-8 bg-transparent outline-none text-sm font-bold text-[#021D24] placeholder:text-[#021D24]/20"
            />
            <button 
              onClick={handleSearch}
              className="bg-[#1089A4] text-white px-8 m-2 rounded-full flex items-center justify-center hover:bg-[#021D24] transition-all active:scale-95 group"
            >
              <span className="material-symbols-rounded text-xl group-hover:scale-110 transition-transform">search</span>
            </button>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 md:gap-14">
            {/* Mobile Search Toggle */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="lg:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-muted text-[#1089A4] hover:bg-[#1089A4] hover:text-white transition-all"
            >
              <span className="material-symbols-rounded text-2xl">{isSearchOpen ? 'close' : 'search'}</span>
            </button>

            {/* Profile */}
            <Link href={session ? "/profile" : "/login"} className="hidden md:flex flex-col items-center gap-3 text-[#021D24]/40 hover:text-[#1089A4] transition-all group">
              {session?.user?.image ? (
                <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-border/20 group-hover:border-[#1089A4] transition-all">
                   <Image src={session.user.image} alt="User" fill className="object-cover" />
                </div>
              ) : (
                <span className="material-symbols-rounded text-3xl md:text-4xl group-hover:scale-125 transition-all font-light">account_circle</span>
              )}
              <span className="text-[10px] md:text-[11px] font-black uppercase">{session ? "حسابي" : "دخول"}</span>
            </Link>

            {/* Cart */}
            <div className="flex items-center gap-4 md:gap-14 border-l-2 border-border/50 pl-4 md:pl-14">
              <Link href="/cart" className="relative group transition-all">
                <span className="material-symbols-rounded text-3xl md:text-4xl text-[#1089A4] group-hover:scale-125 transition-all">shopping_cart</span>
                <span className="absolute -top-2 -right-2 md:-top-4 md:-right-4 bg-[#F29124] text-[#021D24] text-[8px] md:text-[12px] font-black w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center border-4 md:border-[6px] border-white shadow-2xl">{cartCount}</span>
              </Link>
            </div>

            {/* Mobile Menu Toggle (Edge Position Restored) */}
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden w-12 h-12 bg-muted rounded-2xl flex items-center justify-center hover:bg-[#1089A4] group transition-all">
              <span className="material-symbols-rounded text-3xl group-hover:text-white">segment</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Expandable */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden bg-white border-t border-border/5 kill-scroll"
            >
              <div className="p-6 py-8">
                <div className="relative flex items-center bg-muted rounded-[2.5rem] p-3 border-2 border-transparent focus-within:border-[#1089A4]/20 transition-all">
                   <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="ابحث عن أجهزة، عطور، أو ملابس..." 
                    className="flex-grow px-8 bg-transparent outline-none text-base font-bold text-[#021D24] placeholder:text-[#021D24]/20 text-right"
                   />
                   <button 
                    onClick={handleSearch}
                    className="bg-[#1089A4] text-white w-14 h-14 rounded-3xl flex items-center justify-center shadow-lg active:scale-95"
                   >
                     <span className="material-symbols-rounded text-2xl">search</span>
                   </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Bottom Tier (Desktop Only) */}
      <div className={cn(
        "bg-white border-t border-border/50 py-5 transition-all duration-700 relative hidden lg:block kill-scroll",
        isScrolled && "opacity-0 h-0 p-0 overflow-hidden"
      )}>
        <div className="responsive-container flex items-center justify-between">
          <div className="hidden lg:flex items-center gap-16 font-black text-[11px] uppercase text-[#021D24]/60">
            <div 
              className="relative group"
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <button className="bg-[#1089A4] text-white px-10 py-3.5 rounded-2xl shadow-xl shadow-[#1089A4]/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-5 border-b-4 border-black/10">
                <span className="material-symbols-rounded text-xl">menu</span> كـافـة الأقـسـام
              </button>

              <div className="absolute top-full right-0 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none group-hover:pointer-events-auto flex z-[200]">
                 <div className="bg-white rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.15)] border-4 border-white flex overflow-hidden">
                    <div className="w-[300px] bg-muted/30 border-l-2 border-border/10 py-10">
                       {sidebarCategories.map((cat, i) => (
                         <div 
                          key={i} 
                          onMouseEnter={() => setHoveredCategory(cat)}
                          className={cn(
                            "px-10 py-5 transition-all cursor-pointer flex items-center justify-between group/icon",
                            hoveredCategory?.name === cat.name ? "bg-white text-[#1089A4]" : "text-[#021D24]/40 hover:bg-white"
                          )}
                         >
                            <div className="flex items-center gap-5">
                               <span className="material-symbols-rounded text-2xl">{cat.icon}</span>
                               <span className="text-[13px] font-black uppercase leading-none">{cat.name}</span>
                            </div>
                            <span className="material-symbols-rounded text-sm opacity-20">chevron_left</span>
                         </div>
                       ))}
                    </div>

                    <AnimatePresence mode="wait">
                      {hoveredCategory && (
                        <motion.div 
                          key={hoveredCategory.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="w-[600px] p-16 grid grid-cols-2 gap-12"
                        >
                           <div className="space-y-8">
                              <h4 className="text-[10px] font-black uppercase text-[#1089A4]">التصنيفات الفرعية</h4>
                              <ul className="space-y-4">
                                 {hoveredCategory.subItems.map((sub: string, i: number) => (
                                   <li key={i} className="text-xl font-black text-[#021D24] hover:text-[#F29124] transition-colors cursor-pointer">{sub}</li>
                                 ))}
                              </ul>
                           </div>
                           <div className="relative bg-[#021D24] rounded-[2.5rem] overflow-hidden p-10 flex flex-col justify-end group/feat">
                              <Image src={hoveredCategory.featured.image} alt="Feature" fill className="object-cover opacity-40 group-hover/feat:scale-110 transition-transform duration-1000" />
                              <div className="relative z-10 space-y-3">
                                 <h5 className="text-white text-2xl font-black font-heading">{hoveredCategory.featured.title}</h5>
                                 <p className="text-white/40 text-[10px] font-black uppercase">{hoveredCategory.featured.desc}</p>
                                 <button className="text-[#F29124] text-[10px] font-black uppercase flex items-center gap-2 hover:gap-4 transition-all">تصفح الآن <span className="material-symbols-rounded">trending_flat</span></button>
                              </div>
                           </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                 </div>
              </div>
            </div>
            <Link href="/" className="hover:text-[#1089A4] border-b-4 border-transparent hover:border-[#F29124] pb-1 transition-all">الرئيسية</Link>
            <Link href="/shop" className="hover:text-[#1089A4] border-b-4 border-transparent hover:border-[#F29124] pb-1 transition-all">المتجر العام</Link>
            <Link href="/offers" className="text-[#F29124] hover:text-[#1089A4] border-b-4 border-transparent hover:border-[#1089A4] pb-1 transition-all">خصومات اليوم</Link>
            <Link href="/top-vendors" className="hover:text-[#1089A4] border-b-4 border-transparent hover:border-[#F29124] pb-1 transition-all">كبار الموردين</Link>
          </div>
          <div className="hidden lg:flex items-center gap-4 text-[#1089A4] font-black text-[11px] uppercase glass px-8 py-3 rounded-full border border-white">
            <span className="material-symbols-rounded text-base text-[#F29124] animate-pulse">verified_user</span> ضمان مرسال: رفاهية بلا حدود
          </div>
        </div>
      </div>

      {/* 4. Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }} className="fixed inset-0 z-[300] bg-[#021D24]/10 backdrop-blur-3xl flex justify-end lg:hidden overflow-hidden">
            <div className="w-[85%] max-w-[450px] bg-white h-full shadow-[-40px_0_80px_rgba(0,0,0,0.1)] flex flex-col p-10 overflow-y-auto">
               <div className="flex items-center justify-between mb-12">
                  <span className="text-2xl font-black text-[#1089A4] font-heading uppercase">Menu</span>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center text-[#021D24]/30"><span className="material-symbols-rounded">close</span></button>
               </div>
               <nav className="space-y-4">
                  <MobileNavItem icon="home" label="الرئيسية" href="/" onClick={() => setIsMobileMenuOpen(false)} />
                  <MobileNavItem icon="shopping_bag" label="المتجر العام" href="/shop" onClick={() => setIsMobileMenuOpen(false)} />
                  <MobileNavItem icon="bolt" label="عروض مرسال" href="/offers" onClick={() => setIsMobileMenuOpen(false)} />
                  <div className="h-px bg-border/40 my-8" />
                  <MobileNavItem icon="account_circle" label="حسابي" href="/login" onClick={() => setIsMobileMenuOpen(false)} />
               </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function MobileNavItem({ icon, label, href, onClick }: any) {
  return (
    <Link href={href} onClick={onClick} className="flex items-center gap-6 p-5 bg-muted/30 rounded-[1.5rem] border-2 border-transparent hover:border-[#1089A4]/20 transition-all group">
      <span className="material-symbols-rounded text-xl text-[#021D24]/20 group-hover:text-[#1089A4]">{icon}</span>
      <span className="text-[12px] font-black text-[#021D24] uppercase">{label}</span>
    </Link>
  );
}
