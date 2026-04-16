"use client"

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const wallItems = [
  { 
    id: "electronics", 
    name: "الإلكترونيات", 
    icon: "smartphone",
    sub: "أحدث التقنيات العالمية", 
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=1200", 
    span: "md:col-span-2 md:row-span-2",
  },
  { 
    id: "fashion", 
    name: "الأزياء", 
    icon: "checkroom",
    sub: "كوليكشن خريف 2024", 
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=800", 
    span: "md:col-span-1 md:row-span-1",
  },
  { 
    id: "home", 
    name: "المنزل", 
    icon: "kitchen",
    sub: "أناقة عصرية لكل زاوية", 
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800", 
    span: "md:col-span-1 md:row-span-1",
  },
  { 
    id: "beauty", 
    name: "الساعات", 
    icon: "watch",
    sub: "فخامة خالدة", 
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200", 
    span: "md:col-span-2 md:row-span-1",
  }
];

export default function CategoryWall() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="responsive-container">
        {/* Compact Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 border-b border-border/10 pb-8">
           <div className="flex flex-col gap-2 text-right">
              <div className="flex items-center justify-end gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40">
                 اكتشف المجموعات <span className="w-8 h-0.5 bg-secondary rounded-full" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight leading-tight font-heading">
                 تسوق حسب <span className="text-primary">الأقسام</span>
              </h2>
           </div>
           
           <Link href="/categories" className="group flex items-center gap-3 text-xs font-bold text-foreground/40 hover:text-primary transition-colors">
              <span>عرض الكل</span>
              <span className="material-symbols-rounded bg-muted text-primary p-2 rounded-full group-hover:bg-primary group-hover:text-white transition-all">north_east</span>
           </Link>
        </div>

        {/* Compact Organized Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {/* Main Hero Category */}
           <Link 
            href={`/category/${wallItems[0].id}`}
            className="md:col-span-2 group relative h-[300px] md:h-[500px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-elite-lg transition-all duration-700 hover:scale-[1.01]"
          >
            <Image src={wallItems[0].image} alt={wallItems[0].name} fill className="object-cover transition-transform duration-[2s] group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 p-10 md:p-16 flex flex-col justify-end text-right">
               <div className="flex items-center justify-end gap-3 mb-4">
                  <span className="text-white/60 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em]">{wallItems[0].sub}</span>
                  <span className="material-symbols-rounded text-white text-lg">{wallItems[0].icon}</span>
               </div>
               <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-8 md:mb-12 font-heading leading-tight">{wallItems[0].name}</h3>
               <button className="bg-white/10 backdrop-blur-md text-white h-14 px-12 rounded-xl w-fit mr-auto border border-white/20 font-black text-sm uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all shadow-2xl flex items-center justify-center">
                 استكشف
               </button>
            </div>
          </Link>

          {/* Side Stack */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
             {wallItems.slice(1, 3).map((item, i) => (
                 <Link 
                  key={i} 
                  href={`/category/${item.id}`}
                  className="group relative h-[250px] md:h-[235px] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-medium"
                >
                  <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-[2s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end text-right">
                     <div className="flex items-center justify-end gap-3 mb-6">
                        <h3 className="text-xl md:text-2xl font-black text-white font-heading tracking-tight">{item.name}</h3>
                        <span className="material-symbols-rounded text-white/50 text-md">{item.icon}</span>
                     </div>
                     <button className="bg-white/10 backdrop-blur-md text-white h-12 px-8 rounded-xl w-fit mr-auto border border-white/20 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 duration-500">
                        استكشف
                     </button>
                  </div>
                </Link>
             ))}
             {/* Wide Bottom Item in the side stack */}
              <Link 
                href={`/category/${wallItems[3].id}`}
                className="col-span-1 sm:col-span-2 group relative h-[200px] md:h-[235px] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-medium"
              >
                <Image src={wallItems[3].image} alt={wallItems[3].name} fill className="object-cover transition-transform duration-[2s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end text-right">
                   <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                      <button className="bg-white/10 backdrop-blur-md text-white h-12 px-10 rounded-xl w-fit mr-auto border border-white/20 font-black text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all shadow-xl flex items-center justify-center">
                         استكشف
                      </button>
                      <div className="flex items-center justify-end gap-3">
                         <div className="flex flex-col">
                            <span className="text-secondary text-[10px] font-bold tracking-widest mb-1 uppercase">{wallItems[3].sub}</span>
                            <h3 className="text-2xl md:text-3xl font-black text-white font-heading tracking-tight">{wallItems[3].name}</h3>
                         </div>
                         <span className="material-symbols-rounded text-white/40 text-2xl">{wallItems[3].icon}</span>
                      </div>
                   </div>
                </div>
              </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

