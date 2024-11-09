import { type SidebarNavItem } from "@/constants/types"

export interface DashboardConfig {
    adminNav: SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
    adminNav: [
        {
            title: "Analytics",
            href: "/admin/analytics",
            icon: "analytics",
            external: false,
        },
        {
            title: "Products",
            href: "/admin/products",
            icon: "products",
            external: false,
        },
        {
            title: "Users",
            href: "/admin/users",
            icon: "users",
            external: false,
        },
        {
            title: "Orders",
            href: "/admin/orders",
            icon: "orders",
            external: false,
        },
        {
            title: "Settings",
            href: "/admin/settings",
            icon: "settings",
            external: false,
        },
    ],
}
