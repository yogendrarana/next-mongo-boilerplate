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
import { Button, type ButtonProps } from "@/components/ui/button"
import { ExternalLink, LayoutDashboard, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AuthDropdownProps
    extends React.ComponentPropsWithRef<typeof DropdownMenuTrigger>,
    ButtonProps {
}

export async function AuthDropdown({
    className,
    ...props
}: AuthDropdownProps) {
    const user = await auth();

    if (!user) {
        return (
            <Button size="sm" className={cn(className)} {...props} asChild>
                <Link href="/signin">
                    Sign In
                    <span className="sr-only">Sign In</span>
                </Link>
            </Button>
        )
    }

    // TODO: Replace with actual user data
    const initials = "YR"
    const email = "yogendrarana4321@gmail.com"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="secondary"
                    className={cn("size-8 rounded-full", className)}
                    {...props}
                >
                    <Avatar className="size-8">
                        <AvatarImage src={""} alt={""} />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            Yogendra Rana
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/signout">
                        <ExternalLink className="mr-2 size-4" aria-hidden="true" />
                        Log out
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


async function AuthDropdownGroup() {
    return (
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
    )
}
