import SiteFooter from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Shell } from "@/components/shell";
import { getFilteredProducts } from "@/server/queries/product";
import { notFound } from "next/navigation";
import React from "react";

// prop types
interface LayoutProps {
    children: React.ReactNode;
    params: {
        category: string;
    };
}

export default function Layout({ children, params }: LayoutProps) {
    const { category: categorySlug } = params;

    if (!categorySlug) {
        return notFound();
    }

    const productsPromise = getFilteredProducts({ categorySlug });

    return (
        <div>
            <SiteHeader />
            <Shell>
                <div>{children}</div>
            </Shell>
            <SiteFooter />
        </div>
    );
}
