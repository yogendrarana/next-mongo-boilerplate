import React, { Suspense } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { formatMongoData } from "@/helpers";
import { ProductCard } from "@/components/product-card";
import { getProductsByCategory } from "@/server/queries/product";
import { getSubcategoriesOfCategory } from "@/server/queries/subcategory";

interface CategoryProductsProps {
    slug: string;
    subcategoriesPromise: ReturnType<typeof getSubcategoriesOfCategory>;
    productsPromise: ReturnType<typeof getProductsByCategory>;
}

export default async function CategoryProducts({
    slug,
    subcategoriesPromise,
    productsPromise
}: CategoryProductsProps) {
    const [products, subcategories] = await Promise.all([productsPromise, subcategoriesPromise]);

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
                            <BreadcrumbPage>Category</BreadcrumbPage>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink>
                                {slug.charAt(0).toUpperCase() + slug.slice(1)}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

            </header>

            <Suspense fallback={<div>Loading products...</div>}>
                <div className="grid gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {products?.data?.products.map((product) => (
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
