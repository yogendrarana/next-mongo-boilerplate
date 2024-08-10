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
            title: "Credits",
            items: [
                {
                    title: "OneStopShop",
                    href: "https://onestopshop.jackblatch.com",
                    external: true,
                },
                {
                    title: "Acme Corp",
                    href: "https://acme-corp.jumr.dev",
                    external: true,
                },
                {
                    title: "craft.mxkaske.dev",
                    href: "https://craft.mxkaske.dev",
                    external: true,
                },
                {
                    title: "Taxonomy",
                    href: "https://tx.shadcn.com/",
                    external: true,
                },
                {
                    title: "shadcn/ui",
                    href: "https://ui.shadcn.com",
                    external: true,
                },
            ],
        },
        {
            title: "Help",
            items: [
                {
                    title: "About",
                    href: "/about",
                    external: false,
                },
                {
                    title: "Contact",
                    href: "/contact",
                    external: false,
                },
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
        },
        {
            title: "Social",
            items: [
                {
                    title: "X",
                    href: links.x,
                    external: true,
                },
                {
                    title: "GitHub",
                    href: links.githubAccount,
                    external: true,
                },
                {
                    title: "Discord",
                    href: links.discord,
                    external: true,
                },
                {
                    title: "cal.com",
                    href: links.calDotCom,
                    external: true,
                },
            ],
        },
        {
            title: "Lofi",
            items: [
                {
                    title: "beats to study to",
                    href: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
                    external: true,
                },
                {
                    title: "beats to chill to",
                    href: "https://www.youtube.com/watch?v=rUxyKA_-grg",
                    external: true,
                },
                {
                    title: "a fresh start",
                    href: "https://www.youtube.com/watch?v=rwionZbOryo",
                    external: true,
                },
                {
                    title: "coffee to go",
                    href: "https://www.youtube.com/watch?v=2gliGzb2_1I",
                    external: true,
                },
            ],
        },
    ] satisfies FooterItem[],
}
