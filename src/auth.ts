import NextAuth from "next-auth";
import { authProviders } from "@/constants";
import { authConfig } from "./auth.config";
import { createUser } from "@/server/actions/user";
import { getUserByEmail } from "@/server/queries/user";
import { AuthProviderEnum, UserRoleEnum } from "./constants/enum";

const basePath = "/api/auth";

export const {
    handlers: { GET, POST },
    signIn,
    signOut,
    auth
} = NextAuth({
    ...authConfig,
    callbacks: {
        async signIn({ account, profile }) {
            try {
                if (account?.provider === authProviders.google && profile?.email) {
                    const existingUser = await getUserByEmail(profile?.email as string);
                    if (!existingUser.success && !existingUser.user) {
                        const res = await createUser({
                            name: profile.name ?? "",
                            email: profile.email,
                            authProvider: AuthProviderEnum.GOOGLE,
                            providerAccountId: profile.sub ?? ""
                        });

                        return res.success;
                    }
                }
                return true;
            } catch (err: any) {
                console.error(err);
                return false;
            }
        },
        async jwt({ token }) {
            try {
                if (!token.sub) return token;

                const res = await getUserByEmail(token.email ?? "");
                if (!res.success || !res.user) return token;

                token.name = res.user.name;
                token.role = res.user.role;
                token.id = res.user._id;

                return token;
            } catch (error) {
                console.error("Error in jwt callback:", error);
                return token;
            }
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.sub = token.sub;
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
    debug: process.env.NODE_ENV === "development",
    pages: { signIn: "/login", error: "/api/auth/error" }
});
