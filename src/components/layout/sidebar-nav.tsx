"use client"

import Link from "next/link"
import type { SidebarNavItem } from "@/types"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/utils/icons"
import useDashboardStore from "@/store/dashboard-store"
import { usePathname } from "next/navigation"

export interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
    items: SidebarNavItem[]
}

export function SidebarNav({ items, className, ...props }: SidebarNavProps) {
    const pathname = usePathname();
    const { isSidebarOpen, toggleSidebar } = useDashboardStore()

    if (!items?.length) return null

    return (
        <div
            className={cn("flex w-full flex-col gap-2 text-sm", className)}
            {...props}
        >
            {items.map((item, index) => {
                const Icon = Icons[item.icon ?? "chevronLeft"]

                if (!item.href) {
                    return (
                        <span
                            key={index}
                            className="flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline"
                        >
                            <Icon className="mr-2 size-4" aria-hidden="true" />
                            {item.title}
                        </span>
                    )
                }

                return (
                    <Link
                        aria-label={item.title}
                        key={index}
                        href={item.href}
                        target={item.external ? "_blank" : ""}
                        rel={item.external ? "noreferrer" : ""}
                        onClick={() => {
                            if (isSidebarOpen) toggleSidebar()
                        }}
                    >
                        <span
                            className={cn(
                                "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:text-black",
                                pathname === item.href
                                    ? "text-black"
                                    : "text-muted-foreground",
                                item.disabled && "pointer-events-none opacity-60"
                            )}
                        >
                            <Icon className="mr-2 size-4" aria-hidden="true" />
                            <span>{item.title}</span>
                        </span>
                    </Link>
                )
            })}
        </div>
    )
}