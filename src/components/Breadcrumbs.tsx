"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function Breadcrumbs() {
  const pathname = usePathname()
  
  // Skip breadcrumbs on home
  if (pathname === "/") return null

  const paths = pathname.split("/").filter(Boolean)
  
  const breadcrumbItems = [
    { label: "الرئيسية", href: "/" },
    ...paths.map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join("/")}`
      // Simple capitalization or mapping for known paths
      const label = path === "category" ? "التصنيفات" : 
                    path === "shop" ? "المتجر" :
                    path === "product" ? "المنتجات" :
                    path === "cart" ? "سلة المشتريات" :
                    path === "profile" ? "الملف الشخصي" : path
      
      return { label, href }
    })
  ]

  return (
    <nav className="responsive-container pt-24 pb-4" aria-label="Breadcrumb">
      <motion.ol 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3 overflow-x-auto no-scrollbar whitespace-nowrap"
      >
        {breadcrumbItems.map((item, index) => (
          <li key={item.href} className="flex items-center gap-3">
            {index > 0 && (
              <span className="material-symbols-rounded text-[14px] text-primary/20 rotate-180">
                chevron_right
              </span>
            )}
            <Link
              href={item.href}
              className={cn(
                "text-[10px] font-black uppercase tracking-[0.2em] transition-all",
                index === breadcrumbItems.length - 1
                  ? "text-primary bg-primary/5 px-4 py-1.5 rounded-lg border border-primary/10"
                  : "text-primary/40 hover:text-primary"
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </motion.ol>
    </nav>
  )
}
