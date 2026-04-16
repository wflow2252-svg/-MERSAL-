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
    <section className="bg-background pt-48 pb-20 overflow-hidden relative">
      
      {/* Background Atmosphere Layers */}
      <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="responsive-container relative z-10">
         <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* The Sovereign Canvas (Right/Text Side - RTL) */}
            <div className="flex-1 space-y-10 text-right order-2 lg:order-1 mt-12 lg:mt-0">
               <div className="inline-flex items-center gap-4 bg-primary/5 border border-primary/10 rounded-full px-6 py-3 shadow-[0_10px_30px_rgba(3,141,177,0.05)]">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                  </span>
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">الإصدار النخبوي حصرياً</span>
               </div>
               
               <h1 className="text-6xl md:text-8xl xl:text-[7rem] font-black tracking-tighter text-primary leading-[1] font-heading">
                  سيادة <br />
                  <span className="text-secondary relative outline-text block mt-4">
                    التسوق
                    <svg className="absolute w-[120%] h-auto -bottom-4 right-[-10%] text-primary/10 -z-10 animate-pulse" viewBox="0 0 200 40" fill="none">
                       <path d="M5 35 Q 100 0 195 35" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                    </svg>
                  </span>
               </h1>
               
               <p className="text-lg md:text-2xl text-primary/60 font-bold max-w-xl ml-auto leading-[1.8]">
                  متجر مرسال يتجاوز مفهوم التجارة التقليدية، ليقدم لك تجربة تسوق غامرة تعكس شموخ وتفرد علامتك التجارية في السودان.
               </p>
               
               <div className="flex flex-col sm:flex-row items-center gap-6 justify-end pt-8">
                  <Link href="/shop" className="w-full sm:w-auto px-12 py-6 rounded-[2rem] bg-primary text-white font-black text-xs uppercase tracking-[0.3em] hover:bg-secondary hover:shadow-[0_20px_40px_rgba(245,149,37,0.3)] transition-all flex items-center justify-center gap-4 group">
                     اكتشف النخبة <span className="material-symbols-rounded group-hover:-translate-x-2 transition-transform">arrow_back</span>
                  </Link>
                  <Link href="/vendor/register" className="w-full sm:w-auto px-12 py-6 rounded-[2rem] bg-white border-2 border-primary/10 block text-primary font-black text-xs uppercase tracking-[0.3em] hover:border-primary transition-all text-center">
                     انضم كمورد
                  </Link>
               </div>
               
               <div className="flex items-center justify-end gap-12 pt-12 border-t border-primary/5 mt-12">
                  <div className="text-right">
                     <span className="block text-3xl font-black text-primary mb-1">2.4k+</span>
                     <span className="text-[9px] text-primary/40 font-black uppercase tracking-widest">منتج فاخر</span>
                  </div>
                  <div className="w-px h-12 bg-primary/10" />
                  <div className="text-right">
                     <span className="block text-3xl font-black text-primary mb-1">99%</span>
                     <span className="text-[9px] text-primary/40 font-black uppercase tracking-widest">رضا العملاء</span>
                  </div>
               </div>
            </div>

            {/* The Levitating Showcase (Left/Image Side - RTL) */}
            <div className="flex-1 w-full relative order-1 lg:order-2 perspective-1000">
               <div className="relative w-[90%] md:w-[80%] mx-auto lg:mr-auto lg:ml-0 aspect-[4/5] rounded-[3rem] overflow-hidden group shadow-[0_40px_100px_rgba(3,141,177,0.2)] preserve-3d rotate-y-[-5deg] hover:rotate-y-0 transition-transform duration-1000">
                  <Image 
                     src={heroImages[activeSlide]} 
                     alt="Hero Showcase" 
                     fill 
                     className="object-cover scale-110 group-hover:scale-100 transition-transform duration-[2s] ease-out-expo" 
                     priority 
                  />
                  
                  {/* Floating Action Badge */}
                  <div className="absolute top-12 left-12 w-24 h-24 bg-white/10 backdrop-blur-3xl rounded-full border border-white/20 flex flex-col items-center justify-center text-white rotate-12 group-hover:rotate-0 transition-transform duration-700 shadow-2xl">
                     <span className="text-2xl font-black">NEW</span>
                     <span className="text-[8px] uppercase tracking-widest font-black">Arrivals</span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#021D24] via-transparent to-transparent flex flex-col justify-end p-12">
                     <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2rem] flex justify-between items-end translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                        <div className="text-right">
                           <h3 className="text-white font-black text-2xl mb-2">أحدث الإصدارات</h3>
                           <p className="text-white/60 text-xs font-bold">متوفرة الآن للطلب المسبق بالتشفير السيادي.</p>
                        </div>
                        <button className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-primary hover:bg-secondary hover:text-white hover:scale-110 transition-all shadow-xl">
                           <span className="material-symbols-rounded text-xl">east</span>
                        </button>
                     </div>
                  </div>
               </div>
               
               {/* Decorative Orbital Elements */}
               <div className="absolute top-[20%] right-[-5%] w-32 h-32 bg-secondary rounded-[2rem] -z-10 rotate-12 flex items-center justify-center shadow-lg hover:rotate-[24deg] transition-transform duration-500">
                  <span className="material-symbols-rounded text-white/50 text-6xl transform -scale-x-100">diamond</span>
               </div>
               
               {/* Controls */}
               <div className="absolute -left-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                  {heroImages.map((_, i) => (
                     <button 
                        key={i} 
                        onClick={() => setActiveSlide(i)}
                        className={cn(
                           "flex items-center justify-center rounded-full transition-all duration-500 group/btn bg-white shadow-xl shadow-primary/10 border border-primary/5",
                           activeSlide === i ? "w-14 h-14" : "w-10 h-10 hover:w-12 hover:h-12"
                        )}
                     >
                        <span className={cn(
                           "w-3 h-3 rounded-full transition-all duration-500",
                           activeSlide === i ? "bg-secondary scale-100" : "bg-primary/20 group-hover/btn:bg-primary/40 scale-75"
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
