"use client"

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/lib/CartContext";
import { useWishlist } from "@/lib/WishlistContext";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_CATS = [
  { label: "كل الأقسام",     href: "/shop",              icon: "menu" },
  { label: "الإلكترونيات",   href: "/category/electronics", icon: "smartphone" },
  { label: "الأزياء",        href: "/category/fashion",   icon: "checkroom" },
  { label: "المنزل والمطبخ", href: "/category/home",      icon: "kitchen" },
  { label: "الجمال والعناية",href: "/category/beauty",    icon: "face" },
  { label: "العروض 🔥",       href: "/offers",            icon: "bolt" },
  { label: "كبار المتاجر",  href: "/top-vendors",        icon: "storefront" },
  { label: "ابدأ تجارتك",    href: "/vendor/register",   icon: "add_business" },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const { cartCount } = useCart();
  const { favorites, compareList } = useWishlist();
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const isAdmin = (session?.user as any)?.role === "ADMIN";
  const isAuthenticated = status === "authenticated";

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header 
      className={cn(
        "w-full fixed top-0 left-0 z-[100] flex flex-col transition-all duration-300",
        isScrolled ? "translate-y-[-2px]" : "translate-y-0"
      )} 
      dir="rtl"
    >
      {/* ── HIGH-END TOP BAR ─────────────────────────── */}
      <div className="bg-[#020D10] text-white shadow-2xl border-b border-white/5 relative overflow-hidden">
        {/* Animated accent line */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#F29124] to-transparent opacity-50" 
        />
        
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 h-16 flex items-center gap-4 lg:gap-8">

          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-[150px] h-12 lg:w-[180px] lg:h-16"
            >
              <Image 
                src="/logo-najez-new.png" 
                alt="ناجز - NAJEZ" 
                fill 
                className="object-contain" 
                priority 
              />
            </motion.div>
          </Link>

          {/* Location Picker (Premium Pill) */}
          <Link href="/delivery" className="hidden xl:flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-1.5 transition-all cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-[#F29124]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-rounded text-lg text-[#F29124]">location_on</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] text-white/40 font-medium">نصلك إلى</span>
              <span className="text-[13px] font-bold text-white">الخرطوم</span>
            </div>
          </Link>

          {/* Advanced Search Bar */}
          <form 
            onSubmit={handleSearch} 
            className="flex-grow flex items-stretch h-11 bg-white/5 rounded-xl border border-white/10 hover:border-[#F29124]/50 focus-within:border-[#F29124] focus-within:ring-4 focus-within:ring-[#F29124]/10 transition-all overflow-hidden"
          >
            <select className="hidden md:block bg-transparent text-white/70 text-[12px] font-bold px-4 hover:text-white outline-none cursor-pointer border-l border-white/10">
              <option className="bg-[#020D10]">كل الأقسام</option>
              <option className="bg-[#020D10]">الإلكترونيات</option>
              <option className="bg-[#020D10]">الأزياء</option>
            </select>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="ابحث عن أفضل العروض في ناجز..."
              className="flex-grow bg-transparent text-white px-5 text-sm outline-none placeholder:text-white/30 text-right"
            />
            <button
              type="submit"
              className="px-6 flex items-center justify-center text-white/50 hover:text-[#F29124] transition-colors"
            >
              <span className="material-symbols-rounded text-2xl">search</span>
            </button>
          </form>

          {/* Action Icons */}
          <div className="flex items-center gap-2 lg:gap-5 shrink-0" ref={menuRef}>
            
            {/* Account Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ y: -2 }}
                onClick={() => setShowUserMenu(p => !p)}
                className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg hover:bg-white/5 transition-all text-center"
              >
                <span className="material-symbols-rounded text-2xl text-white/70">person</span>
                <span className="text-[10px] font-bold text-white/40">حسابي</span>
              </motion.button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute left-0 top-full mt-4 w-60 bg-[#0A1A1F] rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl overflow-hidden z-50 text-right"
                  >
                    {isAuthenticated ? (
                      <div className="p-2 space-y-1">
                        <div className="px-4 py-3 mb-2 bg-[#F29124]/10 rounded-xl">
                          <p className="text-xs font-black text-white">{session?.user?.name}</p>
                          <p className="text-[10px] text-[#F29124]">{session?.user?.email}</p>
                        </div>
                        <Link href="/profile" className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-white/5 text-sm font-bold text-white/80 transition-colors">
                          لوحة التحكم
                          <span className="material-symbols-rounded text-lg opacity-40">dashboard</span>
                        </Link>
                        <Link href="/orders" className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-white/5 text-sm font-bold text-white/80 transition-colors">
                          مشترياتي
                          <span className="material-symbols-rounded text-lg opacity-40">package_2</span>
                        </Link>
                        <div className="h-px bg-white/5 my-1" />
                        <button
                          onClick={() => signOut()}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-red-500/10 text-sm font-bold text-red-400 transition-colors"
                        >
                          خروج
                          <span className="material-symbols-rounded text-lg">logout</span>
                        </button>
                      </div>
                    ) : (
                      <div className="p-4 flex flex-col gap-3">
                        <Link href="/login" className="flex items-center justify-center h-11 bg-[#F29124] text-white rounded-xl font-bold text-sm hover:brightness-110 transition-all">
                          تسجيل الدخول
                        </Link>
                        <p className="text-center text-[10px] text-white/30">
                          ليس لديك حساب؟ <Link href="/register" className="text-[#F29124] hover:underline">سجل هنا</Link>
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist */}
            <Link href="/wishlist" className="hidden lg:flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg hover:bg-white/5 transition-all relative group">
              <span className="material-symbols-rounded text-2xl text-white/70 group-hover:text-[#F29124] transition-colors">favorite</span>
              <span className="text-[10px] font-bold text-white/40">المفضلة</span>
              {favorites.length > 0 && (
                <span className="absolute top-1 left-2 h-4 min-w-[16px] bg-[#F29124] text-white text-[9px] font-black rounded-full flex items-center justify-center px-1">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Cart Button (Premium) */}
            <Link href="/cart">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#F29124] text-white rounded-xl h-11 px-4 lg:px-6 flex items-center gap-3 shadow-lg shadow-[#F29124]/20 hover:brightness-110 transition-all"
              >
                <div className="relative">
                  <span className="material-symbols-rounded text-2xl">shopping_bag</span>
                  <span className="absolute -top-1 -right-1 h-4 min-w-[16px] bg-white text-[#F29124] text-[9px] font-black rounded-full flex items-center justify-center px-1">
                    {cartCount}
                  </span>
                </div>
                <span className="hidden lg:block text-sm font-black">السلة</span>
              </motion.div>
            </Link>
          </div>
        </div>
      </div>

      {/* ── GLASS NAVIGATION BAR ─────────────────────────── */}
      <nav className="bg-[#020D10]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 flex items-center h-12">
          
          {/* Hamburger */}
          <button
            onClick={() => setShowCategories(p => !p)}
            className="flex items-center gap-3 px-4 h-full border-l border-white/5 font-black text-xs text-[#F29124] hover:bg-white/5 transition-colors"
          >
            <span className="material-symbols-rounded text-xl">menu</span>
            تصفح الأقسام
          </button>

          {/* Categories Links */}
          <div className="flex items-center h-full overflow-x-auto scrollbar-none">
            {NAV_CATS.slice(1).map(cat => (
              <Link
                key={cat.href}
                href={cat.href}
                className="px-5 h-full flex items-center text-[12px] font-bold text-white/60 hover:text-white hover:bg-white/5 transition-all whitespace-nowrap"
              >
                {cat.label}
              </Link>
            ))}
          </div>

          <div className="flex-grow" />

          {/* Promo Badge */}
          <div className="hidden lg:flex items-center gap-2 px-4 h-8 bg-[#F29124]/10 rounded-full border border-[#F29124]/20 text-[#F29124] text-[11px] font-bold animate-pulse">
            <span className="material-symbols-rounded text-sm">bolt</span>
            عروض الجمعة البيضاء وصلت!
          </div>
        </div>
      </nav>

      {/* Mobile Categories Sidebar (Optional/Re-implemented) */}
      <AnimatePresence>
        {showCategories && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1]"
              onClick={() => setShowCategories(false)}
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 w-80 h-screen bg-[#020D10] shadow-[0_0_50px_rgba(0,0,0,0.5)] z-[101] p-6 text-white border-l border-white/10"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black">أقسام ناجز</h3>
                <button onClick={() => setShowCategories(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10">
                  <span className="material-symbols-rounded">close</span>
                </button>
              </div>
              <div className="space-y-2">
                {NAV_CATS.map(cat => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    onClick={() => setShowCategories(false)}
                    className="flex items-center justify-between px-4 py-4 rounded-2xl hover:bg-white/5 border border-white/5 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-rounded text-[#F29124] group-hover:scale-110 transition-transform">{cat.icon}</span>
                      <span className="font-bold">{cat.label}</span>
                    </div>
                    <span className="material-symbols-rounded text-sm opacity-20">chevron_left</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
