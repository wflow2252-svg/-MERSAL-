"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ── Background Animation Components ──
const FloatingOrb = ({ className, delay = 0 }: { className: string; delay?: number }) => (
  <motion.div
    initial={{ x: 0, y: 0 }}
    animate={{ 
      x: [0, 100, -50, 0], 
      y: [0, -80, 120, 0],
      scale: [1, 1.2, 0.9, 1]
    }}
    transition={{ 
      duration: 20, 
      repeat: Infinity, 
      ease: "linear",
      delay 
    }}
    className={cn("absolute rounded-full blur-[120px] opacity-20 pointer-events-none", className)}
  />
);

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const result = await signIn("credentials", { email, password, redirect: false });
        if (result?.error) setError("بيانات الدخول غير صحيحة");
        else { router.push("/"); router.refresh(); }
      } else {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name }),
        });
        const data = await res.json();
        if (!res.ok) setError(data.error || "فشل تسجيل الحساب");
        else await signIn("credentials", { email, password, callbackUrl: "/" });
      }
    } catch (err) {
      setError("حدث خطأ تقني. حاول مرة أخرى.");
    } finally { setLoading(false); }
  };

  const formVariants = {
    initial: { opacity: 0, x: isLogin ? 50 : -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: isLogin ? -50 : 50 }
  };

  return (
    <div className="min-h-screen bg-[#01090C] flex items-center justify-center p-4 md:p-10 relative overflow-hidden font-sans rtl" dir="rtl">
      
      {/* ── Immersive Background ── */}
      <div className="absolute inset-0 z-0">
        <FloatingOrb className="w-[600px] h-[600px] bg-primary top-[-10%] right-[-10%]" />
        <FloatingOrb className="w-[500px] h-[500px] bg-secondary bottom-[-10%] left-[-10%]" delay={5} />
        <FloatingOrb className="w-[400px] h-[400px] bg-[#1089A4] top-[40%] left-[20%] opacity-10" delay={2} />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] bg-white/5 backdrop-blur-3xl border border-white/10 relative z-10"
      >
        
        {/* ── Elite Sidebar (Dynamic) ── */}
        <div className="bg-[#021D24] p-12 md:p-20 hidden lg:flex flex-col justify-between relative overflow-hidden order-2">
           <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-transparent to-transparent z-0" />
           
           <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative z-10"
           >
              <Link href="/" className="inline-flex items-center gap-5 group">
                <div className="w-16 h-16 bg-white rounded-[1.5rem] p-3 flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-transform duration-500">
                   <Image src="/logo.jpg" alt="Logo" width={60} height={60} className="object-contain" />
                </div>
                <div className="flex flex-col">
                   <span className="text-2xl font-black text-white uppercase tracking-tighter">Morsall</span>
                   <span className="text-[10px] text-[#F29124] font-black uppercase tracking-[0.5em] mt-1">Elite Standard</span>
                </div>
              </Link>
           </motion.div>

           <div className="relative z-10 space-y-10">
              <motion.h2 
                key={isLogin ? "login-title" : "signup-title"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter font-heading italic"
              >
                {isLogin ? "عُــدت إلى" : "انـضم إلى"} <br /> 
                عالم <span className="text-[#F29124] relative">
                  السيادة
                  <motion.span 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    className="absolute bottom-0 left-0 h-2 bg-[#F29124]/30 rounded-full"
                  />
                </span>
              </h2 >
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-white/40 text-[14px] font-bold max-w-[320px] leading-relaxed"
              >
                 {isLogin ? 
                    "متجر مرسال يرحب بك مجدداً في المساحة النخبوية للتسوق الذكي والتجارة الاحترافية." : 
                    "ابدأ رحلتك اليوم في أكبر منصة تجارة نخبويـة في السودان، حيث تجتمع الفخامة والجودة."
                 }
              </p>
           </div>

           <div className="relative z-10 flex items-center gap-10">
              <div className="flex flex-col">
                 <span className="text-3xl font-black text-white">2.4k+</span>
                 <span className="text-[10px] text-white/20 font-black uppercase tracking-widest">مستخدم نشط</span>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em]">
                 © 2024 MERSAL CORE
              </div>
           </div>
        </div>

        {/* ── Auth Content Area (Glass) ── */}
        <div className="p-8 md:p-16 lg:p-24 flex flex-col justify-center bg-white/95 relative z-10 order-1">
            <AnimatePresence mode="wait">
              <motion.div 
                key={isLogin ? "login" : "signup"}
                variants={formVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4, ease: "circOut" }}
                className="w-full"
              >
                <div className="mb-14 text-right">
                   <h1 className="text-4xl lg:text-5xl font-black text-[#021D24] font-heading tracking-tighter mb-3">
                      {isLogin ? "تسجيل الدخول" : "إنشاء حساب"}
                   </h1>
                   <p className="text-[#1089A4] text-[11px] font-black uppercase tracking-[0.2em]">
                      {isLogin ? "سـيادة الـتجارة وتـميز الـتسوق" : "كـن جـزءاً مـن الـنخبة الـتجارية"}
                   </p>
                </div>

                {error && (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-red-50 text-red-600 text-[11px] font-black uppercase tracking-widest p-6 rounded-[2rem] border border-red-100 mb-10 flex items-center gap-4"
                  >
                     <span className="material-symbols-rounded bg-red-600 text-white p-1 rounded-lg text-sm">priority_high</span> {error}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                   {!isLogin && (
                     <div className="space-y-3 group">
                        <label className="text-[10px] font-black text-primary/30 uppercase tracking-[0.3em] pr-4 transition-colors group-focus-within:text-[#1089A4]">الاسم الكامل</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} required type="text" placeholder="أدخل اسمك" className="luxury-input" />
                     </div>
                   )}
                   <div className="space-y-3 group">
                      <label className="text-[10px] font-black text-primary/30 uppercase tracking-[0.3em] pr-4 transition-colors group-focus-within:text-[#1089A4]">البريد الإلكتروني</label>
                      <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="example@domain.com" className="luxury-input" />
                   </div>
                   <div className="space-y-3 group">
                      <div className="flex justify-between items-center pr-4">
                         <label className="text-[10px] font-black text-primary/30 uppercase tracking-[0.3em] transition-colors group-focus-within:text-[#1089A4]">كلمة المرور</label>
                         {isLogin && <button type="button" className="text-[9px] font-black text-[#1089A4] hover:underline uppercase tracking-widest">نسيت الكلمة؟</button>}
                      </div>
                      <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="••••••••" className="luxury-input" />
                   </div>

                   <button disabled={loading} type="submit" className="w-full btn-premium py-7 font-black tracking-[0.6em] mt-6 relative overflow-hidden group">
                      <span className="relative z-10">{loading ? "جاري الـتحـقق..." : (isLogin ? "دخول للـسيـادة" : "تـفعيل الـحساب")}</span>
                      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[45deg]" />
                   </button>
                </form>

                <div className="relative my-12">
                   <div className="absolute inset-0 flex items-center px-10 md:px-20"><div className="w-full border-t border-[#021D24]/5"></div></div>
                   <span className="relative bg-white px-8 text-[10px] font-black text-primary/15 uppercase tracking-[0.4em] block mx-auto w-max italic">أو الـمـتابعة عـبـر</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <button 
                     type="button"
                     onClick={() => signIn("google", { callbackUrl: "/" })}
                     className="w-full py-5 border border-border/10 rounded-2xl flex items-center justify-center gap-4 hover:bg-muted transition-all text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/5 group"
                   >
                      <Image src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} height={20} className="group-hover:rotate-12 transition-transform" /> بريد جوجل
                   </button>
                   <button 
                     type="button"
                     className="w-full py-5 bg-[#021D24] text-white rounded-2xl flex items-center justify-center gap-4 hover:bg-black transition-all text-[10px] font-black uppercase tracking-widest shadow-xl"
                   >
                      <span className="material-symbols-rounded text-lg">apple</span> آيفون
                   </button>
                </div>

                <p className="text-center text-[10px] font-black mt-16 text-primary/40 uppercase tracking-[0.3em]">
                   {isLogin ? "ليس لديك حساب؟" : "لديك حساب بالفعل؟"}
                   <button onClick={() => setIsLogin(!isLogin)} className="mr-4 text-[#1089A4] hover:text-[#F29124] underline transition-colors">
                      {isLogin ? "أنشئ حسابك الآن" : "سجل دخولك"}
                   </button>
                </p>
              </motion.div>
            </AnimatePresence>
        </div>

      </motion.div>

      {/* ── Global Styles ── */}
      <style jsx global>{`
        .luxury-input {
          width: 100%;
          padding: 1.5rem 1.5rem;
          background: #F8F9FA;
          border: 2px solid transparent;
          border-radius: 1.5rem;
          font-weight: 900;
          font-size: 0.875rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          color: #021D24;
          text-align: right;
        }
        .luxury-input:focus {
          background: white;
          border-color: #1089A4;
          box-shadow: 0 20px 40px rgba(16, 137, 164, 0.1);
          outline: none;
        }
        .btn-premium {
          background: #021D24;
          color: white;
          border-radius: 1.5rem;
          text-transform: uppercase;
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 15px 30px rgba(2, 29, 36, 0.2);
        }
        .btn-premium:hover {
          background: #1089A4;
          transform: translateY(-5px);
          box-shadow: 0 25px 50px rgba(16, 137, 164, 0.2);
        }
        .btn-premium:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
