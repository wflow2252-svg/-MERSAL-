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
  { name: "ألعاب الأطفال", icon: "toys", id: "toys" },
  { name: "الرياضة واللياقة", icon: "fitness_center", id: "sports" },
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
    <section className="bg-white pt-[140px] md:pt-[240px] pb-12 overflow-hidden">
      <div className="responsive-container lg:grid lg:grid-cols-12 gap-8">
        
        {/* 1. Motta Strategy Sidebar - Integrated Focus */}
        <div className="lg:col-span-3 hidden xl:block">
           <div className="bg-white border border-border rounded-[2.5rem] overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-[#011216] text-white px-10 py-6 flex items-center justify-between font-extrabold text-sm uppercase">
                 أقـسـام مرسال <span className="material-symbols-rounded">segment</span>
              </div>
              <div className="flex flex-col py-4">
                 {categories.map((cat, i) => (
                   <Link 
                    key={i} 
                    href={`/category/${cat.id}`}
                    className="group flex items-center justify-between px-8 py-4 hover:bg-[#1089A4]/5 transition-all relative"
                   >
                     <div className="flex items-center gap-5">
                       <span className="material-symbols-rounded text-xl text-[#011216]/30 group-hover:text-[#1089A4] transition-colors">{cat.icon}</span>
                       <span className="text-sm font-bold text-[#011216]/60 group-hover:text-[#011216] transition-colors">{cat.name}</span>
                     </div>
                     <span className="material-symbols-rounded text-[#011216]/10 group-hover:text-[#F29124] text-sm">chevron_left</span>
                   </Link>
                 ))}
              </div>
              <div className="mt-auto p-8 bg-muted/30 border-t border-border group cursor-pointer">
                 <Link href="/shop" className="text-[11px] font-extrabold uppercase text-[#1089A4] flex items-center justify-between">
                    استعرض المتجر <span className="material-symbols-rounded group-hover:translate-x-[-8px] transition-transform">trending_flat</span>
                 </Link>
              </div>
           </div>
        </div>

        {/* 2. Main Hero Viewport */}
        <div className="lg:col-span-12 xl:col-span-9">
           <div className="relative h-[450px] md:h-[650px] rounded-[3rem] md:rounded-[4rem] overflow-hidden bg-[#011216] shadow-2xl group border-[10px] md:border-[16px] border-white ring-1 ring-border">
              
              <AnimatePresence mode="wait">
                 <motion.div 
                   key={activeSlide}
                   initial={{ opacity: 0, scale: 1.1 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   transition={{ duration: 0.8, ease: "circOut" }}
                   className="absolute inset-0"
                 >
                    <Image src={heroImages[activeSlide]} alt="Hero" fill className="object-cover opacity-60" priority />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent" />
                 </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-10 md:px-20">
                 <span className="text-[#F29124] text-[10px] md:text-xs font-extrabold uppercase tracking-[0.4em] mb-4">Mersal Marketplace 2024</span>
                 <h1 className="text-[clamp(1.8rem,7vw,4.5rem)] font-extrabold text-white leading-tight mb-8 md:mb-12 font-heading max-w-4xl tracking-tight">
                    تسوق برفاهية <br /> <span className="text-[#1089A4]">في قلب السودان</span>
                 </h1>
                 
                 <div className="flex flex-col sm:flex-row items-center gap-5 w-full max-w-2xl">
                    <Link href="/shop" className="w-full sm:flex-1 btn-motta-primary py-5 md:py-7 rounded-[2rem] text-xs md:text-sm group">
                       تـسـوق الآن <span className="material-symbols-rounded group-hover:rotate-[-45deg] transition-all">trending_flat</span>
                    </Link>
                    <Link href="/offers" className="w-full sm:flex-1 motta-glass text-white px-10 py-5 md:py-7 rounded-[2rem] font-extrabold text-xs md:text-sm uppercase hover:bg-white hover:text-[#011216] transition-all flex items-center justify-center gap-4 group">
                       أحدث العروض <span className="material-symbols-rounded text-[#F29124] group-hover:scale-125 transition-all">bolt</span>
                    </Link>
                 </div>
              </div>

              {/* Slider Dots */}
              <div className="absolute bottom-10 left-10 z-30 flex gap-3">
                 {heroImages.map((_, i) => (
                   <button 
                    key={i} 
                    onClick={() => setActiveSlide(i)}
                    className={cn(
                      "h-1.5 transition-all duration-500 rounded-full",
                      activeSlide === i ? "w-10 bg-[#1089A4]" : "w-4 bg-white/20"
                    )}
                   />
                 ))}
              </div>
           </div>

           {/* Quick Sub Banners */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
              <Link href="/category/fashion" className="group h-[220px] rounded-[3rem] overflow-hidden relative border-8 border-white shadow-lg ring-1 ring-border">
                 <Image src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800" alt="Banner" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                 <div className="absolute inset-0 p-10 flex flex-col justify-end">
                    <h4 className="text-2xl font-extrabold text-white leading-none">مجموعة الأزياء</h4>
                    <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mt-2">تسوق أرقى الماركات العالمية</p>
                 </div>
              </Link>
              <Link href="/category/electronics" className="group h-[220px] rounded-[3rem] overflow-hidden relative border-8 border-white shadow-lg ring-1 ring-border">
                 <Image src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800" alt="Banner" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                 <div className="absolute inset-x-0 inset-y-0 bg-[#011216]/60 group-hover:bg-[#011216]/40 transition-colors" />
                 <div className="absolute inset-0 p-10 flex flex-col justify-end">
                    <h4 className="text-2xl font-extrabold text-white leading-none">تكنولوجيا المستقبل</h4>
                    <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mt-2">عالم الموبايلات واللابتوبات</p>
                 </div>
              </Link>
           </div>
        </div>
      </div>
    </section>
  );
}


function PremiumBanner({ title, sub, image, icon, dark, id }: any) {
   return (
      <Link href={`/category/${id}`} className="group relative h-[280px] md:h-[360px] rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-xl border-[8px] md:border-[14px] border-white transition-all hover:scale-[1.03] cursor-pointer">
         {/* Background Image with Overlay */}
         <Image src={image} alt={title} fill className="object-cover transition-transform duration-[8000ms] group-hover:scale-110" />
         <div className={cn("absolute inset-0 transition-opacity duration-1000", dark ? "bg-orange-600/10" : "bg-teal-600/10")} />
         <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
         
         <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end text-right">
            <div className="relative z-10 space-y-3 md:space-y-4">
               <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-3xl flex items-center justify-center mb-4 md:mb-8 border border-white/20 group-hover:bg-[#F29124] group-hover:text-white transition-all duration-700">
                  <span className="material-symbols-rounded text-2xl md:text-3xl">{icon}</span>
               </div>
               <h4 className="font-black text-xl md:text-3xl text-white tracking-tighter leading-none font-heading group-hover:text-[#F29124] transition-colors">{title}</h4>
               <p className="text-[8px] md:text-[10px] font-black uppercase text-white/30">{sub}</p>
            </div>
         </div>
         <div className="absolute inset-0 border-2 border-white/5 rounded-[3rem] md:rounded-[4rem]" />
      </Link>
   );
}
