"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function DriverPortal() {
  const { driverId } = useParams();
  const [driver, setDriver] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  
  const timerRef = useRef<any>(null);

  const fetchOrders = async () => {
    try {
      const r = await fetch(`/api/delivery/orders?driverId=${driverId}`);
      if (!r.ok) throw new Error("فشل تحميل البيانات");
      const data = await r.json();
      setDriver(data.driver);
      setOrders(data.orders);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [driverId]);

  // GPS Tracking Logic
  const stopTracking = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsTracking(false);
    setActiveOrderId(null);
  };

  const startTracking = (orderId: string) => {
    if (isTracking && activeOrderId === orderId) {
      stopTracking();
      return;
    }
    
    // Stop any previous
    if (timerRef.current) clearInterval(timerRef.current);
    
    setIsTracking(true);
    setActiveOrderId(orderId);

    timerRef.current = setInterval(() => {
      if (!navigator.geolocation) return;
      
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            await fetch("/api/delivery/tracking", {
              method: "PATCH",
              body: JSON.stringify({ orderId, lat: latitude, lng: longitude })
            });
            setLastUpdate(new Date());
          } catch (err) {}
        },
        (err) => console.error("GPS Error:", err),
        { enableHighAccuracy: true }
      );
    }, 10000); // 10 seconds interval
  };

  const handleMarkDelivered = async (orderId: string) => {
    if (!confirm("هل أنت متأكد من تسليم الطلب للعميل؟")) return;
    
    try {
      // 1. Update status
      await fetch("/api/admin/orders", {
        method: "PATCH",
        body: JSON.stringify({ id: orderId, status: "DELIVERED" })
      });
      
      // 2. Stop tracking if active
      if (activeOrderId === orderId) stopTracking();
      
      // 3. Refresh list
      fetchOrders();
    } catch (err) {
      alert("حدث خطأ أثناء تحديث الحالة");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-[#1089A4]">جاري التحميل...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center font-bold text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-10" dir="rtl">
      {/* Header */}
      <header className="bg-[#021D24] text-white p-6 shadow-xl sticky top-0 z-10 rounded-b-[2rem]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black">{driver?.name}</h1>
            <p className="text-white/60 text-xs mt-0.5">{driver?.vehicleType} • {driver?.phone}</p>
          </div>
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
            <span className="material-symbols-rounded text-2xl">sports_motorsports</span>
          </div>
        </div>
        
        {isTracking && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-[#F29124]/20 border border-[#F29124]/30 rounded-xl flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#F29124]"></span>
              </span>
              <p className="text-xs font-bold text-[#F29124]">جاري بث الموقع الحي حالياً</p>
            </div>
            <p className="text-[10px] text-white/40">آخر تحديث: {lastUpdate?.toLocaleTimeString('ar-EG')}</p>
          </motion.div>
        )}
      </header>

      <main className="p-4 space-y-4 max-w-lg mx-auto mt-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="font-black text-[#021D24]">طلبات التوصيل النشطة</h2>
          <span className="bg-[#1089A4] text-white text-[10px] px-2 py-1 rounded-full font-bold">{orders.length} طلب</span>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 space-y-4 overflow-hidden relative">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] text-gray-400 font-mono">#{order.id.slice(-8)}</p>
                  <h3 className="font-bold text-lg text-[#021D24]">{order.customerName || "عميل مرسال"}</h3>
                </div>
                <span className="badge badge-packing text-[10px]">{order.status}</span>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-rounded text-base text-gray-400">location_on</span>
                  <p>{order.city} - {order.district} - {order.street}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-rounded text-base text-gray-400">phone</span>
                  <a href={`tel:${order.phone}`} className="text-[#1089A4] font-bold underline">{order.phone}</a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button 
                  onClick={() => startTracking(order.id)}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all",
                    activeOrderId === order.id 
                      ? "bg-[#F29124] border-[#F29124] text-white shadow-lg" 
                      : "bg-white border-gray-100 text-gray-500"
                  )}
                >
                  <span className="material-symbols-rounded mb-1">
                    {activeOrderId === order.id ? "share_location" : "near_me"}
                  </span>
                  <span className="text-[10px] font-bold">
                    {activeOrderId === order.id ? "إيقاف البث" : "بدء التوصيل"}
                  </span>
                </button>

                <button 
                  onClick={() => handleMarkDelivered(order.id)}
                  className="flex flex-col items-center justify-center p-3 bg-green-500 rounded-2xl text-white shadow-lg shadow-green-500/20 active:scale-95 transition"
                >
                  <span className="material-symbols-rounded mb-1">task_alt</span>
                  <span className="text-[10px] font-bold">تم التسليم</span>
                </button>
              </div>

              {/* External Map Link */}
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${order.city} ${order.district} ${order.street}`)}`}
                target="_blank"
                className="block text-center py-2 text-[10px] text-[#1089A4] font-bold hover:bg-gray-50 rounded-xl transition mt-2"
              >
                فتح خريطة العنوان ↗
              </a>
            </div>
          ))}

          {orders.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <span className="material-symbols-rounded text-6xl text-gray-100 mb-2">assignment_turned_in</span>
              <p className="text-gray-400 font-bold">لا توجد طلبات في عهدتك حالياً</p>
            </div>
          )}
        </div>
      </main>

      {/* Global CSS for Material Symbols if needed */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    </div>
  );
}
