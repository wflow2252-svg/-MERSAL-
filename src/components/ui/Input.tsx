"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full space-y-2.5">
        {label && (
          <label className="block text-[11px] font-bold text-primary/60 uppercase tracking-[0.15em] px-2">
            {label}
          </label>
        )}
        <div className="relative group">
          <input
            type={type}
            className={cn(
              "input-elite pr-12 pl-6",
              error && "border-error/30 bg-error/[0.02] text-error focus:border-error",
              className
            )}
            ref={ref}
            {...props}
          />
          {icon && (
            <div className="absolute top-1/2 right-6 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors">
              {icon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-[10px] font-bold text-error uppercase tracking-wider px-2">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
