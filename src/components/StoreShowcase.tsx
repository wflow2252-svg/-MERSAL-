"use client"

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const stores = [
  { id: "1", name: "أبل ستور السودان", category: "إلكترونيات", rating: 4.9, reviews: 1250, image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=300", verified: true },
  { id: "2", name: "نخبة الأزياء", category: "ملابس وموضة", rating: 4.8, reviews: 850, image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=300", verified: true },
  { id: "3", name: "تكنو زون", category: "موبايلات", rating: 4.7, reviews: 3200, image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=300", verified: true },
  { id: "4", name: "روائع الساعات", category: "إكسسوارات", rating: 5.0, reviews: 420, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=300", verified: true },
  { id: "5", name: "البيت العصري", category: "منزل ومطبخ", rating: 4.6, reviews: 980, image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=300", verified: true },
];

export default function StoreShowcase() {
  return (
    <section className="px-6 md:px-12 py-24 bg-muted/30">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8 text-right underline-offset-8">
           <div className="space-y-4">
              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.5em] text-[#F29124]">
                 <span className="w-10 h-0.5 bg-[#1089A4]" /> ELITE VENDORS
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-[#021D24] tracking-tighter font-heading">
                 تسوق من <br /> <span className="text-[#1089A4]">أفضل المتاجر الموثوقة</span>
              </h2>
           </div>
           <Link href="/stores" className="bg-white border-4 border-white text-[#021D24] px-14 py-6 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] shadow-xl hover:bg-[#021D24] hover:text-white transition-all duration-700">
              استكشف كافة الموردين
           </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-12">
          {stores.map((store) => (
            <div 
              key={store.id}
              className="group bg-white rounded-[3.5rem] p-10 border-4 border-white shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_100px_rgba(0,0,0,0.08)] transition-all duration-700 hover:-translate-y-4 relative overflow-hidden cursor-pointer"
            >
               {/* Verified Badge - Elite Design */}
               <div className="absolute top-8 left-8 z-20">
                  <div className="bg-[#1089A4] text-white p-2.5 rounded-2xl shadow-xl shadow-[#1089A4]/20 border-4 border-white">
                     <span className="material-symbols-rounded text-xl font-bold">verified</span>
                  </div>
               </div>

               <div className="flex flex-col items-center text-center space-y-8 relative z-10">
                  <div className="relative w-36 h-36 rounded-full overflow-hidden border-8 border-muted shadow-inner group-hover:scale-110 transition-all duration-700 ring-4 ring-white">
                     <Image src={store.image} alt={store.name} fill className="object-cover" />
                  </div>
                  
                  <div className="space-y-3">
                     <h3 className="text-2xl font-black text-[#021D24] tracking-tight group-hover:text-[#1089A4] transition-colors font-heading">{store.name}</h3>
                     <p className="text-[10px] font-black text-[#021D24]/20 uppercase tracking-[0.3em]">{store.category}</p>
                  </div>

                  <div className="flex items-center gap-3 py-3 px-6 bg-muted/50 rounded-2xl">
                     <span className="material-symbols-rounded text-[#F29124] text-lg fill-1">star</span>
                     <span className="text-xs font-black text-[#021D24]">{store.rating}</span>
                     <span className="text-[10px] text-[#021D24]/20 font-black">({store.reviews})</span>
                  </div>

                  <button className="w-full py-4 rounded-2xl border-2 border-[#1089A4]/10 text-[#1089A4] font-black text-[10px] uppercase tracking-widest hover:bg-[#1089A4] hover:text-white transition-all active:scale-95">
                     زيارة المتجر
                  </button>
               </div>
               
               {/* Atmospheric Background Logo */}
               <span className="material-symbols-rounded absolute bottom-[-40px] right-[-40px] text-[12rem] text-[#021D24]/5 -rotate-12 transition-all group-hover:rotate-0 duration-1000">storefront</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
