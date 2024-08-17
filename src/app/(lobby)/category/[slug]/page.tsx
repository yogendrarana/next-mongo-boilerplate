import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import React, { Suspense } from 'react'
import { toTitleCase } from '@/lib/utils'
import { Shell } from '@/components/shell'
import ProductFilter from './_components/product-filter'
import { ProductList } from './_components/product-list'
import { getSubcategoriesOfCategory } from '@/server/queries/product'

interface CategoryPageProps {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: CategoryPageProps) {
    return {
        title: toTitleCase(params.slug),
        description: 'Category description'
    }
}

export default async function Page({ params, searchParams }: CategoryPageProps) {
    const { slug } = params;
    const { data: subcategories } = await getSubcategoriesOfCategory(slug);

    return (
        <Shell className="pb-12 md:pb-14">
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
                            <BreadcrumbPage>{slug.charAt(0).toUpperCase() + slug.slice(1)}</BreadcrumbPage>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>

                <ProductFilter category={slug} subcategories={subcategories} />
            </header>

            <div>
                <Suspense fallback={<div>Loading products...</div>}>
                    <ProductList category={slug} searchParams={searchParams} />
                </Suspense>
            </div>
        </Shell>
    )
}