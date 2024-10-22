import { z } from "zod";

export const searchOrdersParamsSchema = z.object({
    page: z.coerce.number().default(1),
    per_page: z.coerce.number().default(10),
    sort: z.string().optional(),
    name: z.string().optional(),
    status: z.string().optional(),
    from: z.string().optional(),
    to: z.string().optional()
});
