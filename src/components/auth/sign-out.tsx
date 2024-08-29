"use client";

import { toast } from "sonner";
import { LogOutIcon } from "lucide-react";
import { handleSignOut } from "@/server/actions/auth";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function SignOut() {
    const iconSize = 15;

    const handleLogout = async () => {
        toast.promise(handleSignOut, {
            loading: "Signing out...",
            error: "Failed to sign out. Please try again.",
        });
    };

    return (
        <DropdownMenuItem onClick={handleLogout}>
            <div className="flex items-center space-x-3 cursor-pointer">
                <LogOutIcon size={iconSize} />
                <span>Log Out</span>
            </div>
        </DropdownMenuItem>
    );
}