"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
}

export default function ProductCard({ id, title, price, image, vendor, location, discount, badge, sold }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="bg-white rounded-[2.2rem] border border-border/10 overflow-hidden shadow-elite-lg hover:shadow-elite-xl transition-all duration-700 group flex flex-col h-full relative">
      
      {/* Badge system */}
      {(badge || discount) && (
        <div className="absolute top-5 right-5 z-20 flex flex-col gap-2">
           {discount && <span className="bg-secondary text-white text-[9px] font-black px-3 py-1.5 rounded-xl shadow-lg shadow-secondary/20">-{discount}%</span>}
           {badge && <span className="bg-primary text-white text-[9px] font-black px-3 py-1.5 rounded-xl shadow-lg shadow-primary/20">{badge}</span>}
        </div>
      )}

      {/* Floating Actions */}
      <div className="absolute top-6 left-6 z-20 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
         <button 
           onClick={() => setIsWishlisted(!isWishlisted)}
           className={cn(
             "w-11 h-11 rounded-2xl flex items-center justify-center transition-all bg-white shadow-xl border border-border/5",
             isWishlisted ? "text-red-500" : "text-primary hover:text-red-500"
           )}
         >
           <span className="material-symbols-rounded text-xl leading-none">{isWishlisted ? "favorite" : "favorite_border"}</span>
         </button>
         <button className="w-11 h-11 rounded-2xl bg-white text-primary flex items-center justify-center transition-all shadow-xl border border-border/5 hover:bg-primary hover:text-white">
           <span className="material-symbols-rounded text-xl leading-none">visibility</span>
         </button>
      </div>

      {/* Image Hub */}
      <Link href={`/product/${id}`} className="relative aspect-[10/11] bg-muted/40 block overflow-hidden">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-contain p-8 group-hover:scale-110 transition-transform duration-1000"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>

      {/* Content */}
      <div className="p-7 flex flex-col flex-grow text-right relative">
         <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-black text-primary/30 uppercase tracking-[0.2em]">{vendor}</span>
         </div>

         <Link href={`/product/${id}`}>
            <h3 className="text-sm md:text-md font-black text-primary leading-snug line-clamp-2 h-[2.8em] mb-4 group-hover:text-accent transition-colors">{title}</h3>
         </Link>

         {sold !== undefined && (
            <div className="mb-4">
               <div className="flex justify-between text-[8px] font-black text-primary/40 uppercase tracking-widest mb-1">
                  <span>المباع: {sold}</span>
                  <span>المتبقي: {20}</span>
               </div>
               <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: `${(sold / 50) * 100}%` }} />
               </div>
            </div>
         )}
         
         <div className="mt-auto pt-5 border-t border-border/10 flex items-center justify-between">
            <div className="flex items-baseline gap-1.5 font-inter">
               <span className="text-xl md:text-2xl font-black text-primary tracking-tighter">{price.toLocaleString()}</span>
               <span className="text-[8px] font-black text-primary/30 uppercase">SDG</span>
            </div>
            <button className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center hover:bg-black transition-all shadow-xl shadow-primary/20 hover:-translate-y-1 active:scale-90 overflow-hidden relative">
               <span className="material-symbols-rounded text-xl">shopping_cart</span>
            </button>
         </div>
      </div>
    </div>
  );
}
