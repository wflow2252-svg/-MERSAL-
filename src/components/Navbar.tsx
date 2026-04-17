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
  const { data: session, status } = useSession();
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const isAdmin = (session?.user as any)?.role === "ADMIN";
  const isAuthenticated = status === "authenticated";

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);

    // Core Initialization (IP Tracking + Maintenance Check)
    const initializeSession = async () => {
      if (isAuthenticated) {
        try {
          // 1. Track IP safely
          fetch("/api/user/track", { method: "POST" });

          // 2. Maintenance Check
          const res = await fetch("/api/admin/settings");
          if (res.ok) {
            const data = await res.json();
            if (data.settings?.maintenanceMode && !isAdmin) {
              const isExceptionPage = window.location.pathname === "/login" || window.location.pathname === "/maintenance";
              if (!isExceptionPage) {
                window.location.href = "/maintenance";
              }
            }
          }
        } catch (e) {
          console.error("Session Init Error:", e);
        }
      }
    };
    
    initializeSession();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAuthenticated, isAdmin]);

  return (
    <header className="w-full fixed top-0 left-0 z-[100] font-sans flex justify-center mt-6 transition-all duration-700 pointer-events-none">
      
      {/* Floating Island Navigation */}
      <div className={cn(
        "bg-white/95 backdrop-blur-3xl transition-all duration-700 overflow-visible pointer-events-auto",
        isScrolled 
           ? "w-[95%] md:w-[85%] rounded-[3rem] py-3 shadow-[0_40px_80px_rgba(3,141,177,0.15)] border border-primary/10 mt-2" 
           : "w-[98%] md:w-[95%] rounded-[3rem] py-4 shadow-2xl border border-transparent"
      )}>
        <div className="px-3 md:px-12 flex items-center justify-between gap-2 md:gap-16">
          
          {/* Logo & Branding */}
          <Link href="/" className="flex items-center gap-2 md:gap-4 group/logo shrink-0">
            <div className="relative w-9 h-9 md:w-16 md:h-16 group-hover/logo:scale-105 transition-transform duration-500">
               <Image src="/logo.jpg" alt="Logo" fill className="object-contain" priority />
            </div>
            <div className="hidden sm:flex flex-col">
               <span className="text-lg md:text-2xl font-black text-primary tracking-tighter leading-none font-heading uppercase">Morsall</span>
            </div>
          </Link>

          {/* Search Bar - Responsive */}
          <form onSubmit={handleSearch} className="flex-grow max-w-[200px] xs:max-w-[260px] sm:max-w-[350px] md:max-w-[550px] relative group/search mx-0.5 md:mx-0">
             <div className="flex items-center bg-muted/40 md:bg-muted/30 rounded-2xl p-1 md:p-1.5 border border-primary/5 group-focus-within/search:bg-white group-focus-within/search:shadow-xl transition-all duration-500">
                <div 
                   className="relative flex-none hidden md:block" // Hidden on mobile to save space
                   onMouseEnter={() => setIsCatOpen(true)}
                   onMouseLeave={() => setIsCatOpen(false)}
                >
                   <button type="button" className="flex items-center gap-2 bg-white text-primary/40 px-5 py-3 rounded-xl font-bold text-[9px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm">
                      <span className="material-symbols-rounded text-md">apps</span>
                   </button>
                   
                   {/* Categories Dropdown */}
                   <div className={cn(
                     "absolute top-[130%] right-0 w-[240px] bg-white/95 backdrop-blur-3xl shadow-2xl border border-primary/5 py-4 rounded-2xl transition-all duration-500 origin-top z-50",
                     isCatOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
                   )}>
                      <div className="px-6 mb-4">
                         <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-primary/20">التصنيفات النخبوية</h4>
                      </div>
                      <div className="space-y-1">
                        {categories.map((cat) => (
                           <Link key={cat.id} href={`/category/${cat.id}`} className="flex items-center gap-4 px-6 py-2.5 hover:bg-muted text-primary/60 hover:text-primary transition-all group/item mx-2 rounded-xl">
                              <span className="material-symbols-rounded text-lg text-secondary/40 group-hover/item:text-secondary transition-colors">{cat.icon}</span>
                              <span className="text-[11px] font-bold">{cat.name}</span>
                           </Link>
                        ))}
                      </div>
                   </div>
                </div>
                <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="ابحث..." 
                   className="flex-grow px-2 md:px-6 bg-transparent outline-none text-[9px] sm:text-[10px] md:text-[11px] font-bold text-primary placeholder:text-primary/30 text-right min-w-0" 
                />
                <button type="submit" className="bg-primary text-white w-8 h-8 md:w-11 md:h-11 rounded-lg md:rounded-xl flex items-center justify-center hover:bg-secondary transition-all mr-0.5 md:mr-1 shadow-lg shadow-primary/10 flex-none scale-95 md:scale-100">
                   <span className="material-symbols-rounded text-sm md:text-lg">search</span>
                </button>
             </div>
          </form>

          {/* User & Actions Hub */}
          <div className="flex items-center gap-1 md:gap-5 flex-none relative pr-1">
             {isAuthenticated ? (
               <div className="flex items-center gap-1 md:gap-4">
                 <Link href="/profile" className="relative group flex items-center justify-center w-8 h-8 md:w-12 md:h-12">
                   <div className="w-full h-full rounded-full bg-muted text-primary/40 group-hover:bg-primary group-hover:text-white transition-all overflow-hidden border-2 border-transparent group-hover:border-secondary flex items-center justify-center">
                     {session?.user?.image ? (
                       <Image src={session.user.image} alt="Profile" width={48} height={48} className="object-cover w-full h-full" />
                     ) : <span className="material-symbols-rounded text-md md:text-xl group-hover:scale-110 transition-transform">person</span>}
                   </div>
                 </Link>
                 
                 {isAdmin && (
                   <Link href="/admin/dashboard" className="hidden xs:flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all">
                     <span className="material-symbols-rounded text-md md:text-xl">admin_panel_settings</span>
                   </Link>
                 )}
               </div>
             ) : (
               <Link href="/login" className="flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full bg-muted text-primary/40 hover:bg-primary hover:text-white transition-all border border-primary/5 relative">
                  <span className="material-symbols-rounded text-md md:text-xl">person</span>
               </Link>
             )}

             <Link href="/cart" className="relative group flex items-center justify-center w-9 h-9 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-primary text-white shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                <span className="material-symbols-rounded text-md md:text-[21px]">shopping_bag</span>
                <span className="absolute -top-1 -right-1 bg-secondary text-white text-[8px] md:text-[10px] font-bold w-4 h-4 md:w-6 md:h-6 rounded-full flex items-center justify-center border-2 border-white shadow-lg font-inter">{cartCount}</span>
             </Link>
          </div>
        </div>

      </div>
    </header>
  );
}
