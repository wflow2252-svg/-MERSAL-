"use client"

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function StoreAnalytics({ stats }: { stats: any }) {
  return (
    <div className="space-y-16">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-[#021D24] tracking-tighter">التحليلات <span className="text-[#1089A4]">المتقدمة</span></h2>
          <p className="text-gray-400 font-bold">مراقبة أداء المتجر، المبيعات، ونمو الأرباح بدقة.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="bg-white px-6 py-3 rounded-2xl border-2 border-gray-100 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-black text-[#021D24] uppercase tracking-widest">تحديث مباشر</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Chart Mockup */}
        <div className="lg:col-span-2 bg-[#021D24] rounded-[4rem] p-12 text-white shadow-2xl relative overflow-hidden">
           <div className="relative z-10 space-y-10">
              <div className="flex items-center justify-between">
                 <div>
                    <h3 className="text-xl font-black mb-1">منحنى المبيعات</h3>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">آخر 30 يوم من النشاط</p>
                 </div>
                 <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#1089A4]" />
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">المبيعات</span>
                 </div>
              </div>
              
              {/* Mock SVG Chart */}
              <div className="h-64 w-full relative group">
                 <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
                    <defs>
                       <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#1089A4" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#1089A4" stopOpacity="0" />
                       </linearGradient>
                    </defs>
                    <path 
                      d="M0,250 Q150,180 300,220 T600,100 T1000,150 L1000,300 L0,300 Z" 
                      fill="url(#chartGradient)" 
                    />
                    <motion.path 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                      d="M0,250 Q150,180 300,220 T600,100 T1000,150" 
                      fill="none" 
                      stroke="#1089A4" 
                      strokeWidth="6" 
                      strokeLinecap="round" 
                    />
                    {/* Points */}
                    {[0, 300, 600, 1000].map((x, i) => (
                      <circle key={i} cx={x} cy={i === 0 ? 250 : i === 1 ? 220 : i === 2 ? 100 : 150} r="8" fill="white" className="shadow-2xl" />
                    ))}
                 </svg>
              </div>

              <div className="grid grid-cols-4 gap-4 text-center">
                 {['الأسبوع 1', 'الأسبوع 2', 'الأسبوع 3', 'الأسبوع 4'].map((w, i) => (
                   <span key={i} className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">{w}</span>
                 ))}
              </div>
           </div>
           <span className="material-symbols-rounded absolute -bottom-20 -left-20 text-[20rem] text-white/5 -rotate-12">monitoring</span>
        </div>

        {/* Breakdown Stats */}
        <div className="space-y-8">
           <div className="bg-white p-10 rounded-[3.5rem] border-4 border-white shadow-xl space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#021D24]">توزيع الأرباح</h3>
              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400">إجمالي المبيعات</span>
                    <span className="font-black text-[#021D24]">{stats?.totalSales?.toLocaleString()} ج.س</span>
                 </div>
                 <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1089A4]" style={{ width: '100%' }} />
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400">عمولة المنصة (10%)</span>
                    <span className="font-black text-red-500">-{ (stats?.totalSales * 0.1 || 0).toLocaleString() } ج.س</span>
                 </div>
                 <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                    <div className="h-full bg-red-400" style={{ width: '10%' }} />
                 </div>
                 <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-black text-[#021D24]">صافي الربح</span>
                    <span className="text-2xl font-black text-[#1089A4]">{stats?.netProfit?.toLocaleString()} ج.س</span>
                 </div>
              </div>
           </div>

           <div className="bg-gradient-to-br from-[#F29124] to-[#D47B1E] p-10 rounded-[3.5rem] text-[#021D24] shadow-2xl space-y-4">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <span className="material-symbols-rounded text-2xl">workspace_premium</span>
                 </div>
                 <h4 className="font-black text-lg">باقة المتجر الفاخرة</h4>
              </div>
              <p className="text-[10px] font-bold opacity-70 leading-relaxed">أنت تستخدم أعلى باقة برمجية للمتاجر حالياً. استمتع بكافة المميزات المتقدمة.</p>
           </div>
        </div>
      </div>

      {/* Traffic Sources Mock */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         {[
           { label: "مباشر", value: "45%", color: "bg-[#1089A4]", icon: "language" },
           { label: "فيسبوك", value: "30%", color: "bg-blue-600", icon: "facebook" },
           { label: "انستغرام", value: "20%", color: "bg-pink-500", icon: "photo_camera" },
           { label: "واتساب", value: "5%", color: "bg-green-500", icon: "chat" },
         ].map((source, i) => (
           <div key={i} className="bg-white p-8 rounded-[2.5rem] border-4 border-white shadow-lg flex items-center gap-6 group hover:scale-105 transition-all">
              <div className={cn("w-14 h-14 rounded-2xl text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform", source.color)}>
                 <span className="material-symbols-rounded text-2xl">{source.icon}</span>
              </div>
              <div>
                 <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{source.label}</p>
                 <p className="text-2xl font-black text-[#021D24]">{source.value}</p>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}
