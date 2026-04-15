"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#021D24]/40 backdrop-blur-sm" 
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col relative z-10 border-8 border-white"
        >
          {/* Header */}
          <div className="px-12 py-10 border-b border-border flex items-center justify-between flex-shrink-0 bg-white">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-[#1089A4]/10 text-[#1089A4] rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-[#1089A4]/5 border border-[#1089A4]/10">
                <span className="material-symbols-rounded text-3xl">inventory_2</span>
              </div>
              <div>
                <h2 className="text-3xl font-black tracking-tight text-[#021D24]">إضافة منتج جديد</h2>
                <p className="text-[10px] text-[#F29124] font-black uppercase tracking-widest mt-1">سيخضع المنتج لمراجعة الإدارة والموافقة البرمجية</p>
              </div>
            </div>
            <button onClick={onClose} className="p-4 hover:bg-muted rounded-2xl transition-all group">
              <span className="material-symbols-rounded text-2xl text-foreground/20 group-hover:text-red-500 transition-colors">close</span>
            </button>
          </div>

          {/* Body */}
          <div className="flex-grow overflow-y-auto p-12 space-y-12 custom-scrollbar">
            {/* 1. Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 px-1">اسم المنتج</label>
                  <input type="text" placeholder="مثلاً: سماعة بلوتوث لاسلكية" className="w-full bg-muted/30 border-2 border-transparent rounded-[1.5rem] px-6 py-4 focus:border-primary focus:bg-white outline-none transition-all font-bold text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 px-1">السعر (ج.س)</label>
                    <input type="number" placeholder="0.00" className="w-full bg-muted/30 border-2 border-transparent rounded-[1.5rem] px-6 py-4 focus:border-primary focus:bg-white outline-none transition-all font-black text-sm text-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 px-1">الكمية</label>
                    <input type="number" placeholder="0" className="w-full bg-muted/30 border-2 border-transparent rounded-[1.5rem] px-6 py-4 focus:border-primary focus:bg-white outline-none transition-all font-black text-sm" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 px-1">التصنيف</label>
                  <select className="w-full bg-muted/30 border-2 border-transparent rounded-[1.5rem] px-6 py-4 focus:border-primary focus:bg-white outline-none transition-all cursor-pointer font-bold text-sm">
                    <option>إلكترونيات</option>
                    <option>أزياء</option>
                    <option>منزل ومطبخ</option>
                  </select>
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-2 h-full">
                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 px-1">صور المنتج (حتى 5 صور)</label>
                <div className="grid grid-cols-2 gap-4 h-[calc(100%-1.8rem)]">
                  <div className="col-span-2 border-4 border-dashed border-border/50 rounded-[2rem] flex flex-col items-center justify-center p-10 bg-muted/10 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group">
                    <span className="material-symbols-rounded text-5xl mb-4 text-foreground/10 group-hover:text-primary transition-all group-hover:scale-110">cloud_upload</span>
                    <span className="font-black text-xs uppercase tracking-widest">اسحب الصور هنا</span>
                    <span className="text-[9px] text-foreground/30 mt-2 font-bold italic">أو اضغط لتصفح الملفات</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Description */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 px-1">وصف المنتج التفصيلي</label>
              <textarea placeholder="اكتب وصفاً تفصيلياً يشمل المميزات والمواصفات..." className="w-full bg-muted/30 border-2 border-transparent rounded-[2.5rem] px-8 py-6 focus:border-primary focus:bg-white outline-none transition-all min-h-[150px] font-medium text-sm leading-relaxed" />
            </div>

            {/* 3. Variants (Colors & Sizes) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10 border-t border-border/50">
              <div className="space-y-6">
                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 px-1">الألوان المتاحة</label>
                <div className="flex flex-wrap gap-3">
                  {["#000000", "#FFFFFF", "#FF0000", "#0000FF", "#F29124", "#1089A4"].map((c) => (
                    <button key={c} className="w-10 h-10 rounded-full border-2 border-border p-1 hover:scale-110 hover:border-primary transition-all shadow-sm">
                      <div className="w-full h-full rounded-full" style={{ background: c }} />
                    </button>
                  ))}
                  <button className="w-10 h-10 rounded-full border-2 border-dashed border-border flex items-center justify-center hover:bg-muted hover:border-primary transition-all">
                    <span className="material-symbols-rounded text-lg text-foreground/20">add</span>
                  </button>
                </div>
              </div>
              <div className="space-y-6">
                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 px-1">المقاسات المتاحة</label>
                <div className="flex flex-wrap gap-3">
                  {["S", "Universal", "L", "Extra"].map((s) => (
                    <button key={s} className="px-6 py-3 border-2 border-border rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all">
                      {s}
                    </button>
                  ))}
                  <button className="px-6 py-3 border-2 border-dashed border-border rounded-2xl flex items-center justify-center hover:bg-muted hover:border-primary transition-all">
                    <span className="material-symbols-rounded text-lg text-foreground/20">add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-12 py-10 border-t border-border bg-stone-50/50 flex items-center justify-end gap-6 flex-shrink-0">
            <button onClick={onClose} className="px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-white border-2 border-border hover:bg-muted transition-all text-foreground/40">إلغاء</button>
            <button className="px-14 py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-primary text-white shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
              <span className="material-symbols-rounded text-lg">check_circle</span> حفظ وإرسال للمراجعة
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
