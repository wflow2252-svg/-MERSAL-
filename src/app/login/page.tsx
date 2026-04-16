"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-4 md:p-12 relative overflow-hidden pt-40 md:pt-48 pb-40 font-sans">
      <div className="max-w-[1240px] w-full bg-white rounded-[3rem] md:rounded-[5rem] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.1)] overflow-hidden lg:grid lg:grid-cols-2 border border-border/5 relative z-10 isolate my-16">
        
        {/* 1. Visual Brand Side - Reinforced Stability */}
        <div className="bg-[#021D24] p-10 md:p-16 lg:p-28 relative overflow-hidden flex flex-col justify-center min-h-[350px] md:min-h-[500px] lg:min-h-[750px] z-[1]">
           <div className="relative z-[20] space-y-10 md:space-y-14 text-right">
              <Link href="/" className="inline-block">
                 <div className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-[2rem] p-4 shadow-2xl">
                    <Image src="/logo.jpg" alt="Logo" width={110} height={110} className="object-contain w-full h-full" />
                 </div>
              </Link>
              <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-black text-white tracking-tighter leading-[1.05] font-heading">
                مـرحـباً بـك <br /> فـي <span className="text-[#1089A4]">مـرسـال</span>
              </h1>
              <p className="text-white/40 text-[12px] md:text-sm lg:text-xl font-black uppercase max-w-[320px] md:max-w-md leading-relaxed pr-8 border-r-8 border-[#F29124] tracking-widest">
                انضم لأكبر منصة تجارية في السودان، وابدأ رحلة تسوق استثنائية اليوم.
              </p>
           </div>

           {/* Restored Verified Avatars */}
           <div className="relative z-10 flex items-center gap-8 justify-end pt-16 md:pt-24 lg:pt-32">
              <span className="text-white/30 text-[11px] font-black uppercase tracking-[0.3em]">نخبة الموردين والعملاء</span>
              <div className="flex -space-x-4 h-12 md:h-16">
                 {[
                   "7YVZYZeITc8", // Verified Man
                   "QXevDflbl8A", // Verified Woman
                   "_tcJW4nqVtw"  // Verified Man 2
                 ].map((id, i) => (
                   <div key={i} className="w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-[#021D24] bg-muted overflow-hidden relative shadow-2xl hover:scale-110 transition-transform">
                      <Image src={`https://images.unsplash.com/photo-${id}?w=200&h=200&fit=crop&q=80`} alt="Active Member" fill className="object-cover" />
                   </div>
                 ))}
              </div>
           </div>

           {/* Decorative Background Assets */}
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1089A4]/15 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
           <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-[#F29124]/10 blur-[150px] rounded-full pointer-events-none" />
        </div>

        {/* 2. Form Side - Spacious & Elegant */}
        <div className="p-8 md:p-16 lg:p-28 flex flex-col justify-center text-right bg-white relative z-[1]">
           <AnimatePresence mode="wait">
              <motion.div 
                key={isLogin ? "login" : "signup"}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-12 md:space-y-20"
              >
                 <div className="space-y-4 md:space-y-8">
                    <h2 className="text-4xl md:text-6xl font-black text-[#021D24] tracking-tighter font-heading leading-none">{isLogin ? "تسجيل الدخول" : "إنشاء حساب"}</h2>
                    <p className="text-[#021D24]/40 text-base md:text-lg font-bold tracking-wide">أدخل بياناتك للمتابعة في عالم مرسال</p>
                 </div>

                 <form className="space-y-8 md:space-y-12" onSubmit={(e) => e.preventDefault()}>
                    {!isLogin && (
                      <div className="space-y-4 group text-right">
                         <label className="text-[11px] md:text-[12px] font-black uppercase tracking-[0.3em] text-[#021D24]/40 group-focus-within:text-[#1089A4] transition-colors">الاسـم الكامل</label>
                         <div className="relative">
                            <span className="material-symbols-rounded absolute right-8 top-1/2 -translate-y-1/2 text-[#021D24]/20 group-focus-within:text-[#1089A4] transition-all text-3xl">person</span>
                            <input type="text" placeholder="أدخل اسمك بالكامل" className="w-full bg-[#F8F9FA] pr-20 pl-8 py-7 md:py-10 rounded-3xl md:rounded-[2.5rem] border-4 border-transparent focus:border-[#1089A4]/10 outline-none font-bold text-lg md:text-xl placeholder:text-[#021D24]/10 transition-all shadow-sm" />
                         </div>
                      </div>
                    )}

                    <div className="space-y-4 group text-right">
                       <label className="text-[11px] md:text-[12px] font-black uppercase tracking-[0.3em] text-[#021D24]/40 group-focus-within:text-[#1089A4] transition-colors">البريد الإلكتروني</label>
                       <div className="relative">
                          <span className="material-symbols-rounded absolute right-8 top-1/2 -translate-y-1/2 text-[#021D24]/20 group-focus-within:text-[#1089A4] transition-all text-3xl">mail</span>
                          <input type="text" placeholder="example@mersal.com" className="w-full bg-[#F8F9FA] pr-20 pl-8 py-7 md:py-10 rounded-3xl md:rounded-[2.5rem] border-4 border-transparent focus:border-[#1089A4]/10 outline-none font-bold text-lg md:text-xl placeholder:text-[#021D24]/10 transition-all shadow-sm" />
                       </div>
                    </div>

                    <div className="space-y-4 group text-right">
                       <label className="text-[11px] md:text-[12px] font-black uppercase tracking-[0.3em] text-[#021D24]/40 group-focus-within:text-[#1089A4] transition-colors">كلمة السر</label>
                       <div className="relative">
                          <span className="material-symbols-rounded absolute right-8 top-1/2 -translate-y-1/2 text-[#021D24]/20 group-focus-within:text-[#1089A4] transition-all text-3xl">lock</span>
                          <input type="password" placeholder="••••••••" className="w-full bg-[#F8F9FA] pr-20 pl-8 py-7 md:py-10 rounded-3xl md:rounded-[2.5rem] border-4 border-transparent focus:border-[#1089A4]/10 outline-none font-bold text-lg md:text-xl placeholder:text-[#021D24]/10 transition-all shadow-sm" />
                       </div>
                       {isLogin && (
                         <div className="flex justify-start pt-2">
                            <button className="text-[11px] md:text-[12px] font-black uppercase tracking-[0.2em] text-[#1089A4] hover:text-[#021D24] transition-all border-b-2 border-transparent hover:border-[#F29124]">نسيت كلمة المرور؟</button>
                         </div>
                       )}
                    </div>

                    {/* Massive Beefy Button v2 */}
                    <button className="w-full bg-[#1089A4] text-white py-8 md:py-12 rounded-3xl md:rounded-[3rem] font-black text-sm md:text-2xl uppercase tracking-[0.5em] shadow-[0_30px_60px_-15px_rgba(16,137,164,0.5)] hover:bg-[#021D24] transition-all active:scale-[0.98] border-b-[12px] border-black/20 group relative overflow-hidden">
                       <span className="relative z-10">{isLogin ? "دخول فوري" : "إنشاء حساب"}</span>
                       <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </button>
                 </form>

                 <div className="space-y-10 md:space-y-16">
                    <div className="relative flex items-center justify-center">
                       <div className="absolute inset-0 flex items-center"><div className="w-full border-t-2 border-border/40"></div></div>
                       <span className="relative bg-white px-10 text-[11px] md:text-[12px] font-black uppercase tracking-[0.4em] text-[#021D24]/30">خـيـارات السـرعة</span>
                    </div>

                    {/* Massive Social Button */}
                    <button 
                       onClick={() => signIn('google')}
                       className="w-full flex items-center justify-center gap-8 bg-[#F8F9FA] py-8 md:py-12 rounded-3xl md:rounded-[3rem] border-4 border-border/10 hover:border-[#1089A4]/20 transition-all text-xs md:text-xl font-black uppercase tracking-[0.3em] group shadow-sm hover:shadow-2xl"
                    >
                       <Image src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={32} height={32} className="md:w-10 md:h-10" /> الدخول عبر جوجل
                    </button>

                    <p className="text-center text-base md:text-xl font-bold text-[#021D24]/40">
                       {isLogin ? "لا تملك حساباً؟" : "هل تملك حساباً؟"}
                       <button 
                         onClick={() => setIsLogin(!isLogin)} 
                         className="mr-3 text-[#F29124] font-black border-b-4 border-transparent hover:border-[#F29124] transition-all"
                       >
                          {isLogin ? "إنضم لعائلتنا" : "تسجيل الدخول"}
                       </button>
                    </p>
                 </div>
              </motion.div>
           </AnimatePresence>
        </div>
      </div>

      {/* Extreme Background Blur Tier 2 */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none overflow-hidden">
         <div className="absolute -top-[15%] -right-[15%] w-[60%] h-[60%] bg-[#1089A4] blur-[250px] rounded-full" />
         <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] bg-[#F29124] blur-[350px] rounded-full" />
      </div>
    </div>
  );
}
