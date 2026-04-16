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
  const [isMaintenance, setIsMaintenance] = useState(false);

  const isAdmin = (session?.user as any)?.role === "ADMIN";
  const isAuthenticated = status === "authenticated";

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
        <div className="px-6 md:px-12 flex items-center justify-between gap-6 md:gap-16">
          
          {/* Logo & Branding */}
          <Link href="/" className="flex items-center gap-4 group/logo">
            <div className="relative w-12 h-12 md:w-16 md:h-16 group-hover/logo:scale-105 transition-transform duration-500">
               <Image src="/logo.jpg" alt="Logo" fill className="object-contain" priority />
            </div>
            <div className="hidden sm:flex flex-col">
               <span className="text-xl md:text-2xl font-black text-primary tracking-tighter leading-none font-heading uppercase">Morsall</span>
            </div>
          </Link>

          {/* Central Interactive Search Bar */}
          <div className="flex-grow max-w-[500px] relative hidden lg:block group/search">
             <div className="flex items-center bg-muted/40 rounded-2xl p-1 border border-primary/5 group-focus-within/search:bg-white group-focus-within/search:shadow-lg transition-all duration-500">
                <div 
                   className="relative flex-none"
                   onMouseEnter={() => setIsCatOpen(true)}
                   onMouseLeave={() => setIsCatOpen(false)}
                >
                   <button className="flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-xl font-bold text-[12px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm min-w-[100px]">
                      <span className="material-symbols-rounded text-md">apps</span>
                   </button>
                   <div className={cn(
                     "absolute top-[120%] right-0 w-[280px] bg-white/95 backdrop-blur-3xl shadow-2xl border border-primary/5 py-4 rounded-2xl transition-all duration-500 origin-top",
                     isCatOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
                   )}>
                      {categories.map((cat) => (
                        <Link key={cat.id} href={`/category/${cat.id}`} className="flex items-center justify-between px-6 py-3 hover:bg-muted text-primary/70 hover:text-primary transition-all group/item mx-2 rounded-xl">
                           <div className="flex items-center gap-3">
                              <span className="material-symbols-rounded text-lg text-secondary/30 group-hover/item:text-secondary">{cat.icon}</span>
                              <span className="text-xs font-bold">{cat.name}</span>
                           </div>
                        </Link>
                      ))}
                   </div>
                </div>
                <input type="text" placeholder="ابحث عن المنتجات..." className="flex-grow px-6 bg-transparent outline-none text-[12px] font-medium text-primary placeholder:text-primary/30 text-right" />
                <button className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-secondary transition-all mr-1">
                   <span className="material-symbols-rounded text-lg">search</span>
                </button>
             </div>
          </div>

          {/* User & Actions Hub */}
          <div className="flex items-center gap-3 md:gap-5 flex-none">
             {isAuthenticated ? (
               <>
                 <Link href="/profile" className="relative group flex items-center justify-center w-10 h-10 md:w-12 md:h-12">
                   <div className="w-full h-full rounded-full bg-muted text-primary/40 group-hover:bg-primary group-hover:text-white transition-all overflow-hidden border-2 border-transparent group-hover:border-secondary flex items-center justify-center">
                     {session?.user?.image ? (
                       <Image src={session.user.image} alt="Profile" width={48} height={48} className="object-cover w-full h-full" />
                     ) : <span className="material-symbols-rounded text-xl group-hover:scale-110 transition-transform">person</span>}
                   </div>
                 </Link>

                 {/* Admin Quick Access - Now Visible on Mobile */}
                 {isAdmin && (
                   <Link href="/admin/dashboard" className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all group relative">
                     <span className="material-symbols-rounded text-xl">admin_panel_settings</span>
                   </Link>
                 )}
               </>
             ) : (
               <Link href="/login" className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted text-primary/40 hover:bg-primary hover:text-white transition-all border border-primary/5 hover:border-transparent relative group">
                  <span className="material-symbols-rounded text-xl group-hover:scale-110 transition-transform">person</span>
               </Link>
             )}

             <div className="w-px h-6 bg-primary/10 hidden sm:block" />

             <Link href="/cart" className="relative group flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary text-white shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                <span className="material-symbols-rounded text-[21px] group-hover:-rotate-[-10deg] transition-transform">shopping_bag</span>
                <span className="absolute -top-1.5 -right-1.5 bg-secondary text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-lg font-inter">{cartCount}</span>
             </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
