"use client"

import * as React from "react"
import { Moon, Sun } from 'lucide-react'
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(document.documentElement.classList.contains('dark') ? 'light' : 'dark')}
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium 
        transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
        disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 
        [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground py-2 group/toggle h-8 w-8 px-0"
    >
      <Sun className="hidden [html.dark_&]:block" />
      <Moon className="hidden [html.light_&]:block" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
