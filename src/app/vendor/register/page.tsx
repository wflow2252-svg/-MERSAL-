"use client"

import { useState } from "react";
import { CheckCircle2, User, Building2, Landmark, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VendorRegister() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    storeName: "",
    storeCity: "الخرطوم",
    bankStatementUrl: "placeholder_url",
    commercialRegUrl: "",
  });

  const nextStep = () => {
    if (step === 1 && (!formData.name || !formData.email || !formData.phone)) return;
    if (step === 2 && !formData.storeName) return;
    setStep((s) => s + 1);
  };
  
  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/vendor/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/vendor/dashboard?status=pending");
      } else {
        const data = await res.json();
        setError(data.error || "فشل تسجيل البائع");
      }
    } catch (err) {
      setError("حدث خطأ تقني. حاول مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted py-12 px-6 flex items-center justify-center">
      <div className="max-w-xl w-full">
        
        {/* Progress System */}
        <div className="flex items-center justify-between mb-12 px-4">
           {[1, 2, 3].map((s) => (
             <div key={s} className="flex flex-col items-center gap-2">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center font-black transition-all border-4 shadow-xl",
                  step === s ? "bg-[#021D24] text-white border-[#1089A4]" : 
                  step > s ? "bg-[#1089A4] text-white border-[#1089A4]" : "bg-white border-border text-primary/40 opacity-50"
                )}>
                  {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
                </div>
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-[0.4em] leading-none mt-2",
                  step === s ? "text-[#1089A4]" : "text-primary/30"
                )}>
                  {s === 1 ? "الحساب" : s === 2 ? "المتجر" : "التوثيق"}
                </span>
             </div>
           ))}
        </div>

        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-elite-xl border border-white relative overflow-hidden">
          {/* Motta Accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#1089A4]/5 rounded-bl-full pointer-events-none" />
          
          {error && (
            <div className="bg-red-50 text-red-600 p-6 rounded-2xl text-[11px] font-black uppercase tracking-widest mb-10 border border-red-100 flex items-center gap-4">
               <span className="material-symbols-rounded">error</span> {error}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-8 text-right">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-[#021D24] font-heading tracking-tighter">معلومات الحساب الشخصي</h2>
                <p className="text-sm font-bold text-primary/40 mt-2">ابدأ بإنشاء حسابك الأساسي كمورد نخبة</p>
              </div>
              <div className="space-y-6">
                <div>
                   <label className="block text-[10px] font-black text-primary/50 uppercase tracking-[0.2em] mb-3 mr-2 text-right">الاسم الكامل للمالك</label>
                   <input 
                     value={formData.name}
                     onChange={(e) => setFormData({...formData, name: e.target.value})}
                     type="text" placeholder="أدخل اسمك كما في الهوية" className="input-field" 
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-black text-primary/50 uppercase tracking-[0.2em] mb-3 mr-2 text-right">البريد الإلكتروني للعمل</label>
                   <input 
                     value={formData.email}
                     onChange={(e) => setFormData({...formData, email: e.target.value})}
                     type="email" placeholder="example@mersal.com" className="input-field" 
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-black text-primary/50 uppercase tracking-[0.2em] mb-3 mr-2 text-right">رقم الواتساب الفعال</label>
                   <input 
                     value={formData.phone}
                     onChange={(e) => setFormData({...formData, phone: e.target.value})}
                     type="tel" placeholder="09xxxx-xxxx" className="input-field" 
                   />
                </div>
              </div>
              <button 
                onClick={nextStep}
                disabled={!formData.name || !formData.email || !formData.phone}
                className="w-full btn-primary py-7 mt-6 disabled:opacity-20"
              >
                تأكيد ومتابعة للمتجر <ArrowLeft className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 text-right">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-[#021D24] font-heading tracking-tighter">هوية المتجر التجاري</h2>
                <p className="text-sm font-bold text-primary/40 mt-2">حدد بصمتك التجارية في المنصة</p>
              </div>
              <div className="space-y-6">
                <div>
                   <label className="block text-[10px] font-black text-primary/50 uppercase tracking-[0.2em] mb-3 mr-2">اسم المتجر الرسمي</label>
                   <input 
                     value={formData.storeName}
                     onChange={(e) => setFormData({...formData, storeName: e.target.value})}
                     type="text" placeholder="مثلاً: بستان الفواكه النخبوي" className="input-field" 
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-black text-primary/50 uppercase tracking-[0.2em] mb-3 mr-2">مقر المتجر الرئيسي</label>
                   <select 
                    value={formData.storeCity}
                    onChange={(e) => setFormData({...formData, storeCity: e.target.value})}
                    className="input-field cursor-pointer bg-white"
                   >
                     <option>الخرطوم</option>
                     <option>أمدرمان</option>
                     <option>بحرى</option>
                     <option>بورتسودان</option>
                     <option>ود مدني</option>
                   </select>
                </div>
              </div>
              <div className="flex gap-6 mt-10">
                <button onClick={prevStep} className="flex-1 py-5 text-[10px] font-black text-primary/40 hover:text-[#021D24] uppercase tracking-widest transition-all">العودة للخلف</button>
                <button 
                  onClick={nextStep}
                  disabled={!formData.storeName}
                  className="flex-[2] btn-primary py-7 disabled:opacity-20"
                >
                  التالي: التوثيق <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 text-right">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-[#021D24] font-heading tracking-tighter">السيادة والتوثيق</h2>
                <p className="text-sm font-bold text-primary/40 mt-2">إرفاق المستندات الرسمية للتحقق</p>
              </div>
              <div className="grid grid-cols-1 gap-6">
                 <div className="p-12 border-4 border-dashed border-border/40 rounded-[2.5rem] text-center bg-muted/20 hover:border-[#1089A4] hover:bg-white transition-all cursor-pointer group shadow-inner">
                    <span className="material-symbols-rounded text-[#1089A4] text-4xl mb-4 group-hover:scale-125 transition-transform">upload_file</span>
                    <h4 className="text-sm font-black text-[#021D24] uppercase tracking-widest">كشف حساب بنكي (PDF)</h4>
                    <p className="text-[10px] text-primary/40 font-bold mt-2">إلزامي لضمان دورة دفع آمنة</p>
                 </div>
                 <div className="p-12 border-4 border-dashed border-border/40 rounded-[2.5rem] text-center bg-muted/20 hover:border-[#F29124] hover:bg-white transition-all cursor-pointer group shadow-inner">
                    <span className="material-symbols-rounded text-[#F29124] text-4xl mb-4 group-hover:scale-125 transition-transform">verified_user</span>
                    <h4 className="text-sm font-black text-[#021D24] uppercase tracking-widest">السجل التجاري (اختياري)</h4>
                    <p className="text-[10px] text-primary/40 font-bold mt-2">يفضل لرفع موثوقية متجرك</p>
                 </div>
              </div>
              <div className="flex gap-6 mt-10">
                <button onClick={prevStep} className="flex-1 py-5 text-[10px] font-black text-primary/40 hover:text-[#021D24] uppercase tracking-widest transition-all">العودة للخلف</button>
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-[2] btn-primary bg-secondary hover:bg-secondary/90 py-5"
                >
                  {isSubmitting ? "جاري الإرسال..." : "إرسال طلب الانضمام"} <CheckCircle2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

        </div>

        <p className="text-center mt-10 text-xs text-primary/40 font-bold">
           هل لديك حساب مورد؟ <Link href="/login" className="text-accent underline mr-1">تسجيل الدخول</Link>
        </p>
      </div>
    </div>
  );
}
