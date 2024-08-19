import { slugify } from "@/lib/utils"
import { productConfig } from "./product"
import { FooterItem, MainNavItem } from "@/types"

export type SiteConfig = typeof siteConfig

const links = {
    x: "https://twitter.com/yoogendra_rana",
    github: "https://github.com/yogendrarana",
    githubAccount: "https://github.com/yogendrarana",
    discord: "https://discord.com/users/yoogendrarana",
    calDotCom: "https://cal.com/yogendrarana",
}

export const siteConfig = {
    name: "Fashion House",
    description: "A fashion house that offers stylish and comfortable skateboarding clothing.",
    url: "https://fasionhouse.com",
    ogImage: "https://skateshop.sadmn.com/opengraph-image.png",
    links,
    mobile: "+977 9812345678",
    mainNav: [
        {
            title: "Products",
            items: [
                {
                    title: "Clothing",
                    href: "/category/clothing",
                    description: "Get all kinds of clothes.",
                    items: [],
                },
                {
                    title: "Shoes",
                    href: "/category/shoes",
                    description: "Get all kinds of shoes.",
                    items: [],
                },
                {
                    title: "Accessories",
                    href: "/category/accessories",
                    description: "Get all kinds of shoes.",
                    items: [],
                },
            ],
        }
    ] satisfies MainNavItem[],
    footerNav: [
        {
            title: "Help",
            items: [
                {
                    title: "Terms",
                    href: "/terms",
                    external: false,
                },
                {
                    title: "Privacy",
                    href: "/privacy",
                    external: false,
                },
            ],
        }
    ] satisfies FooterItem[],
}
