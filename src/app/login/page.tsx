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
    <div className="min-h-screen bg-[#F8FBFB] flex items-center justify-center p-4 md:p-8 lg:p-12 pt-28 md:pt-32 pb-16">
      <div className="max-w-[1100px] w-full bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-2xl overflow-hidden flex flex-col lg:grid lg:grid-cols-2 border border-border/50">
        
        {/* Visual Brand Side - Stable Grid Child */}
         <div className="bg-[#021D24] p-10 md:p-16 flex flex-col justify-between relative overflow-hidden min-h-[350px] lg:min-h-full">
           <div className="relative z-10 space-y-6 md:space-y-8 text-right">
              <Link href="/" className="inline-block">
                 <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl p-2.5 shadow-2xl">
                    <Image src="/logo.jpg" alt="Logo" width={64} height={64} className="object-contain" />
                 </div>
              </Link>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.1] font-heading">
                مـرحـباً بـك <br /> فـي <span className="text-[#1089A4]">مـرسـال</span>
              </h1>
              <p className="text-white/50 text-[13px] md:text-base font-medium max-w-[320px] leading-relaxed pr-5 border-r-4 border-[#F29124]">
                انضم لأكبر منصة تجارية في السودان، وابدأ رحلة تسوق استثنائية اليوم.
              </p>
           </div>

           <div className="relative z-10 flex items-center gap-5 justify-end mt-12 lg:mt-0">
              <span className="text-white/20 text-[10px] font-black uppercase tracking-widest">+50K مستخدم نشط</span>
              <div className="flex -space-x-3">
                 {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#021D24] bg-[#1089A4]/10 overflow-hidden relative">
                       <Image src={`https://images.unsplash.com/photo-${1500000000000 + i * 100000}?auto=format&fit=crop&q=80&w=100`} alt="User" fill className="object-cover" />
                    </div>
                 ))}
              </div>
           </div>

           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#1089A4]/15 blur-[120px] rounded-full" />
           <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-[#F29124]/5 blur-[100px] rounded-full" />
        </div>

        {/* Form Side - Stable Grid Child */}
        <div className="p-8 md:p-16 lg:p-20 flex flex-col justify-center text-right bg-white">
           <AnimatePresence mode="wait">
              <motion.div 
                key={isLogin ? "login" : "signup"}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8 md:space-y-12"
              >
                 <div className="space-y-2 md:space-y-4">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#021D24] tracking-tight font-heading">{isLogin ? "تسجيل الدخول" : "إنشاء حساب جديد"}</h2>
                    <p className="text-[#021D24]/60 text-xs md:text-sm font-medium">أدخل بياناتك للمتابعة في منصة مرسال</p>
                 </div>

                 <form className="space-y-6 md:space-y-8" onSubmit={(e) => e.preventDefault()}>
                    {!isLogin && (
                      <div className="space-y-2 md:space-y-3 group">
                         <label className="text-[10px] pr-2 font-black uppercase tracking-[0.2em] text-[#021D24]/60 group-focus-within:text-[#1089A4] transition-colors">الاسم الكامل</label>
                         <div className="relative">
                            <span className="material-symbols-rounded absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-[#021D24]/20 group-focus-within:text-[#1089A4] transition-all">person</span>
                            <input type="text" placeholder="أدخل اسمك بالكامل" className="w-full bg-[#F8F9FA] pr-12 md:pr-14 pl-4 md:pl-6 py-4 md:py-6 rounded-xl md:rounded-2xl border-2 border-transparent focus:border-[#1089A4]/20 outline-none font-bold text-sm md:text-base placeholder:text-[#021D24]/20 transition-all shadow-sm" />
                         </div>
                      </div>
                    )}

                    <div className="space-y-2 md:space-y-3 group">
                       <label className="text-[10px] pr-2 font-black uppercase tracking-[0.2em] text-[#021D24]/60 group-focus-within:text-[#1089A4] transition-colors">البريد الإلكتروني أو الهاتف</label>
                       <div className="relative">
                          <span className="material-symbols-rounded absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-[#021D24]/20 group-focus-within:text-[#1089A4] transition-all">mail</span>
                          <input type="text" placeholder="example@mersal.com" className="w-full bg-[#F8F9FA] pr-12 md:pr-14 pl-4 md:pl-6 py-4 md:py-6 rounded-xl md:rounded-2xl border-2 border-transparent focus:border-[#1089A4]/20 outline-none font-bold text-sm md:text-base placeholder:text-[#021D24]/20 transition-all shadow-sm" />
                       </div>
                    </div>

                    <div className="space-y-2 md:space-y-3 group">
                       <label className="text-[10px] pr-2 font-black uppercase tracking-[0.2em] text-[#021D24]/60 group-focus-within:text-[#1089A4] transition-colors">كلمة المرور</label>
                       <div className="relative">
                          <span className="material-symbols-rounded absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-[#021D24]/20 group-focus-within:text-[#1089A4] transition-all">lock</span>
                          <input type="password" placeholder="••••••••" className="w-full bg-[#F8F9FA] pr-12 md:pr-14 pl-4 md:pl-6 py-4 md:py-6 rounded-xl md:rounded-2xl border-2 border-transparent focus:border-[#1089A4]/20 outline-none font-bold text-sm md:text-base placeholder:text-[#021D24]/20 transition-all shadow-sm" />
                       </div>
                       {isLogin && (
                         <div className="flex justify-start pr-2 pt-1 md:pt-2">
                            <button className="text-[10px] md:text-xs font-black tracking-widest text-[#1089A4] hover:text-[#021D24] transition-all">نسيت كلمة المرور؟</button>
                         </div>
                       )}
                    </div>

                    <button className="w-full bg-[#1089A4] text-white py-5 md:py-7 rounded-xl md:rounded-2xl font-black text-xs md:text-sm uppercase tracking-[0.4em] shadow-xl shadow-[#1089A4]/20 hover:bg-[#021D24] hover:-translate-y-1 md:hover:-translate-y-2 transition-all active:scale-95 border-b-4 md:border-b-6 border-black/10 mt-4 md:mt-2">
                       {isLogin ? "دخول للمنصة" : "إنضم الآن"}
                    </button>
                 </form>

                 <div className="space-y-8">
                    <div className="relative flex items-center justify-center">
                       <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/60"></div></div>
                       <span className="relative bg-white px-6 text-[10px] font-black uppercase tracking-widest text-[#021D24]/20">أو عبر التواصل</span>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                       <button 
                         onClick={() => signIn('google')}
                         className="w-full max-w-sm mx-auto flex items-center justify-center gap-3 md:gap-4 bg-[#F8F9FA] py-4 md:py-6 rounded-xl md:rounded-2xl border-2 border-[#1089A4]/10 hover:border-[#1089A4]/30 transition-all text-xs font-black uppercase tracking-[0.2em] hover:bg-white hover:shadow-xl group"
                       >
                          <Image src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} height={20} className="md:w-[24px] md:h-[24px]" /> الدخول عبر جوجل
                       </button>
                    </div>

                    <p className="text-center text-sm font-medium text-[#021D24]/40">
                       {isLogin ? "ليس لديك حساب؟" : "لديك حساب بالفعل؟"}
                       <button 
                         onClick={() => setIsLogin(!isLogin)} 
                         className="mr-2 text-[#F29124] font-black border-b-2 border-transparent hover:border-[#F29124] tracking-tight"
                       >
                          {isLogin ? "أنشئ حسابك الآن" : "تسجيل الدخول"}
                       </button>
                    </p>
                 </div>
              </motion.div>
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
