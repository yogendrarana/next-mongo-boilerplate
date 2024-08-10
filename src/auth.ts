import NextAuth from "next-auth"
import { authProviders } from "@/lib/constants";
import { authConfig } from "./auth.config";
import { createUser } from "@/server/actions/user";
import { getUserByEmail } from "@/server/queries/user";
import { AuthProviderEnum, UserRoleEnum } from "./server/db/models/user-model";

const basePath = "/api/auth";

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
    callbacks: {
        async signIn({ account, profile }) {
            if (account?.provider === authProviders.google && profile?.email) {
                const existingUser = await getUserByEmail(profile?.email as string);

                if (!existingUser) {
                    const res = await createUser({
                        name: profile.name as string,
                        email: profile.email as string,
                        authProvider: AuthProviderEnum.google,
                        providerAccountId: profile.sub as string,
                    })

                    if (res.success) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }

            return true
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const res = await getUserByEmail(token.email as string);
            if (!res.success && !res.user) return token;

            token.name = res.user.name;
            token.role = res.user.role;
            token.id = res.user._id;

            return token
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.sub = token.sub as string;
            }
            if (token.role && session.user) {
                session.user.role = token.role as UserRoleEnum;
            }
            if (token.id && session.user) {
                session.user.id = token.id as string;
            }

            return session;
        }
    },
    basePath,
    session: { strategy: "jwt" },
    secret: process.env.AUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
    pages: { signIn: "/auth", error: "/api/auth/error" },
    ...authConfig,
})