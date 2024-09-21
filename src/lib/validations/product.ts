import { z } from "zod";

export const GetProductsSchema = z.object({
    page: z.coerce.number().default(1),
    per_page: z.coerce.number().default(8),
    sort: z.string().optional().default("createdAt.desc"),
    categories: z.string().optional(),
    subcategory: z.string().optional(),
    subcategories: z.string().optional(),
    price_range: z.string().optional(),
    active: z.string().optional().default("true"),
})

export const CreateProductSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number().positive(),
    stock: z.number().positive(),
    category: z.string(),
    subcategory: z.string(),
    image: z.string(),
    active: z.boolean().default(true),
})