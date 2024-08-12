import { generateId } from "@/lib/id"
export type ProductConfig = typeof productConfig

export const productConfig = {
    categories: [
        {
            id: generateId(),
            name: "Clothing",
            slug: "clothing",
            description: "Stylish and comfortable skateboarding clothing.",
            image: "/images/categories/clothing-one.webp",
            subcategories: [
                {
                    id: generateId(),
                    name: "T-shirts",
                    slug: "t-shirts",
                    description: "Cool and comfy tees for effortless style.",
                },
                {
                    id: generateId(),
                    name: "Shirts",
                    slug: "shirts",
                    description: "Stylish shirts for a casual and cool look.",
                },
                {
                    id: generateId(),
                    name: "Hoodies",
                    slug: "hoodies",
                    description: "Cozy up in trendy hoodies.",
                },
                {
                    id: generateId(),
                    name: "Pants",
                    slug: "pants",
                    description: "Relaxed and stylish pants for everyday wear.",
                },
                {
                    id: generateId(),
                    name: "Shorts",
                    slug: "shorts",
                    description: "Stay cool with casual and comfortable shorts.",
                },
                {
                    id: generateId(),
                    name: "Suits & Blazers",
                    slug: "suits-blazers",
                    description: "Suit up in style with our suits and blazers.",
                },
                {
                    id: generateId(),
                    name: "Jackets & Coats",
                    slug: "jackets-coats",
                    description: "Stay warm and stylish with our jackets and coats.",
                },
                {
                    id: generateId(),
                    name: "Knit Wear",
                    slug: "knit-wear",
                    description: "Stay cozy with our knitwear collection.",
                },
            ],
        },
        {
            id: generateId(),
            name: "Shoes",
            slug: "shoes",
            description: "Rad shoes.",
            image: "/images/categories/shoes-one.webp",
            subcategories: [
                {
                    id: generateId(),
                    name: "Low Tops",
                    slug: "low-tops",
                    description: "Rad low tops shoes for a stylish low-profile look.",
                },
                {
                    id: generateId(),
                    name: "High Tops",
                    slug: "high-tops",
                    description: "Elevate your style with rad high top shoes.",
                },
                {
                    id: generateId(),
                    name: "Slip-ons",
                    slug: "slip-ons",
                    description: "Effortless style with rad slip-on shoes.",
                },
                {
                    id: generateId(),
                    name: "Pros",
                    slug: "pros",
                    description: "Performance-driven rad shoes for the pros.",
                },
                {
                    id: generateId(),
                    name: "Classics",
                    slug: "classics",
                    description: "Timeless style with rad classic shoes.",
                },
            ],
        },
        {
            id: generateId(),
            name: "Accessories",
            slug: "accessories",
            description: "Elevate your style with our curated collection of fashion accessories.",
            image: "/images/categories/accessories.webp",
            subcategories: [
                {
                    id: generateId(),
                    name: "Jewelry",
                    slug: "jewelry",
                    description: "Add sparkle to any outfit with our elegant jewelry selection.",
                },
                {
                    id: generateId(),
                    name: "Bags",
                    slug: "bags",
                    description: "From clutches to backpacks, find the perfect bag for any occasion.",
                },
                {
                    id: generateId(),
                    name: "Scarves & Wraps",
                    slug: "scarves-wraps",
                    description: "Stay warm and stylish with our versatile scarf and wrap collection.",
                },
                {
                    id: generateId(),
                    name: "Belts",
                    slug: "belts",
                    description: "Complete your look with our range of fashionable belts.",
                },
                {
                    id: generateId(),
                    name: "Sunglasses",
                    slug: "sunglasses",
                    description: "Protect your eyes in style with our trendy sunglasses.",
                },
                {
                    id: generateId(),
                    name: "Hats & Caps",
                    slug: "hats-caps",
                    description: "Top off your outfit with our selection of hats and caps.",
                },
                {
                    id: generateId(),
                    name: "Watches",
                    slug: "watches",
                    description: "Keep time in style with our diverse watch collection.",
                },
            ],
        }
    ]
}
