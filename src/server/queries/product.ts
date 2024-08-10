import "server-only"

import {
    unstable_cache as cache,
    unstable_noStore as noStore,
} from "next/cache"
import { connectDb } from "../db"
import ProductModel from "../db/models/product-model"
import CategoryModel from "../db/models/category-model"


// get featured products
export async function getFeaturedProducts() {
    connectDb()

    return await cache(
        async () => {
            return ProductModel.find({}).limit(8).sort({ createdAt: -1 });
        },
        ["featured-products"],
        {
            revalidate: 3600,
            tags: ["featured-products"],
        }
    )()
}


// get product count by category
export async function getProductCountByCategory({ categoryId }: { categoryId: string }) {
    connectDb()

    return await cache(
        async () => {
            return ProductModel.countDocuments({ categoryId });
        },
        [`product-count-${categoryId}`],
        {
            revalidate: 3600,
            tags: [`product-count-${categoryId}`]
        }
    )()
}


// get categories
export async function getCategories() {
    connectDb()

    return await cache(
        async () => {
            return CategoryModel.aggregate([
                {
                    $project: {
                        _id: 0,
                        id: 1,
                        name: 1,
                        slug: 1,
                        description: 1,
                        image: 1
                    }
                },
                {
                    $sort: { name: -1 }
                }
            ]);
        },
        ["categories"],
        {
            revalidate: 3600,
            tags: ["categories"],
        }
    )()
}