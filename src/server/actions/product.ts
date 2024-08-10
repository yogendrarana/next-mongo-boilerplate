"use server"

import { getErrorMessage } from "@/lib/handle-error";
import { unstable_noStore as noStore, revalidatePath } from "next/cache"

export const searchProduct = async ({ query }: { query: string }) => {
    noStore()

    if (query.length === 0) {
        return { success: false, message: "Query is empty" }
    }

    try {
        // TODO: Implement search product logic
        return {
            success: true,
            message: "Product found",
            data: [
                {
                    id: 1,
                    name: "Product 1",
                    price: 100,
                },
                {
                    id: 2,
                    name: "Product 2",
                    price: 200,
                }
            ],
        };
    } catch (err: any) {
        return { success: false, message: getErrorMessage(err) };
    }
};