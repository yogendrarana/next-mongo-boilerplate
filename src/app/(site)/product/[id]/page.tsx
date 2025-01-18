import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { toTitleCase } from "@/lib/utils";
import { formatMongoData } from "@/helpers";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/product-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ProductImageCarousel } from "./_components/product-image-carousel";
import { getProductById, getRelatedProducts } from "@/server/queries/product";
import { SiteHeader } from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import ProductDetail from "./_components/product-detail";
import Container from "@/components/container";

interface ProductPageProps {
    params: {
        id: string;
    };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const id = decodeURIComponent(params.id);
    const product = await getProductById(id);

    if (!product) {
        return {};
    }

    return {
        title: toTitleCase(product.name),
        description: product.description
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const id = decodeURIComponent(params.id);
    const product = await getProductById(id);

    if (!product) {
        notFound();
    }

    const relatedProducts = await getRelatedProducts(id);

    return (
        <div className="flex flex-col gap-4 md:gap-10">
            <SiteHeader />

            {/* main content */}
            <Container>
                <div>
                    <div className="flex flex-col gap-8 md:flex-row md:gap-16">
                        <ProductImageCarousel
                            className="w-full md:w-1/2"
                            images={product.images ?? []}
                            options={{ loop: true }}
                        />

                        <Separator className="mt-4 md:hidden" />
                        <ProductDetail
                            product={formatMongoData(product)}
                            className="w-full md:w-1/2"
                        />
                    </div>

                    <Separator className="my-10" />

                    {/* related products */}
                    <div>
                        {relatedProducts.length > 0 ? (
                            <div className="space-y-6">
                                <h2 className="line-clamp-1 flex-1 text-2xl font-bold">
                                    More products from this category
                                </h2>
                                <ScrollArea className="pb-3.5">
                                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                                        {relatedProducts.map((product) => (
                                            <ProductCard
                                                key={product._id.toString()}
                                                product={formatMongoData(product)}
                                            />
                                        ))}
                                    </div>
                                    <ScrollBar orientation="horizontal" />
                                </ScrollArea>
                            </div>
                        ) : null}
                    </div>
                </div>
            </Container>

            {/* site footer */}
            <SiteFooter />
        </div>
    );
}
