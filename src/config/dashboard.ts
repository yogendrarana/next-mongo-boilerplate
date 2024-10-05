import { type SidebarNavItem } from "@/constants/types"

export interface DashboardConfig {
    sidebarNav: SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
    sidebarNav: [
        {
            title: "Analytics",
            href: "/dashboard/analytics",
            icon: "analytics",
            external: false,
        },
        {
            title: "Products",
            href: "/dashboard/products",
            icon: "products",
            external: false,
        },
        {
            title: "Users",
            href: "/dashboard/users",
            icon: "users",
            external: false,
        },
        {
            title: "Orders",
            href: "/dashboard/orders",
            icon: "orders",
            external: false,
        },
        {
            title: "Settings",
            href: "/dashboard/settings",
            icon: "settings",
            external: false,
        },
    ],
}
