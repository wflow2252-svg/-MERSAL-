"use client"

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/lib/CartContext";
import { useSession } from "next-auth/react";

const CITIES = ["الخرطوم", "أم درمان", "بحري", "الخرطوم بحري", "شندي", "مدني", "بورتسودان", "عطبرة"];

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const { data: session } = useSession();

  const [form, setForm] = useState({
    name: session?.user?.name || "",
    phone: "",
    city: "الخرطوم",
    address: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const shipping = 5000;
  const total = subtotal + shipping;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
    clearCart?.();
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6" dir="rtl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white rounded-[3rem] p-14 md:p-20 max-w-xl w-full text-center shadow-[0_40px_80px_rgba(0,0,0,0.1)] space-y-8"
        >
          <div className="w-24 h-24 bg-green-500 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-green-500/30">
            <span className="material-symbols-rounded text-5xl text-white">check_circle</span>
          </div>
          <div className="space-y-3">
            <h2 className="text-4xl font-black text-[#021D24] tracking-tighter font-heading">تم تأكيد طلبك!</h2>
            <p className="text-[#021D24]/40 font-medium">سيتواصل معك فريق مرسال قريباً لتأكيد التوصيل</p>
          </div>
          <div className="bg-muted/30 rounded-2xl p-6 text-right space-y-3">
            <div className="flex justify-between text-sm font-black">
              <span className="text-[#021D24]">{total.toLocaleString()} ج.س</span>
              <span className="text-[#021D24]/40 uppercase tracking-widest text-[10px]">إجمالي الطلب</span>
            </div>
            <div className="flex justify-between text-sm font-black">
              <span className="text-[#021D24]">{form.city} — {form.address}</span>
              <span className="text-[#021D24]/40 uppercase tracking-widest text-[10px]">عنوان التوصيل</span>
            </div>
          </div>
          <Link href="/shop" className="inline-flex items-center gap-3 bg-[#1089A4] text-white px-10 py-5 rounded-[2rem] font-black text-sm uppercase tracking-[0.4em] hover:scale-105 transition-all shadow-xl border-b-4 border-black/20">
            <span className="material-symbols-rounded">storefront</span>
            متابعة التسوق
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24" dir="rtl">

      {/* Header */}
      <section className="bg-white pt-32 md:pt-44 pb-12 px-4 md:px-12 border-b border-border/50 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 relative z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-[#F29124]">
              <span className="w-10 h-1 bg-[#1089A4] rounded-full" />
              إتمام الطلب
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-[#021D24] tracking-tighter font-heading border-r-8 border-[#F29124] pr-8 leading-tight">
              بيانات <span className="text-[#F29124]">التوصيل</span>
            </h1>
          </div>
          <Link href="/cart" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#021D24]/30 hover:text-[#1089A4] transition-colors">
            <span className="material-symbols-rounded text-base">arrow_forward</span>
            العودة للسلة
          </Link>
        </div>
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#F29124]/5 blur-[150px] rounded-full pointer-events-none" />
      </section>

      {/* Main */}
      <main className="max-w-[1400px] mx-auto px-4 md:px-12 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">

        {/* Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-lg border border-border/5 space-y-6">
              <h3 className="text-xl font-black text-[#021D24] tracking-tighter flex items-center gap-3">
                <span className="w-8 h-8 bg-[#1089A4]/10 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-rounded text-base text-[#1089A4]">person</span>
                </span>
                البيانات الشخصية
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#021D24]/40">الاسم الكامل</label>
                  <input
                    name="name" value={form.name} onChange={handleChange} required
                    placeholder="محمد أحمد..."
                    className="bg-muted/40 border-2 border-transparent focus:border-[#1089A4] rounded-2xl px-5 py-4 font-bold text-sm text-right outline-none transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#021D24]/40">رقم الهاتف</label>
                  <input
                    name="phone" value={form.phone} onChange={handleChange} required
                    placeholder="09X XXX XXXX"
                    type="tel"
                    className="bg-muted/40 border-2 border-transparent focus:border-[#1089A4] rounded-2xl px-5 py-4 font-bold text-sm text-right outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-lg border border-border/5 space-y-6">
              <h3 className="text-xl font-black text-[#021D24] tracking-tighter flex items-center gap-3">
                <span className="w-8 h-8 bg-[#F29124]/10 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-rounded text-base text-[#F29124]">location_on</span>
                </span>
                عنوان التوصيل
              </h3>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#021D24]/40">المدينة</label>
                <select
                  name="city" value={form.city} onChange={handleChange}
                  className="bg-muted/40 border-2 border-transparent focus:border-[#1089A4] rounded-2xl px-5 py-4 font-bold text-sm text-right outline-none transition-all appearance-none cursor-pointer"
                >
                  {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#021D24]/40">العنوان التفصيلي</label>
                <input
                  name="address" value={form.address} onChange={handleChange} required
                  placeholder="الحي، الشارع، رقم المنزل..."
                  className="bg-muted/40 border-2 border-transparent focus:border-[#1089A4] rounded-2xl px-5 py-4 font-bold text-sm text-right outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#021D24]/40">ملاحظات إضافية (اختياري)</label>
                <textarea
                  name="notes" value={form.notes} onChange={handleChange} rows={3}
                  placeholder="أي تفاصيل إضافية للتوصيل..."
                  className="bg-muted/40 border-2 border-transparent focus:border-[#1089A4] rounded-2xl px-5 py-4 font-bold text-sm text-right outline-none transition-all resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || cart.length === 0}
              className="w-full bg-[#1089A4] text-white py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.4em] shadow-[0_20px_50px_rgba(16,137,164,0.35)] hover:bg-[#F29124] hover:text-[#021D24] hover:-translate-y-1 active:scale-95 transition-all border-b-4 border-black/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  جاري تأكيد الطلب...
                </>
              ) : (
                <>
                  <span className="material-symbols-rounded">check_circle</span>
                  تأكيد الطلب الآن
                </>
              )}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <aside className="lg:col-span-5">
          <div className="sticky top-32 space-y-6">
            <div className="bg-[#021D24] rounded-[2.5rem] p-8 md:p-10 text-white shadow-[0_40px_80px_rgba(2,29,36,0.35)] space-y-8 border-4 border-white/5">
              <h3 className="text-2xl font-black tracking-tighter font-heading">مراجعة الطلب</h3>

              {/* Items List */}
              <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex-none overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-xs font-black text-white/80 truncate">{item.title}</p>
                      <p className="text-[10px] text-white/30 font-black">x{item.quantity}</p>
                    </div>
                    <span className="text-sm font-black text-[#F29124] flex-none">{(item.price * item.quantity).toLocaleString()} ج.س</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="flex justify-between text-sm font-black">
                  <span className="text-white">{subtotal.toLocaleString()} ج.س</span>
                  <span className="text-white/40 uppercase tracking-widest text-[10px]">المنتجات</span>
                </div>
                <div className="flex justify-between text-sm font-black">
                  <span className="text-[#1089A4]">{shipping.toLocaleString()} ج.س</span>
                  <span className="text-white/40 uppercase tracking-widest text-[10px]">الشحن</span>
                </div>
                <div className="h-px bg-white/10" />
                <div className="space-y-1 text-right">
                  <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#F29124]">TOTAL</span>
                  <p className="text-4xl font-black tracking-tighter font-heading">{total.toLocaleString()} <span className="text-2xl">ج.س</span></p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-5 opacity-25 pt-2">
                <span className="material-symbols-rounded text-3xl">verified_user</span>
                <span className="material-symbols-rounded text-3xl">payments</span>
                <span className="material-symbols-rounded text-3xl">local_shipping</span>
              </div>
            </div>
          </div>
        </aside>

      </main>
    </div>
  );
}
