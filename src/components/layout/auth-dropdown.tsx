import * as React from "react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { auth } from "@/auth"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button, buttonVariants, type ButtonProps } from "@/components/ui/button"
import { LayoutDashboard, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getNameInitials } from "@/helpers/user"
import { SignOut } from "../auth/sign-out"

interface AuthDropdownProps
    extends React.ComponentPropsWithRef<typeof DropdownMenuTrigger>,
    ButtonProps {
}

export async function AuthDropdown({
    className,
    ...props
}: AuthDropdownProps) {
    const session = await auth();
    console.log(session)

    if (!session) {
        return (
            <Button
                size="sm"
                variant="secondary"
                className={cn(className, "px-4 border")}
                {...props}
                asChild
            >
                <Link href="/login">
                    Login
                    <span className="sr-only">Login</span>
                </Link>
            </Button>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                name={session.user.name ?? "User Menu"}
                className={buttonVariants({ variant: "ghost", size: "icon" })}
            >
                {session.user.image && session.user.name && (
                    <Avatar
                        className={buttonVariants({
                            variant: "outline",
                            className: "p-1",
                        })}
                    >
                        <AvatarImage src={session.user.image} alt="avatar" className="object-contain" />
                        <AvatarFallback>{getNameInitials(session?.user?.name || "")}</AvatarFallback>
                    </Avatar>
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount >
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {session.user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {session.user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard">
                            <LayoutDashboard className="mr-2 size-4" aria-hidden="true" />
                            Dashboard
                            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard/billing">
                            <Icons.credit className="mr-2 size-4" aria-hidden="true" />
                            Billing
                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard/settings">
                            <Settings className="mr-2 size-4" aria-hidden="true" />
                            Settings
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <SignOut />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}