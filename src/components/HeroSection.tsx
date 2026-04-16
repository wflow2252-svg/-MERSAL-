"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { name: "الإلكترونيات والموبايل", icon: "smartphone", color: "from-blue-500/10 to-transparent", id: "electronics" },
  { name: "الأزياء والملابس", icon: "checkroom", color: "from-pink-500/10 to-transparent", id: "fashion" },
  { name: "المنزل والمطبخ", icon: "kitchen", color: "from-orange-500/10 to-transparent", id: "home" },
  { name: "الجمال والعناية", icon: "face", color: "from-purple-500/10 to-transparent", id: "beauty" },
  { name: "ألعاب الأطفال", icon: "sports_esports", color: "from-green-500/10 to-transparent", id: "toys" },
  { name: "الرياضة واللياقة", icon: "fitness_center", color: "from-red-500/10 to-transparent", id: "sports" },
  { name: "كتب وقرطاسية", icon: "menu_book", color: "from-yellow-500/10 to-transparent", id: "books" },
  { name: "قطع الغيار", icon: "car_repair", color: "from-gray-500/10 to-transparent", id: "automotive" }
];

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200", // High-end Gaming Laptop/Tech
    "https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?auto=format&fit=crop&q=80&w=1200", // Premium Watch/Tech
    "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=1200", // Modern Electronics Display
  ];

  return (
    <section className="bg-white py-8 md:py-12 pt-24 md:pt-44 kill-scroll">
      <div className="responsive-container flex flex-col lg:grid lg:grid-cols-12 gap-6 md:gap-12">
        
        {/* 1. Category Sidebar - Pixel-Perfect Motta Architecture */}
        <div className="lg:col-span-3 glass rounded-[4rem] border-4 border-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] overflow-hidden hidden lg:flex flex-col h-full min-h-[850px] relative z-20">
          <div className="bg-[#1089A4] text-white px-12 py-9 flex items-center justify-between font-black text-[12px] uppercase border-b-4 border-black/10">
            كـافـة الأقـسـام <span className="material-symbols-rounded text-2xl">segment</span>
          </div>
          <div className="flex flex-col py-6 overflow-y-auto scrollbar-hide">
            {categories.map((cat, i) => (
              <Link 
                key={i} 
                href={`/category/${cat.id}`}
                className="group flex items-center justify-between px-10 py-5 hover:bg-[#1089A4]/5 transition-all relative border-b border-border/5"
              >
                <div className="flex items-center gap-6">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all text-[#1089A4] bg-muted/40 border border-white shadow-sm")}>
                    <span className="material-symbols-rounded text-2xl">{cat.icon}</span>
                  </div>
                  <span className="text-[14px] font-black text-[#021D24]/60 group-hover:text-[#1089A4] transition-colors uppercase">{cat.name}</span>
                </div>
                {/* Chevron Left for RTL */}
                <span className="material-symbols-rounded text-[#021D24]/10 group-hover:text-[#F29124] group-hover:translate-x-[-8px] transition-all text-sm">chevron_left</span>
                <div className="absolute inset-y-2 left-0 w-1 bg-[#F29124] opacity-0 group-hover:opacity-100 transition-all rounded-r-lg" />
              </Link>
            ))}
          </div>
          <div className="mt-auto p-12 bg-muted/20 border-t-2 border-white/50 group cursor-pointer">
             <Link href="/shop" className="text-[11px] font-black uppercase text-[#F29124] flex items-center justify-between">
                استعرض المتجر الشامل <span className="material-symbols-rounded group-hover:translate-x-[-12px] transition-transform">trending_flat</span>
             </Link>
          </div>
        </div>

        {/* 2. Main Hero Viewport - Motta 1:1 Masterpiece */}
        <div className="lg:col-span-9 space-y-8 md:space-y-12">
          <div className="relative h-[500px] md:h-[850px] rounded-[3rem] md:rounded-[5rem] overflow-hidden bg-[#021D24] shadow-2xl group border-[8px] md:border-[20px] border-white ring-2 ring-border/10">
            {/* Background Texture & Glow */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/80 to-transparent z-10" />
            <div className="absolute inset-0 opacity-20 pointer-events-none">
               <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-[#1089A4] blur-[300px] rounded-full" />
               <div className="absolute bottom-[10%] left-[10%] w-[600px] h-[600px] bg-[#F29124] blur-[250px] rounded-full" />
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeSlide}
                initial={{ opacity: 0, scale: 1.15 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image 
                  src={heroImages[activeSlide]} 
                  alt="Hero Product" 
                  fill 
                  className="object-cover opacity-70 transition-transform duration-[15000ms] group-hover:scale-110"
                  priority
                />
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4 md:px-32">
                <p className="text-[#F29124] text-[9px] md:text-xs font-black uppercase tracking-[0.5em] mb-4 md:mb-8 animate-fade-in">Mersal Elite Luxury</p>
                <h1 className="text-[clamp(2.2rem,10vw,6.5rem)] font-black text-white tracking-tighter mb-6 md:mb-12 leading-[1.05] md:leading-none font-heading max-w-6xl">
                   اختر التميز مع مرسال
                </h1>
                <p className="text-white/40 text-[10px] md:text-lg max-w-2xl mb-6 md:mb-16 leading-relaxed font-black uppercase tracking-widest hidden xs:block">
                   نحن نجمع لك نخبة الموردين المعتمدين لنقدم لك تجربة تسوق تفوق التوقعات، بضمان حقيقي وجودة عالمية تصلك أينما كنت.
                </p>
                
                 <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 w-full max-w-4xl">
                    <Link href="/shop" className="w-full sm:flex-1 max-w-[240px] md:max-w-[320px] bg-[#1089A4] text-white px-6 md:px-12 py-4 md:py-8 rounded-[2.5rem] md:rounded-[3rem] font-black text-[10px] md:text-sm uppercase shadow-2xl hover:bg-[#F29124] hover:text-[#021D24] transition-all flex items-center justify-center gap-4 md:gap-6 border-b-4 md:border-b-8 border-black/20 group active:scale-95">
                       تـسـوق الآن <span className="material-symbols-rounded group-hover:rotate-[-45deg] transition-all text-xl md:text-2xl">trending_flat</span>
                    </Link>
                    <Link href="/offers" className="w-full sm:flex-1 max-w-[240px] md:max-w-[320px] bg-white/5 backdrop-blur-3xl text-white border-2 border-white/20 px-6 md:px-12 py-4 md:py-8 rounded-[2.5rem] md:rounded-[3rem] font-black text-[10px] md:text-sm uppercase hover:bg-white hover:text-[#021D24] transition-all flex items-center justify-center gap-4 md:gap-6 group hover:border-white shadow-2xl active:scale-95">
                       عروض حصرية <span className="material-symbols-rounded text-[#F29124] group-hover:scale-125 transition-all text-xl md:text-2xl">bolt</span>
                    </Link>
                 </div>

            </div>

            <div className="absolute bottom-6 md:bottom-12 right-6 md:right-12 z-30 flex gap-2 md:gap-4">
               <button 
                onClick={() => setActiveSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1))}
                className="w-14 h-14 rounded-2xl bg-white text-[#021D24] flex items-center justify-center hover:bg-[#1089A4] hover:text-white transition-all shadow-2xl group border-b-4 border-muted"
               >
                  <span className="material-symbols-rounded text-xl group-hover:scale-110">chevron_right</span>
               </button>
               <button 
                onClick={() => setActiveSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1))}
                className="w-14 h-14 rounded-2xl bg-white text-[#021D24] flex items-center justify-center hover:bg-[#1089A4] hover:text-white transition-all shadow-2xl group border-b-4 border-muted"
               >
                  <span className="material-symbols-rounded text-xl group-hover:scale-110">chevron_left</span>
               </button>
            </div>
          </div>

          {/* Sub Elite Grid - Harmonized Image Banners */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
             <PremiumBanner 
                title="أناقتك الفاخرة" 
                sub="كوليكشن خريف 2024" 
                image="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600"
                icon="styler" 
                id="fashion"
             />
             <PremiumBanner 
                title="أحدث الهواتف" 
                sub="بضمان مرسال الذهبي" 
                image="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=600"
                icon="smartphone" 
                id="electronics"
                dark 
             />
             <PremiumBanner 
                title="أجهزة المطبخ" 
                sub="جودة عالمية مضمونة" 
                image="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600"
                icon="kitchen" 
                id="home"
             />
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
