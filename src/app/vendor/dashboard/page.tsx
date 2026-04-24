"use client"

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import AddProductModal from "@/components/AddProductModal";
import Image from "next/image";
import { useRouter } from "next/navigation";

import VendorStoreSettings from "@/components/VendorStoreSettings";
import StoreAnalytics from "@/components/StoreAnalytics";
import VendorCoupons from "@/components/VendorCoupons";
import VendorReviews from "@/components/VendorReviews";

export default function VendorDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Data State
  const [statsData, setStatsData] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [sRes, pRes, oRes] = await Promise.all([
          fetch("/api/vendor/stats"),
          fetch("/api/vendor/products"),
          fetch("/api/vendor/orders")
        ]);

        if (sRes.ok) setStatsData(await sRes.json());
        if (pRes.ok) setProducts(await pRes.json());
        if (oRes.ok) setOrders(await oRes.json());
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;
    
    try {
      const res = await fetch(`/api/vendor/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== id));
      }
    } catch (err) {
      alert("فشل حذف المنتج");
    }
  };

  const stats = [
    { label: "إجمالي المبيعات", value: `${statsData?.totalSales?.toLocaleString() || 0} ج.س`, icon: "shopping_cart", color: "from-[#1089A4] to-[#086F85]", trend: "مباشر" },
    { label: "صافي الأرباح", value: `${statsData?.netProfit?.toLocaleString() || 0} ج.س`, icon: "account_balance_wallet", color: "from-[#021D24] to-[#010E12]", trend: "بعد العمولة" },
    { label: "الطلبات النشطة", value: statsData?.activeOrdersCount || 0, icon: "package_2", color: "from-[#F29124] to-[#D47B1E]", trend: "قيد التنفيذ" },
  ];

  return (
    <div className="min-h-screen bg-muted/30 flex overflow-hidden font-sans pt-16 md:pt-20">
      {/* Sidebar - Elite Store Manager Style */}
      <aside className="w-80 bg-[#021D24] text-white flex flex-col pt-12 shadow-[40px_0_80px_rgba(2,29,36,0.2)] border-l border-white/5 relative z-20">
        <div className="px-10 mb-12">
          <div className="flex items-center gap-4 group">
            <div className="relative w-12 h-12 overflow-hidden rounded-2xl bg-white p-2 shadow-2xl ring-4 ring-white/10">
              <Image src="/logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tighter uppercase leading-none text-[#1089A4] font-heading">Mersal</span>
              <span className="text-[9px] font-black tracking-[0.4em] uppercase text-[#F29124] mt-1.5 opacity-80">Store Manager</span>
            </div>
          </div>
        </div>

        <nav className="flex-grow px-6 space-y-2 overflow-y-auto custom-scrollbar">
          <div className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 px-8 py-4">الأساسية</div>
          <EliteNavItem active={activeTab === "overview"} onClick={() => setActiveTab("overview")} icon="dashboard" label="نظرة عامة" />
          <EliteNavItem active={activeTab === "analytics"} onClick={() => setActiveTab("analytics")} icon="monitoring" label="التحليلات" />
          
          <div className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 px-8 py-4 mt-6">المتجر</div>
          <EliteNavItem active={activeTab === "products"} onClick={() => setActiveTab("products")} icon="inventory_2" label="المنتجات" />
          <EliteNavItem active={activeTab === "orders"} onClick={() => setActiveTab("orders")} icon="shopping_basket" label="الطلبات" />
          <EliteNavItem active={activeTab === "coupons"} onClick={() => setActiveTab("coupons")} icon="sell" label="الكوبونات" />
          
          <div className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 px-8 py-4 mt-6">التفاعل</div>
          <EliteNavItem active={activeTab === "reviews"} onClick={() => setActiveTab("reviews")} icon="rate_review" label="التقييمات" />
          <EliteNavItem active={activeTab === "promotion"} onClick={() => setActiveTab("promotion")} icon="campaign" label="الترويج" />
          
          <div className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 px-8 py-4 mt-6">النظام</div>
          <EliteNavItem active={activeTab === "finance"} onClick={() => setActiveTab("finance")} icon="payments" label="المالية" />
          <EliteNavItem active={activeTab === "settings"} onClick={() => setActiveTab("settings")} icon="settings" label="الإعدادات" />
        </nav>

        <div className="p-8">
           <a 
             href={`/store/${statsData?.slug}`}
             target="_blank"
             className="w-full glass-dark p-6 rounded-[2.5rem] flex items-center gap-4 border-2 border-white/5 hover:bg-[#1089A4]/20 transition-all cursor-pointer group shadow-2xl"
           >
              <div className="w-12 h-12 bg-gradient-to-br from-[#1089A4] to-[#086F85] rounded-2xl flex items-center justify-center font-black text-lg border-2 border-white/10 group-hover:scale-110 transition-transform">
                <span className="material-symbols-rounded text-xl">storefront</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-widest">زيارة المتجر</span>
                <span className="text-[10px] text-[#1089A4] italic font-bold">عرض الواجهة العامة</span>
              </div>
           </a>
        </div>
      </aside>

      <main className="flex-grow flex flex-col overflow-y-auto relative z-10 custom-scrollbar">
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
              <span className="material-symbols-rounded text-xl">add_circle</span> إضافة منتج جديد
            </button>
          </div>
        </header>

        <div className="p-16 space-y-20 max-w-[1920px] mx-auto w-full">
          {activeTab === "overview" && (
            <>
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <h1 className="text-5xl font-black text-[#021D24] tracking-tighter font-heading leading-none">مرحباً بك مجدداً 👋</h1>
                  <p className="text-[#021D24]/30 text-lg font-medium">أداء متجرك اليومي في نمو مستمر، إليك نظرة سريعة.</p>
                </div>
              </div>

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
                        نشط <span className="material-symbols-rounded text-base">trending_up</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 relative z-10">
                      <span className="text-[#021D24]/20 text-[11px] font-black uppercase tracking-[0.3em]">{stat.label}</span>
                      <span className="text-5xl font-black text-[#021D24] tracking-tighter font-heading">{loading ? "..." : stat.value}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Latest Orders Table */}
              <div className="bg-white rounded-[5rem] border-[12px] border-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] overflow-hidden">
                <div className="px-16 py-12 border-b border-border/50 flex items-center justify-between">
                    <h3 className="font-black text-3xl tracking-tighter text-[#021D24] font-heading">آخر مبيعاتك</h3>
                    <button onClick={() => setActiveTab("orders")} className="text-xs font-black text-[#1089A4] uppercase tracking-widest hover:underline">عرض الكل</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead>
                      <tr className="bg-muted/30 text-[11px] font-black uppercase tracking-[0.4em] text-[#021D24]/20 border-b">
                        <th className="px-16 py-10">رقم الطلب</th>
                        <th className="px-16 py-10">العميل</th>
                        <th className="px-16 py-10">الصافي</th>
                        <th className="px-16 py-10">الحالة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map(order => (
                        <tr key={order.id} className="border-b border-border/40 hover:bg-muted/10 transition-all">
                          <td className="px-16 py-8 font-black text-[#1089A4]">#{order.id.slice(-6)}</td>
                          <td className="px-16 py-8 font-black">{order.customerName}</td>
                          <td className="px-16 py-8 font-black text-lg">{order.totalAmount.toLocaleString()} ج.س</td>
                          <td className="px-16 py-8">
                             <span className={cn("px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border", order.status === "DELIVERED" ? "bg-green-50 text-green-600 border-green-200" : "bg-orange-50 text-orange-600 border-orange-200")}>
                                {order.status}
                             </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === "analytics" && <StoreAnalytics stats={statsData} />}
          {activeTab === "coupons" && <VendorCoupons />}
          {activeTab === "reviews" && <VendorReviews />}
          {activeTab === "settings" && <VendorStoreSettings />}

          {activeTab === "products" && (
            <div className="space-y-12">
               <div className="flex items-center justify-between">
                 <h3 className="font-black text-4xl tracking-tighter text-[#021D24] font-heading">مخزون المتجر</h3>
                 <div className="flex gap-4">
                    <button className="bg-white border-2 border-gray-100 px-8 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest text-gray-400">تصدير Excel</button>
                    <button onClick={() => setIsModalOpen(true)} className="bg-[#1089A4] text-white px-8 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl">إضافة منتج</button>
                 </div>
               </div>
               {products.length === 0 ? (
                  <div className="bg-white rounded-[4rem] p-32 text-center border-8 border-white shadow-2xl flex flex-col items-center gap-6">
                     <span className="material-symbols-rounded text-8xl text-gray-100">inventory</span>
                     <h4 className="text-2xl font-black text-[#021D24]">مخزنك فارغ حالياً</h4>
                     <p className="text-gray-400 font-bold max-w-sm">ابدأ بإضافة أول منتج لمتجرك لتظهر في محركات البحث.</p>
                     <button onClick={() => setIsModalOpen(true)} className="bg-[#1089A4] text-white px-12 py-4 rounded-2xl font-black text-xs uppercase tracking-widest mt-6 shadow-2xl shadow-[#1089A4]/20">أضف أول منتج</button>
                  </div>
               ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {products.map(p => (
                      <div key={p.id} className="bg-white p-10 rounded-[3.5rem] border-4 border-white shadow-xl flex flex-col gap-6 group relative overflow-hidden">
                        <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden bg-muted border border-border">
                            <Image src={p.images?.split(",")[0] || "/placeholder.png"} alt={p.title} fill className="object-cover group-hover:scale-110 transition-all duration-700" />
                            <div className="absolute top-4 left-4 flex gap-2">
                               <span className={cn(
                                 "px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-tighter shadow-xl backdrop-blur-md",
                                 p.status === "PENDING" ? "bg-orange-500/80 text-white" : "bg-green-500/80 text-white"
                               )}>
                                 {p.status === "PENDING" ? "مراجعة" : "نشط"}
                               </span>
                            </div>
                        </div>
                        <div className="space-y-4">
                           <div className="flex flex-col gap-1">
                              <h4 className="font-black text-xl text-[#021D24] line-clamp-1">{p.title}</h4>
                              <p className="text-[10px] text-gray-300 font-black uppercase tracking-widest">{p.category?.name}</p>
                           </div>
                           <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                              <span className="text-2xl font-black text-[#1089A4]">{p.price.toLocaleString()} ج.س</span>
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">المخزون: {p.stock}</span>
                           </div>
                        </div>
                        <button 
                          onClick={() => handleDeleteProduct(p.id)}
                          className="absolute bottom-10 left-10 w-12 h-12 bg-red-50 text-red-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center hover:bg-red-500 hover:text-white shadow-xl"
                        >
                            <span className="material-symbols-rounded text-xl">delete</span>
                        </button>
                      </div>
                    ))}
                </div>
               )}
            </div>
          )}

          {activeTab === "orders" && (
            <div className="bg-white rounded-[5rem] border-[12px] border-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] overflow-hidden">
               <div className="px-16 py-12 border-b border-border/50 bg-white">
                  <h3 className="font-black text-3xl tracking-tighter text-[#021D24] font-heading">كافة طلبات المبيعات</h3>
               </div>
               <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="bg-muted/30 text-[11px] font-black uppercase tracking-[0.4em] text-[#021D24]/20 border-b border-border/50">
                      <th className="px-16 py-10 whitespace-nowrap">الطلب</th>
                      <th className="px-16 py-10 whitespace-nowrap">العميل</th>
                      <th className="px-16 py-10 whitespace-nowrap">المدينة</th>
                      <th className="px-16 py-10 whitespace-nowrap">المنتجات</th>
                      <th className="px-16 py-10 whitespace-nowrap">الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-bold text-[#021D24]/70">
                    {orders.map(order => (
                      <tr key={order.id} className="border-b border-border/40 hover:bg-muted/20 transition-all">
                        <td className="px-16 py-9 font-black text-[#1089A4]">#{order.id.slice(-6)}</td>
                        <td className="px-16 py-9 font-black">{order.customerName}</td>
                        <td className="px-16 py-9 text-[#021D24]/40">{order.city}</td>
                        <td className="px-16 py-9">
                          <div className="flex flex-col gap-1">
                            {order.vendorItems.map((v: any) => (
                              <span key={v.id} className="text-[10px] text-gray-500">
                                {v.productTitle} (x{v.quantity})
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-16 py-9">
                          <span className={cn("px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest", order.status === "DELIVERED" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600")}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
               </div>
            </div>
          )}

          {activeTab === "promotion" && (
            <div className="space-y-12">
               <div className="flex items-center justify-between">
                 <h3 className="font-black text-4xl tracking-tighter text-[#021D24] font-heading">باقات الترويج والإعلانات</h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { title: "الباقة الأساسية", desc: "ظهور في أعلى قسم 'وصل حديثاً' لمدة 3 أيام", price: "5,000 ج.س", color: "from-[#1089A4] to-[#086F85]", icon: "bolt" },
                    { title: "الباقة الفضية", desc: "ظهور في قسم 'الأكثر مبيعاً' مع شريط مميز لمدة أسبوع", price: "12,000 ج.س", color: "from-[#F29124] to-[#D47B1E]", icon: "stars" },
                    { title: "الباقة الذهبية", desc: "إعلان بانر في الصفحة الرئيسية وظهور مميز لمدة شهر", price: "35,000 ج.س", color: "from-[#021D24] to-[#010E12]", icon: "rocket_launch" },
                  ].map((pkg, i) => (
                    <div key={i} className={`bg-gradient-to-br ${pkg.color} p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group hover:scale-105 transition-transform`}>
                       <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                          <div>
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8">
                               <span className="material-symbols-rounded text-3xl">{pkg.icon}</span>
                            </div>
                            <h4 className="font-black text-3xl mb-4">{pkg.title}</h4>
                            <p className="text-white/80 font-bold leading-relaxed text-sm">{pkg.desc}</p>
                          </div>
                          <div>
                            <p className="text-4xl font-black mb-8">{pkg.price}</p>
                            <button onClick={() => alert("سيتم توجيهك لصفحة الدفع")} className="w-full bg-white text-[#021D24] font-black py-5 rounded-2xl uppercase tracking-widest text-[11px] hover:bg-gray-100 transition-colors shadow-2xl border-b-4 border-black/10">طلب الباقة</button>
                          </div>
                       </div>
                       <span className="material-symbols-rounded absolute -bottom-10 -right-10 text-[12rem] text-white/5 -rotate-12 group-hover:rotate-0 transition-transform">campaign</span>
                    </div>
                  ))}
               </div>
            </div>
          )}
        </div>
      </main>

      <AddProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Floating Action Button for Mobile */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="md:hidden fixed bottom-8 left-8 w-16 h-16 bg-[#F29124] text-[#021D24] rounded-full shadow-2xl flex items-center justify-center z-[60] border-4 border-white active:scale-90 transition-all"
      >
        <span className="material-symbols-rounded text-3xl">add</span>
      </button>
    </div>
  );
}

function EliteNavItem({ icon, label, active, onClick }: { icon: string, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-5 px-8 py-5 rounded-[2rem] font-black text-[12px] uppercase tracking-[0.2em] transition-all group border-2 border-transparent relative",
        active ? "bg-white text-[#1089A4] shadow-[0_20px_40px_rgba(16,137,164,0.15)] ring-4 ring-[#1089A4]/10" : "text-white/30 hover:bg-white/5 hover:text-white"
      )}
    >
      <span className={cn(
        "material-symbols-rounded text-2xl transition-all group-hover:rotate-12", 
        active ? "text-[#1089A4]" : "opacity-30 group-hover:opacity-100"
      )}>{icon}</span>
      {label}
      {active && <div className="absolute left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#1089A4] rounded-full" />}
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
