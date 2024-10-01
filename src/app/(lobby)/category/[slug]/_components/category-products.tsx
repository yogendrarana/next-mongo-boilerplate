import React, { Suspense } from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Shell } from '@/components/utils/shell';
import { ProductCard } from '@/components/utils/product-card';
import ProductFilterDropdown from '@/components/utils/product-filter-dropdown';
import { getProductsByCategory, getSubcategoriesOfCategory } from '@/server/queries/product';
import { formatMongoData } from '@/helpers';

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
        <Shell>
            <header className='flex items-center justify-between'>
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
                            <BreadcrumbLink>{slug.charAt(0).toUpperCase() + slug.slice(1)}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <ProductFilterDropdown
                    subCategories={subcategories?.data}
                />
            </header>

            <Suspense fallback={<div>Loading products...</div>}>
                <div className="grid gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {products?.data?.products.map((product) => (
                        <ProductCard key={product._id.toString()} product={formatMongoData(product)} />
                    ))}
                </div>
            </Suspense>
        </Shell>
    )
}