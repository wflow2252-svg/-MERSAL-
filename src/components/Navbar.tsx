"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useCart } from "@/lib/CartContext";

export default function Navbar() {
  const { data: session } = useSession();
  const { cartCount } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-border z-[100] flex items-center">
      <div className="responsive-container flex items-center justify-between gap-4">
        
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-border">
             <Image src="/logo.jpg" alt="Logo" fill className="object-contain" />
          </div>
          <div className="hidden sm:block">
             <h1 className="text-xl font-bold text-primary leading-tight">MERSAL</h1>
             <p className="text-[10px] text-accent font-bold uppercase tracking-widest">Elite Marketplace</p>
          </div>
        </Link>

        {/* Search - Robust flex */}
        <div className="flex-grow max-w-xl hidden md:block">
           <div className="flex items-center bg-muted rounded-full px-4 py-2 border border-border">
              <input type="text" placeholder="ابحث عن المنتجات..." className="flex-grow bg-transparent outline-none text-sm text-right pr-4" />
              <span className="material-symbols-rounded text-primary/40">search</span>
           </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
           <Link href="/shop" className="text-xs font-bold text-primary/60 hover:text-primary transition-colors">المتجر</Link>
           <Link href="/offers" className="text-xs font-bold text-primary/60 hover:text-primary transition-colors">العروض</Link>
           
           <div className="w-px h-6 bg-border hidden md:block" />

           <Link href={session ? "/profile" : "/login"} className="flex flex-col items-center">
              <span className="material-symbols-rounded text-primary/60 hover:text-primary transition-colors">person</span>
           </Link>

           <Link href="/cart" className="relative group">
              <span className="material-symbols-rounded text-primary/60 group-hover:text-primary transition-colors">shopping_basket</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">{cartCount}</span>
              )}
           </Link>
        </div>
      </div>
    </header>
  );
}
