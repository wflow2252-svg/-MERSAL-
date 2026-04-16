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

  if (status === "loading") return <div className="min-h-screen flex items-center justify-center bg-background"><div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div></div>;

  if (!session) {
    return (
      <div className="min-h-screen pt-40 flex flex-col items-center justify-center gap-8 bg-background relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#038DB120,transparent_50%)]" />
         <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-[0_30px_60px_rgba(3,141,177,0.2)] border-4 border-primary/5 relative z-10">
            <span className="material-symbols-rounded text-primary text-6xl">lock</span>
         </div>
         <h1 className="text-4xl font-black text-primary tracking-tighter relative z-10 text-center">بوابة النخبة مغلقة</h1>
         <p className="text-primary/50 text-sm font-bold max-w-sm text-center relative z-10">الرجاء تسجيل الدخول للوصول إلى لوحة التحكم السيادية الخاصة بك.</p>
         <Link href="/login" className="px-10 py-5 rounded-[2rem] bg-gradient-to-r from-primary to-accent text-white font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-105 transition-all relative z-10">
           تسجيل الدخول الآن
         </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background pt-28 pb-10 px-4 md:px-8 relative overflow-hidden flex flex-col items-center justify-center">
      
      {/* Neo-Luxury Ambience */}
      <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-primary/5 blur-[200px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] left-[-20%] w-[600px] h-[600px] bg-secondary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto space-y-10 relative z-10 flex flex-col items-center justify-center">
        
        {/* Floating Identity Canvas */}
        <div className="w-full relative bg-white/70 backdrop-blur-3xl rounded-[3rem] p-10 md:p-16 shadow-[0_50px_100px_rgba(3,141,177,0.1)] border border-white/50 text-center overflow-visible">
           <div className="absolute top-0 right-0 w-full h-[50%] bg-gradient-to-l from-primary/10 to-transparent rounded-t-[3rem] -z-10" />
           
           <div className="flex flex-col items-center justify-center gap-10 relative w-full">
              <div className="relative group mx-auto">
                 <div className="w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-[12px] border-white shadow-2xl relative z-20 transition-transform duration-500 group-hover:scale-105 mx-auto">
                    <Image src={session.user?.image || "/logo.jpg"} alt="User" fill className="object-cover" />
                 </div>
                 {/* Levitating Badge */}
                 <div className="absolute -bottom-4 right-1/2 translate-x-1/2 bg-gradient-to-br from-secondary to-[#d67b14] text-white p-5 rounded-full shadow-[0_20px_40px_rgba(245,149,37,0.4)] z-30 animate-pulse border-4 border-white">
                    <span className="material-symbols-rounded text-3xl">workspace_premium</span>
                 </div>
                 <div className="absolute inset-0 bg-primary/20 rounded-full blur-[80px] -z-10 group-hover:bg-secondary/40 transition-colors duration-700" />
              </div>

              <div className="flex flex-col items-center justify-center space-y-8 w-full text-center">
                 <div className="space-y-4 flex flex-col items-center w-full">
                    <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full border border-primary/10 shadow-sm">
                       <span className="relative flex h-3 w-3">
                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                         <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                       </span>
                       <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">حساب سيادي موثق</span>
                    </div>
                    {isEditing ? (
                      <input 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="text-3xl md:text-6xl font-black text-primary tracking-tighter bg-white/50 px-8 py-4 rounded-[2rem] border border-primary/20 focus:border-secondary focus:ring-4 focus:ring-secondary/10 w-full text-center outline-none transition-all shadow-inner"
                      />
                    ) : (
                      <h1 className="text-4xl md:text-7xl font-black text-primary tracking-tighter leading-[1.1] font-heading">
                         {session.user?.name}
                      </h1>
                    )}
                    <p className="text-sm font-black text-primary/40 uppercase tracking-widest block">{session.user?.email}</p>
                 </div>

                 <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-[1.5rem] border border-primary/5 shadow-sm hover:-translate-y-1 transition-transform">
                       <span className="material-symbols-rounded text-secondary text-2xl">verified</span>
                       <div className="text-right">
                          <span className="block text-[10px] font-black text-primary/40 uppercase tracking-widest">نوع الحساب</span>
                          <span className="text-xs font-black text-primary">عضوية بلاتينية</span>
                       </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-[1.5rem] border border-primary/5 shadow-sm hover:-translate-y-1 transition-transform">
                       <span className="material-symbols-rounded text-primary/30 text-2xl">calendar_month</span>
                       <div className="text-right">
                          <span className="block text-[10px] font-black text-primary/40 uppercase tracking-widest">تاريخ الانضمام</span>
                          <span className="text-xs font-black text-primary">الموسم الحالي</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* The Control Hub (Centered) */}
        <div className="w-full max-w-4xl mx-auto space-y-10 flex flex-col items-center justify-center">
           
           {/* Primary Configuration */}
           <div className="space-y-10 w-full">
              
              <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-10 md:p-14 shadow-xl shadow-primary/5 border border-white space-y-12 text-center relative overflow-hidden">
                 
                 <div className="flex flex-col items-center justify-center border-b border-primary/5 pb-8 gap-4">
                    <div className="w-16 h-16 bg-primary/5 rounded-[1.5rem] flex items-center justify-center">
                       <span className="material-symbols-rounded text-secondary text-3xl">fingerprint</span>
                    </div>
                    <div>
                       <h2 className="text-2xl font-black text-primary uppercase tracking-tight">إحداثيات الهوية</h2>
                       <p className="text-xs font-bold text-primary/40 mt-2">تحديث بياناتك الشخصية لتعزيز تجربتك</p>
                    </div>
                 </div>

                 <div className="flex flex-col items-center gap-8 w-full">
                    <div className="w-full max-w-sm flex flex-col items-center gap-3">
                       <label className="text-[11px] font-black text-primary/50 uppercase tracking-[0.2em] text-center w-full">العمر المعتمد</label>
                       {isEditing ? (
                         <input type="number" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} className="w-full bg-muted/50 px-8 py-5 rounded-[1.5rem] border border-primary/10 focus:border-primary text-primary font-bold text-lg outline-none text-center transition-all block" placeholder="أدخل عمرك..." />
                       ) : (
                         <div className="w-full bg-white px-8 py-5 rounded-[1.5rem] border border-primary/5 shadow-sm text-center">
                           <p className="text-xl font-black text-primary">{formData.age ? `${formData.age} عاماً` : "غير مسجل"}</p>
                         </div>
                       )}
                    </div>
                    <div className="w-full max-w-sm flex flex-col items-center gap-3">
                       <label className="text-[11px] font-black text-primary/50 uppercase tracking-[0.2em] text-center w-full">رقم الاتصال</label>
                       {isEditing ? (
                         <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-muted/50 px-8 py-5 rounded-[1.5rem] border border-primary/10 focus:border-primary text-primary font-bold text-lg outline-none text-center transition-all block" placeholder="أدخل رقم الهاتف..." />
                       ) : (
                         <div className="w-full bg-white px-8 py-5 rounded-[1.5rem] border border-primary/5 shadow-sm text-center">
                           <p className="text-xl font-black text-primary" dir="ltr">{formData.phone || "غير مسجل"}</p>
                         </div>
                       )}
                    </div>
                 </div>

                 <div className="pt-10 w-full flex flex-col items-center">
                    <label className="text-[11px] font-black text-primary/50 uppercase tracking-[0.2em] text-center block w-full mb-8">النطاق التفضيلي</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5 w-full max-w-2xl">
                       {CATEGORIES.map((cat) => (
                         <button 
                           key={cat.id} 
                           disabled={!isEditing}
                           onClick={() => toggleInterest(cat.id)}
                           className={cn(
                             "px-4 py-8 rounded-[2rem] border-2 transition-all duration-300 flex flex-col items-center justify-center text-center gap-4 group relative overflow-hidden",
                             formData.interests.includes(cat.id) 
                               ? "bg-gradient-to-b from-primary to-accent border-transparent text-white shadow-[0_20px_40px_rgba(3,141,177,0.3)] -translate-y-2" 
                               : "bg-white border-primary/5 hover:border-secondary/30",
                             !isEditing && "opacity-90"
                           )}
                         >
                            <span className={cn(
                              "material-symbols-rounded text-4xl mb-2 transition-transform duration-500",
                              formData.interests.includes(cat.id) ? "text-secondary scale-110" : "text-primary/20",
                              isEditing && !formData.interests.includes(cat.id) && "group-hover:scale-125 group-hover:text-secondary/50"
                            )}>{cat.icon}</span>
                            <span className="text-[12px] font-black uppercase tracking-widest">{cat.name}</span>
                            {/* Selected Indicator */}
                            {formData.interests.includes(cat.id) && (
                               <div className="absolute top-4 right-4 w-3 h-3 bg-secondary rounded-full shadow-[0_0_10px_#F59525]" />
                            )}
                         </button>
                       ))}
                    </div>
                 </div>

                 <div className="pt-16 mt-4 w-full flex flex-col items-center border-t border-primary/5">
                    <div className="w-full max-w-sm flex flex-col gap-4">
                       {isEditing ? (
                         <>
                           <button onClick={handleSave} disabled={isSaving} className="w-full bg-secondary text-white py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(245,149,37,0.3)] hover:scale-[1.02] transition-transform flex items-center justify-center gap-3">
                              {isSaving ? "جاري التشفير..." : "اعتماد الهوية"} <span className="material-symbols-rounded text-xl">done_all</span>
                           </button>
                           <button onClick={() => setIsEditing(false)} className="w-full py-6 rounded-[2rem] bg-white border-2 border-primary/10 text-primary font-black text-sm uppercase tracking-[0.2em] hover:bg-muted transition-colors">إلغاء</button>
                         </>
                       ) : (
                         <button onClick={() => setIsEditing(true)} className="w-full bg-primary text-white py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(3,141,177,0.3)] hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 group">
                            تحديث الرمز <span className="material-symbols-rounded text-xl group-hover:rotate-45 transition-transform">edit_square</span>
                         </button>
                       )}
                    </div>
                 </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-red-50/50 rounded-[3rem] p-10 border border-red-100 flex flex-col items-center justify-center gap-8 relative overflow-hidden group text-center mx-auto max-w-2xl text-center">
                 <div className="absolute top-0 left-0 w-full h-2 bg-red-400 group-hover:h-full group-hover:opacity-5 transition-all duration-700" />
                 
                 <div className="flex flex-col items-center gap-4 relative z-10 w-full justify-center">
                    <div className="w-20 h-20 rounded-[2rem] bg-red-100 flex items-center justify-center text-red-500 shadow-inner flex-none mb-2">
                       <span className="material-symbols-rounded text-4xl">warning</span>
                    </div>
                    <div>
                       <h3 className="text-2xl font-black text-red-600 mb-2">بروتوكول التدمير</h3>
                       <p className="text-sm font-bold text-red-400/80">إلغاء الحساب يمحو كل الرموز والامتيازات بشكل نهائي ولا رجعة فيه.</p>
                    </div>
                 </div>
                 
                 <div className="flex justify-center w-full">
                 {showDeleteConfirm ? (
                   <div className="flex gap-4 relative z-10">
                      <button onClick={handleDeleteAccount} className="bg-red-600 text-white px-8 py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:bg-red-700 transition-all">التدمير النهائي</button>
                      <button onClick={() => setShowDeleteConfirm(false)} className="bg-white text-primary/60 px-8 py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] border border-border/10 shadow-sm">تراجع</button>
                   </div>
                 ) : (
                   <button onClick={() => setShowDeleteConfirm(true)} className="bg-white border border-red-200 text-red-500 px-10 py-5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] hover:bg-red-50 transition-colors shadow-sm relative z-10 flex-none m-auto">
                      إلغاء العضوية
                   </button>
                 )}
                 </div>
              </div>

              {/* Central Logout */}
              <div className="w-full flex justify-center mt-10">
                 <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full max-w-xs py-6 rounded-[2.5rem] bg-white border border-primary/10 text-primary/40 font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:border-red-200 hover:text-red-500 hover:shadow-xl transition-all group">
                    تسجيل الخروج <span className="material-symbols-rounded text-2xl group-hover:-translate-y-1 transition-transform">logout</span>
                 </button>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}

