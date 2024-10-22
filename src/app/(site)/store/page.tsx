import React from "react"
import { type Metadata } from "next"
import { getAllCategories, getAllSubcategories, getStoreProducts } from "@/server/queries/product"
import { ProductsSkeletion } from "@/components/utils/products-skeleton"
import Store from "./_components/store"

export const metadata: Metadata = {
    title: "Store",
    description: "Buy products from our stores",
}

interface ProductsPageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const categoriesPromise = getAllCategories();
    const subcategoriesPromise = getAllSubcategories();
    const productsPromise = getStoreProducts(searchParams);

    return (
        <React.Suspense fallback={<ProductsSkeletion />}>
            <Store 
                categoriesPromise={categoriesPromise} 
                subcategoriesPromise={subcategoriesPromise}
                productsPromise={productsPromise}
            />
        </React.Suspense>
    )
}