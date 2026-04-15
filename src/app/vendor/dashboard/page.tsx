"use client"

import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import AddProductModal from "@/components/AddProductModal";
import Image from "next/image";

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stats = [
    { label: "إجمالي المبيعات", value: "850,000 ج.س", icon: "shopping_cart", color: "from-[#1089A4] to-[#086F85]", trend: "+12.5%" },
    { label: "صافي الأرباح", value: "765,000 ج.س", icon: "account_balance_wallet", color: "from-[#021D24] to-[#010E12]", trend: "+8.2%" },
    { label: "الطلبات النشطة", value: "24", icon: "package_2", color: "from-[#F29124] to-[#D47B1E]", trend: "+4" },
  ];

  return (
    <div className="min-h-screen bg-muted/30 flex overflow-hidden font-sans">
      {/* Sidebar - Elite High Contrast Glass */}
      <aside className="w-80 bg-[#021D24] text-white flex flex-col pt-12 shadow-[40px_0_80px_rgba(2,29,36,0.2)] border-l border-white/5 relative z-20">
        <div className="px-10 mb-16">
          <div className="flex items-center gap-4 group">
            <div className="relative w-12 h-12 overflow-hidden rounded-2xl bg-white p-2 shadow-2xl ring-4 ring-white/10">
              <Image src="/logo.jpg" alt="Logo" fill className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tighter uppercase leading-none text-[#1089A4] font-heading">Mersal</span>
              <span className="text-[9px] font-black tracking-[0.4em] uppercase text-[#F29124] mt-1.5 opacity-80">Vendor Elite</span>
            </div>
          </div>
        </div>

        <nav className="flex-grow px-6 space-y-3">
          <EliteNavItem active={activeTab === "overview"} onClick={() => setActiveTab("overview")} icon="dashboard" label="لوحة التحكم" />
          <EliteNavItem active={activeTab === "products"} onClick={() => setActiveTab("products")} icon="inventory_2" label="المنتجات المركزية" />
          <EliteNavItem active={activeTab === "orders"} onClick={() => setActiveTab("orders")} icon="shopping_basket" label="طلبات المبيعات" />
          <EliteNavItem active={activeTab === "finance"} onClick={() => setActiveTab("finance")} icon="payments" label="المالية والسحب" />
          <div className="h-px bg-white/10 my-8 mx-4" />
          <EliteNavItem active={activeTab === "settings"} onClick={() => setActiveTab("settings")} icon="settings" label="إعدادات المتجر" />
        </nav>

        <div className="p-8">
          <div className="glass-dark p-6 rounded-[2.5rem] flex items-center gap-4 border-2 border-white/5 hover:bg-white/5 transition-all cursor-pointer group shadow-2xl">
            <div className="w-12 h-12 bg-gradient-to-br from-[#1089A4] to-[#086F85] rounded-2xl flex items-center justify-center font-black text-lg border-2 border-white/10 group-hover:scale-110 transition-transform">TZ</div>
            <div className="flex flex-col">
              <span className="text-xs font-black uppercase tracking-widest">تكنو زون</span>
              <span className="text-[10px] text-white/30 italic">مورد بلاتيني معتمد</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content - Spacious Elite Layout */}
      <main className="flex-grow flex flex-col overflow-y-auto relative z-10">
        {/* Header - Glassy Top Bar */}
        <header className="h-28 bg-white/80 backdrop-blur-xl border-b border-border/50 flex items-center justify-between px-12 flex-shrink-0 sticky top-0 z-50">
          <div className="relative w-[500px] group">
            <span className="material-symbols-rounded absolute right-6 top-1/2 -translate-y-1/2 text-[#021D24]/20 group-focus-within:text-[#1089A4] transition-colors">search_insights</span>
            <input type="text" placeholder="ابحث في مخزونك أو مبيعاتك..." className="w-full bg-muted/50 border-2 border-transparent rounded-[1.75rem] px-16 py-4 outline-none focus:bg-white focus:border-[#1089A4] text-sm font-bold transition-all shadow-inner" />
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-[#F29124] to-[#D47B1E] text-[#021D24] px-10 py-4 rounded-[1.75rem] font-black text-[11px] uppercase tracking-[0.2em] flex items-center gap-4 shadow-[0_15px_40px_rgba(242,145,36,0.3)] hover:scale-105 transition-all active:scale-95 border-b-4 border-black/10"
            >
              <span className="material-symbols-rounded text-xl">add_circle</span> إضافة منتج فاخر
            </button>
            <button className="p-4 bg-white rounded-2xl relative hover:shadow-xl transition-all border-2 border-muted group">
              <span className="material-symbols-rounded text-[#021D24]/30 text-2xl group-hover:text-[#1089A4]">notifications</span>
              <span className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-xl" />
            </button>
          </div>
        </header>

        {/* Dashboard View - Rich Aesthetic Grid */}
        <div className="p-16 space-y-20 max-w-[1920px] mx-auto w-full">
          {/* Welcome Area */}
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <h1 className="text-5xl font-black text-[#021D24] tracking-tighter font-heading leading-none">مرحباً مجدداً، <span className="text-[#1089A4]">تكنو زون</span> 👋</h1>
              <p className="text-[#021D24]/30 text-lg font-medium">أداء متجرك اليومي يعكس نمواً رائعاً في المبيعات.</p>
            </div>
            <div className="flex gap-4">
               <div className="glass px-10 py-4 rounded-3xl border-2 border-white shadow-sm flex items-center gap-4">
                  <span className="material-symbols-rounded text-[#F29124] text-xl">calendar_month</span>
                  <span className="text-sm font-black uppercase tracking-widest text-[#021D24]/60">{new Date().toLocaleDateString("ar-EG", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
               </div>
            </div>
          </div>

          {/* Stats - High Impact Rich Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="bg-white p-12 rounded-[4rem] border-4 border-white shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_50px_100px_-15px_rgba(0,0,0,0.1)] transition-all group relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-12 relative z-10">
                  <div className={cn("w-20 h-20 rounded-3xl text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform bg-gradient-to-br border-b-8 border-black/10", stat.color)}>
                    <span className="material-symbols-rounded text-4xl">{stat.icon}</span>
                  </div>
                  <div className="bg-green-500/10 text-green-600 px-5 py-2.5 rounded-2xl font-black text-xs flex items-center gap-2 border border-green-200">
                    {stat.trend} <span className="material-symbols-rounded text-base">trending_up</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 relative z-10">
                  <span className="text-[#021D24]/20 text-[11px] font-black uppercase tracking-[0.3em]">{stat.label}</span>
                  <span className="text-5xl font-black text-[#021D24] tracking-tighter font-heading">{stat.value}</span>
                </div>
                {/* Decorative Element */}
                <span className="material-symbols-rounded absolute bottom-[-50px] left-[-50px] text-[15rem] opacity-5 text-[#021D24] -rotate-12 transition-all group-hover:rotate-0 group-hover:scale-110">{stat.icon}</span>
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-muted/50 to-transparent pointer-events-none" />
              </motion.div>
            ))}
          </div>

          {/* Recent Orders - Premium Table Architecture */}
          <div className="bg-white rounded-[5rem] border-[12px] border-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="px-16 py-12 border-b border-border/50 flex items-center justify-between bg-white relative z-10">
               <div className="flex flex-col gap-2">
                  <h3 className="font-black text-3xl tracking-tighter text-[#021D24] font-heading">مراقبة الطلبات اللحظية</h3>
                  <p className="text-[#021D24]/30 text-xs font-bold uppercase tracking-widest">تحديث مباشر للمبيعات الواردة</p>
               </div>
              <button className="bg-muted text-[#021D24] px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#1089A4] hover:text-white transition-all flex items-center gap-4 shadow-xl shadow-black/5">
                 بيانات المبيعات الكاملة <span className="material-symbols-rounded text-base">analytics</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-muted/30 text-[11px] font-black uppercase tracking-[0.4em] text-[#021D24]/20 border-b border-border/50">
                    <th className="px-16 py-10 whitespace-nowrap">معرف الطلب</th>
                    <th className="px-16 py-10 whitespace-nowrap">العميل</th>
                    <th className="px-16 py-10 whitespace-nowrap">التوقيت البيني</th>
                    <th className="px-16 py-10 whitespace-nowrap">الصافي الإجمالي</th>
                    <th className="px-16 py-10 whitespace-nowrap">الحالة التنفيذية</th>
                    <th className="px-16 py-10 whitespace-nowrap"></th>
                  </tr>
                </thead>
                <tbody className="text-sm font-bold text-[#021D24]/70">
                  <EliteOrderRow id="#ORD-Elite-9921" customer="أحمد محمد" date="منذ ساعتين" amount="45,000 ج.س" status="قيد التجهيز" statusColor="text-[#F29124] bg-[#F29124]/10 border-[#F29124]/20" />
                  <EliteOrderRow id="#ORD-Elite-9920" customer="سارة علي" date="منذ 5 ساعات" amount="12,500 ج.س" status="تم التوصيل" statusColor="text-green-500 bg-green-500/10 border-green-200" />
                  <EliteOrderRow id="#ORD-Elite-9919" customer="محمد إبراهيم" date="أمس" amount="89,000 ج.س" status="تم التوصيل" statusColor="text-green-500 bg-green-500/10 border-green-200" />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <AddProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

function EliteNavItem({ icon, label, active, onClick }: { icon: string, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-5 px-8 py-5 rounded-[2rem] font-black text-[12px] uppercase tracking-[0.2em] transition-all group border-2 border-transparent",
        active ? "bg-white text-[#1089A4] shadow-[0_20px_40px_rgba(16,137,164,0.15)] ring-4 ring-[#1089A4]/10" : "text-white/30 hover:bg-white/5 hover:text-white"
      )}
    >
      <span className={cn(
        "material-symbols-rounded text-2xl transition-all group-hover:rotate-12", 
        active ? "text-[#1089A4]" : "opacity-30 group-hover:opacity-100"
      )}>{icon}</span>
      {label}
    </button>
  );
}

function EliteOrderRow({ id, customer, date, amount, status, statusColor }: any) {
  return (
    <tr className="border-b border-border/40 hover:bg-muted/20 transition-all cursor-pointer group">
      <td className="px-16 py-9 font-black text-[#1089A4] font-heading tracking-tight">{id}</td>
      <td className="px-16 py-9 text-[#021D24]">
         <div className="flex flex-col gap-1">
            <span className="font-black">{customer}</span>
            <span className="text-[10px] text-foreground/20 uppercase tracking-widest">عميل موثق</span>
         </div>
      </td>
      <td className="px-16 py-9 text-[#021D24]/30 flex items-center gap-3">
         <span className="material-symbols-rounded text-lg">history</span> {date}
      </td>
      <td className="px-16 py-9 font-black text-[#021D24] text-lg tracking-tighter">{amount}</td>
      <td className="px-16 py-9">
        <span className={cn("px-6 py-2.5 rounded-[1.25rem] text-[10px] font-black uppercase tracking-[0.3em] border shadow-sm", statusColor)}>
          {status}
        </span>
      </td>
      <td className="px-16 py-9 text-left">
        <button className="w-12 h-12 glass-dark text-white rounded-[1.25rem] group-hover:bg-[#1089A4] transition-all flex items-center justify-center shadow-xl">
           <span className="material-symbols-rounded text-xl">open_in_new</span>
        </button>
      </td>
    </tr>
  );
}
