"use server";

import { connectDb } from "@/server/db";
import { CreateProductSchemaType } from "./validations";
import ProductModel from "@/server/db/models/product-model";
import CategoryModel from "@/server/db/models/category-model";
import SubcategoryModel from "@/server/db/models/subcategory-model";
import { auth } from "@/auth";
import { UserRoleEnum } from "@/constants/enum";
import cloudinary from "@/config/cloudinary";
import { revalidatePath } from "next/cache";

export const createProduct = async (product: CreateProductSchemaType) => {
    await connectDb();
    try {
        const category = await CategoryModel.findById(product.category);
        const subcategory = await SubcategoryModel.findById(product.subcategory);

        const productData = {
            ...product,
            category: { id: category?._id, slug: category?.slug },
            subcategory: { id: subcategory?._id, slug: subcategory?.slug }
        };

        await ProductModel.create(productData);

        // revalidate the path
        revalidatePath("/dashboard/products");

        return { success: true, message: "Product created successfully!" };
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to create product" };
    }
};

export const deleteProducts = async (ids: string[] | number[]) => {
    const session = await auth();
    if (!session?.user?.id || session?.user?.role !== UserRoleEnum.ADMIN) {
        return { success: false, message: "User not authenticated or unauthorized" };
    }

    try {
        await connectDb();

        // TODO: add transaction
        await Promise.all(
            ids.map(async (id) => {
                // delete images from cloudinary
                const product = await ProductModel.findById(id);
                if (!product) {
                    return { success: false, message: `Product with ID ${id} not found.` };
                }

                if (product?.images?.length) {
                    await Promise.all(
                        product.images.map(async ({ public_id }: { public_id: string }) => {
                            await cloudinary.uploader.destroy(public_id);
                        })
                    );
                }

                // delete the product
                await ProductModel.deleteOne({ _id: id });

                // revalidate the path
                revalidatePath("/dashboard/products");
            })
        );

        return { success: true, message: "Products deleted successfully!" };
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to delete products" };
    }
};
