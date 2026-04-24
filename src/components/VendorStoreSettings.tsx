"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function VendorStoreSettings() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    storeName: "",
    storeDescription: "",
    slug: "",
    location: "",
    address: "",
    storeLogo: "",
    storeBanner: "",
    primaryColor: "#0F1629",
    secondaryColor: "#3B82F6",
    facebookUrl: "",
    instagramUrl: "",
    whatsappNumber: ""
  });

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/vendor/settings");
        if (res.ok) {
          const data = await res.json();
          setFormData({
            storeName: data.storeName || "",
            storeDescription: data.storeDescription || "",
            slug: data.slug || "",
            location: data.location || "",
            address: data.address || "",
            storeLogo: data.storeLogo || "",
            storeBanner: data.storeBanner || "",
            primaryColor: data.primaryColor || "#0F1629",
            secondaryColor: data.secondaryColor || "#3B82F6",
            facebookUrl: data.facebookUrl || "",
            instagramUrl: data.instagramUrl || "",
            whatsappNumber: data.whatsappNumber || ""
          });
        }
      } catch (err) {
        console.error("Failed to fetch settings", err);
      } finally {
        setFetching(false);
      }
    }
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/vendor/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "فشل حفظ الإعدادات");
      
      alert("تم حفظ إعدادات المتجر بنجاح!");
      setFormData(prev => ({ ...prev, slug: result.slug })); // Update slug in case it changed/formatted
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin material-symbols-rounded text-5xl text-[#1089A4]">sync</div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-16">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-[#021D24] tracking-tighter">تخصيص <span className="text-[#1089A4]">المتجر</span></h2>
          <p className="text-gray-400 font-bold">تحكم في هوية متجرك البصرية وروابط التواصل الاجتماعي.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="bg-[#021D24] text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
        >
          {loading ? <span className="animate-spin material-symbols-rounded">sync</span> : <span className="material-symbols-rounded">save</span>}
          {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Visual Identity Section */}
        <div className="md:col-span-2 space-y-12">
          {/* Banner & Logo Preview */}
          <div className="space-y-6">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 px-2 block">الهوية البصرية (البانر والشعار)</label>
            <div className="relative group">
              {/* Banner Preview */}
              <div className="w-full h-64 rounded-[3rem] bg-gray-100 border-4 border-white shadow-2xl overflow-hidden relative">
                {formData.storeBanner ? (
                  <img src={formData.storeBanner} alt="Banner" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                    <span className="material-symbols-rounded text-6xl mb-2">image</span>
                    <span className="text-xs font-bold uppercase tracking-widest">لا يوجد بانر</span>
                  </div>
                )}
                {/* Logo Overlap */}
                <div className="absolute -bottom-6 right-12 w-32 h-32 rounded-[2rem] bg-white border-8 border-white shadow-2xl overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform">
                  {formData.storeLogo ? (
                    <img src={formData.storeLogo} alt="Logo" className="w-full h-full object-contain" />
                  ) : (
                    <span className="material-symbols-rounded text-3xl text-gray-200">storefront</span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">رابط صورة البانر</label>
                <input 
                  type="text" 
                  value={formData.storeBanner}
                  onChange={e => setFormData({ ...formData, storeBanner: e.target.value })}
                  placeholder="https://example.com/banner.jpg"
                  className="w-full bg-white border-2 border-transparent rounded-2xl px-6 py-4 shadow-sm focus:border-[#1089A4] outline-none transition-all font-bold text-xs"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">رابط صورة الشعار</label>
                <input 
                  type="text" 
                  value={formData.storeLogo}
                  onChange={e => setFormData({ ...formData, storeLogo: e.target.value })}
                  placeholder="https://example.com/logo.png"
                  className="w-full bg-white border-2 border-transparent rounded-2xl px-6 py-4 shadow-sm focus:border-[#1089A4] outline-none transition-all font-bold text-xs"
                />
              </div>
            </div>
          </div>

          {/* Store Info */}
          <div className="bg-white p-12 rounded-[4rem] border-4 border-white shadow-xl space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">اسم المتجر</label>
                <input 
                  type="text" 
                  value={formData.storeName}
                  onChange={e => setFormData({ ...formData, storeName: e.target.value })}
                  className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:border-[#1089A4] focus:bg-white outline-none transition-all font-black text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">رابط المتجر (Slug)</label>
                <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-[#1089A4] focus-within:bg-white transition-all overflow-hidden">
                  <span className="px-4 text-[10px] font-black text-gray-300">morsall.net/store/</span>
                  <input 
                    type="text" 
                    value={formData.slug}
                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                    className="flex-grow bg-transparent px-2 py-4 outline-none font-black text-sm text-[#1089A4]"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">وصف المتجر</label>
              <textarea 
                value={formData.storeDescription}
                onChange={e => setFormData({ ...formData, storeDescription: e.target.value })}
                rows={4}
                className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:border-[#1089A4] focus:bg-white outline-none transition-all font-bold text-sm resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">المدينة / المنطقة</label>
                <input 
                  type="text" 
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  placeholder="مثلاً: الخرطوم، السودان"
                  className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:border-[#1089A4] focus:bg-white outline-none transition-all font-bold text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">العنوان التفصيلي</label>
                <input 
                  type="text" 
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  placeholder="مثلاً: شارع الستين، عمارة ميرسال"
                  className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:border-[#1089A4] focus:bg-white outline-none transition-all font-bold text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Colors & Socials Section */}
        <div className="space-y-12">
          {/* Colors Card */}
          <div className="bg-white p-10 rounded-[3.5rem] border-4 border-white shadow-xl space-y-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#021D24]">ألوان الهوية</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase">اللون الأساسي</p>
                  <p className="text-[9px] font-bold text-gray-300">{formData.primaryColor}</p>
                </div>
                <input 
                  type="color" 
                  value={formData.primaryColor}
                  onChange={e => setFormData({ ...formData, primaryColor: e.target.value })}
                  className="w-16 h-16 rounded-2xl cursor-pointer border-4 border-gray-50 shadow-inner"
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase">اللون الفرعي</p>
                  <p className="text-[9px] font-bold text-gray-300">{formData.secondaryColor}</p>
                </div>
                <input 
                  type="color" 
                  value={formData.secondaryColor}
                  onChange={e => setFormData({ ...formData, secondaryColor: e.target.value })}
                  className="w-16 h-16 rounded-2xl cursor-pointer border-4 border-gray-50 shadow-inner"
                />
              </div>
            </div>
            <div className="pt-4">
               <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full shadow-lg" style={{ backgroundColor: formData.primaryColor }} />
                  <div className="w-8 h-8 rounded-full shadow-lg" style={{ backgroundColor: formData.secondaryColor }} />
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">معاينة الألوان</span>
               </div>
            </div>
          </div>

          {/* Social Media Card */}
          <div className="bg-[#021D24] p-10 rounded-[3.5rem] text-white shadow-2xl space-y-8 relative overflow-hidden">
            <div className="relative z-10 space-y-8">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#1089A4]">روابط التواصل</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-white/30 uppercase tracking-widest px-1">رابط فيسبوك</label>
                  <div className="flex items-center bg-white/5 rounded-xl border border-white/10 group-focus-within:border-[#1089A4] transition-all">
                    <span className="px-4 text-[#1089A4] material-symbols-rounded text-lg">facebook</span>
                    <input 
                      type="text" 
                      value={formData.facebookUrl}
                      onChange={e => setFormData({ ...formData, facebookUrl: e.target.value })}
                      placeholder="facebook.com/..."
                      className="bg-transparent flex-grow px-2 py-3 text-xs outline-none font-bold"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-white/30 uppercase tracking-widest px-1">رابط انستغرام</label>
                  <div className="flex items-center bg-white/5 rounded-xl border border-white/10 group-focus-within:border-[#1089A4] transition-all">
                    <span className="px-4 text-[#F29124] material-symbols-rounded text-lg">photo_camera</span>
                    <input 
                      type="text" 
                      value={formData.instagramUrl}
                      onChange={e => setFormData({ ...formData, instagramUrl: e.target.value })}
                      placeholder="instagram.com/..."
                      className="bg-transparent flex-grow px-2 py-3 text-xs outline-none font-bold"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-white/30 uppercase tracking-widest px-1">رقم الواتساب</label>
                  <div className="flex items-center bg-white/5 rounded-xl border border-white/10 group-focus-within:border-[#1089A4] transition-all">
                    <span className="px-4 text-green-500 material-symbols-rounded text-lg">chat</span>
                    <input 
                      type="text" 
                      value={formData.whatsappNumber}
                      onChange={e => setFormData({ ...formData, whatsappNumber: e.target.value })}
                      placeholder="249..."
                      className="bg-transparent flex-grow px-2 py-3 text-xs outline-none font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>
            <span className="material-symbols-rounded absolute -bottom-10 -right-10 text-[10rem] text-white/5 rotate-12">language</span>
          </div>
        </div>
      </div>
    </div>
  );
}
