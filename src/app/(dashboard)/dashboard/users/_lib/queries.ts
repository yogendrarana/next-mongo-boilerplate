"use server";

import { SortOrder } from "mongoose";
import { connectDb } from "@/server/db";
import { GetUsersInputType } from "./validations";
import { unstable_noStore as noStore } from "next/cache";
import UserModel, { IUser } from "@/server/db/models/user-model";

export const getUsers = async (
    input: GetUsersInputType
): Promise<{
    success: boolean;
    message: string;
    data: { users: IUser[]; pageCount: number };
}> => {
    // TODO: check request can access this route

    noStore();
    await connectDb();

    const { page, per_page, sort, name, role } = input;
    const query: any = {};
    if (name) {
        query.name = { $regex: name, $options: "i" };
    }

    if (role) {
        query.role = role;
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
        const totalusers = await UserModel.countDocuments(query);

        // Apply pagination and sorting
        const users = await UserModel.find(query)
            .sort(sortField ? ({ [sortField]: sortOrder } as { [key: string]: SortOrder }) : {})
            .skip((page - 1) * per_page)
            .limit(per_page)
            .lean()
            .exec();

        return {
            success: true,
            message: "Successfully fetched users",
            data: {
                users: users as IUser[],
                pageCount: Math.ceil(totalusers / per_page) as number
            }
        };
    } catch (err: any) {
        return {
            success: false,
            message: err.message || "Error fetching users.",
            data: {
                users: [],
                pageCount: 0
            }
        };
    }
};
