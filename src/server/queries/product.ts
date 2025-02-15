import { connectDb } from "../db";
import { unstable_cache as cache } from "next/cache";
import { getErrorMessage } from "@/lib/handle-error";
import { ApiResponse } from "@/helpers/api-response";
import { ProductSearchParams } from "@/constants/types/index";
import ProductModel, { IProduct } from "../db/models/product-model";

// filter products
function buildQuery(params: ProductSearchParams) {
    const {
        gte,
        lte,
        page = 1,
        limit = 20,
        gender,
        categorySlug,
        subcategorySlug,
        sort = "price",
        order = ""
    } = params;

    // Match stage
    const matchStage: any = {};

    if (categorySlug) {
        const categoryValues = categorySlug.split(",").map((s) => s.trim());
        matchStage["category.slug"] = { $in: categoryValues };
    }

    if (subcategorySlug) {
        const subcategoryValues = subcategorySlug.split(",").map((s) => s.trim());
        matchStage["subcategory.slug"] = { $in: subcategoryValues };
    }

    if (gender) {
        const genderValues = gender.split(",").map((gen) => gen.trim());
        matchStage.gender = { $in: genderValues };
    }

    if (gte || lte) {
        matchStage.price = {};
        if (gte) matchStage.price.$gte = parseFloat(gte);
        if (lte) matchStage.price.$lte = parseFloat(lte);
    }

    // Sort stage
    const sortStage: any = {};
    sortStage[sort] = order === "asc" ? 1 : -1;

    // Pagination stages (add to pipeline later)
    const paginationStage = [
        { $skip: (Number(page) - 1) * Number(limit) },
        { $limit: Number(limit) }
    ];

    return { matchStage, sortStage, paginationStage };
}

// get products
export async function getFilteredProducts(params: ProductSearchParams) {
    await connectDb();

    const { page, limit } = params;
    const { matchStage, sortStage, paginationStage } = await buildQuery(params);

    const pipeline = [
        { $match: matchStage },
        { $sort: sortStage },
        {
            $facet: {
                metadata: [{ $count: "total" }],
                products: [...paginationStage]
            }
        },
        {
            $project: {
                products: 1,
                totalCount: { $arrayElemAt: ["$metadata.total", 0] }
            }
        }
    ];

    // Generate a dynamic cache key based on all search parameters
    const cacheKey = `store-${JSON.stringify(
        Object.keys(params)
            .sort()
            .reduce((obj: { [key: string]: any }, key) => {
                obj[key] = params[key];
                return obj;
            }, {})
    )}`;

    const result = await cache(
        async () => {
            try {
                const [res] = await ProductModel.aggregate(pipeline).exec();
                const { products, totalCount } = res;
                const totalPages = Math.ceil(totalCount / Number(limit));
                return ApiResponse.success("Successfully fetched products", {
                    products: products as IProduct[],
                    pagination: {
                        currentPage: page,
                        totalPages,
                        totalItems: totalCount,
                        itemsPerPage: limit
                    }
                });
            } catch (err: any) {
                return ApiResponse.failure(err.message);
            }
        },
        [cacheKey],
        {
            revalidate: 3600,
            tags: [
                "store",
                ...Object.entries(params).map(([key, value]) => `store-${key}-${value}`)
            ]
        }
    )();

    return result;
}


// get featured products
export async function getFeaturedProducts() {
    await connectDb();

    return await cache(
        async () => {
            return ProductModel.find().limit(8).sort({ createdAt: -1 }).lean<IProduct[]>();
        },
        ["featured-products"],
        {
            revalidate: 3600,
            tags: ["featured-products"]
        }
    )();
}

// get product count by category
export async function getProductCountByCategory({ categoryId }: { categoryId: string }) {
    await connectDb();

    return await cache(
        async () => {
            return ProductModel.countDocuments({ "category.id": categoryId });
        },
        [`product-count-${categoryId}`],
        {
            revalidate: 3600,
            tags: [`product-count-${categoryId}`]
        }
    )();
}

// get product by id
export async function getProductById(productId: string) {
    await connectDb();

    return await cache(
        async () => {
            return ProductModel.findById(productId).lean<IProduct>();
        },
        [`product-${productId}`],
        {
            revalidate: 3600,
            tags: [`product-${productId}`]
        }
    )();
}

// get related products
export async function getRelatedProducts(productId: string) {
    await connectDb();

    return await cache(
        async () => {
            const product = await ProductModel.findById(productId).select(
                "categoryId subCategoryId"
            );
            if (!product) {
                return [];
            }

            return ProductModel.find({
                $or: [{ categoryId: product.categoryId }, { subCategoryId: product.subCategoryId }]
            })
                .limit(4)
                .sort({ createdAt: -1 });
        },
        [`related-products-${productId}`],
        {
            revalidate: 3600,
            tags: [`related-products-${productId}`]
        }
    )();
}

// search product
export const searchProduct = async ({ query }: { query: string }) => {
    await connectDb();

    try {
        const product = await ProductModel.find({ name: { $regex: query, $options: "i" } })
            .lean()
            .exec();
        return { success: true, message: "Product created successfully!", data: product };
    } catch (err: any) {
        const errMsg = getErrorMessage(err);
        return { success: false, message: errMsg, data: null };
    }
};
