import { ContentSection } from "@/components/utils/content-section"
import { ProductCardSkeleton } from "@/components/utils/product-card-skeleton"

export function ProductsSkeletion() {
    return (
        <div>
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
        </div>
    )
}