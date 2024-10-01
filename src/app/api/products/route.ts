// app/upload/route.ts
import mongoose from "mongoose";
import cloudinary from "@/config/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import ProductModel from "@/server/db/models/product-model";
import CategoryModel from "@/server/db/models/category-model";
import SubcategoryModel from "@/server/db/models/subcategory-model";
import { generateId } from "@/lib/id";

export async function POST(req: NextRequest): Promise<NextResponse> {
    const formData = await req.formData();

    const fields: { [key: string]: any } = {};
    const images: any = [];

    // Parse form data
    for (const [key, value] of formData.entries()) {
        if (key === "images") {
            const img = value as File;
            const imageBuffer = await img.arrayBuffer();
            const mimeType = img.type;

            // Convert to base64
            const binaryString = String.fromCharCode(...new Uint8Array(imageBuffer));
            const base64Image = btoa(binaryString);

            // Create data URI
            const imageUri = `data:${mimeType};base64,${base64Image}`;
            images.push(imageUri);
        } else {
            fields[key] = value;
        }
    }

    try {
        // TODO: add transaction
        // start transaction
        // const session = await mongoose.startSession();
        // session.startTransaction();

        const cloudinaryImages = await Promise.all(
            images.map(async (img: any) => {
                const result = await cloudinary.uploader.upload(img, {
                    folder: process.env.CLOUDINARY_PRODUCT_FOLDER
                });
                return {
                    public_id: result.public_id,
                    url: result.secure_url
                };
            })
        );

        console.log(cloudinaryImages);

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
            productId: generateId("product"),
            category: {
                id: fields.category,
                slug: categorySlug
            },
            subcategory: {
                id: fields.subcategory,
                slug: subcategorySlug
            },
            sku,
            images: cloudinaryImages
        });

        await product.save();
        // await session.commitTransaction();
        // session.endSession();

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
