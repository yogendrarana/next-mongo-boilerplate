import * as React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Shell } from "@/components/shell";
import { SiteHeader } from "@/components/layout/site-header";
import { DashboardSidebar } from "../_components/dashboard-sidebar";

interface DashboardStoreLayoutProps {
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
                    <DashboardSidebar className="h-full sticky top-24 w-[15rem] hidden lg:block" />
                    <main className="w-full">{children}</main>
                </div>
            </Shell>
        </div>
    );
}
