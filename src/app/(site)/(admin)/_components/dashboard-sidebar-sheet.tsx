"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { useMediaQuery } from "@/hooks/use-media-query";
import useDashboardStore from "@/store/use-dashboard-store";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export interface DashboardSidebarSheetProps
    extends React.ComponentPropsWithRef<typeof SheetTrigger>,
        ButtonProps {}

export function DashboardSidebarSheet({
    children,
    className,
    ...props
}: DashboardSidebarSheetProps) {
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    const { isSidebarOpen, toggleSidebar } = useDashboardStore();

    if (isDesktop) return null;

    return (
        <Sheet open={isSidebarOpen} onOpenChange={toggleSidebar}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        "size-5 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0",
                        className
                    )}
                    {...props}
                >
                    <Icons.menu aria-hidden="true" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent
                side="left"
                className="inset-y-0 flex h-auto w-[18.75rem] flex-col items-center gap-4 px-0 py-4"
            >
                <SheetClose asChild>
                    <Link
                        href="/"
                        className="mx-6 flex items-center self-start font-heading tracking-wider text-foreground/90 transition-colors hover:text-foreground"
                    >
                        <Icons.logo className="size-6" aria-hidden="true" />
                    </Link>
                </SheetClose>
                {children}
            </SheetContent>
        </Sheet>
    );
}
