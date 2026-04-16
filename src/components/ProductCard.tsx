"use client"

import Image from "next/image";
import Link from "next/link";

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
  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col h-full group">
      
      {/* Image Area */}
      <Link href={`/product/${id}`} className="relative aspect-square bg-muted block p-4">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />
        {discount && (
          <div className="absolute top-3 right-3 bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
            -{discount}%
          </div>
        )}
      </Link>

      {/* Content Meta */}
      <div className="p-4 flex flex-col flex-grow text-right">
         <span className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">{vendor}</span>
         <Link href={`/product/${id}`}>
            <h3 className="text-sm font-bold text-primary leading-snug line-clamp-2 h-[2.8em] mb-4">{title}</h3>
         </Link>
         
         <div className="mt-auto pt-3 border-t border-muted flex items-center justify-between">
            <div className="flex items-baseline gap-1">
               <span className="text-lg font-black text-primary">{price.toLocaleString()}</span>
               <span className="text-[9px] font-bold text-primary/40 uppercase">ج.س</span>
            </div>
            <button className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center hover:bg-accent transition-colors">
               <span className="material-symbols-rounded text-lg">add_shopping_cart</span>
            </button>
         </div>
      </div>
    </div>
  );
}
