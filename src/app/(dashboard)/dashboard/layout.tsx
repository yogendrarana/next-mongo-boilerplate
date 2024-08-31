import * as React from "react"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { DashboardSidebar } from "../_components/dashboard-sidebar"
import { DashboardSidebarSheet } from "../_components/dashboard-sidebar-sheet"
import { DashboardHeader } from "../_components/dashboard-header"

interface DashboardStoreLayoutProps {
  params: {
    storeId: string
  }
  children: React.ReactNode
}

export default async function DashboardStoreLayout({
  children,
}: DashboardStoreLayoutProps) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }


  return (
    <div className="grid bg-white min-h-screen w-full lg:grid-cols-[17.5rem_1fr]">
      <DashboardSidebar className="top-0 z-30 hidden flex-col gap-4 border-r border-border/60 lg:sticky lg:block" />

      <div className="flex flex-col">
        <DashboardHeader>
          <DashboardSidebarSheet className="lg:hidden">
            <DashboardSidebar />
          </DashboardSidebarSheet>
        </DashboardHeader>

        {/* main content */}
        <main className="flex-1 overflow-hidden px-6 pt-6">{children}</main>
      </div>
    </div>
  )
}