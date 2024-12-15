"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SidebarProvider } from "@/components/ui/sidebar"

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        {children}
      </SidebarProvider>
    </NextThemesProvider>
  )
}
