import React, { Suspense } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { formatMongoData } from "@/helpers";
import { IProduct } from "@/server/db/models/product-model";
import { ProductCard } from "@/components/utils/product-card";
import ProductFilterDropdown from "@/components/utils/product-filter-dropdown";
import { getAllCategories, getAllSubcategories, getStoreProducts } from "@/server/queries/product";

interface StoreProps {
    productsPromise: ReturnType<typeof getStoreProducts>;
    categoriesPromise: ReturnType<typeof getAllCategories>;
    subcategoriesPromise: ReturnType<typeof getAllSubcategories>;
}

export default async function Store({
    productsPromise,
    categoriesPromise,
    subcategoriesPromise
}: StoreProps) {
    const [products, categories, subcategories] = await Promise.all([
        productsPromise,
        categoriesPromise,
        subcategoriesPromise
    ]);

    return (
        <div>
            <header className="flex items-center justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/store">Store</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* filter */}
                <ProductFilterDropdown categories={categories?.data} />
            </header>

            <Suspense fallback={<div>Loading products...</div>}>
                <div className="grid gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {products?.data?.products.map((product: IProduct) => (
                        <ProductCard
                            key={product._id.toString()}
                            product={formatMongoData(product)}
                        />
                    ))}
                </div>
            </Suspense>
        </div>
    );
}
