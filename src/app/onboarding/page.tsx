"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

const CATEGORIES = [
  { id: "electronics", name: "موبايلات وإلكترونيات", icon: "devices" },
  { id: "fashion", name: "أزياء وملابس", icon: "apparel" },
  { id: "home", name: "أدوات منزلية", icon: "home_remodel" },
  { id: "beauty", name: "جمال وعناية", icon: "content_cut" },
  { id: "sports", name: "رياضة ولياقة", icon: "fitness_center" },
  { id: "kids", name: "ألعاب وأطفال", icon: "child_care" },
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
    if (session?.user?.name) {
      setName(session.user.name);
    }
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
        body: JSON.stringify({
          name,
          age,
          phone,
          interests: selectedInterests.join(','),
          isOnboarded: true
        }),
      });

      if (res.ok) {
        // Update session to reflect onboarded status
        await update({ isOnboarded: true });
        router.push("/shop");
      }
    } catch (error) {
      console.error("Onboarding failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6 pt-32 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.05)] p-12 md:p-16 border border-border/5 text-right"
      >
        <div className="space-y-4 mb-12">
          <div className="w-20 h-20 bg-[#1089A4]/10 rounded-3xl flex items-center justify-center mb-6">
             <span className="material-symbols-rounded text-[#1089A4] text-4xl">celebration</span>
          </div>
          <h1 className="text-4xl font-black text-[#021D24] tracking-tight">مرحباً بك في مرسال!</h1>
          <p className="text-[#021D24]/40 text-lg font-medium">أكمل ملفك الشخصي لنخصص لك أفضل العروض.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* User Preview */}
          <div className="flex items-center gap-6 p-6 bg-[#F8F9FA] rounded-2xl">
             <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg">
                <Image src={session?.user?.image || "/logo.jpg"} alt="User" width={64} height={64} className="object-cover" />
             </div>
             <div className="flex-grow">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#021D24]/40 block mb-2">اسمك بالكامل</label>
                <input 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="أدخل اسمك..."
                  className="w-full bg-white px-4 py-2 rounded-xl outline-none border border-border/20 font-bold"
                />
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3 group">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#021D24]/40">كم عمرك؟</label>
               <div className="relative">
                  <span className="material-symbols-rounded absolute right-6 top-1/2 -translate-y-1/2 text-[#021D24]/20">calendar_today</span>
                  <input 
                    type="number" 
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="25" 
                    required
                    className="w-full bg-[#F8F9FA] pr-14 pl-6 py-6 rounded-2xl border-2 border-transparent focus:border-[#1089A4]/20 outline-none font-bold transition-all shadow-sm" 
                  />
               </div>
            </div>

            <div className="space-y-3 group">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#021D24]/40">رقم الهاتف</label>
               <div className="relative">
                  <span className="material-symbols-rounded absolute right-6 top-1/2 -translate-y-1/2 text-[#021D24]/20">call</span>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0912345678" 
                    required
                    className="w-full bg-[#F8F9FA] pr-14 pl-6 py-6 rounded-2xl border-2 border-transparent focus:border-[#1089A4]/20 outline-none font-bold transition-all shadow-sm" 
                  />
               </div>
            </div>
          </div>

          <div className="space-y-6">
             <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#021D24]/40">ما هي اهتماماتك؟ (اختر ما يعجبك)</label>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleInterest(cat.id)}
                    className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all gap-3 group ${
                      selectedInterests.includes(cat.id) 
                      ? "bg-[#1089A4] border-[#1089A4] text-white shadow-xl shadow-[#1089A4]/20" 
                      : "bg-[#F8F9FA] border-transparent hover:border-[#1089A4]/20"
                    }`}
                  >
                    <span className={`material-symbols-rounded text-2xl ${
                      selectedInterests.includes(cat.id) ? "text-white" : "text-[#021D24]/20"
                    }`}>{cat.icon}</span>
                    <span className="text-[10px] font-black">{cat.name}</span>
                  </button>
                ))}
             </div>
          </div>

          <button 
            disabled={isSubmitting || !age || !phone || selectedInterests.length === 0}
            className="w-full bg-[#1089A4] text-white py-7 rounded-2xl font-black text-xs uppercase tracking-[0.4em] shadow-xl shadow-[#1089A4]/20 hover:bg-[#021D24] hover:-translate-y-2 transition-all active:scale-95 border-b-6 border-black/10 disabled:opacity-50 disabled:translate-y-0"
          >
            {isSubmitting ? "جاري الحفظ..." : "بدء التسوق في مرسال"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
