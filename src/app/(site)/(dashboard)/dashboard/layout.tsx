import * as React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Shell } from "@/components/utils/shell";
import { SiteHeader } from "@/components/layout/site-header";
import { DashboardSidebar } from "../_components/dashboard-sidebar";

interface DashboardStoreLayoutProps {
    params: {
        storeId: string;
    };
    children: React.ReactNode;
}

export default async function DashboardStoreLayout({ children }: DashboardStoreLayoutProps) {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return (
        <Shell className="px-0 min-h-screen">
            <SiteHeader />
            <div className="flex h-full py-2">
                <DashboardSidebar className="h-full w-[15rem] hidden lg:block" />
                <div className="w-full">
                    <main className="w-full">{children}</main>
                </div>
            </div>
        </Shell>
    );
}
