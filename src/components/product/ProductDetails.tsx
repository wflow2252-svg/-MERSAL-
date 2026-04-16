"use client"

import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/CartContext";

const colors = [
  { name: "تيتانيوم طبيعي", hex: "#A5A5A1" },
  { name: "أسود فلكي", hex: "#1D1D1F" },
  { name: "أزرق محيطي", hex: "#314455" },
];

const sizes = ["128GB", "256GB", "512GB", "1TB"];

export default function ProductDetails() {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[1]);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  return (
    <div className="space-y-16 p-12 lg:p-0">
      {/* Product Title & Elite Badging */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 flex-wrap">
           <span className="bg-[#1089A4] text-white px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-[#1089A4]/20 border-4 border-white font-heading">منتج بريميوم</span>
           <span className="bg-green-500/10 text-green-600 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-green-200 flex items-center gap-2 italic">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" /> متوفر في المخزون
           </span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-[#021D24] tracking-tighter leading-[0.95] font-heading drop-shadow-sm">
           آيفون 15 <br /> <span className="text-[#1089A4]">برو ماكس</span> <span className="text-[#F29124]">.</span>
        </h1>
        <div className="flex items-center gap-6">
           <div className="flex text-[#F29124]">
              {[1, 2, 3, 4, 5].map((s) => <span key={s} className="material-symbols-rounded text-2xl fill-1">star</span>)}
           </div>
           <span className="text-sm font-black text-[#021D24]/30 uppercase tracking-[0.2em] border-r-4 border-border/50 pr-6">458 مراجعة إيجابية</span>
        </div>
      </div>

      {/* Pricing Masterpiece - Motta Strategy 1:1 */}
      <div className="bg-muted px-12 py-10 rounded-[3rem] border-4 border-white shadow-inner flex items-center justify-between group">
         <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-black text-[#1089A4]/40 uppercase tracking-[0.4em] leading-none mb-1">أفضل سعر حالي</span>
            <div className="flex items-end gap-3 font-heading">
                <span className="text-7xl font-black text-[#1089A4] tracking-tighter leading-none">980,000</span>
                <span className="text-[18px] font-black text-[#1089A4]/40 mb-2 uppercase">ج.س</span>
            </div>
            <span className="text-[12px] text-[#021D24]/10 line-through font-black mt-2"> 1,150,000 ج.س</span>
         </div>
         <div className="w-24 h-24 bg-white rounded-[2rem] flex flex-col items-center justify-center shadow-xl border-4 border-[#1089A4]/5">
            <span className="text-[18px] font-black text-[#F29124] leading-none">-15%</span>
            <span className="text-[8px] font-black text-[#021D24]/20 uppercase tracking-widest mt-1">خصم</span>
         </div>
      </div>

      {/* Variant Selection - Elite Swatches & UI */}
      <div className="space-y-12">
         {/* Color Selection */}
         <div className="space-y-6">
            <div className="flex justify-between items-center">
               <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#021D24]/30">اختر اللون: <span className="text-[#021D24] opacity-100">{selectedColor.name}</span></span>
            </div>
            <div className="flex gap-6">
               {colors.map((color) => (
                 <button 
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "w-12 h-12 rounded-full border-4 transition-all duration-500 p-1 bg-white relative",
                    selectedColor.name === color.name ? "border-[#1089A4] scale-125 shadow-2xl" : "border-transparent hover:scale-110"
                  )}
                 >
                    <div 
                      className="w-full h-full rounded-full shadow-inner border border-black/5" 
                      style={{ backgroundColor: color.hex }}
                    />
                    {selectedColor.name === color.name && (
                       <motion.span layoutId="activeColor" className="absolute -top-1 -right-1 w-4 h-4 bg-[#1089A4] text-white rounded-full flex items-center justify-center text-[8px] font-black border-2 border-white"><span className="material-symbols-rounded !text-[8px]">check</span></motion.span>
                    )}
                 </button>
               ))}
            </div>
         </div>

         {/* Size Selection */}
         <div className="space-y-6">
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#021D24]/30">المساحة التخزينية:</span>
            <div className="flex flex-wrap gap-4">
               {sizes.map((size) => (
                 <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "px-8 py-4 rounded-[1.5rem] font-black text-[12px] uppercase tracking-[0.2em] transition-all border-4",
                    selectedSize === size ? "bg-[#1089A4] text-white border-white shadow-2xl shadow-[#1089A4]/30 scale-105" : "bg-muted text-[#021D24]/40 border-transparent hover:bg-muted/80"
                  )}
                 >
                    {size}
                 </button>
               ))}
            </div>
         </div>
      </div>

      {/* Quantitative & Checkout Logic - Elite Motta UI */}
      <div className="flex flex-col sm:flex-row gap-10 pt-10">
         <div className="flex items-center bg-muted p-2 rounded-[2rem] border-4 border-white shadow-inner h-[84px]">
            <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="w-20 h-full rounded-[1.5rem] flex items-center justify-center text-2xl font-black text-[#021D24]/30 hover:bg-white hover:text-[#1089A4] transition-all active:scale-90">-</button>
            <span className="w-16 text-center font-black text-xl text-[#021D24]">{quantity}</span>
            <button onClick={() => setQuantity(q => q+1)} className="w-20 h-full rounded-[1.5rem] flex items-center justify-center text-2xl font-black text-[#021D24]/30 hover:bg-white hover:text-[#1089A4] transition-all active:scale-90">+</button>
         </div>

         <button 
           onClick={() => addItem({ id: "iphone15pm", title: `آيفون 15 برو ماكس - ${selectedSize} - ${selectedColor.name}`, price: 980000, quantity, vendor: "مرسال جادجتس", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=400" })}
           className="flex-grow bg-[#1089A4] text-white rounded-[2.5rem] font-black text-sm uppercase tracking-[0.4em] shadow-[0_30px_70px_rgba(16,137,164,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-8 border-b-[10px] border-black/20 h-[84px] group"
         >
            أضف لـحقيبة التسـوق <span className="material-symbols-rounded text-3xl group-hover:rotate-12 transition-transform">shopping_bag</span>
         </button>
      </div>

      {/* Trust & Policy - Elite Tiers */}
      <div className="grid grid-cols-2 gap-6 pt-10">
         <div className="flex items-center gap-5 p-6 bg-muted/30 rounded-[2rem] border border-border/50 group hover:border-[#F29124] transition-all">
            <span className="material-symbols-rounded text-[#F29124] text-3xl group-hover:scale-125 transition-transform">verified</span>
            <div className="flex flex-col">
               <span className="text-[10px] font-black uppercase tracking-widest text-[#021D24]">ضمان حقيقي</span>
               <span className="text-[8px] text-[#021D24]/40 font-black uppercase">12 شهر من مرسال</span>
            </div>
         </div>
         <div className="flex items-center gap-5 p-6 bg-muted/30 rounded-[2rem] border border-border/50 group hover:border-[#1089A4] transition-all">
            <span className="material-symbols-rounded text-[#1089A4] text-3xl group-hover:scale-125 transition-transform">local_shipping</span>
            <div className="flex flex-col">
               <span className="text-[10px] font-black uppercase tracking-widest text-[#021D24]">شحن فائق السرعة</span>
               <span className="text-[8px] text-[#021D24]/40 font-black uppercase">خلال 24 ساعة للخرطوم</span>
            </div>
         </div>
      </div>
    </div>
  );
}
