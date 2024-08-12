import * as React from "react"


import { Lobby } from "./_components/lobby"
import { LobbySkeleton } from "./_components/lobby-skeleton"
import { getCategories, getFeaturedProducts } from "@/server/queries/product"

export default async function IndexPage() {

    /**
     * To avoid sequential waterfall requests, multiple promises are passed to fetch data parallelly.
     * These promises are also passed to the `Lobby` component, making them hot promises. This means they can execute without being awaited, further preventing sequential requests.
     * @see https://www.youtube.com/shorts/A7GGjutZxrs
     * @see https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#parallel-data-fetching
     */

    const categoriesPromise = getCategories()
    const productsPromise = getFeaturedProducts()

    return (
        <React.Suspense fallback={<LobbySkeleton />}>
            <Lobby productsPromise={productsPromise} categoriesPromise={categoriesPromise} />
        </React.Suspense>
    )
}