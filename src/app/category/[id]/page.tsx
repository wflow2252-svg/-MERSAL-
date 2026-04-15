"use client"

import { useParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import ShopFilters from "@/components/ShopFilters";
import Link from "next/link";
import Image from "next/image";

const categoriesData: any = {
  "electronics": { name: "الإلكترونيات والموبايل", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=1200", icon: "smartphone" },
  "fashion": { name: "الأزياء والملابس", image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1200", icon: "apparel" },
  "home": { name: "المنزل والمطبخ", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200", icon: "home" },
  "beauty": { name: "الجمال والعناية الشخصية", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200", icon: "content_cut" },
  "toys": { name: "الألعاب وتسلية الأطفال", image: "https://images.unsplash.com/photo-1532330393533-443990a51d10?auto=format&fit=crop&q=80&w=1200", icon: "toys" },
  "sports": { name: "الرياضة واللياقة البدنية", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200", icon: "fitness_center" },
  "books": { name: "الكتب والقرطاسية", image: "https://images.unsplash.com/photo-1524578271613-d550eeb8489e?auto=format&fit=crop&q=80&w=1200", icon: "menu_book" },
  "automotive": { name: "قطع غيار السيارات", image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=1200", icon: "build" },
};

const products = [
  { id: "e1", title: "سماعات سوني الفاخرة", price: 185000, vendor: "تكنو زون", location: "الخرطوم", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800", cat: "electronics" },
  { id: "e2", title: "آيفون 15 بريميوم", price: 980000, vendor: "مرسال جادجتس", location: "الخرطوم", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800", cat: "electronics" },
  { id: "f1", title: "قميص صيفي أنيق", price: 45000, vendor: "نخبة الأزياء", location: "الرياض", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800", cat: "fashion" },
];

export default function CategoryPage() {
  const params = useParams();
  const id = params.id as string;
  const category = categoriesData[id] || categoriesData["0"];
  
  const filteredProducts = products.filter(p => p.cat === id);

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Category Hero - High Impact */}
      <section className="relative h-[450px] overflow-hidden bg-[#021D24] border-b-[12px] border-white shadow-2xl">
        <Image src={category.image} alt={category.name} fill className="object-cover opacity-30 scale-110 blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#021D24] to-transparent z-10" />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-12 text-center">
           <div className="w-24 h-24 bg-[#1089A4] rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl border-4 border-white/10">
              <span className="material-symbols-rounded text-5xl text-white">{category.icon}</span>
           </div>
           <h1 className="text-7xl font-black text-white tracking-tighter font-heading mb-6">{category.name}</h1>
           <div className="flex items-center gap-4 text-white/50 text-sm font-black uppercase tracking-[0.4em]">
              <Link href="/" className="hover:text-[#F29124] transition-colors">الرئيسية</Link>
              <span className="text-[#1089A4]">/</span>
              <span>{category.name}</span>
           </div>
        </div>
      </section>

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Elite Sidebar Filters */}
        <aside className="lg:col-span-3 space-y-12">
           <ShopFilters />
        </aside>

        {/* Product Hub */}
        <main className="lg:col-span-9 space-y-12">
            <div className="bg-white px-12 py-6 rounded-[2.5rem] border-4 border-white shadow-xl flex items-center justify-between">
                <p className="text-[#021D24]/40 text-sm font-black uppercase tracking-widest">
                   عرض <span className="text-[#1089A4]">{filteredProducts.length}</span> منتج تم اختيارهم بعناية
                </p>
                <div className="flex items-center gap-6">
                   <span className="text-[10px] font-black uppercase tracking-widest text-[#021D24]/20 underline underline-offset-8">ترتيب حسب:</span>
                   <select className="bg-muted px-6 py-2 rounded-xl text-xs font-black outline-none border-2 border-transparent focus:border-[#1089A4] transition-all">
                      <option>الأحدث أولاً</option>
                      <option>السعر: من الأقل</option>
                      <option>السعر: من الأعلى</option>
                   </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-full py-40 text-center">
                   <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mx-auto mb-10">
                      <span className="material-symbols-rounded text-6xl text-[#021D24]/10">inventory_2</span>
                   </div>
                   <h3 className="text-4xl font-black text-[#021D24] mb-4">لا توجد منتجات حالياً</h3>
                   <p className="text-xl text-[#021D24]/30">نحن نعمل على إضافة منتجات فاخرة لهذا القسم قريباً.</p>
                </div>
              )}
            </div>
        </main>
      </div>
    </div>
  );
}
