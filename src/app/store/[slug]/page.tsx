import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function VendorStorePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const vendor = await prisma.vendor.findUnique({
    where: { slug },
    include: {
      user: true,
      products: {
        where: { status: "APPROVED" },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!vendor) notFound();

  const isExpired = vendor.subscriptionEndsAt ? new Date(vendor.subscriptionEndsAt) < new Date() : true;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header / Hero */}
        <div className="relative bg-[#021D24] text-white py-16 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center font-black text-4xl text-white shadow-2xl">
              {vendor.storeName[0].toUpperCase()}
            </div>
            <div className="text-center md:text-right">
              <h1 className="text-4xl font-black mb-2">{vendor.storeName}</h1>
              <p className="text-white/60 max-w-xl leading-relaxed">{vendor.storeDescription || "مرحباً بكم في متجرنا على منصة مرسال. نحن ملتزمون بتقديم أفضل المنتجات بأفضل الأسعار."}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
                <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2">
                  <span className="material-symbols-rounded text-sm text-[#F29124]">inventory_2</span>
                  <span className="text-xs font-bold">{vendor.products.length} منتج</span>
                </div>
                <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2">
                  <span className="material-symbols-rounded text-sm text-[#1089A4]">location_on</span>
                  <span className="text-xs font-bold">{vendor.location || "السودان"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {isExpired ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200 shadow-sm max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-rounded text-4xl">lock</span>
              </div>
              <h2 className="text-2xl font-black text-[#021D24] mb-3">المتجر مغلق مؤقتاً</h2>
              <p className="text-gray-500 font-medium leading-relaxed">
                نعتذر لكم، هذا المتجر مغلق حالياً بسبب انتهاء فترة الاشتراك. 
                يرجى العودة لاحقاً أو استكشاف متاجر أخرى على المنصة.
              </p>
              <div className="mt-8">
                <a href="/" className="inline-flex items-center gap-2 bg-[#1089A4] text-white px-8 py-3 rounded-xl font-black text-sm shadow-xl shadow-[#1089A4]/20 hover:scale-105 transition-all">
                  استكشاف المتاجر الأخرى
                </a>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-[#021D24]">منتجات المتجر</h2>
                <div className="bg-white px-4 py-2 rounded-xl border text-xs font-bold text-gray-500">
                  فرز حسب: الأحدث
                </div>
              </div>

              {vendor.products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {vendor.products.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      id={product.id}
                      title={product.title}
                      price={product.price}
                      image={product.images ? product.images.split(',')[0] : ''}
                      vendor={vendor.storeName}
                      vendorLocation={vendor.location || "السودان"}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
                  <span className="material-symbols-rounded text-6xl text-gray-100 mb-4 block">inventory_2</span>
                  <p className="text-gray-400 font-bold">لا يوجد منتجات متاحة حالياً في هذا المتجر</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
