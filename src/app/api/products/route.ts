// app/upload/route.ts
import mongoose from "mongoose";
import cloudinary from "@/config/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import ProductModel from "@/server/db/models/product-model";
import CategoryModel from "@/server/db/models/category-model";
import SubcategoryModel from "@/server/db/models/subcategory-model";
import { generateId } from "@/lib/id";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest): Promise<NextResponse> {
    const formData = await req.formData();

    const fields: { [key: string]: any } = {};
    const imageUris: any = [];

    // Parse form data
    for (const [key, value] of formData.entries()) {
        if (key === "images") {
            const images = formData.getAll("images");

            for (const img of images) {
                const file = img as File;
                const imageBuffer = await file.arrayBuffer();
                const mimeType = file.type;

                // Convert to base64
                const base64Image = btoa(
                    new Uint8Array(imageBuffer).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ""
                    )
                );

                // Create data URI
                const dataUri = `data:${mimeType};base64,${base64Image}`;
                imageUris.push(dataUri);
            }
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
            imageUris.map(async (img: any) => {
                const result = await cloudinary.uploader.upload(img, {
                    folder: process.env.CLOUDINARY_PRODUCT_FOLDER
                });
                return {
                    public_id: result.public_id,
                    url: result.secure_url
                };
            })
        );

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

        // revalidate the path
        revalidatePath("/dashboard/products");

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
