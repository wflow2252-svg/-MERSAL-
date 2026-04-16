"use client"

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#021D24] text-white pt-20 pb-12 mt-20 border-t border-white/5">
      <div className="responsive-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8 text-right">
             <Link href="/" className="flex items-center gap-4 justify-end">
                <div className="w-14 h-14 bg-white rounded-2xl p-2 relative">
                   <Image src="/logo.jpg" alt="Logo" fill className="object-contain" />
                </div>
                <div>
                   <h4 className="text-2xl font-black font-heading tracking-tighter">MERSAL</h4>
                   <span className="text-[10px] text-[#F29124] font-black uppercase tracking-[0.4em]">Elite Market</span>
                </div>
             </Link>
             <p className="text-white/30 text-[14px] leading-relaxed max-w-sm ml-auto">
               مرسال النخبة هي المنصة الرائدة للتجارة الإلكترونية في السودان، نربط الموردين بالعملاء عبر تجربة تسوق آمنة وفاخرة.
             </p>
          </div>

          {/* Nav Columns */}
          <div className="lg:col-span-2 space-y-6 text-right">
             <h5 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#1089A4]">استكشف</h5>
             <ul className="space-y-4 text-[13px] font-bold text-white/40">
                <li><Link href="/shop" className="hover:text-white transition-colors">كافة المنتجات</Link></li>
                <li><Link href="/offers" className="hover:text-white transition-colors">عروض النخبة</Link></li>
                <li><Link href="/new" className="hover:text-white transition-colors">وصل حديثاً</Link></li>
             </ul>
          </div>

          <div className="lg:col-span-2 space-y-6 text-right">
             <h5 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#F29124]">الدعم</h5>
             <ul className="space-y-4 text-[13px] font-bold text-white/40">
                <li><Link href="/contact" className="hover:text-white transition-colors">اتصل بنا</Link></li>
                <li><Link href="/shipping" className="hover:text-white transition-colors">سياسة الشحن</Link></li>
                <li><Link href="/returns" className="hover:text-white transition-colors">الاسترجاع</Link></li>
             </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4">
             <div className="bg-white/[0.03] border border-white/10 p-8 rounded-[2.5rem] space-y-6 text-right">
                <h5 className="text-xl font-black font-heading">النشرة البريدية</h5>
                <p className="text-[12px] text-white/40 font-bold">اشترك لتصلك أحدث المنتجات والعروض الحصرية.</p>
                <div className="relative">
                   <input type="email" placeholder="البريد الإلكتروني" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-white outline-none focus:border-[#1089A4]/30" />
                   <button className="absolute left-1.5 top-1.5 bottom-1.5 bg-[#1089A4] hover:bg-white hover:text-[#011216] text-white px-6 rounded-xl font-black text-[10px] transition-all">انضم</button>
                </div>
             </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 opacity-40">
           <p className="text-[10px] font-black uppercase tracking-widest">© 2024 MERSAL ELITE. ALL RIGHTS RESERVED.</p>
           <div className="flex gap-4 grayscale">
              <div className="w-10 h-6 bg-white/20 rounded" />
              <div className="w-10 h-6 bg-white/20 rounded" />
           </div>
        </div>
      </div>
    </footer>
  );
}
