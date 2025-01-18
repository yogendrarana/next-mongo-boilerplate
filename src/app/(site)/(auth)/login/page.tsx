import React from "react"

import Link from "next/link"
import { Metadata } from "next"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { ComponentBooleanIcon } from "@radix-ui/react-icons"
import { UserAuthForm } from "../_components/user-auth-form"

export const metadata: Metadata = {
    title: "Login",
    description: "Login to your account",
}

export default function LoginPage() {
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
            <Link
                href="/"
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute left-4 top-4 md:left-8 md:top-8"
                )}
            >
                <React.Fragment>
                    <Icons.chevronLeft className="mr-2 h-4 w-4" />
                    Back
                </React.Fragment>
            </Link>
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <ComponentBooleanIcon className="mx-auto h-16 w-16" aria-hidden={true} />
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Welcome back
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your email to sign in to your account
                    </p>
                </div>
                <UserAuthForm />
                <p className="px-8 text-center text-sm text-muted-foreground">
                    <Link
                        href="/register"
                        className="hover:text-brand"
                    >
                        Don&apos;t have an account? <span className="underline">Sign Up</span>
                    </Link>
                </p>
            </div>
        </div>
    )
} 