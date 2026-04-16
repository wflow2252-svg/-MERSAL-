"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CATEGORIES = [
  { id: "electronics", name: "إلكترونيات", icon: "devices" },
  { id: "fashion", name: "أزياء", icon: "apparel" },
  { id: "home", name: "منزل", icon: "home_remodel" },
  { id: "beauty", name: "جمال", icon: "content_cut" },
  { id: "kids", name: "أطفال", icon: "child_care" },
];

export default function OnboardingPage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (session?.user?.name) setName(session.user.name);
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age, phone, isOnboarded: true }),
      });

      if (res.ok) {
        await update({ isOnboarded: true });
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Onboarding failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-border p-8 md:p-12 text-right">
        
        <div className="mb-10 text-center">
           <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4 border border-border">
              <span className="material-symbols-rounded text-primary text-3xl">celebration</span>
           </div>
           <h1 className="text-2xl font-bold text-primary">مرحباً بك في مرسال!</h1>
           <p className="text-sm text-primary/40 mt-1">أكمل ملفك الشخصي لنخصص لك أفضل العروض</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
           
           <div className="flex items-center gap-4 p-4 bg-muted rounded-2xl mb-8">
              <Image src={session?.user?.image || "/logo.jpg"} alt="User" width={50} height={50} className="rounded-full" />
              <div className="flex-grow">
                 <label className="block text-[10px] font-bold text-primary/40 uppercase mb-1">الاسم الأساسي</label>
                 <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-transparent outline-none font-bold text-sm" />
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div>
                 <label className="block text-xs font-bold text-primary/60 mb-2 mr-1">العمر</label>
                 <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required placeholder="25" className="input-field" />
              </div>
              <div>
                 <label className="block text-xs font-bold text-primary/60 mb-2 mr-1">رقم الهاتف</label>
                 <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="0912345678" className="input-field" />
              </div>
           </div>

           <div className="pt-4">
              <button disabled={isSubmitting || !age || !phone} className="w-full btn-primary py-5">
                 {isSubmitting ? "جاري الحفظ..." : "بدء التسوق الآن"}
              </button>
           </div>
        </form>

      </div>
    </div>
  );
}
