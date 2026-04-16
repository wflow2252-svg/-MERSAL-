"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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
        if (result?.error) setError("خطأ في البيانات. تأكد من البريد وكلمة المرور.");
        else { router.push("/"); router.refresh(); }
      } else {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name }),
        });
        const data = await res.json();
        if (!res.ok) setError(data.error || "فشل إنشاء الحساب");
        else await signIn("credentials", { email, password, callbackUrl: "/" });
      }
    } catch (err) {
      setError("حدث خطأ غير متوقع. جرب مرة أخرى.");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6 md:p-12 pt-32 pb-16 overflow-hidden relative">
      {/* Decorative Elite Patterns */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#0B5364]/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#F29124]/5 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-[1100px] w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:grid lg:grid-cols-2 relative z-10 border border-border"
      >
        {/* Brand Side - Motta Petrol Style */}
        <div className="bg-[#0B5364] p-12 md:p-20 flex flex-col justify-between text-right relative overflow-hidden">
           <div className="relative z-10 space-y-10">
              <Link href="/">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-[1.5rem] p-3 shadow-2xl shadow-black/20">
                   <Image src="/logo.jpg" alt="Logo" width={80} height={80} className="object-contain" />
                </div>
              </Link>
              <div className="space-y-4">
                 <h1 className="text-4xl md:text-6xl font-black text-white leading-tight font-heading tracking-tighter">مرحباً بك في <br /><span className="text-secondary text-gradient">مرسال النخبة</span></h1>
                 <p className="text-white/40 text-sm md:text-base font-medium max-w-[320px] leading-relaxed pr-6 border-r-4 border-secondary">استخدم حسابك للوصول إلى أفضل المنتجات والخدمات في السودان.</p>
              </div>
           </div>
           
           <div className="relative z-10 flex items-center gap-4 justify-end mt-12 opacity-40">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">MERSAL LUXURY MARKETPLACE</span>
           </div>

           {/* Decor */}
           <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent)]" />
        </div>

        {/* Form Side */}
        <div className="p-10 md:p-16 lg:p-24 bg-white flex flex-col justify-center text-right">
           <AnimatePresence mode="wait">
             <motion.div
               key={isLogin ? "login" : "signup"}
               initial={{ opacity: 0, x: 30 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -30 }}
               className="space-y-10"
             >
                <div className="space-y-3">
                   <h2 className="text-3xl md:text-4xl font-black text-primary font-heading tracking-tighter">{isLogin ? "تسجيل الدخول" : "إنشاء حساب"}</h2>
                   <p className="text-primary/40 text-xs font-bold uppercase tracking-widest">أدخل بياناتك للمتابعة في المنصة</p>
                </div>

                {error && (
                  <div className="p-5 bg-red-50 border-r-4 border-red-500 text-red-600 text-[11px] font-black uppercase tracking-widest rounded-xl">
                     {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                   {!isLogin && (
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-primary/30 uppercase tracking-[0.3em] pr-2">الاسم الكامل</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} required type="text" placeholder="أدخل اسمك" className="motta-input" />
                     </div>
                   )}
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-primary/30 uppercase tracking-[0.3em] pr-2">البريد الإلكتروني</label>
                      <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="email@example.com" className="motta-input" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-primary/30 uppercase tracking-[0.3em] pr-2">كلمة المرور</label>
                      <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="••••••••" className="motta-input" />
                   </div>

                   <button disabled={loading} type="submit" className="w-full motta-btn-primary py-6 text-sm disabled:opacity-50">
                      {loading ? "جاري التحميل..." : (isLogin ? "دخول للمنصة" : "إنشاء حساب جديد")}
                   </button>
                </form>

                <div className="relative py-4">
                   <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
                   <span className="relative bg-white px-6 text-[10px] font-black text-primary/20 uppercase tracking-[0.4em] block mx-auto w-max shrink-0">أو المتابعة عبر</span>
                </div>

                <button 
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                  className="w-full h-16 flex items-center justify-center gap-4 border-2 border-border rounded-[1.5rem] hover:bg-muted transition-all font-black text-[11px] uppercase tracking-widest text-primary/60 group"
                >
                   <Image src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} height={20} className="group-hover:scale-110 transition-transform" /> 
                   المتابعة عبر بريد جوجل
                </button>

                <p className="text-center text-xs font-bold text-primary/40">
                   {isLogin ? "ليس لديك حساب؟" : "لديك حساب بالفعل؟"}
                   <button onClick={() => setIsLogin(!isLogin)} className="mr-3 text-secondary font-black hover:underline underline-offset-4">{isLogin ? "أنشئ حسابك الآن" : "سجل دخولك"}</button>
                </p>
             </motion.div>
           </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
