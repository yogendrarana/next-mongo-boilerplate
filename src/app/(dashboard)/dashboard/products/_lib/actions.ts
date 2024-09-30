"use server";

import { connectDb } from "@/server/db";
import { CreateProductSchemaType } from "./validations";
import ProductModel from "@/server/db/models/product-model";
import CategoryModel from "@/server/db/models/category-model";
import SubcategoryModel from "@/server/db/models/subcategory-model";

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
        return { success: true, message: "Product created successfully!" };
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to create product" };
    }
};

export const deleteProducts = async (ids: string[] | number[]) => {
    console.log("Deleted product");
};
