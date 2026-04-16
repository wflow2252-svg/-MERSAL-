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
        <div className="bg-gradient-to-l from-[#1089A4]/20 to-[#021D24] p-10 md:p-14 rounded-[3rem] border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.4)] flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#1089A4]/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="flex flex-col gap-2 text-center lg:text-right relative z-10 flex-none">
            <h3 className="text-3xl md:text-4xl font-black font-heading tracking-tighter text-white">
              انضم إلى مجتمع النخبة
            </h3>
            <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.5em]">
              حصري • عروض يومية • تحديثات فورية
            </p>
          </div>
          <div className="w-full lg:w-[55%] flex flex-col sm:flex-row gap-4 relative z-10">
            <input
              type="email"
              placeholder="بريدك الإلكتروني..."
              className="flex-grow bg-white/5 border-2 border-white/10 rounded-[2rem] px-8 py-5 text-sm font-black text-white outline-none focus:border-[#F29124] focus:bg-white/10 transition-all placeholder:text-white/20 text-right"
            />
            <button className="bg-[#F29124] text-[#021D24] px-10 py-5 rounded-[2rem] font-black text-[12px] uppercase tracking-[0.3em] hover:scale-105 hover:shadow-[0_20px_40px_rgba(242,145,36,0.35)] active:scale-95 transition-all flex items-center justify-center gap-3 flex-none border-b-4 border-black/20 shadow-xl">
              اشترك
              <span className="material-symbols-rounded text-xl">arrow_left</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Footer Grid ── */}
      <div className="responsive-container relative z-10 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">

          {/* Col 1: Brand */}
          <div className="lg:col-span-4 flex flex-col gap-8 text-right">
            <Link href="/" className="flex items-center gap-5 justify-end group w-fit mr-0 ml-auto">
              <div className="relative w-16 h-16 rounded-[1.5rem] bg-white p-3 shadow-2xl group-hover:rotate-6 group-hover:scale-105 transition-all flex-none">
                <Image src="/logo.jpg" alt="Morsall" fill className="object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black tracking-tighter uppercase font-heading text-white leading-none">Morsall</span>
                <span className="text-[10px] text-[#F29124] font-black uppercase tracking-[0.5em] mt-1">Premium Sovereignty</span>
              </div>
            </Link>

            <p className="text-white/30 text-sm leading-[2] font-medium max-w-xs mr-0 ml-auto">
              مرسال ليست مجرد متجر، هي تجسيد للسيادة التجارية في السودان. ننتقي النخبة لنقدمها للنخبة.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 justify-end flex-wrap">
              {[
                { label: "Facebook",  icon: "language", href: "#" },
                { label: "Twitter",   icon: "tag",      href: "#" },
                { label: "Instagram", icon: "photo_camera", href: "#" },
                { label: "YouTube",   icon: "smart_display", href: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#1089A4] hover:border-[#1089A4] hover:shadow-[0_0_24px_rgba(16,137,164,0.4)] hover:scale-110 active:scale-95 transition-all group/s"
                >
                  <span className="material-symbols-rounded text-[18px] text-white/40 group-hover/s:text-white transition-colors">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Explore */}
          <div className="lg:col-span-2 flex flex-col gap-8 text-right">
            <div className="flex items-center gap-3 justify-end">
              <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#1089A4]">استكشاف المنصة</h4>
              <div className="w-1.5 h-1.5 rounded-full bg-[#1089A4]" />
            </div>
            <ul className="space-y-4">
              {exploreLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/30 text-xs font-black uppercase tracking-[0.2em] hover:text-white hover:translate-x-[-4px] transition-all inline-flex items-center gap-2 group/link"
                  >
                    <span className="material-symbols-rounded text-sm opacity-0 group-hover/link:opacity-100 transition-opacity text-[#1089A4]">chevron_left</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Support */}
          <div className="lg:col-span-2 flex flex-col gap-8 text-right">
            <div className="flex items-center gap-3 justify-end">
              <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#F29124]">الدعم السيادي</h4>
              <div className="w-1.5 h-1.5 rounded-full bg-[#F29124]" />
            </div>
            <ul className="space-y-4">
              {supportLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/30 text-xs font-black uppercase tracking-[0.2em] hover:text-white hover:translate-x-[-4px] transition-all inline-flex items-center gap-2 group/link"
                  >
                    <span className="material-symbols-rounded text-sm opacity-0 group-hover/link:opacity-100 transition-opacity text-[#F29124]">chevron_left</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Join CTA */}
          <div className="lg:col-span-4 flex items-start justify-start lg:justify-end">
            <div className="w-full max-w-sm bg-gradient-to-br from-white/[0.07] to-transparent p-8 rounded-[2.5rem] border border-white/10 text-right space-y-5 shadow-2xl relative overflow-hidden group/box hover:border-[#1089A4]/30 transition-all">
              {/* Accent bar */}
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-[#1089A4] to-[#F29124] rounded-full opacity-60" />

              {/* Decorative icon */}
              <span className="material-symbols-rounded text-[80px] text-white/5 absolute bottom-4 left-4 pointer-events-none">storefront</span>

              <div className="flex items-center gap-3 justify-end">
                <h4 className="text-xl font-black text-white">هل تود الانضمام؟</h4>
                <span className="w-8 h-8 rounded-xl bg-[#1089A4]/20 flex items-center justify-center">
                  <span className="material-symbols-rounded text-sm text-[#1089A4]">add_business</span>
                </span>
              </div>

              <p className="text-[11px] text-white/30 font-black uppercase tracking-widest leading-loose">
                كن جزءاً من منظومة مرسال وابدأ رحلة تجارتك النخبوية اليوم.
              </p>

              <Link
                href="/vendor/register"
                className="inline-flex gap-3 items-center bg-[#1089A4] text-white text-[11px] font-black uppercase tracking-[0.3em] px-7 py-4 rounded-[1.5rem] hover:bg-[#0d7a8e] hover:shadow-[0_12px_32px_rgba(16,137,164,0.4)] hover:scale-105 active:scale-95 transition-all border-b-4 border-black/20 shadow-lg"
              >
                <span className="material-symbols-rounded text-base">arrow_back</span>
                سجل كمورد الآن
              </Link>
            </div>
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
