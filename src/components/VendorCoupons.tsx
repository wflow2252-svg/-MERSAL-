"use client"

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function VendorCoupons() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discountType: "PERCENTAGE",
    discountValue: "",
    minOrderAmount: "",
    expiryDate: ""
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await fetch("/api/vendor/coupons");
      if (res.ok) setCoupons(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newCoupon.code || !newCoupon.discountValue) return alert("يرجى ملء البيانات");
    
    try {
      const res = await fetch("/api/vendor/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCoupon)
      });
      if (res.ok) {
        fetchCoupons();
        setIsAdding(false);
        setNewCoupon({ code: "", discountType: "PERCENTAGE", discountValue: "", minOrderAmount: "", expiryDate: "" });
      }
    } catch (err) {
      alert("فشل إنشاء الكوبون");
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-[#021D24] tracking-tighter">إدارة <span className="text-[#F29124]">الكوبونات</span></h2>
          <p className="text-gray-400 font-bold">قم بإنشاء رموز خصم لجذب المزيد من العملاء.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-[#021D24] text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-2xl hover:scale-105 active:scale-95 transition-all"
        >
          <span className="material-symbols-rounded">add_circle</span> إنشاء كوبون جديد
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-10 rounded-[3rem] border-4 border-[#F29124]/20 shadow-2xl space-y-8 animate-in fade-in slide-in-from-top-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">رمز الكوبون (Code)</label>
              <input 
                type="text" 
                value={newCoupon.code}
                onChange={e => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})}
                placeholder="E.G. RAMADAN2024"
                className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:border-[#F29124] outline-none transition-all font-black"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">نوع الخصم</label>
              <select 
                value={newCoupon.discountType}
                onChange={e => setNewCoupon({...newCoupon, discountType: e.target.value})}
                className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:border-[#F29124] outline-none transition-all font-bold"
              >
                <option value="PERCENTAGE">نسبة مئوية (%)</option>
                <option value="FIXED">مبلغ ثابت (ج.س)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">قيمة الخصم</label>
              <input 
                type="number" 
                value={newCoupon.discountValue}
                onChange={e => setNewCoupon({...newCoupon, discountValue: e.target.value})}
                placeholder="10"
                className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:border-[#F29124] outline-none transition-all font-black"
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button onClick={() => setIsAdding(false)} className="px-8 py-3 rounded-xl font-bold text-gray-400 hover:bg-gray-100 transition-all">إلغاء</button>
            <button onClick={handleCreate} className="bg-[#F29124] text-[#021D24] px-12 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#F29124]/20 hover:scale-105 transition-all">تفعيل الكوبون</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {coupons.map(coupon => (
          <div key={coupon.id} className="bg-white p-8 rounded-[2.5rem] border-4 border-white shadow-xl relative overflow-hidden group">
            <div className="relative z-10 flex flex-col h-full justify-between gap-6">
              <div className="flex justify-between items-start">
                <div className="w-16 h-16 bg-[#F29124]/10 text-[#F29124] rounded-2xl flex items-center justify-center border border-[#F29124]/10">
                  <span className="material-symbols-rounded text-3xl">confirmation_number</span>
                </div>
                <div className={cn("px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest", coupon.isActive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600")}>
                  {coupon.isActive ? "نشط" : "متوقف"}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#021D24] mb-1">{coupon.code}</h3>
                <p className="text-xs font-bold text-gray-400">
                  خصم {coupon.discountValue}{coupon.discountType === 'PERCENTAGE' ? '%' : ' ج.س'}
                </p>
              </div>
              <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-[10px] font-black text-gray-300 uppercase tracking-widest">
                <span>تاريخ البدء: {new Date(coupon.createdAt).toLocaleDateString("ar-EG")}</span>
                <span className="material-symbols-rounded text-lg text-[#F29124]">trending_flat</span>
              </div>
            </div>
            <span className="material-symbols-rounded absolute -bottom-8 -right-8 text-8xl text-gray-50 -rotate-12 group-hover:rotate-0 transition-transform">sell</span>
          </div>
        ))}

        {!loading && coupons.length === 0 && !isAdding && (
          <div className="col-span-full py-20 text-center bg-gray-50 rounded-[4rem] border-4 border-dashed border-gray-200">
            <span className="material-symbols-rounded text-6xl text-gray-200 mb-4 block">sell</span>
            <p className="text-gray-400 font-black text-xl uppercase tracking-widest">لا توجد كوبونات نشطة حالياً</p>
          </div>
        )}
      </div>
    </div>
  );
}
