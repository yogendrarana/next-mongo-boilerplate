"use client";

import Link from "next/link";
import * as React from "react";
import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";
import type { MainNavItem } from "@/constants/types";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSelectedLayoutSegment } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface MobileNavProps {
    items?: MainNavItem[];
}

export function MobileNav({ items }: MobileNavProps) {
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    const segment = useSelectedLayoutSegment();
    const [open, setOpen] = React.useState(false);

    if (isDesktop) return null;

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button aria-label="Open cart" variant="outline" size="icon" className="relative">
                    <Icons.menu className="size-4" aria-hidden="true" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pt-9">
                <div className="py-2">
                    <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
                        <span className="font-bold">{siteConfig.name}</span>
                        <span className="sr-only">Home</span>
                    </Link>
                </div>

                <ScrollArea className="my-4 h-[calc(100vh-8rem)]">
                    <div className="flex flex-col gap-4">
                        <Link href="/" onClick={() => setOpen(false)}>Home</Link>
                        <Link href="/store?category=clothing" onClick={() => setOpen(false)}>Clothing</Link>
                        <Link href="/store?category=shoes" onClick={() => setOpen(false)}>Shoes</Link>
                        <Link href="/store?category=accessories" onClick={() => setOpen(false)}>Accessories</Link>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
