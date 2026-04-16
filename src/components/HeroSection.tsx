"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { name: "الإلكترونيات والموبايل", id: "electronics" },
  { name: "الأزياء والملابس", id: "fashion" },
  { name: "المنزل والمطبخ", id: "home" },
  { name: "الجمال والعناية", id: "beauty" }
];

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1400",
    "https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?auto=format&fit=crop&q=80&w=1400",
    "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=1400",
  ];

  return (
    <section className="bg-white pt-[140px] md:pt-[260px] pb-12 overflow-hidden">
      <div className="responsive-container lg:grid lg:grid-cols-12 gap-10">
        
        {/* Sidebar Categories (Motta Pattern) */}
        <div className="lg:col-span-3 hidden xl:block">
           <div className="bg-white border border-border rounded-[2.5rem] overflow-hidden flex flex-col h-full shadow-2xl shadow-primary/5">
              <div className="bg-primary text-white px-10 py-8 flex items-center justify-between font-black text-xs uppercase tracking-[0.3em]">
                 أقـسـام مرسال <span className="material-symbols-rounded">segment</span>
              </div>
              <div className="flex flex-col py-6">
                 {categories.map((cat, i) => (
                    <Link 
                     key={i} 
                     href={`/category/${cat.id}`}
                     className="group flex items-center justify-between px-10 py-5 hover:bg-muted transition-all"
                    >
                      <span className="text-sm font-black text-primary/60 group-hover:text-primary transition-colors uppercase tracking-widest">{cat.name}</span>
                      <span className="material-symbols-rounded text-primary/10 group-hover:text-secondary text-lg">chevron_left</span>
                    </Link>
                 ))}
              </div>
              <div className="mt-auto p-10 bg-muted/40 border-t border-border group cursor-pointer">
                 <Link href="/shop" className="text-[11px] font-black uppercase text-accent flex items-center justify-between">
                    استعراض كافة الأقسام <span className="material-symbols-rounded group-hover:translate-x-[-8px] transition-transform">trending_flat</span>
                 </Link>
              </div>
           </div>
        </div>

        {/* Hero Slider */}
        <div className="lg:col-span-12 xl:col-span-9">
           <div className="relative h-[450px] md:h-[650px] rounded-[3rem] md:rounded-[4rem] overflow-hidden bg-primary shadow-2xl border-[12px] md:border-[20px] border-white ring-1 ring-border group">
              
              <AnimatePresence mode="wait">
                 <motion.div 
                   key={activeSlide}
                   initial={{ opacity: 0, scale: 1.1 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   transition={{ duration: 0.8 }}
                   className="absolute inset-0"
                 >
                    <Image src={heroImages[activeSlide]} alt="Hero" fill className="object-cover opacity-60" priority />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-transparent" />
                 </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-10 md:px-20">
                 <span className="text-secondary text-[11px] font-black uppercase tracking-[0.6em] mb-6">Mersal Elite 2024</span>
                 <h1 className="text-[clamp(2rem,7vw,4.5rem)] font-black text-white leading-tight mb-10 font-heading max-w-4xl tracking-tighter">
                    تسوق برفاهية <br /> <span className="text-accent text-gradient">في قلب السودان</span>
                 </h1>
                 
                 <div className="flex flex-col sm:flex-row items-center gap-6 w-full max-w-xl">
                    <Link href="/shop" className="w-full sm:flex-1 motta-btn-secondary py-6 md:py-8 text-xs group">
                       تـسـوق الآن <span className="material-symbols-rounded group-hover:rotate-[-45deg] transition-all">trending_flat</span>
                    </Link>
                    <Link href="/offers" className="w-full sm:flex-1 bg-white/10 backdrop-blur-xl text-white border border-white/20 py-6 md:py-8 rounded-[2rem] font-black text-xs uppercase hover:bg-white hover:text-primary transition-all flex items-center justify-center gap-4">
                       أحدث العروض <span className="material-symbols-rounded text-secondary">bolt</span>
                    </Link>
                 </div>
              </div>

              {/* Slider Dots */}
              <div className="absolute bottom-12 left-12 z-30 flex gap-4">
                 {heroImages.map((_, i) => (
                    <button 
                     key={i} 
                     onClick={() => setActiveSlide(i)}
                     className={cn(
                       "h-2 transition-all duration-500 rounded-full",
                       activeSlide === i ? "w-12 bg-accent shadow-lg shadow-accent/40" : "w-4 bg-white/20"
                     )}
                    />
                 ))}
              </div>
           </div>

           {/* Mobile Grid Banners */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 md:hidden xl:grid">
              <Link href="/category/fashion" className="group h-[240px] rounded-[3rem] overflow-hidden relative border-[10px] border-white shadow-xl ring-1 ring-border">
                 <Image src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800" alt="Banner" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-colors" />
                 <div className="absolute inset-0 p-10 flex flex-col justify-end">
                    <h4 className="text-2xl font-black text-white leading-none font-heading uppercase tracking-tighter">مجموعة الأزياء</h4>
                    <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em] mt-3">أرقى العلامات التجارية العالمية</p>
                 </div>
              </Link>
              <Link href="/category/electronics" className="group h-[240px] rounded-[3rem] overflow-hidden relative border-[10px] border-white shadow-xl ring-1 ring-border">
                 <Image src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800" alt="Banner" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-colors" />
                 <div className="absolute inset-0 p-10 flex flex-col justify-end text-right">
                    <h4 className="text-2xl font-black text-white leading-none font-heading uppercase tracking-tighter">تكنولوجيا المستقبل</h4>
                    <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em] mt-3">أجهزة الموبايل والحواسب الفاخرة</p>
                 </div>
              </Link>
           </div>
        </div>
      </div>
    </section>
  );
}
