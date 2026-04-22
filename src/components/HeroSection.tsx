"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    bg: "from-[#F29124]/90 to-[#D97B10]",
    tag: "📢 مساحة إعلانية",
    title: "أعـلـن هـنـا",
    subtitle: "احجز مساحتك",
    desc: "عزز مبيعاتك واعرض منتجاتك لآلاف الزوار يومياً على منصة ناجز.",
    cta: "تواصل معنا للإعلان",
    ctaHref: "/contact",
    sub: "تفاصيل الباقات",
    subHref: "/vendor/register",
    img: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=1200",
    badge: "مميز",
  },
  {
    bg: "from-[#0C3547] to-[#021D24]",
    tag: "📦 توصيل خلال 24 ساعة",
    title: "إلكترونيات",
    subtitle: "بأفضل الأسعار في السودان",
    desc: "موبايلات، لابتوبات، إكسسوارات — كل ما تحتاج بضغطة زر",
    cta: "استعرض الإلكترونيات",
    ctaHref: "/category/electronics",
    sub: "اكتشف المزيد",
    subHref: "/shop",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
    badge: "خصم يصل 40%",
  },
  {
    bg: "from-[#2C1810] to-[#021D24]",
    tag: "👗 أزياء السودان",
    title: "الموضة الجديدة",
    subtitle: "وصلت لناجز",
    desc: "أحدث صيحات الأزياء من أفضل المتاجر في السودان",
    cta: "تسوّق الأزياء",
    ctaHref: "/category/fashion",
    sub: "عرض كل الملابس",
    subHref: "/shop",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    badge: "مجموعة جديدة",
  },
];

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  // Auto-slide
  useEffect(() => {
    const t = setInterval(() => changeSlide((active + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, [active]);

  const changeSlide = (idx: number) => {
    setTransitioning(true);
    setTimeout(() => { setActive(idx); setTransitioning(false); }, 250);
  };

  const s = SLIDES[active];

  return (
    <section className="w-full pt-[96px]" dir="rtl">

      {/* ── MAIN HERO BANNER ─────────────────────────────── */}
      <div className={cn("relative h-[320px] md:h-[420px] lg:h-[480px] bg-gradient-to-l overflow-hidden transition-all duration-500", s.bg)}>

        {/* Background image */}
        <div className={cn("absolute inset-0 transition-opacity duration-500", transitioning ? "opacity-0" : "opacity-100")}>
          <Image
            src={s.img}
            alt={s.title}
            fill
            className="object-cover opacity-20 mix-blend-overlay"
            priority
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#021D24]/30 via-transparent to-[#021D24]/80" />

        {/* Content */}
        <div className={cn("absolute inset-0 flex items-center max-w-[1600px] mx-auto px-6 lg:px-12 transition-all duration-300", transitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0")}>
          <div className="max-w-2xl">
            <span className="inline-block bg-[#F29124] text-white text-xs font-black px-3 py-1 rounded mb-4">
              {s.tag}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-2">
              {s.title} <span className="text-[#F29124]">{s.subtitle}</span>
            </h1>
            <p className="text-sm md:text-base text-white/70 mb-6 max-w-lg">{s.desc}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={s.ctaHref}
                className="bg-[#F29124] hover:bg-[#D97B10] text-white px-6 py-3 rounded font-black text-sm transition-colors inline-flex items-center gap-2"
              >
                {s.cta}
                <span className="material-symbols-rounded text-base">arrow_back</span>
              </Link>
              <Link
                href={s.subHref}
                className="bg-white/10 hover:bg-white/20 backdrop-blur text-white border border-white/30 px-6 py-3 rounded font-bold text-sm transition-colors"
              >
                {s.sub}
              </Link>
            </div>
          </div>
        </div>

        {/* Badge top-left */}
        <div className="absolute top-6 left-6 bg-[#F29124] text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg">
          {s.badge}
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => changeSlide(i)}
              className={cn("h-1.5 rounded-full transition-all duration-300", i === active ? "w-8 bg-[#F29124]" : "w-4 bg-white/30")}
            />
          ))}
        </div>

        {/* Arrow Navigation */}
        <button
          onClick={() => changeSlide((active - 1 + SLIDES.length) % SLIDES.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full border border-white/20 flex items-center justify-center transition-all"
        >
          <span className="material-symbols-rounded">chevron_right</span>
        </button>
        <button
          onClick={() => changeSlide((active + 1) % SLIDES.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full border border-white/20 flex items-center justify-center transition-all"
        >
          <span className="material-symbols-rounded">chevron_left</span>
        </button>
      </div>

      {/* ── FEATURE STRIPS (Amazon-style deal banners) ──── */}
      <div className="bg-[#F3F4F6] border-b border-gray-200">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-3 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: "local_shipping", text: "شحن سريع", sub: "خلال 24–48 ساعة" },
            { icon: "verified",       text: "موردون موثوقون", sub: "معتمدون من ناجز" },
            { icon: "payments",       text: "دفع آمن",   sub: "عند الاستلام أو تحويل" },
            { icon: "support_agent",  text: "دعم 24/7",  sub: "فريقنا دايماً معاك" },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
              <span className="material-symbols-rounded text-2xl text-[#1089A4]">{f.icon}</span>
              <div>
                <p className="text-xs font-black text-[#021D24]">{f.text}</p>
                <p className="text-[10px] text-gray-400">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
