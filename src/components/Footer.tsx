"use client"

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#021D24] text-white pt-20 md:pt-32 pb-12 md:pb-16 px-6 md:px-12 mt-16 md:mt-24">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-24">
          
          {/* Brand Pillar */}
          <div className="lg:col-span-4 space-y-10 flex flex-col items-center lg:items-end text-center lg:text-right">
             <Link href="/" className="flex items-center gap-4 group">
                <div className="relative w-14 h-14 rounded-2xl bg-white p-2 shadow-2xl group-hover:rotate-12 transition-all">
                  <Image src="/logo.jpg" alt="Logo" fill className="object-contain" />
                </div>
                <div className="flex flex-col">
                   <h2 className="text-3xl font-black tracking-tighter uppercase font-heading">Mersal</h2>
                   <span className="text-[10px] text-[#F29124] font-black uppercase tracking-[0.4em]">Marketplace</span>
                </div>
             </Link>
             <p className="text-white/40 text-[15px] leading-relaxed max-w-sm">
                مرسال هي المنصة المتكاملة للتجارة الإلكترونية في السودان، نربط بين أفضل الموردين والعملاء لتوفير تجربة تسوق استثنائية وآمنة.
             </p>
              <div className="flex gap-6 justify-center lg:justify-start">
                {["facebook", "instagram", "youtube", "x"].map((social) => (
                  <div key={social} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#1089A4] transition-all cursor-pointer group">
                     <i className={`brand-icon-${social} text-lg opacity-40 group-hover:opacity-100 transition-opacity`} />
                  </div>
                ))}
              </div>
          </div>

          {/* Quick Links Map */}
          <div className="lg:col-span-2 space-y-8 flex flex-col items-center lg:items-end">
             <h4 className="text-sm font-black uppercase tracking-[0.3em] text-[#1089A4]">التسوق</h4>
              <ul className="space-y-4 text-white/30 text-xs font-black uppercase tracking-widest text-center lg:text-right">
                <li><Link href="/shop" className="hover:text-white transition-colors">كافة المنتجات</Link></li>
                <li><Link href="/offers" className="hover:text-white transition-colors">عروض حصرية</Link></li>
                <li><Link href="/new" className="hover:text-white transition-colors">وصل حديثاً</Link></li>
                <li><Link href="/categories" className="hover:text-white transition-colors">الأقسام</Link></li>
             </ul>
          </div>

          <div className="lg:col-span-2 space-y-8 flex flex-col items-center lg:items-end">
             <h4 className="text-sm font-black uppercase tracking-[0.3em] text-[#F29124]">الدعم والمساعدة</h4>
              <ul className="space-y-4 text-white/30 text-xs font-black uppercase tracking-widest text-center lg:text-right">
                <li><Link href="/help" className="hover:text-white transition-colors">مركز المساعدة</Link></li>
                <li><Link href="/shipping" className="hover:text-white transition-colors">سياسة الشحن</Link></li>
                <li><Link href="/returns" className="hover:text-white transition-colors">الاسترجاع</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">اتصل بنا</Link></li>
             </ul>
          </div>

          {/* Newsletter / App Tier */}
          <div className="lg:col-span-4 space-y-10">
             <div className="bg-white/5 border border-white/10 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] space-y-6 md:space-y-8 text-center lg:text-right">
                <h4 className="text-xl font-black font-heading">اشترك في النشرة البريدية</h4>
                <p className="text-[11px] text-white/30 font-black uppercase tracking-widest">كن أول من يعرف بأحدث العروض والمنتجات الحصرية.</p>
                <div className="relative">
                   <input 
                    type="email" 
                    placeholder="بريدك الإلكتروني" 
                    className="w-full bg-[#021D24] border-2 border-white/5 rounded-2xl px-8 py-5 text-sm outline-none focus:border-[#1089A4] transition-all"
                   />
                   <button className="absolute left-2 top-2 bottom-2 bg-[#1089A4] text-white px-8 rounded-xl font-black text-[10px] uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all">انضم</button>
                </div>
             </div>
          </div>
        </div>

        {/* Bottom Tier */}
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
           <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">© 2024 MERSAL MARKETPLACE. ALL RIGHTS RESERVED.</p>
           <div className="flex items-center gap-6 md:gap-10 opacity-20 hover:opacity-100 transition-opacity flex-wrap justify-center font-black">
              <span className="text-[10px] uppercase tracking-[0.2em]">WE ACCEPT:</span>
              <div className="flex gap-4">
                 <div className="w-10 h-6 md:w-12 md:h-8 bg-white/10 rounded-md" />
                 <div className="w-10 h-6 md:w-12 md:h-8 bg-white/10 rounded-md" />
                 <div className="w-10 h-6 md:w-12 md:h-8 bg-white/10 rounded-md" />
              </div>
           </div>
        </div>
      </div>
    </footer>
  );
}
