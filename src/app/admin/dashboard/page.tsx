"use client"

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";

// ── Types ──────────────────────────────────────────────
type TabId =
  | "overview" | "approvals" | "users" | "vendors"
  | "categories" | "employees" | "orders" | "payments"
  | "delivery" | "shipping" | "finance" | "settings" | "inventory";

const NAV_ITEMS: { id: TabId; icon: string; label: string }[] = [
  { id: "overview",    icon: "dashboard_customize",  label: "التحكم" },
  { id: "approvals",   icon: "verified",              label: "الموافقات" },
  { id: "orders",      icon: "shopping_bag",          label: "الطلبات" },
  { id: "users",       icon: "person_search",         label: "المستخدمون" },
  { id: "vendors",     icon: "storefront",            label: "الموردون" },
  { id: "categories",  icon: "category",              label: "الأقسام" },
  { id: "inventory",   icon: "inventory_2",           label: "المنتجات" },
  { id: "employees",   icon: "badge",                 label: "الموظفون" },
  { id: "payments",    icon: "payments",              label: "طرق الدفع" },
  { id: "delivery",    icon: "local_shipping",        label: "مناطق التوصيل" },
  { id: "shipping",    icon: "settings_input_antenna",label: "شركة الشحن" },
  { id: "finance",     icon: "account_balance",       label: "المالية" },
  { id: "settings",    icon: "security",              label: "الإعدادات" },
];

const ORDER_STATUSES: Record<string, { label: string; cls: string }> = {
  PENDING_APPROVAL: { label: "بانتظار الموافقة", cls: "badge-pending" },
  APPROVED:         { label: "موافق عليه",        cls: "badge-approved" },
  PACKING:          { label: "قيد التعبئة",       cls: "badge-packing" },
  SHIPPED:          { label: "جاري التوصيل",      cls: "badge-shipped" },
  DELIVERED:        { label: "تم التسليم",         cls: "badge-delivered" },
  REJECTED:         { label: "مرفوض",             cls: "badge-rejected" },
};

const ROLES: Record<string, string> = {
  PACKING:          "مسؤول التغليف",
  SHIPPING:         "مسؤول الشحن",
  CUSTOMER_SERVICE: "خدمة العملاء",
  ADMIN:            "مدير",
};

// ── Shipping Label Component ───────────────────────────
function ShippingLabel({ order, onClose }: { order: any; onClose: () => void }) {
  const handlePrint = () => window.print();

  return (
    <div className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <div
        id="shipping-label-print"
        className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#021D24] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="material-symbols-rounded text-[#1089A4]">local_shipping</span>
            </div>
            <div>
              <p className="font-black text-sm">مرسال | MERSAL</p>
              <p className="text-[10px] text-white/50">ورقة الشحن</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white print:hidden">
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>

        <div className="p-5 space-y-4 text-sm font-medium">
          {/* Order Info */}
          <div className="flex justify-between text-xs text-gray-500 border-b pb-3">
            <span>رقم الطلب: <strong className="text-[#021D24]">#{order.id?.slice(-8).toUpperCase()}</strong></span>
            <span>{new Date(order.createdAt).toLocaleDateString("ar-EG")}</span>
          </div>

          {/* Customer Info */}
          <div className="space-y-2 bg-blue-50 rounded-lg p-4 border border-blue-100">
            <p className="text-xs font-black text-[#1089A4] uppercase tracking-wider mb-3">📍 بيانات العميل</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-400 block">الاسم</span>
                <strong>{order.customerName || order.customer?.name || "—"}</strong>
              </div>
              <div>
                <span className="text-gray-400 block">الهاتف</span>
                <strong dir="ltr">{order.phone}</strong>
              </div>
              <div className="col-span-2">
                <span className="text-gray-400 block">البريد الإلكتروني</span>
                <strong>{order.customerEmail || order.customer?.email || "—"}</strong>
              </div>
              <div>
                <span className="text-gray-400 block">المدينة</span>
                <strong>{order.city}</strong>
              </div>
              <div>
                <span className="text-gray-400 block">المنطقة</span>
                <strong>{order.district}</strong>
              </div>
              <div className="col-span-2">
                <span className="text-gray-400 block">الشارع</span>
                <strong>{order.street}</strong>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-1 border-b pb-3">
            <p className="text-xs font-black text-gray-500 uppercase tracking-wider mb-2">📦 محتوى الطلب</p>
            {order.items?.map((item: any, i: number) => (
              <div key={i} className="flex justify-between text-xs">
                <span>{item.product?.title}</span>
                <span className="font-bold">× {item.quantity}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-400">طريقة الدفع</p>
              <p className="font-bold text-sm">{order.paymentMethod === "COD" ? "💵 عند الاستلام" : "🏦 تحويل بنكي"}</p>
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-400">الإجمالي</p>
              <p className="font-black text-lg text-[#1089A4]">{order.totalAmount?.toLocaleString()} ج.س</p>
            </div>
          </div>

          {order.notes && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs">
              <span className="font-bold text-yellow-700">ملاحظة العميل: </span>{order.notes}
            </div>
          )}
        </div>

        {/* Print Button */}
        <div className="p-4 bg-gray-50 border-t flex gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="flex-1 bg-[#021D24] text-white py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2"
          >
            <span className="material-symbols-rounded text-sm">print</span>
            طباعة الورقة
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 border border-gray-200 rounded-lg font-bold text-sm text-gray-500"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────
export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [printOrder, setPrintOrder] = useState<any>(null);

  // Data states
  const [stats, setStats] = useState<any[]>([]);
  const [pendingVendors, setPendingVendors] = useState<any[]>([]);
  const [pendingProducts, setPendingProducts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [allVendors, setAllVendors] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [inventoryProducts, setInventoryProducts] = useState<any[]>([]);
  const [inventorySearch, setInventorySearch] = useState("");
  const [employees, setEmployees] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [orderStatus, setOrderStatus] = useState("ALL");
  const [orderSearch, setOrderSearch] = useState("");
  const [paymentSettings, setPaymentSettings] = useState<any>(null);
  const [deliveryZones, setDeliveryZones] = useState<any[]>([]);
  const [shippingProviders, setShippingProviders] = useState<any[]>([]);
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [sysSettings, setSysSettings] = useState<any>(null);
  const [admins, setAdmins] = useState<any[]>([]);

  // Form states
  const [newEmployee, setNewEmployee] = useState({ name: "", email: "", role: "PACKING" });
  const [newZone, setNewZone] = useState({ name: "", city: "", fee: "" });
  const [newCategory, setNewCategory] = useState({ name: "", icon: "📦" });
  const [newProvider, setNewProvider] = useState({ name: "", apiKey: "", baseUrl: "" });

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setPendingVendors(data.pendingVendors);
      }
    } catch {}
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === "overview") await fetchStats();
      if (activeTab === "approvals") {
        await fetchStats();
        const r = await fetch("/api/admin/products");
        if (r.ok) setPendingProducts(await r.json());
      }
      if (activeTab === "users") {
        const r = await fetch("/api/admin/users");
        if (r.ok) setUsers(await r.json());
      }
      if (activeTab === "vendors") {
        const r = await fetch("/api/admin/vendors");
        if (r.ok) setAllVendors(await r.json());
      }
      if (activeTab === "categories") {
        const r = await fetch("/api/admin/categories");
        if (r.ok) setCategories(await r.json());
      }
      if (activeTab === "inventory") {
        const params = new URLSearchParams();
        if (inventorySearch) params.set("search", inventorySearch);
        const r = await fetch(`/api/admin/inventory?${params}`);
        if (r.ok) setInventoryProducts(await r.json());
      }
      if (activeTab === "employees") {
        const r = await fetch("/api/admin/employees");
        if (r.ok) setEmployees(await r.json());
      }
      if (activeTab === "orders") {
        const params = new URLSearchParams();
        if (orderStatus !== "ALL") params.set("status", orderStatus);
        if (orderSearch) params.set("search", orderSearch);
        const r = await fetch(`/api/admin/orders?${params}`);
        if (r.ok) setOrders(await r.json());
      }
      if (activeTab === "payments") {
        const r = await fetch("/api/admin/payment-methods");
        if (r.ok) setPaymentSettings(await r.json());
      }
      if (activeTab === "delivery") {
        const r = await fetch("/api/admin/delivery-zones");
        if (r.ok) setDeliveryZones(await r.json());
      }
      if (activeTab === "shipping") {
        const r = await fetch("/api/admin/shipping-provider");
        if (r.ok) {
          const d = await r.json();
          setShippingProviders(d.all || []);
        }
      }
      if (activeTab === "finance") {
        await fetchStats();
        const r = await fetch("/api/admin/withdrawals");
        if (r.ok) setWithdrawals(await r.json());
      }
      if (activeTab === "settings") {
        const r = await fetch("/api/admin/settings");
        if (r.ok) {
          const d = await r.json();
          setSysSettings(d.settings);
          setAdmins(d.admins);
        }
      }
    } catch {}
    setLoading(false);
  }, [activeTab, orderStatus, orderSearch, inventorySearch, fetchStats]);

  useEffect(() => {
    if (!session) return;
    fetchData();
  }, [activeTab, session, fetchData]);

  // ── Actions ──
  const handleExportExcel = async () => {
    try {
      const XLSX = await import("xlsx");
      const exportData = inventoryProducts.map(p => ({
        "معرف المنتج (ID)": p.id,
        "اسم المنتج": p.title,
        "تاريخ الإضافة": new Date(p.createdAt).toLocaleDateString('ar-EG'),
        "السعر الحالي (ج.س)": p.price,
        "الكمية المتوفرة (Stock)": p.stock,
        "الحالة": p.status,
        "اسم البائع": p.vendor?.storeName || "—",
        "القسم": p.category?.name || "—"
      }));
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "المنتجات والمخزون");
      XLSX.writeFile(workbook, `مرسال_المخزون_${new Date().toISOString().slice(0,10)}.xlsx`);
    } catch (err) {
      alert("حدث خطأ أثناء تصدير الملف.");
    }
  };

  const handleImportExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setActionLoading("import_excel");
    try {
      const XLSX = await import("xlsx");
      const reader = new FileReader();
      reader.onload = async (evt) => {
        const bstr = evt.target?.result;
        const workbook = XLSX.read(bstr, { type: "binary" });
        const wsname = workbook.SheetNames[0];
        const ws = workbook.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        
        const formattedData = data.map((row: any) => ({
          id: row["معرف المنتج (ID)"],
          title: row["اسم المنتج"],
          price: row["السعر الحالي (ج.س)"],
          stock: row["الكمية المتوفرة (Stock)"],
          status: row["الحالة"]
        })).filter(p => !!p.id);

        if (formattedData.length > 0) {
          const res = await fetch("/api/admin/inventory", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ products: formattedData })
          });
          if (res.ok) {
            alert("تم تحديث المخزون بنجاح!");
            fetchData();
          } else {
            alert("حدث خطأ أثناء التحديث من الخادم.");
          }
        }
        setActionLoading(null);
      };
      reader.readAsBinaryString(file);
    } catch (err) {
      alert("فشل قراءة ومسح الملف.");
      setActionLoading(null);
    }
    e.target.value = '';
  };

  const handleVendorAction = async (id: string, status: string) => {
    setActionLoading(id);
    await fetch(`/api/admin/vendors/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
    setPendingVendors(prev => prev.filter(v => v.id !== id));
    fetchStats();
    setActionLoading(null);
  };

  const handleProductAction = async (id: string, action: string) => {
    setActionLoading(id);
    await fetch("/api/admin/products", { method: "POST", body: JSON.stringify({ id, action }) });
    setPendingProducts(prev => prev.filter(p => p.id !== id));
    setActionLoading(null);
  };

  const handleOrderStatus = async (id: string, status: string) => {
    setActionLoading(id);
    await fetch("/api/admin/orders", { method: "PATCH", body: JSON.stringify({ id, status }) });
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    setActionLoading(null);
  };

  const handleAddEmployee = async () => {
    if (!newEmployee.name || !newEmployee.email) return;
    setActionLoading("emp");
    const r = await fetch("/api/admin/employees", { method: "POST", body: JSON.stringify(newEmployee) });
    if (r.ok) {
      const data = await r.json();
      setEmployees(prev => [data, ...prev]);
      setNewEmployee({ name: "", email: "", role: "PACKING" });
    }
    setActionLoading(null);
  };

  const handleDeleteEmployee = async (id: string) => {
    await fetch("/api/admin/employees", { method: "DELETE", body: JSON.stringify({ id }) });
    setEmployees(prev => prev.filter(e => e.id !== id));
  };

  const handleAddZone = async () => {
    if (!newZone.name || !newZone.city || !newZone.fee) return;
    setActionLoading("zone");
    const r = await fetch("/api/admin/delivery-zones", { method: "POST", body: JSON.stringify({ ...newZone, fee: Number(newZone.fee) }) });
    if (r.ok) {
      const data = await r.json();
      setDeliveryZones(prev => [data, ...prev]);
      setNewZone({ name: "", city: "", fee: "" });
    }
    setActionLoading(null);
  };

  const handleDeleteZone = async (id: string) => {
    await fetch("/api/admin/delivery-zones", { method: "DELETE", body: JSON.stringify({ id }) });
    setDeliveryZones(prev => prev.filter(z => z.id !== id));
  };

  const handleAddCategory = async () => {
    if (!newCategory.name) return;
    setActionLoading("cat");
    const r = await fetch("/api/admin/categories", { method: "POST", body: JSON.stringify(newCategory) });
    if (r.ok) {
      const data = await r.json();
      setCategories(prev => [data, ...prev]);
      setNewCategory({ name: "", icon: "📦" });
    }
    setActionLoading(null);
  };

  const handleSaveProvider = async () => {
    if (!newProvider.name || !newProvider.apiKey || !newProvider.baseUrl) return;
    setActionLoading("provider");
    const r = await fetch("/api/admin/shipping-provider", { method: "POST", body: JSON.stringify(newProvider) });
    if (r.ok) {
      const data = await r.json();
      setShippingProviders(prev => [data, ...prev]);
      setNewProvider({ name: "", apiKey: "", baseUrl: "" });
    }
    setActionLoading(null);
  };

  const handleSavePayments = async () => {
    setActionLoading("pay");
    await fetch("/api/admin/payment-methods", { method: "PATCH", body: JSON.stringify(paymentSettings) });
    alert("تم حفظ إعدادات الدفع!");
    setActionLoading(null);
  };

  const handleWithdrawalAction = async (id: string, wStatus: string) => {
    setActionLoading(id);
    await fetch("/api/admin/withdrawals", { method: "PATCH", body: JSON.stringify({ id, status: wStatus }) });
    setWithdrawals(prev => prev.map(w => w.id === id ? { ...w, status: wStatus } : w));
    setActionLoading(null);
  };

  const handlePromoteAdmin = async () => {
    const email = prompt("أدخل البريد الإلكتروني للمستخدم المراد تعيينه مديراً:");
    if (!email) return;
    setActionLoading("promote");
    await fetch("/api/admin/users", { method: "PATCH", body: JSON.stringify({ email }) });
    fetchData();
    setActionLoading(null);
  };

  // ── Loading ──
  if (status === "loading" || (loading && !stats.length && activeTab === "overview")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#021D24]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-[#1089A4] border-t-transparent rounded-full animate-spin" />
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest">جاري التحقق...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex overflow-hidden font-sans rtl" dir="rtl">

      {/* Shipping Label Modal */}
      {printOrder && <ShippingLabel order={printOrder} onClose={() => setPrintOrder(null)} />}

      {/* ── Sidebar ── */}
      <aside className="hidden lg:flex w-72 bg-[#021D24] text-white flex-col pt-28 shadow-2xl z-20 overflow-y-auto">
        <div className="px-6 mb-8 flex flex-col items-center gap-4 text-center">
          <div className="relative w-20 h-20 rounded-2xl bg-white p-3 shadow-lg border border-white/10">
            <Image src="/logo.jpg" alt="Logo" fill className="object-contain" />
          </div>
          <div>
            <span className="font-black text-2xl text-[#1089A4] tracking-tight block">مـرسـال</span>
            <span className="text-[10px] text-white/30 uppercase tracking-widest">لوحة التحكم</span>
          </div>
        </div>

        <nav className="flex-grow px-4 space-y-1">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all",
                activeTab === item.id
                  ? "bg-[#1089A4] text-white shadow-lg"
                  : "text-white/40 hover:bg-white/5 hover:text-white/80"
              )}
            >
              <span className="material-symbols-rounded text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-5">
          <div className="bg-white/5 p-3 rounded-xl flex items-center gap-3 border border-white/10">
            <div className="w-9 h-9 rounded-lg bg-[#1089A4] flex items-center justify-center font-bold text-sm">
              {session?.user?.name?.[0]}
            </div>
            <div>
              <p className="text-xs font-bold">{session?.user?.name}</p>
              <p className="text-[9px] text-[#F29124] uppercase font-black">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-grow flex flex-col overflow-y-auto">

        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40 shadow-sm">
          <h2 className="text-lg font-black text-[#021D24]">
            {NAV_ITEMS.find(i => i.id === activeTab)?.label}
          </h2>
          <div className="flex items-center gap-3">
            {activeTab === "finance" && (
              <button
                onClick={() => window.open("/api/admin/reports/excel")}
                className="bg-[#1089A4] text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5"
              >
                <span className="material-symbols-rounded text-sm">download</span>
                تقرير إكسل
              </button>
            )}
            <button className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 hover:text-[#1089A4] transition-colors">
              <span className="material-symbols-rounded text-xl">notifications</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-8 space-y-6 pb-24 lg:pb-8">
          <AnimatePresence mode="wait">

            {/* ── 1. OVERVIEW ── */}
            {activeTab === "overview" && (
              <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {stats.map((s, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 flex items-center gap-5 shadow-sm">
                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white", s.color)}>
                        <span className="material-symbols-rounded text-2xl">{s.icon}</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{s.label}</p>
                        <p className="text-3xl font-black text-[#021D24]">{s.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {pendingVendors.length > 0 && (
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                    <p className="font-black text-orange-700 flex items-center gap-2">
                      <span className="material-symbols-rounded">warning</span>
                      {pendingVendors.length} موردون ينتظرون الموافقة
                      <button onClick={() => setActiveTab("approvals")} className="mr-auto text-xs bg-orange-200 px-3 py-1 rounded-lg">عرض</button>
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* ── 2. APPROVALS ── */}
            {activeTab === "approvals" && (
              <motion.div key="approvals" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pending Vendors */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-5 border-b flex items-center justify-between">
                    <h3 className="font-black text-[#021D24]">موافقة الموردين</h3>
                    <span className="bg-orange-100 text-orange-600 text-xs font-black px-3 py-1 rounded-full">{pendingVendors.length}</span>
                  </div>
                  <div className="divide-y">
                    {pendingVendors.map(v => (
                      <div key={v.id} className="p-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#1089A4] text-white flex items-center justify-center font-black">{v.store?.[0]}</div>
                          <div>
                            <p className="font-bold text-sm text-[#021D24]">{v.store}</p>
                            <p className="text-xs text-gray-400">{v.city} • {v.name}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button disabled={actionLoading === v.id} onClick={() => handleVendorAction(v.id, "APPROVED")} className="w-8 h-8 bg-green-500 text-white rounded-lg flex items-center justify-center hover:bg-green-600 disabled:opacity-50 transition-colors">
                            <span className="material-symbols-rounded text-sm">check</span>
                          </button>
                          <button disabled={actionLoading === v.id} onClick={() => handleVendorAction(v.id, "REJECTED")} className="w-8 h-8 bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-red-600 disabled:opacity-50 transition-colors">
                            <span className="material-symbols-rounded text-sm">close</span>
                          </button>
                        </div>
                      </div>
                    ))}
                    {pendingVendors.length === 0 && <p className="text-center py-8 text-gray-400 text-sm">لا توجد طلبات معلقة ✅</p>}
                  </div>
                </div>

                {/* Pending Products */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-5 border-b flex items-center justify-between">
                    <h3 className="font-black text-[#021D24]">مراجعة المنتجات</h3>
                    <span className="bg-blue-100 text-blue-600 text-xs font-black px-3 py-1 rounded-full">{pendingProducts.length}</span>
                  </div>
                  <div className="divide-y">
                    {pendingProducts.map(p => (
                      <div key={p.id} className="p-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border flex-shrink-0">
                            {p.images && <Image src={p.images.split(",")[0]} alt={p.title} fill className="object-cover" />}
                          </div>
                          <div>
                            <p className="font-bold text-xs text-[#021D24] leading-tight">{p.title}</p>
                            <p className="text-[11px] text-[#1089A4] font-bold">{p.price?.toLocaleString()} ج.س</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button disabled={actionLoading === p.id} onClick={() => handleProductAction(p.id, "APPROVE")} className="btn-icon-sm bg-green-500 disabled:opacity-50">
                            <span className="material-symbols-rounded text-sm">done_all</span>
                          </button>
                          <button disabled={actionLoading === p.id} onClick={() => handleProductAction(p.id, "REJECT")} className="btn-icon-sm bg-red-400 disabled:opacity-50">
                            <span className="material-symbols-rounded text-sm">delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                    {pendingProducts.length === 0 && <p className="text-center py-8 text-gray-400 text-sm">لا توجد منتجات بانتظار المراجعة ✅</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── 3. ORDERS ── */}
            {activeTab === "orders" && (
              <motion.div key="orders" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                {/* Filters */}
                <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-wrap gap-3 items-center">
                  <input
                    value={orderSearch} onChange={e => setOrderSearch(e.target.value)}
                    placeholder="بحث بالاسم أو رقم الطلب..."
                    className="input-mersal flex-1 min-w-[200px]"
                  />
                  <div className="flex gap-2 flex-wrap">
                    {["ALL", ...Object.keys(ORDER_STATUSES)].map(s => (
                      <button key={s} onClick={() => setOrderStatus(s)}
                        className={cn("px-3 py-1.5 rounded-lg text-xs font-bold transition-colors",
                          orderStatus === s ? "bg-[#1089A4] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        )}>
                        {s === "ALL" ? "الكل" : ORDER_STATUSES[s]?.label}
                      </button>
                    ))}
                  </div>
                  <button onClick={fetchData} className="px-4 py-2 bg-[#021D24] text-white rounded-lg text-xs font-bold">بحث</button>
                </div>

                {/* Orders List */}
                <div className="space-y-3">
                  {orders.map(order => (
                    <div key={order.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                      {/* Header */}
                      <div className="p-4 border-b bg-gray-50 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-black text-sm text-[#021D24]">
                              #{order.id?.slice(-8).toUpperCase()}
                            </p>
                            <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString("ar-EG")}</p>
                          </div>
                          <span className={cn("badge", ORDER_STATUSES[order.status]?.cls)}>
                            {ORDER_STATUSES[order.status]?.label}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {/* Print Button */}
                          <button
                            onClick={() => setPrintOrder(order)}
                            className="px-3 py-1.5 bg-[#021D24] text-white rounded-lg text-xs font-bold flex items-center gap-1"
                          >
                            <span className="material-symbols-rounded text-sm">print</span>
                            ورقة الشحن
                          </button>
                          {/* Status actions */}
                          {order.status === "PENDING_APPROVAL" && (
                            <>
                              <button
                                disabled={actionLoading === order.id}
                                onClick={() => { handleOrderStatus(order.id, "APPROVED"); setPrintOrder(order); }}
                                className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-xs font-bold"
                              >تأكيد</button>
                              <button disabled={actionLoading === order.id} onClick={() => handleOrderStatus(order.id, "REJECTED")} className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-bold">رفض</button>
                            </>
                          )}
                          {order.status === "APPROVED" && (
                            <button disabled={actionLoading === order.id} onClick={() => handleOrderStatus(order.id, "PACKING")} className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-xs font-bold">بدء التعبئة</button>
                          )}
                          {order.status === "PACKING" && (
                            <button disabled={actionLoading === order.id} onClick={() => handleOrderStatus(order.id, "SHIPPED")} className="px-3 py-1.5 bg-purple-500 text-white rounded-lg text-xs font-bold">تم الشحن</button>
                          )}
                          {order.status === "SHIPPED" && (
                            <button disabled={actionLoading === order.id} onClick={() => handleOrderStatus(order.id, "DELIVERED")} className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-bold">تم التسليم</button>
                          )}
                        </div>
                      </div>

                      {/* Customer & Items */}
                      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1 text-sm">
                          <p className="text-xs font-black text-gray-400 uppercase mb-2">📍 بيانات العميل</p>
                          <p><span className="text-gray-400">الاسم: </span><strong>{order.customerName || order.customer?.name}</strong></p>
                          <p><span className="text-gray-400">الهاتف: </span><strong dir="ltr">{order.phone}</strong></p>
                          <p><span className="text-gray-400">البريد: </span><span className="text-[#1089A4]">{order.customerEmail || order.customer?.email}</span></p>
                          <p><span className="text-gray-400">العنوان: </span><strong>{order.city} — {order.district}، {order.street}</strong></p>
                          <p><span className="text-gray-400">الدفع: </span><strong>{order.paymentMethod === "COD" ? "عند الاستلام" : "تحويل بنكي"}</strong></p>
                          <p><span className="text-gray-400">الإجمالي: </span><strong className="text-[#1089A4]">{order.totalAmount?.toLocaleString()} ج.س</strong></p>
                        </div>
                        <div>
                          <p className="text-xs font-black text-gray-400 uppercase mb-2">📦 المنتجات</p>
                          <div className="space-y-1">
                            {order.items?.map((item: any, i: number) => (
                              <div key={i} className="flex items-center gap-2 text-xs">
                                <span className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center font-bold">{item.quantity}</span>
                                <span>{item.product?.title}</span>
                                <span className="mr-auto text-[#1089A4] font-bold">{(item.priceAtTime * item.quantity).toLocaleString()} ج.س</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {!loading && orders.length === 0 && (
                    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                      <span className="material-symbols-rounded text-5xl text-gray-300">shopping_bag</span>
                      <p className="text-gray-400 mt-3 font-bold">لا توجد طلبات</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ── 4. USERS ── */}
            {activeTab === "users" && (
              <motion.div key="users" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b flex items-center justify-between bg-gray-50">
                  <h3 className="font-black text-[#021D24]">قاعدة بيانات المستخدمين ({users.length})</h3>
                  <input type="text" placeholder="بحث..." className="input-mersal w-52 text-sm py-1.5" />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-sm">
                    <thead className="bg-[#021D24] text-white/60 text-[11px] uppercase tracking-wider">
                      <tr>
                        <th className="px-5 py-4">المستخدم</th>
                        <th className="px-5 py-4">الهاتف</th>
                        <th className="px-5 py-4">الدور</th>
                        <th className="px-5 py-4">تاريخ التسجيل</th>
                        <th className="px-5 py-4">الإجراء</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {users.map(u => (
                        <tr key={u.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setSelectedUser(u)}>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-[#1089A4]/10 text-[#1089A4] flex items-center justify-center font-black text-sm flex-shrink-0">
                                {(u.name?.[0] || "?").toUpperCase()}
                              </div>
                              <div>
                                <p className="font-bold text-[#021D24]">{u.name || "بدون اسم"}</p>
                                <p className="text-xs text-[#1089A4]">{u.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-sm">{u.phone || "—"}</td>
                          <td className="px-5 py-4">
                            <span className={cn("badge", u.role === "ADMIN" ? "badge-approved" : "badge-pending")}>{u.role}</span>
                          </td>
                          <td className="px-5 py-4 text-xs text-gray-400">{new Date(u.createdAt).toLocaleDateString("ar-EG")}</td>
                          <td className="px-5 py-4">
                            <button className="text-xs text-[#1089A4] font-bold hover:underline" onClick={e => { e.stopPropagation(); setSelectedUser(u); }}>
                              عرض الملف
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* User Profile Modal */}
                {selectedUser && (
                  <div className="fixed inset-0 z-[500] bg-black/50 flex items-center justify-center p-4" onClick={() => setSelectedUser(null)}>
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-between">
                        <h3 className="font-black text-[#021D24]">ملف المستخدم</h3>
                        <button onClick={() => setSelectedUser(null)} className="text-gray-400 hover:text-gray-600">
                          <span className="material-symbols-rounded">close</span>
                        </button>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="w-14 h-14 rounded-2xl bg-[#1089A4] text-white flex items-center justify-center font-black text-2xl">
                          {(selectedUser.name?.[0] || "?").toUpperCase()}
                        </div>
                        <div>
                          <p className="font-black text-lg text-[#021D24]">{selectedUser.name || "بدون اسم"}</p>
                          <p className="text-sm text-[#1089A4]">{selectedUser.email}</p>
                          <span className={cn("badge mt-1", selectedUser.role === "ADMIN" ? "badge-approved" : "badge-pending")}>{selectedUser.role}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        {[
                          ["الهاتف", selectedUser.phone || "غير مضاف"],
                          ["عنوان IP", selectedUser.lastIp || "غير معروف"],
                          ["تاريخ التسجيل", new Date(selectedUser.createdAt).toLocaleDateString("ar-EG")],
                          ["آخر تسجيل دخول", selectedUser.lastLogin ? new Date(selectedUser.lastLogin).toLocaleDateString("ar-EG") : "—"],
                        ].map(([label, val]) => (
                          <div key={label} className="bg-gray-50 p-3 rounded-xl">
                            <p className="text-xs text-gray-400 font-bold">{label}</p>
                            <p className="font-bold text-[#021D24]">{val}</p>
                          </div>
                        ))}
                      </div>
                      <button className="w-full py-2.5 bg-red-50 text-red-500 rounded-xl font-bold text-sm border border-red-200">
                        حظر هذا المستخدم
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* ── 5. VENDORS ── */}
            {activeTab === "vendors" && (
              <motion.div key="vendors" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allVendors.map((store, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#021D24] text-white flex items-center justify-center font-black text-lg">
                          {store.name?.[0]}
                        </div>
                        <span className={cn("badge", store.status === "APPROVED" ? "badge-approved" : "badge-pending")}>
                          {store.status === "APPROVED" ? "نشط" : store.status}
                        </span>
                      </div>
                      <h3 className="font-black text-[#021D24] mb-1">{store.name}</h3>
                      <p className="text-xs text-gray-400 mb-4">المالك: {store.owner}</p>
                      <div className="grid grid-cols-2 gap-3 border-t pt-4">
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase block">المنتجات</span>
                          <span className="font-black text-[#1089A4]">{store.productsCount}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase block">المبيعات</span>
                          <span className="font-black text-[#F29124]">{store.sales}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button onClick={() => handleVendorAction(store.id, store.status === "APPROVED" ? "SUSPENDED" : "APPROVED")}
                          className="flex-1 py-2 text-xs font-bold rounded-lg border border-gray-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors">
                          {store.status === "APPROVED" ? "إيقاف" : "تفعيل"}
                        </button>
                        <button className="flex-1 py-2 text-xs font-bold rounded-lg bg-[#021D24] text-white">التفاصيل</button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── 6. CATEGORIES ── */}
            {activeTab === "categories" && (
              <motion.div key="categories" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                {/* Add Category */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <h3 className="font-black text-[#021D24] mb-4">إضافة قسم جديد</h3>
                  <div className="flex gap-3">
                    <input value={newCategory.icon} onChange={e => setNewCategory(p => ({...p, icon: e.target.value}))} className="input-mersal w-20 text-center text-xl" placeholder="📦" />
                    <input value={newCategory.name} onChange={e => setNewCategory(p => ({...p, name: e.target.value}))} className="input-mersal flex-1" placeholder="اسم القسم مثلاً: ملابس" />
                    <button onClick={handleAddCategory} disabled={actionLoading === "cat"} className="btn-primary px-6 disabled:opacity-50">
                      إضافة +
                    </button>
                  </div>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {categories.map(cat => (
                    <div key={cat.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer group" onClick={async () => {
                      const r = await fetch(`/api/admin/categories?id=${cat.id}`);
                      if (r.ok) setSelectedCategory(await r.json());
                    }}>
                      <div className="text-4xl mb-3">{cat.icon || "📦"}</div>
                      <p className="font-black text-[#021D24]">{cat.name}</p>
                      <p className="text-xs text-gray-400 mt-1">{cat._count?.products || 0} منتج</p>
                    </div>
                  ))}
                </div>

                {/* Category Products Modal */}
                {selectedCategory && (
                  <div className="fixed inset-0 z-[500] bg-black/50 flex items-center justify-center p-4" onClick={() => setSelectedCategory(null)}>
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
                      <div className="p-5 border-b flex items-center justify-between">
                        <h3 className="font-black text-[#021D24] flex items-center gap-2">
                          <span className="text-2xl">{selectedCategory.icon}</span>
                          {selectedCategory.name} ({selectedCategory.products?.length} منتج)
                        </h3>
                        <button onClick={() => setSelectedCategory(null)}><span className="material-symbols-rounded text-gray-400">close</span></button>
                      </div>
                      <div className="overflow-y-auto p-4 space-y-3">
                        {selectedCategory.products?.map((p: any) => (
                          <div key={p.id} className="flex items-center gap-3 p-3 border rounded-xl">
                            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                              {p.images && <Image src={p.images.split(",")[0]} alt={p.title} fill className="object-cover" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-sm text-[#021D24] truncate">{p.title}</p>
                              <p className="text-xs text-gray-400">{p.vendor?.storeName}</p>
                            </div>
                            <div className="text-left">
                              <p className="font-black text-[#1089A4] text-sm">{p.price?.toLocaleString()} ج.س</p>
                              <p className="text-xs text-gray-400">مخزون: {p.stock}</p>
                            </div>
                          </div>
                        ))}
                        {selectedCategory.products?.length === 0 && <p className="text-center py-8 text-gray-400">لا توجد منتجات في هذا القسم</p>}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* ── 7. EMPLOYEES ── */}
            {activeTab === "employees" && (
              <motion.div key="employees" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                {/* Add Form */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <h3 className="font-black text-[#021D24] mb-4">تعيين موظف جديد</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <input value={newEmployee.name} onChange={e => setNewEmployee(p => ({...p, name: e.target.value}))} className="input-mersal" placeholder="الاسم الكامل" />
                    <input value={newEmployee.email} onChange={e => setNewEmployee(p => ({...p, email: e.target.value}))} className="input-mersal" placeholder="البريد الإلكتروني" type="email" />
                    <select value={newEmployee.role} onChange={e => setNewEmployee(p => ({...p, role: e.target.value}))} className="input-mersal">
                      {Object.entries(ROLES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                    <button onClick={handleAddEmployee} disabled={actionLoading === "emp"} className="btn-primary disabled:opacity-50">
                      تعيين +
                    </button>
                  </div>
                </div>

                {/* Employees List */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <table className="w-full text-right text-sm">
                    <thead className="bg-gray-50 border-b text-xs font-black text-gray-500 uppercase">
                      <tr>
                        <th className="px-5 py-3">الموظف</th>
                        <th className="px-5 py-3">الدور</th>
                        <th className="px-5 py-3">الحالة</th>
                        <th className="px-5 py-3">إجراء</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {employees.map(emp => (
                        <tr key={emp.id} className="hover:bg-gray-50">
                          <td className="px-5 py-4">
                            <div>
                              <p className="font-bold">{emp.name}</p>
                              <p className="text-xs text-gray-400">{emp.email}</p>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <span className="badge badge-packing">{ROLES[emp.role]}</span>
                          </td>
                          <td className="px-5 py-4">
                            <span className={cn("badge", emp.isActive ? "badge-approved" : "badge-rejected")}>
                              {emp.isActive ? "نشط" : "موقوف"}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <button onClick={() => handleDeleteEmployee(emp.id)} className="text-xs text-red-500 font-bold hover:underline">حذف</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {employees.length === 0 && <p className="text-center py-8 text-gray-400 text-sm">لا يوجد موظفون مضافون بعد</p>}
                </div>
              </motion.div>
            )}

            {/* ── 8. PAYMENTS ── */}
            {activeTab === "payments" && (
              <motion.div key="payments" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl space-y-4">
                {paymentSettings ? (
                  <>
                    {/* COD */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-black text-[#021D24] flex items-center gap-2">
                          <span className="material-symbols-rounded text-[#F29124]">payments</span>
                          الدفع عند الاستلام
                        </h3>
                        <button
                          onClick={() => setPaymentSettings((p: any) => ({...p, codEnabled: !p.codEnabled}))}
                          className={cn("w-12 h-6 rounded-full relative transition-all", paymentSettings.codEnabled ? "bg-[#1089A4]" : "bg-gray-200")}
                        >
                          <div className={cn("absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all shadow", paymentSettings.codEnabled ? "right-0.5" : "left-0.5")} />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-bold text-gray-500 block mb-1">رسوم التوصيل الإضافية (ج.س)</label>
                          <input type="number" value={paymentSettings.codExtraFee || 2000}
                            onChange={e => setPaymentSettings((p: any) => ({...p, codExtraFee: Number(e.target.value)}))}
                            className="input-mersal" />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-gray-500 block mb-1">المدن المتاحة</label>
                          <input value={paymentSettings.codCitiesOnly || "الخرطوم"}
                            onChange={e => setPaymentSettings((p: any) => ({...p, codCitiesOnly: e.target.value}))}
                            className="input-mersal" placeholder="الخرطوم، أم درمان..." />
                        </div>
                      </div>
                    </div>

                    {/* Bank Transfer */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-black text-[#021D24] flex items-center gap-2">
                          <span className="material-symbols-rounded text-[#1089A4]">account_balance</span>
                          التحويل البنكي
                        </h3>
                        <button
                          onClick={() => setPaymentSettings((p: any) => ({...p, bankTransferEnabled: !p.bankTransferEnabled}))}
                          className={cn("w-12 h-6 rounded-full relative transition-all", paymentSettings.bankTransferEnabled ? "bg-[#1089A4]" : "bg-gray-200")}
                        >
                          <div className={cn("absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all shadow", paymentSettings.bankTransferEnabled ? "right-0.5" : "left-0.5")} />
                        </button>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-bold text-gray-500 block mb-1">اسم البنك</label>
                          <input value={paymentSettings.bankName || ""} onChange={e => setPaymentSettings((p: any) => ({...p, bankName: e.target.value}))} className="input-mersal" placeholder="بنك السودان الجزيرة..." />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-gray-500 block mb-1">رقم الحساب</label>
                          <input value={paymentSettings.bankAccountNumber || ""} onChange={e => setPaymentSettings((p: any) => ({...p, bankAccountNumber: e.target.value}))} className="input-mersal" placeholder="1234567890" dir="ltr" />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-gray-500 block mb-1">اسم صاحب الحساب</label>
                          <input value={paymentSettings.bankAccountName || ""} onChange={e => setPaymentSettings((p: any) => ({...p, bankAccountName: e.target.value}))} className="input-mersal" placeholder="مرسال للتجارة الإلكترونية" />
                        </div>
                      </div>
                    </div>

                    <button onClick={handleSavePayments} disabled={actionLoading === "pay"} className="btn-primary w-full py-3 text-sm disabled:opacity-50">
                      {actionLoading === "pay" ? "جاري الحفظ..." : "💾 حفظ إعدادات الدفع"}
                    </button>
                  </>
                ) : <p className="text-center py-8 text-gray-400">جاري التحميل...</p>}
              </motion.div>
            )}

            {/* ── 9. DELIVERY ZONES ── */}
            {activeTab === "delivery" && (
              <motion.div key="delivery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <h3 className="font-black text-[#021D24] mb-4">إضافة منطقة توصيل</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <input value={newZone.name} onChange={e => setNewZone(p => ({...p, name: e.target.value}))} className="input-mersal" placeholder="اسم المنطقة (شمبات...)" />
                    <input value={newZone.city} onChange={e => setNewZone(p => ({...p, city: e.target.value}))} className="input-mersal" placeholder="المدينة (الخرطوم...)" />
                    <input type="number" value={newZone.fee} onChange={e => setNewZone(p => ({...p, fee: e.target.value}))} className="input-mersal" placeholder="رسوم التوصيل (ج.س)" />
                    <button onClick={handleAddZone} disabled={actionLoading === "zone"} className="btn-primary disabled:opacity-50">إضافة +</button>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <table className="w-full text-right text-sm">
                    <thead className="bg-gray-50 border-b text-xs font-black text-gray-500 uppercase">
                      <tr>
                        <th className="px-5 py-3">المنطقة</th>
                        <th className="px-5 py-3">المدينة</th>
                        <th className="px-5 py-3">رسوم التوصيل</th>
                        <th className="px-5 py-3">الحالة</th>
                        <th className="px-5 py-3">إجراء</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {deliveryZones.map(zone => (
                        <tr key={zone.id} className="hover:bg-gray-50">
                          <td className="px-5 py-4 font-bold">{zone.name}</td>
                          <td className="px-5 py-4">{zone.city}</td>
                          <td className="px-5 py-4 font-black text-[#1089A4]">{zone.fee?.toLocaleString()} ج.س</td>
                          <td className="px-5 py-4">
                            <span className={cn("badge", zone.isActive ? "badge-approved" : "badge-rejected")}>
                              {zone.isActive ? "نشطة" : "معطّلة"}
                            </span>
                          </td>
                          <td className="px-5 py-4 flex gap-2">
                            <button onClick={async () => {
                              await fetch("/api/admin/delivery-zones", { method: "PATCH", body: JSON.stringify({ id: zone.id, isActive: !zone.isActive }) });
                              setDeliveryZones(prev => prev.map(z => z.id === zone.id ? {...z, isActive: !z.isActive} : z));
                            }} className="text-xs font-bold text-[#1089A4] hover:underline">
                              {zone.isActive ? "تعطيل" : "تفعيل"}
                            </button>
                            <button onClick={() => handleDeleteZone(zone.id)} className="text-xs font-bold text-red-500 hover:underline">حذف</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {deliveryZones.length === 0 && <p className="text-center py-8 text-gray-400 text-sm">لم تُضف مناطق توصيل بعد</p>}
                </div>
              </motion.div>
            )}

            {/* ── 10. SHIPPING PROVIDER ── */}
            {activeTab === "shipping" && (
              <motion.div key="shipping" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl space-y-4">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
                  <h3 className="font-black text-[#021D24] flex items-center gap-2">
                    <span className="material-symbols-rounded text-[#1089A4]">settings_input_antenna</span>
                    ربط شركة الشحن
                  </h3>
                  <p className="text-sm text-gray-500">أدخل بيانات الـ API الخاص بشركة التوصيل وسيتكامل الموقع معها تلقائياً.</p>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-gray-500 block mb-1">اسم الشركة</label>
                      <input value={newProvider.name} onChange={e => setNewProvider(p => ({...p, name: e.target.value}))} className="input-mersal" placeholder="مثلاً: شركة توصيل السودان" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 block mb-1">API Key</label>
                      <input value={newProvider.apiKey} onChange={e => setNewProvider(p => ({...p, apiKey: e.target.value}))} className="input-mersal" placeholder="sk_live_xxxx..." type="password" dir="ltr" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 block mb-1">Base URL للـ API</label>
                      <input value={newProvider.baseUrl} onChange={e => setNewProvider(p => ({...p, baseUrl: e.target.value}))} className="input-mersal" placeholder="https://api.deliverycompany.sd/orders" dir="ltr" />
                    </div>
                    <button onClick={handleSaveProvider} disabled={actionLoading === "provider"} className="btn-primary w-full py-3 text-sm disabled:opacity-50">
                      {actionLoading === "provider" ? "جاري الحفظ..." : "🔗 حفظ وربط الشركة"}
                    </button>
                  </div>
                </div>

                {/* Active Providers */}
                {shippingProviders.length > 0 && (
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b font-black text-[#021D24] text-sm">شركات الشحن المضافة</div>
                    <div className="divide-y">
                      {shippingProviders.map(p => (
                        <div key={p.id} className="p-4 flex items-center justify-between gap-3">
                          <div>
                            <p className="font-bold">{p.name}</p>
                            <p className="text-xs text-gray-400 font-mono" dir="ltr">{p.baseUrl}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {p.isActive && <span className="badge badge-approved">نشطة</span>}
                            <button
                              onClick={() => fetch("/api/admin/shipping-provider", { method: "PATCH", body: JSON.stringify({ id: p.id, isActive: true }) }).then(fetchData)}
                              className="text-xs text-[#1089A4] font-bold hover:underline"
                            >
                              {p.isActive ? "افتراضية" : "تفعيل"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* ── 11. FINANCE ── */}
            {activeTab === "finance" && (
              <motion.div key="finance" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {stats.map((s, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
                      <p className="text-xs font-bold text-gray-400 uppercase mb-2">{s.label}</p>
                      <p className="text-3xl font-black text-[#1089A4]">{s.value}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-[#021D24] text-white rounded-xl p-6 shadow-xl space-y-3">
                  <h3 className="font-black text-lg">طلبات سحب الأرباح</h3>
                  {withdrawals.map((req, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between gap-4">
                      <div>
                        <p className="font-bold text-sm">{req.vendor}</p>
                        <p className="text-xs text-white/40">{req.method} • {req.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-black text-[#F29124]">{req.amount?.toLocaleString()} ج.س</p>
                        {req.status === "PENDING" ? (
                          <div className="flex gap-2">
                            <button onClick={() => handleWithdrawalAction(req.id, "APPROVED")} className="px-3 py-1 bg-green-500 rounded-lg text-xs font-bold">موافقة</button>
                            <button onClick={() => handleWithdrawalAction(req.id, "REJECTED")} className="px-3 py-1 bg-red-500 rounded-lg text-xs font-bold">رفض</button>
                          </div>
                        ) : (
                          <span className="text-xs opacity-40 uppercase">{req.status}</span>
                        )}
                      </div>
                    </div>
                  ))}
                  {withdrawals.length === 0 && <p className="text-center py-6 text-white/20 font-bold">لا توجد طلبات سحب</p>}
                </div>
              </motion.div>
            )}

            {/* ── 12. SETTINGS ── */}
            {activeTab === "settings" && (
              <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl space-y-6">
                <div className="bg-[#021D24] text-white rounded-xl p-6 shadow-xl space-y-4">
                  <h3 className="font-black text-lg text-[#F29124]">إعدادات النظام</h3>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div>
                      <p className="font-bold">وضع الصيانة</p>
                      <p className="text-xs text-white/40 mt-0.5">عند التفعيل يُقفل الموقع عن كل المستخدمين</p>
                    </div>
                    <button
                      onClick={async () => {
                        const v = !sysSettings?.maintenanceMode;
                        await fetch("/api/admin/settings", { method: "PATCH", body: JSON.stringify({ maintenanceMode: v }) });
                        setSysSettings((p: any) => ({...p, maintenanceMode: v}));
                      }}
                      className={cn("w-14 h-7 rounded-full relative transition-all", sysSettings?.maintenanceMode ? "bg-[#F29124]" : "bg-white/20")}
                    >
                      <div className={cn("absolute top-1 w-5 h-5 bg-white rounded-full transition-all shadow", sysSettings?.maintenanceMode ? "left-1" : "left-8")} />
                    </button>
                  </div>
                </div>

                {/* Admins List */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-[#021D24]">هيئة المدراء</h3>
                    <button onClick={handlePromoteAdmin} disabled={actionLoading === "promote"} className="btn-primary text-xs px-4 py-2 disabled:opacity-50">
                      {actionLoading === "promote" ? "..." : "إضافة مدير +"}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {admins.map(admin => (
                      <div key={admin.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border">
                        <div className="w-10 h-10 rounded-lg bg-[#021D24] text-white flex items-center justify-center font-black">{admin.name?.[0]}</div>
                        <div>
                          <p className="font-bold text-sm text-[#021D24]">{admin.name}</p>
                          <p className="text-xs text-gray-400">{admin.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── 13. INVENTORY ── */}
            {activeTab === "inventory" && (
              <motion.div key="inventory" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center gap-2 flex-grow max-w-sm">
                    <div className="relative flex-grow">
                      <span className="material-symbols-rounded absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                      <input
                        value={inventorySearch}
                        onChange={e => setInventorySearch(e.target.value)}
                        placeholder="ابحث عن منتج، بائع..."
                        className="input-mersal pr-10 w-full"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={handleExportExcel} className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg text-sm flex items-center gap-2 hover:bg-green-700 transition">
                      <span className="material-symbols-rounded text-sm">download</span>
                      تصدير Excel
                    </button>
                    <label className="px-4 py-2 bg-[#1089A4] text-white font-bold rounded-lg text-sm flex items-center gap-2 hover:bg-[#0c7287] transition cursor-pointer relative overflow-hidden">
                      <span className="material-symbols-rounded text-sm">upload</span>
                      {actionLoading === "import_excel" ? "جاري التحديث..." : "استيراد Excel"}
                      <input type="file" accept=".xlsx, .xls" className="hidden" onChange={handleImportExcel} disabled={actionLoading === "import_excel"} />
                    </label>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-right text-sm">
                      <thead className="bg-[#021D24] text-white text-xs">
                        <tr>
                          <th className="px-5 py-4">ID</th>
                          <th className="px-5 py-4">المنتج</th>
                          <th className="px-5 py-4">البائع</th>
                          <th className="px-5 py-4">القسم</th>
                          <th className="px-5 py-4">السعر</th>
                          <th className="px-5 py-4">المخزون</th>
                          <th className="px-5 py-4">الحالة</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {inventoryProducts.map(p => (
                          <tr key={p.id} className="hover:bg-gray-50">
                            <td className="px-5 py-3 text-xs text-gray-400 font-mono" dir="ltr">{p.id.slice(-8)}</td>
                            <td className="px-5 py-3 font-bold text-[#021D24] max-w-[200px] truncate">{p.title}</td>
                            <td className="px-5 py-3 text-gray-600">{p.vendor?.storeName || '—'}</td>
                            <td className="px-5 py-3 text-gray-500">{p.category?.name || '—'}</td>
                            <td className="px-5 py-3 font-black text-[#1089A4]">{p.price?.toLocaleString()} ج.س</td>
                            <td className="px-5 py-3">
                              <span className={cn("font-bold px-2 py-1 rounded border", p.stock > 0 ? "text-green-600 border-green-200 bg-green-50" : "text-red-600 border-red-200 bg-red-50")}>
                                {p.stock} قطعة
                              </span>
                            </td>
                            <td className="px-5 py-3">
                              <span className={cn("badge text-[10px]", p.status === 'APPROVED' ? "badge-approved" : p.status === 'PENDING' ? "badge-pending" : "badge-rejected")}>
                                {p.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {inventoryProducts.length === 0 && (
                      <div className="text-center py-10 text-gray-400 font-bold">لا توجد منتجات مطابقة</div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      {/* ── Mobile Nav ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[200] bg-[#021D24]/95 backdrop-blur-xl border-t border-white/10 pb-safe">
        <div className="flex items-center justify-around h-16 px-2 overflow-x-auto">
          {NAV_ITEMS.slice(0, 6).map(item => {
            const isActive = activeTab === item.id;
            return (
              <button key={item.id} onClick={() => setActiveTab(item.id)} className="flex flex-col items-center gap-0.5 min-w-0 px-2">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-all", isActive ? "bg-[#1089A4] text-white" : "text-white/30")}>
                  <span className="material-symbols-rounded text-lg">{item.icon}</span>
                </div>
                {isActive && <span className="text-[8px] text-[#1089A4] font-black">{item.label}</span>}
              </button>
            );
          })}
        </div>
      </nav>

    </div>
  );
}
