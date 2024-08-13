import { ApiResponse } from "@/helpers/api-response";
import { connectDb } from "../db";
import ProductModel from "../db/models/product-model";
import { getErrorMessage } from "@/lib/handle-error";

// search products
export const searchProduct = async ({ query }: { query: string }): Promise<ApiResponse> => {
    await connectDb()

    if (query.length === 0) {
        return ApiResponse.failure("Query is empty");
    }

    try {
        // const products = await ProductModel.find({ $text: { $search: query } }).limit(5);

        return ApiResponse.success("Products found", []);
    } catch (err: any) {
        return ApiResponse.failure(getErrorMessage(err));
    }
};