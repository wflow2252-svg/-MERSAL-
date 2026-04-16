"use client"

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const CATEGORIES = [
  { id: "electronics", name: "إلكترونيات", icon: "devices" },
  { id: "fashion", name: "أزياء", icon: "apparel" },
  { id: "home", name: "منزل", icon: "home_remodel" },
  { id: "beauty", name: "جمال", icon: "content_cut" },
  { id: "sports", name: "رياضة", icon: "fitness_center" },
  { id: "kids", name: "أطفال", icon: "child_care" },
];

export default function ProfilePage() {
  const { data: session, update: updateSession, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          age: formData.age,
          phone: formData.phone,
          interests: formData.interests.join(','),
        }),
      });

      if (res.ok) {
        await updateSession({ 
          ...session, 
          user: { 
            ...session?.user, 
            name: formData.name,
            age: parseInt(formData.age),
            phone: formData.phone,
            interests: formData.interests.join(',')
          } 
        });
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await fetch("/api/user/delete", { method: "POST" });
      if (res.ok) {
        signOut({ callbackUrl: "/" });
      }
    } catch (error) {
      console.error("Failed to delete account", error);
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

  if (status === "loading") return <div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

  if (!session) {
    return (
      <div className="min-h-screen pt-40 flex flex-col items-center justify-center gap-8 bg-muted/30">
         <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-elite-lg border border-border/10">
            <span className="material-symbols-rounded text-primary/20 text-5xl">lock</span>
         </div>
         <h1 className="text-3xl font-black text-primary tracking-tighter">يجب تسجيل الدخول أولاً</h1>
         <Link href="/login" className="btn-primary">تسجيل الدخول الآن</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 pt-32 md:pt-44 pb-24 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Profile Card */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-elite-lg border border-border/5 text-right relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
           
           <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="relative">
                 <div className="w-40 h-40 md:w-52 md:h-52 rounded-[2.5rem] overflow-hidden border-8 border-muted shadow-elite-xl">
                    <Image src={session.user?.image || "/logo.jpg"} alt="User" fill className="object-cover" />
                 </div>
                 <div className="absolute -bottom-4 -right-4 bg-secondary text-white p-4 rounded-2xl shadow-elite-lg">
                    <span className="material-symbols-rounded text-xl animate-pulse">check_circle</span>
                 </div>
              </div>

              <div className="flex-grow space-y-6 w-full text-center md:text-right">
                 <div className="space-y-2">
                    <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em] bg-accent/10 px-4 py-1.5 rounded-full inline-block">عضوية النخبة المميزة</span>
                    {isEditing ? (
                      <input 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="text-2xl md:text-5xl font-black text-primary tracking-tighter bg-muted/50 px-6 py-2 rounded-2xl border-2 border-accent/20 focus:border-accent w-full text-center md:text-right outline-none"
                      />
                    ) : (
                      <h1 className="text-3xl md:text-6xl font-black text-primary tracking-tighter leading-none">{session.user?.name}</h1>
                    )}
                    <p className="text-sm font-bold text-primary/30 uppercase tracking-widest">{session.user?.email}</p>
                 </div>

                 <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <div className="flex items-center gap-2 bg-muted/50 px-6 py-3 rounded-2xl border border-border/5">
                       <span className="material-symbols-rounded text-primary/20 text-lg">calendar_today</span>
                       <span className="text-xs font-black text-primary/60">عضو منذ 2024</span>
                    </div>
                    <div className="flex items-center gap-2 bg-muted/50 px-6 py-3 rounded-2xl border border-border/5">
                       <span className="material-symbols-rounded text-primary/20 text-lg">verified_user</span>
                       <span className="text-xs font-black text-primary/60">حساب موثق</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* Details & Interests */}
           <div className="lg:col-span-8 space-y-8">
              
              <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-elite-lg border border-border/5 space-y-10 text-right">
                 <div className="flex items-center justify-between">
                    <h2 className="text-xl font-black text-primary uppercase tracking-widest">المعلومات الأساسية</h2>
                    <span className="material-symbols-rounded text-accent">person_edit</span>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest pr-2">العمر</label>
                       {isEditing ? (
                         <input type="number" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} className="input-field" />
                       ) : (
                         <p className="text-lg font-bold text-primary px-4">{formData.age || "لم يحدد بعد"} عام</p>
                       )}
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest pr-2">رقم الهاتف</label>
                       {isEditing ? (
                         <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="input-field" />
                       ) : (
                         <p className="text-lg font-bold text-primary px-4">{formData.phone || "لم يحدد بعد"}</p>
                       )}
                    </div>
                 </div>

                 <div className="pt-6 border-t border-border/5">
                    <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest block mb-6 pr-2">رغباتي واهتماماتي</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                       {CATEGORIES.map((cat) => (
                         <button 
                           key={cat.id} 
                           disabled={!isEditing}
                           onClick={() => toggleInterest(cat.id)}
                           className={cn(
                             "p-6 rounded-2xl border-2 transition-all flex flex-col gap-3 group relative overflow-hidden",
                             formData.interests.includes(cat.id) ? "bg-primary border-primary text-white shadow-elite-lg" : "bg-muted/30 border-transparent hover:border-primary/20",
                             !isEditing && "opacity-80"
                           )}
                         >
                            <span className={cn(
                              "material-symbols-rounded text-2xl mb-1",
                              formData.interests.includes(cat.id) ? "text-white" : "text-primary/10"
                            )}>{cat.icon}</span>
                            <span className="text-[10px] font-black uppercase tracking-widest">{cat.name}</span>
                         </button>
                       ))}
                    </div>
                 </div>

                 <div className="pt-10 flex gap-4">
                    {isEditing ? (
                      <>
                        <button onClick={handleSave} disabled={isSaving} className="btn-primary flex-grow">
                           {isSaving ? "جاري الحفظ..." : "حفظ المعلومات الآن"}
                        </button>
                        <button onClick={() => setIsEditing(false)} className="px-10 py-6 rounded-2xl bg-muted text-primary/40 font-black text-[10px] uppercase tracking-widest">إلغاء</button>
                      </>
                    ) : (
                      <button onClick={() => setIsEditing(true)} className="btn-primary w-full">تعديل ملفي الشخصي</button>
                    )}
                 </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-red-50/50 rounded-[2rem] p-8 border-2 border-dashed border-red-100 flex flex-col md:flex-row items-center justify-between gap-6">
                 <div className="text-right flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center text-red-500">
                       <span className="material-symbols-rounded text-2xl">heart_broken</span>
                    </div>
                    <div>
                       <h3 className="text-md font-black text-red-600">منطقة الخطر</h3>
                       <p className="text-xs font-bold text-red-400">حذف الحساب سيؤدي لمسح كافة بياناتك وسجلك نهائياً</p>
                    </div>
                 </div>
                 
                 {showDeleteConfirm ? (
                   <div className="flex gap-3">
                      <button onClick={handleDeleteAccount} className="bg-red-600 text-white px-6 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-black transition-all">نعم، احذف نهائياً</button>
                      <button onClick={() => setShowDeleteConfirm(false)} className="bg-white text-primary/40 px-6 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest border border-border/10">تراجع</button>
                   </div>
                 ) : (
                   <button onClick={() => setShowDeleteConfirm(true)} className="text-red-600 border border-red-200 px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">حذف الحساب</button>
                 )}
              </div>
           </div>

           {/* Quick Stats Sidebar */}
           <div className="lg:col-span-4 space-y-8">
              <div className="bg-primary rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-elite-xl">
                 <div className="relative z-10 space-y-6">
                    <span className="text-white/40 text-[9px] font-black uppercase tracking-[0.5em]">رصيد النقاط</span>
                    <p className="text-6xl font-black tracking-tighter leading-none">١,٢٥٠</p>
                    <Link href="/shop" className="w-full bg-secondary text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white hover:text-primary transition-all">استبدل النقاط الآن <span className="material-symbols-rounded text-sm">bolt</span></Link>
                 </div>
                 <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-white/10 blur-[80px] rounded-full" />
              </div>

              <div className="bg-white rounded-[2rem] p-8 border border-border/5 space-y-6 text-right">
                 <h3 className="text-[10px] font-black text-primary/30 uppercase tracking-[0.3em]">الطلبات الأخيرة</h3>
                 <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-muted/50 transition-all border border-transparent hover:border-border/10 group cursor-pointer">
                         <div className="flex-grow">
                            <p className="text-xs font-black text-primary leading-none mb-1">طلب مكتمل</p>
                            <p className="text-[9px] font-bold text-primary/30 uppercase tracking-widest">#M2349-SD</p>
                         </div>
                         <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center text-accent group-hover:bg-primary group-hover:text-white transition-all">
                            <span className="material-symbols-rounded text-xl">package_2</span>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full py-6 rounded-2xl border-2 border-dashed border-border/10 text-primary/20 font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:border-primary/20 hover:text-primary/60 transition-all">
                 <span className="material-symbols-rounded text-lg">logout</span> تسجيل الخروج الآمن
              </button>
           </div>

        </div>

      </div>
    </div>
  );
}
