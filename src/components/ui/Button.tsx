"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glass" | "danger"
  size?: "sm" | "md" | "lg" | "icon"
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, leftIcon, rightIcon, children, ...props }, ref) => {
    
    const variants = {
      primary: "bg-primary text-white shadow-lg shadow-primary/25 hover:bg-accent",
      secondary: "bg-secondary text-white shadow-lg shadow-secondary/20 hover:bg-orange-600",
      outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary/5",
      ghost: "bg-transparent text-primary/60 hover:bg-primary/5 hover:text-primary",
      glass: "elite-glass text-primary hover:shadow-xl",
      danger: "bg-error text-white shadow-lg shadow-error/20 hover:bg-red-600"
    }

    const sizes = {
      sm: "px-6 py-2.5 text-[11px] font-bold rounded-xl",
      md: "px-8 py-4 text-xs font-extrabold rounded-2xl",
      lg: "px-12 py-5 text-sm font-black rounded-3xl",
      icon: "p-4 rounded-2xl aspect-square"
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ y: -1, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "relative overflow-hidden inline-flex items-center justify-center gap-3 uppercase tracking-widest transition-colors disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            {leftIcon && <span className="flex-none">{leftIcon}</span>}
            <span className="relative z-10">{children}</span>
            {rightIcon && <span className="flex-none">{rightIcon}</span>}
          </>
        )}
        
        {/* Elite Hover Effect Glow */}
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.button>
    )
  }
)

Button.displayName = "Button"

export { Button }
