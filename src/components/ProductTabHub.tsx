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
        <div className="flex flex-col items-center text-center space-y-10 mb-20">
           <div className="flex items-center gap-4 text-[12px] font-bold uppercase tracking-[0.4em] text-primary">
              <span className="w-8 h-8 rounded-full bg-secondary animate-pulse opacity-10 absolute" />
              <span className="relative">اكتشف منتجات النخبة</span>
           </div>
           <h2 className="text-5xl md:text-7xl font-black text-foreground tracking-tight leading-tight font-heading">
              اختر مـا يناسب <br /> <span className="text-secondary">أسـلوب حيـاتك</span>
           </h2>

           {/* Tab Controller */}
           <div className="bg-muted p-2 rounded-3xl border-2 border-border shadow-sm flex gap-3 w-fit mx-auto relative overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-8 py-3 rounded-2xl font-bold text-sm transition-all duration-300 relative z-10",
                    activeTab === tab.id ? "text-white" : "text-foreground/40 hover:text-primary"
                  )}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div 
                      layoutId="activeTab" 
                      className="absolute inset-0 bg-primary rounded-2xl -z-10 shadow-lg shadow-primary/20" 
                    />
                  )}
                </button>
              ))}
           </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
          >
            {tabProducts[activeTab].map((p: any) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </motion.div>
        </AnimatePresence>
        
        <div className="flex justify-center mt-20">
           <button className="bg-white border-2 border-border text-foreground px-12 py-5 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-lg hover:bg-secondary hover:text-white hover:border-secondary transition-all group flex items-center gap-4">
              استكشف كافة الكتالوج <span className="material-symbols-rounded group-hover:translate-x-[-10px] transition-all">east</span>
           </button>
        </div>
      </div>
    </section>
  );
}

