import { connectDb } from "@/server/db";
import CategoryModel from "@/server/db/models/category-model";
import ProductModel from "@/server/db/models/product-model";
import SubcategoryModel from "@/server/db/models/subcategory-model";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// GET: api/products/productId
export async function GET(req: NextRequest): Promise<NextResponse> {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");
    if (!productId) {
        return NextResponse.json(
            { success: false, message: "Product ID is required" },
            { status: 400 }
        );
    }

    await connectDb();

    try {
        const product = await ProductModel.findById(productId).lean().exec();
        if (!product) {
            return NextResponse.json(
                { success: false, message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Product created successfully!", data: product },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message || "Failed to create product" },
            { status: 500 }
        );
    }
}

// PATCH: /api/products/[productId]
export async function PATCH(
    req: NextRequest,
    { params }: { params: { productId: string } }
): Promise<NextResponse> {
    const { productId } = params;
    if (!productId) {
        return NextResponse.json(
            { success: false, message: "Product ID is required" },
            { status: 400 }
        );
    }

    await connectDb();
    try {
        const formData = await req.formData();
        const fields: { [key: string]: any } = {};

        for (const [key, value] of formData.entries()) {
            fields[key] = value;
        }

        // categories and subcategories
        const category = await CategoryModel.findById(fields.category).exec();
        const subcategory = await SubcategoryModel.findById(fields.subcategory).exec();

        // const category slug
        const categorySlug = category?.slug;
        const subcategorySlug = subcategory?.slug;

        const data = {
            ...fields,
            category: {
                id: fields.category,
                slug: categorySlug
            },
            subcategory: {
                id: fields.subcategory,
                slug: subcategorySlug
            }
        }

        await ProductModel.findByIdAndUpdate({ _id: productId }, data, { new: true }).exec();

        return NextResponse.json(
            { success: true, message: "Product updated successfully!", revalidated: false },
            { status: 200 }
        );
    } catch (err: any) {
        return NextResponse.json(
            { success: false, message: err.message || "Failed to update product" },
            { status: 500 }
        );
    }
}
