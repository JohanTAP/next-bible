import React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Providers } from "@/components/providers"
import { Header } from "@/components/header"

const openDyslexicRegular = localFont({
  src: "./fonts/OpenDyslexic-Regular.woff2",
  variable: "--font-open-dyslexic-regular",
  weight: "100 400",
});

const openDyslexicBold = localFont({
  src: "./fonts/OpenDyslexic-Bold.woff2",
  variable: "--font-open-dyslexic-bold",
  weight: "100 700",
});

export const metadata: Metadata = {
  title: "Biblia Interlineal",
  description: "A Bible app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${openDyslexicRegular.variable} ${openDyslexicBold.variable} antialiased`}
      >
        <Providers>
          <AppSidebar />
          <SidebarInset>
            <Header />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              {children}
            </div>
          </SidebarInset>
        </Providers>
      </body>
    </html>
  );
}
