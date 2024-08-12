import {
    PageHeader,
    PageHeaderDescription,
    PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shell"
import { CategoryCard } from "./category-card"
import { ProductCard } from "@/components/product-card"
import { ContentSection } from "@/components/content-section"
import type { getCategories, getFeaturedProducts } from "@/server/queries/product"

interface LobbyProps {
    productsPromise: ReturnType<typeof getFeaturedProducts>
    categoriesPromise: ReturnType<typeof getCategories>
}

export async function Lobby({ productsPromise, categoriesPromise, }: LobbyProps) {
    const [products, categories] = await Promise.all([
        productsPromise,
        categoriesPromise,
    ])

    return (
        <Shell className="max-w-6xl gap-0">
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
            </PageHeader>

            {/* categories */}
            <section
                className="grid animate-fade-up grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-4"
                style={{ animationDelay: "0.50s", animationFillMode: "both" }}
            >
                {categories.map((category) => (
                    <CategoryCard key={category.name} category={category} />
                ))}
            </section>

            {/* featured products */}
            <ContentSection
                title="Featured products"
                description="Explore products from around the world"
                href="/products"
                linkText="View all products"
                className="pt-14 md:pt-20 lg:pt-24"
            >
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </ContentSection>
        </Shell>
    )
}