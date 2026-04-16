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
}

export default function ProductCard({ id, title, price, image, vendor, location, discount, badge, sold = 45 }: ProductCardProps) {
  return (
    <div className="motta-card group flex flex-col h-full bg-white p-4">
      
      {/* Product Image Area */}
      <Link href={`/product/${id}`} className="relative aspect-square rounded-[2rem] overflow-hidden bg-muted block bg-[#F8F9FA] mb-6">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        
        {/* Elite Badges */}
        <div className="absolute top-5 right-5 flex flex-col gap-2.5 z-10">
          {discount && (
            <span className="bg-secondary text-primary px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">
              -{discount}%
            </span>
          )}
          {badge && (
            <span className="bg-accent text-white px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">
              {badge}
            </span>
          )}
        </div>

        {/* Hover Interaction Overlay */}
        <div className="absolute inset-x-4 bottom-4 translate-y-24 group-hover:translate-y-0 transition-all duration-500 z-10 hidden md:block">
           <button className="w-full motta-btn-primary py-4 rounded-2xl text-[10px]">
              أضف للسلة <span className="material-symbols-rounded text-lg">shopping_basket</span>
           </button>
        </div>
      </Link>

      {/* Product Metadata */}
      <div className="flex flex-col flex-grow px-2 space-y-4 text-right">
         {/* Vendor Context */}
         <div className="flex items-center justify-between">
            <Link href={`/vendor/${vendor}`} className="text-[10px] font-black text-accent hover:text-primary transition-colors flex items-center gap-2 uppercase tracking-widest">
               <div className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center text-[9px] font-black text-accent/40 border border-border">V</div>
               {vendor}
            </Link>
            <span className="text-[10px] font-black text-primary/20 uppercase tracking-widest">{location}</span>
         </div>
         
         {/* Title & Price Hub */}
         <div className="space-y-2">
            <Link href={`/product/${id}`}>
               <h3 className="text-base font-black text-primary leading-tight line-clamp-2 h-[2.5em] group-hover:text-accent transition-colors font-heading tracking-tight">{title}</h3>
            </Link>
            <div className="flex items-baseline gap-2 justify-end">
               <span className="text-2xl font-black text-primary tracking-tighter">{price.toLocaleString()}</span>
               <span className="text-[10px] font-black text-primary/30 uppercase tracking-widest">ج.س</span>
            </div>
         </div>

         {/* Sales Velocity Meta */}
         <div className="pt-2 mt-auto border-t border-border">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-primary/30">
               <span>تم بيع: <span className="text-primary">{sold}</span></span>
               <div className="flex gap-0.5">
                  <span className="material-symbols-rounded text-xs text-secondary">star</span>
                  <span className="material-symbols-rounded text-xs text-secondary">star</span>
                  <span className="material-symbols-rounded text-xs text-secondary">star</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
