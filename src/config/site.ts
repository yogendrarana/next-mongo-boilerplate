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
            title: "Lobby",
            items: [
                {
                    title: "Products",
                    href: "/products",
                    description: "All the products we have to offer.",
                    items: [],
                },
                {
                    title: "Build a Board",
                    href: "/build-a-board",
                    description: "Customize your own clothes.",
                    items: [],
                },
                {
                    title: "Blog",
                    href: "/blog",
                    description: "Read our latest blog posts.",
                    items: [],
                },
            ],
        },
        ...productConfig.categories.map((category) => ({
            title: category.name,
            items: [
                {
                    title: "All",
                    href: `/categories/${slugify(category.name)}`,
                    description: `All ${category.name}.`,
                    items: [],
                },
                ...category.subcategories.map((subcategory) => ({
                    title: subcategory.name,
                    href: `/categories/${slugify(category.name)}/${slugify(subcategory.name)}`,
                    description: subcategory.description,
                    items: [],
                })),
            ],
        })),
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
