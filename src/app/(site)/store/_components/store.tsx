import React from "react";
import { formatMongoData } from "@/helpers";
import Container from "@/components/container";
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
                <Container>
                    <div className="w-full flex justify-between items-center">
                        <p className="hidden md:flex">
                            {products?.data?.pagination.totalItems || 0} Products
                        </p>

                        <ScrollArea className="whitespace-nowrap">
                            <div className="w-full flex items-center gap-2">
                                <ProductsSubcategoryFilter
                                    triggerClassName="bg-gray-50"
                                    subcategories={subcategories?.data}
                                />

                                <ProductsGenderFilter triggerClassName="bg-gray-50" />
                                <ScrollBar orientation="horizontal" />
                            </div>
                        </ScrollArea>
                    </div>
                </Container>
            </div>

            <Container>
                <div className="py-16 grid gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {products?.data?.products.map((product: IProduct) => (
                        <ProductCard
                            key={product._id.toString()}
                            product={formatMongoData(product)}
                        />
                    ))}
                </div>
            </Container>
        </div>
    );
}
