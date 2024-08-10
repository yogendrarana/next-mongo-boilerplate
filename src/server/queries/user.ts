import { connectDb } from "../db";
import UserModel from "../db/models/user-model";

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