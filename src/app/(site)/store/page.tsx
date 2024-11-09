import React from "react";
import { type Metadata } from "next";
import Store from "./_components/store";
import { getAllCategories } from "@/server/queries/category";
import { getAllSubcategories } from "@/server/queries/subcategory";
import { getFilteredProducts } from "@/server/queries/product";
import { ProductsSkeletion } from "@/components/products-skeleton";
import { SiteHeader } from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";

export const metadata: Metadata = {
    title: "Store",
    description: "Buy products from our stores"
};

interface ProductsPageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const categoriesPromise = getAllCategories();
    const subcategoriesPromise = getAllSubcategories();
    const productsPromise = getFilteredProducts(searchParams);

    return (
        <React.Suspense fallback={<ProductsSkeletion />}>
            <SiteHeader />
            <Store
                categoriesPromise={categoriesPromise}
                subcategoriesPromise={subcategoriesPromise}
                productsPromise={productsPromise}
                searchParams={searchParams}
            />
            <SiteFooter />
        </React.Suspense>
    );
}
