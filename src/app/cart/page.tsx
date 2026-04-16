"use client"

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/CartContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeItem, updateQty, subtotal } = useCart();
  const router = useRouter();

  const shipping = cart.length > 0 ? 5000 : 0;
  const total = subtotal + shipping;
  const isEmpty = cart.length === 0;

  return (
    <div className="min-h-screen bg-[#F8F9FA]" dir="rtl">

      {/* ── Header ── */}
      <section className="bg-white pt-32 md:pt-44 pb-12 md:pb-20 px-4 md:px-12 border-b border-border/50 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 relative z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-[#1089A4]">
              <span className="w-10 h-1 bg-[#F29124] rounded-full" />
              SECURE CHECKOUT
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-[#021D24] tracking-tighter font-heading border-r-8 border-[#1089A4] pr-8 leading-tight">
              حـقـيـبة <span className="text-[#1089A4]">الـتـسـوق</span>
            </h1>
          </div>
          <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-[#021D24]/20">
            <Link href="/shop" className="hover:text-[#F29124] transition-colors">مواصلة التسوق</Link>
            <span>/</span>
            <span className="text-[#021D24]">مراجعة السلة</span>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1089A4]/5 blur-[200px] rounded-full pointer-events-none" />
      </section>

      {/* ── Main Content ── */}
      <main className="max-w-[1400px] mx-auto px-4 md:px-12 py-12 md:py-20">

        {isEmpty ? (
          /* ── Empty State ── */
          <div className="flex flex-col items-center justify-center py-24 md:py-40 gap-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-40 h-40 rounded-[3rem] bg-white shadow-2xl border-4 border-dashed border-border/30 flex items-center justify-center"
            >
              <span className="material-symbols-rounded text-7xl text-[#021D24]/10">shopping_cart_off</span>
            </motion.div>

            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-6xl font-black text-[#021D24] tracking-tighter font-heading">
                سلة التسوق فارغة
              </h2>
              <p className="text-base md:text-xl text-[#021D24]/30 font-medium max-w-md mx-auto leading-relaxed">
                ابدأ بإضافة المنتجات التي تحبها الآن وابدأ رحلة تسوقك الممتعة
              </p>
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center gap-3 bg-[#1089A4] text-white px-12 py-5 rounded-[2rem] font-black text-sm uppercase tracking-[0.4em] shadow-[0_20px_50px_rgba(16,137,164,0.35)] hover:scale-105 hover:shadow-[0_30px_60px_rgba(16,137,164,0.4)] active:scale-95 transition-all border-b-4 border-black/20"
            >
              <span className="material-symbols-rounded">storefront</span>
              الذهاب للمتجر
            </Link>
          </div>

        ) : (
          /* ── Cart Content ── */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">

            {/* Cart Items */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-black uppercase tracking-[0.4em] text-[#021D24]/40">
                  المنتجات ({cart.length})
                </h2>
                <Link href="/shop" className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1089A4] hover:text-[#F29124] transition-colors flex items-center gap-1">
                  <span className="material-symbols-rounded text-sm">add_shopping_cart</span>
                  إضافة المزيد
                </Link>
              </div>

              <AnimatePresence mode="popLayout">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 60, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="bg-white rounded-[2rem] p-5 md:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-lg border border-border/5 hover:shadow-2xl hover:border-[#1089A4]/10 transition-all group"
                  >
                    {/* Image */}
                    <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden flex-shrink-0 bg-muted">
                      <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>

                    {/* Details */}
                    <div className="flex-grow space-y-2 text-center sm:text-right w-full">
                      <p className="text-[#1089A4] text-[9px] font-black uppercase tracking-widest">{item.vendor} — مورد موثق</p>
                      <h3 className="text-lg md:text-xl font-black text-[#021D24] tracking-tight leading-snug font-heading">{item.title}</h3>
                      <p className="text-xl font-black text-[#F29124]">{item.price.toLocaleString()} ج.س</p>
                    </div>

                    {/* Qty Controls */}
                    <div className="flex items-center gap-4 bg-muted/40 rounded-2xl px-6 py-3 border border-border/10 flex-none">
                      <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-xl font-black hover:text-[#1089A4] transition-colors">－</button>
                      <span className="text-lg font-black text-[#021D24] min-w-[28px] text-center">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-xl font-black hover:text-[#1089A4] transition-colors">＋</button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-12 h-12 flex-none bg-red-50 text-red-400 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm flex-shrink-0"
                    >
                      <span className="material-symbols-rounded text-xl">delete</span>
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-32 space-y-6">

                {/* Summary Card */}
                <div className="bg-[#021D24] rounded-[2.5rem] p-8 md:p-10 text-white shadow-[0_40px_80px_rgba(2,29,36,0.35)] space-y-8 border-4 border-white/5">
                  <h3 className="text-3xl font-black tracking-tighter font-heading">ملخص الطـلب</h3>

                  <div className="space-y-5 pt-5 border-t border-white/5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black uppercase tracking-wider text-white/40">إجمالي المنتجات</span>
                      <span className="font-black text-white">{subtotal.toLocaleString()} ج.س</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black uppercase tracking-wider text-[#1089A4]">تكاليف الشحن (الخرطوم)</span>
                      <span className="font-black text-[#1089A4]">{shipping.toLocaleString()} ج.س</span>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div className="space-y-1 text-right">
                      <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#F29124]">TOTAL AMOUNT</span>
                      <p className="text-4xl font-black tracking-tighter font-heading">{total.toLocaleString()} <span className="text-2xl">ج.س</span></p>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push("/checkout")}
                    className="w-full bg-[#1089A4] text-white py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-[0.4em] hover:bg-[#F29124] hover:text-[#021D24] transition-all hover:-translate-y-1 active:scale-95 shadow-2xl border-b-4 border-black/20"
                  >
                    إكمال عملية الدفع
                  </button>

                  <div className="pt-2 flex items-center justify-center gap-5 opacity-30">
                    <span className="material-symbols-rounded text-3xl">verified_user</span>
                    <span className="material-symbols-rounded text-3xl">payments</span>
                    <span className="material-symbols-rounded text-3xl">local_shipping</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="bg-white rounded-[2rem] p-7 shadow-lg border border-border/5 space-y-5">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-[#021D24]/40 text-right">
                    هل لديك كود خصم؟
                  </h5>
                  <div className="flex gap-3">
                    <button className="bg-[#021D24] text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-[#1089A4] transition-all flex-none">
                      تطبيق
                    </button>
                    <input
                      type="text"
                      placeholder="أدخل الكود هنا..."
                      className="flex-grow bg-muted/30 px-5 py-3 rounded-xl outline-none text-right font-bold text-sm border-2 border-transparent focus:border-[#1089A4]/30 transition-all"
                    />
                  </div>
                </div>

              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
