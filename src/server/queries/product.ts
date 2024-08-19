import "server-only"

import {
    unstable_cache as cache,
    unstable_noStore as noStore,
} from "next/cache"
import { connectDb } from "../db"
import { FilterQuery } from "mongoose"
import { SearchParams } from "@/types"
import { ApiResponse } from "@/helpers/api-response"
import { ProductSearchParams } from "@/types/product"
import CategoryModel, { ICategory } from "../db/models/category-model"
import { getProductsSchema } from "@/lib/validations/product"
import ProductModel, { IProduct } from "../db/models/product-model"
import SubcategoryModel, { ISubcategory } from "../db/models/subcategory-model"


// get products
export async function getProducts(params: ProductSearchParams) {
    noStore();
    await connectDb();

    const {
        gte,
        lte,
        page = 1,
        limit = 10,
        gender,
        category,
        subcategory,
        sort = 'createdAt',
        order = 'desc'
    } = params;

    console.log("params", params);

    const pipeline: any[] = [];

    // Match stage
    const matchStage: any = {};

    if (category) {
        const catevoryValues = category.split(',').map(s => s.trim());
        matchStage['category.slug'] = { $in: catevoryValues };
    }

    if (subcategory) {
        const subcategoryValues = subcategory.split(',').map(s => s.trim());
        matchStage['subcategory.slug'] = { $in: subcategoryValues };
    }

    if (gender) {
        const genderValues = gender.split(',').map(gen => gen.trim());
        matchStage.gender = { $in: genderValues };
    }

    if (gte || lte) {
        matchStage.price = {};
        if (gte) matchStage.price.$gte = parseFloat(gte);
        if (lte) matchStage.price.$lte = parseFloat(lte);
    }

    pipeline.push({ $match: matchStage });

    // Sort stage
    const sortStage: any = {};
    sortStage[sort] = order === 'desc' ? -1 : 1;
    pipeline.push({ $sort: sortStage });

    // Generate a dynamic cache key based on all search parameters
    const cacheKey = `products-${JSON.stringify(
        Object.keys(params).sort().reduce((obj: { [key: string]: any }, key) => {
            obj[key] = params[key];
            return obj;
        }, {})
    )}`;


    const result = await cache(
        async () => {
            try {
                const [resultData] = await ProductModel.aggregate([
                    ...pipeline,
                    {
                        $facet: {
                            metadata: [{ $count: "total" }],
                            products: [
                                { $skip: (Number(page) - 1) * Number(limit) },
                                { $limit: limit }
                            ]
                        }
                    },
                    {
                        $project: {
                            products: 1,
                            totalCount: { $arrayElemAt: ["$metadata.total", 0] }
                        }
                    }
                ]).exec();

                const { products, totalCount } = resultData;
                const totalPages = Math.ceil(totalCount / Number(limit));

                return ApiResponse.success(
                    "Successfully fetched products",
                    {
                        products: products as IProduct[],
                        pagination: {
                            currentPage: page,
                            totalPages,
                            totalItems: totalCount,
                            itemsPerPage: limit
                        }
                    }
                );
            } catch (err: any) {
                return ApiResponse.failure(err.message);
            }
        },
        [cacheKey],
        {
            revalidate: 3600,
            tags: [
                `products-${category}`,
                ...Object.entries(params).map(
                    ([key, value]) => `products-${category}-${key}-${value}`
                ),
            ],
        }
    )();

    console.log("match", matchStage);

    return result;
}


// get featured products
export async function getFeaturedProducts() {
    await connectDb()

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
    await connectDb()

    return await cache(
        async () => {
            return ProductModel.countDocuments({ 'category.id': categoryId });
        },
        [`product-count-${categoryId}`],
        {
            revalidate: 3600,
            tags: [`product-count-${categoryId}`]
        }
    )()
}


// get categories
export async function getAllCategories() {
    await connectDb()

    const result = await cache(
        async () => {
            try {
                const categories = await CategoryModel.find().lean().exec();
                return ApiResponse.success("Fetched all categories!", categories as ICategory[])
            } catch (err: any) {
                return ApiResponse.failure(err.message)
            }
        },
        ["all-categories"],
        {
            revalidate: 3600,
            tags: ["all-categories"],
        }
    )()

    return result;
}

// get all subcategories
export async function getAllSubcategories() {
    await connectDb()

    const result = await cache(
        async () => {
            try {
                const subcategories = await SubcategoryModel.find().lean().exec();
                return ApiResponse.success("Fetched all subcategories!", subcategories as ISubcategory[])
            } catch (err: any) {
                return ApiResponse.failure(err.message)
            }
        },
        ["all-subcategories"],
        {
            revalidate: 3600,
            tags: ["all-subcategories"],
        }
    )()

    return result;
}


// get product by id
export async function getProductById(productId: string) {
    await connectDb()

    return await cache(
        async () => {
            return ProductModel.findById(productId);
        },
        [`product-${productId}`],
        {
            revalidate: 3600,
            tags: [`product-${productId}`],
        }
    )()
}

// get related products
export async function getRelatedProducts(productId: string) {
    await connectDb();

    return await cache(
        async () => {
            const product = await ProductModel.findById(productId).select('categoryId subCategoryId');
            if (!product) {
                return [];
            }

            return ProductModel.find({
                $or: [
                    { categoryId: product.categoryId },
                    { subCategoryId: product.subCategoryId }
                ]
            }).limit(4).sort({ createdAt: -1 });
        },
        [`related-products-${productId}`],
        {
            revalidate: 3600,
            tags: [`related-products-${productId}`],
        }
    )()
}

// filter category product
export async function getProductsByCategory(category: string, searchParams: ProductSearchParams) {
    await connectDb();
    const { gender, subcategory, gte, lte } = searchParams;

    const matchConditions: any = {
        'category.slug': category,
    };

    // Handle multiple values for sex
    if (gender) {
        const genderValues = gender.split(',').map(gen => gen.trim());
        matchConditions.gender = { $in: genderValues };
    }

    // Handle multiple values for subcategory
    if (subcategory) {
        const subcategoryValues = subcategory.split(',').map(s => s.trim());
        matchConditions['subcategory.slug'] = { $in: subcategoryValues };
    }

    if (gte || lte) {
        matchConditions.price = {};
        if (gte) matchConditions.price.$gte = parseFloat(gte);
        if (lte) matchConditions.price.$lte = parseFloat(lte);
    }

    // Generate a dynamic cache key based on all search parameters
    const cacheKey = `products-${category}-${JSON.stringify(searchParams)}`;

    const result = await cache(
        async () => {
            try {
                const products = await ProductModel.find(matchConditions)
                    .sort({ createdAt: -1 })
                    .lean()
                    .exec();
                return ApiResponse.success(`Successfully fetched products for category: ${category}`, products as IProduct[]);
            } catch (err: any) {
                return ApiResponse.failure(err.message);
            }
        },
        [cacheKey],
        {
            revalidate: 3600,
            tags: [
                `products-${category}`,
                ...Object.entries(searchParams).map(
                    ([key, value]) => `products-${category}-${key}-${value}`
                ),
            ],
        }
    )();

    return result;
}


// get all subcategories
export async function getSubcategoriesOfCategory(slug: string) {
    await connectDb()

    const result = await cache(
        async () => {
            try {
                const categories = await SubcategoryModel.find({ "category.slug": slug }).lean().exec();
                console.log(categories)
                return ApiResponse.success("Fetched subcategories!", categories as ISubcategory[])
            } catch (err: any) {
                return ApiResponse.failure(err.message)
            }
        },
        [`subcategories-of-${slug}`],
        {
            revalidate: 3600,
            tags: [`subcategories-of-${slug}`],
        }
    )()

    return result;
}