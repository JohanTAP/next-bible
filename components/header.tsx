"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { BreadcrumbWithNav } from "@/components/breadcrumb-with-nav"

export function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <BreadcrumbWithNav />
      </div>
    </header>
  )
}
