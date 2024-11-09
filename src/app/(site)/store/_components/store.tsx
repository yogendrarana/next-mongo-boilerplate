import React from "react";
import { Shell } from "@/components/shell";
import { formatMongoData } from "@/helpers";
import { ProductCard } from "@/components/product-card";
import { IProduct } from "@/server/db/models/product-model";
import { getAllCategories } from "@/server/queries/category";
import { getFilteredProducts } from "@/server/queries/product";
import { getAllSubcategories } from "@/server/queries/subcategory";
import {
    ProductsCategoryFilter,
    ProductsGenderFilter,
    ProductsSubcategoryFilter
} from "@/components/products-filters";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface StoreProps {
    productsPromise: ReturnType<typeof getFilteredProducts>;
    categoriesPromise: ReturnType<typeof getAllCategories>;
    subcategoriesPromise: ReturnType<typeof getAllSubcategories>;
    searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Store({
    productsPromise,
    categoriesPromise,
    subcategoriesPromise,
    searchParams
}: StoreProps) {
    const [products, categories, subcategories] = await Promise.all([
        productsPromise,
        categoriesPromise,
        subcategoriesPromise
    ]);

    const category = searchParams?.category || "Store";

    return (
        <div className="w-full overflow-hidden">
            <h3 className="py-16 text-center text-xl md:text-5xl font-semibold capitalize">
                {category}
            </h3>

            <div className="py-8 bg-gray-50 border-t border-b">
                <Shell>
                    <div className="w-full flex flex-col md:flex-row justify-between items-center">
                        <p className="hidden md:flex">
                            {products?.data?.pagination.totalItems || 0} Products
                        </p>

                        <ScrollArea className="w-screen whitespace-nowrap">
                            <div className="w-full flex items-center gap-2">
                                <ProductsCategoryFilter
                                    triggerClassName="bg-gray-50"
                                    categories={categories?.data}
                                />

                                <ProductsSubcategoryFilter
                                    triggerClassName="bg-gray-50"
                                    subcategories={subcategories?.data}
                                />

                                <ProductsGenderFilter triggerClassName="bg-gray-50" />
                                <ScrollBar orientation="horizontal" />
                            </div>
                        </ScrollArea>
                    </div>
                </Shell>
            </div>

            <Shell>
                <div className="py-16 grid gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {products?.data?.products.map((product: IProduct) => (
                        <ProductCard
                            key={product._id.toString()}
                            product={formatMongoData(product)}
                        />
                    ))}
                </div>
            </Shell>
        </div>
    );
}
