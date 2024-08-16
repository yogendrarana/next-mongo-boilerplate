import React from 'react'
import { toTitleCase } from '@/lib/utils'
import { Shell } from '@/components/shell'
import { getProductsByCategory } from '@/server/queries/product'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ProductSexEnum } from '@/constants/enum'

interface CategoryPageProps {
    params: {
        slug: string
    },
    searchParams: {
        sex?: string
    }
}

export async function generateMetadata({ params }: CategoryPageProps) {
    return {
        title: toTitleCase(params.slug),
        description: 'Category description'
    }
}

const Page = async (props: CategoryPageProps) => {
    const { slug } = props.params;
    const { sex } = props.searchParams;

    // If sex is not provided in the URL, redirect to the default URL
    if (!sex) {
        redirect(`/category/${slug}?sex=${ProductSexEnum.MALE}`);
    }

    const products = await getProductsByCategory({ slug, sex });

    return (
        <Shell className="pb-12 md:pb-14">
            <div className="flex flex-col gap-8 md:flex-row md:gap-16">
                <div>
                    <h2>Sex Filter</h2>
                    <ul>
                        {Object.values(ProductSexEnum).map((option) => (
                            <li key={option}>
                                <Link href={`/category/${slug}?sex=${option}`}>
                                    {toTitleCase(option)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2>Products ({products.length})</h2>
                </div>
            </div>
        </Shell>
    )
}

export default Page