"use client"

import ProductGallery from "@/components/product/ProductGallery";
import ProductDetails from "@/components/product/ProductDetails";
import StickyCartBar from "@/components/product/StickyCartBar";
import RelatedUpsell from "@/components/product/RelatedUpsell";
import ProductCard from "@/components/ProductCard";

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-muted/20 pb-44">
      {/* Breadcrumbs - Elite UI */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-10 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-[#021D24]/20 pt-44">
         <span className="hover:text-[#1089A4] transition-colors cursor-pointer">الرئيسية</span>
         <span className="material-symbols-rounded text-sm">chevron_left</span>
         <span className="hover:text-[#1089A4] transition-colors cursor-pointer">الإلكترونيات</span>
         <span className="material-symbols-rounded text-sm">chevron_left</span>
         <span className="text-[#021D24]">آيفون 15 برو ماكس</span>
      </div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-20">
        {/* Gallery Pillar */}
        <div className="lg:col-span-7">
           <ProductGallery />
        </div>

        {/* Info Pillar */}
        <div className="lg:col-span-5">
           <ProductDetails />
        </div>
      </div>

      {/* Synthesis Section: Related & Upsell */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 mt-32 space-y-32">
         {/* Motta Deep-Dive: Frequently Bought Together */}
         <RelatedUpsell />

         {/* Discovery Tier: Related Products */}
         <div className="space-y-16">
            <div className="flex items-end justify-between border-b-4 border-border/30 pb-12">
               <h3 className="text-5xl font-black text-[#021D24] tracking-tighter font-heading">منتجات <span className="text-[#1089A4]">قد تعجبك</span></h3>
               <button className="text-sm font-black uppercase tracking-widest text-[#F29124] flex items-center gap-3">استكشف المزيد <span className="material-symbols-rounded">trending_flat</span></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
               <ProductCard id="r1" title="آبل واتش سيريز 9" price={165000} vendor="مرسال جادجتس" location="الخرطوم" image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800" badge="جديد" />
               <ProductCard id="r2" title="آبل AirPods Pro" price={85000} vendor="مرسال جادجتس" location="الخرطوم" image="https://images.unsplash.com/photo-1588423770674-f2855ee476e7?auto=format&fit=crop&q=80&w=800" badge="الأكثر مبيعاً" />
               <ProductCard id="r3" title="شاحن ماغ سيف الأصلي" price={25000} vendor="مرسال جادجتس" location="الخرطوم" image="https://images.unsplash.com/photo-1620288627223-53302f4e8c74?auto=format&fit=crop&q=80&w=800" />
               <ProductCard id="r4" title="آيباد آير M2 الجديد" price={285000} vendor="مرسال جادجتس" location="الخرطوم" image="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800" discount={5} />
            </div>
         </div>
      </div>

      <StickyCartBar />
    </div>
  );
}
