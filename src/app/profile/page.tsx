"use client"

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  const toggleInterest = (id: string) => {
    if (!isEditing) return;
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(id) 
        ? prev.interests.filter(i => i !== id) 
        : [...prev.interests, id]
    }));
  };

  if (status === "loading") return (
    <div className="min-h-screen flex items-center justify-center bg-[#01090C]">
       <motion.div 
         animate={{ rotate: 360 }}
         transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
         className="w-16 h-16 border-4 border-[#1089A4] border-t-transparent rounded-full"
       />
    </div>
  );

  if (!session) {
    return (
      <div className="min-h-screen pt-40 flex flex-col items-center justify-center gap-12 bg-[#01090C] px-6 text-center">
         <motion.div 
           initial={{ scale: 0 }} animate={{ scale: 1 }}
           className="w-40 h-40 bg-white/5 rounded-full flex items-center justify-center border-2 border-white/10 shadow-2xl relative"
         >
            <span className="material-symbols-rounded text-[#1089A4] text-7xl">security</span>
            <div className="absolute inset-0 rounded-full border-4 border-[#1089A4]/20 animate-ping" />
         </motion.div>
         <div className="space-y-4">
            <h1 className="text-5xl font-black text-white tracking-tighter italic">بـوابة الـسـيادة مـغـلـقـة</h1>
            <p className="text-white/40 font-bold max-w-sm mx-auto">الرداء الأحمر للنخبة لا يُمنح إلا لمن يملك مفاتيح العبور السيادية.</p>
         </div>
         <Link href="/login" className="px-16 py-7 rounded-[2.5rem] bg-[#1089A4] text-white font-black uppercase tracking-[0.4em] shadow-2xl hover:bg-secondary transition-all">
           إظـهار الـهويـة
         </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#010103] pt-32 pb-32 px-4 md:px-12 relative overflow-hidden font-sans rtl selection:bg-secondary selection:text-white" dir="rtl">
      
      {/* Mesh Ambience */}
      <div className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-primary/10 blur-[200px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-secondary/5 blur-[150px] rounded-full pointer-events-none" />

      <motion.div 
        initial="hidden" animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
        }}
        className="max-w-7xl mx-auto space-y-12 relative z-10"
      >
        
        {/* ── Sovereign ID Card ── */}
        <motion.div 
           variants={{ hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
           className="w-full relative bg-white/5 backdrop-blur-3xl rounded-[4rem] p-12 md:p-20 shadow-[0_80px_160px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden"
        >
           <div className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-[#1089A4]/20 to-transparent" />
           <div className="flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
              
              <div className="flex flex-col md:flex-row items-center gap-12 text-center md:text-right">
                 <motion.div 
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="relative shrink-0"
                 >
                    <div className="w-56 h-56 rounded-full border-[12px] border-white/10 shadow-2xl overflow-hidden relative z-20">
                       <Image src={session.user?.image || "/logo.jpg"} alt={session.user?.name || ""} fill className="object-cover" />
                    </div>
                    <div className="absolute -bottom-4 right-1/2 translate-x-1/2 md:translate-x-0 md:right-0 bg-secondary text-white p-5 rounded-3xl shadow-2xl z-30 border-4 border-[#010103]">
                       <span className="material-symbols-rounded text-3xl">workspace_premium</span>
                    </div>
                    <div className="absolute inset-0 bg-[#1089A4]/30 rounded-full blur-[60px] -z-10 animate-pulse" />
                 </motion.div>

                 <div className="space-y-6">
                    <div className="inline-flex items-center gap-3 bg-[#1089A4]/10 px-6 py-2 rounded-full border border-[#1089A4]/20 text-[10px] font-black text-[#1089A4] uppercase tracking-[0.5em]">
                       <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" /> حـساب نـخـبوي مـوثـق
                    </div>
                    <div>
                       {isEditing ? (
                         <input 
                           value={formData.name}
                           onChange={(e) => setFormData({...formData, name: e.target.value})}
                           className="text-4xl md:text-7xl font-black text-white tracking-tighter bg-white/5 border-2 border-white/10 rounded-3xl px-8 py-4 outline-none focus:border-[#1089A4] transition-all"
                         />
                       ) : (
                         <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none italic uppercase">
                           {session.user?.name}
                         </h1>
                       )}
                       <p className="text-lg font-bold text-white/30 uppercase tracking-[0.5em] mt-4 block">{session.user?.email}</p>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col items-center lg:items-end gap-8">
                 <div className="flex gap-4">
                    <div className="bg-white/5 px-10 py-6 rounded-3xl border border-white/10 text-center min-w-[140px]">
                       <span className="block text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-2">رتبة النخبة</span>
                       <span className="text-xl font-black text-white">بـلاتيني</span>
                    </div>
                    <div className="bg-white/5 px-10 py-6 rounded-3xl border border-white/10 text-center min-w-[140px]">
                       <span className="block text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-2">نقاط السيادة</span>
                       <span className="text-xl font-black text-[#F29124]">2,450</span>
                    </div>
                 </div>
                 <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div initial={{ width: 0 }} animate={{ width: "75%" }} className="h-full bg-gradient-to-r from-[#1089A4] to-secondary" />
                 </div>
              </div>

           </div>
        </motion.div>

        {/* ── Dashboard Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Identity Coordinates */}
            <motion.div 
               variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
               className="lg:col-span-2 bg-white/5 backdrop-blur-3xl rounded-[3.5rem] p-12 md:p-16 border border-white/10 shadow-3xl space-y-12"
            >
               <div className="flex items-center gap-6 border-b border-white/5 pb-10">
                  <div className="w-16 h-16 bg-[#1089A4] rounded-2xl flex items-center justify-center shadow-elite-xl">
                     <span className="material-symbols-rounded text-white text-3xl">fingerprint</span>
                  </div>
                  <div>
                     <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">إحداثيات السيادة</h2>
                     <p className="text-xs text-white/30 font-bold uppercase tracking-[0.2em] mt-1">تـشفير الـبيانات الـشـخصـيـة</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4 group">
                     <label className="text-[11px] font-black text-white/20 uppercase tracking-[0.5em] pr-6 transition-colors group-focus-within:text-[#1089A4]">الـعـمر الـمـعـتمـد</label>
                     {isEditing ? (
                       <input type="number" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} className="dashboard-input" placeholder="00" />
                     ) : (
                       <div className="dashboard-static">{formData.age ? `${formData.age} عاماً` : "لم يحدد"}</div>
                     )}
                  </div>
                  <div className="space-y-4 group">
                     <label className="text-[11px] font-black text-white/20 uppercase tracking-[0.5em] pr-6 transition-colors group-focus-within:text-[#1089A4]">شـفـرة الاتـصـال</label>
                     {isEditing ? (
                       <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="dashboard-input" placeholder="+249..." />
                     ) : (
                       <div className="dashboard-static" dir="ltr">{formData.phone || "— — — — —"}</div>
                     )}
                  </div>
               </div>

               <div className="space-y-8 pt-8">
                  <label className="text-[11px] font-black text-white/20 uppercase tracking-[0.5em] pr-6">الـنـطـاقـات الـمفـضـلة</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                     {CATEGORIES.map(cat => (
                        <button 
                          key={cat.id} 
                          onClick={() => toggleInterest(cat.id)}
                          className={cn(
                            "group p-8 rounded-[2.5rem] border-2 transition-all duration-500 flex flex-col items-center justify-center gap-5 relative overflow-hidden",
                            formData.interests.includes(cat.id) 
                              ? "bg-secondary border-transparent text-white shadow-2xl shadow-secondary/20 scale-[1.05]" 
                              : "bg-white/5 border-white/5 hover:border-[#1089A4]/30",
                            !isEditing && "cursor-default"
                          )}
                        >
                           <span className={cn(
                              "material-symbols-rounded text-4xl transition-all duration-700",
                              formData.interests.includes(cat.id) ? "scale-110 rotate-[15deg]" : "text-white/10 group-hover:text-white/40 group-hover:scale-125"
                           )}>{cat.icon}</span>
                           <span className="text-[12px] font-black uppercase tracking-[0.3em]">{cat.name}</span>
                           {formData.interests.includes(cat.id) && <motion.div layoutId="spark" className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />}
                        </button>
                     ))}
                  </div>
               </div>

               <div className="pt-10 flex gap-4">
                  {isEditing ? (
                    <>
                      <button onClick={handleSave} disabled={isSaving} className="flex-1 bg-secondary text-white py-7 rounded-3xl font-black text-sm uppercase tracking-[0.5em] shadow-2xl hover:bg-[#d67b14] transition-all flex items-center justify-center gap-3">
                         {isSaving ? "جاري الـتحـويل..." : "حـفظ الـتغيـيرات"} <span className="material-symbols-rounded">check_circle</span>
                      </button>
                      <button onClick={() => setIsEditing(false)} className="px-12 bg-white/5 text-white/50 py-7 rounded-3xl font-black text-sm uppercase tracking-[0.5em] border border-white/5 hover:bg-white/10 transition-all">إلغاء</button>
                    </>
                  ) : (
                    <button onClick={() => setIsEditing(true)} className="w-full bg-[#1089A4] text-white py-7 rounded-3xl font-black text-sm uppercase tracking-[0.5em] shadow-xl hover:shadow-[#1089A4]/20 transition-all flex items-center justify-center gap-3 group">
                       تـعديل الـمعـلومات <span className="material-symbols-rounded transition-transform group-hover:rotate-45">edit_square</span>
                    </button>
                  )}
               </div>
            </motion.div>

            {/* Sidebar Controls */}
            <div className="space-y-12">
               
               {/* Security Card */}
               <motion.div 
                 variants={{ hidden: { x: 30, opacity: 0 }, visible: { x: 0, opacity: 1 } }}
                 className="bg-white/5 backdrop-blur-3xl rounded-[3rem] p-12 border border-white/10 space-y-8"
               >
                  <div className="flex items-center gap-4">
                     <span className="material-symbols-rounded text-[#1089A4] text-3xl">verified_user</span>
                     <h3 className="text-xl font-black text-white italic">الأمان السيادي</h3>
                  </div>
                  <div className="space-y-4">
                     <div className="p-5 bg-white/5 rounded-2xl flex items-center justify-between border border-white/5">
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">المصادقة الثنائية</span>
                        <span className="bg-green-500/20 text-green-500 px-3 py-1 rounded-full text-[9px] font-black uppercase">نـشط</span>
                     </div>
                     <div className="p-5 bg-white/5 rounded-2xl flex items-center justify-between border border-white/5">
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">تـشفير الجلسة</span>
                        <span className="bg-[#1089A4]/20 text-[#1089A4] px-3 py-1 rounded-full text-[9px] font-black uppercase">AES-256</span>
                     </div>
                  </div>
               </motion.div>

               {/* Danger Zone */}
               <motion.div 
                 variants={{ hidden: { x: 30, opacity: 0 }, visible: { x: 0, opacity: 1 } }}
                 className="bg-red-500/5 rounded-[3rem] p-12 border border-red-500/20 space-y-8 relative overflow-hidden group"
               >
                  <div className="absolute top-0 right-0 w-2 h-full bg-red-500 opacity-20" />
                  <div className="flex items-center gap-4">
                     <span className="material-symbols-rounded text-red-500 text-3xl">dangerous</span>
                     <h3 className="text-xl font-black text-red-500 italic">بـروتوكـول الـفناء</h3>
                  </div>
                  <p className="text-[11px] font-bold text-red-500/40 leading-relaxed uppercase tracking-tighter">حـذف الـحساب سـيـؤدي لإلـغاء كـافة الامـتـيازات الـسيادية بشكل نـهائي.</p>
                  
                  {showDeleteConfirm ? (
                    <div className="flex flex-col gap-3">
                       <button onClick={handleDeleteAccount} className="w-full bg-red-600 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl">إلـغاء الـهويـة</button>
                       <button onClick={() => setShowDeleteConfirm(false)} className="w-full bg-white/5 text-white/40 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em]">تراجع</button>
                    </div>
                  ) : (
                    <button onClick={() => setShowDeleteConfirm(true)} className="w-full py-5 border-2 border-red-500/20 text-red-500 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-red-500 hover:text-white transition-all">تـفعيل بـروتوكول الـحـذف</button>
                  )}
               </motion.div>

               {/* Power Actions */}
               <motion.div 
                 variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                 className="pt-4"
               >
                  <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full py-7 rounded-[2.5rem] bg-white text-[#021D24] font-black text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-5 shadow-2xl hover:bg-secondary hover:text-white transition-all group">
                     تـسـجـيل الـخـروج <span className="material-symbols-rounded transition-transform group-hover:-translate-y-1">logout</span>
                  </button>
               </motion.div>

            </div>

        </div>

      </motion.div>

      <style jsx global>{`
        .dashboard-input {
          width: 100%;
          padding: 1.6rem 2rem;
          background: rgba(255,255,255,0.03);
          border: 2px solid rgba(255,255,255,0.05);
          border-radius: 2rem;
          color: white;
          font-weight: 900;
          font-size: 1.1rem;
          text-align: right;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .dashboard-input:focus {
          background: rgba(255,255,255,0.07);
          border-color: #1089A4;
          outline: none;
          box-shadow: 0 0 40px rgba(16, 137, 164, 0.1);
          transform: translateY(-2px);
        }
        .dashboard-static {
          padding: 1.6rem 2rem;
          background: rgba(255,255,255,0.02);
          border: 2px solid rgba(255,255,255,0.03);
          border-radius: 2rem;
          color: white;
          font-size: 1.2rem;
          font-weight: 900;
          text-align: right;
        }
      `}</style>
    </div>
  );
}
