import React from "react";
import Link from "next/link";
import { formatMongoData } from "@/helpers";
import { ProductCard } from "@/components/product-card";
import type { getFeaturedProducts } from "@/server/queries/product";
import { ContentSection } from "@/components/layout/content-section";
import { Shell } from "../shell";

interface LobbyProps {
    productsPromise: ReturnType<typeof getFeaturedProducts>;
}

export async function Lobby({ productsPromise }: LobbyProps) {
    const products = await productsPromise;

    return (
        <Shell className="space-y-4 lg:space-y-10">
            <div className="h-[60vh] w-full border rounded-lg flex flex-col justify-center items-center gap-2">
                <h1 className="text-xl md:text-4xl font-bold text-center">Get your favourite fashion items</h1>
                <p className="text-sm md:text-lg text-gray-600 md:w-1/2 text-center">
                    In Fashion house you can find the trendiest fashion items, apparel, and
                    accessories.
                </p>
                <div className="mt-6 flex items-center gap-3">
                    <Link
                        href="#featured-products"
                        className="px-4 py-2 border rounded-sm hover:bg-gray-100 duration-200"
                    >
                        Featured Products
                    </Link>
                    <Link href="/store" className="px-4 py-2 bg-black text-white rounded-sm ">
                        View all products
                    </Link>
                </div>
            </div>

            {/* featured products */}
            <ContentSection
                title="Featured products"
                description="Explore products from around the world"
                href="/store"
                linkText="View all products"
                id="featured-products"
            >
                {products.map((product) => (
                    <ProductCard key={product._id.toString()} product={formatMongoData(product)} />
                ))}
            </ContentSection>
        </Shell>
    );
}
