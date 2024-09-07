import { z } from "zod";

// order schema
export const OrderSchema = z.object({
    id: z.string(),
    customerName: z.string(),
    email: z.string(),
    trackingNumber: z.string().nullable(),
    items: z.number(),
    amount: z.number(),
    paymentMethod: z.string(),
    status: z.string(),
    orderDate: z.string().datetime(),
})