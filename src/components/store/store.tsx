import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Shell } from '../shell'
import React, { Suspense } from 'react'
import StoreFilter from './store-filter'
import { ProductCard } from '../product-card'
import { IProduct } from '@/server/db/models/product-model'
import { getAllCategories, getAllSubcategories, getProducts } from '@/server/queries/product'

interface StoreProps {
    productsPromise: ReturnType<typeof getProducts>
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
                <StoreFilter categories={categories?.data} />
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