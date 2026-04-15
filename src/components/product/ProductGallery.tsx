"use client"

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ProductGallery() {
  const [activeImage, setActiveImage] = useState(0);
  
  const images = [
    "/placeholder.jpg",
    "/placeholder.jpg",
    "/placeholder.jpg",
    "/placeholder.jpg",
  ];

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-6">
      {/* Thumbnails Sidebar */}
      <div className="flex lg:flex-col gap-4 lg:w-24 overflow-x-auto lg:overflow-y-visible py-2 lg:py-0 no-scrollbar">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(i)}
            className={cn(
              "w-24 h-24 flex-shrink-0 bg-muted rounded-[1.5rem] border-2 transition-all p-1.5 overflow-hidden",
              activeImage === i ? "border-primary shadow-xl shadow-primary/10 scale-105" : "border-transparent opacity-40 hover:opacity-100"
            )}
          >
            <div className="w-full h-full bg-foreground/5 rounded-[1rem] flex items-center justify-center text-[10px] font-black text-foreground/20 italic">0{i+1}</div>
          </button>
        ))}
      </div>

      {/* Main Image View */}
      <div className="flex-grow aspect-square bg-muted rounded-[3.5rem] relative overflow-hidden group cursor-zoom-in border-8 border-white shadow-2xl shadow-black/5">
        <div className="absolute inset-0 bg-foreground/5" />
        <div className="absolute inset-0 flex items-center justify-center text-foreground/20 italic font-black text-2xl">
           صورة المنتج {activeImage + 1}
        </div>
        
        {/* Hover zoom decoration */}
        <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all shadow-xl shadow-black/5 border border-border/50 flex items-center gap-2">
           <span className="material-symbols-rounded text-base text-primary">zoom_in</span> اضغط للتكبير
        </div>
      </div>
    </div>
  );
}
