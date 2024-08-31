import { FooterItem, MainNavItem, SidebarItem } from "@/types"

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
        }, {
            title: "Company",
            items: [
                {
                    title: "About",
                    href: "/about",
                    description: "Learn about our company.",
                    items: [],
                },
                {
                    title: "Contact",
                    href: "/contact",
                    description: "Get in touch with us.",
                    items: [],
                },
                {
                    title: "Careers",
                    href: "/careers",
                    description: "Join our team.",
                    items: [],
                },
            ],
        }, {
            title: "Legal",
            items: [
                {
                    title: "Terms",
                    href: "/terms",
                    description: "Read our terms and conditions.",
                    items: [],
                },
                {
                    title: "Privacy",
                    href: "/privacy",
                    description: "Read our privacy policy.",
                    items: [],
                },
                {
                    title: "Refund",
                    href: "/refund",
                    description: "Read our refund policy.",
                    items: [],
                }
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
