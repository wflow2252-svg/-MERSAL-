"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/CartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CITIES = ["الخرطوم", "أم درمان", "بحري", "الخرطوم بحري", "شندي", "مدني", "بورتسودان", "عطبرة", "كسلا", "الأبيض"];

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    name:     session?.user?.name || "",
    phone:    "",
    city:     "الخرطوم",
    district: "",
    street:   "",
    notes:    "",
    paymentMethod: "COD",
  });
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId]     = useState<string | null>(null);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);

  const shippingCost = 5000;
  const total        = subtotal + shippingCost;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:          form.name,
          phone:         form.phone,
          email:         session?.user?.email || "",
          city:          form.city,
          district:      form.district || form.city,
          street:        form.street,
          notes:         form.notes,
          paymentMethod: form.paymentMethod,
          subtotal,
          shippingCost,
          items: cart.map(item => ({
            productId: item.id,
            vendorId:  item.vendorId || "unknown",
            quantity:  item.quantity,
            price:     item.price,
            size:      item.size  || null,
            color:     item.color || null,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "حدث خطأ — حاول تاني");
        setLoading(false);
        return;
      }

      clearCart?.();
      setOrderId(data.orderId);
      setSubmitted(true);
    } catch (err) {
      setError("مشكلة في الاتصال — تحقق من الإنترنت");
    }
    setLoading(false);
  }

  // ── Success State ─────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-4 pt-24" dir="rtl">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm max-w-lg w-full p-8 text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <span className="material-symbols-rounded text-4xl text-green-600">check_circle</span>
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#021D24] mb-2">ممتاز! طلبك قيد التجهيز الآن 🎉</h1>
            <p className="text-sm text-gray-500">سيتواصل فريق مرسال معك قريباً على رقم <strong>{form.phone}</strong></p>
          </div>
          {orderId && (
            <div className="bg-[#F3F4F6] rounded-lg p-4 text-right">
              <p className="text-xs text-gray-400 font-bold">رقم الطلب</p>
              <p className="font-black text-[#1089A4] text-lg font-mono">#{orderId.slice(-8).toUpperCase()}</p>
            </div>
          )}
          <div className="bg-gray-50 rounded-lg p-4 text-right space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-black text-[#021D24]">{total.toLocaleString()} ج.س</span>
              <span className="text-gray-400">الإجمالي</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">{form.city} — {form.street}</span>
              <span className="text-gray-400">العنوان</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">{form.paymentMethod === "COD" ? "💵 دفع عند الاستلام" : "🏦 تحويل بنكي"}</span>
              <span className="text-gray-400">طريقة الدفع</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/shop" className="flex-1 bg-[#F29124] hover:bg-[#D97B10] text-white py-3 rounded-lg font-black text-sm transition-colors">
              متابعة التسوق
            </Link>
            <Link href="/orders" className="flex-1 bg-[#021D24] text-white py-3 rounded-lg font-black text-sm hover:bg-[#1A3340] transition-colors">
              طلباتي
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Checkout Form ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F3F4F6]" dir="rtl">

      {/* Breadcrumb header */}
      <div className="bg-white border-b border-gray-200 pt-24 pb-4">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
          <nav className="text-xs text-gray-400 font-bold flex items-center gap-2 mb-2">
            <Link href="/" className="hover:text-[#1089A4]">الرئيسية</Link>
            <span>/</span>
            <Link href="/cart" className="hover:text-[#1089A4]">السلة</Link>
            <span>/</span>
            <span className="text-[#021D24]">إتمام الطلب</span>
          </nav>
          <h1 className="text-xl font-black text-[#021D24]">احجز طلبك وانتظر التوصيل لبابك 📦</h1>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 lg:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ── Left: Form ── */}
        <div className="lg:col-span-8 space-y-4">

          {/* Error Banner */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 text-sm text-red-700 font-bold">
              <span className="material-symbols-rounded">error</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Personal Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
              <h2 className="font-black text-[#021D24] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-[#1089A4] text-white rounded text-xs flex items-center justify-center font-black">١</span>
                البيانات الشخصية
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">الاسم الكامل *</label>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="محمد أحمد..."
                    className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm font-bold text-right outline-none focus:border-[#1089A4] focus:ring-2 focus:ring-[#1089A4]/10 transition-all" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">رقم الهاتف *</label>
                  <input name="phone" value={form.phone} onChange={handleChange} required placeholder="09X XXXX XXXX" type="tel"
                    className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm font-bold text-right outline-none focus:border-[#1089A4] focus:ring-2 focus:ring-[#1089A4]/10 transition-all" dir="ltr" />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
              <h2 className="font-black text-[#021D24] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-[#1089A4] text-white rounded text-xs flex items-center justify-center font-black">٢</span>
                عنوان التوصيل
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">المدينة *</label>
                  <select name="city" value={form.city} onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm font-bold text-right outline-none focus:border-[#1089A4] transition-all bg-white">
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">الحي / المنطقة</label>
                  <input name="district" value={form.district} onChange={handleChange} placeholder="شمبات، بحري..."
                    className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm font-bold text-right outline-none focus:border-[#1089A4] transition-all" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-500 block mb-1">الشارع والعنوان التفصيلي *</label>
                  <input name="street" value={form.street} onChange={handleChange} required placeholder="شارع النيل، أمام البنك، بجانب المسجد..."
                    className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm font-bold text-right outline-none focus:border-[#1089A4] transition-all" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-500 block mb-1">ملاحظات للمندوب (اختياري)</label>
                  <textarea name="notes" value={form.notes} onChange={handleChange} rows={2} placeholder="أي تفاصيل إضافية..."
                    className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm font-bold text-right outline-none focus:border-[#1089A4] transition-all resize-none" />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
              <h2 className="font-black text-[#021D24] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-[#1089A4] text-white rounded text-xs flex items-center justify-center font-black">٣</span>
                طريقة الدفع
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { value: "COD",           icon: "payments",        label: "دفع عند الاستلام",  sub: "ادفع لما المندوب يوصلك" },
                  { value: "BANK_TRANSFER", icon: "account_balance", label: "تحويل بنكي",        sub: "حوّل المبلغ وارفع الإيصال" },
                ].map(m => (
                  <label key={m.value}
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${form.paymentMethod === m.value ? "border-[#1089A4] bg-[#1089A4]/5" : "border-gray-200 hover:border-gray-300"}`}>
                    <input type="radio" name="paymentMethod" value={m.value} checked={form.paymentMethod === m.value} onChange={handleChange} className="hidden" />
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${form.paymentMethod === m.value ? "bg-[#1089A4] text-white" : "bg-gray-100 text-gray-400"}`}>
                      <span className="material-symbols-rounded text-xl">{m.icon}</span>
                    </div>
                    <div>
                      <p className="font-black text-sm text-[#021D24]">{m.label}</p>
                      <p className="text-xs text-gray-400">{m.sub}</p>
                    </div>
                    {form.paymentMethod === m.value && (
                      <span className="material-symbols-rounded text-[#1089A4] text-xl mr-auto">radio_button_checked</span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || cart.length === 0}
              className="w-full bg-[#F29124] hover:bg-[#D97B10] disabled:bg-gray-300 text-white py-4 rounded-lg font-black text-sm transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  جاري تسجيل طلبك...
                </>
              ) : (
                <>
                  <span className="material-symbols-rounded">check_circle</span>
                  اطلب الآن والتوصيل لبابك
                </>
              )}
            </button>
          </form>
        </div>

        {/* ── Right: Order Summary ── */}
        <aside className="lg:col-span-4">
          <div className="sticky top-28">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-[#021D24] text-white p-4">
                <h3 className="font-black text-sm">ملخص الطلب ({cart.length} منتج)</h3>
              </div>
              <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-3 text-sm">
                    <div className="relative w-12 h-12 rounded border overflow-hidden flex-shrink-0 bg-gray-100">
                      {item.image && <Image src={item.image} alt={item.title} fill className="object-cover" />}
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="font-bold text-[#021D24] truncate text-xs">{item.title}</p>
                      <p className="text-gray-400 text-xs">× {item.quantity}</p>
                    </div>
                    <span className="font-black text-[#1089A4] text-xs flex-shrink-0">
                      {(item.price * item.quantity).toLocaleString()} ج.س
                    </span>
                  </div>
                ))}
                {cart.length === 0 && (
                  <p className="text-center text-gray-400 text-sm py-4">السلة فارغة</p>
                )}
              </div>
              <div className="border-t border-gray-100 p-4 space-y-3 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span className="font-bold">{subtotal.toLocaleString()} ج.س</span>
                  <span>المنتجات</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span className="font-bold">{shippingCost.toLocaleString()} ج.س</span>
                  <span>الشحن</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-black text-[#021D24]">
                  <span className="text-lg">{total.toLocaleString()} ج.س</span>
                  <span>الإجمالي</span>
                </div>
              </div>
              <div className="p-4 pt-0 border-t border-gray-100 flex items-center gap-3 text-xs text-gray-400">
                <span className="material-symbols-rounded text-base text-green-500">verified</span>
                شراء آمن ومضمون مع مرسال
              </div>
            </div>
          </div>
        </aside>

      </main>
    </div>
  );
}
