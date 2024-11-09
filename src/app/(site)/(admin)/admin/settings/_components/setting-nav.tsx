"use client"

import React, { act } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";



const SettingNav = () => {
    const pathname = usePathname();

    const settings = [
        {
            name: 'General',
            href: '/dashboard/settings',
            active: pathname === '/dashboard/settings',
        },
        {
            name: 'Billing',
            href: '/dashboard/settings/billing',
            active: pathname === '/dashboard/settings/billing',
        },
    ];

    return (
        <div className="mb-2 flex gap-2">
            {settings.map((setting, index) => (
                <Link 
                    key={index}
                    href={setting.href}
                    className={cn(
                        "px-3 py-2 rounded-md hover:bg-gray-100 duration-200",
                        setting.active ? "bg-gray-100" : "text-muted-foreground",
                    )}
                >{setting.name}</Link>    
            ))}
        </div>
    )
};

export default SettingNav;
