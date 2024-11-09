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
        <header className="sticky top-0 z-50 border-b">
            <Shell>
                <nav
                    className={cn(
                        "h-20 hidden lg:flex justify-between items-center",
                        "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
                    )}
                >
                    <Link href="/">
                        <span className=" text-2xl font-bold lg:inline-block">
                            {getNameInitials(siteConfig.name)}
                        </span>
                        <span className="sr-only">Home</span>
                    </Link>

                    <div className="flex gap-8">
                        <Link href="/" className="hidden lg:inline-block">
                            Home
                        </Link>
                        <Link href="/store?category=clothing" className="hidden lg:inline-block">
                            Clothing
                        </Link>
                        <Link href="/store?category=shoes" className="hidden lg:inline-block">
                            Shoes
                        </Link>
                        <Link href="/store?category=accessories" className="hidden lg:inline-block">
                            Accessories
                        </Link>
                    </div>

                    <div className="flex items-center space-x-2">
                        {/* <ProductsCombobox /> */}
                        <CartSheet />
                        <AuthDropdown />
                    </div>
                </nav>

                <MobileNav />
            </Shell>
        </header>
    );
}
