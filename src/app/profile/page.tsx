"use client"

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

const CATEGORIES = [
  { id: "electronics", name: "إلكترونيات", icon: "devices" },
  { id: "fashion", name: "أزياء", icon: "apparel" },
  { id: "home", name: "منزل", icon: "home_remodel" },
  { id: "beauty", name: "جمال", icon: "content_cut" },
  { id: "sports", name: "رياضة", icon: "fitness_center" },
  { id: "kids", name: "أطفال", icon: "child_care" },
];

export default function ProfilePage() {
  const { data: session, update: updateSession } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    interests: [] as string[],
  });

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        age: (session.user as any).age?.toString() || "",
        phone: (session.user as any).phone || "",
        interests: (session.user as any).interests?.split(',') || [],
      });
    }
  }, [session]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          age: formData.age,
          phone: formData.phone,
          interests: formData.interests.join(','),
        }),
      });

      if (res.ok) {
        await updateSession();
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleInterest = (id: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(id) 
        ? prev.interests.filter(i => i !== id) 
        : [...prev.interests, id]
    }));
  };

  if (!session) {
    return (
      <div className="min-h-screen pt-40 flex flex-col items-center justify-center gap-6">
         <h1 className="text-2xl font-black">يجب تسجيل الدخول أولاً</h1>
         <Link href="/login" className="bg-[#1089A4] text-white px-8 py-3 rounded-xl font-bold">تسجيل الدخول</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-32 md:pt-40 pb-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 shadow-sm border border-border/5 flex flex-col md:flex-row items-center gap-8 md:gap-10 text-right">
           <div className="relative">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2.5rem] overflow-hidden border-8 border-[#F8F9FA] shadow-2xl skew-y-3">
                 <Image src={session.user?.image || "/logo.jpg"} alt="User" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#F29124] text-white p-3 rounded-2xl shadow-xl">
                 <span className="material-symbols-rounded text-2xl animate-pulse">verified_user</span>
              </div>
           </div>

           <div className="flex-grow space-y-4">
              <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                 <div className="space-y-1">
                     <span className="text-[10px] font-black uppercase tracking-widest text-[#1089A4] bg-[#1089A4]/10 px-3 py-1 rounded-full w-fit">عضو بلاتيني</span>
                    {isEditing ? (
                      <input 
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="text-2xl md:text-4xl font-black text-[#021D24] tracking-tight bg-muted/30 px-4 py-2 rounded-xl outline-none border-2 border-[#1089A4]/20 focus:border-[#1089A4] transition-all w-full"
                      />
                    ) : (
                      <h1 className="text-2xl md:text-4xl font-black text-[#021D24] tracking-tight">{session.user?.name}</h1>
                    )}
                 </div>
                 <div className="flex gap-4">
                    {isEditing ? (
                      <>
                        <button 
                          onClick={handleSave}
                          disabled={isSaving}
                          className="bg-[#1089A4] text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#1089A4]/20 hover:scale-105 transition-all disabled:opacity-50"
                        >
                          {isSaving ? "جاري الحفظ..." : "حفظ التعديلات"}
                        </button>
                        <button 
                          onClick={() => setIsEditing(false)}
                          className="bg-muted text-[#021D24]/40 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-muted/50 transition-all"
                        >
                          إلغاء
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => setIsEditing(true)}
                          className="bg-[#1089A4] text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#1089A4]/20 hover:scale-105 transition-all"
                        >
                          تعديل الملف الشخصي
                        </button>
                        <button 
                          onClick={() => signOut()}
                          className="flex items-center gap-2 text-xs font-black text-red-500 hover:bg-red-50 px-6 py-3 rounded-2xl transition-all"
                        >
                           تسجيل الخروج <span className="material-symbols-rounded text-lg">logout</span>
                        </button>
                      </>
                    )}
                 </div>
              </div>
              <p className="text-[#021D24]/40 font-medium text-lg">{session.user?.email}</p>
              
              <div className="flex flex-wrap gap-3 pt-4">
                 <div className="flex items-center gap-2 bg-[#F8F9FA] px-4 py-2 rounded-xl border border-border/5">
                    <span className="material-symbols-rounded text-[#021D24]/20 text-lg">cake</span>
                    {isEditing ? (
                      <input 
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                        className="text-xs font-black text-[#021D24] bg-transparent outline-none w-16"
                        placeholder="العمر"
                      />
                    ) : (
                      <span className="text-xs font-black text-[#021D24]/60">العمر: {formData.age || "--"} عام</span>
                    )}
                 </div>
                 <div className="flex items-center gap-2 bg-[#F8F9FA] px-4 py-2 rounded-xl border border-border/5">
                    <span className="material-symbols-rounded text-[#021D24]/20 text-lg">call</span>
                    {isEditing ? (
                      <input 
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="text-xs font-black text-[#021D24] bg-transparent outline-none w-32"
                        placeholder="رقم الهاتف"
                      />
                    ) : (
                      <span className="text-xs font-black text-[#021D24]/60">الهاتف: {formData.phone || "--"}</span>
                    )}
                 </div>
              </div>
           </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
           
           {/* Interests Card */}
           <div className="lg:col-span-2 bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-border/5 space-y-8 text-right">
              <div className="flex items-center justify-between border-b border-border/10 pb-6">
                 <h2 className="text-xl font-black text-[#021D24]">اهتماماتي المفضلة</h2>
                 <span className="material-symbols-rounded text-[#1089A4]">stars</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 {CATEGORIES.map((cat) => (
                   <button 
                     key={cat.id} 
                     disabled={!isEditing}
                     onClick={() => toggleInterest(cat.id)}
                     className={cn(
                       "bg-[#F8F9FA] p-6 rounded-2xl border-2 transition-all flex flex-col gap-3 group relative overflow-hidden",
                       isEditing ? "cursor-pointer" : "cursor-default",
                       formData.interests.includes(cat.id) ? "border-[#1089A4] bg-[#1089A4]/5" : "border-transparent"
                     )}
                   >
                      <div className={cn(
                        "w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform",
                        formData.interests.includes(cat.id) && "bg-[#1089A4] text-white"
                      )}>
                         <span className={cn(
                           "material-symbols-rounded text-xl",
                           formData.interests.includes(cat.id) ? "text-white" : "text-[#1089A4]"
                         )}>{cat.icon}</span>
                      </div>
                      <span className="text-xs font-black text-[#021D24]">{cat.name}</span>
                      {formData.interests.includes(cat.id) && (
                        <div className="absolute top-2 left-2 w-2 h-2 bg-[#1089A4] rounded-full" />
                      )}
                   </button>
                 ))}
              </div>
           </div>

           {/* Quick Stats */}
           <div className="space-y-6">
              <div className="bg-[#021D24] rounded-[2.5rem] p-10 text-white space-y-8 relative overflow-hidden">
                 <div className="relative z-10 space-y-2">
                    <h3 className="text-sm font-bold text-white/40">رصيد النقاط</h3>
                    <p className="text-5xl font-black tracking-tighter">1,250 <span className="text-lg text-[#F29124]">نقطة</span></p>
                 </div>
                 <button className="relative z-10 w-full bg-[#1089A4] py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-[#021D24] transition-all">تحويل النقاط لخصومات</button>
                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 blur-3xl rounded-full" />
              </div>

              <div className="bg-white rounded-[2.5rem] p-8 border border-border/5 space-y-6">
                 <h3 className="text-sm font-black text-[#021D24]/40 text-right">الطلبات الأخيرة</h3>
                 <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="flex items-center gap-4 bg-[#F8F9FA] p-4 rounded-xl border border-transparent hover:bg-white hover:border-[#F29124]/20 transition-all cursor-pointer">
                         <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center font-black text-[#1089A4]">#{i}</div>
                         <div className="flex-grow text-right">
                            <p className="text-xs font-black text-[#021D24]">طلب قيد التنفيذ</p>
                            <p className="text-[10px] text-[#021D24]/40 font-bold">12 أبريل - 50,000 SDG</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
