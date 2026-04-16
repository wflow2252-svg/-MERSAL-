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
    <div className="group relative bg-white rounded-[2rem] border border-border hover:border-transparent hover:shadow-[0_30px_60px_-15px_rgba(1,18,22,0.1)] transition-all duration-500 flex flex-col h-full overflow-hidden p-3 md:p-4">
      
      {/* 1. Elite Visual Container */}
      <Link href={`/product/${id}`} className="relative aspect-square rounded-[1.5rem] overflow-hidden bg-muted group-hover:shadow-lg transition-all duration-700 block">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        
        {/* Badge System */}
        {(discount || badge) && (
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
            {discount && (
              <span className="bg-[#F29124] text-[#011216] px-3 py-1 rounded-lg text-[9px] font-extrabold uppercase tracking-widest shadow-sm">
                -{discount}%
              </span>
            )}
            {badge && (
              <span className="bg-[#1089A4] text-white px-3 py-1 rounded-lg text-[9px] font-extrabold uppercase tracking-widest shadow-sm">
                {badge}
              </span>
            )}
          </div>
        )}

        {/* Quick Interaction Overlay */}
        <div className="absolute inset-x-3 bottom-3 translate-y-20 group-hover:translate-y-0 transition-all duration-500 z-10 hidden md:block">
           <button className="w-full btn-primary py-3.5 rounded-xl text-[10px]">
              أضف للسلة <span className="material-symbols-rounded text-lg">shopping_basket</span>
           </button>
        </div>
      </Link>

      {/* 2. Motta-style Content Meta */}
      <div className="flex flex-col flex-grow pt-5 px-1 space-y-3">
         {/* Vendor Info - The Motta Multivendor feel */}
         <div className="flex items-center justify-between">
            <Link href={`/vendor/${vendor}`} className="text-[10px] font-bold text-[#1089A4] hover:text-[#011216] transition-colors flex items-center gap-1.5">
               <span className="w-5 h-5 rounded-md bg-muted flex items-center justify-center text-[8px] font-black text-[#1089A4]/40 border border-border">M</span>
               {vendor}
            </Link>
            <span className="text-[9px] font-bold text-[#011216]/20 uppercase">{location}</span>
         </div>
         
         {/* Title & Price */}
         <div className="space-y-1">
            <Link href={`/product/${id}`}>
               <h3 className="text-sm md:text-base font-bold text-[#011216] leading-snug line-clamp-2 h-[2.8em] transition-colors group-hover:text-[#1089A4]">{title}</h3>
            </Link>
            <div className="flex items-baseline gap-1.5">
               <span className="text-lg md:text-xl font-extrabold text-[#011216] tracking-tight">{price.toLocaleString()}</span>
               <span className="text-[10px] font-bold text-[#011216]/30 uppercase">ج.س</span>
            </div>
         </div>

         {/* Scarcity / Trust Progress Bar */}
         <div className="pt-2 mt-auto">
            <div className="flex justify-between items-center text-[9px] font-bold uppercase text-[#011216]/40 mb-1.5">
               <span>تم بيع: <span className="text-[#011216]">{sold}</span></span>
               <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
               <div 
                 className={cn(
                   "h-full rounded-full transition-all duration-1000",
                   progress > 85 ? "bg-red-500" : "bg-[#1089A4]"
                 )} 
                 style={{ width: `${progress}%` }} 
               />
            </div>
         </div>
      </div>
    </div>
  );
}

