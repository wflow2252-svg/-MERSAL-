"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const initialCart = [
  { id: "c1", title: "سماعات سوني WH-1000XM5 العازلة للضوضاء", price: 185000, quantity: 1, vendor: "تكنو زون", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=400" },
  { id: "c2", title: "آيفون 15 بريميوم - تيتانيوم", price: 980000, quantity: 1, vendor: "مرسال جادجتس", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=400" },
];

import { useCart } from "@/lib/CartContext";

export default function CartPage() {
  const { cart, removeItem, updateQty, subtotal } = useCart();

  const shipping = 5000;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-44">
      {/* 1. Header */}
      <section className="bg-white pt-32 md:pt-44 pb-12 md:pb-20 px-4 md:px-12 border-b border-border/50 relative overflow-hidden">
         <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row items-end justify-between gap-10 relative z-10">
            <div className="space-y-6">
               <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-[#1089A4]">
                  <span className="w-8 md:w-12 h-1 bg-[#F29124] rounded-full" /> SECURE CHECKOUT
               </div>
               <h1 className="text-4xl md:text-7xl font-black text-[#021D24] tracking-tighter font-heading border-r-8 md:border-r-12 border-[#1089A4] pr-6 md:pr-10 leading-tight">حـقـيـبة <span className="text-[#1089A4]">الـتـسـوق</span></h1>
            </div>
            <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-[#021D24]/20">
               <Link href="/shop" className="hover:text-[#F29124] transition-colors">مواصلة التسوق</Link>
               <span>/</span>
               <span className="text-[#021D24]">مراجعة السلة</span>
            </div>
         </div>
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1089A4]/5 blur-[200px] rounded-full" />
      </section>

      {/* 2. Main Content */}
      <main className="max-w-[1920px] mx-auto px-4 md:px-12 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
         {/* Cart Items */}
         <div className="lg:col-span-8 space-y-12">
            <AnimatePresence mode="popLayout">
               {cart.length > 0 ? cart.map((item) => (
                 <motion.div 
                   key={item.id}
                   layout
                   initial={{ opacity: 0, x: -30 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: 30 }}
                   className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 shadow-xl border border-border/5 group"
                 >
                    <div className="relative w-32 h-32 md:w-44 md:h-44 rounded-2xl md:rounded-[2.5rem] overflow-hidden flex-shrink-0 bg-muted">
                       <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    
                    <div className="flex-grow space-y-4 text-center md:text-right">
                       <p className="text-[#1089A4] text-[10px] font-black uppercase tracking-widest">{item.vendor} - مورد موثق</p>
                       <h3 className="text-2xl font-black text-[#021D24] tracking-tight leading-tight group-hover:text-[#1089A4] transition-colors font-heading">{item.title}</h3>
                       <p className="text-xl font-black text-[#F29124]">{item.price.toLocaleString()} ج.س</p>
                    </div>

                    <div className="flex items-center gap-8 px-10 py-4 bg-muted/30 rounded-2xl border border-border/10">
                       <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-2xl font-black hover:text-[#1089A4] transition-colors cursor-pointer">－</button>
                       <span className="text-xl font-black text-[#021D24] min-w-[30px] text-center">{item.quantity}</span>
                       <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-2xl font-black hover:text-[#1089A4] transition-colors cursor-pointer">＋</button>
                    </div>

                    <button 
                      onClick={() => removeItem(item.id)}
                      className="w-14 h-14 bg-[#FF0000]/5 text-[#FF0000] rounded-2xl flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-all shadow-sm"
                    >
                       <span className="material-symbols-rounded">delete</span>
                    </button>
                 </motion.div>
               )) : (
                 <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] p-16 md:p-32 text-center space-y-6 md:space-y-10 border-4 border-dashed border-border/50">
                    <span className="material-symbols-rounded text-6xl md:text-9xl text-[#021D24]/10 animate-pulse">shopping_cart_off</span>
                    <div className="space-y-4">
                       <h2 className="text-3xl md:text-5xl font-black text-[#021D24] tracking-tighter font-heading leading-tight">سلة التسوق فارغة</h2>
                       <p className="text-base md:text-xl font-medium text-[#021D24]/30">ابدأ بإضافة المنتجات التي تحبها الآن وابدأ رحلة تسوقك</p>
                    </div>
                    <Link href="/shop" className="inline-block bg-[#1089A4] text-white px-10 md:px-20 py-4 md:py-7 rounded-[1.5rem] md:rounded-[2.5rem] font-black text-xs md:text-sm uppercase tracking-[0.3em] md:tracking-[0.4em] shadow-2xl hover:scale-110 transition-all">الذهاب للمتجر</Link>
                 </div>
               )}
            </AnimatePresence>
         </div>

         {/* Summary Sidebar */}
         <aside className="lg:col-span-4">
            <div className="sticky top-44 space-y-8">
               <div className="bg-[#021D24] rounded-[3.5rem] p-12 text-white shadow-4xl space-y-10 border-8 border-white/5">
                  <h3 className="text-4xl font-black tracking-tighter font-heading">ملخص الطـلب</h3>
                  
                  <div className="space-y-6 pt-6 border-t border-white/5">
                     <div className="flex justify-between items-center text-sm font-black uppercase tracking-widest text-white/40">
                        <span>إجمالي المنتجات</span>
                        <span className="text-white">{subtotal.toLocaleString()} ج.س</span>
                     </div>
                     <div className="flex justify-between items-center text-sm font-black uppercase tracking-widest text-[#1089A4]">
                        <span>تكاليف الشحن (الخرطوم)</span>
                        <span>{shipping.toLocaleString()} ج.س</span>
                     </div>
                     <div className="h-0.5 bg-white/10 my-10" />
                     <div className="flex justify-between items-end">
                        <div className="space-y-2 text-right w-full">
                           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#F29124]">TOTAL AMOUNT</span>
                           <h4 className="text-3xl md:text-5xl font-black tracking-tighter leading-none">{total.toLocaleString()} ج.س</h4>
                        </div>
                     </div>
                  </div>

                  <button className="w-full bg-[#1089A4] text-white py-8 rounded-[2rem] font-black text-sm uppercase tracking-[0.4em] shadow-3xl hover:bg-[#F29124] hover:text-[#021D24] transition-all hover:-translate-y-2 active:scale-95 border-b-8 border-black/10">
                    إكمال عملية الدفع
                  </button>

                  <div className="pt-6 flex items-center justify-center gap-6 opacity-20">
                     <span className="material-symbols-rounded text-4xl">verified_user</span>
                     <span className="material-symbols-rounded text-4xl">payments</span>
                     <span className="material-symbols-rounded text-4xl">local_shipping</span>
                  </div>
               </div>

               {/* Promo Code Hub */}
               <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-border/5 space-y-6">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-[#021D24]/40 text-right pr-4">هل لديك كود خصم؟</h5>
                  <div className="flex gap-4">
                     <button className="bg-[#021D24] text-white px-8 rounded-xl font-bold hover:bg-[#1089A4] transition-all">تطبيق</button>
                     <input type="text" placeholder="أدخل الكود هنا..." className="flex-grow bg-muted/30 px-6 py-4 rounded-xl outline-none text-right font-bold text-sm" />
                  </div>
               </div>
            </div>
         </aside>
      </main>
    </div>
  );
}
