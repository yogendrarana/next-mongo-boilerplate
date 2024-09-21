import { connectDb } from "../db";
import { ApiResponse } from "@/helpers/api-response";
import { getErrorMessage } from "@/lib/handle-error";
import { IProductBase } from "../db/models/product-model";

// create product
export const createProduct = async (product: IProductBase) => {
    await connectDb();

    try {
        return { success: true, message: "Product created successfully!", data: product }
    } catch (err: any) {
        const errMsg = getErrorMessage(err)
        return { success: false, message: errMsg, data: null }
    }
}