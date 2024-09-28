import { connectDb } from "@/server/db";
import { GetProductsSchemaType } from "./validations";
import { unstable_noStore as noStore } from "next/cache";
import ProductModel, { IProduct } from "@/server/db/models/product-model";
import CategoryModel, { ICategory } from "@/server/db/models/category-model";
import SubcategoryModel, { ISubcategory } from "@/server/db/models/subcategory-model";
import { SortOrder } from "mongoose";

// get categories
export async function getCategories(): Promise<{
    success: boolean;
    message: string;
    data: ICategory[] | null;
}> {
    await connectDb();

    try {
        const categories = await CategoryModel.find().lean().exec();
        return {
            success: true,
            message: "Fetched all categories!",
            data: categories as ICategory[]
        };
    } catch (err: any) {
        return { success: false, message: "Failed to fetch categories!", data: null };
    }
}

// get subcategories
export async function getSubcategories(): Promise<{
    success: boolean;
    message: string;
    data: ISubcategory[] | null;
}> {
    await connectDb();

    try {
        const categories = await SubcategoryModel.find().lean().exec();
        return {
            success: true,
            message: "Fetched all subcategories!",
            data: categories as ISubcategory[]
        };
    } catch (err: any) {
        return { success: false, message: "Failed to fetch subcatecories!", data: null };
    }
}


// get products
// get all products
export const getProducts = async (
    input: GetProductsSchemaType
): Promise<{
    success: boolean;
    message: string;
    data: { products: IProduct[]; pageCount: number };
}> => {
    noStore();
    await connectDb();

    const { page, per_page, sort, name, category, subcategory } = input;
    const query: any = {};

    if (name) {
        query.name = { $regex: name, $options: "i" };
    }

    if (category) {
        const categoryValues = category.split(".").map((s: string) => s.trim());
        query["category.slug"] = { $in: categoryValues };
    }

    if (subcategory) {
        const subcategoryValues = subcategory.split(".").map((s: string) => s.trim());
        query["subcategory.slug"] = { $in: subcategoryValues };
    }

    // Parse sort field and order
    let sortField = "createdAt";
    let sortOrder = -1;
    if (sort) {
        const [field, order] = sort.split(".");
        sortField = field;
        sortOrder = order === "desc" ? -1 : 1;
    }

    try {
        const totalProducts = await ProductModel.countDocuments(query);

        // Apply pagination and sorting
        const products = await ProductModel.find(query)
            .sort(sortField ? ({ [sortField]: sortOrder } as { [key: string]: SortOrder }) : {})
            .skip((page - 1) * per_page)
            .limit(per_page)
            .lean()
            .exec();

        return {
            success: true,
            message: "Successfully fetched products",
            data: {
                products: products as IProduct[],
                pageCount: Math.ceil(totalProducts / per_page) as number
            }
        };
    } catch (err: any) {
        return {
            success: false,
            message: err.message,
            data: {
                products: [],
                pageCount: 0
            }
        };
    }
};