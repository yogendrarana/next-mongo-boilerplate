"use client"

import * as React from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SidebarNav } from "@/components/layout/sidebar-nav"
import { dashboardConfig } from "@/config/dashboard"
import { ComponentBooleanIcon } from "@radix-ui/react-icons"

interface DashboardSidebarProps extends React.HTMLAttributes<HTMLElement> {
  className?: string
}

export function DashboardSidebar({
  className,
  ...props
}: DashboardSidebarProps) {
  return (
    <aside className={cn("h-screen w-full border-r", className)} {...props}>
      <div className="hidden h-[3.55rem] items-center border-b border-border/60 px-4 lg:flex lg:px-6">
        <Link
          href="/"
          className="flex gap-2 tex w-fit items-center font-heading tracking-wider text-foreground/90 transition-colors"
        >
          <ComponentBooleanIcon className="size-7" aria-hidden={true} />
          <span className="hidden font-bold lg:inline-block">
            {siteConfig.name}
          </span>
        </Link>
      </div>

      <ScrollArea className="h-[calc(100vh-8rem)] px-3 py-2.5 lg:px-5">
        <SidebarNav items={dashboardConfig.sidebarNav} className="p-1 pt-4" />
      </ScrollArea>
    </aside>
  )
}