// app/upload/route.ts
import CategoryModel from "@/server/db/models/category-model";
import ProductModel from "@/server/db/models/product-model";
import SubcategoryModel from "@/server/db/models/subcategory-model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    const formData = await req.formData();

    const fields: { [key: string]: any } = {};
    const images: FormDataEntryValue[] = [];

    // Parse form data
    formData.forEach((value, key) => {
        if (key === "images") {
            images.push(value);
        } else {
            fields[key] = value;
        }
    });

    try {
        // TODO: Handle image uploads

        // categories and subcategories
        const category = await CategoryModel.findById(fields.category).exec();
        const subcategory = await SubcategoryModel.findById(fields.subcategory).exec();

        // const category slug
        const categorySlug = category?.slug;
        const subcategorySlug = subcategory?.slug;
        const uniqueIdentifier = Math.random().toString(36).substring(0, 10).toUpperCase();

        const sku = `${categorySlug}-${subcategorySlug}-${uniqueIdentifier}`;

        // Create product in the database
        const product = new ProductModel({
            ...fields,
            category: {
                id: fields.category,
                slug: categorySlug
            },
            subcategory: {
                id: fields.subcategory,
                slug: subcategorySlug
            },
            sku,
            images: []
        });

        await product.save();

        return NextResponse.json(
            { success: true, message: "Product created successfully!" },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message || "Failed to create product" },
            { status: 500 }
        );
    }
}
