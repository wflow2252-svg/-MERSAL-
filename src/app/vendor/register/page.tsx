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
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all border-2",
                  step === s ? "bg-primary text-white border-primary" : 
                  step > s ? "bg-accent text-white border-accent" : "bg-white border-border text-primary/20"
                )}>
                  {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                </div>
                <span className="text-[10px] font-bold text-primary/40 uppercase tracking-widest leading-none">
                  {s === 1 ? "الحساب" : s === 2 ? "المتجر" : "التوثيق"}
                </span>
             </div>
           ))}
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-border">
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold mb-8 border border-red-100">
               {error}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6 text-right">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-primary">معلومات الحساب الشخصي</h2>
                <p className="text-sm text-primary/40 mt-1">ابدأ بإنشاء حسابك الأساسي كمورد</p>
              </div>
              <div className="space-y-4">
                <div>
                   <label className="block text-xs font-bold text-primary/60 mb-2 mr-1">الاسم الكامل</label>
                   <input 
                     value={formData.name}
                     onChange={(e) => setFormData({...formData, name: e.target.value})}
                     type="text" placeholder="أدخل اسمك" className="input-field" 
                   />
                </div>
                <div>
                   <label className="block text-xs font-bold text-primary/60 mb-2 mr-1">البريد الإلكتروني</label>
                   <input 
                     value={formData.email}
                     onChange={(e) => setFormData({...formData, email: e.target.value})}
                     type="email" placeholder="example@email.com" className="input-field" 
                   />
                </div>
                <div>
                   <label className="block text-xs font-bold text-primary/60 mb-2 mr-1">رقم الواتساب</label>
                   <input 
                     value={formData.phone}
                     onChange={(e) => setFormData({...formData, phone: e.target.value})}
                     type="tel" placeholder="0912345678" className="input-field" 
                   />
                </div>
              </div>
              <button 
                onClick={nextStep}
                disabled={!formData.name || !formData.email || !formData.phone}
                className="w-full btn-primary py-5 mt-4 disabled:opacity-50"
              >
                المتابعة لبيانات المتجر <ArrowLeft className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 text-right">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-primary">تفاصيل المتجر</h2>
                <p className="text-sm text-primary/40 mt-1">أخبر العملاء عن هوية متجرك</p>
              </div>
              <div className="space-y-4">
                <div>
                   <label className="block text-xs font-bold text-primary/60 mb-2 mr-1">اسم المتجر</label>
                   <input 
                     value={formData.storeName}
                     onChange={(e) => setFormData({...formData, storeName: e.target.value})}
                     type="text" placeholder="مثلاً: متجر مرسال بريميوم" className="input-field" 
                   />
                </div>
                <div>
                   <label className="block text-xs font-bold text-primary/60 mb-2 mr-1">المدينة</label>
                   <select 
                    value={formData.storeCity}
                    onChange={(e) => setFormData({...formData, storeCity: e.target.value})}
                    className="input-field cursor-pointer"
                   >
                     <option>الخرطوم</option>
                     <option>أمدرمان</option>
                     <option>بورتسودان</option>
                   </select>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button onClick={prevStep} className="flex-1 py-4 text-xs font-bold text-primary/40 hover:text-primary transition-colors">السابق</button>
                <button 
                  onClick={nextStep}
                  disabled={!formData.storeName}
                  className="flex-[2] btn-primary py-5 disabled:opacity-50"
                >
                  التالي <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 text-right">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-primary">التحقق والمستندات</h2>
                <p className="text-sm text-primary/40 mt-1">توثيق الحساب الرسمي للمورد</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                 <div className="p-8 border-2 border-dashed border-border rounded-2xl text-center bg-muted/40 hover:border-accent transition-all cursor-pointer">
                    <span className="material-symbols-rounded text-primary/20 text-3xl mb-2">upload_file</span>
                    <h4 className="text-xs font-bold text-primary">كشف حساب بنكي</h4>
                    <p className="text-[10px] text-primary/30 mt-1">آخر 3 أشهر (إلزامي)</p>
                 </div>
                 <div className="p-8 border-2 border-dashed border-border rounded-2xl text-center bg-muted/40 hover:border-secondary transition-all cursor-pointer">
                    <span className="material-symbols-rounded text-primary/20 text-3xl mb-2">verified_user</span>
                    <h4 className="text-xs font-bold text-primary">السجل التجاري (اختياري)</h4>
                 </div>
              </div>
              <div className="flex gap-4 mt-8">
                <button onClick={prevStep} className="flex-1 py-4 text-xs font-bold text-primary/40 hover:text-primary transition-colors">السابق</button>
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
