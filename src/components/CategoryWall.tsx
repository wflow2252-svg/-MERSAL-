"use client"

import Link from "next/link";
import Image from "next/image";

const CATS = [
  { id: "electronics", name: "الإلكترونيات", img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=400" },
  { id: "fashion",     name: "الأزياء والملابس", img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=400" },
  { id: "home",        name: "المنزل والمطبخ", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=400" },
  { id: "beauty",      name: "الجمال والعناية", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=400" },
  { id: "watches",     name: "الساعات الفاخرة", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400" },
  { id: "sports",      name: "الرياضة",   img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400" },
  { id: "food",        name: "الأغذية",   img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400" },
  { id: "toys",        name: "الألعاب",   img: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&q=80&w=400" },
];

export default function CategoryWall() {
  return (
    <section className="bg-[#F3F4F6] py-6" dir="rtl">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6">

        {/* ── Amazon-style category cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {CATS.map(cat => (
            <Link
              key={cat.id}
              href={`/category/${cat.id}`}
              className="bg-white rounded-lg p-3 text-center hover:shadow-md border border-gray-200 hover:border-[#1089A4] transition-all group"
            >
              <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-2">
                <Image
                  src={cat.img}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-[11px] font-black text-[#021D24] group-hover:text-[#1089A4] transition-colors leading-tight">
                {cat.name}
              </p>
            </Link>
          ))}
        </div>

        {/* ── 4-box deal grid (Amazon-style) ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {[
            {
              title: "🔥 عروض اليوم",
              sub: "لحق قبل ما تخلص",
              bg: "bg-white",
              accent: "#E53E3E",
              img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400",
              href: "/offers",
              cta: "شوف كل العروض",
            },
            {
              title: "ابدأ تجارتك مع مرسال",
              sub: "متجرك على بُعد دقيقتين",
              bg: "bg-white",
              accent: "#1089A4",
              img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=400",
              href: "/vendor/register",
              cta: "اعرض منتجاتك الآن",
            },
            {
              title: "وصل جديد 🆕",
              sub: "أحدث المنتجات في السودان",
              bg: "bg-white",
              accent: "#F29124",
              img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400",
              href: "/shop?sort=new",
              cta: "اكتشف الجديد",
            },
            {
              title: "كبار الموردين",
              sub: "أكثر من مورد موثوق",
              bg: "bg-white",
              accent: "#6B46C1",
              img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=400",
              href: "/top-vendors",
              cta: "تعرّف عليهم",
            },
          ].map((box, i) => (
            <div key={i} className={`${box.bg} rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow overflow-hidden relative`}>
              <h3 className="font-black text-sm text-[#021D24] mb-1 leading-tight">{box.title}</h3>
              <p className="text-xs text-gray-500 mb-3">{box.sub}</p>
              <div className="relative w-full h-48 rounded-lg overflow-hidden mb-3">
                <Image src={box.img} alt={box.title} fill className="object-cover" />
              </div>
              <Link
                href={box.href}
                className="text-xs font-bold hover:underline"
                style={{ color: box.accent }}
              >
                {box.cta}
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
