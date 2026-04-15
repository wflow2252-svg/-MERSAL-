"use client"

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function StickyCartBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after 800px of scroll (when the main CTA is likely out of view)
      setIsVisible(window.scrollY > 800);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-[60] bg-white/90 backdrop-blur-xl border-t border-border/50 py-5 px-6 md:px-10 transition-all duration-700 transform shadow-2xl shadow-primary/30",
      isVisible ? "translate-y-0" : "translate-y-full"
    )}>
      <div className="max-w-[1920px] mx-auto flex items-center justify-between gap-10">
        
        {/* Product Brief */}
        <div className="hidden md:flex items-center gap-5">
           <div className="w-16 h-16 bg-muted rounded-2xl flex-shrink-0 border-2 border-white shadow-lg overflow-hidden relative">
              <div className="absolute inset-0 bg-foreground/5 flex items-center justify-center text-[10px] font-black text-foreground/20 italic">IMG</div>
           </div>
           <div className="flex flex-col gap-1">
              <span className="font-black text-sm text-[#1089A4] leading-tight line-clamp-1 max-w-sm tracking-tight">سماعات رأس لاسلكية احترافية مع عزل ضوضاء فعال</span>
              <span className="text-secondary font-black text-sm uppercase">85,000 ج.س</span>
           </div>
        </div>

        {/* Variations (Mini) */}
        <div className="hidden lg:flex items-center gap-10 border-r border-border/50 pr-10 ml-0 mr-auto">
           <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">اللون:</span>
              <div className="w-5 h-5 rounded-full bg-black border-2 border-white shadow-md shadow-black/10" title="أسود" />
           </div>
           <div className="flex items-center gap-3 border-l border-border/20 pl-10">
              <span className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">المقاس:</span>
              <span className="text-[10px] font-black uppercase text-primary bg-primary/10 px-3 py-1 rounded-lg">Medium</span>
           </div>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4 flex-grow md:flex-grow-0 justify-end">
           <div className="hidden sm:flex items-center gap-4 border-l border-border/50 pl-6 ml-0 text-foreground/20">
              <button className="flex items-center justify-center hover:text-red-500 transition-all group scale-110">
                 <span className="material-symbols-rounded group-hover:scale-125 transition-transform">favorite</span>
              </button>
              <button className="flex items-center justify-center hover:text-primary transition-all group scale-110">
                 <span className="material-symbols-rounded group-hover:scale-125 transition-transform">compare_arrows</span>
              </button>
           </div>
           <button className="bg-primary text-white px-14 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 border-4 border-white">
              <span className="material-symbols-rounded">shopping_cart</span> أضف للسلة
           </button>
        </div>
      </div>
    </div>
  );
}
