"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "electronics", name: "إلكترونيات", icon: "devices" },
  { id: "fashion", name: "أزياء", icon: "apparel" },
  { id: "home", name: "منزل", icon: "home_remodel" },
  { id: "beauty", name: "جمال", icon: "content_cut" },
  { id: "kids", name: "أطفال", icon: "child_care" },
  { id: "sports", name: "رياضة", icon: "fitness_center" },
];

export default function OnboardingPage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (session?.user?.name) setName(session.user.name);
  }, [session]);

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          age, 
          phone, 
          interests: selectedInterests.join(','),
          isOnboarded: true 
        }),
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
    <div className="min-h-screen bg-muted flex items-center justify-center p-6 pt-32 pb-20">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl border border-border p-8 md:p-14 text-right">
        
        <div className="mb-12 text-center">
           <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4 border border-border">
              <span className="material-symbols-rounded text-primary text-3xl">celebration</span>
           </div>
           <h1 className="text-3xl font-black text-primary tracking-tighter">مرحباً بك في مرسال!</h1>
           <p className="text-sm text-primary/40 mt-1 font-bold">أكمل ملفك الشخصي لنخصص لك أفضل العروض حسب رغباتك</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
           
           <div className="flex items-center gap-6 p-6 bg-muted rounded-2xl">
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-xl">
                 <Image src={session?.user?.image || "/logo-navbar-final.png"} alt="User" width={64} height={64} className="object-cover" />
              </div>
              <div className="flex-grow">
                 <label className="block text-[9px] font-black text-primary/40 uppercase tracking-widest mb-1 pr-2">الاسم الكامل</label>
                 <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="أدخل اسمك هنا" className="w-full bg-transparent outline-none font-bold text-lg text-primary" />
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                 <label className="block text-xs font-bold text-primary/60 mb-3 mr-2 uppercase tracking-widest">كم عمرك؟</label>
                 <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required placeholder="العمر" className="input-field" />
              </div>
              <div>
                 <label className="block text-xs font-bold text-primary/60 mb-3 mr-2 uppercase tracking-widest">رقم الهاتف (واتساب)</label>
                 <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="0900000000" className="input-field" />
              </div>
           </div>

           <div className="space-y-6">
              <label className="block text-[10px] font-black text-primary/40 uppercase tracking-[0.2em] pr-2">ما هي رغباتك؟ (اختر اهتماماتك)</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => toggleInterest(cat.id)}
                      className={cn(
                        "flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all gap-2 group",
                        selectedInterests.includes(cat.id) 
                        ? "bg-primary border-primary text-white shadow-2xl shadow-primary/20" 
                        : "bg-muted/50 border-transparent hover:border-primary/20"
                      )}
                    >
                      <span className={cn(
                        "material-symbols-rounded text-2xl",
                        selectedInterests.includes(cat.id) ? "text-white" : "text-primary/20"
                      )}>{cat.icon}</span>
                      <span className="text-[10px] font-black">{cat.name}</span>
                    </button>
                 ))}
              </div>
           </div>

           <div className="pt-6">
              <button disabled={isSubmitting || !age || !phone || selectedInterests.length === 0} className="w-full btn-primary py-6">
                 {isSubmitting ? "جاري الحفظ..." : "بدء التسوق الآن"}
              </button>
           </div>
        </form>

      </div>
    </div>
  );
}
