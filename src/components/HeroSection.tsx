"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const categories = [
  { name: "الإلكترونيات", icon: "smartphone", id: "electronics" },
  { name: "الأزياء", icon: "checkroom", id: "fashion" },
  { name: "المنزل", icon: "kitchen", id: "home" },
  { name: "الجمال", icon: "face", id: "beauty" },
  { name: "الألعاب", icon: "toys", id: "toys" },
  { name: "العروض", icon: "bolt", id: "offers" }
];

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1400",
    "https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?auto=format&fit=crop&q=80&w=1400",
    "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=1400",
  ];

  return (
    <section className="bg-white py-10">
      <div className="responsive-container flex flex-col lg:flex-row gap-8">
        
        {/* Simplified Categories Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
             <div className="bg-primary text-white p-4 font-bold text-center">أقسام المتجر</div>
             <div className="flex flex-col">
                {categories.map((cat) => (
                  <Link key={cat.id} href={`/category/${cat.id}`} className="flex items-center gap-4 px-6 py-4 hover:bg-muted transition-all border-b border-border last:border-0 group">
                     <span className="material-symbols-rounded text-primary/40 group-hover:text-primary transition-colors">{cat.icon}</span>
                     <span className="text-sm font-bold text-primary/70">{cat.name}</span>
                  </Link>
                ))}
             </div>
          </div>
        </div>

        {/* Simplified Slider */}
        <div className="lg:w-3/4">
          <div className="relative h-[300px] md:h-[500px] rounded-3xl overflow-hidden bg-primary group shadow-lg">
             <Image 
               src={heroImages[activeSlide]} 
               alt="Hero" 
               fill 
               className="object-cover opacity-70" 
               priority 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
             
             <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">سوق مرسال النخبة</h2>
                <Link href="/shop" className="btn-primary px-10 py-4">تسوق الآن</Link>
             </div>

             <div className="absolute bottom-6 flex gap-2 left-1/2 -translate-x-1/2">
                {heroImages.map((_, i) => (
                   <button 
                     key={i} 
                     onClick={() => setActiveSlide(i)}
                     className={`h-2 rounded-full transition-all ${activeSlide === i ? "w-8 bg-white" : "w-2 bg-white/40"}`}
                   />
                ))}
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}
