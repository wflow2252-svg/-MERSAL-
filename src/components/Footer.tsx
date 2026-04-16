"use client"

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#011116] text-white pb-16 mt-48 relative border-t border-white/5 overflow-hidden">
      {/* Sovereign Floating Newsletter - Robust Architecture */}
      <div className="responsive-container relative z-30 -translate-y-1/2">
        <div className="glass-dark p-12 md:p-16 rounded-[4rem] border border-white/10 shadow-midnight flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#1089A4]/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="flex flex-col gap-4 text-center lg:text-right relative z-10">
             <h3 className="text-4xl font-black font-heading tracking-tighter text-white">انضم إلى مجتمع النخبة</h3>
             <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.5em]">Global Sovereign Updates</p>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col md:flex-row gap-6 relative z-10">
             <input 
               type="email" 
               placeholder="أدخل بريدك الإلكتروني للحصول على العروض الفاخرة" 
               className="flex-grow bg-white/5 border-2 border-white/10 rounded-[2rem] px-10 py-6 text-sm font-black text-white outline-none focus:border-[#F29124] transition-all placeholder:text-white/10"
             />
             <button className="bg-[#F29124] text-[#021D24] px-12 py-6 rounded-[2rem] font-black text-[12px] uppercase tracking-[0.3em] hover:scale-105 hover:shadow-[0_20px_40px_rgba(242,145,36,0.3)] transition-all flex items-center justify-center gap-4 group/btn shadow-xl border-b-8 border-black/20">
                اشترك الآن <span className="material-symbols-rounded group-hover/btn:translate-x-[-10px] transition-transform">arrow_right_alt</span>
             </button>
          </div>
        </div>
      </div>

      <div className="responsive-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-24 mb-32">
          
          {/* Pillar 1: Brand Authority */}
          <div className="lg:col-span-4 space-y-10 text-right">
             <Link href="/" className="flex items-center gap-6 justify-end group inline-flex ml-auto">
                <div className="relative w-20 h-20 rounded-[2rem] bg-white p-4 shadow-elite-xl group-hover:rotate-12 transition-all">
                   <Image src="/logo.jpg" alt="Logo" fill className="object-contain" />
                </div>
                <div className="flex flex-col">
                   <h2 className="text-4xl font-black tracking-tighter uppercase font-heading text-white">Mersal</h2>
                   <span className="text-[11px] text-[#F29124] font-black uppercase tracking-[0.6em]">Premium Sovereignty</span>
                </div>
             </Link>
             <p className="text-white/30 text-[16px] leading-[2] max-w-sm ml-auto font-medium">
                مرسال ليست مجرد متجر، هي تجسيد للسيادة التجارية في السودان. ننتقي النخبة لنقدمها للنخبة، بضمانات أمان تفوق التوقعات.
             </p>
             <div className="flex gap-6 justify-end">
                {["facebook", "instagram", "youtube", "twitter"].map((social) => (
                   <div key={social} className="w-14 h-14 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#1089A4] hover:shadow-[0_0_30px_rgba(16,137,164,0.4)] hover:border-[#1089A4] transition-all cursor-pointer group shadow-2xl">
                      <span className={`brand-icon-${social} text-xl text-white opacity-40 group-hover:opacity-100 transition-opacity`} />
                   </div>
                ))}
             </div>
          </div>

          {/* Pillar 2: Detailed Maps */}
          <div className="lg:col-span-2 space-y-10 text-right">
             <h4 className="text-[12px] font-black uppercase tracking-[0.5em] text-[#1089A4]">استكشاف المنصة</h4>
             <ul className="space-y-5 text-white/30 text-xs font-black uppercase tracking-[0.2em]">
                <li><Link href="/shop" className="hover:text-white transition-colors">المتجر العام</Link></li>
                <li><Link href="/offers" className="hover:text-white transition-colors">عروض السيادة</Link></li>
                <li><Link href="/new" className="hover:text-white transition-colors">أحدث الإضافات</Link></li>
                <li><Link href="/top-vendors" className="hover:text-white transition-colors">كبار الموردين</Link></li>
             </ul>
          </div>

          <div className="lg:col-span-2 space-y-10 text-right">
             <h4 className="text-[12px] font-black uppercase tracking-[0.5em] text-[#F29124]">الدعم السيادي</h4>
             <ul className="space-y-5 text-white/30 text-xs font-black uppercase tracking-[0.2em]">
                <li><Link href="/contact" className="hover:text-white transition-colors">تواصل مباشر</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">مركز المساعدة</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">سياسة الخصوصية</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">اتفاقية الخدمة</Link></li>
             </ul>
          </div>

          {/* Pillar 3: Administrative Insights */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
             <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 text-right space-y-6 w-full max-w-sm shadow-2xl relative overflow-hidden group/box">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#1089A4] opacity-40" />
                <h4 className="text-xl font-black text-white">هل تود الانضمام؟</h4>
                <p className="text-[11px] text-white/30 font-black uppercase tracking-widest leading-relaxed">كن جزءاً من منظومة مرسال وابدأ رحلة تجارتك النخبوية اليوم.</p>
                <Link href="/vendor/register" className="inline-flex gap-4 items-center text-[11px] font-black text-[#1089A4] uppercase tracking-[0.3em] group-hover/box:translate-x-[-10px] transition-transform">
                   سجل كمورد الآن <span className="material-symbols-rounded">arrow_back</span>
                </Link>
             </div>
          </div>
        </div>

        {/* Legal Tier - Elite Control Bar */}
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
           <div className="flex flex-col md:flex-row items-center gap-10">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 text-center md:text-right">© 2024 MERSAL ELITE MARKET. ALL RIGHTS RESERVED.</p>
              <div className="h-4 w-px bg-white/10 hidden md:block" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F29124]/40">Powered by Elite Sovereignty Engine</p>
           </div>
           
           <div className="flex items-center gap-8">
              <span className="text-[9px] text-white/20 font-black uppercase tracking-widest hidden lg:block">SECURE ENCRYPTION:</span>
              <div className="flex gap-4">
                 {[1,2,3,4].map(idx => (
                    <div key={idx} className="w-10 h-7 bg-white/10 rounded-lg border border-white/5 hover:bg-white/20 transition-all cursor-help" />
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Atmospheric Sovereignty Effects - Optimized to prevent document overflow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#1089A4]/5 blur-[120px] rounded-full pointer-events-none translate-x-1/4 translate-y-1/4" />
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-[#F29124]/5 blur-[100px] rounded-full pointer-events-none" />
      
      {/* Infinite Bottom Stretch - Fixes the white gap without affecting global HTML */}
      <div className="absolute bottom-[-100vh] left-0 w-full h-[100vh] bg-[#011116] pointer-events-none" />
    </footer>
  );
}
