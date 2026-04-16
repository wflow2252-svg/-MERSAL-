"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const categories = [
  { name: "الإلكترونيات", icon: "smartphone", id: "electronics", count: "1.2k" },
  { name: "الأزياء", icon: "checkroom", id: "fashion", count: "800+" },
  { name: "المنزل", icon: "kitchen", id: "home", count: "500" },
  { name: "الجمال", icon: "face", id: "beauty", count: "300" },
  { name: "الألعاب", icon: "toys", id: "toys", count: "150" },
  { name: "العروض", icon: "bolt", id: "offers", count: "HOT" }
];

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1400",
    "https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?auto=format&fit=crop&q=80&w=1400",
  ];

  return (
    <section className="bg-white py-12">
      <div className="responsive-container flex flex-col lg:flex-row gap-6">
        
        {/* World Class Category Sidebar */}
        <div className="lg:w-1/4 hidden lg:block">
          <div className="bg-white border-2 border-border/5 rounded-[2rem] overflow-hidden shadow-elite-lg h-full">
             <div className="bg-primary p-6 text-white">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] flex items-center gap-3">
                   <span className="material-symbols-rounded text-lg">grid_view</span> جميع الأمثلة
                </h3>
             </div>
             <div className="flex flex-col">
                {categories.map((cat) => (
                  <Link key={cat.id} href={`/category/${cat.id}`} className="flex items-center justify-between px-8 py-5 hover:bg-muted transition-all border-b border-border/10 last:border-0 group">
                     <div className="flex items-center gap-5">
                        <span className="material-symbols-rounded text-primary/20 group-hover:text-primary transition-colors">{cat.icon}</span>
                        <span className="text-sm font-bold text-primary/70">{cat.name}</span>
                     </div>
                     <span className={cn(
                        "text-[9px] font-black px-2 py-1 rounded-md",
                        cat.count === "HOT" ? "bg-secondary/10 text-secondary" : "bg-muted text-primary/30"
                     )}>{cat.count}</span>
                  </Link>
                ))}
             </div>
          </div>
        </div>

        {/* Bento Grid Hub */}
        <div className="lg:w-3/4 flex flex-col gap-6">
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Main Slider (2/3 width) */}
              <div className="md:col-span-2 relative h-[400px] md:h-[550px] rounded-[2.5rem] overflow-hidden group shadow-elite-xl">
                 <Image src={heroImages[activeSlide]} alt="Hero" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" priority />
                 <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
                 
                 <div className="absolute inset-0 flex flex-col justify-center p-12 md:p-16">
                    <span className="text-secondary font-black text-[10px] uppercase tracking-[0.5em] mb-4">حصرياً في مرسال</span>
                    <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-8 max-w-lg tracking-tighter">اكتشف ريادة <br /> <span className="text-gradient">التكنولوجيا</span> العالمية</h2>
                    <div className="flex gap-4">
                       <Link href="/shop" className="btn-primary">اكتشف الآن</Link>
                       <Link href="/offers" className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all">
                          <span className="material-symbols-rounded">navigate_before</span>
                       </Link>
                    </div>
                 </div>

                 <div className="absolute bottom-8 right-12 flex gap-3">
                    {heroImages.map((_, i) => (
                       <button key={i} onClick={() => setActiveSlide(i)} className={cn(
                          "h-1.5 rounded-full transition-all duration-500",
                          activeSlide === i ? "w-10 bg-secondary" : "w-4 bg-white/30"
                       )} />
                    ))}
                 </div>
              </div>

              {/* Side Promos (1/3 width stacked) */}
              <div className="md:col-span-1 flex flex-col gap-6">
                 
                 <div className="flex-1 bg-accent rounded-[2.5rem] p-10 relative overflow-hidden group shadow-elite-lg">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full" />
                    <div className="relative z-10">
                       <span className="text-white/40 text-[9px] font-black uppercase tracking-widest block mb-2">عرض محدود</span>
                       <h3 className="text-2xl font-black text-white leading-tight">سماعات النخبة <br /> بخصم 40%</h3>
                       <Link href="/shop" className="mt-6 inline-flex items-center gap-2 text-white font-black text-[10px] uppercase tracking-widest hover:gap-4 transition-all">
                          تسوق العرض <span className="material-symbols-rounded text-sm">arrow_back</span>
                       </Link>
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-32 h-32 opacity-20 group-hover:scale-125 transition-all duration-700">
                       <span className="material-symbols-rounded text-white text-[120px]">headset</span>
                    </div>
                 </div>

                 <div className="flex-1 bg-muted rounded-[2rem] p-10 relative overflow-hidden group border border-border/5">
                    <div className="relative z-10">
                       <h3 className="text-2xl font-black text-primary leading-tight">مجموعة <br /> الشتاء الحصرية</h3>
                       <Link href="/shop" className="mt-4 text-accent font-black text-[10px] uppercase tracking-widest block">شاهد التشكيلة</Link>
                    </div>
                    <div className="absolute -bottom-8 -left-8 w-40 h-40 opacity-5 group-hover:rotate-12 transition-all duration-700">
                       <span className="material-symbols-rounded text-primary text-[150px]">apparel</span>
                    </div>
                 </div>

              </div>

           </div>

        </div>

      </div>
    </section>
  );
}
