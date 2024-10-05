"use server";

import { connectDb } from "@/server/db";
import { CreateUserSchemaType } from "./validations";
import UserModel from "@/server/db/models/user-model";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { UserRoleEnum } from "@/constants/enum";

export async function createUser(input: CreateUserSchemaType): Promise<{
    success: boolean;
    message: string;
    data?: any;
}> {
    try {
        await connectDb();

        const user = new UserModel(input);
        await user.save();

        // revalidate the path
        revalidatePath("/dashboard/users");

        return {
            success: true,
            message: "User created successfully",
            data: user
        };
    } catch (err: any) {
        return {
            success: false,
            message: err.message || "Failed to create user"
        };
    }
}

// delete users

export const deleteUsers = async (ids: string[] | number[]) => {
    const session = await auth();
    if (!session?.user?.id || session?.user?.role !== UserRoleEnum.ADMIN) {
        return { success: false, message: "User not authenticated or unauthorized" };
    }

    try {
        await connectDb();

        // TODO: add transaction
        await UserModel.deleteMany({ _id: { $in: ids } });

        // revalidate
        revalidatePath("/dashboard/user");

        return { success: true, message: "Users deleted successfully!" };
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to delete users" };
    }
};

// update user
export const updateUser = async (input: CreateUserSchemaType, userId: string) => {
    if (!userId) {
        return { success: false, message: "User ID is required" };
    }
    try {
        await connectDb();

        const user = await UserModel.findById(userId);
        if (!user) {
            return { success: false, message: "User not found" };
        }

        user.set(input);
        await user.save();

        // revalidate
        revalidatePath("/dashboard/users");

        return { success: true, message: "User updated successfully!" };
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to update user" };
    }
};
