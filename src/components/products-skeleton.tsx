import { Shell } from "@/components/shell"
import { ContentSection } from "@/components/content-section"
import { ProductCardSkeleton } from "@/components/product-card-skeleton"

export function ProductsSkeletion() {
    return (
        <Shell>
            <ContentSection
                title="Store products"
                description="Explore products from our store"
                href="/store"
                linkText="View all products"
                className="pt-14 md:pt-20 lg:pt-24"
            >
                {Array.from({ length: 8 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                ))}
            </ContentSection>
        </Shell>
    )
}