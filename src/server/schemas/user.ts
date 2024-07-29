import { z } from "zod";

// email schema
export const EmailSchema = z.string().email({ message: "Invalid email address" })

// update profile schema
export const UpdateProfileSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Name is required." })
        .max(50, { message: "The name must be 50 characters or less." }),
    email: z
        .string()
        .email({ message: "Invalid email address." }),
});