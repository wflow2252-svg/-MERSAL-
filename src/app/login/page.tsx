"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Motta Motifs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[200px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden elite-shadow bg-white relative z-10 mx-auto"
      >
        
        {/* Elite Sidebar Branding */}
        <div className="bg-[#021D24] p-12 md:p-16 hidden lg:flex flex-col justify-between relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-transparent z-0" />
           
           <div className="relative z-10">
              <Link href="/" className="inline-flex items-center gap-4 group">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl p-2 flex items-center justify-center shadow-2xl">
                   <Image src="/logo.jpg" alt="Logo" width={50} height={50} className="object-contain" />
                </div>
                <div className="flex flex-col">
                   <span className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter">Morsall</span>
                   <span className="text-[9px] text-[#F29124] font-black uppercase tracking-[0.4em]">Elite Marketplace</span>
                </div>
              </Link>
           </div>

           <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tighter font-heading">
                مرحباً بك في <br /> عالم <span className="text-[#F29124]">النخبة</span>
              </h2>
              <p className="text-white/40 text-[13px] font-bold max-w-[280px] leading-relaxed">
                 استمتع بتجربة تسوق لا مثيل لها مع أرقى الماركات العالمية والمحلية في السودان.
              </p>
           </div>

           <div className="relative z-10 text-[9px] font-black text-white/20 uppercase tracking-[0.5em]">
              © 2024 MERSAL LUXURY MARKETPLACE
           </div>
        </div>

        {/* Auth Content Area */}
        <div className="p-10 md:p-20 flex flex-col justify-center bg-white min-h-[600px]">
            <div className="mb-12 text-right">
               <h1 className="text-4xl font-black text-primary font-heading tracking-tighter">{isLogin ? "تسجيل الدخول" : "إنشاء حساب"}</h1>
               <p className="text-primary/40 text-sm font-bold mt-2 uppercase tracking-widest">{isLogin ? "سجل دخولك للمتابعة في المنصة" : "ابدأ رحلتك معنا كمستخدم نخبة"}</p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest p-5 rounded-2xl border border-red-100 mb-8 flex items-center gap-3">
                 <span className="material-symbols-rounded">error</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
               {!isLogin && (
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest pr-4">الاسم الكامل</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} required type="text" placeholder="أدخل اسمك" className="input-field" />
                 </div>
               )}
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest pr-4">البريد الإلكتروني</label>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="email@example.com" className="input-field" />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest pr-4">كلمة المرور</label>
                  <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="••••••••" className="input-field" />
               </div>

               <button disabled={loading} type="submit" className="w-full btn-primary py-7 font-black tracking-[0.4em] mt-4">
                  {loading ? "جاري التحقق..." : (isLogin ? "دخول للمنصة" : "أنشئ حسابك الآن")}
               </button>
            </form>

            <div className="relative my-10">
               <div className="absolute inset-0 flex items-center md:px-20"><div className="w-full border-t border-border/10"></div></div>
               <span className="relative bg-white px-8 text-[10px] font-black text-primary/20 uppercase tracking-widest block mx-auto w-max">أو المتابعة عبر</span>
            </div>

            <button 
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="w-full py-6 border border-border/10 rounded-2xl flex items-center justify-center gap-6 hover:bg-muted transition-all text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary/5"
            >
               <Image src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={24} height={24} /> المتابعة عبر بريد جوجل
            </button>

            <p className="text-center text-[11px] font-black mt-12 text-primary/60 uppercase tracking-[0.2em]">
               {isLogin ? "ليس لديك حساب؟" : "لديك حساب بالفعل؟"}
               <button onClick={() => setIsLogin(!isLogin)} className="mr-3 text-secondary hover:underline">
                  {isLogin ? "أنشئ حسابك الآن" : "سجل دخولك"}
               </button>
            </p>
        </div>

      </motion.div>
    </div>
  );
}
