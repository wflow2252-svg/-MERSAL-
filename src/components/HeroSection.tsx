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
    <section className="bg-white pt-[140px] md:pt-[220px] pb-12 overflow-hidden">
      <div className="responsive-container">
        
        {/* Motta Homepage Layout: Sidebar + Slider */}
        <div className="flex flex-col lg:flex-row-reverse gap-8">
           
           {/* 1. Motta Left Sidebar (RTL Right) */}
           <div className="lg:w-1/4 hidden xl:block">
              <div className="bg-white border border-border rounded-[2rem] overflow-hidden flex flex-col h-full shadow-2xl shadow-primary/5">
                 <div className="bg-[#0B5364] text-white px-10 py-6 flex items-center justify-between font-black text-xs uppercase tracking-[0.2em]">
                    الأقـسـام <span className="material-symbols-rounded">menu</span>
                 </div>
                 <div className="flex flex-col py-4">
                    {categories.map((cat, i) => (
                       <Link 
                        key={i} 
                        href={`/category/${cat.id}`}
                        className="group flex items-center justify-between px-10 py-4 hover:bg-muted/50 transition-all border-b border-border/10 last:border-0"
                       >
                         <div className="flex items-center gap-5">
                            <span className="material-symbols-rounded text-lg text-primary/10 group-hover:text-accent transition-colors">{cat.icon}</span>
                            <span className="text-sm font-bold text-primary/60 group-hover:text-primary transition-colors">{cat.name}</span>
                         </div>
                         <span className="material-symbols-rounded text-sm opacity-10 group-hover:opacity-40 group-hover:text-secondary">chevron_left</span>
                       </Link>
                    ))}
                 </div>
                 <div className="mt-auto p-10 border-t border-border/10 bg-muted/20">
                    <Link href="/shop" className="text-[10px] font-black uppercase text-accent flex items-center justify-between group">
                       اكتشف كافة الفئات <span className="material-symbols-rounded text-lg group-hover:translate-x-[-8px] transition-transform">trending_flat</span>
                    </Link>
                 </div>
              </div>
           </div>

           {/* 2. Main High-Impact Slider */}
           <div className="flex-grow">
              <div className="relative h-[450px] md:h-[650px] rounded-[3rem] md:rounded-[4rem] overflow-hidden bg-[#0B5364] shadow-2xl shadow-primary/20 border-[10px] md:border-[16px] border-white ring-1 ring-border group">
                 
                 <AnimatePresence mode="wait">
                    <motion.div 
                      key={activeSlide}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="absolute inset-0"
                    >
                       <Image src={heroImages[activeSlide]} alt="Hero" fill className="object-cover opacity-60" priority />
                       <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-transparent to-transparent" />
                    </motion.div>
                 </AnimatePresence>

                 <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-10 md:px-20">
                    <motion.div 
                      key={`content-${activeSlide}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-10"
                    >
                       <span className="text-secondary text-[11px] font-black uppercase tracking-[0.5em] block mb-4">Elite Choice 2024</span>
                       <h1 className="text-[clamp(2rem,7vw,4.8rem)] font-black text-white leading-[1.1] font-heading max-w-4xl tracking-tighter">
                          سوق النخبة السوداني <br /> <span className="text-accent text-gradient">بين يديك الآن</span>
                       </h1>
                       
                       <div className="flex flex-col sm:flex-row items-center gap-6 justify-center pt-8">
                          <Link href="/shop" className="motta-btn-secondary py-6 md:py-8 px-14 text-sm group">
                             تـسـوق الآن <span className="material-symbols-rounded">trending_flat</span>
                          </Link>
                          <Link href="/offers" className="bg-white/10 backdrop-blur-xl text-white border border-white/20 py-6 md:py-8 px-14 rounded-[2rem] font-black text-sm uppercase hover:bg-white hover:text-primary transition-all">
                             أحدث العروض
                          </Link>
                       </div>
                    </motion.div>
                 </div>

                 {/* Custom Motta Slider Dots */}
                 <div className="absolute bottom-12 left-12 z-30 flex gap-4">
                    {heroImages.map((_, i) => (
                       <button 
                        key={i} 
                        onClick={() => setActiveSlide(i)}
                        className={cn(
                          "h-2 transition-all duration-700 rounded-full",
                          activeSlide === i ? "w-16 bg-accent" : "w-4 bg-white/20 hover:bg-white/40"
                        )}
                       />
                    ))}
                 </div>
              </div>

              {/* Discovery Banners (Motta Pattern) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                 <div className="group relative h-[220px] rounded-[3rem] overflow-hidden border-[8px] border-white shadow-xl ring-1 ring-border">
                    <Image src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800" alt="Banner" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-all" />
                    <div className="absolute inset-0 p-10 flex flex-col justify-end text-right">
                       <h4 className="text-3xl font-black text-white font-heading leading-tight">عالم الأزياء</h4>
                       <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mt-2">تسوق أرقى العلامات</p>
                    </div>
                 </div>
                 <div className="group relative h-[220px] rounded-[3rem] overflow-hidden border-[8px] border-white shadow-xl ring-1 ring-border">
                    <Image src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800" alt="Banner" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-all" />
                    <div className="absolute inset-0 p-10 flex flex-col justify-end text-right">
                       <h4 className="text-3xl font-black text-white font-heading leading-tight">ركن الإلكترونيات</h4>
                       <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mt-2">تكنولوجيا الغد اليوم</p>
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </section>
  );
}
