import { connectDb } from "../db";
import { ApiResponse } from "@/helpers/api-response";
import SubcategoryModel, { ISubcategory } from "../db/models/subcategory-model";
import { unstable_cache as cache, unstable_noStore as noStore } from "next/cache";

// get all subcategories
export async function getAllSubcategories() {
    await connectDb();

    const result = await cache(
        async () => {
            try {
                const subcategories = await SubcategoryModel.find().lean().exec();
                return ApiResponse.success(
                    "Fetched all subcategories!",
                    subcategories as ISubcategory[]
                );
            } catch (err: any) {
                return ApiResponse.failure(err.message);
            }
        },
        ["all-subcategories"],
        {
            revalidate: 3600,
            tags: ["all-subcategories"]
        }
    )();

    return result;
}

// get all subcategories of a category
export async function getSubcategoriesOfCategory(slug: string) {
    await connectDb();

    const result = await cache(
        async () => {
            try {
                const categories = await SubcategoryModel.find({ "category.slug": slug })
                    .lean()
                    .exec();
                return ApiResponse.success("Fetched subcategories!", categories as ISubcategory[]);
            } catch (err: any) {
                return ApiResponse.failure(err.message);
            }
        },
        [`subcategories-of-${slug}`],
        {
            revalidate: 3600,
            tags: [`subcategories-of-${slug}`]
        }
    )();

    return result;
}
