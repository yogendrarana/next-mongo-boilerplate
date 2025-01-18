import Container from "./container";
import { ContentSection } from "./layout/content-section";
import { ProductCardSkeleton } from "@/components/product-card-skeleton";

export function ProductsSkeletion() {
    return (
        <Container className="border-4">
            <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                ))}
            </div>
        </Container>
    );
}
