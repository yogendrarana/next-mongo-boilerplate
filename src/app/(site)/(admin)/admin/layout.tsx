import * as React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Shell } from "@/components/shell";
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

    if (!session || !session.user) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen">
            <SiteHeader />
            <Shell>
                <div className="flex py-4 md:py-10">
                    <DashboardSidebar className="h-full w-[15rem] hidden lg:block" />
                    <div className="w-full">
                        <main className="w-full">{children}</main>
                    </div>
                </div>
            </Shell>
        </div>
    );
}
