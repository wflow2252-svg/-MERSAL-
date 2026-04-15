"use client"

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const wallItems = [
  { 
    id: "electronics", 
    name: "إلكترونيات المستقبل", 
    sub: "أحدث التقنيات العالمية في متناول يدك", 
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=1200", 
    span: "md:col-span-2 md:row-span-2",
    color: "from-blue-600/20 to-transparent"
  },
  { 
    id: "fashion", 
    name: "الموضة والأزياء", 
    sub: "كوليكشن خريف 2024 الحصري", 
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=800", 
    span: "md:col-span-1 md:row-span-1",
    color: "from-pink-600/20 to-transparent"
  },
  { 
    id: "home", 
    name: "ديكور المنزل", 
    sub: "أناقة عصرية لكل زاوية", 
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800", 
    span: "md:col-span-1 md:row-span-1",
    color: "from-orange-600/20 to-transparent"
  },
  { 
    id: "beauty", 
    name: "الساعات والمجوهرات", 
    sub: "فخامة خالدة تزين معصمك", 
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200", 
    span: "md:col-span-2 md:row-span-1",
    color: "from-purple-600/20 to-transparent"
  }
];

export default function CategoryWall() {
  return (
    <section className="py-16 md:py-32 bg-white">
      <div className="responsive-container">
        {/* Refined Header: Perfect Alignment */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 border-b border-border/10 pb-12">
           <div className="flex flex-col gap-4 text-right">
              <div className="flex items-center justify-end gap-3 text-[11px] font-black uppercase tracking-[0.4em] text-[#1089A4]">
                 BROWSE COLLECTIONS <span className="w-12 h-1 bg-[#F29124] rounded-full" />
              </div>
              <h2 className="text-3xl md:text-7xl font-black text-[#021D24] tracking-tighter leading-tight font-heading">
                 تسوق حسب <span className="text-[#1089A4]">الأقسام</span>
              </h2>
           </div>
           
           <Link href="/categories" className="group flex items-center gap-4 md:gap-6 bg-muted px-8 md:px-10 py-4 md:py-5 rounded-[2rem] hover:bg-[#1089A4] transition-all duration-500">
              <span className="text-[10px] md:text-xs font-black text-[#021D24] group-hover:text-white uppercase tracking-widest">عرض الكل</span>
              <span className="material-symbols-rounded bg-white text-[#1089A4] p-2 md:p-2.5 rounded-full group-hover:rotate-[-45deg] transition-all shadow-lg">trending_flat</span>
           </Link>
        </div>

        {/* Organized Grid: Clean 2x2 with specific spans */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Main Hero Category */}
           <Link 
            href={`/category/${wallItems[0].id}`}
            className="md:col-span-2 group relative h-[350px] md:h-[700px] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl transition-all duration-1000 hover:scale-[1.01]"
          >
            <Image src={wallItems[0].image} alt={wallItems[0].name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 p-12 flex flex-col justify-end text-right">
               <p className="text-[#F29124] text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-2 md:mb-4">{wallItems[0].sub}</p>
               <h3 className="text-2xl md:text-6xl font-black text-white tracking-tighter mb-4 md:mb-6 font-heading">{wallItems[0].name}</h3>
               <button className="bg-white/10 backdrop-blur-xl text-white px-8 py-4 rounded-2xl w-fit mr-auto border border-white/20 font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-[#021D24] transition-all">اكتشف الآن</button>
            </div>
          </Link>

          {/* Side Stack */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
             {wallItems.slice(1, 3).map((item, i) => (
                 <Link 
                  key={i} 
                  href={`/category/${item.id}`}
                  className="group relative h-[250px] md:h-[334px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-xl"
                >
                  <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute inset-0 p-10 flex flex-col justify-end text-right">
                     <h3 className="text-2xl font-black text-white font-heading">{item.name}</h3>
                     <span className="text-[9px] text-white/40 font-bold uppercase tracking-widest mt-2">تسوق المجموعة</span>
                  </div>
                </Link>
             ))}
             {/* Wide Bottom Item in the side stack */}
              <Link 
                href={`/category/${wallItems[3].id}`}
                className="col-span-1 sm:col-span-2 group relative h-[250px] md:h-[334px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-xl"
              >
                <Image src={wallItems[3].image} alt={wallItems[3].name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute inset-0 p-10 flex flex-col justify-end text-right">
                   <p className="text-[#F29124] text-[9px] font-black tracking-widest mb-2">{wallItems[3].sub}</p>
                   <h3 className="text-3xl font-black text-white font-heading">{wallItems[3].name}</h3>
                </div>
              </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
