import React from "react"
import { type Metadata } from "next"
import Store from "@/components/store/store"
import { getAllCategories, getAllSubcategories, getProducts } from "@/server/queries/product"

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
    const productsPromise = getProducts(searchParams);

    return (
        // TODO: add proper skeleton loading
        <React.Suspense fallback={<h1>Loading products</h1>}>
            <Store 
                categoriesPromise={categoriesPromise} 
                subcategoriesPromise={subcategoriesPromise}
                productsPromise={productsPromise}
            />
        </React.Suspense>
    )
}