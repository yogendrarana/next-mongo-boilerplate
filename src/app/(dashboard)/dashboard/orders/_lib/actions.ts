"use server";

import { auth } from "@/auth";
import { connectDb } from "@/server/db";
import { revalidatePath } from "next/cache";
import { UserRoleEnum } from "@/constants/enum";
import OrderModel from "@/server/db/models/order-model";

export const deleteOrders = async (ids: string[] | number[]) => {
    console.log("deleteOrders");
    const session = await auth();
    if (!session?.user?.id || session?.user?.role !== UserRoleEnum.ADMIN) {
        return { success: false, message: "User not authenticated or unauthorized" };
    }

    try {
        await connectDb();

        // TODO: add transaction
        // const session = await mongoose.startSession();
        // session.startTransaction();
        await OrderModel.deleteMany({ _id: { $in: ids } });

        
        // await session.commitTransaction();
        // session.endSession();
        
        // revalidate
        revalidatePath("/dashboard/orders");
        
        return { success: true, message: "Orders deleted successfully!" };
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to delete order" };
    }
};
