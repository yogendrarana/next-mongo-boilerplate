import { generateId } from "@/lib/id"
export type ProductConfig = typeof productConfig

export const productConfig = {
    categories: [
        {
            id: generateId(),
            name: "Clothing",
            description: "Stylish and comfortable skateboarding clothing.",
            image: "/images/categories/clothing-one.webp",
            subcategories: [
                {
                    id: generateId(),
                    name: "T-shirts",
                    description: "Cool and comfy tees for effortless style.",
                },
                {
                    id: generateId(),
                    name: "Shirts",
                    description: "Stylish shirts for a casual and cool look.",
                },
                {
                    id: generateId(),
                    name: "Hoodies",
                    description: "Cozy up in trendy hoodies.",
                },
                {
                    id: generateId(),
                    name: "Pants",
                    description: "Relaxed and stylish pants for everyday wear.",
                },
                {
                    id: generateId(),
                    name: "Shorts",
                    description: "Stay cool with casual and comfortable shorts.",
                },
                {
                    id: generateId(),
                    name: "Suits & Blazers",
                    description: "Suit up in style with our suits and blazers.",
                },
                {
                    id: generateId(),
                    name: "Jackets & Coats",
                    description: "Stay warm and stylish with our jackets and coats.",
                },
                {
                    id: generateId(),
                    name: "Knit Wear",
                    description: "Stay cozy with our knitwear collection.",
                },
            ],
        },
        {
            id: generateId(),
            name: "Shoes",
            description: "Rad shoes.",
            image: "/images/categories/shoes-one.webp",
            subcategories: [
                {
                    id: generateId(),
                    name: "Low Tops",
                    description: "Rad low tops shoes for a stylish low-profile look.",
                },
                {
                    id: generateId(),
                    name: "High Tops",
                    description: "Elevate your style with rad high top shoes.",
                },
                {
                    id: generateId(),
                    name: "Slip-ons",
                    description: "Effortless style with rad slip-on shoes.",
                },
                {
                    id: generateId(),
                    name: "Pros",
                    description: "Performance-driven rad shoes for the pros.",
                },
                {
                    id: generateId(),
                    name: "Classics",
                    description: "Timeless style with rad classic shoes.",
                },
            ],
        },
        {
            id: generateId(),
            name: "Accessories",
            description: "Elevate your style with our curated collection of fashion accessories.",
            image: "/images/categories/accessories.webp",
            subcategories: [
                {
                    id: generateId(),
                    name: "Jewelry",
                    description: "Add sparkle to any outfit with our elegant jewelry selection.",
                },
                {
                    id: generateId(),
                    name: "Bags",
                    description: "From clutches to backpacks, find the perfect bag for any occasion.",
                },
                {
                    id: generateId(),
                    name: "Scarves & Wraps",
                    description: "Stay warm and stylish with our versatile scarf and wrap collection.",
                },
                {
                    id: generateId(),
                    name: "Belts",
                    description: "Complete your look with our range of fashionable belts.",
                },
                {
                    id: generateId(),
                    name: "Sunglasses",
                    description: "Protect your eyes in style with our trendy sunglasses.",
                },
                {
                    id: generateId(),
                    name: "Hats & Caps",
                    description: "Top off your outfit with our selection of hats and caps.",
                },
                {
                    id: generateId(),
                    name: "Watches",
                    description: "Keep time in style with our diverse watch collection.",
                },
            ],
        }
    ]
}
