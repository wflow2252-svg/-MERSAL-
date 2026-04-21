"use client"

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/lib/CartContext";
import { useRouter } from "next/navigation";

const NAV_CATS = [
  { label: "كل الأقسام",     href: "/shop",              icon: "menu" },
  { label: "الإلكترونيات",   href: "/category/electronics", icon: "smartphone" },
  { label: "الأزياء",        href: "/category/fashion",   icon: "checkroom" },
  { label: "المنزل والمطبخ", href: "/category/home",      icon: "kitchen" },
  { label: "الجمال والعناية",href: "/category/beauty",    icon: "face" },
  { label: "العروض 🔥",       href: "/offers",            icon: "bolt" },
  { label: "كبار الموردين",  href: "/top-vendors",        icon: "storefront" },
  { label: "ابدأ تجارتك",    href: "/vendor/register",   icon: "add_business" },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const { cartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const isAdmin = (session?.user as any)?.role === "ADMIN";
  const isAuthenticated = status === "authenticated";

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  // Click outside to close menus
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // IP tracking + maintenance check
  useEffect(() => {
    if (!isAuthenticated) return;
    fetch("/api/user/track", { method: "POST" }).catch(() => {});
    fetch("/api/admin/settings")
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d?.settings?.maintenanceMode && !isAdmin) {
          const p = window.location.pathname;
          if (p !== "/login" && p !== "/maintenance") window.location.href = "/maintenance";
        }
      })
      .catch(() => {});
  }, [isAuthenticated, isAdmin]);

  return (
    <header className="w-full fixed top-0 left-0 z-[100] flex flex-col" dir="rtl">

      {/* ── TOP BAR (ORANGE) ─────────────────────────── */}
      <div className="bg-[#F89522] text-white shadow-md">
        <div className="max-w-[1600px] mx-auto px-3 lg:px-6 h-14 flex items-center gap-2 lg:gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative w-16 h-16">
              <Image src="/icon-mersal.png" alt="مرسال" fill className="object-contain" priority />
            </div>
          </Link>

          {/* Deliver to */}
          <Link href="/delivery" className="hidden lg:flex flex-col shrink-0 hover:ring-1 ring-white/30 rounded px-2 py-1 transition-all cursor-pointer">
            <span className="text-[10px] text-white/50 font-medium">التوصيل إلى</span>
            <span className="text-[12px] font-black flex items-center gap-1">
              <span className="material-symbols-rounded text-sm text-[#F29124]">location_on</span>
              الخرطوم
            </span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-grow flex items-stretch rounded-lg overflow-hidden border-2 border-[#108DB2] transition-all focus-within:border-[#0D708E]">
            {/* Category select */}
            <select className="hidden md:block bg-gray-100 text-gray-700 text-[11px] font-bold px-3 border-l border-gray-200 outline-none cursor-pointer min-w-[120px]">
              <option>كل الأقسام</option>
              <option>الإلكترونيات</option>
              <option>الأزياء</option>
              <option>المنزل</option>
              <option>الجمال</option>
            </select>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="ابحث في مرسال..."
              className="flex-grow bg-white text-gray-900 px-4 text-sm outline-none placeholder:text-gray-400 text-right"
            />
            <button
              type="submit"
              className="bg-[#108DB2] text-white px-4 lg:px-5 flex items-center justify-center hover:bg-[#0D708E] transition-colors"
            >
              <span className="material-symbols-rounded text-xl">search</span>
            </button>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-1 lg:gap-3 shrink-0" ref={menuRef}>

            {/* Language */}
            <button className="hidden lg:flex flex-col hover:ring-1 ring-white/30 rounded px-2 py-1 transition-all text-right">
              <span className="text-[10px] text-white/50">اللغة</span>
              <span className="text-[12px] font-black">عربي 🇸🇩</span>
            </button>

            {/* Account */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(p => !p)}
                className="flex flex-col hover:ring-1 ring-white/30 rounded px-2 py-1 transition-all text-right"
              >
                <span className="text-[10px] text-white/50">
                  {isAuthenticated ? `أهلاً، ${session?.user?.name?.split(" ")[0]}` : "تسجيل الدخول"}
                </span>
                <span className="text-[12px] font-black flex items-center gap-0.5">
                  الحساب
                  <span className="material-symbols-rounded text-sm">expand_more</span>
                </span>
              </button>

              {/* Dropdown */}
              {showUserMenu && (
                <div className="absolute left-0 top-full mt-2 w-52 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden z-50 text-right">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-3 bg-[#108DB2] text-white">
                        <p className="text-xs font-black">{session?.user?.name}</p>
                        <p className="text-[10px] text-white/40">{session?.user?.email}</p>
                      </div>
                      <Link href="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm font-bold text-gray-700 border-b">
                        <span className="material-symbols-rounded text-base text-[#1089A4]">person</span>
                        ملفي الشخصي
                      </Link>
                      <Link href="/orders" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm font-bold text-gray-700 border-b">
                        <span className="material-symbols-rounded text-base text-[#1089A4]">shopping_bag</span>
                        طلباتي
                      </Link>
                      {isAdmin && (
                        <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 text-sm font-bold text-[#D97B10] border-b">
                          <span className="material-symbols-rounded text-base">admin_panel_settings</span>
                          لوحة التحكم
                        </Link>
                      )}
                      <button
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-sm font-bold text-red-500"
                      >
                        <span className="material-symbols-rounded text-base">logout</span>
                        تسجيل الخروج
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="flex items-center justify-center gap-2 mx-3 my-3 bg-[#108DB2] text-white py-2 rounded-lg font-bold text-sm">
                        <span className="material-symbols-rounded text-base">login</span>
                        تسجيل الدخول
                      </Link>
                      <p className="text-center text-xs text-gray-500 pb-3">
                        بداية جديدة؟ <Link href="/register" className="text-[#1089A4] font-bold hover:underline">سجّل حساباً</Link>
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Orders */}
            <Link href="/orders" className="hidden lg:flex flex-col hover:ring-1 ring-white/30 rounded px-2 py-1 transition-all text-right">
              <span className="text-[10px] text-white/50">المبيعات</span>
              <span className="text-[12px] font-black">والطلبات</span>
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative flex items-end gap-1 hover:ring-1 ring-white/30 rounded px-2 py-1 transition-all">
              <div className="relative">
                <span className="material-symbols-rounded text-3xl text-white">shopping_cart</span>
                <span className="absolute -top-1 -left-1 min-w-[20px] h-5 bg-[#108DB2] text-white text-[10px] font-black rounded-full flex items-center justify-center px-1">
                  {cartCount}
                </span>
              </div>
              <span className="hidden lg:block text-[12px] font-black pb-0.5">السلة</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── SECONDARY NAV BAR (BLUE) ──────────────────────── */}
      <div className="bg-[#108DB2] text-white border-t border-white/10 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-3 lg:px-6 flex items-center gap-1 overflow-x-auto scrollbar-none h-10">

          {/* Hamburger "All" */}
          <button
            onClick={() => setShowCategories(p => !p)}
            className="flex items-center gap-1.5 px-3 py-1 rounded font-black text-xs shrink-0 hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-rounded text-base">menu</span>
            كل الأقسام
          </button>

          {/* Nav links */}
          {NAV_CATS.slice(1).map(cat => (
            <Link
              key={cat.href}
              href={cat.href}
              className="px-3 py-1 text-xs font-bold whitespace-nowrap hover:bg-white/10 rounded transition-colors shrink-0"
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Full categories panel */}
        {showCategories && (
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setShowCategories(false)}
          >
            <div
              className="w-64 bg-[#108DB2] h-full shadow-2xl p-4 text-white"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-sm">Hello, {session?.user?.name?.split(" ")[0] || "Guest"}</h3>
                <button onClick={() => setShowCategories(false)} className="text-white/40 hover:text-white">
                  <span className="material-symbols-rounded">close</span>
                </button>
              </div>
              <div className="space-y-1">
                {NAV_CATS.map(cat => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    onClick={() => setShowCategories(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-sm font-bold"
                  >
                    <span className="material-symbols-rounded text-[#F29124] text-base">{cat.icon}</span>
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

    </header>
  );
}
