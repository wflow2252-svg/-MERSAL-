"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

export interface CardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "glass" | "muted" | "highlight"
  padding?: "none" | "sm" | "md" | "lg"
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", padding = "md", children, ...props }, ref) => {
    
    const variants = {
      default: "bg-white border border-border shadow-sm",
      glass: "elite-glass",
      muted: "bg-muted/50 border-transparent",
      highlight: "bg-white border-2 border-primary/10 shadow-elite-xl"
    }

    const paddings = {
      none: "p-0",
      sm: "p-4 md:p-6",
      md: "p-8 md:p-10",
      lg: "p-12 md:p-16"
    }

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className={cn(
          "rounded-[2.5rem] overflow-hidden",
          variants[variant],
          paddings[padding],
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = "Card"

export { Card }
