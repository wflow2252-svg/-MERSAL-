import ProductCard from "@/components/ProductCard";
import ShopFilters from "@/components/ShopFilters";
import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function ShopPage(props: {
  searchParams: Promise<{ q?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams.q;

  const dbProducts = await prisma.product.findMany({
    where: query ? {
      OR: [
        { title: { contains: query } },
        { description: { contains: query } },
      ],
      status: "APPROVED"
    } : {
      status: "APPROVED"
    },
    include: {
      vendor: true
    }
  });

  const products = dbProducts.map(p => ({
    id: p.id,
    title: p.title,
    price: p.price,
    vendor: p.vendor.storeName,
    location: p.vendor.location,
    image: (p.images && p.images.length > 0) ? p.images.split(',')[0] : "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800",
    badge: p.purchaseCount > 5 ? "الأكثر مبيعاً" : undefined
  }));

  return (
    <div className="min-h-screen bg-muted/20 pb-44">
      {/* Shop Header - Modern Razor UI */}
      <section className="bg-white px-4 md:px-12 py-12 md:py-20 border-b border-border/50 relative overflow-hidden pt-32 md:pt-44">
         <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row items-end justify-between gap-12 relative z-10">
            <div className="space-y-4 md:space-y-6">
               <div className="flex items-center gap-4 text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-[#1089A4]">
                  <span className="w-8 md:w-10 h-1 bg-[#F29124] rounded-full" /> MERSAL ELITE SHOP
               </div>
               <h1 className="text-4xl md:text-7xl font-black text-[#021D24] tracking-tighter font-heading border-r-8 md:border-r-12 border-[#F29124] pr-6 md:pr-10 leading-tight">
                 {query ? (
                   <>نتائج البحث عن: <br /> <span className="text-[#1089A4]">{query}</span></>
                 ) : (
                   <>استكشف الكتالوج <br /> <span className="text-[#1089A4]">العـام والشامل</span></>
                 )}
               </h1>
            </div>
            <div className="flex flex-col items-center md:items-end gap-6 w-full md:w-auto">
                <nav className="hidden md:flex items-center gap-4 text-xs font-black uppercase tracking-widest text-[#021D24]/20">
                    <Link href="/" className="hover:text-[#F29124] transition-colors">الرئيسية</Link>
                    <span>/</span>
                    <span className="text-[#021D24]">المتجر</span>
                </nav>
                <div className="btn-motta-ghost px-6 md:px-10 py-3 md:py-4 border-2 border-white/50 shadow-xl w-full md:w-auto">
                    <span className="material-symbols-rounded text-[#1089A4]">sort</span>
                    <span className="text-[10px] md:text-sm font-black uppercase tracking-widest text-[#021D24]/60">{products.length} منتجات متوفرة حالياً</span>
                </div>
            </div>
         </div>
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F29124]/5 blur-[200px] rounded-full pointer-events-none" />
      </section>

      <div className="max-w-[1920px] mx-auto px-4 md:px-12 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
        <aside className="lg:col-span-3 hidden lg:block">
           <ShopFilters />
        </aside>

        <main className="lg:col-span-9 space-y-12 md:space-y-16">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-14">
                {products.map((p) => (
                  <ProductCard key={p.id} {...p} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-[4rem] p-32 text-center space-y-10 border-4 border-dashed border-border/50">
                 <span className="material-symbols-rounded text-9xl text-[#021D24]/10">search_off</span>
                 <div className="space-y-4">
                    <h2 className="text-5xl font-black text-[#021D24] tracking-tighter font-heading">لم نجد أي نتائج</h2>
                    <p className="text-xl font-medium text-[#021D24]/30">جرب البحث بكلمات مختلفة أو تصفح الأقسام العامة</p>
                 </div>
                 <Link href="/shop" className="btn-motta-primary px-20 py-7 rounded-[2.5rem] tracking-[0.4em]">عرض كافة المنتجات</Link>
              </div>
            )}

            <div className="flex items-center justify-center gap-4 pt-20">
               <button className="w-14 h-14 btn-motta-ghost opacity-40 cursor-not-allowed"><span className="material-symbols-rounded">chevron_right</span></button>
               <button className="w-14 h-14 btn-motta-primary shadow-2xl shadow-[#1089A4]/30 border-b-4 border-black/10">1</button>
               <button className="w-14 h-14 btn-motta-ghost hover:text-[#1089A4]">2</button>
               <button className="w-14 h-14 btn-motta-ghost hover:scale-110 active:scale-95 text-[#1089A4]"><span className="material-symbols-rounded">chevron_left</span></button>
            </div>
        </main>
      </div>
    </div>
  );
}
