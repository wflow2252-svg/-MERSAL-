"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1400", // Headphones 
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1400", // Watch
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1400", // High End Sneaker
  ];

  return (
    <section className="bg-background pt-40 pb-20 overflow-hidden relative">
      
      {/* Background Atmosphere Layers */}
      <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="responsive-container relative z-10">
         <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* The Sovereign Canvas */}
            <div className="flex-1 space-y-6 md:space-y-8 text-right order-2 lg:order-1 mt-6 lg:mt-0">
               <div className="inline-flex items-center gap-3 md:gap-4 bg-primary/5 border border-primary/10 rounded-xl md:rounded-2xl px-4 py-2 md:px-5 md:py-2.5">
                  <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-secondary"></span>
                  </span>
                  <span className="text-[10px] md:text-[12px] font-bold text-primary uppercase tracking-[0.2em]">الإصدار النخبوي حصرياً</span>
               </div>
               
               <h1 className="text-4xl md:text-7xl xl:text-8xl font-black tracking-tight text-foreground leading-[1.15] md:leading-[1.1] font-heading pr-2 md:pr-0">
                  سيادة <br />
                  <span className="text-secondary relative block mt-1 md:mt-2">
                    التسوق.
                  </span>
               </h1>
               
               <p className="text-md md:text-xl text-foreground/60 font-medium max-w-xl ml-auto leading-[1.6] md:leading-[1.7] px-2 md:px-0">
                  متجر مرسال يتجاوز مفهوم التجارة التقليدية، ليقدم لك تجربة تسوق غامرة تعكس شموخ وتفرد علامتك التجارية في السودان.
               </p>
               
               <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-5 justify-end pt-4 md:pt-6 px-2 md:px-0">
                  <Link href="/shop" className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl bg-primary text-white font-bold text-xs md:text-sm uppercase tracking-widest hover:bg-accent hover:shadow-xl transition-all flex items-center justify-center gap-4 group">
                     اكتشف النخبة <span className="material-symbols-rounded group-hover:-translate-x-2 transition-transform">arrow_back</span>
                  </Link>
                  <Link href="/vendor/register" className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl bg-white border-2 border-border text-foreground font-bold text-xs md:text-sm uppercase tracking-widest hover:border-primary transition-all text-center">
                     انضم كمورد
                  </Link>
               </div>
               
               <div className="flex items-center justify-end gap-6 md:gap-10 pt-8 md:pt-10 border-t border-border mt-8 md:mt-10 mx-2 md:mx-0">
                  <div className="text-right">
                     <span className="block text-2xl md:text-3xl font-black text-primary mb-0.5 md:mb-1">2.4k+</span>
                     <span className="text-[10px] md:text-[11px] text-foreground/40 font-bold uppercase tracking-widest">منتج فاخر</span>
                  </div>
                  <div className="w-px h-8 md:h-10 bg-border" />
                  <div className="text-right">
                     <span className="block text-2xl md:text-3xl font-black text-primary mb-0.5 md:mb-1">99%</span>
                     <span className="text-[10px] md:text-[11px] text-foreground/40 font-bold uppercase tracking-widest">رضا العملاء</span>
                  </div>
               </div>
            </div>

            {/* The Levitating Showcase */}
            <div className="flex-1 w-full relative order-1 lg:order-2 px-2 md:px-0">
               <div className="relative w-full md:w-[85%] mx-auto lg:mr-auto lg:ml-0 aspect-[4/5] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group shadow-elite-xl">
                  <Image 
                     src={heroImages[activeSlide]} 
                     alt="Hero Showcase" 
                     fill 
                     className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s] ease-out-expo" 
                     priority 
                  />
                  
                  {/* Floating Action Badge - Adjusted for mobile position */}
                  <div className="absolute top-6 left-6 md:top-10 md:left-10 w-16 h-16 md:w-24 md:h-24 bg-white/10 backdrop-blur-3xl rounded-full border border-white/20 flex flex-col items-center justify-center text-white rotate-12 group-hover:rotate-0 transition-transform duration-700 shadow-2xl z-20">
                     <span className="text-md md:text-2xl font-black">جديد</span>
                     <span className="text-[7px] md:text-[9px] uppercase tracking-widest font-bold">وصل الآن</span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent flex flex-col justify-end p-6 md:p-10">
                     <div className="bg-white/10 backdrop-blur-3xl border border-white/10 p-6 md:p-12 rounded-2xl md:rounded-3xl flex justify-between items-end translate-y-4 md:translate-y-0 md:opacity-0 group-hover:md:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-100">
                        <div className="text-right">
                           <h3 className="text-white font-black text-lg md:text-xl mb-1">أحدث الإصدارات</h3>
                           <p className="text-white/60 text-[11px] md:text-[13px] font-medium max-w-[200px] md:max-w-none">متوفرة الآن للطلب المسبق بالتشفير السيادي.</p>
                        </div>
                        <button className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-primary hover:bg-secondary hover:text-white hover:scale-110 transition-all shadow-xl">
                           <span className="material-symbols-rounded text-lg md:text-xl">east</span>
                        </button>
                     </div>
                  </div>
               </div>
               
               {/* Controls - Adjusted for mobile padding */}
               <div className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 md:gap-4 z-30">
                  {heroImages.map((_, i) => (
                     <button 
                        key={i} 
                        onClick={() => setActiveSlide(i)}
                        className={cn(
                           "flex items-center justify-center rounded-full transition-all duration-500 bg-white shadow-lg border border-border",
                           activeSlide === i ? "w-10 h-10 md:w-12 md:h-12" : "w-7 h-7 md:w-8 md:h-8 hover:w-9 hover:h-9 md:hover:w-10 md:hover:h-10"
                        )}
                     >
                        <span className={cn(
                           "w-2 md:w-2.5 h-2 md:h-2.5 rounded-full transition-all duration-500",
                           activeSlide === i ? "bg-secondary scale-100" : "bg-primary/20 scale-75"
                        )} />
                     </button>
                  ))}
               </div>
            </div>

         </div>
      </div>
    </section>
  );
}

