"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
    <div className="min-h-[calc(100vh-80px)] bg-muted flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-border p-8 md:p-12">
        
        <div className="flex flex-col items-center mb-8">
           <div className="w-16 h-16 bg-muted rounded-xl p-2 border border-border mb-4">
              <Image src="/logo.jpg" alt="Logo" width={60} height={60} className="object-contain" />
           </div>
           <h1 className="text-2xl font-bold text-primary">{isLogin ? "تسجيل الدخول" : "إنشاء حساب"}</h1>
           <p className="text-sm text-primary/40 mt-1">مرحباً بك في مرسال النخبة</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-xs p-4 rounded-xl border border-red-100 mb-6">
             {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
           {!isLogin && (
             <div>
                <label className="block text-xs font-bold text-primary/60 mb-2 mr-1">الاسم الكامل</label>
                <input value={name} onChange={(e) => setName(e.target.value)} required type="text" placeholder="أدخل اسمك" className="input-field" />
             </div>
           )}
           <div>
              <label className="block text-xs font-bold text-primary/60 mb-2 mr-1">البريد الإلكتروني</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="example@email.com" className="input-field" />
           </div>
           <div>
              <label className="block text-xs font-bold text-primary/60 mb-2 mr-1">كلمة المرور</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="••••••••" className="input-field" />
           </div>

           <button disabled={loading} type="submit" className="w-full btn-primary mt-4">
              {loading ? "جاري المعالجة..." : (isLogin ? "دخول" : "تسجيل")}
           </button>
        </form>

        <div className="relative my-8">
           <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
           <span className="relative bg-white px-4 text-xs text-primary/30 block mx-auto w-max">أو عبر سجل بـ</span>
        </div>

        <button 
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full py-4 border border-border rounded-xl flex items-center justify-center gap-4 hover:bg-muted transition-all text-sm font-bold"
        >
           <Image src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} height={20} /> متابعة عبر جوجل
        </button>

        <p className="text-center text-sm mt-8 text-primary/60">
           {isLogin ? "ليس لديك حساب؟" : "لديك حساب بالفعل؟"}
           <button onClick={() => setIsLogin(!isLogin)} className="mr-2 text-accent font-bold hover:underline">
              {isLogin ? "أنشئ حسابك" : "سجل دخولك"}
           </button>
        </p>

      </div>
    </div>
  );
}
