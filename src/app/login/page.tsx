"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6 pt-32 pb-20">
      <div className="max-w-[1200px] w-full bg-white rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col lg:flex-row border border-border/5">
        
        {/* Visual Brand Side */}
        <div className="lg:w-1/2 bg-[#021D24] p-16 md:p-24 relative overflow-hidden flex flex-col justify-between min-h-[500px]">
           <div className="relative z-10 space-y-8 text-right">
              <Link href="/" className="inline-block">
                 <div className="w-20 h-20 bg-white rounded-3xl p-3 shadow-2xl">
                    <Image src="/logo.jpg" alt="Logo" width={80} height={80} className="object-contain" />
                 </div>
              </Link>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none font-heading">
                ┘à┘Ç╪▒╪¡┘Ç╪¿╪º┘ï ╪¿┘Ç┘â <br /> ┘ü┘Ç┘è <span className="text-[#1089A4]">┘à┘Ç╪▒╪│┘Ç╪º┘ä</span>
              </h1>
              <p className="text-white/40 text-lg font-medium max-w-sm leading-relaxed pr-6 border-r-4 border-[#F29124]">
                ╪º┘å╪╢┘à ┘ä╪ú┘â╪¿╪▒ ┘à┘å╪╡╪⌐ ╪¬╪¼╪º╪▒┘è╪⌐ ┘ü┘è ╪º┘ä╪│┘ê╪»╪º┘å╪î ┘ê╪º╪¿╪»╪ú ╪▒╪¡┘ä╪⌐ ╪¬╪│┘ê┘é ╪º╪│╪¬╪½┘å╪º╪ª┘è╪⌐ ╪º┘ä┘è┘ê┘à.
              </p>
           </div>

           <div className="relative z-10 flex items-center gap-6 justify-end">
              <span className="text-white/20 text-xs font-black uppercase tracking-widest">+50K ┘à╪│╪¬╪«╪»┘à ┘å╪┤╪╖</span>
              <div className="flex -space-x-4">
                 {[1, 2, 3].map((i) => (
                   <div key={i} className="w-12 h-12 rounded-full border-4 border-[#021D24] bg-muted overflow-hidden relative">
                      <Image src={`https://images.unsplash.com/photo-${1500000000000 + i * 100000}?auto=format&fit=crop&q=80&w=100`} alt="User" fill className="object-cover" />
                   </div>
                 ))}
              </div>
           </div>

           {/* Decorative Background */}
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1089A4]/10 blur-[150px] rounded-full" />
           <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-[#F29124]/5 blur-[120px] rounded-full" />
        </div>

        {/* Form Side */}
        <div className="lg:w-1/2 p-12 md:p-24 flex flex-col justify-center text-right">
           <AnimatePresence mode="wait">
              <motion.div 
                key={isLogin ? "login" : "signup"}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-12"
              >
                 <div className="space-y-4">
                    <h2 className="text-4xl font-black text-[#021D24] tracking-tight font-heading">{isLogin ? "╪¬╪│╪¼┘è┘ä ╪º┘ä╪»╪«┘ê┘ä" : "╪Ñ┘å╪┤╪º╪í ╪¡╪│╪º╪¿ ╪¼╪»┘è╪»"}</h2>
                    <p className="text-[#021D24]/40 text-sm font-medium">╪ú╪»╪«┘ä ╪¿┘è╪º┘å╪º╪¬┘â ┘ä┘ä┘à╪¬╪º╪¿╪╣╪⌐ ┘ü┘è ┘à┘å╪╡╪⌐ ┘à╪▒╪│╪º┘ä</p>
                 </div>

                 <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                    {!isLogin && (
                      <div className="space-y-3 group">
                         <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#021D24]/40 group-focus-within:text-[#1089A4] transition-colors">╪º┘ä╪º╪│┘à ╪º┘ä┘â╪º┘à┘ä</label>
                         <div className="relative">
                            <span className="material-symbols-rounded absolute right-6 top-1/2 -translate-y-1/2 text-[#021D24]/20 group-focus-within:text-[#1089A4] transition-all">person</span>
                            <input type="text" placeholder="╪ú╪»╪«┘ä ╪º╪│┘à┘â ╪¿╪º┘ä┘â╪º┘à┘ä" className="w-full bg-[#F8F9FA] pr-14 pl-6 py-6 rounded-2xl border-2 border-transparent focus:border-[#1089A4]/20 outline-none font-bold placeholder:text-[#021D24]/10 transition-all shadow-sm" />
                         </div>
                      </div>
                    )}

                    <div className="space-y-3 group">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#021D24]/40 group-focus-within:text-[#1089A4] transition-colors">╪º┘ä╪¿╪▒┘è╪» ╪º┘ä╪Ñ┘ä┘â╪¬╪▒┘ê┘å┘è ╪ú┘ê ╪º┘ä┘ç╪º╪¬┘ü</label>
                       <div className="relative">
                          <span className="material-symbols-rounded absolute right-6 top-1/2 -translate-y-1/2 text-[#021D24]/20 group-focus-within:text-[#1089A4] transition-all">mail</span>
                          <input type="text" placeholder="example@mersal.com" className="w-full bg-[#F8F9FA] pr-14 pl-6 py-6 rounded-2xl border-2 border-transparent focus:border-[#1089A4]/20 outline-none font-bold placeholder:text-[#021D24]/10 transition-all shadow-sm" />
                       </div>
                    </div>

                    <div className="space-y-3 group">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#021D24]/40 group-focus-within:text-[#1089A4] transition-colors">┘â┘ä┘à╪⌐ ╪º┘ä┘à╪▒┘ê╪▒</label>
                       <div className="relative">
                          <span className="material-symbols-rounded absolute right-6 top-1/2 -translate-y-1/2 text-[#021D24]/20 group-focus-within:text-[#1089A4] transition-all">lock</span>
                          <input type="password" placeholder="ΓÇóΓÇóΓÇóΓÇóΓÇóΓÇóΓÇóΓÇó" className="w-full bg-[#F8F9FA] pr-14 pl-6 py-6 rounded-2xl border-2 border-transparent focus:border-[#1089A4]/20 outline-none font-bold placeholder:text-[#021D24]/10 transition-all shadow-sm" />
                       </div>
                       {isLogin && (
                         <div className="flex justify-start pt-2">
                            <button className="text-[10px] font-black uppercase tracking-widest text-[#1089A4] hover:text-[#021D24] transition-all">┘å╪│┘è╪¬ ┘â┘ä┘à╪⌐ ╪º┘ä┘à╪▒┘ê╪▒╪ƒ</button>
                         </div>
                       )}
                    </div>

                    <button className="w-full bg-[#1089A4] text-white py-7 rounded-2xl font-black text-xs uppercase tracking-[0.4em] shadow-xl shadow-[#1089A4]/20 hover:bg-[#021D24] hover:-translate-y-2 transition-all active:scale-95 border-b-6 border-black/10">
                       {isLogin ? "╪»╪«┘ê┘ä ┘ä┘ä┘à┘å╪╡╪⌐" : "╪Ñ┘å╪╢┘à ╪º┘ä╪ó┘å"}
                    </button>
                 </form>

                 <div className="space-y-8">
                    <div className="relative flex items-center justify-center">
                       <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/60"></div></div>
                       <span className="relative bg-white px-6 text-[10px] font-black uppercase tracking-widest text-[#021D24]/20">╪ú┘ê ╪╣╪¿╪▒ ╪º┘ä╪¬┘ê╪º╪╡┘ä</span>
                    </div>

                    <div className="space-y-6">
                       <button 
                         onClick={() => signIn('google')}
                         className="w-full max-w-sm mx-auto flex items-center justify-center gap-4 bg-[#F8F9FA] py-6 rounded-2xl border-2 border-transparent hover:border-[#1089A4]/20 transition-all text-xs font-black uppercase tracking-[0.4em] hover:bg-white hover:shadow-xl group"
                       >
                          <Image src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={24} height={24} /> ╪º┘ä╪»╪«┘ê┘ä ╪╣╪¿╪▒ ╪¼┘ê╪¼┘ä
                       </button>
                    </div>

                    <p className="text-center text-sm font-medium text-[#021D24]/40">
                       {isLogin ? "┘ä┘è╪│ ┘ä╪»┘è┘â ╪¡╪│╪º╪¿╪ƒ" : "┘ä╪»┘è┘â ╪¡╪│╪º╪¿ ╪¿╪º┘ä┘ü╪╣┘ä╪ƒ"}
                       <button 
                         onClick={() => setIsLogin(!isLogin)} 
                         className="mr-2 text-[#F29124] font-black border-b-2 border-transparent hover:border-[#F29124] tracking-tight"
                       >
                          {isLogin ? "╪ú┘å╪┤╪ª ╪¡╪│╪º╪¿┘â ╪º┘ä╪ó┘å" : "╪¬╪│╪¼┘è┘ä ╪º┘ä╪»╪«┘ê┘ä"}
                       </button>
                    </p>
                 </div>
              </motion.div>
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
