"use client"

import * as React from "react"
import {
BookCopy,
BookOpen,
BookOpenCheck,
CalendarCheck,
Command,
Frame,
LifeBuoy,
Map,
PieChart,
Send,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
Sidebar,
SidebarContent,
SidebarFooter,
SidebarHeader,
SidebarMenu,
SidebarMenuButton,
SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

const data = {
  user: {
    name: "Johan Gutierrez",
    email: "johangutierrez@outlook.cl",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Versículo del Día",
      url: "/daily-verse",
      icon: Map,
    },
    {
      title: "Biblia Interlinear",
      url: "/interlinear",
      icon: BookOpenCheck,
      isActive: true,
    },
    {
      title: "Biblia",
      url: "/biblia",
      icon: BookOpen
    },
    {
      title: "Comentario Bíblico",
      url: "/comentario",
      icon: BookCopy,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
    {
      title: "Periodos Bíblicos",
      url: "/periodos",
      icon: CalendarCheck,
      items: [
        {
          title: "Primera Generacion",
          url: "/Periodo/Primera_Generacion",
        },
        {
          title: "Noe y El Diluvio",
          url: "/Periodo/Noe_y_El_Diluvio",
        },
        {
          title: "Los Patriarcas",
          url: "/Periodo/Los_Patriarcas",
        },
        {
          title: "De Egipto a Canaan",
          url: "/Periodo/De_Egipto_a_Canaan",
        },
        {
          title: "Quinta Generacion",
          url: "/Periodo/Quinta_Generacion",
        },
        {
          title: "Los Jueces",
          url: "/Periodo/Los_Jueces",
        },
        {
          title: "Reino Unido",
          url: "/Periodo/Reino_Unido",
        },
        {
          title: "Reino Dividido",
          url: "/Periodo/Reino_Dividido",
        },
        {
          title: "El Exilio",
          url: "/Periodo/El_Exilio",
        },
        {
          title: "Vida de Cristo",
          url: "/Periodo/Vida_De_Cristo",
        },
        {
          title: "Iglesia Primitiva",
          url: "/Periodo/Inglesia_Primitiva",
        },
        {
          title: "Edad Media",
          url: "/Periodo/Edad_Media",
        },
        {
          title: "La Reforma",
          url: "/Periodo/La_Reforma",
        },
        {
          title: "Profecias de Apocalipsis",
          url: "/Periodo/Profecias_de_Apocalipsis",
        }
      ],
    }
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Diccionario Bíblico",
      url: "#",
      icon: Frame,
    },
    {
      name: "Año Bíblico",
      url: "#",
      icon: PieChart,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-between">
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Remanente App</span>
                  <span className="truncate text-xs">Adventista</span>
                </div>
              </Link>
            </SidebarMenuButton>
            <ThemeToggle />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
