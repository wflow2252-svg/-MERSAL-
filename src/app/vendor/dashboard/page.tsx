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
      if (res.ok) setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert("فشل حذف المنتج");
    }
  };

  const stats = [
    { label: "إجمالي المبيعات", value: `${statsData?.totalSales?.toLocaleString() || 0} ج.س`, icon: "payments", color: "bg-blue-50 text-blue-600" },
    { label: "صافي الأرباح", value: `${statsData?.netProfit?.toLocaleString() || 0} ج.س`, icon: "account_balance_wallet", color: "bg-green-50 text-green-600" },
    { label: "الطلبات النشطة", value: statsData?.activeOrdersCount || 0, icon: "local_shipping", color: "bg-orange-50 text-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 flex font-sans pt-20">
      {/* Sidebar - Original Mersal Look */}
      <aside className="w-72 bg-white border-l border-border fixed right-0 top-20 bottom-0 z-20 flex flex-col overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-gray-50 p-1.5 border">
               <Image src="/logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <div>
              <p className="font-black text-[#021D24] text-lg leading-none">مرسال</p>
              <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">لوحة التاجر</p>
            </div>
          </div>

          <nav className="space-y-1">
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4 px-3">الرئيسية</p>
            <NavItem active={activeTab === "overview"} onClick={() => setActiveTab("overview")} icon="dashboard" label="لوحة التحكم" />
            <NavItem active={activeTab === "analytics"} onClick={() => setActiveTab("analytics")} icon="monitoring" label="التحليلات" />
            
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest my-6 px-3">إدارة المتجر</p>
            <NavItem active={activeTab === "products"} onClick={() => setActiveTab("products")} icon="inventory_2" label="المنتجات" />
            <NavItem active={activeTab === "orders"} onClick={() => setActiveTab("orders")} icon="shopping_basket" label="الطلبات" />
            <NavItem active={activeTab === "coupons"} onClick={() => setActiveTab("coupons")} icon="sell" label="الكوبونات" />
            
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest my-6 px-3">التواصل</p>
            <NavItem active={activeTab === "reviews"} onClick={() => setActiveTab("reviews")} icon="rate_review" label="التقييمات" />
            <NavItem active={activeTab === "promotion"} onClick={() => setActiveTab("promotion")} icon="campaign" label="الترويج" />
            
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest my-6 px-3">الإعدادات</p>
            <NavItem active={activeTab === "finance"} onClick={() => setActiveTab("finance")} icon="account_balance" label="المالية" />
            <NavItem active={activeTab === "settings"} onClick={() => setActiveTab("settings")} icon="settings" label="إعدادات المتجر" />
          </nav>
        </div>

        <div className="mt-auto p-6 border-t">
           <a href={`/store/${statsData?.slug}`} target="_blank" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
              <div className="w-10 h-10 bg-[#1089A4]/10 text-[#1089A4] rounded-lg flex items-center justify-center">
                 <span className="material-symbols-rounded">storefront</span>
              </div>
              <div>
                 <p className="text-xs font-black text-[#021D24]">زيارة متجرك</p>
                 <p className="text-[10px] font-bold text-gray-400">عرض الواجهة العامة</p>
              </div>
           </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow mr-72 p-10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <header className="flex items-center justify-between">
             <div>
                <h1 className="text-3xl font-black text-[#021D24]">مرحباً بك مجدداً 👋</h1>
                <p className="text-gray-400 font-bold mt-1">إليك ملخص أداء متجرك اليوم.</p>
             </div>
             <button onClick={() => setIsModalOpen(true)} className="bg-[#1089A4] text-white px-8 py-3 rounded-xl font-black text-sm shadow-lg shadow-[#1089A4]/20 hover:scale-105 transition-all">
                إضافة منتج جديد
             </button>
          </header>

          {activeTab === "overview" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-white p-8 rounded-3xl border border-border shadow-sm flex items-center gap-6">
                    <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center", stat.color)}>
                       <span className="material-symbols-rounded text-3xl">{stat.icon}</span>
                    </div>
                    <div>
                       <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                       <p className="text-2xl font-black text-[#021D24] mt-1">{loading ? "..." : stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-3xl border border-border overflow-hidden shadow-sm">
                <div className="px-8 py-6 border-b flex items-center justify-between">
                   <h3 className="font-black text-[#021D24] text-xl">آخر المبيعات</h3>
                   <button onClick={() => setActiveTab("orders")} className="text-sm font-bold text-[#1089A4] hover:underline">عرض الكل</button>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-right">
                      <thead>
                         <tr className="bg-gray-50/50 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b">
                            <th className="px-8 py-4">رقم الطلب</th>
                            <th className="px-8 py-4">العميل</th>
                            <th className="px-8 py-4">التاريخ</th>
                            <th className="px-8 py-4">الصافي</th>
                            <th className="px-8 py-4">الحالة</th>
                         </tr>
                      </thead>
                      <tbody>
                         {orders.slice(0, 5).map(order => (
                            <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50/50 transition-colors">
                               <td className="px-8 py-5 font-black text-[#1089A4]">#{order.id.slice(-6)}</td>
                               <td className="px-8 py-5 font-black text-[#021D24]">{order.customerName}</td>
                               <td className="px-8 py-5 text-gray-400 text-sm">{new Date(order.createdAt).toLocaleDateString("ar-EG")}</td>
                               <td className="px-8 py-5 font-black">{order.totalAmount.toLocaleString()} ج.س</td>
                               <td className="px-8 py-5">
                                  <span className={cn(
                                    "px-3 py-1 rounded-lg text-[10px] font-black uppercase",
                                    order.status === "DELIVERED" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                                  )}>
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
            <div className="space-y-8">
               <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-[#021D24]">مخزون المنتجات</h3>
                  <div className="flex gap-3">
                     <button className="bg-white border border-border px-6 py-2.5 rounded-xl text-sm font-bold text-gray-600">تصدير Excel</button>
                     <button onClick={() => setIsModalOpen(true)} className="bg-[#1089A4] text-white px-6 py-2.5 rounded-xl text-sm font-bold">أضف منتج</button>
                  </div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(p => (
                    <div key={p.id} className="bg-white p-5 rounded-2xl border border-border shadow-sm group relative">
                       <div className="flex gap-4">
                          <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 border shrink-0">
                             <Image src={p.images?.split(",")[0] || "/placeholder.png"} alt={p.title} fill className="object-cover" />
                          </div>
                          <div className="flex-grow">
                             <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-black text-[#021D24] line-clamp-1">{p.title}</h4>
                                <span className={cn(
                                  "px-2 py-0.5 rounded-full text-[8px] font-black uppercase",
                                  p.status === "PENDING" ? "bg-orange-50 text-orange-500 border border-orange-100" : "bg-green-50 text-green-500 border border-green-100"
                                )}>
                                  {p.status === "PENDING" ? "مراجعة" : "نشط"}
                                </span>
                             </div>
                             <p className="text-[10px] text-gray-400 font-bold mb-3">{p.category?.name || "بدون تصنيف"}</p>
                             <div className="flex items-center justify-between border-t pt-3">
                                <span className="font-black text-[#1089A4]">{p.price.toLocaleString()} ج.س</span>
                                <span className="text-[10px] text-gray-400 font-bold">المخزون: {p.stock}</span>
                             </div>
                          </div>
                       </div>
                       <button onClick={() => handleDeleteProduct(p.id)} className="absolute top-2 left-2 w-8 h-8 bg-red-50 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center hover:bg-red-500 hover:text-white">
                          <span className="material-symbols-rounded text-base">delete</span>
                       </button>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="bg-white rounded-3xl border border-border overflow-hidden shadow-sm">
               <div className="px-8 py-6 border-b">
                  <h3 className="font-black text-[#021D24] text-xl">إدارة الطلبات</h3>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-right">
                     <thead>
                        <tr className="bg-gray-50/50 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b">
                           <th className="px-8 py-4">الطلب</th>
                           <th className="px-8 py-4">العميل</th>
                           <th className="px-8 py-4">المدينة</th>
                           <th className="px-8 py-4">المبلغ</th>
                           <th className="px-8 py-4">الحالة</th>
                        </tr>
                     </thead>
                     <tbody>
                        {orders.map(order => (
                           <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50/50 transition-colors">
                              <td className="px-8 py-6 font-black text-[#1089A4]">#{order.id.slice(-6)}</td>
                              <td className="px-8 py-6 font-black text-[#021D24]">{order.customerName}</td>
                              <td className="px-8 py-6 text-gray-400 text-sm">{order.city}</td>
                              <td className="px-8 py-6 font-black">{order.totalAmount.toLocaleString()} ج.س</td>
                              <td className="px-8 py-6">
                                 <span className={cn(
                                   "px-3 py-1 rounded-lg text-[10px] font-black uppercase",
                                   order.status === "DELIVERED" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                                 )}>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "الباقة الأساسية", desc: "ظهور في أعلى قسم 'وصل حديثاً' لمدة 3 أيام", price: "5,000 ج.س", color: "from-[#1089A4] to-[#086F85]" },
                { title: "الباقة الفضية", desc: "ظهور في قسم 'الأكثر مبيعاً' مع شريط مميز لمدة أسبوع", price: "12,000 ج.س", color: "from-[#F29124] to-[#D47B1E]" },
                { title: "الباقة الذهبية", desc: "إعلان بانر في الصفحة الرئيسية وظهور مميز لمدة شهر", price: "35,000 ج.س", color: "from-[#021D24] to-[#010E12]" },
              ].map((pkg, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl border border-border shadow-sm flex flex-col justify-between gap-8 group hover:border-[#1089A4] transition-all">
                  <div>
                    <h4 className="text-xl font-black text-[#021D24] mb-2">{pkg.title}</h4>
                    <p className="text-gray-400 font-bold text-sm leading-relaxed">{pkg.desc}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-[#1089A4] mb-4">{pkg.price}</p>
                    <button className="w-full bg-[#021D24] text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#1089A4] transition-colors">طلب الباقة</button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: string, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-sm transition-all group",
        active ? "bg-[#1089A4] text-white shadow-lg shadow-[#1089A4]/20" : "text-gray-500 hover:bg-gray-50"
      )}
    >
      <span className={cn("material-symbols-rounded text-xl", active ? "text-white" : "text-gray-400 group-hover:text-[#1089A4]")}>{icon}</span>
      {label}
    </button>
  );
}
