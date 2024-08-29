import { UserRoleEnum } from "@/constants/enum"
import { type DefaultSession } from "next-auth"

export type ExtendedUser = DefaultSession["user"] & {
    role: UserRoleEnum,
    sub: string,
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}