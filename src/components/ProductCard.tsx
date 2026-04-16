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
      
      {/* 1. Motta Product Visual Container */}
      <Link href={`/product/${id}`} className="relative aspect-square rounded-[2rem] overflow-hidden bg-[#F8F9FA] block mb-8">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-contain p-4 transition-transform duration-1000 group-hover:scale-110"
        />
        
        {/* Elite Overlay Badges */}
        <div className="absolute top-5 right-5 flex flex-col gap-2.5 z-10">
          {discount && (
            <span className="bg-[#F29124] text-white px-3.5 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-2xl">
              -{discount}%
            </span>
          )}
          {badge && (
            <span className="bg-[#1089A4] text-white px-3.5 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-2xl">
              {badge}
            </span>
          )}
        </div>

        {/* Motta Hover Floating Action */}
        <div className="absolute inset-x-6 bottom-6 translate-y-24 group-hover:translate-y-0 transition-all duration-700 ease-out z-10 hidden md:block">
           <button className="w-full motta-btn-primary py-4.5 rounded-[1.5rem] text-[10px] shadow-2xl shadow-primary/40">
              أضف للسلة <span className="material-symbols-rounded text-lg">shopping_basket</span>
           </button>
        </div>
      </Link>

      {/* 2. Motta Content Hierarchy */}
      <div className="flex flex-col flex-grow px-2 space-y-4 text-right">
         
         {/* Top-aligned Category Label */}
         <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-accent uppercase tracking-widest">إلكترونيات / هواتف</span>
            <div className="flex gap-0.5">
               {[1, 2, 3, 4, 5].map((i) => (
                 <span key={i} className="material-symbols-rounded text-[10px] text-secondary">star</span>
               ))}
            </div>
         </div>
         
         {/* Title & Vendor */}
         <div className="space-y-1.5">
            <Link href={`/product/${id}`}>
               <h3 className="text-base font-black text-primary leading-snug line-clamp-2 h-[2.5em] group-hover:text-accent transition-colors font-heading tracking-tight">{title}</h3>
            </Link>
            <Link href={`/vendor/${vendor}`} className="text-[10px] font-bold text-primary/30 uppercase tracking-[0.2em] block hover:text-accent transition-colors">
               بواسطة: {vendor}
            </Link>
         </div>

         {/* Price Section */}
         <div className="pt-2 flex items-baseline gap-2 justify-end mt-auto border-t border-border/10">
            <span className="text-2xl font-black text-primary tracking-tighter">{price.toLocaleString()}</span>
            <span className="text-[10px] font-black text-primary/30 uppercase tracking-widest">ج.س</span>
         </div>

         {/* Sales Scarcity Meta */}
         <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-[0.3em] text-primary/20">
            <span className="flex items-center gap-1.5">
               <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> متوفر في المخزن
            </span>
            <span>تم بيع {sold}+</span>
         </div>
      </div>
    </div>
  );
}
