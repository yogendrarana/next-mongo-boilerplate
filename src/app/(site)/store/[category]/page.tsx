import React, { Suspense } from "react";
import { toTitleCase } from "@/lib/utils";
import { getProductsByCategory } from "@/server/queries/product";
import { getSubcategoriesOfCategory } from "@/server/queries/subcategory";
import { ProductsSkeletion } from "@/components/products-skeleton";
import CategoryProducts from "../_components/category-products";

interface CategoryPageProps {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: CategoryPageProps) {
    return {
        title: toTitleCase(params.slug),
        description: "Category description"
    };
}

export default async function Page({ params, searchParams }: CategoryPageProps) {
    const { slug } = params;
    const getSubcategoriesOfCategoryPromise = getSubcategoriesOfCategory(slug);
    const productsPromise = getProductsByCategory(slug, searchParams);

    return (
        <Suspense fallback={<ProductsSkeletion />}>
            <CategoryProducts
                slug={slug}
                subcategoriesPromise={getSubcategoriesOfCategoryPromise}
                productsPromise={productsPromise}
            />
        </Suspense>
    );
}
