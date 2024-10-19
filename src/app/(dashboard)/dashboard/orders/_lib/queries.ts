"use server";

import { z } from "zod";
import { SortOrder } from "mongoose";
import { connectDb } from "@/server/db";
import { searchOrdersParamsSchema } from "./validations";
import { unstable_noStore as noStore } from "next/cache";
import OrderModel, { IOrder } from "@/server/db/models/order-model";

export const getOrders = async (
    input: z.infer<typeof searchOrdersParamsSchema>
): Promise<{
    success: boolean;
    message: string;
    data: { orders: IOrder[]; pageCount: number };
}> => {
    // TODO: check request can access this route

    noStore();
    await connectDb();

    const { page, per_page, sort, status } = input;
    const query: any = {};

    if (status) {
        query.status = { $in: status.split(".") };
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
        const totalorders = await OrderModel.countDocuments(query);

        // Apply pagination and sorting
        const orders = await OrderModel.find(query)
            .sort(sortField ? ({ [sortField]: sortOrder } as { [key: string]: SortOrder }) : {})
            .skip((page - 1) * per_page)
            .limit(per_page)
            .populate({ path: "customerId", select: "name email" })
            .lean()
            .exec();

        console.log(orders);

        return {
            success: true,
            message: "Successfully fetched orders",
            data: {
                orders: orders as IOrder[],
                pageCount: Math.ceil(totalorders / per_page) as number
            }
        };
    } catch (err: any) {
        return {
            success: false,
            message: err.message || "Error fetching users.",
            data: {
                orders: [],
                pageCount: 0
            }
        };
    }
};
