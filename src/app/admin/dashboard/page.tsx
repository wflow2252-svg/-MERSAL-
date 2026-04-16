"use client"

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";

const NAV_ITEMS = [
  { id: "overview",  icon: "dashboard_customize", label: "التحكم" },
  { id: "approvals", icon: "verified",             label: "الموافقات" },
  { id: "users",     icon: "person_search",        label: "المستخدمين" },
  { id: "vendors",   icon: "storefront",           label: "الموردين" },
  { id: "finance",   icon: "account_balance",      label: "المالية" },
  { id: "settings",  icon: "security",             label: "السيادة" },
];

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  // Data States
  const [stats, setStats] = useState<any[]>([]);
  const [pendingVendors, setPendingVendors] = useState<any[]>([]);
  const [pendingProducts, setPendingProducts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [allVendors, setAllVendors] = useState<any[]>([]);
  const [sysSettings, setSysSettings] = useState<any>(null);
  const [admins, setAdmins] = useState<any[]>([]);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Fetch Core Stats
  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setPendingVendors(data.pendingVendors);
      }
    } catch (e) { console.error(e); }
  };

  const handleVendorAction = async (id: string, status: string) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/vendors/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setPendingVendors(prev => prev.filter(v => v.id !== id));
        fetchStats(); // Update stats
      }
    } catch (e) { console.error(e); }
    setActionLoading(null);
  };

  const handleProductAction = async (id: string, action: string) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/products`, {
        method: 'POST',
        body: JSON.stringify({ id, action })
      });
      if (res.ok) {
        setPendingProducts(prev => prev.filter(p => p.id !== id));
        fetchStats(); // Update stats
      }
    } catch (e) { console.error(e); }
    setActionLoading(null);
  };

  // Tab Specific Fetching
  useEffect(() => {
    if (!session) return;
    
    const fetchData = async () => {
      setLoading(true);
      if (activeTab === "overview") await fetchStats();
      if (activeTab === "approvals") {
        await fetchStats();
        const pRes = await fetch("/api/admin/products");
        if (pRes.ok) setPendingProducts(await pRes.json());
      }
      if (activeTab === "users") {
        const uRes = await fetch("/api/admin/users");
        if (uRes.ok) setUsers(await uRes.json());
      }
      if (activeTab === "settings") {
        const sRes = await fetch("/api/admin/settings");
        if (sRes.ok) {
          const data = await sRes.json();
          setSysSettings(data.settings);
          setAdmins(data.admins);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [activeTab, session]);

  if (status === "loading" || (loading && stats.length === 0)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#021D24]">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-4 border-[#1089A4] border-t-transparent rounded-full animate-spin" />
          <p className="text-white/40 font-black uppercase tracking-[0.5em] text-[10px]">Verifying Authority...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex overflow-hidden font-sans rtl" dir="rtl">

      {/* ── Sidebar ── */}
      <aside className="hidden lg:flex w-80 bg-[#021D24] text-white flex-col pt-32 shadow-2xl relative z-20">
        <div className="px-10 mb-20 flex flex-col items-center gap-8 text-center">
           <div className="relative w-32 h-32 rounded-[2.5rem] bg-white p-4 shadow-4xl ring-12 ring-white/5 border border-white/10 group">
              <Image src="/logo.jpg" alt="Logo" fill className="object-contain group-hover:scale-110 transition-transform duration-500" />
           </div>
           <div className="flex flex-col">
              <span className="font-black text-3xl text-[#1089A4] font-heading tracking-tighter uppercase leading-none">مـرسـال</span>
              <span className="text-[11px] font-black text-white/30 uppercase tracking-[0.6em] mt-3">Elite Core</span>
           </div>
        </div>

        <nav className="flex-grow px-6 space-y-2">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all",
                activeTab === item.id ? "bg-[#1089A4] text-white shadow-xl" : "text-white/30 hover:bg-white/5 hover:text-white"
              )}
            >
              <span className="material-symbols-rounded">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-8">
           <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1089A4] flex items-center justify-center font-bold">{session?.user?.name?.[0]}</div>
              <div className="flex flex-col">
                 <span className="text-[10px] font-black">{session?.user?.name}</span>
                 <span className="text-[8px] text-[#F29124] uppercase font-black">Super Admin</span>
              </div>
           </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-grow flex flex-col overflow-y-auto relative bg-[#F8F9FA] pb-32 lg:pb-0">
        
        {/* Header */}
        <header className="h-16 lg:h-24 bg-white border-b flex items-center justify-between px-4 lg:px-12 sticky top-0 z-40">
           <h2 className="text-lg lg:text-xl font-black text-[#021D24] font-heading">
              {NAV_ITEMS.find(i => i.id === activeTab)?.label}
           </h2>
           <div className="flex items-center gap-6">
              {activeTab === "finance" && (
                <button 
                  onClick={() => window.open('/api/admin/reports/excel')}
                  className="bg-[#1089A4] text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg hover:bg-[#F29124] transition-all"
                >
                  <span className="material-symbols-rounded text-sm">download</span>
                  تقرير إكسل الشهري
                </button>
              )}
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-[#021D24]/30 hover:text-[#1089A4] cursor-pointer transition-colors">
                 <span className="material-symbols-rounded">notifications</span>
              </div>
           </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="p-4 lg:p-12 space-y-6 lg:space-y-10">
          
          <AnimatePresence mode="wait">
            
            {/* 1. OVERVIEW */}
            {activeTab === "overview" && (
              <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {stats.map((s, i) => (
                    <div key={i} className="bg-white p-10 rounded-[2.5rem] border-4 border-white shadow-xl flex items-center gap-8">
                      <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg", s.color)}>
                        <span className="material-symbols-rounded text-3xl">{s.icon}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">{s.label}</span>
                        <span className="text-4xl font-black text-[#021D24] tracking-tighter">{s.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Recent Activity Mini Log */}
                <div className="bg-white rounded-[3rem] p-10 shadow-xl border-4 border-white">
                  <h3 className="text-xl font-black text-[#021D24] mb-8 flex items-center gap-3">
                    <span className="w-3 h-8 bg-[#1089A4] rounded-full" />
                    النشاط الأخير للموردين
                  </h3>
                  <div className="space-y-4">
                    {[1,2,3].map(i => (
                      <div key={i} className="flex items-center justify-between p-5 bg-muted/20 rounded-2xl border border-transparent hover:border-[#1089A4]/20 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-[#1089A4]/10 text-[#1089A4] flex items-center justify-center"><span className="material-symbols-rounded">shopping_bag</span></div>
                          <div>
                            <p className="text-sm font-black text-[#021D24]">طلب جديد لمورد: <span className="text-[#1089A4]">تكنو زون</span></p>
                            <p className="text-[10px] text-muted-foreground font-bold">منذ 5 دقائق • قيمة الطلب: 15,000 ج.س</p>
                          </div>
                        </div>
                        <span className="text-[9px] font-black bg-white px-3 py-1.5 rounded-lg border">تفاصيل</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. APPROVALS */}
            {activeTab === "approvals" && (
              <motion.div key="approvals" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                
                {/* Pending Vendors */}
                <div className="bg-white rounded-[3rem] p-10 shadow-xl border-4 border-white space-y-8">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-black text-[#021D24]">مسايرة الموردين</h3>
                    <span className="bg-[#F29124] text-white px-4 py-1.5 rounded-full text-[10px] font-black">{pendingVendors.length} طلب</span>
                  </div>
                  <div className="space-y-4">
                    {pendingVendors.map(v => (
                      <div key={v.id} className="p-6 bg-muted/10 rounded-3xl flex flex-col gap-4 border border-border/10">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-[#1089A4] text-white flex items-center justify-center font-black text-xl">{v.store[0]}</div>
                            <div>
                              <p className="font-black text-[#021D24]">{v.store}</p>
                              <p className="text-[10px] font-bold text-muted-foreground uppercase">{v.city} • {v.name}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              disabled={actionLoading === v.id}
                              onClick={() => handleVendorAction(v.id, 'APPROVED')}
                              className="w-10 h-10 bg-green-500 text-white rounded-xl shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all disabled:opacity-50"
                            >
                              {actionLoading === v.id ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <span className="material-symbols-rounded">check</span>}
                            </button>
                            <button 
                              disabled={actionLoading === v.id}
                              onClick={() => handleVendorAction(v.id, 'REJECTED')}
                              className="w-10 h-10 bg-red-500 text-white rounded-xl shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all disabled:opacity-50"
                            >
                              <span className="material-symbols-rounded">close</span>
                            </button>
                          </div>
                        </div>
                        <Link href={v.docs} target="_blank" className="text-center text-[10px] py-2 bg-white rounded-xl border font-black text-[#1089A4] hover:bg-muted transition-all">تصفح المستندات البنكية والسجل التجاري</Link>
                      </div>
                    ))}
                    {pendingVendors.length === 0 && <p className="text-center py-10 text-muted-foreground font-bold">كل شيء نظيف! لا توجد طلبات معلقة.</p>}
                  </div>
                </div>

                {/* Pending Products */}
                <div className="bg-white rounded-[3rem] p-10 shadow-xl border-4 border-white space-y-8">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-black text-[#021D24]">مراجعة المنتجات</h3>
                    <span className="bg-[#1089A4] text-white px-4 py-1.5 rounded-full text-[10px] font-black">{pendingProducts.length} جديد</span>
                  </div>
                  <div className="space-y-4">
                    {pendingProducts.map(p => (
                      <div key={p.id} className="p-4 bg-muted/10 rounded-2xl flex items-center justify-between border">
                        <div className="flex items-center gap-4">
                           <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white border">
                              <Image src={p.images?.split(',')[0]} alt={p.title} fill className="object-cover" />
                           </div>
                           <div>
                              <p className="text-xs font-black text-[#021D24] leading-tight">{p.title}</p>
                              <p className="text-[10px] font-bold text-[#1089A4] mt-1">{p.price.toLocaleString()} ج.س • {p.vendor.storeName}</p>
                           </div>
                        </div>
                        <div className="flex gap-2">
                           <button 
                             disabled={actionLoading === p.id}
                             onClick={() => handleProductAction(p.id, 'APPROVE')}
                             className="btn-icon-sm bg-green-500 disabled:opacity-50"
                           >
                             <span className="material-symbols-rounded">done_all</span>
                           </button>
                           <button 
                             disabled={actionLoading === p.id}
                             onClick={() => handleProductAction(p.id, 'REJECT')}
                             className="btn-icon-sm bg-red-400 disabled:opacity-50"
                           >
                             <span className="material-symbols-rounded">delete</span>
                           </button>
                        </div>
                      </div>
                    ))}
                    {pendingProducts.length === 0 && <p className="text-center py-10 text-muted-foreground font-bold">لا توجد منتجات بانتظار المراجعة.</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. USERS */}
            {activeTab === "users" && (
              <motion.div key="users" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-xl border-4 border-white overflow-hidden">
                <div className="p-6 md:p-8 border-b flex flex-col md:flex-row justify-between items-center gap-4 bg-muted/10">
                   <h3 className="text-xl md:text-2xl font-black text-[#021D24]">قاعدة بيانات المستخدمين</h3>
                   <div className="w-full md:w-auto">
                      <input type="text" placeholder="بحث بالاسم أو الهاتف..." className="w-full px-6 py-3 rounded-xl bg-white border text-sm outline-none w-full md:w-64 focus:border-[#1089A4]" />
                   </div>
                </div>

                {/* Desktop view */}
                <div className="hidden sm:block overflow-x-auto">
                   <table className="w-full text-right">
                      <thead className="bg-[#021D24] text-white/50 text-[10px] font-black uppercase tracking-widest">
                         <tr>
                            <th className="px-8 py-6">الاسم والبريد</th>
                            <th className="px-8 py-6">رقم الهاتف</th>
                            <th className="px-8 py-6">عنوان IP</th>
                            <th className="px-8 py-6">تاريخ التسجيل</th>
                            <th className="px-8 py-6">الإجراء</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y text-sm">
                         {users.map(u => (
                            <tr key={u.id} className="hover:bg-muted/30 transition-all font-bold group">
                               <td className="px-8 py-6">
                                  <p className="text-[#021D24]">{u.name || 'بدون اسم'}</p>
                                  <p className="text-[10px] text-muted-foreground">{u.email}</p>
                               </td>
                               <td className="px-8 py-6">{u.phone || '—'}</td>
                               <td className="px-8 py-6">
                                  <span className="font-mono text-[11px] text-[#1089A4]">{u.lastIp || '—'}</span>
                               </td>
                               <td className="px-8 py-6 text-[10px] opacity-40">{new Date(u.createdAt).toLocaleDateString('ar-EG')}</td>
                               <td className="px-8 py-6">
                                  <button className="text-red-500 hover:scale-110 transition-all"><span className="material-symbols-rounded">block</span></button>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>

                {/* Mobile view */}
                <div className="sm:hidden divide-y divide-border/50">
                   {users.map(u => (
                      <div key={u.id} className="p-6 flex flex-col gap-4">
                         <div className="flex justify-between items-start">
                            <div>
                               <p className="font-black text-lg text-[#021D24]">{u.name || 'بدون اسم'}</p>
                               <p className="text-xs text-muted-foreground">{u.email}</p>
                            </div>
                            <button className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center"><span className="material-symbols-rounded text-lg">block</span></button>
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="bg-muted/30 p-3 rounded-xl">
                               <span className="text-[8px] font-black uppercase text-muted-foreground block mb-1">الهاتف</span>
                               <span className="text-xs font-bold">{u.phone || '—'}</span>
                            </div>
                            <div className="bg-muted/30 p-3 rounded-xl">
                               <span className="text-[8px] font-black uppercase text-muted-foreground block mb-1">تاريخ التسجيل</span>
                               <span className="text-xs font-bold">{new Date(u.createdAt).toLocaleDateString('ar-EG')}</span>
                            </div>
                         </div>
                         <div className="bg-[#1089A4]/5 p-3 rounded-xl flex items-center justify-between">
                            <span className="text-[8px] font-black uppercase text-[#1089A4]">العنوان الرقمي IP</span>
                            <span className="text-[10px] font-mono font-bold text-[#1089A4]">{u.lastIp || '—'}</span>
                         </div>
                      </div>
                   ))}
                </div>
              </motion.div>
            )}

            {/* 4. SETTINGS (MAINTENANCE) */}
            {activeTab === "settings" && (
              <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-12">
                
                {/* Sovereignty Stats */}
                <div className="bg-[#021D24] text-white rounded-[3rem] p-12 border-[8px] border-white shadow-2xl relative overflow-hidden">
                   <div className="z-10 relative space-y-8">
                      <h3 className="text-4xl font-black font-heading leading-tight italic text-[#F29124]">وضـع الـسـيـادة الـكـامـلـة</h3>
                      <div className="flex flex-col gap-6">
                         <div className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/10">
                            <div>
                               <p className="font-black text-lg">وضـع الـصـيـانـة (توقف الموقع)</p>
                               <p className="text-[10px] text-white/30 font-black uppercase tracking-widest mt-1">عند التفعيل سيتم قفل الموقع عن كافة المستخدمين</p>
                            </div>
                            <button 
                              onClick={async () => {
                                const newVal = !sysSettings?.maintenanceMode;
                                await fetch('/api/admin/settings', {
                                  method: 'PATCH',
                                  body: JSON.stringify({ maintenanceMode: newVal })
                                });
                                setSysSettings({...sysSettings, maintenanceMode: newVal});
                              }}
                              className={cn(
                                "w-16 h-8 rounded-full relative transition-all",
                                sysSettings?.maintenanceMode ? "bg-[#F29124]" : "bg-white/20"
                              )}
                            >
                               <div className={cn("absolute top-1 w-6 h-6 bg-white rounded-full transition-all", sysSettings?.maintenanceMode ? "left-1" : "left-9")} />
                            </button>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Admins List */}
                <div className="bg-white rounded-[3rem] p-10 shadow-xl border-4 border-white space-y-8">
                   <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-black text-[#021D24]">هيئة المدراء (Admins)</h3>
                      <button className="bg-[#1089A4] text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">إضافة مدير جديد +</button>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {admins.map(admin => (
                        <div key={admin.id} className="flex items-center gap-4 p-5 bg-muted/10 rounded-2xl border">
                           <div className="w-12 h-12 rounded-xl bg-[#021D24] text-white flex items-center justify-center font-black">{admin.name?.[0]}</div>
                           <div className="flex flex-col">
                              <span className="font-black text-sm text-[#021D24]">{admin.name}</span>
                              <span className="text-[10px] text-muted-foreground uppercase">{admin.email}</span>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

              </motion.div>
            )}

          </AnimatePresence>

        </div>

        {/* CSS for custom components */}
        <style jsx>{`
          .btn-icon-sm {
            width: 2.5rem;
            height: 2.5rem;
            display: flex;
            align-items: center;
            justify-center: center;
            border-radius: 0.75rem;
            color: white;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          }
          .btn-icon-sm:hover {
            transform: scale(1.1);
            filter: brightness(1.1);
          }
          .glass {
            background: rgba(255, 255, 255, 0.5);
            backdrop-filter: blur(10px);
          }
          .rtl { direction: rtl; }
        `}</style>

      </main>

      {/* ── Mobile Nav (Same logic) ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[200] bg-[#021D24]/90 backdrop-blur-3xl border-t border-white/5 pb-safe">
        <div className="flex items-center justify-around h-20 px-4">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="relative flex flex-col items-center gap-1 group"
              >
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
                  isActive ? "bg-[#1089A4] text-white shadow-lg shadow-[#1089A4]/40" : "text-white/20"
                )}>
                  <span className={cn("material-symbols-rounded text-xl transition-transform", isActive && "scale-110")}>
                    {item.icon}
                  </span>
                </div>
                {isActive && (
                  <motion.span layoutId="activeTab" className="text-[8px] font-black text-[#1089A4] uppercase tracking-widest leading-none">
                    {item.label}
                  </motion.span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

    </div>
  );
}
