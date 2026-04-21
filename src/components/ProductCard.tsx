"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/CartContext";

export interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  vendor: string;
  location: string;
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

export default function ProductCard({ id, title, price, image, vendor, location, discount, badge, vendorId }: ProductCardProps) {
  const [added,       setAdded]       = useState(false);
  const [wishlisted,  setWishlisted]  = useState(false);
  const { addItem } = useCart();

  const discountedPrice = discount ? Math.floor(price * (1 - discount / 100)) : price;

  const handleAdd = () => {
    addItem({ id, title, price: discountedPrice, image, vendor, vendorId, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md hover:border-[#1089A4]/30 transition-all group flex flex-col h-full relative">

      {/* Badges */}
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
        {discount && (
          <span className="bg-red-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded">
            -{discount}%
          </span>
        )}
        {badge && (
          <span className="bg-[#021D24] text-white text-[10px] font-black px-1.5 py-0.5 rounded">
            {badge}
          </span>
        )}
      </div>

      {/* Wishlist */}
      <button
        onClick={() => setWishlisted(!wishlisted)}
        className="absolute top-2 left-2 z-10 w-7 h-7 bg-white/80 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
      >
        <span className={`material-symbols-rounded text-sm ${wishlisted ? "text-red-500" : "text-gray-400"}`}>
          {wishlisted ? "favorite" : "favorite_border"}
        </span>
      </button>

      {/* Image */}
      <Link href={`/product/${id}`} className="relative aspect-square block overflow-hidden bg-gray-50">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      {/* Info */}
      <div className="p-3 flex flex-col flex-grow text-right">
        <Link href={`/product/${id}`}>
          <p className="text-xs font-black text-[#021D24] leading-snug line-clamp-2 hover:text-[#1089A4] transition-colors mb-1">
            {title}
          </p>
        </Link>

        <p className="text-[10px] text-[#1089A4] font-bold mb-0.5 truncate">{vendor}</p>

        {location && (
          <p className="text-[10px] text-gray-400 flex items-center gap-0.5 mb-1">
            <span className="material-symbols-rounded text-xs">location_on</span>
            {location}
          </p>
        )}

        <Stars rating={4 + Math.random() * 0.9} count={Math.floor(50 + Math.random() * 300)} />

        {/* Price */}
        <div className="mt-auto pt-2">
          {discount ? (
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-[#B12704]">{discountedPrice.toLocaleString()}</span>
              <span className="text-xs text-gray-400 line-through">{price.toLocaleString()}</span>
              <span className="text-[10px] text-gray-400">ج.س</span>
            </div>
          ) : (
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-[#B12704]">{price.toLocaleString()}</span>
              <span className="text-[10px] text-gray-400">ج.س</span>
            </div>
          )}

          <p className="text-[10px] text-green-600 font-bold mt-0.5 flex items-center gap-0.5">
            <span className="material-symbols-rounded text-xs">local_shipping</span>
            توصيل سريع
          </p>

          <button
            onClick={handleAdd}
            className={`w-full mt-2 py-2 rounded text-xs font-black transition-all ${
              added
                ? "bg-green-500 text-white"
                : "bg-[#F29124] hover:bg-[#D97B10] text-white"
            }`}
          >
            {added ? "✓ أُضيف للسلة" : "أضف للسلة"}
          </button>
        </div>
      </div>
    </div>
  );
}
