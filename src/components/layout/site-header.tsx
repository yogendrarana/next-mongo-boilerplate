import Link from "next/link";
import { cn } from "@/lib/utils";
import { Shell } from "@/components/shell";
import { MobileNav } from "./mobile-nav";
import { siteConfig } from "@/config/site";
import { getNameInitials } from "@/helpers/user";
import { AuthDropdown } from "./auth-dropdown";
import { CartSheet } from "../checkout/cart-sheet";

export function SiteHeader() {
    return (
        <header
            className={cn(
                "sticky top-0 z-50 border-b",
                "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 "
            )}
        >
            <Shell>
                <nav className="h-20 flex justify-between items-center">
                    <Link href="/">
                        <span className=" text-2xl font-bold lg:inline-block">
                            {getNameInitials(siteConfig.name)}
                        </span>
                        <span className="sr-only">Home</span>
                    </Link>

                    <div className="hidden lg:flex gap-8">
                        <Link href="/">
                            Home
                        </Link>
                        <Link href="/store?category=clothing">
                            Clothing
                        </Link>
                        <Link href="/store?category=shoes">
                            Shoes
                        </Link>
                        <Link href="/store?category=accessories">
                            Accessories
                        </Link>
                    </div>

                    <div className="flex items-center space-x-2">
                        {/* <ProductsCombobox /> */}
                        <CartSheet />
                        <AuthDropdown />
                        <MobileNav />
                    </div>
                </nav>
            </Shell>
        </header>
    );
}
