import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import React, { Suspense } from 'react'
import { IProduct } from '@/server/db/models/product-model'
import { getAllCategories, getAllSubcategories, getStoreProducts } from '@/server/queries/product'
import { Shell } from '@/components/utils/shell'
import ProductFilterDropdown from '@/components/utils/product-filter-dropdown'
import { ProductCard } from '@/components/utils/product-card'

interface StoreProps {
    productsPromise: ReturnType<typeof getStoreProducts>
    categoriesPromise: ReturnType<typeof getAllCategories>
    subcategoriesPromise: ReturnType<typeof getAllSubcategories>
};

export default async function Store({
    productsPromise,
    categoriesPromise,
    subcategoriesPromise
}: StoreProps) {
    const [products, categories, subcategories] = await Promise.all([
        productsPromise,
        categoriesPromise,
        subcategoriesPromise
    ])

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
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </Suspense>
        </Shell>
    )
}