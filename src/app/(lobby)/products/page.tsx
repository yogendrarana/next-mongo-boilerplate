import { type Metadata } from "next"

import {
    PageHeader,
    PageHeaderDescription,
    PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shell"
import { SearchParams } from "@/types"
import { getProducts } from "@/server/queries/product"

export const metadata: Metadata = {
    title: "Products",
    description: "Buy products from our stores",
}

interface ProductsPageProps {
    searchParams: SearchParams
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const responses = await getProducts(searchParams);
    console.log(responses)

    return (
        <Shell>
            <PageHeader>
                <PageHeaderHeading size="sm">Products</PageHeaderHeading>
                <PageHeaderDescription size="sm">
                    Buy products from our stores
                </PageHeaderDescription>
            </PageHeader>
        </Shell>
    )
}