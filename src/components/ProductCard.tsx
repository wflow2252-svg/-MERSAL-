"use client"

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  vendor: string;
  location: string;
  discount?: number;
  badge?: string;
  sold?: number;
  total?: number;
}

export default function ProductCard({ id, title, price, image, vendor, location, discount, badge, sold = 45, total = 100 }: ProductCardProps) {
  const progress = (sold / total) * 100;

  return (
    <Link href={`/product/${id}`} className="group">
      <div className="bg-white rounded-3xl md:rounded-[2.5rem] p-4 md:p-6 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] border-4 border-white hover:border-[#F29124]/10 relative flex flex-col h-full ring-1 ring-black/5">
        
        {/* Elite Badge System */}
        <div className="absolute top-8 right-8 z-10 flex flex-col gap-3 items-end">
          {discount && (
            <span className="bg-[#F29124] text-[#021D24] px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl border-2 border-white">
              -{discount}%
            </span>
          )}
          {badge && (
            <span className="bg-[#1089A4] text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl border-2 border-white">
              {badge}
            </span>
          )}
        </div>

        {/* Product Image - Motta Strategy 1:1 */}
        <div className="relative aspect-square rounded-2xl md:rounded-[2rem] overflow-hidden mb-6 md:mb-8 bg-muted group-hover:shadow-2xl transition-all duration-700">
          <Image 
            src={image} 
            alt={title} 
            fill 
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          {/* Action Overlay - Fixed for Mobile */}
          <div className="absolute inset-x-2 md:inset-x-4 bottom-2 md:bottom-4 translate-y-20 group-hover:translate-y-0 md:group-hover:translate-y-0 transition-all duration-700 z-10 hidden md:block">
             <button className="w-full bg-[#021D24] text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl flex items-center justify-center gap-4 hover:bg-[#1089A4]">
                أضف للسلة <span className="material-symbols-rounded text-lg">shopping_basket</span>
             </button>
          </div>
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>

        {/* Product Meta */}
        <div className="flex flex-col flex-grow space-y-4">
           <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-[#1089A4] uppercase tracking-widest bg-[#1089A4]/5 px-3 py-1 rounded-lg">{vendor}</span>
              <div className="flex items-center gap-1 opacity-20 text-[10px] font-black uppercase">
                 <span className="material-symbols-rounded text-sm">location_on</span> {location}
              </div>
           </div>
           
           <h3 className="text-lg font-black text-[#021D24] leading-[1.2] line-clamp-2 h-[2.4em] font-heading group-hover:text-[#1089A4] transition-colors">{title}</h3>
           
           <div className="pt-2 flex flex-col gap-3 md:gap-4">
              <div className="flex items-end gap-2 md:gap-3">
                 <span className="text-xl md:text-3xl font-black text-[#021D24] tracking-tighter leading-none">{price.toLocaleString()}</span>
                 <span className="text-[8px] md:text-[10px] font-black text-[#021D24]/30 uppercase tracking-widest mb-1 md:mb-1.5">ج.س</span>
              </div>

              {/* Motta Scarcity Progress Bar */}
              <div className="space-y-3">
                 <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-[#021D24]/40">
                    <span>مباع: {sold} / {total}</span>
                    <span className={cn(progress > 80 ? "text-red-500 animate-pulse" : "text-[#1089A4]")}>
                       {Math.round(progress)}%
                    </span>
                 </div>
                 <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden relative">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all duration-1000",
                        progress > 80 ? "bg-red-500" : "bg-[#1089A4]"
                      )} 
                      style={{ width: `${progress}%` }} 
                    />
                 </div>
              </div>
           </div>
        </div>

        {/* Ghost Interaction layer */}
        <button className="absolute top-8 left-8 p-3 rounded-xl bg-white/80 backdrop-blur-md text-[#021D24]/20 hover:text-red-500 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 shadow-xl border border-white">
           <span className="material-symbols-rounded text-xl">favorite</span>
        </button>
      </div>
    </Link>
  );
}
