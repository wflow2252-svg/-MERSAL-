"use client"

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    stock: "",
    categoryId: "",
    description: "",
    images: "", // Commas separated URLs for now
  });

  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [localFiles, setLocalFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetch("/api/admin/categories")
        .then(res => res.json())
        .then(data => setCategories(data))
        .catch(err => console.error("Failed to fetch categories", err));
    }
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setLocalFiles(prev => [...prev, ...files]);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeFile = (index: number) => {
    setLocalFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.price || !formData.categoryId) {
      alert("يرجى ملء البيانات الأساسية (الاسم، السعر، التصنيف)");
      return;
    }

    setLoading(true);
    try {
      let finalImageUrl = formData.images;

      // Upload local files first
      if (localFiles.length > 0) {
        const uploadPromises = localFiles.map(async (file) => {
          const body = new FormData();
          body.append("file", file);
          const res = await fetch("/api/upload", {
            method: "POST",
            body,
          });
          
          if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.error || "فشل في رفع إحدى الصور — قد يكون السبب حجم الملف أو قيود السيرفر");
          }
          
          const data = await res.json();
          return data.url;
        });

        const urls = await Promise.all(uploadPromises);
        finalImageUrl = urls.join(",");
      }

      const res = await fetch("/api/vendor/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          images: finalImageUrl,
          colors,
          sizes,
        }),
      });

      const result = await res.json().catch(() => ({ error: "خطأ غير معروف في السيرفر" }));

      if (!res.ok) throw new Error(result.error || "فشل في حفظ بيانات المنتج");

      alert("تم إرسال المنتج للمراجعة بنجاح!");
      onClose();
      router.refresh();
      // Reset form
      setFormData({ title: "", price: "", stock: "", categoryId: "", description: "", images: "" });
      setColors([]);
      setSizes([]);
    } catch (error: any) {
      alert(error.message || "حدث خطأ أثناء حفظ المنتج");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#021D24]/40 backdrop-blur-sm" 
        />

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col relative z-10 border-8 border-white"
        >
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

          <div className="flex-grow overflow-y-auto p-12 space-y-12 custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 px-1">اسم المنتج</label>
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    placeholder="مثلاً: سماعة بلوتوث لاسلكية" 
                    className="w-full bg-muted/30 border-2 border-transparent rounded-[1.5rem] px-6 py-4 focus:border-primary focus:bg-white outline-none transition-all font-bold text-sm" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 px-1">السعر (ج.س)</label>
                    <input 
                      type="number" 
                      value={formData.price}
                      onChange={e => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0.00" 
                      className="w-full bg-muted/30 border-2 border-transparent rounded-[1.5rem] px-6 py-4 focus:border-primary focus:bg-white outline-none transition-all font-black text-sm text-primary" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 px-1">الكمية</label>
                    <input 
                      type="number" 
                      value={formData.stock}
                      onChange={e => setFormData({ ...formData, stock: e.target.value })}
                      placeholder="0" 
                      className="w-full bg-muted/30 border-2 border-transparent rounded-[1.5rem] px-6 py-4 focus:border-primary focus:bg-white outline-none transition-all font-black text-sm" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 px-1">التصنيف</label>
                  <select 
                    value={formData.categoryId}
                    onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full bg-muted/30 border-2 border-transparent rounded-[1.5rem] px-6 py-4 focus:border-primary focus:bg-white outline-none transition-all cursor-pointer font-bold text-sm"
                  >
                    <option value="">اختار التصنيف...</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4 h-full">
                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 px-1">صور المنتج (من المعرض)</label>
                <div className="space-y-6">
                  {/* Gallery Grid */}
                  {previews.length > 0 && (
                    <div className="grid grid-cols-2 gap-4">
                      {previews.map((src, idx) => (
                        <div key={idx} className="relative aspect-square rounded-[1.5rem] overflow-hidden bg-muted group">
                          <img src={src} alt="Preview" className="w-full h-full object-cover" />
                          <button 
                            onClick={(e) => { e.preventDefault(); removeFile(idx); }}
                            className="absolute top-2 left-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          >
                            <span className="material-symbols-rounded text-sm">close</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <label className="cursor-pointer group block">
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*" 
                      onChange={handleFileChange} 
                      className="hidden" 
                    />
                    <div className="border-4 border-dashed border-[#1089A4]/20 rounded-[2.5rem] flex flex-col items-center justify-center p-10 bg-[#1089A4]/5 group-hover:bg-[#1089A4]/10 group-hover:border-[#1089A4]/40 transition-all">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl mb-4 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-rounded text-3xl text-[#1089A4]">add_photo_alternate</span>
                      </div>
                      <span className="text-xs font-black text-[#021D24]">اختر صوراً من المعرض</span>
                      <span className="text-[9px] text-[#F29124] font-bold uppercase tracking-widest mt-2 px-6 text-center leading-relaxed">اسحب الصور هنا أو اضغط للاختيار</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 px-1">وصف المنتج التفصيلي</label>
              <textarea 
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="اكتب وصفاً تفصيلياً يشمل المميزات والمواصفات..." 
                className="w-full bg-muted/30 border-2 border-transparent rounded-[2.5rem] px-8 py-6 focus:border-primary focus:bg-white outline-none transition-all min-h-[150px] font-medium text-sm leading-relaxed" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10 border-t border-border/50">
              <div className="space-y-6">
                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 px-1">الألوان (اختياري)</label>
                <div className="flex flex-wrap gap-3">
                  {["#000000", "#FFFFFF", "#CB2E26", "#1089A4"].map((c) => (
                    <button 
                      key={c} 
                      onClick={() => setColors(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])}
                      className={cn(
                        "w-10 h-10 rounded-full border-2 p-1 hover:scale-110 transition-all",
                        colors.includes(c) ? "border-primary" : "border-border"
                      )}
                    >
                      <div className="w-full h-full rounded-full" style={{ background: c }} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 px-1">المقاسات (اضغط للإضافة)</label>
                <div className="flex flex-wrap gap-3">
                  {["S", "M", "L", "XL", "Universal"].map((s) => (
                    <button 
                      key={s} 
                      onClick={() => setSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])}
                      className={cn(
                        "px-6 py-3 border-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                        sizes.includes(s) ? "border-primary text-primary" : "border-border text-foreground/40"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="px-12 py-10 border-t border-border bg-stone-50/50 flex items-center justify-end gap-6 flex-shrink-0">
            <button onClick={onClose} className="px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-white border-2 border-border hover:bg-muted transition-all text-foreground/40">إلغاء</button>
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="px-14 py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-primary text-white shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                 <span className="animate-spin material-symbols-rounded text-lg">sync</span>
              ) : (
                <span className="material-symbols-rounded text-lg">check_circle</span>
              )}
              {loading ? "جاري الحفظ..." : "حفظ وإرسال للمراجعة"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
