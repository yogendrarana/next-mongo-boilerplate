import * as z from "zod";

export const searchUsersParamsSchema = z.object({
    page: z.coerce.number().default(1),
    per_page: z.coerce.number().default(10),
    sort: z.string().optional(),
    name: z.string().optional(),
    role: z.string().optional(),
    from: z.string().optional(),
    to: z.string().optional()
});

export const createUserSchema = z.object({
    name: z.string({ message: "Name is required" }),
    email: z.string({ message: "Email is required" }),
    phone: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    role: z.string({ message: "Role is required" }),
    password: z.string({ message: "Password is required" })
});

export type GetUsersInputType = z.infer<typeof searchUsersParamsSchema>;
export type CreateUserSchemaType = z.infer<typeof createUserSchema>;
