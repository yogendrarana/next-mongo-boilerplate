import { ProductCardSkeleton } from "@/components/product-card-skeleton";
import { ContentSection } from "./layout/content-section";
import { Shell } from "./shell";

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
    );
}
