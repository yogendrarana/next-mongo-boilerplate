"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Icons } from "@/components/icons";
import { dashboardConfig } from "@/config/dashboard";
import { ScrollArea } from "@/components/ui/scroll-area";
import useDashboardStore from "@/store/use-dashboard-store";

interface DashboardSidebarProps extends React.HTMLAttributes<HTMLElement> {
    className?: string;
}

export function DashboardSidebar({ className, ...props }: DashboardSidebarProps) {
    const pathname = usePathname();
    const { isSidebarOpen, toggleSidebar } = useDashboardStore();

    if (!dashboardConfig.sidebarNav?.length) return null;

    return (
        <aside className={cn("h-full w-full", className)} {...props}>
            <ScrollArea>
                <div className={cn("flex w-full flex-col gap-2 text-sm", className)} {...props}>
                    {dashboardConfig.sidebarNav.map((item, index) => {
                        const Icon = Icons[item.icon as keyof typeof Icons ?? "chevronLeft"];

                        if (!item.href) {
                            return (
                                <span
                                    key={index}
                                    className="flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline"
                                >
                                    <Icon className="mr-2 size-4" aria-hidden="true" />
                                    {item.title}
                                </span>
                            );
                        }

                        return (
                            <Link
                                aria-label={item.title}
                                key={index}
                                href={item.href}
                                target={item.external ? "_blank" : ""}
                                rel={item.external ? "noreferrer" : ""}
                                onClick={() => {
                                    if (isSidebarOpen) toggleSidebar();
                                }}
                            >
                                <span
                                    className={cn(
                                        "group flex w-full items-center rounded-md border border-transparent py-1.5 hover:text-black",
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
                        );
                    })}
                </div>
            </ScrollArea>
        </aside>
    );
}
