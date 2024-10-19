import * as React from "react";

import { Lobby } from "@/app/(lobby)/_components/lobby";
import { LobbySkeleton } from "@/app/(lobby)/_components/lobby-skeleton";
import { getAllCategories, getFeaturedProducts } from "@/server/queries/product";

export default async function IndexPage() {
    const categoriesPromise = getAllCategories();
    const productsPromise = getFeaturedProducts();

    return (
        <React.Suspense fallback={<LobbySkeleton />}>
            <Lobby productsPromise={productsPromise} categoriesPromise={categoriesPromise} />
        </React.Suspense>
    );
}
