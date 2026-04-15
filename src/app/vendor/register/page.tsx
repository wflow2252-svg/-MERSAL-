"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle2, Building2, User, Landmark, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function VendorRegister() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    storeName: "",
    storeCity: "",
    bankStatement: null as File | null,
    commercialReg: null as File | null,
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-44 pb-32 px-6">
      <div className="max-w-xl mx-auto">
        {/* Progress Header - Elite UI */}
        <div className="flex items-center justify-between mb-20 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted -z-10 -translate-y-1/2" />
          {[1, 2, 3].map((s) => (
            <div 
              key={s}
              className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xs transition-all duration-700 border-4",
                step === s ? "bg-[#1089A4] text-white border-[#1089A4] scale-125 shadow-2xl shadow-[#1089A4]/30" : 
                step > s ? "bg-[#F29124] text-white border-[#F29124]" : "bg-white border-muted text-[#021D24]/20"
              )}
            >
              {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[4rem] p-12 md:p-16 shadow-[0_50px_100px_rgba(0,0,0,0.06)] border border-border/5 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10 text-right"
              >
                <div className="text-center mb-12 space-y-4">
                  <div className="w-20 h-20 bg-[#1089A4]/10 text-[#1089A4] rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <User className="w-10 h-10" />
                  </div>
                  <h2 className="text-4xl font-black text-[#021D24] font-heading tracking-tight">معلومات الحساب الشخصي</h2>
                  <p className="text-[#021D24]/40 text-sm font-medium">ابدأ بإنشاء حسابك الأساسي كمورد في نظام مرسال</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#021D24]/40 pr-4">الاسم الكامل</label>
                    <input type="text" placeholder="أدخل اسمك بالكامل" className="w-full bg-[#F8F9FA] border-2 border-transparent focus:border-[#1089A4]/20 rounded-2xl px-6 py-5 outline-none transition-all font-bold placeholder:text-[#021D24]/10" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#021D24]/40 pr-4">البريد الإلكتروني</label>
                    <input type="email" placeholder="example@mersal.com" className="w-full bg-[#F8F9FA] border-2 border-transparent focus:border-[#1089A4]/20 rounded-2xl px-6 py-5 outline-none transition-all font-bold placeholder:text-[#021D24]/10" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#021D24]/40 pr-4">رقم التواصل (واتساب)</label>
                    <input type="tel" placeholder="0900000000" className="w-full bg-[#F8F9FA] border-2 border-transparent focus:border-[#1089A4]/20 rounded-2xl px-6 py-5 outline-none transition-all font-bold placeholder:text-[#021D24]/10" />
                  </div>
                </div>

                <button onClick={nextStep} className="w-full bg-[#1089A4] text-white py-7 rounded-2xl font-black text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-6 hover:bg-[#021D24] transition-all shadow-xl shadow-[#1089A4]/20 hover:-translate-y-2 active:scale-95 border-b-6 border-black/10">
                  المتابعة لبيانات المتجر <ArrowLeft className="w-6 h-6" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10 text-right"
              >
                <div className="text-center mb-12 space-y-4">
                  <div className="w-20 h-20 bg-[#F29124]/10 text-[#F29124] rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Building2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-4xl font-black text-[#021D24] font-heading tracking-tight">تفاصيل المتجر</h2>
                  <p className="text-[#021D24]/40 text-sm font-medium">أخبر العملاء عن هوية متجرك وموقعه</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#021D24]/40 pr-4">اسم المتجر</label>
                    <input type="text" placeholder="مثلاً: تكنو زون للنظم" className="w-full bg-[#F8F9FA] border-2 border-transparent focus:border-[#1089A4]/20 rounded-2xl px-6 py-5 outline-none transition-all font-bold placeholder:text-[#021D24]/10" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#021D24]/40 pr-4">المدينة</label>
                    <select className="w-full bg-[#F8F9FA] border-2 border-transparent focus:border-[#1089A4]/20 rounded-2xl px-6 py-5 outline-none transition-all font-bold appearance-none cursor-pointer">
                      <option>الخرطوم</option>
                      <option>أمدرمان</option>
                      <option>بحري</option>
                      <option>بورتسودان</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-6">
                  <button onClick={prevStep} className="flex-1 bg-muted px-8 py-7 rounded-2xl font-black text-xs uppercase tracking-widest text-[#021D24]/40 hover:bg-[#021D24] hover:text-white transition-all">السابق</button>
                  <button onClick={nextStep} className="flex-[2] bg-[#1089A4] text-white py-7 rounded-2xl font-black text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-6 hover:bg-[#021D24] transition-all shadow-xl shadow-[#1089A4]/20 hover:-translate-y-2 active:scale-95 border-b-6 border-black/10">
                    رفع المستندات <ArrowLeft className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10 text-right"
              >
                <div className="text-center mb-12 space-y-4">
                  <div className="w-20 h-20 bg-[#1089A4]/10 text-[#1089A4] rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Landmark className="w-10 h-10" />
                  </div>
                  <h2 className="text-4xl font-black text-[#021D24] font-heading tracking-tight">التحقق والمستندات</h2>
                  <p className="text-[#021D24]/40 text-sm font-medium">تأمين مبيعاتك يبدأ بتوثيق الحساب الرسمي</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="p-10 border-4 border-dashed border-muted rounded-[2rem] text-center hover:border-[#1089A4] transition-all cursor-pointer bg-[#F8F9FA] group">
                      <Upload className="w-10 h-10 mx-auto mb-4 text-[#021D24]/10 group-hover:text-[#1089A4] transition-colors" />
                      <h4 className="font-black text-xs uppercase tracking-widest text-[#021D24]">كشف حساب بنكي</h4>
                      <p className="text-[10px] font-medium text-[#021D24]/30 mt-2">آخر 3 أشهر (إلزامي)</p>
                   </div>
                   <div className="p-10 border-4 border-dashed border-muted rounded-[2rem] text-center hover:border-[#F29124] transition-all cursor-pointer bg-[#F8F9FA] group">
                      <Upload className="w-10 h-10 mx-auto mb-4 text-[#021D24]/10 group-hover:text-[#F29124] transition-colors" />
                      <h4 className="font-black text-xs uppercase tracking-widest text-[#021D24]">السجل التجاري</h4>
                      <p className="text-[10px] font-medium text-[#021D24]/30 mt-2">إذا وجد (اختياري)</p>
                   </div>
                </div>

                <div className="flex gap-6 pt-6">
                  <button onClick={prevStep} className="flex-1 bg-muted px-8 py-7 rounded-2xl font-black text-xs uppercase tracking-widest text-[#021D24]/40 hover:bg-[#021D24] hover:text-white transition-all">السابق</button>
                  <button className="flex-[2] bg-[#F29124] text-[#021D24] py-7 rounded-2xl font-black text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-6 hover:bg-[#021D24] hover:text-white transition-all shadow-xl shadow-[#F29124]/20 hover:-translate-y-2 active:scale-95 border-b-6 border-black/10">
                    إرسال الطلب الآن <CheckCircle2 className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Background visuals */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1089A4]/5 blur-[200px] rounded-full pointer-events-none" />
        </div>

        <p className="text-center mt-12 text-sm font-medium text-[#021D24]/40">
          هل لديك حساب بالفعل؟ <Link href="/login" className="text-[#1089A4] font-black hover:underline mr-2">تسجيل الدخول</Link>
        </p>
      </div>
    </div>
  );
}
