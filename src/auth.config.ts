import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { getUserByEmail } from "./server/queries/user";
import { validatePassword } from "./lib/auth/password";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        }),
        CredentialsProvider({
            id: "creadentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const { email, password } = credentials ?? {};
                    if (!credentials || typeof email !== "string" || typeof password !== "string") {
                        throw new Error("Credentials not provided");
                    }

                    if (!email || !password) {
                        throw new Error("Email and password are required");
                    }

                    const { success, user } = await getUserByEmail(email);

                    if (!success || !user) {
                        throw new Error("User not found");
                    }

                    const passwordMatch = await validatePassword({
                        password,
                        passwordHash: user.passwordHash
                    });

                    if (!passwordMatch) {
                        throw new Error("Invalid credentials");
                    }

                    return user;
                } catch (err: any) {
                    console.error(err);
                    return null;
                }
            }
        })
    ]
} satisfies NextAuthConfig;
