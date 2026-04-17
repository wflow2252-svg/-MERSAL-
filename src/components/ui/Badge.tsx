"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "error" | "glass"
  size?: "sm" | "md"
}

export function Badge({ className, variant = "primary", size = "md", ...props }: BadgeProps) {
  
  const variants = {
    primary: "bg-primary/10 text-primary border border-primary/20",
    secondary: "bg-secondary/10 text-secondary border border-secondary/20",
    success: "bg-success/10 text-success border border-success/20",
    warning: "bg-warning/10 text-warning border border-warning/20",
    error: "bg-error/10 text-error border border-error/20",
    glass: "bg-white/10 backdrop-blur-md text-white border border-white/20"
  }

  const sizes = {
    sm: "px-2.5 py-1 text-[9px] rounded-lg",
    md: "px-4 py-1.5 text-[10px] rounded-xl"
  }

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center font-black uppercase tracking-widest",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
}
