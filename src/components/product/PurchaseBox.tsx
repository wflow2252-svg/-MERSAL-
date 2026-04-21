"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/CartContext";
import { calculateShipping, City } from "@/lib/logistics";
import { Product } from "@/lib/mockData/products";

export default function PurchaseBox({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [customerCity, setCustomerCity] = useState<City>("الخرطوم");
  const { addItem } = useCart();

  const shippingFee = calculateShipping(customerCity, [product.vendorLocation]);
  const discountedPrice = product.discount 
    ? Math.floor(product.price * (1 - product.discount / 100)) 
    : product.price;

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-8 sticky top-44">
      {/* Price & Primary Status */}
      <div className="space-y-4">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black text-[#CB2E26]">{discountedPrice.toLocaleString()}</span>
          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">ج.س</span>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-sm font-black text-green-600">متوفّر — اطلب الآن</span>
        </div>
      </div>

      {/* Trust & Policy Bridge */}
      <div className="space-y-4 py-6 border-y border-gray-50">
        <div className="flex items-start gap-4">
          <span className="material-symbols-rounded text-[#F29124] text-xl">replay</span>
          <div>
            <p className="text-xs font-black text-[#021D24]">إرجاع مجاني وسهل</p>
            <p className="text-[10px] text-gray-400 font-bold">خلال 15 يوماً من الاستلام</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <span className="material-symbols-rounded text-green-500 text-xl">verified_user</span>
          <div>
            <p className="text-xs font-black text-[#021D24]">معاملة آمنة 100%</p>
            <p className="text-[10px] text-gray-400 font-bold">تشفير وحماية لكافة بياناتك</p>
          </div>
        </div>
      </div>

      {/* Shipping / Logistics Module */}
      <div className="space-y-4 bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-black text-[#1089A4] uppercase tracking-widest">التوصيل إلى:</label>
          <select 
            value={customerCity}
            onChange={(e) => setCustomerCity(e.target.value as City)}
            className="bg-transparent text-sm font-black text-[#021D24] outline-none cursor-pointer border-none p-0"
          >
            <option value="الخرطوم">الخرطوم</option>
            <option value="أمدرمان">أمدرمان</option>
            <option value="بحري">بحري</option>
            <option value="بورتسودان">بورتسودان</option>
            <option value="مدني">مدني</option>
          </select>
        </div>
        
        <div className="flex flex-col">
          <p className="text-xs font-black text-[#021D24]">توصيل غداً، 23 أبريل</p>
          <p className="text-[10px] text-gray-400 font-bold">إذا أتممت الطلب خلال 5 ساعات</p>
        </div>

        <div className="pt-2 flex justify-between items-center">
            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">رسوم الشحن:</span>
            <span className="text-sm font-black text-[#1089A4]">{shippingFee === 0 ? "مجاني" : `${shippingFee.toLocaleString()} ج.س`}</span>
        </div>
      </div>

      {/* Checkout Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4">
          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">الكمية:</span>
          <div className="flex items-center gap-4">
            <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="text-xl font-bold text-gray-300 hover:text-[#1089A4]">-</button>
            <span className="w-8 text-center font-black text-lg text-[#021D24]">{quantity}</span>
            <button onClick={() => setQuantity(q => q+1)} className="text-xl font-bold text-gray-300 hover:text-[#1089A4]">+</button>
          </div>
        </div>

        <div className="space-y-3">
          <button 
            onClick={() => addItem({ id: product.id, title: product.title, price: discountedPrice, quantity, vendor: product.vendor, image: product.image })}
            className="w-full h-16 bg-[#F29124] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-orange-500/10 hover:bg-orange-500 transition-all flex items-center justify-center gap-4"
          >
            إضافة إلى العربة <span className="material-symbols-rounded">shopping_cart</span>
          </button>
          <button className="w-full h-16 bg-[#1089A4] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-[#1089A4]/10 hover:bg-[#0D708E] transition-all">
            اشترِ الآن
          </button>
        </div>
      </div>

      {/* Meta Identity */}
      <div className="pt-4 space-y-1">
        <p className="text-[10px] font-bold text-gray-400">يشحن بواسطة: <span className="text-[#021D24] font-black underline">مرسال كير</span></p>
        <p className="text-[10px] font-bold text-gray-400">يباع بواسطة: <span className="text-[#1089A4] font-black underline">{product.vendor}</span></p>
      </div>
    </div>
  );
}
