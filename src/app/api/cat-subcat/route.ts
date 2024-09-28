// app/api/categories/route.ts
import { connectDb } from "@/server/db";
import { NextResponse } from "next/server";
import CategoryModel from "@/server/db/models/category-model";
import SubcategoryModel from "@/server/db/models/subcategory-model";

export async function GET(): Promise<NextResponse> {
    try {
        await connectDb();
        const categories = await CategoryModel.find().lean().exec();
        const subcategories = await SubcategoryModel.find().lean().exec();

        return NextResponse.json(
            {
                success: true,
                message: "Fetched all categories!",
                data: {
                    categories: categories,
                    subcategories: subcategories
                }
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch categories!",
                data: null
            },
            { status: 500 }
        );
    }
}
