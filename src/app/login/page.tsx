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

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        // Handle Login
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError("خطأ في البريد الإلكتروني أو كلمة المرور");
        } else {
          router.push("/");
          router.refresh();
        }
      } else {
        // Handle Register
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "فشل إنشاء الحساب");
        } else {
          // Auto login after registration
          await signIn("credentials", { email, password, callbackUrl: "/" });
        }
      }
    } catch (err) {
      setError("حدث خطأ غير متوقع. جرب مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FBFB] flex items-center justify-center p-6 md:p-12 pt-32 pb-20 overflow-hidden relative">
      {/* Abstract Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#1089A4]/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#F29124]/5 blur-[150px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[1000px] w-full glass-card overflow-hidden flex flex-col md:grid md:grid-cols-2 min-h-[600px] relative z-20"
      >
        {/* Brand Side */}
        <div className="bg-[#021D24] p-10 md:p-16 flex flex-col justify-between text-right relative">
           <div className="space-y-6">
              <Link href="/">
                <div className="w-16 h-16 bg-white rounded-2xl p-2.5 shadow-xl mb-10">
                   <Image src="/logo.jpg" alt="Logo" width={64} height={64} className="object-contain" />
                </div>
              </Link>
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight font-heading">مرحباً بك في <br /><span className="text-[#1089A4]">مرسال النخبة</span></h1>
              <p className="text-white/40 text-[13px] md:text-sm leading-relaxed max-w-[280px] font-medium border-r-4 border-[#F29124] pr-4">انضم لأكبر منصة تجارية في السودان، وابدأ رحلة تسوق استثنائية اليوم.</p>
           </div>
           
           <div className="mt-12 md:mt-0 flex items-center justify-end gap-3 opacity-30">
              <span className="text-[10px] font-black uppercase tracking-widest text-white">+50,000 Verified Users</span>
           </div>
           
           <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        </div>

        {/* Form Side */}
        <div className="p-8 md:p-16 bg-white flex flex-col justify-center text-right">
           <AnimatePresence mode="wait">
             <motion.div
               key={isLogin ? "login" : "sign-up"}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={{ duration: 0.3 }}
               className="space-y-8"
             >
                <div className="space-y-2">
                   <h2 className="text-2xl md:text-3xl font-black text-[#021D24] font-heading">{isLogin ? "تسجيل الدخول" : "إنشاء حساب"}</h2>
                   <p className="text-[#021D24]/40 text-xs font-bold">أدخل بياناتك للمتابعة في منصة مرسال</p>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border-r-4 border-red-500 text-red-600 text-[11px] font-black flex items-center gap-3">
                     <span className="material-symbols-rounded">error</span> {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                   {!isLogin && (
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#021D24]/40 uppercase tracking-widest pr-2">الاسم بالكامل</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} required type="text" placeholder="أدخل اسمك" className="input-field" />
                     </div>
                   )}
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-[#021D24]/40 uppercase tracking-widest pr-2">البريد الإلكتروني</label>
                      <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="email@example.com" className="input-field" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-[#021D24]/40 uppercase tracking-widest pr-2">كلمة المرور</label>
                      <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="••••••••" className="input-field" />
                   </div>

                   <button disabled={loading} type="submit" className="w-full btn-primary mt-4 disabled:opacity-50">
                      {loading ? "جاري التحميل..." : (isLogin ? "دخول للمنصة" : "إنشاء الحساب")}
                   </button>
                </form>

                <div className="relative py-4">
                   <div className="absolute inset-0 flex items-center"><div className="w-full border-t"></div></div>
                   <span className="relative bg-white px-4 text-[10px] font-black text-[#021D24]/20 uppercase tracking-widest block mx-auto w-max">أو عبر</span>
                </div>

                <button 
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                  className="w-full flex items-center justify-center gap-3 py-4 border-2 border-[#1089A4]/10 rounded-2xl hover:bg-[#F8FBFB] transition-all font-black text-[11px] uppercase tracking-widest"
                >
                   <Image src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} height={20} /> الدخول عبر جوجل
                </button>

                <p className="text-center text-xs font-bold text-[#021D24]/40">
                   {isLogin ? "ليس لديك حساب؟" : "لديك حساب بالفعل؟"}
                   <button onClick={() => setIsLogin(!isLogin)} className="mr-2 text-[#F29124] font-black hover:underline underline-offset-4">{isLogin ? "أنشئ حسابك الآن" : "تسجيل الدخول"}</button>
                </p>
             </motion.div>
           </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
