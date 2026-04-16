"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { name: "الإلكترونيات والموبايل", icon: "smartphone", id: "electronics" },
  { name: "الأزياء والملابس", icon: "checkroom", id: "fashion" },
  { name: "المنزل والمطبخ", icon: "kitchen", id: "home" },
  { name: "الجمال والعناية", icon: "face", id: "beauty" },
  { name: "أحدث العروض", icon: "bolt", id: "offers" }
];

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1400",
    "https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?auto=format&fit=crop&q=80&w=1400",
    "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=1400",
  ];

  return (
    <section className="bg-white pt-[100px] md:pt-[180px] pb-12 overflow-hidden">
      <div className="responsive-container lg:grid lg:grid-cols-12 gap-8">
        
        {/* 1. Category Sidebar */}
        <div className="lg:col-span-3 hidden xl:block">
           <div className="bg-white border border-border rounded-[2.5rem] overflow-hidden flex flex-col h-full shadow-sm">
              <div className="bg-[#011216] text-white px-8 py-6 flex items-center justify-between font-black text-xs uppercase tracking-widest">
                 أقـسـام مرسال <span className="material-symbols-rounded">segment</span>
              </div>
              <div className="flex flex-col py-4">
                 {categories.map((cat, i) => (
                    <Link 
                     key={i} 
                     href={`/category/${cat.id}`}
                     className="group flex items-center justify-between px-8 py-4 hover:bg-muted transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <span className="material-symbols-rounded text-xl text-[#011216]/20 group-hover:text-[#1089A4] transition-colors">{cat.icon}</span>
                        <span className="text-sm font-bold text-[#011216]/60 group-hover:text-[#011216] transition-colors">{cat.name}</span>
                      </div>
                      <span className="material-symbols-rounded text-[#011216]/10 text-sm">chevron_left</span>
                    </Link>
                 ))}
              </div>
              <div className="mt-auto p-8 border-t border-border">
                 <Link href="/shop" className="text-[10px] font-black uppercase text-[#1089A4] flex items-center justify-between group">
                    استعرض المتجر <span className="material-symbols-rounded group-hover:translate-x-[-5px] transition-all">trending_flat</span>
                 </Link>
              </div>
           </div>
        </div>

        {/* 2. Main Hero Viewport */}
        <div className="lg:col-span-12 xl:col-span-9">
           <div className="relative h-[400px] md:h-[600px] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden bg-[#011216] shadow-2xl group border-[8px] md:border-[12px] border-white ring-1 ring-border">
              
              <AnimatePresence mode="wait">
                 <motion.div 
                   key={activeSlide}
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   transition={{ duration: 0.8 }}
                   className="absolute inset-0"
                 >
                    <Image src={heroImages[activeSlide]} alt="Hero" fill className="object-cover opacity-60" priority />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-transparent" />
                 </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-10">
                 <span className="text-[#F29124] text-[10px] font-black uppercase tracking-[0.4em] mb-4">Elite Marketplace</span>
                 <h1 className="text-[clamp(1.5rem,6vw,4rem)] font-black text-white leading-tight mb-8 font-heading max-w-3xl tracking-tighter">
                    تسوق برفاهية <br /> <span className="text-[#1089A4]">في قلب السودان</span>
                 </h1>
                 
                 <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xl">
                    <Link href="/shop" className="w-full sm:flex-1 btn-primary py-5 text-xs">
                       تـسـوق الآن <span className="material-symbols-rounded">trending_flat</span>
                    </Link>
                    <Link href="/offers" className="w-full sm:flex-1 bg-white/10 backdrop-blur-md text-white border border-white/20 py-5 rounded-2xl font-black text-xs hover:bg-white hover:text-[#011216] transition-all flex items-center justify-center gap-3">
                       أحدث العروض <span className="material-symbols-rounded text-[#F29124]">bolt</span>
                    </Link>
                 </div>
              </div>

              {/* Slider Dots */}
              <div className="absolute bottom-10 left-10 z-30 flex gap-2">
                 {heroImages.map((_, i) => (
                    <button 
                     key={i} 
                     onClick={() => setActiveSlide(i)}
                     className={cn(
                       "h-1.5 transition-all duration-500 rounded-full",
                       activeSlide === i ? "w-8 bg-[#1089A4]" : "w-3 bg-white/20"
                     )}
                    />
                 ))}
              </div>
           </div>

           {/* Quick Sub Banners */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <Link href="/category/fashion" className="group h-[200px] rounded-[2.5rem] overflow-hidden relative border-4 border-white shadow-lg ring-1 ring-border">
                 <Image src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800" alt="Banner" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                 <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <h4 className="text-xl font-black text-white leading-none font-heading">مجموعة الأزياء</h4>
                    <p className="text-[9px] font-black text-white/50 uppercase tracking-widest mt-2">أرقى الماركات العالمية</p>
                 </div>
              </Link>
              <Link href="/category/electronics" className="group h-[200px] rounded-[2.5rem] overflow-hidden relative border-4 border-white shadow-lg ring-1 ring-border">
                 <Image src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800" alt="Banner" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-x-0 inset-y-0 bg-[#011216]/50 group-hover:bg-[#011216]/30 transition-colors" />
                 <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <h4 className="text-xl font-black text-white leading-none font-heading">تكنولوجيا المستقبل</h4>
                    <p className="text-[9px] font-black text-white/50 uppercase tracking-widest mt-2">عالم الموبايلات واللابتوبات</p>
                 </div>
              </Link>
           </div>
        </div>
      </div>
    </section>
  );
}
