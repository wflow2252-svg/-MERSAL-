"use client"

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function CategoryWall() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/categories")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCategories(data);
        }
      })
      .catch(console.error);
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "l" | "r") => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const move = clientWidth * 0.7;
    scrollRef.current.scrollTo({
      left: dir === "l" ? scrollLeft - move : scrollLeft + move,
      behavior: "smooth"
    });
  };

  return (
    <section className="bg-white py-10" dir="rtl">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6">

        {/* ── Category Slider Header ── */}
        <div className="flex items-center justify-end mb-6 px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#A89F91]">تسوق حسب الفئات</h2>
        </div>

        {/* ── Circular Category Slider ── */}
        <div className="relative group/slider">
          {/* Nav Buttons */}
          <button
            onClick={() => scroll("r")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-md border border-gray-100 rounded-full flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity translate-x-1/2 hidden md:flex hover:bg-gray-50"
          >
            <span className="material-symbols-rounded text-gray-400">arrow_forward</span>
          </button>
          <button
            onClick={() => scroll("l")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-md border border-gray-100 rounded-full flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity -translate-x-1/2 hidden md:flex hover:bg-gray-50"
          >
            <span className="material-symbols-rounded text-gray-400">arrow_back</span>
          </button>

          {/* Scrollable Area */}
          <div
            ref={scrollRef}
            className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-none snap-x snap-mandatory px-4 pb-4 items-start"
          >
            {categories.map((cat, i) => {
              // Assign random pastel background colors if no image, or just use it as container background
              const bgColors = ["bg-[#1E1E1E]", "bg-[#EAEAEA]", "bg-[#E5D7CE]", "bg-[#E5E7E9]", "bg-[#F3E5AB]", "bg-[#D5BDB0]", "bg-[#D5E1E6]"];
              const bgColor = bgColors[i % bgColors.length];

              return (
                <Link
                  key={cat.id}
                  href={`/category/${cat.id}`}
                  className="flex flex-col items-center gap-4 min-w-[100px] md:min-w-[130px] snap-center group"
                >
                  <div className={`relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex items-center justify-center text-4xl shadow-sm transition-transform duration-300 group-hover:scale-105 ${bgColor}`}>
                    {cat.icon && (cat.icon.startsWith("http") || cat.icon.startsWith("/")) ? (
                      <Image
                        src={cat.icon}
                        alt={cat.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span>{cat.icon || "📦"}</span>
                    )}
                  </div>
                  <p className="text-sm font-bold text-[#333] group-hover:text-[#A89F91] transition-colors text-center w-full truncate px-2">
                    {cat.name}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>

        {/* ── 4-box deal grid (Amazon-style) ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {[
            {
              title: "🔥 عروض اليوم",
              sub: "لحق قبل ما تخلص",
              bg: "bg-white",
              accent: "#E53E3E",
              img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400",
              href: "/offers",
              cta: "شوف كل العروض",
            },
            {
              title: "ابدأ البيع الآن",
              sub: "متجرك على بُعد دقيقتين",
              bg: "bg-white",
              accent: "#1089A4",
              img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=400",
              href: "/vendor/register",
              cta: "اعرض منتجاتك الآن",
            },
            {
              title: "وصل جديد 🆕",
              sub: "أحدث المنتجات في السودان",
              bg: "bg-white",
              accent: "#F29124",
              img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400",
              href: "/shop?sort=new",
              cta: "اكتشف الجديد",
            },
            {
              title: "المتاجر",
              sub: "أكثر من متجر موثوق",
              bg: "bg-white",
              accent: "#6B46C1",
              img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=400",
              href: "/top-vendors",
              cta: "تعرّف عليهم",
            },
          ].map((box, i) => (
            <div key={i} className={`${box.bg} rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow overflow-hidden relative`}>
              <h3 className="font-black text-sm text-[#021D24] mb-1 leading-tight">{box.title}</h3>
              <p className="text-xs text-gray-500 mb-3">{box.sub}</p>
              <div className="relative w-full h-48 rounded-lg overflow-hidden mb-3">
                <Image src={box.img} alt={box.title} fill className="object-cover" />
              </div>
              <Link
                href={box.href}
                className="text-xs font-bold hover:underline"
                style={{ color: box.accent }}
              >
                {box.cta}
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
