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
  const [customerCity, setCustomerCity] = useState<City>("الخرطوم");
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toggleFavorite, isInFavorites, toggleCompare, isInCompare } = useWishlist();

  const shippingFee = calculateShipping(customerCity, [product.vendorLocation]);
  const discountedPrice = product.discount ? Math.floor(product.price * (1 - product.discount / 100)) : product.price;

  return (
    <div className="space-y-10 p-6 lg:p-0">
      {/* Product Title & Elite Badging */}
      <div className="space-y-5">
        <div className="flex items-center gap-3 flex-wrap">
           {product.badge && (
             <span className="bg-[#CB2E26] text-white px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-red-500/20 border-2 border-white">
               {product.badge}
             </span>
           )}
           <span className="bg-green-500/10 text-green-700 px-4 py-2 rounded-xl text-[11px] font-bold tracking-tight border border-green-100 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> متوفر في المخزن
           </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#021D24] tracking-tight leading-[1.1]">
           {product.title}
        </h1>

        {/* Vendor Line & Actions */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex flex-col gap-1">
             <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-bold">يباع بواسطة:</span>
                <span className="text-sm font-black text-[#1089A4] hover:underline cursor-pointer">{product.vendor}</span>
                <span className="bg-[#1089A4]/10 text-[#1089A4] text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">موثوق</span>
             </div>
             <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold">
                <Stars rating={product.rating} count={product.reviews} />
                <span className="w-px h-3 bg-gray-200" />
                <span>{product.id} #ID</span>
             </div>
          </div>
          
          <div className="flex gap-2">
             <button 
               onClick={() => toggleFavorite(product.id)}
               className={cn(
                 "w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all",
                 isInFavorites(product.id) ? "border-red-100 bg-red-50 text-red-500" : "border-gray-100 bg-white text-gray-400"
               )}
             >
                <span className={cn("material-symbols-rounded text-2xl", isInFavorites(product.id) && "fill-1")}>favorite</span>
             </button>
             <button 
               onClick={() => toggleCompare(product.id)}
               className={cn(
                 "w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all",
                 isInCompare(product.id) ? "border-blue-100 bg-blue-50 text-[#1089A4]" : "border-gray-100 bg-white text-gray-400"
               )}
             >
                <span className="material-symbols-rounded text-2xl">compare_arrows</span>
             </button>
          </div>
        </div>
      </div>

      {/* Pricing Masterpiece */}
      <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-200 shadow-sm flex items-center justify-between group">
         <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">أفضل سعر في مرسال</span>
            <div className="flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-black text-[#CB2E26] tracking-tight">{discountedPrice.toLocaleString()}</span>
                <span className="text-sm font-black text-gray-400 uppercase">ج.س</span>
            </div>
            {product.oldPrice && (
              <span className="text-xs text-gray-300 line-through font-bold"> {product.oldPrice.toLocaleString()} ج.س</span>
            )}
         </div>
         {product.discount && (
           <div className="w-16 h-16 md:w-20 md:h-20 bg-[#CB2E26] text-white rounded-3xl flex flex-col items-center justify-center shadow-xl shadow-red-500/20">
              <span className="text-xl md:text-2xl font-black leading-none">%{product.discount}</span>
              <span className="text-[8px] font-black uppercase tracking-widest mt-1">خصم حرّيف</span>
           </div>
         )}
      </div>

      {/* Real-time Delivery Estimator */}
      <div className="bg-[#1089A4]/5 p-6 rounded-3xl border border-[#1089A4]/10 space-y-4">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
               <span className="material-symbols-rounded text-[#1089A4]">local_shipping</span>
               <div>
                  <p className="text-xs font-black text-[#021D24]">توصيل مرسال السريع</p>
                  <p className="text-[10px] text-gray-500">يصلك خلال أقل من 48 ساعة</p>
               </div>
            </div>
            <div className="text-left">
               <p className="text-sm font-black text-[#1089A4]">{shippingFee.toLocaleString()} ج.س</p>
               <p className="text-[10px] text-gray-400 font-bold">رسوم الشحن</p>
            </div>
         </div>
         <div className="flex items-center gap-2 pt-2 border-t border-[#1089A4]/10">
            <span className="text-[10px] font-black text-gray-400 whitespace-nowrap">المدينة:</span>
            <select 
              value={customerCity}
              onChange={(e) => setCustomerCity(e.target.value as City)}
              className="bg-transparent text-[11px] font-black text-[#021D24] outline-none cursor-pointer"
            >
               <option value="الخرطوم">الخرطوم</option>
               <option value="أمدرمان">أمدرمان</option>
               <option value="بحري">بحري</option>
               <option value="بورتسودان">بورتسودان</option>
               <option value="مدني">مدني</option>
            </select>
         </div>
      </div>

      {/* Variant Selection */}
      <div className="space-y-10">
         {/* Color Selection */}
         {product.colors && (
           <div className="space-y-5">
              <span className="text-xs font-black uppercase tracking-wide text-gray-400">اللون: <span className="text-[#021D24]">{selectedColor.name}</span></span>
              <div className="flex gap-4">
                 {product.colors.map((color) => (
                   <button 
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "w-10 h-10 rounded-full border-2 transition-all duration-300 p-1 bg-white relative",
                      selectedColor.name === color.name ? "border-[#1089A4] scale-110 shadow-lg" : "border-transparent hover:scale-105"
                    )}
                   >
                      <div 
                        className="w-full h-full rounded-full shadow-inner border border-black/5" 
                        style={{ backgroundColor: color.hex }}
                      />
                      {selectedColor.name === color.name && (
                         <motion.span layoutId="activeColor" className="absolute -top-1 -right-1 w-4 h-4 bg-[#1089A4] text-white rounded-full flex items-center justify-center text-[7px] font-bold border-2 border-white"><span className="material-symbols-rounded !text-[8px]">check</span></motion.span>
                      )}
                   </button>
                 ))}
              </div>
           </div>
         )}

         {/* Size Selection */}
         {product.sizes && (
           <div className="space-y-5">
              <span className="text-xs font-black uppercase tracking-wide text-gray-400">الخيار المتاح:</span>
              <div className="flex flex-wrap gap-3">
                 {product.sizes.map((size) => (
                   <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "px-8 py-3 rounded-2xl font-black text-xs transition-all border-2 min-w-[100px] flex items-center justify-center",
                      selectedSize === size ? "bg-[#1089A4] text-white border-white shadow-xl shadow-[#1089A4]/20 scale-105" : "bg-white text-gray-400 border-gray-100 hover:bg-gray-50"
                    )}
                   >
                      {size}
                   </button>
                 ))}
              </div>
           </div>
         )}
      </div>

      {/* Checkout Logic */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
         <div className="flex items-center bg-gray-50 p-1 rounded-2xl border border-gray-200 h-16">
            <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="w-14 h-full rounded-xl flex items-center justify-center text-xl font-bold text-gray-300 hover:text-[#1089A4] transition-all">-</button>
            <span className="w-12 text-center font-black text-lg text-[#021D24]">{quantity}</span>
            <button onClick={() => setQuantity(q => q+1)} className="w-14 h-full rounded-xl flex items-center justify-center text-xl font-bold text-gray-300 hover:text-[#1089A4] transition-all">+</button>
         </div>

         <button 
           onClick={() => addItem({ id: product.id, title: product.title, price: discountedPrice, quantity, vendor: product.vendor, image: product.image })}
           className="flex-grow bg-[#1089A4] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#1089A4]/20 hover:bg-[#0D708E] active:scale-95 transition-all flex items-center justify-center gap-5 h-16"
         >
            إضافة لـحقيبة التسـوق <span className="material-symbols-rounded text-2xl">shopping_basket</span>
         </button>
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



