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
    <div className="space-y-10 p-6 lg:p-0">
      {/* Product Title & Elite Badging */}
      <div className="space-y-5">
        <div className="flex items-center gap-3 flex-wrap">
           <span className="bg-primary text-white px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest shadow-lg shadow-primary/20 border-2 border-white font-heading">منتج بريميوم</span>
           <span className="bg-green-500/10 text-green-700 px-4 py-2 rounded-xl text-[11px] font-bold tracking-tight border border-green-100 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> متوفر
           </span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tight leading-[1.1] font-heading">
           آيفون 15 <br /> <span className="text-primary">برو ماكس</span> <span className="text-secondary">.</span>
        </h1>
        <div className="flex items-center gap-5">
           <div className="flex text-secondary">
              {[1, 2, 3, 4, 5].map((s) => <span key={s} className="material-symbols-rounded text-lg fill-1">star</span>)}
           </div>
           <span className="text-xs font-bold text-foreground/30 uppercase tracking-wide border-r-2 border-border pl-5">458 مراجعة</span>
        </div>
      </div>

      {/* Pricing Masterpiece */}
      <div className="bg-muted/40 p-6 md:p-8 rounded-[2rem] border-2 border-white shadow-sm flex items-center justify-between group">
         <div className="flex flex-col gap-0.5">
            <span className="text-[12px] font-bold text-primary/50 uppercase tracking-widest">أفضل سعر حالي</span>
            <div className="flex items-baseline gap-1.5 font-heading">
                <span className="text-4xl md:text-5xl font-black text-primary tracking-tight">980,000</span>
                <span className="text-md font-black text-primary/30 uppercase">ج.س</span>
            </div>
            <span className="text-xs text-foreground/15 line-through font-bold"> 1,150,000 ج.س</span>
         </div>
         <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl md:rounded-3xl flex flex-col items-center justify-center shadow-lg border-2 border-primary/5">
            <span className="text-lg md:text-xl font-black text-secondary leading-none">-15%</span>
            <span className="text-[9px] font-bold text-foreground/20 uppercase tracking-widest mt-1">خصم</span>
         </div>
      </div>

      {/* Variant Selection */}
      <div className="space-y-10">
         {/* Color Selection */}
         <div className="space-y-5">
            <span className="text-sm font-bold uppercase tracking-wide text-foreground/40">اللون: <span className="text-foreground">{selectedColor.name}</span></span>
            <div className="flex gap-4">
               {colors.map((color) => (
                 <button 
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "w-10 h-10 rounded-full border-2 transition-all duration-300 p-1 bg-white relative",
                    selectedColor.name === color.name ? "border-primary scale-110 shadow-lg" : "border-transparent hover:scale-105"
                  )}
                 >
                    <div 
                      className="w-full h-full rounded-full shadow-inner border border-black/5" 
                      style={{ backgroundColor: color.hex }}
                    />
                    {selectedColor.name === color.name && (
                       <motion.span layoutId="activeColor" className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white rounded-full flex items-center justify-center text-[8px] font-bold border-2 border-white"><span className="material-symbols-rounded !text-[8px]">check</span></motion.span>
                    )}
                 </button>
               ))}
            </div>
         </div>

         {/* Size Selection */}
         <div className="space-y-5">
            <span className="text-sm font-bold uppercase tracking-wide text-foreground/40">المساحة التخزينية:</span>
            <div className="flex flex-wrap gap-4">
               {sizes.map((size) => (
                 <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "px-10 py-4 md:px-14 md:py-5 rounded-2xl md:rounded-3xl font-bold text-sm transition-all border-2 min-w-[120px] md:min-w-[150px] flex items-center justify-center",
                    selectedSize === size ? "bg-primary text-white border-white shadow-lg shadow-primary/20 scale-105" : "bg-white text-foreground/60 border-border/50 hover:bg-muted"
                  )}
                 >
                    {size}
                 </button>
               ))}
            </div>
         </div>
      </div>

      {/* Quantitative & Checkout Logic */}
      <div className="flex flex-col sm:flex-row gap-6 pt-4">
         <div className="flex items-center bg-white p-1 rounded-2xl border-2 border-border/40 shadow-sm h-14 md:h-16">
            <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="w-12 md:w-14 h-full rounded-xl flex items-center justify-center text-xl font-bold text-foreground/20 hover:bg-muted hover:text-primary transition-all">-</button>
            <span className="w-10 md:w-12 text-center font-black text-lg text-foreground">{quantity}</span>
            <button onClick={() => setQuantity(q => q+1)} className="w-12 md:w-14 h-full rounded-xl flex items-center justify-center text-xl font-bold text-foreground/20 hover:bg-muted hover:text-primary transition-all">+</button>
         </div>

         <button 
           onClick={() => addItem({ id: "iphone15pm", title: `آيفون 15 برو ماكس - ${selectedSize} - ${selectedColor.name}`, price: 980000, quantity, vendor: "مرسال جادجتس", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=400" })}
           className="flex-grow bg-primary text-white rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-accent active:scale-95 transition-all flex items-center justify-center gap-5 h-14 md:h-16"
         >
            أضف لـحقيبة التسـوق <span className="material-symbols-rounded text-xl md:text-2xl">shopping_bag</span>
         </button>
      </div>

      {/* Trust & Policy */}
      <div className="grid grid-cols-2 gap-4 pt-4">
         <div className="flex items-center gap-4 p-4 md:p-5 bg-muted/30 rounded-2xl border border-border/50 transition-all">
            <span className="material-symbols-rounded text-secondary text-2xl">verified</span>
            <div className="flex flex-col">
               <span className="text-[12px] md:text-[13px] font-bold text-foreground">ضمان حقيقي</span>
               <span className="text-[10px] md:text-[11px] text-foreground/40 font-medium">12 شهر من مرسال</span>
            </div>
         </div>
         <div className="flex items-center gap-4 p-4 md:p-5 bg-muted/30 rounded-2xl border border-border/50 transition-all">
            <span className="material-symbols-rounded text-primary text-2xl">local_shipping</span>
            <div className="flex flex-col">
               <span className="text-[12px] md:text-[13px] font-bold text-foreground">شحن فائق</span>
               <span className="text-[10px] md:text-[11px] text-foreground/40 font-medium">خلال 24 ساعة</span>
            </div>
         </div>
      </div>
    </div>
  );
}


