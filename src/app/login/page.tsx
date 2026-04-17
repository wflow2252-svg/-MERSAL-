"use client"

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

// ── Magnetic Button Component ──
const MagneticButton = ({ children, className, onClick, type = "button", disabled = false }: any) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.3);
    y.set(middleY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={cn("relative", className)}
    >
      {children}
    </motion.button>
  );
};

// ── Typography Reveal Component ──
const RevealText = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const letters = text.split("");
  const container = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.02 * i + delay },
    }),
  } as const;

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, damping: 12, stiffness: 200 },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: { type: "spring" as const, damping: 12, stiffness: 200 },
    },
  };


  return (
    <motion.div
      style={{ display: "flex", overflow: "hidden" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

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

  return (
    <div className="min-h-screen bg-[#01090C] flex items-center justify-center p-4 md:p-10 relative overflow-hidden font-sans rtl selection:bg-secondary selection:text-white" dir="rtl">
      
      {/* ── Immersive Mesh Background ── */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-gradient-to-br from-[#021D24] via-[#01090C] to-[#010D11]" />
         <motion.div 
            animate={{ 
               scale: [1, 1.2, 1],
               rotate: [0, 90, 0],
               x: [0, 100, 0],
               y: [0, 50, 0]
            }} 
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-primary/20 blur-[150px] rounded-full" 
         />
         <motion.div 
            animate={{ 
               scale: [1, 1.3, 1],
               rotate: [0, -45, 0],
               x: [0, -150, 0],
               y: [0, 100, 0]
            }} 
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-30%] left-[-20%] w-[1200px] h-[1200px] bg-secondary/10 blur-[200px] rounded-full" 
         />
         <div className="absolute inset-0 bg-[#01090C]/40 backdrop-blur-[2px]" />
      </div>

      <motion.div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0, scale: 0.9, rotateY: isLogin ? 15 : -15 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 rounded-[2rem] overflow-hidden shadow-[0_80px_160px_rgba(0,0,0,0.8)] bg-white/5 backdrop-blur-3xl border border-white/10 relative z-10 group"
      >
        {/* Dynamic Light Glow (Mouse Follow) */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ 
            background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(16, 137, 164, 0.15), transparent 80%)`,
            // @ts-ignore
            "--mouse-x": useSpring(mouseX, { stiffness: 50, damping: 20 }).get() + "px",
            "--mouse-y": useSpring(mouseY, { stiffness: 50, damping: 20 }).get() + "px"
          }}
        />

        {/* ── Elite Sidebar ── */}
        <div className="bg-[#021D24] p-12 md:p-24 hidden lg:flex flex-col justify-between relative overflow-hidden order-2 border-r border-white/5">
           <div className="absolute inset-0 bg-[#000]/30 z-0" />
           <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 blur-[100px] rounded-full" />
           
           <div className="relative z-10 w-full">
              <Link href="/" className="inline-flex items-center gap-6 group/logo">
                <motion.div 
                   whileHover={{ rotate: 360, scale: 1.1 }}
                   transition={{ duration: 1, ease: "circInOut" }}
                   className="w-20 h-20 bg-white rounded-[1.5rem] p-4 flex items-center justify-center shadow-elite-xl relative"
                >
                   <Image src="/logo.jpg" alt="Logo" width={80} height={80} className="object-contain" />
                   <div className="absolute inset-0 rounded-[2rem] border-2 border-primary/20 animate-pulse" />
                </motion.div>
                <div className="flex flex-col">
                   <RevealText text="MORSALL" className="text-3xl font-black text-white tracking-[-0.05em] h-8" />
                   <motion.span 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                      className="text-[11px] text-[#F29124] font-black uppercase tracking-[0.6em] mt-2 block"
                   >
                     ELITE SOVEREIGNTY
                   </motion.span>
                </div>
              </Link>
           </div>

           <div className="relative z-10 space-y-12">
              <div className="space-y-4">
                 <RevealText 
                    key={isLogin ? "log-title" : "sign-title"}
                    text={isLogin ? "أهـــلاً بـــك" : "كُـــن نُخـبويـاً"} 
                    className="text-6xl md:text-7xl font-black text-white leading-none tracking-tighter italic h-16 md:h-20" 
                 />
                 <RevealText 
                    key={isLogin ? "log-sub" : "sign-sub"}
                    text={isLogin ? "في هرم الفخامة" : "في مرسال النخبة"} 
                    delay={0.5}
                    className="text-4xl font-black text-white/40 italic h-12" 
                 />
              </div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="flex items-center gap-4 bg-white/5 backdrop-blur-md px-8 py-5 rounded-3xl border border-white/10 w-fit"
              >
                 <div className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
                 <p className="text-white/60 text-[13px] font-bold tracking-wide">
                    {isLogin ? "أكثر من 2,400 مورد يعيدون تعريف المستحيل يومياً." : "انضم لنظام بيئي رائد يجمع أرقى العلامات التجارية."}
                 </p>
              </motion.div>
           </div>

           <div className="relative z-10 flex items-end justify-between">
              <div className="flex flex-col">
                 <span className="text-4xl font-black text-white tracking-tighter">99.9%</span>
                 <span className="text-[10px] text-white/20 font-black uppercase tracking-widest mt-1">SLA الموثوقية السيادية</span>
              </div>
              <div className="text-[10px] font-black text-white/10 uppercase tracking-[0.6em]">
                 MERSAL CORE V3.0
              </div>
           </div>
        </div>

        {/* ── Auth Form Area ── */}
        <div className="p-8 md:p-16 lg:p-24 flex flex-col justify-center bg-white relative z-10 order-1">
            <AnimatePresence mode="wait">
              <motion.div 
                key={isLogin ? "login" : "signup"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <div className="mb-8 md:mb-12 text-right">
                   <h1 className="text-3xl md:text-4xl font-black text-[#021D24] font-heading tracking-tighter mb-2 md:mb-3">
                      {isLogin ? "تسجيل الدخول" : "إنشاء حساب جديد"}
                   </h1>
                   <div className="h-1 w-16 md:w-20 bg-[#1089A4] rounded-full mb-2 md:mb-3" />
                   <p className="text-[#1089A4] text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em]">
                      {isLogin ? "بوابة النفوذ والسيطرة التجارية" : "مفتاح العبور إلى العالم النخبوي"}
                   </p>
                </div>


                {error && (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    className="bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest p-5 rounded-2xl border border-red-100 mb-8 flex items-center gap-3 shadow-sm"
                   >
                     <span className="material-symbols-rounded bg-red-600 text-white p-1 rounded-lg text-xs">error</span> {error}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                   {!isLogin && (
                     <motion.div className="space-y-1.5 group">
                        <label className="text-[10px] font-black text-primary/30 uppercase tracking-[0.2em] pr-4">الاسـم الـكـامـل</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} required type="text" placeholder="اسمك النخبوي" className="luxury-field" />
                     </motion.div>
                   )}
                   <motion.div className="space-y-1.5 group">
                      <label className="text-[10px] font-black text-primary/30 uppercase tracking-[0.2em] pr-4">الـبـريـد الإلـكـتـروني</label>
                      <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="example@sovereign.sd" className="luxury-field" />
                   </motion.div>
                   <motion.div className="space-y-1.5 group">
                      <div className="flex justify-between items-center pr-4">
                         <label className="text-[10px] font-black text-primary/30 uppercase tracking-[0.2em]">كـلـمة الـمـرور</label>
                         {isLogin && <button type="button" className="text-[9px] font-bold text-[#1089A4] hover:text-[#F29124] transition-colors mb-1">استعادة؟</button>}
                      </div>
                      <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="••••••••" className="luxury-field" />
                   </motion.div>

                   <div className="pt-6">
                      <MagneticButton 
                         disabled={loading} 
                         type="submit" 
                         className="w-full bg-[#021D24] text-white py-6 rounded-2xl font-black text-[12px] uppercase tracking-[0.4em] shadow-xl hover:bg-[#1089A4] transition-all overflow-hidden group/btn"
                      >
                         <span className="relative z-10">{loading ? "جاري الفحص..." : (isLogin ? "دخول ســيادي" : "تـفعيل الـنظام")}</span>
                      </MagneticButton>
                   </div>
                </form>

                <div className="relative my-10 text-center">
                   <div className="absolute inset-0 flex items-center px-12 md:px-20"><div className="w-full border-t border-primary/5"></div></div>
                   <span className="relative bg-white px-6 text-[9px] font-bold text-primary/20 uppercase tracking-[0.4em]">أو عبر البروتوكولات</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <MagneticButton 
                     onClick={() => signIn("google", { callbackUrl: "/" })}
                     className="py-4 border border-primary/5 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#F8F9FA] transition-all text-[10px] font-black uppercase tracking-widest group/social"
                   >
                      <Image src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={18} height={18} /> 
                      <span className="hidden sm:block">جـوجـل</span>
                   </MagneticButton>
                   <MagneticButton 
                     className="py-4 bg-[#021D24] text-white rounded-2xl flex items-center justify-center gap-3 hover:bg-black transition-all text-[10px] font-black uppercase tracking-widest shadow-lg group/social"
                   >
                      <Image src="https://www.svgrepo.com/show/473543/apple.svg" alt="Apple" width={16} height={16} className="invert" />
                      <span className="hidden sm:block">آيـفــون</span>
                   </MagneticButton>
                </div>

                <motion.p 
                   className="text-center text-[10px] font-bold mt-12 text-primary/40 uppercase tracking-[0.2em]"
                >
                   {isLogin ? "لا تـمـلك سـيادة مـسبقة؟" : "تـمتلك كـود الـعـبور؟"}
                   <button onClick={() => setIsLogin(!isLogin)} className="mr-3 text-[#1089A4] hover:text-[#F29124] underline underline-offset-4 transition-colors">
                      {isLogin ? "افـتح حـسابك" : "سـجل دخـولك"}
                   </button>
                </motion.p>
              </motion.div>
            </AnimatePresence>
        </div>


      </motion.div>

      <style jsx global>{`
        .luxury-field {
          width: 100%;
          padding: 1.4rem 1.6rem;
          background: #F8F9FA;
          border: 3px solid transparent;
          border-radius: 1.5rem;
          font-weight: 900;
          font-size: 0.85rem;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          color: #021D24;
          text-align: right;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
        }
        @media (min-width: 768px) {
          .luxury-field {
            padding: 1.8rem 2rem;
            border-radius: 2rem;
            font-size: 0.9rem;
          }
        }
        .luxury-field:focus {
          background: white;
          border-color: #1089A4;
          box-shadow: 0 30px 60px rgba(16, 137, 164, 0.12), inset 0 2px 4px rgba(0,0,0,0);
          outline: none;
          transform: translateY(-2px);
        }
        .shadow-elite-xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}
