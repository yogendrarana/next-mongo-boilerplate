"use server";

import type { z } from "zod";
import mongoose from "mongoose";
import { connectDb } from "@/server/db";
import { v4 as uuid } from "uuid";
import { auth, signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import { UpdateProfileSchema } from "../../schemas/user";
import UserModel, { IUser } from "@/server/db/models/user-model";


// create user with google provider
export async function createUser({
    name,
    email,
    authProvider,
    providerAccountId
}: Partial<IUser>) {
    try {
        await connectDb();
        const user = await UserModel.create({
            name,
            email,
            authProvider,
            providerAccountId,
            clientId: uuid()
        });

        if (!user) {
            return { success: false, message: "Failed to create user." };
        }

        // TODO: send welcome email to user if user is created successfully

        return { success: true, message: "User created successfully." };
    } catch (err: any) {
        return { success: false, message: err.message || "Internal server error" };
    }
}

// update profile
export async function updateProfile(values: z.infer<typeof UpdateProfileSchema>) {
    const { name, email } = values;
    const authSession = await auth();

    try {
        if (!authSession) {
            return { success: false, message: "Not authenticated." };
        }

        await connectDb();
        const user = await UserModel.findOneAndUpdate(
            { email },
            { name },
            { new: true }
        ).exec();


        if (!user) {
            return { success: false, message: "User not found" };
        }

        revalidatePath("/dashboard/settings");
        return { success: true, message: "Profile updated successfully." };
    } catch (error: any) {
        return { message: error.message || "Internal server error" };
    }
}


// delete user account
export async function deleteUser() {
    const authSession = await auth();
    let dbSession;

    try {
        if (!authSession) {
            return { success: false, message: "Not authenticated." };
        }

        await connectDb();

        dbSession = await mongoose.startSession();
        dbSession.startTransaction();

        const user = await UserModel.findById(authSession.user.id).session(dbSession).exec();
        if (!user) {
            await dbSession.abortTransaction();
            return { success: false, message: "User not found" };
        }

        // TODO: send email to user with account deletion confirmation
        await dbSession.commitTransaction();

        // Perform server-side signout
        await signOut({ redirect: false });

        return { success: true, message: "Account deleted successfully." };
    } catch (error: any) {
        if (dbSession) {
            await dbSession.abortTransaction();
        }
        return { success: false, message: error.message || "Internal server error" };
    } finally {
        if (dbSession) {
            dbSession.endSession();
        }
    }
}

// get user by email
export async function getUserByEmail(email: string) {
    try {
        await connectDb();
        const user = await UserModel.findOne({ email });

        if (!user) {
            return { success: false, message: "User not found", user: null };
        }

        return { success: true, message: "User found", user };
    } catch (err: any) {
        return { success: false, message: err.message || "Internal server error", user: null };
    }
}