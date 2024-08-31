"use client"

import * as z from "zod"
import * as React from "react"
import { toast } from "sonner"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/utils/icons"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { userAuthSchema } from "@/lib/validations/auth"
import { buttonVariants } from "@/components/ui/button"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(userAuthSchema),
    })
    const searchParams = useSearchParams()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    async function onSubmit(data: FormData) {
        setIsLoading(true)

        const signInResult = await signIn("email", {
            email: data.email.toLowerCase(),
            redirect: false,
            callbackUrl: searchParams?.get("from") || "/dashboard",
        })

        setIsLoading(false)

        if (!signInResult?.ok) {
            return toast.message('Something went wrong.', {
                description: 'Your sign in request failed. Please try again.',
            })
        }

        return toast('Check your email', {
            description: "We sent you a login link. Be sure to check your spam too.",
        })
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...register("email")}
                        />
                        {errors?.email && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Password
                        </Label>
                        <Input
                            id="password"
                            placeholder="********"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="password"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...register("email")}
                        />
                        {errors?.password && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <button className={cn(buttonVariants())} disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Sign In with Email
                    </button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <button
                type="button"
                className={cn(buttonVariants({ variant: "outline" }), "bg-gray-100")}
                onClick={() => signIn("google", { callbackUrl: DEFAULT_LOGIN_REDIRECT })}
                disabled={isLoading}
            >

                <Icons.google className="mr-2 h-4 w-4" />
                {" "}
                Google
            </button>
        </div>
    )
}