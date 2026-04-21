"use client"

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { cn } from "@/lib/utils";

const tabProducts: Record<string, any[]> = {
  new: [
    { id: "n1", title: "سماعات سوني WH-1000XM5",           price: 185000, vendor: "تكنو زون",    location: "الخرطوم", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800", badge: "جديد" },
    { id: "n2", title: "آبل آيفون 15 برو ماكس",             price: 980000, vendor: "مرسال جادجتس", location: "الخرطوم", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800", badge: "جديد" },
    { id: "n3", title: "ساعة رولكس أويستر بربتشوال",        price: 950000, vendor: "نخبة الساعات", location: "الخرطوم", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800", badge: "جديد" },
    { id: "n4", title: "آبل ماك بوك برو 14 بوصة M3",        price: 1450000, vendor: "آبل سيستمز",  location: "الخرطوم", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800", badge: "جديد" },
  ],
  best: [
    { id: "b1", title: "جهاز قهوة نسبريسو فيرتو",           price: 65000,  vendor: "البيت العصري", location: "بحري",    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&q=80&w=800", badge: "الأكثر مبيعاً" },
    { id: "b2", title: "نظارات شمسية برادا كوليكشن 2026",    price: 32000,  vendor: "نظارات مكة",  location: "الخرطوم", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800", badge: "الأكثر مبيعاً" },
    { id: "b3", title: "حذاء نايكي إير ماكس 270",            price: 45000,  vendor: "رياضة السودان", location: "الخرطوم", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800", badge: "الأكثر مبيعاً" },
    { id: "b4", title: "حقيبة جلدية فاخرة",                 price: 28000,  vendor: "ليذر كرافت",  location: "أم درمان", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800", badge: "الأكثر مبيعاً" },
  ],
  offers: [
    { id: "o1", title: "كاميرا سوني Alpha a7 IV",            price: 420000, vendor: "كاميرا ورلد", location: "الخرطوم", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800", badge: "خصم 30%" },
    { id: "o2", title: "تلفزيون سامسونج QLED 65 بوصة",       price: 350000, vendor: "إلكترو مول",  location: "الخرطوم", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f4e85d?auto=format&fit=crop&q=80&w=800", badge: "خصم 20%" },
  ],
};

const TABS = [
  { id: "new",    label: "وصل حديثاً 🆕" },
  { id: "best",   label: "الأكثر مبيعاً ⭐" },
  { id: "offers", label: "عروض مميزة 🔥" },
];

export default function ProductTabHub() {
  const [active, setActive] = useState("new");

  return (
    <section className="bg-[#F3F4F6] py-6" dir="rtl">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6">

        {/* ── Section header ── */}
        <div className="bg-white rounded-lg border border-gray-200 mb-4 overflow-hidden">
          <div className="flex items-center justify-between px-4 pt-4 pb-0">
            <h2 className="font-black text-lg text-[#021D24]">منتجات مختارة</h2>
            <Link href="/shop" className="text-xs font-bold text-[#1089A4] hover:underline flex items-center gap-1">
              عرض الكل
              <span className="material-symbols-rounded text-base">chevron_left</span>
            </Link>
          </div>

          {/* Tab bar */}
          <div className="flex gap-0 border-b border-gray-100 px-2">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "px-4 py-3 text-sm font-bold transition-all border-b-2 -mb-px",
                  active === tab.id
                    ? "border-[#F29124] text-[#021D24]"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Products */}
          <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {tabProducts[active].map(p => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </div>

        {/* ── Banner ad row (Amazon-style) ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { bg: "#021D24", text: "اتسوّق بثقة — الدفع عند الاستلام متاح", icon: "payments",       href: "/payment", btn: "اعرف أكثر" },
            { bg: "#1089A4", text: "وصّل لك في 24 ساعة داخل الخرطوم",       icon: "local_shipping",  href: "/delivery", btn: "تفاصيل التوصيل" },
            { bg: "#F29124", text: "ابدأ تجارتك مع مرسال — مجاناً",          icon: "store",           href: "/vendor/register", btn: "سجّل متجرك" },
          ].map((b, i) => (
            <div key={i} className="rounded-lg p-5 flex items-center justify-between gap-4 text-white" style={{ background: b.bg }}>
              <div>
                <p className="text-sm font-black mb-2">{b.text}</p>
                <Link href={b.href} className="inline-block bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-4 py-1.5 rounded transition-colors">
                  {b.btn}
                </Link>
              </div>
              <span className="material-symbols-rounded text-4xl opacity-50">{b.icon}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
