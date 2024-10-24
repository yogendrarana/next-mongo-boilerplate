import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { formatPrice, toTitleCase } from "@/lib/utils";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import { formatMongoData } from "@/helpers";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/utils/product-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ProductImageCarousel } from "./_components/product-image-carousel";
import { getProductById, getRelatedProducts } from "@/server/queries/product";
import { Shell } from "@/components/utils/shell";
import { SiteHeader } from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import ProductDetail from "./_components/product-detail";

interface ProductPageProps {
    params: {
        productId: string;
    };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const productId = decodeURIComponent(params.productId);
    const product = await getProductById(productId);

    if (!product) {
        return {};
    }

    return {
        title: toTitleCase(product.name),
        description: product.description
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const productId = decodeURIComponent(params.productId);
    const product = await getProductById(productId);

    if (!product) {
        notFound();
    }

    const relatedProducts = await getRelatedProducts(productId);

    return (
        <div className="space-y-4 lg:space-y-10">
            <SiteHeader />

            {/* main content */}
            <Shell className="flex flex-col gap-14">
                <div className="flex flex-col gap-8 md:flex-row md:gap-16">
                    <ProductImageCarousel
                        className="w-full md:w-1/2"
                        images={product.images ?? []}
                        options={{ loop: true }}
                    />

                    <Separator className="mt-4 md:hidden" />
                    <ProductDetail product={formatMongoData(product)}         className="w-full md:w-1/2" />

                    {/* <div className="flex w-full flex-col gap-4 md:w-1/2">
                        <h2 className="line-clamp-1 text-2xl font-bold">{product.name}</h2>

                        <p className="text-base text-muted-foreground">
                            {" "}
                            {formatPrice(product.price, { currency: "NRS" })}{" "}
                        </p>
                        <Separator />

                        <p className="text-base text-muted-foreground">
                            {" "}
                            {product.inventory} in stock{" "}
                        </p>

                        <Separator />

                        <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                            defaultValue="description"
                        >
                            <AccordionItem value="description" className="border-none">
                                <AccordionTrigger>Description</AccordionTrigger>
                                <AccordionContent>
                                    {product.description ??
                                        "No description is available for this product."}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <Separator className="md:hidden" />

                    </div> */}
                </div>

                {/* related products */}
                {relatedProducts.length > 0 ? (
                    <div className="space-y-6 overflow-hidden">
                        <h2 className="line-clamp-1 flex-1 text-2xl font-bold">
                            More products from this category
                        </h2>
                        <ScrollArea className="pb-3.5">
                            <div className="flex gap-4">
                                {relatedProducts.map((product) => (
                                    <ProductCard
                                        key={product._id.toString()}
                                        product={formatMongoData(product)}
                                        className="min-w-[260px] max-w-[260px]"
                                    />
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>
                ) : null}
            </Shell>

            {/* site footer */}
            <SiteFooter />
        </div>
    );
}
