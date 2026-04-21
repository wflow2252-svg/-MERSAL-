"use client"

import { useParams } from "next/navigation";
import { getProductById, getRelatedProducts, getVendorUpsells } from "@/lib/mockData/products";
import ProductGallery from "@/components/product/ProductGallery";
import ProductDetails from "@/components/product/ProductDetails";
import StickyCartBar from "@/components/product/StickyCartBar";
import RelatedUpsell from "@/components/product/RelatedUpsell";
import ProductCard from "@/components/ProductCard";

import PurchaseBox from "@/components/product/PurchaseBox";

export default function ProductPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "iphone-15-pm";
  const product = getProductById(id);
  const related = getRelatedProducts(product.categoryId, product.id);
  const vendorUpsells = getVendorUpsells(product.vendor, product.id);

  return (
    <div className="min-h-screen bg-white pb-44" dir="rtl">
      {/* Breadcrumbs - Dynamic */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-10 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-[#021D24]/20 pt-44">
         <Link href="/" className="hover:text-[#1089A4] transition-colors cursor-pointer">الرئيسية</Link>
         <span className="material-symbols-rounded text-sm">chevron_left</span>
         <Link href={`/category/${product.categoryId}`} className="hover:text-[#1089A4] transition-colors cursor-pointer">{product.category}</Link>
         <span className="material-symbols-rounded text-sm">chevron_left</span>
         <span className="text-[#021D24]">{product.title}</span>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Pillar 1: Purchase Box (Left/Sticky) */}
        <div className="lg:col-span-3 order-3 lg:order-1">
           <PurchaseBox product={product} />
        </div>

        {/* Pillar 2: Info Deep-Dive (Middle) */}
        <div className="lg:col-span-5 lg:order-2 order-2">
           <ProductDetails product={product} />
        </div>

        {/* Pillar 3: Gallery (Right) */}
        <div className="lg:col-span-4 lg:order-3 order-1">
           <ProductGallery images={[product.image]} />
        </div>
      </div>

      {/* Synthesis Section: Related & Upsell */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mt-32 space-y-32">
         {/* Motta Deep-Dive: Frequently Bought Together (Same Store Bundle) */}
         <RelatedUpsell mainProduct={product} upsellProducts={vendorUpsells} />

         {/* Discovery Tier: Related Products */}
         <div className="space-y-16">
            <div className="flex items-end justify-between border-b-4 border-border/30 pb-12">
               <h3 className="text-5xl font-black text-[#021D24] tracking-tighter font-heading">منتجات <span className="text-[#1089A4]">قد تعجبك</span></h3>
               <Link href="/shop" className="text-sm font-black uppercase tracking-widest text-[#F29124] flex items-center gap-3">استكشف المزيد <span className="material-symbols-rounded">trending_flat</span></Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
               {related.map(p => (
                 <ProductCard key={p.id} {...p} />
               ))}
            </div>
         </div>
      </div>

      <StickyCartBar product={product} />
    </div>
  );
}

import Link from "next/link";

