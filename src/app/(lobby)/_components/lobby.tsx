import {
    PageHeader,
    PageHeaderDescription,
    PageHeaderHeading,
} from "@/components/utils/page-header"
import Link from "next/link"
import { Shell } from "@/components/utils/shell"
import { CategoryCard } from "./category-card"
import { ProductCard } from "@/components/utils/product-card"
import { ContentSection } from "@/components/utils/content-section"
import type { getAllCategories, getFeaturedProducts } from "@/server/queries/product"

interface LobbyProps {
    productsPromise: ReturnType<typeof getFeaturedProducts>
    categoriesPromise: ReturnType<typeof getAllCategories>
}

export async function Lobby({ productsPromise, categoriesPromise }: LobbyProps) {
    const [products, categories] = await Promise.all([
        productsPromise,
        categoriesPromise,
    ])

    return (
        <Shell>
            <PageHeader
                as="section"
                className="mx-auto items-center gap-2 text-center"
                withPadding
            >
                <PageHeaderHeading
                    className="animate-fade-up"
                    style={{ animationDelay: "0.20s", animationFillMode: "both" }}
                >
                    Get your favourite fashion items
                </PageHeaderHeading>
                <PageHeaderDescription
                    className="max-w-[46.875rem] animate-fade-up"
                    style={{ animationDelay: "0.30s", animationFillMode: "both" }}
                >
                    In Fashion house you can find the trendiest fashion items, apparel, and accessories.
                </PageHeaderDescription>
                <div className="mt-6 flex items-center gap-3">
                    <Link href="#featured-products" className="px-4 py-2 border rounded-md hover:bg-gray-100 duration-200">
                        Featured Products
                    </Link>
                    <Link href="/store" className="px-4 py-2 bg-black text-white rounded-md ">
                        View all products
                    </Link>
                </div>
            </PageHeader>

            {/* categories */}
            <section
                className="grid animate-fade-up grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3"
                style={{ animationDelay: "0.50s", animationFillMode: "both" }}
            >
                {categories?.data?.map((category) => (
                    <CategoryCard key={category.name} category={category} />
                ))}
            </section>

            {/* featured products */}
            <ContentSection
                title="Featured products"
                description="Explore products from around the world"
                href="/store"
                linkText="View all products"
                className="pt-14 md:pt-20 lg:pt-24"
                id="featured-products"
            >
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </ContentSection>
        </Shell>
    )
}