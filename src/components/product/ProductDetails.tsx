import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useCart } from "@/lib/CartContext";
import { useWishlist } from "@/lib/WishlistContext";
import { calculateShipping, City } from "@/lib/logistics";
import { Product } from "@/lib/mockData/products";

export default function ProductDetails({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || { name: "Default", hex: "#ccc" });
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");

  const discountedPrice = product.discount ? Math.floor(product.price * (1 - product.discount / 100)) : product.price;

  return (
    <div className="space-y-12">
      {/* Product Title & Identity */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-[#1089A4]">
           <span>زيارة متجر {product.vendor}</span>
           <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
           <Stars rating={product.rating} count={product.reviews} />
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-[#021D24] leading-[1.1] tracking-tight">
           {product.title}
        </h1>

        <div className="flex items-center gap-6 border-b border-gray-100 pb-8">
           <div className="flex flex-col">
              <span className="text-sm font-black text-[#CB2E26]">{product.discount ? `%${product.discount}-` : "سعر مغري"}</span>
              <div className="flex items-baseline gap-1">
                 <span className="text-4xl font-black text-[#021D24]">{discountedPrice.toLocaleString()}</span>
                 <span className="text-sm font-black text-gray-400">ج.س</span>
              </div>
              {product.oldPrice && (
                <span className="text-xs font-bold text-gray-400 line-through">السعر الأصلي: {product.oldPrice.toLocaleString()} ج.س</span>
              )}
           </div>
           
           {/* Coupons/Offers Section (Amazon style) */}
           <div className="bg-green-50 px-6 py-4 rounded-2xl border border-green-100 flex items-center gap-4">
              <span className="material-symbols-rounded text-green-600">sell</span>
              <div className="flex flex-col">
                 <span className="text-[10px] font-black text-green-800 uppercase tracking-widest">توفير رائع</span>
                 <p className="text-xs font-bold text-green-700">خصم إضافي %15 عند استخدام الكود <span className="font-black text-[#021D24]">MERSAL15</span></p>
              </div>
           </div>
        </div>
      </div>

      {/* Description Deep Dive */}
      <div className="space-y-4">
         <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">حول هذه السلعة</h4>
         <p className="text-sm font-medium text-gray-600 leading-relaxed">
            {product.description}
         </p>
         <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <li className="flex items-center gap-3 text-xs font-bold text-gray-500">
               <span className="w-1.5 h-1.5 bg-[#1089A4] rounded-full" /> العلامة التجارية: {product.brand || "فاين"}
            </li>
            <li className="flex items-center gap-3 text-xs font-bold text-gray-500">
               <span className="w-1.5 h-1.5 bg-[#1089A4] rounded-full" /> النطاق: أصلي 100%
            </li>
         </ul>
      </div>

      {/* Variant Selection (Amazon Style Chips) */}
      <div className="space-y-12 pt-8 border-t border-gray-100">
         {/* Color Selection */}
         {product.colors && (
           <div className="space-y-6">
              <span className="text-xs font-black uppercase tracking-wide text-gray-400">النمط: <span className="text-[#021D24]">{selectedColor.name}</span></span>
              <div className="flex gap-4">
                 {product.colors.map((color) => (
                   <button 
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "w-12 h-12 rounded-2xl border-2 transition-all p-1.5 bg-white",
                      selectedColor.name === color.name ? "border-[#1089A4] shadow-lg scale-110" : "border-gray-100 hover:border-gray-200"
                    )}
                   >
                      <div className="w-full h-full rounded-xl shadow-inner" style={{ backgroundColor: color.hex }} />
                   </button>
                 ))}
              </div>
           </div>
         )}

         {/* Size Selection (Amazon Style Table Selection) */}
         {product.sizes && (
           <div className="space-y-6">
              <span className="text-xs font-black uppercase tracking-wide text-gray-400">الحجم المتاح:</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                 {product.sizes.map((size) => (
                   <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "px-6 py-4 rounded-2xl font-black text-[10px] transition-all border-2 text-center flex flex-col items-center gap-1",
                      selectedSize === size ? "bg-white text-[#1089A4] border-[#1089A4] shadow-xl" : "bg-white text-gray-400 border-gray-100 hover:bg-gray-50"
                    )}
                   >
                      <span className="uppercase">{size}</span>
                      <span className="text-[8px] opacity-50">{discountedPrice.toLocaleString()} ج.س</span>
                   </button>
                 ))}
              </div>
           </div>
         )}
      </div>

      {/* Comparisons Tier (Static Placeholder) */}
      <div className="pt-12">
         <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-5">
               <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
                  <span className="material-symbols-rounded text-3xl text-gray-400">compare</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-sm font-black text-[#021D24]">مقارنة مع سلع مماثلة</span>
                  <p className="text-[10px] text-gray-400 font-bold underline cursor-pointer">انظر جدول الفوارق الفنية</p>
               </div>
            </div>
            <span className="material-symbols-rounded text-gray-300">chevron_left</span>
         </div>
      </div>



      {/* Price Comparison (Other Offers) */}
      {product.otherOffers && (
        <div className="space-y-6 pt-10 border-t border-gray-100">
           <h3 className="text-xl font-black text-[#021D24]">عروض أخرى لهذا المنتج 🏷️</h3>
           <div className="space-y-3">
              {product.otherOffers.map((offer, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:shadow-md transition-all group">
                   <div className="flex flex-col">
                      <span className="text-sm font-black text-[#021D24] group-hover:text-[#1089A4] transition-colors">{offer.vendor}</span>
                      <div className="flex items-center gap-1">
                         <span className="material-symbols-rounded text-[#F29124] text-[10px] fill-1">star</span>
                         <span className="text-[10px] font-bold text-gray-400">{offer.rating} تقييم التاجر</span>
                      </div>
                   </div>
                   <div className="flex items-center gap-6">
                      <div className="text-left">
                         <p className="text-lg font-black text-[#CB2E26]">{offer.price.toLocaleString()} ج.س</p>
                         <p className="text-[9px] text-green-600 font-bold">متوفر للتوصيل</p>
                      </div>
                      <button className="bg-[#1089A4]/10 text-[#1089A4] hover:bg-[#1089A4] hover:text-white px-5 py-2.5 rounded-xl text-[10px] font-black transition-all">
                         عرض العرض
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
}

function Stars({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1">
       <div className="flex text-[#F29124]">
          {[1, 2, 3, 4, 5].map((s) => (
            <span key={s} className={cn("material-symbols-rounded text-xs", s <= Math.round(rating) ? "fill-1" : "fill-0 opacity-20")}>star</span>
          ))}
       </div>
       <span>{rating}</span>
       <span className="opacity-40">({count} رأي)</span>
    </div>
  );
}



