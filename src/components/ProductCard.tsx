"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/CartContext";
import { useWishlist } from "@/lib/WishlistContext";

export interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  vendor: string;
  vendorLocation: string;
  discount?: number;
  badge?: string;
  sold?: number;
  vendorId?: string;
}

// Star rating helper
function Stars({ rating = 4.3, count = 128 }: { rating?: number; count?: number }) {
  return (
    <div className="flex items-center gap-1 text-xs mt-1">
      <span className="text-[#F29124] font-bold">{rating.toFixed(1)}</span>
      <div className="flex">
        {[1,2,3,4,5].map(i => (
          <span key={i} className={`text-sm ${i <= Math.round(rating) ? "text-[#F29124]" : "text-gray-300"}`}>★</span>
        ))}
      </div>
      <span className="text-gray-400 text-[10px]">({count})</span>
    </div>
  );
}

export default function ProductCard({ id, title, price, image, vendor, vendorLocation, discount, badge, vendorId }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const { toggleFavorite, toggleCompare, isInFavorites, isInCompare } = useWishlist();

  const discountedPrice = discount ? Math.floor(price * (1 - discount / 100)) : price;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id, title, price: discountedPrice, image, vendor, vendorId, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md hover:border-[#1089A4]/30 transition-all group flex flex-col h-full relative">

      {/* Badges & Actions Overlay */}
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
        {discount && (
          <span className="bg-red-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm">
            -{discount}%
          </span>
        )}
        {badge && (
          <span className="bg-[#021D24] text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm">
            {badge}
          </span>
        )}
      </div>

      {/* Quick Actions (Left) */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.preventDefault(); toggleFavorite(id); }}
          className="w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
          title="أضف للمفضلة"
        >
          <span className={`material-symbols-rounded text-base ${isInFavorites(id) ? "text-red-500 fill-1" : "text-gray-400"}`}>
            {isInFavorites(id) ? "favorite" : "favorite"}
          </span>
        </button>
        <button
          onClick={(e) => { e.preventDefault(); toggleCompare(id); }}
          className="w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
          title="مقارنة المنتج"
        >
          <span className={`material-symbols-rounded text-base ${isInCompare(id) ? "text-[#1089A4] font-bold" : "text-gray-400"}`}>
            compare_arrows
          </span>
        </button>
      </div>

      {/* Image Container */}
      <Link href={`/product/${id}`} className="relative aspect-square block overflow-hidden bg-gray-50 border-b border-gray-100">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain p-4 group-hover:scale-110 transition-transform duration-700"
        />
      </Link>

      {/* Product Content */}
      <div className="p-3 flex flex-col flex-grow text-right">
        <Link href={`/product/${id}`} className="block mb-1">
          <p className="text-xs font-black text-[#021D24] leading-snug line-clamp-2 min-h-[2.5em] hover:text-[#1089A4] transition-colors">
            {title}
          </p>
        </Link>

        {/* Vendor Line */}
        <div className="flex items-center gap-1 mb-1">
          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">يباع بواسطة: </span>
          <span className="text-[10px] text-[#1089A4] font-black hover:underline cursor-pointer truncate">{vendor}</span>
        </div>

        {vendorLocation && (
          <div className="flex items-center gap-0.5 text-gray-400 mb-2">
            <span className="material-symbols-rounded text-[10px]">location_on</span>
            <span className="text-[10px] font-bold">{vendorLocation}</span>
          </div>
        )}

        <div className="mt-auto">
          <Stars rating={4 + Math.random() * 0.9} count={Math.floor(50 + Math.random() * 300)} />

          {/* Pricing Tier */}
          <div className="mt-3 flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-[#CB2E26]">{discountedPrice.toLocaleString()}</span>
              <span className="text-[10px] text-gray-400 font-bold">ج.س</span>
              {discount && (
                <span className="text-[11px] text-gray-400 line-through decoration-red-400/30">{price.toLocaleString()}</span>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-0.5 text-green-600">
                <span className="material-symbols-rounded text-[14px]">local_shipping</span>
                <span className="text-[9px] font-black uppercase">شحن سريع</span>
              </div>
              
              {/* Counter Style Add to Cart */}
              <button
                onClick={handleAdd}
                className={`flex items-center justify-center h-10 px-4 rounded-xl font-black text-[11px] transition-all duration-300 shadow-sm grow ml-2 ${
                  added
                    ? "bg-green-600 text-white scale-95"
                    : "bg-[#1089A4] hover:bg-[#0E7A92] text-white hover:shadow-lg hover:-translate-y-0.5"
                }`}
              >
                {added ? (
                  <span className="flex items-center gap-1 animate-in zoom-in">
                    <span className="material-symbols-rounded text-sm">check_circle</span>
                    تمت الإضافة
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-rounded text-sm font-bold">shopping_basket</span>
                    أضف للسلة
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
