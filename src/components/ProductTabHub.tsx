"use client"

import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

const tabProducts: Record<string, any[]> = {
  new: [
    { id: "n1", title: "سماعات سوني WH-1000XM5",           price: 185000, vendor: "تكنو زون",    location: "الخرطوم", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800", badge: "جديد" },
    { id: "n2", title: "آبل آيفون 15 برو ماكس",             price: 980000, vendor: "مرسال جادجتس", location: "الخرطوم", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800", badge: "جديد" },
    { id: "n3", title: "ساعة رولكس أويستر بربتشوال",        price: 950000, vendor: "نخبة الساعات", location: "الخرطوم", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800", badge: "جديد" },
    { id: "n4", title: "آبل ماك بوك برو 14 بوصة M3",        price: 1450000, vendor: "آبل سيستمز",  location: "الخرطوم", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800", badge: "جديد" },
    { id: "n5", title: "كاميرا سوني Alpha a7 IV",            price: 420000, vendor: "كاميرا ورلد", location: "الخرطوم", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800", badge: "جديد" },
    { id: "n6", title: "تلفزيون سامسونج QLED 65 بوصة",       price: 350000, vendor: "إلكترو مول",  location: "الخرطوم", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f4e85d?auto=format&fit=crop&q=80&w=800", badge: "جديد" },
  ],
  best: [
    { id: "b1", title: "جهاز قهوة نسبريسو فيرتو",           price: 65000,  vendor: "البيت العصري", location: "بحري",    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&q=80&w=800", badge: "الأكثر مبيعاً" },
    { id: "b2", title: "نظارات شمسية برادا كوليكشن 2026",    price: 32000,  vendor: "نظارات مكة",  location: "الخرطوم", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800", badge: "الأكثر مبيعاً" },
    { id: "b3", title: "حذاء نايكي إير ماكس 270",            price: 45000,  vendor: "رياضة السودان", location: "الخرطوم", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800", badge: "الأكثر مبيعاً" },
    { id: "b4", title: "حقيبة جلدية فاخرة",                 price: 28000,  vendor: "ليذر كرافت",  location: "أم درمان", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800", badge: "الأكثر مبيعاً" },
    { id: "b5", title: "طقم أواني طهي جرانيت",              price: 55000,  vendor: "المطبخ الملكي", location: "بحري",    image: "https://images.unsplash.com/photo-1584990344321-2768224f115d?auto=format&fit=crop&q=80&w=800", badge: "الأكثر مبيعاً" },
  ],
  offers: [
    { id: "o1", title: "كاميرا سوني Alpha a7 IV",            price: 420000, vendor: "كاميرا ورلد", location: "الخرطوم", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800", badge: "خصم 30%", discount: 30 },
    { id: "o2", title: "تلفزيون سامسونج QLED 65 بوصة",       price: 350000, vendor: "إلكترو مول",  location: "الخرطوم", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f4e85d?auto=format&fit=crop&q=80&w=800", badge: "خصم 20%", discount: 20 },
    { id: "o3", title: "ساعة آبل الإصدار التاسع",            price: 220000, vendor: "آبل سيستمز",  location: "الخرطوم", image: "https://images.unsplash.com/photo-1434494878577-86c23bdd0639?auto=format&fit=crop&q=80&w=800", badge: "خصم 15%", discount: 15 },
    { id: "o4", title: "خلاط مولينكس الأصلي",                price: 45000,  vendor: "إلكترو مول",  location: "الخرطوم", image: "https://images.unsplash.com/photo-1585238341267-4c760c41031c?auto=format&fit=crop&q=80&w=800", badge: "خصم 10%", discount: 10 },
  ],
};

const SECTIONS = [
  { id: "new",    label: "وصل حديثاً", icon: "✨" },
  { id: "best",   label: "الأكثر مبيعاً", icon: "⭐" },
  { id: "offers", label: "عروض مميزة", icon: "🔥" },
];

function ProductStrip({ title, products, icon }: { title: string, products: any[], icon: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "l" | "r") => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const move = clientWidth * 0.8;
    scrollRef.current.scrollTo({
      left: dir === "l" ? scrollLeft - move : scrollLeft + move,
      behavior: "smooth"
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-8 last:mb-0 overflow-hidden">
      {/* Strip Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <h2 className="font-black text-lg text-[#021D24]">{title}</h2>
        </div>
        <Link href="/shop" className="text-xs font-bold text-[#1089A4] hover:underline flex items-center gap-1 group">
          عرض الكل
          <span className="material-symbols-rounded text-base group-hover:-translate-x-1 transition-transform">chevron_left</span>
        </Link>
      </div>

      {/* Slider Container */}
      <div className="relative group/slider px-4 pb-6">
        {/* Nav Buttons (Desktop) */}
        <button 
          onClick={() => scroll("r")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg border border-gray-200 rounded-full flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity translate-x-1/2 hidden md:flex"
        >
          <span className="material-symbols-rounded">chevron_right</span>
        </button>
        <button 
          onClick={() => scroll("l")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg border border-gray-200 rounded-full flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity -translate-x-1/2 hidden md:flex"
        >
          <span className="material-symbols-rounded">chevron_left</span>
        </button>

        {/* Scrollable Area */}
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4"
        >
          {products.map(p => (
            <div key={p.id} className="min-w-[200px] sm:min-w-[240px] md:min-w-[280px] snap-center">
              <ProductCard {...p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductTabHub() {
  return (
    <section className="bg-[#F3F4F6] py-10" dir="rtl">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6">

        {/* ── Product Sections (Stacked Strips) ── */}
        <div className="flex flex-col">
          {SECTIONS.map(sec => (
            <ProductStrip 
              key={sec.id}
              title={sec.label}
              products={tabProducts[sec.id]}
              icon={sec.icon}
            />
          ))}
        </div>

        {/* ── Advertisement Banner Row ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 border-t border-gray-200 pt-10">
          {[
            { 
               bg: "from-[#021D24] to-[#1089A4]", 
               title: "مساحة إعلانية لمتجرك", 
               desc: "أبرز منتجاتك أمام آلاف الزوار", 
               icon: "campaign", 
               href: "/contact", 
               img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600" 
            },
            { 
               bg: "from-[#F29124] to-[#D97B10]", 
               title: "عرض لفترة محدودة؟", 
               desc: "أعلن هنا عن أحدث التخفيضات", 
               icon: "local_offer", 
               href: "/contact", 
               img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=600"
            },
            { 
               bg: "from-[#2C1810] to-[#4A2F25]", 
               title: "منتجك الجديد", 
               desc: "احجز مساحتك الآن للترويج", 
               icon: "storefront", 
               href: "/vendor/register",
               img: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=600"
            },
          ].map((b, i) => (
            <div key={i} className={`relative overflow-hidden rounded-xl p-6 text-white min-h-[140px] flex items-end shadow-md transition-all hover:shadow-xl bg-gradient-to-l ${b.bg} group cursor-pointer`}>
               {/* Background image overlay */}
               <div className="absolute inset-0 z-0">
                  <Image src={b.img} alt={b.title} fill className="object-cover opacity-20 group-hover:opacity-30 transition-opacity mix-blend-overlay" />
               </div>
               {/* Content */}
               <div className="relative z-10 w-full flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-base md:text-lg mb-1 drop-shadow-md">{b.title}</h3>
                    <p className="text-[10px] md:text-xs text-white/90 font-bold max-w-[80%]">{b.desc}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30">
                     <span className="material-symbols-rounded block">{b.icon}</span>
                  </div>
               </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
