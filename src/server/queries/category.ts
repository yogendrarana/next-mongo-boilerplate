import { connectDb } from "../db";
import CategoryModel, { ICategory } from "../db/models/category-model";
import { unstable_cache as cache, unstable_noStore as noStore } from "next/cache";

// get categories
export async function getAllCategories(): Promise<{
    success: boolean;
    message: string;
    data: ICategory[] | null;
}> {
    await connectDb();

    const result = await cache(
        async () => {
            try {
                const categories = await CategoryModel.find().lean().exec();
                return {
                    success: true,
                    message: "Fetched all categories!",
                    data: categories as ICategory[]
                };
            } catch (err: any) {
                return { success: true, message: "Fetched all categories!", data: null };
            }
        },
        ["all-categories"],
        {
            revalidate: 3600,
            tags: ["all-categories"]
        }
    )();

    return result;
}
