"use client"

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-24 pb-12 mt-24 border-t border-white/5 relative overflow-hidden">
      <div className="responsive-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24">
          
          {/* Pillar 1: Brand Context */}
          <div className="lg:col-span-4 space-y-10 text-right">
             <Link href="/" className="flex items-center gap-5 justify-end group">
                <div className="relative w-16 h-16 rounded-[1.5rem] bg-white p-3 shadow-2xl group-hover:rotate-12 transition-all">
                   <Image src="/logo.jpg" alt="Logo" fill className="object-contain" />
                </div>
                <div className="flex flex-col">
                   <h2 className="text-3xl font-black tracking-tighter uppercase font-heading text-white">Mersal</h2>
                   <span className="text-[10px] text-[#F29124] font-black uppercase tracking-[0.6em]">Elite Market</span>
                </div>
             </Link>
             <p className="text-white/50 text-[15px] leading-relaxed max-w-sm ml-auto font-medium">
                مرسال هي الوجهة الأولى للتسوق الفاخر في السودان. نربط بين أفضل الموردين والعملاء لتوفير تجربة تسوق استثنائية وآمنة تماماً.
             </p>
             <div className="flex gap-6 justify-end">
                {["facebook", "instagram", "youtube", "twitter"].map((social) => (
                   <div key={social} className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center hover:bg-[#1089A4] hover:border-[#1089A4] transition-all cursor-pointer group shadow-xl">
                      <span className={`brand-icon-${social} text-lg opacity-80 group-hover:opacity-100 transition-opacity text-white`} />
                   </div>
                ))}
             </div>
          </div>

          {/* Pillar 2: Navigation Map */}
          <div className="lg:col-span-2 space-y-8 text-right">
             <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#1089A4]">عن المتجر</h4>
             <ul className="space-y-4 text-white/50 text-xs font-black uppercase tracking-widest">
                <li><Link href="/shop" className="hover:text-[#F29124] transition-colors">كافة المنتجات</Link></li>
                <li><Link href="/offers" className="hover:text-[#F29124] transition-colors">عروض حصرية</Link></li>
                <li><Link href="/new" className="hover:text-[#F29124] transition-colors">وصل حديثاً</Link></li>
                <li><Link href="/about" className="hover:text-[#F29124] transition-colors">من نحن</Link></li>
             </ul>
          </div>

          <div className="lg:col-span-2 space-y-8 text-right">
             <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#F29124]">الدعم الفني</h4>
             <ul className="space-y-4 text-white/50 text-xs font-black uppercase tracking-widest">
                <li><Link href="/contact" className="hover:text-[#1089A4] transition-colors">اتصل بنا</Link></li>
                <li><Link href="/faq" className="hover:text-[#1089A4] transition-colors">الأسئلة الشائعة</Link></li>
                <li><Link href="/shipping" className="hover:text-[#1089A4] transition-colors">سياسة الشحن</Link></li>
                <li><Link href="/returns" className="hover:text-[#1089A4] transition-colors">الاستبدال</Link></li>
             </ul>
          </div>

          {/* Pillar 3: Newsletter Pulse */}
          <div className="lg:col-span-4">
             <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] space-y-8 text-right shadow-2xl">
                <h4 className="text-2xl font-black font-heading text-white">النشرة البريدية</h4>
                <p className="text-[12px] text-white/50 font-black uppercase tracking-widest leading-relaxed">كن أول من يعرف بأحدث العروض والقطع الحصرية التي تصلنا.</p>
ite">النشرة البريدية</h4>
                <p className="text-[12px] text-white/30 font-black uppercase tracking-widest leading-relaxed">كن أول من يعرف بأحدث العروض والقطع الحصرية التي تصلنا.</p>
                <div className="relative">
                   <input 
                    type="email" 
                    placeholder="بريدك الإلكتروني" 
                    className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-8 py-5 text-sm font-bold text-white outline-none focus:border-accent/40"
                   />
                   <button className="absolute left-2 top-2 bottom-2 bg-accent text-white px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-primary transition-all">انضم</button>
                </div>
             </div>
          </div>
        </div>

        {/* Bottom Tier */}
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10 opacity-30">
           <p className="text-[10px] font-black uppercase tracking-[0.5em]">© 2024 MERSAL ELITE. ALL RIGHTS RESERVED.</p>
           <div className="flex items-center gap-10 font-black">
              <span className="text-[10px] uppercase tracking-[0.2em] hidden md:block">WE ACCEPT SECURE PAYMENTS:</span>
              <div className="flex gap-6 grayscale">
                 <div className="w-12 h-8 bg-white/20 rounded-md" />
                 <div className="w-12 h-8 bg-white/20 rounded-md" />
                 <div className="w-12 h-8 bg-white/20 rounded-md" />
              </div>
           </div>
        </div>
      </div>

      {/* Background Motta Pattern Decor */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
    </footer>
  );
}
