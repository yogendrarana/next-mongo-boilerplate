import * as React from "react";

import { Lobby } from "@/components/layout/lobby";
import SiteFooter from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getFeaturedProducts } from "@/server/queries/product";
import { LobbySkeleton } from "@/components/layout/lobby-skeleton";

export default async function IndexPage() {
    const productsPromise = getFeaturedProducts();

    return (
        <div className="space-y-4 lg:space-y-8">
            <SiteHeader />
            <React.Suspense fallback={<LobbySkeleton />}>
                <Lobby productsPromise={productsPromise} />
            </React.Suspense>
            <SiteFooter />
        </div>
    );
}
