"use client"

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState<any[]>([]);
  const [pendingVendors, setPendingVendors] = useState<any[]>([]);
  const [exchangeRate, setExchangeRate] = useState(600);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data.stats);
          setPendingVendors(data.pendingVendors);
          setExchangeRate(data.exchangeRate);
        }
      } catch (error) {
        console.error("Failed to fetch admin stats", error);
      } finally {
        setLoading(false);
      }
    }

    if (session?.user && (session.user as any).role === "ADMIN") {
      fetchStats();
    }
  }, [session]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#021D24]">
        <div className="flex flex-col items-center gap-6">
           <div className="w-16 h-16 border-4 border-[#1089A4] border-t-transparent rounded-full animate-spin shadow-elite-xl"></div>
           <p className="text-white/40 font-black uppercase tracking-[0.5em] text-[10px]">Verifying Administrative Authority</p>
        </div>
      </div>
    );
  }

  if ((session?.user as any).role !== "ADMIN") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-[#021D24]">
         <span className="material-symbols-rounded text-red-500 text-8xl">lock_open</span>
         <h1 className="text-white text-3xl font-black">غير مصرح لك بدخول هذه المنطقة</h1>
         <Link href="/" className="btn-primary">العودة للرئيسية</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40 flex overflow-hidden font-sans">
      {/* Sidebar - Elite Admin Control Authority */}
      <aside className="w-80 bg-[#021D24] text-white flex flex-col pt-12 shadow-[40px_0_80px_rgba(2,29,36,0.3)] border-l border-white/5 relative z-20">
        <div className="px-10 mb-16 flex items-center gap-4">
            <div className="relative w-12 h-12 overflow-hidden rounded-2xl bg-white p-2 shadow-2xl ring-4 ring-white/10">
              <Image src="/logo.jpg" alt="Logo" fill className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tighter uppercase leading-none text-[#1089A4] font-heading">Morsall</span>
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/40 mt-1.5 opacity-80">Admin Core</span>
            </div>
        </div>

        <nav className="flex-grow px-6 space-y-3">
          <AdminEliteNavItem active={activeTab === "overview"} onClick={() => setActiveTab("overview")} icon="dashboard_customize" label="لوحة التحكم" />
          <AdminEliteNavItem active={activeTab === "approvals"} onClick={() => setActiveTab("approvals")} icon="verified" label="الموافقات" />
          <AdminEliteNavItem active={activeTab === "vendors"} onClick={() => setActiveTab("vendors")} icon="group" label="الموردين" />
          <AdminEliteNavItem active={activeTab === "finance"} onClick={() => setActiveTab("finance")} icon="account_balance" label="المالية" />
          <div className="h-px bg-white/5 my-10 mx-6" />
          <AdminEliteNavItem active={activeTab === "settings"} onClick={() => setActiveTab("settings")} icon="admin_panel_settings" label="الإعدادات السيادية" />
        </nav>

        <div className="p-8">
          <div className="glass-dark p-6 rounded-[2.5rem] flex items-center gap-4 border-2 border-white/5 shadow-2xl">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-elite-lg border-2 border-[#1089A4]">
               <Image src={session?.user?.image || "/logo.jpg"} alt="Admin" fill className="object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white truncate max-w-[120px]">{session?.user?.name || "مدير النظام"}</span>
              <span className="text-[9px] text-[#F29124] italic font-black uppercase tracking-widest">Root Authority</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content - High Impact Reporting UI */}
      <main className="flex-grow flex flex-col overflow-y-auto relative z-10">
        {/* Header - Glass Control Bar */}
        <header className="h-28 bg-white/70 backdrop-blur-2xl border-b border-border/50 flex items-center justify-between px-16 flex-shrink-0 sticky top-0 z-50">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-[#1089A4] font-heading">أنظمة التحكم المركزية <span className="text-[#021D24] opacity-10">—</span></h2>
          
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-4 glass px-8 py-3 rounded-2xl border-2 border-white shadow-xl">
              <span className="text-[10px] font-black text-[#021D24]/30 uppercase tracking-[0.4em]">Exchange (USD):</span>
              <span className="text-lg font-black text-[#1089A4] tracking-tighter leading-none">{exchangeRate}.00 <span className="text-[10px]">ج.س</span></span>
            </div>
            <button className="w-14 h-14 glass text-[#021D24]/30 rounded-[1.25rem] relative hover:text-red-500 transition-all border-2 border-white shadow-xl flex items-center justify-center">
              <span className="material-symbols-rounded text-2xl font-light">notifications_active</span>
              <span className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full border-4 border-white shadow-xl" />
            </button>
          </div>
        </header>

        <div className="p-16 space-y-20 max-w-[1920px] mx-auto w-full">
          {/* Stats - Elite Grid Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-14 rounded-[4.5rem] border-[12px] border-white shadow-[0_45px_100px_-20px_rgba(0,0,0,0.08)] flex items-center gap-10 hover:shadow-[0_60px_120px_-20px_rgba(0,0,0,0.12)] transition-all group relative overflow-hidden">
                <div className={cn("w-24 h-24 rounded-[2rem] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform relative z-10 border-b-8 border-black/10", stat.color)}>
                  <span className="material-symbols-rounded text-4xl">{stat.icon}</span>
                </div>
                <div className="flex flex-col gap-1 relative z-10">
                  <span className="text-[#021D24]/20 text-[11px] font-black uppercase tracking-[0.5em] mb-1">{stat.label}</span>
                  <span className="text-5xl font-black tracking-tighter text-[#021D24] font-heading leading-none">{stat.value}</span>
                </div>
                <div className="absolute top-[-30px] right-[-30px] w-64 h-64 bg-muted/30 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/5 transition-all" />
              </div>
            ))}
          </div>

          {/* Dynamic Views */}
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div 
                key="overview"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-14"
              >
                {/* Vendors Waiting Queue */}
                <div className="bg-white rounded-[5rem] border-[16px] border-white shadow-[0_50px_120px_-30px_rgba(0,0,0,0.1)] overflow-hidden">
                  <div className="px-16 py-12 border-b border-border/50 flex items-center justify-between relative">
                    <div className="flex flex-col gap-2">
                       <h3 className="font-black text-4xl tracking-tighter text-[#021D24] font-heading">طلبات الانضمام</h3>
                       <p className="text-[#021D24]/20 text-[10px] font-black uppercase tracking-[0.4em]">Live Queue Management</p>
                    </div>
                    <span className="bg-[#F29124] text-[#021D24] px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-[#F29124]/20 border-4 border-white animate-bounce">
                      {pendingVendors.length} معلقة
                    </span>
                  </div>
                  <div className="p-12 space-y-8">
                    {pendingVendors.length > 0 ? pendingVendors.map((v) => (
                      <div key={v.id} className="p-8 bg-muted/20 border-2 border-border/50 rounded-[2.5rem] flex items-center justify-between hover:border-[#1089A4]/30 hover:bg-white transition-all group shadow-sm hover:shadow-2xl">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl font-black text-[#1089A4] text-xl border-4 border-border/20 group-hover:scale-110 transition-transform">
                            {v.store[0]}
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <span className="font-black text-lg text-[#021D24] tracking-tight">{v.store}</span>
                            <span className="text-[11px] text-[#021D24]/30 font-black uppercase tracking-[0.2em] flex items-center gap-3">
                               <span className="material-symbols-rounded text-sm">location_city</span> {v.city} • {v.name}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <button className="w-12 h-12 glass rounded-xl border border-white text-[#1089A4] shadow-xl hover:bg-[#1089A4] hover:text-white transition-all flex items-center justify-center"><span className="material-symbols-rounded">visibility</span></button>
                           <button className="w-12 h-12 bg-green-500 text-white rounded-xl shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center border-b-4 border-black/10"><span className="material-symbols-rounded">check</span></button>
                           <button className="w-12 h-12 bg-red-500 text-white rounded-xl shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center border-b-4 border-black/10"><span className="material-symbols-rounded">block</span></button>
                        </div>
                      </div>
                    )) : (
                      <div className="py-20 text-center space-y-4">
                        <span className="material-symbols-rounded text-6xl text-muted/30">task_alt</span>
                        <p className="font-black text-muted/40 uppercase tracking-widest text-xs">لا توجد طلبات معلقة حالياً</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sovereign Controls - High Risk Rich UI */}
                <div className="bg-[#021D24] text-white rounded-[5rem] p-16 flex flex-col justify-between relative overflow-hidden shadow-[0_60px_120px_-30px_rgba(2,29,36,0.35)] border-[16px] border-white group">
                  <div className="z-10 relative">
                    <div className="text-[#1089A4] font-black text-[12px] uppercase tracking-[0.5em] mb-10">FINANCIAL GOVERNANCE</div>
                    <h3 className="font-black text-5xl mb-4 tracking-tighter leading-tight font-heading">حوكمة الأنظمة <br /> <span className="text-[#F29124]">والعمولات</span></h3>
                    <p className="text-white/30 text-lg font-medium mb-16 leading-relaxed">تحكم مركزي وشامل بكافة الرسوم والسياسات المالية للمنصة بضغطة واحدة.</p>
                    
                    <div className="grid grid-cols-2 gap-8">
                      <div className="bg-white/5 backdrop-blur-3xl p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all cursor-pointer group/card shadow-2xl">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 block text-[#1089A4]">Market Fees</span>
                        <span className="text-5xl font-black tracking-tighter font-heading group-hover/card:scale-110 transition-transform inline-block">10%</span>
                      </div>
                      <div className="bg-white/5 backdrop-blur-3xl p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all cursor-pointer group/card shadow-2xl">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 block text-[#F29124]">Withdrawal</span>
                        <span className="text-5xl font-black tracking-tighter font-heading group-hover/card:scale-110 transition-transform inline-block">2.5%</span>
                      </div>
                    </div>

                    <button className="w-full mt-16 bg-[#1089A4] text-white py-8 rounded-[3rem] font-black text-sm uppercase tracking-[0.4em] hover:shadow-[0_20px_60px_rgba(16,137,164,0.4)] hover:scale-[1.03] transition-all shadow-2xl border-b-8 border-black/20">
                      تحديث إطار العمل المالي
                    </button>
                  </div>
                  <span className="material-symbols-rounded absolute bottom-[-80px] left-[-80px] text-[30rem] text-white/5 -rotate-12 transition-all group-hover:rotate-0 group-hover:scale-110 pointer-events-none">shield_person</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function AdminEliteNavItem({ icon, label, active, onClick }: { icon: string, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-5 px-8 py-5 rounded-[2rem] font-black text-[12px] uppercase tracking-[0.25em] transition-all group border-2 border-transparent",
        active ? "bg-[#1089A4] text-white shadow-[0_25px_50px_rgba(16,137,164,0.4)] ring-8 ring-[#1089A4]/5" : "text-white/20 hover:bg-white/5 hover:text-white"
      )}
    >
      <span className={cn(
        "material-symbols-rounded text-2xl transition-all group-hover:scale-125", 
        active ? "text-[#021D24] opacity-100" : "opacity-20 group-hover:opacity-100"
      )}>{icon}</span>
      {label}
    </button>
  );
}
