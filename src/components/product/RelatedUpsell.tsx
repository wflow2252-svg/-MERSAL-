"use client"

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const upsellItems = [
  { id: "u1", title: "غطاء حماية سيليكون أصلي", price: 4500, image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=200" },
  { id: "u2", title: "رأس شاحن سريع 20 وات", price: 12000, image: "https://images.unsplash.com/photo-1619130762460-6346597b4754?auto=format&fit=crop&q=80&w=200" },
];

export default function RelatedUpsell() {
  const [selected, setSelected] = useState<string[]>(["u1", "u2"]);
  const basePrice = 980000;
  
  const totalPrice = basePrice + upsellItems.filter(i => selected.includes(i.id)).reduce((acc, curr) => acc + curr.price, 0);

  const toggleItem = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="bg-white rounded-[4rem] p-12 border-4 border-white shadow-2xl space-y-12">
      <div className="flex items-center justify-between border-b pb-8 border-border/40">
         <h4 className="text-3xl font-black text-[#021D24] font-heading tracking-tighter">اشتري الطقم ووفر أكثر <span className="text-[#F29124]">.</span></h4>
         <span className="bg-[#1089A4]/5 text-[#1089A4] px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest italic">عرض حصري للطقم</span>
      </div>

      <div className="flex flex-wrap items-center gap-10">
         <UpsellCard image="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=200" active />
         <span className="text-4xl text-[#021D24]/10 font-black">+</span>
         {upsellItems.map((item) => (
           <div key={item.id} className="flex items-center gap-10">
              <UpsellCard image={item.image} active={selected.includes(item.id)} onClick={() => toggleItem(item.id)} />
              {item.id === "u1" && <span className="text-4xl text-[#021D24]/10 font-black">+</span>}
           </div>
         ))}

         <div className="flex flex-col gap-4 mr-auto pt-10 xl:pt-0">
            <div className="flex flex-col leading-none">
               <span className="text-[10px] font-black text-[#021D24]/30 uppercase tracking-[0.3em] mb-2">إجمالي سعر الطقم</span>
               <div className="flex items-end gap-3 text-[#1089A4]">
                  <span className="text-6xl font-black tracking-tighter leading-none">{totalPrice.toLocaleString()}</span>
                  <span className="text-[14px] font-black uppercase tracking-widest mb-1.5">ج.س</span>
               </div>
            </div>
            <button className="bg-[#021D24] text-white px-12 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl hover:bg-[#1089A4] transition-all active:scale-95 border-b-8 border-black/20">
               أضف الكل للسلة
            </button>
         </div>
      </div>

      <div className="space-y-4 pt-4">
         {upsellItems.map((item) => (
           <label key={item.id} className="flex items-center gap-6 cursor-pointer group">
              <div className={cn(
                "w-7 h-7 rounded-md border-2 flex items-center justify-center transition-all",
                selected.includes(item.id) ? "bg-[#1089A4] border-[#1089A4]" : "bg-white border-border/40 group-hover:border-[#1089A4]"
              )}>
                <input type="checkbox" className="hidden" checked={selected.includes(item.id)} onChange={() => toggleItem(item.id)} />
                <span className="material-symbols-rounded text-white text-lg">check</span>
              </div>
              <span className={cn("text-sm font-black transition-all", selected.includes(item.id) ? "text-[#021D24]" : "text-[#021D24]/40")}>
                 <span className="text-[#1089A4]">{item.title}</span> - {item.price.toLocaleString()} ج.س
              </span>
           </label>
         ))}
      </div>
    </div>
  );
}

function UpsellCard({ image, active, onClick }: { image: string, active?: boolean, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "relative w-28 h-28 md:w-36 md:h-36 rounded-[2rem] overflow-hidden border-4 transition-all duration-500 cursor-pointer shadow-xl",
        active ? "border-[#1089A4] scale-105" : "border-transparent opacity-40 grayscale hover:opacity-100 hover:grayscale-0"
      )}
    >
      <Image src={image} alt="Upsell" fill className="object-cover" />
      {active && (
        <div className="absolute inset-0 bg-[#1089A4]/10 z-10" />
      )}
    </div>
  );
}
