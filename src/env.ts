import { z } from "zod"
import { createEnv } from "@t3-oss/env-nextjs"

export const env = createEnv({
    server: {
        NODE_ENV: z
            .enum(["development", "test", "production"])
            .default("development"),
        MONGO_URI: z.string().url(),
        RESEND_API_KEY: z.string().min(1),
        EMAIL_FROM_ADDRESS: z.string().email(),
        UPSTASH_REDIS_REST_URL: z.string().url(),
        UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
        STRIPE_API_KEY: z.string().min(1),
        STRIPE_WEBHOOK_SECRET: z.string().min(1),
        STRIPE_STD_MONTHLY_PRICE_ID: z.string().min(1),
        STRIPE_PRO_MONTHLY_PRICE_ID: z.string().min(1),
    },


    client: {
        NEXT_PUBLIC_APP_URL: z.string().url(),
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
    },

    /**
     * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
     * middlewares) or client-side so we need to destruct manually.
     */
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        MONGO_URI: process.env.MONGO_URI,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        RESEND_API_KEY: process.env.RESEND_API_KEY,
        EMAIL_FROM_ADDRESS: process.env.EMAIL_FROM_ADDRESS,
        UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
        UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
        STRIPE_API_KEY: process.env.STRIPE_API_KEY,
        STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
        STRIPE_STD_MONTHLY_PRICE_ID: process.env.STRIPE_STD_MONTHLY_PRICE_ID,
        STRIPE_PRO_MONTHLY_PRICE_ID: process.env.STRIPE_PRO_MONTHLY_PRICE_ID,
    },
    /**
     * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
     * useful for Docker builds.
     */
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    /**
     * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
     * `SOME_VAR=''` will throw an error.
     */
    emptyStringAsUndefined: true,
})
