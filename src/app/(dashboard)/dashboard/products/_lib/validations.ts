import * as z from "zod";

export const searchProductsParamsSchema = z.object({
    page: z.coerce.number().default(1),
    per_page: z.coerce.number().default(10),
    sort: z.string().optional(),
    name: z.string().optional(),
    category: z.string().optional(),
    subcategory: z.string().optional(),
    from: z.string().optional(),
    to: z.string().optional(),
    operator: z.enum(["and", "or"]).optional()
});

export const createProductSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Price must be a positive number"
    }),
    category: z.string({ message: "Category is required" }),
    subcategory: z.string({ message: "Subcategory is required" }),
    inventory: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
        message: "Inventory must be a positive number"
    }),
    gender: z.string({
        message: "Gender is required"
    }),
    description: z.string({
        message: "Description is required"
    }),
    images: z.array(z.instanceof(File)).min(1, "At least one image is required")
});

// type definition for above schemas
export type CreateProductSchemaType = z.infer<typeof createProductSchema>;
export type GetProductsSchemaType = z.infer<typeof searchProductsParamsSchema>;
