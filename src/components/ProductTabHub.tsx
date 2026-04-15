"use client"

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const tabProducts: any = {
  new: [
    { id: "n1", title: "سماعات سوني WH-1000XM5 العازلة للضوضاء", price: 185000, vendor: "تكنو زون", location: "الخرطوم", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800", badge: "جديد" },
    { id: "n2", title: "آبل آيفون 15 برو ماكس - تيتانيوم", price: 980000, vendor: "مرسال جادجتس", location: "الخرطوم", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800", badge: "جديد" },
    { id: "n3", title: "ساعة رولكس أويستر بربتشوال", price: 950000, vendor: "نخبة الساعات", location: "الخرطوم", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800", badge: "جديد" },
    { id: "n4", title: "آبل ماك بوك برو 14 بوصة - M3", price: 1450000, vendor: "آبل سيستمز", location: "الرياض", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800", badge: "جديد" },
  ],
  best: [
    { id: "b1", title: "جهاز قهوة نسبريسو فيرتو المتطور", price: 65000, vendor: "البيت العصري", location: "بحري", image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&q=80&w=800", badge: "الأكثر مبيعاً" },
    { id: "b2", title: "نظارات شمسية برادا - كوليكشن صيف", price: 32000, vendor: "نظارات مكة", location: "الخرطوم", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800", badge: "الأكثر مبيعاً" },
  ],
  trending: [
    { id: "t1", title: "كاميرا سوني Alpha a7 IV المرآة", price: 420000, vendor: "كاميرا ورلد", location: "الخرطوم", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800", badge: "رائج" },
  ]
};

export default function ProductTabHub() {
  const [activeTab, setActiveTab] = useState("new");

  const tabs = [
    { id: "new", label: "وصل حديثاً" },
    { id: "best", label: "الأكثر مبيعاً" },
    { id: "trending", label: "الرائج الآن" },
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="responsive-container">
        <div className="flex flex-col items-center text-center space-y-12 mb-20">
           <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.6em] text-[#1089A4]">
              <span className="w-8 h-8 rounded-full bg-[#F29124] animate-ping opacity-20 absolute" />
              <span className="relative">DISCOVER ELITE PRODUCTS</span>
           </div>
           <h2 className="text-6xl md:text-8xl font-black text-[#021D24] tracking-tighter leading-none font-heading">
              اختر مـا يناسب <br /> <span className="text-[#F29124]">أسـلوب حيـاتك</span>
           </h2>

           {/* Elite Tab Controller */}
           <div className="bg-muted p-3 rounded-[3rem] border-4 border-white shadow-2xl flex gap-4 w-fit mx-auto relative overflow-hidden group">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-10 py-4 rounded-[2.5rem] font-black text-xs uppercase tracking-widest transition-all duration-500 relative z-10",
                    activeTab === tab.id ? "text-white" : "text-[#021D24]/30 hover:text-[#1089A4]"
                  )}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div 
                      layoutId="activeTab" 
                      className="absolute inset-0 bg-[#1089A4] rounded-[2.5rem] -z-10 shadow-xl shadow-[#1089A4]/30" 
                    />
                  )}
                </button>
              ))}
           </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12"
          >
            {tabProducts[activeTab].map((p: any) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </motion.div>
        </AnimatePresence>
        
        <div className="flex justify-center mt-20">
           <button className="bg-white border-4 border-muted text-[#021D24] px-16 py-7 rounded-[3rem] font-black text-xs uppercase tracking-[0.4em] shadow-xl hover:bg-[#F29124] hover:text-white hover:border-[#F29124] transition-all group">
              استكشف كافة الكتالوج <span className="material-symbols-rounded group-hover:rotate-[-45deg] transition-all ml-4">trending_flat</span>
           </button>
        </div>
      </div>
    </section>
  );
}
