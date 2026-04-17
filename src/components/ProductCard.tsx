"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/CartContext";

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
  const { addItem } = useCart();

  return (
    <div className="bg-white rounded-3xl border border-border/10 overflow-hidden shadow-elite-lg hover:shadow-elite-xl transition-all duration-700 group flex flex-col h-full relative">
      
      {/* Badge system */}
      {(badge || discount) && (
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
           {discount && <span className="bg-secondary text-white text-[11px] font-bold px-3 py-1 rounded-xl shadow-lg">-{discount}%</span>}
           {badge && <span className="bg-primary text-white text-[11px] font-bold px-3 py-1 rounded-xl shadow-lg">{badge}</span>}
        </div>
      )}

      {/* Floating Actions */}
      <div className="absolute top-5 left-5 z-20 flex flex-col gap-3 group-hover:translate-x-0 transition-all duration-500">
         <button 
           onClick={() => setIsWishlisted(!isWishlisted)}
           className={cn(
             "w-10 h-10 rounded-xl flex items-center justify-center transition-all bg-white/80 backdrop-blur-md shadow-lg border border-border/10 opacity-0 group-hover:opacity-100",
             isWishlisted ? "text-red-500 opacity-100" : "text-primary/40 hover:text-red-500"
           )}
         >
           <span className="material-symbols-rounded text-xl leading-none">{isWishlisted ? "favorite" : "favorite_border"}</span>
         </button>
      </div>

      {/* Image Hub */}
      <Link href={`/product/${id}`} className="relative aspect-[10/11] bg-muted/30 block overflow-hidden">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-contain p-8 group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>

      {/* Content */}
      <div className="p-7 flex flex-col flex-grow text-right relative">
         <div className="flex items-center gap-2 mb-1.5 opacity-60">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{vendor}</span>
         </div>

         <Link href={`/product/${id}`}>
            <h3 className="text-md font-bold text-foreground leading-snug line-clamp-2 h-[2.8em] mb-4 group-hover:text-primary transition-colors">{title}</h3>
         </Link>

         <div className="mt-auto pt-4 border-t border-border/5 flex items-center justify-between">
            <div className="flex items-baseline gap-1 group/price">
               <span className="text-2xl font-black text-primary tracking-tighter transition-transform group-hover/price:scale-105">{price.toLocaleString()}</span>
               <span className="text-[9px] font-bold text-primary/30 uppercase">ج.س</span>
            </div>
            <button 
              onClick={() => addItem({ id, title, price, image, vendor, quantity: 1 })}
              className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center hover:bg-foreground transition-all shadow-xl shadow-primary/10 hover:-translate-y-1 active:scale-95 group/add"
            >
               <span className="material-symbols-rounded text-xl group-hover/add:rotate-[-10deg] transition-transform">shopping_bag</span>
            </button>
         </div>
      </div>

    </div>
  );
}

