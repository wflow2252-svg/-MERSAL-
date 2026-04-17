"use client"

import Link from "next/link";
import Image from "next/image";

const exploreLinks = [
  { label: "المتجر العام",    href: "/shop" },
  { label: "عروض السيادة",   href: "/offers" },
  { label: "أحدث الإضافات",  href: "/new" },
  { label: "كبار الموردين",  href: "/top-vendors" },
];

const supportLinks = [
  { label: "تواصل مباشر",    href: "/contact" },
  { label: "مركز المساعدة",  href: "/faq" },
  { label: "سياسة الخصوصية", href: "/privacy" },
  { label: "اتفاقية الخدمة", href: "/terms" },
];

const socials = [
  { id: "facebook",  icon: "facebook",  href: "#" },
  { id: "twitter",   icon: "twit",      href: "#" },
  { id: "instagram", icon: "instagram", href: "#" },
  { id: "youtube",   icon: "smart_display", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#011116] text-white relative border-t border-white/5 overflow-hidden" dir="rtl">

      {/* ── Newsletter Banner ── */}
      <div className="responsive-container relative z-30 -translate-y-1/2">
        <div className="bg-gradient-to-l from-[#1089A4]/10 to-[#021D24] p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#1089A4]/5 blur-[80px] rounded-full pointer-events-none" />
          <div className="flex flex-col gap-1 text-center lg:text-right relative z-10 flex-none">
            <h3 className="text-2xl md:text-3xl font-black font-heading tracking-tight text-white">
              انضم إلى مجتمع النخبة
            </h3>
            <p className="text-white/20 text-[9px] font-black uppercase tracking-[0.4em]">
              عروض حصرية • تحديثات فورية
            </p>
          </div>
          <div className="w-full lg:w-[50%] flex flex-col sm:flex-row gap-3 relative z-10">
            <input
              type="email"
              placeholder="بريدك الإلكتروني..."
              className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold text-white outline-none focus:border-[#F29124] transition-all placeholder:text-white/10 text-right"
            />
            <button className="bg-[#F29124] text-[#021D24] px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 flex-none shadow-lg">
              اشترك
              <span className="material-symbols-rounded text-lg">arrow_left</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Footer Grid ── */}
      <div className="responsive-container relative z-10 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-24 mb-16">

          {/* Col 1: Brand */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-right">
            <Link href="/" className="flex items-center gap-4 justify-end group w-fit mr-0 ml-auto">
              <div className="relative w-14 h-14 rounded-2xl bg-white p-2.5 shadow-xl group-hover:rotate-6 transition-all flex-none">
                <Image src="/logo.jpg" alt="Morsall" fill className="object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter uppercase font-heading text-white leading-none">Morsall</span>
                <span className="text-[9px] text-[#F29124] font-black uppercase tracking-[0.4em] mt-1">Premium Sovereignty</span>
              </div>
            </Link>

            <p className="text-white/20 text-[13px] leading-[1.8] font-medium max-w-xs mr-0 ml-auto">
              مرسال ليست مجرد متجر، هي تجسيد للسيادة التجارية في السودان. ننتقي النخبة لنقدمها للنخبة.
            </p>

            {/* Social Icons */}
            <div className="flex gap-2.5 justify-end mt-2">
              {[
                { label: "Facebook",  icon: "language", href: "#" },
                { label: "Twitter",   icon: "tag",      href: "#" },
                { label: "Instagram", icon: "photo_camera", href: "#" },
                { label: "YouTube",   icon: "smart_display", href: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-[#1089A4] transition-all group/s"
                >
                  <span className="material-symbols-rounded text-base text-white/20 group-hover/s:text-white transition-colors">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Links Group (Applying Proximity) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8 text-right">
             <div className="flex flex-col gap-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1089A4]">استكشاف</h4>
                <ul className="space-y-3">
                  {exploreLinks.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-white/25 text-[11px] font-bold hover:text-white transition-all uppercase tracking-wider">{l.label}</Link>
                    </li>
                  ))}
                </ul>
             </div>
             <div className="flex flex-col gap-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F29124]">الدعم</h4>
                <ul className="space-y-3">
                  {supportLinks.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-white/25 text-[11px] font-bold hover:text-white transition-all uppercase tracking-wider">{l.label}</Link>
                    </li>
                  ))}
                </ul>
             </div>
          </div>

          {/* Col 3: CTA */}
          <div className="lg:col-span-3 flex justify-start lg:justify-end">
             <Link
                href="/vendor/register"
                className="group flex flex-col gap-4 p-7 bg-white/5 border border-white/5 rounded-[2rem] hover:bg-white/10 transition-all text-right w-full"
             >
                <div className="w-10 h-10 rounded-xl bg-[#1089A4]/20 flex items-center justify-center text-[#1089A4] group-hover:scale-110 transition-transform">
                   <span className="material-symbols-rounded text-xl">add_business</span>
                </div>
                <div>
                   <h4 className="text-white font-black text-md">سجل كمورد</h4>
                   <p className="text-white/20 text-[10px] uppercase font-bold tracking-widest mt-1">ابدأ رحلتك النخبوية اليوم</p>
                </div>
             </Link>
          </div>

        </div>


        {/* ── Legal Bar ── */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 text-center">
              © 2024 MORSALL ELITE MARKET. ALL RIGHTS RESERVED.
            </p>
            <div className="hidden sm:block h-3 w-px bg-white/10" />
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#F29124]/40">
              Powered by Elite Sovereignty Engine
            </p>
          </div>

          {/* Payment / Security badges */}
          <div className="flex items-center gap-4">
            <span className="text-[8px] text-white/15 font-black uppercase tracking-widest hidden lg:block">SECURE:</span>
            {["lock", "verified_user", "shield", "security"].map((ic) => (
              <div key={ic} className="w-9 h-7 bg-white/5 rounded-lg border border-white/8 flex items-center justify-center hover:bg-white/10 transition-all">
                <span className="material-symbols-rounded text-[13px] text-white/20">{ic}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background glow effects */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#1089A4]/5 blur-[120px] rounded-full pointer-events-none translate-x-1/4 translate-y-1/4" />
      <div className="absolute top-[30%] left-[-5%] w-[350px] h-[350px] bg-[#F29124]/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-100vh] left-0 w-full h-[100vh] bg-[#011116] pointer-events-none" />
    </footer>
  );
}
