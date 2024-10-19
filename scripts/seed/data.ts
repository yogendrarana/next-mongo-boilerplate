import { IUserBase } from "@/server/db/models/user-model";
import { AuthProviderEnum, ProductGenderEnum, UserRoleEnum } from "@/constants/enum";

export const users: Partial<IUserBase>[] = [
    {
        name: "Yogendra Rana",
        email: "yogendrarana9595@gmail.com",
        password: "password123",
        phone: "+977 9825159891",
        address: "Baidam, Pokhara",
        role: UserRoleEnum.ADMIN,
        authProvider: AuthProviderEnum.GOOGLE
    },
    {
        name: "Jane Doe",
        email: "jane@gmail.com",
        password: "password123",
        phone: "+977 9825159891",
        address: "Baidam, Pokhara",
        role: UserRoleEnum.EMPLOYEE,
        authProvider: AuthProviderEnum.GOOGLE
    },
    {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        role: UserRoleEnum.CUSTOMER,
        authProvider: AuthProviderEnum.CREDENTIALS
    },
    {
        name: "Jane Smith",
        email: "jane@example.com",
        password: "password456",
        role: UserRoleEnum.CUSTOMER,
        authProvider: AuthProviderEnum.CREDENTIALS
    },
    {
        name: "Bob Johnson",
        email: "bob@example.com",
        providerAccountId: "12345",
        authProvider: AuthProviderEnum.GOOGLE,
        role: UserRoleEnum.CUSTOMER
    }
];

export const seedCategories = [
    {
        name: "Clothing",
        slug: "clothing",
        description: "Stylish and comfortable clothing.",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
        subcategories: [
            {
                name: "T-shirts",
                slug: "t-shirts",
                description: "Cool and comfy tees for effortless style."
            },
            {
                name: "Shirts",
                slug: "shirts",
                description: "Stylish shirts for a casual and cool look."
            },
            { name: "Hoodies", slug: "hoodies", description: "Cozy up in trendy hoodies." },
            {
                name: "Pants",
                slug: "pants",
                description: "Relaxed and stylish pants for everyday wear."
            },
            {
                name: "Shorts",
                slug: "shorts",
                description: "Stay cool with casual and comfortable shorts."
            },
            {
                name: "Suits & Blazers",
                slug: "suits-blazers",
                description: "Suit up in style with our suits and blazers."
            },
            {
                name: "Jackets & Coats",
                slug: "jackets-coats",
                description: "Stay warm and stylish with our jackets and coats."
            },
            {
                name: "Knit Wear",
                slug: "knit-wear",
                description: "Stay cozy with our knitwear collection."
            }
        ]
    },
    {
        name: "Shoes",
        slug: "shoes",
        description: "Stylish and durable shoes.",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
        subcategories: [
            {
                name: "Low Tops",
                slug: "low-tops",
                description: "Rad low tops shoes for a stylish low-profile look."
            },
            {
                name: "High Tops",
                slug: "high-tops",
                description: "Elevate your style with rad high top shoes."
            },
            {
                name: "Slip-ons",
                slug: "slip-ons",
                description: "Effortless style with rad slip-on shoes."
            },
            {
                name: "Pros",
                slug: "pros",
                description: "Performance-driven rad shoes for the pros."
            },
            {
                name: "Classics",
                slug: "classics",
                description: "Timeless style with rad classic shoes."
            }
        ]
    },
    {
        name: "Accessories",
        slug: "accessories",
        description: "Elevate your style with our curated collection of fashion accessories.",
        image: "https://images.unsplash.com/photo-1613521140785-e85e427f8002",
        subcategories: [
            {
                name: "Jewelry",
                slug: "jewelry",
                description: "Add sparkle to any outfit with our elegant jewelry selection."
            },
            {
                name: "Bags",
                slug: "bags",
                description: "From clutches to backpacks, find the perfect bag for any occasion."
            },
            {
                name: "Scarves & Wraps",
                slug: "scarves-wraps",
                description: "Stay warm and stylish with our versatile scarf and wrap collection."
            },
            {
                name: "Belts",
                slug: "belts",
                description: "Complete your look with our range of fashionable belts."
            },
            {
                name: "Sunglasses",
                slug: "sunglasses",
                description: "Protect your eyes in style with our trendy sunglasses."
            },
            {
                name: "Hats & Caps",
                slug: "hats-caps",
                description: "Top off your outfit with our selection of hats and caps."
            },
            {
                name: "Watches",
                slug: "watches",
                description: "Keep time in style with our diverse watch collection."
            }
        ]
    }
];

// products
export const seedProducts = [
    {
        name: "Cool Skater Tee",
        description: "Comfortable cotton t-shirt for skaters",
        price: 29.99,
        categoryName: "Clothing",
        subcategoryName: "T-shirts",
        sku: "TSH001",
        inventory: 100,
        images: [
            {
                url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
                public_id: Math.random().toString(36).substring(7)
            },
            {
                url: "https://images.unsplash.com/photo-1622445275576-721325763afe",
                public_id: Math.random().toString(36).substring(7)
            }
        ],
        gender: ProductGenderEnum.UNISEX
    },
    {
        name: "Rad Low Top Sneakers",
        description: "Stylish low top sneakers for skateboarding",
        price: 79.99,
        categoryName: "Shoes",
        subcategoryName: "Low Tops",
        sku: "SHO001",
        inventory: 50,
        images: [
            {
                url: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3",
                public_id: Math.random().toString(36).substring(7)
            },
            {
                url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
                public_id: Math.random().toString(36).substring(7)
            }
        ],
        gender: ProductGenderEnum.UNISEX
    },
    {
        name: "Women's Skateboard Hoodie",
        description: "Stylish and comfortable hoodie for female skaters",
        price: 49.99,
        categoryName: "Clothing",
        subcategoryName: "Hoodies",
        sku: "HOD001",
        inventory: 60,
        images: [
            {
                url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
                public_id: Math.random().toString(36).substring(7)
            },
            {
                url: "https://images.unsplash.com/photo-1614495039153-e9cd13240469",
                public_id: Math.random().toString(36).substring(7)
            }
        ],
        gender: ProductGenderEnum.FEMALE
    },
    {
        name: "Men's Backpack",
        description: "Spacious and durable backpack for skaters",
        price: 39.99,
        categoryName: "Accessories",
        subcategoryName: "Bags",
        sku: "BAG001",
        inventory: 75,
        images: [
            {
                url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
                public_id: Math.random().toString(36).substring(7)
            },
            {
                url: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3",
                public_id: Math.random().toString(36).substring(7)
            }
        ],
        gender: ProductGenderEnum.MALE
    },
    {
        name: "Skater Cargo Pants",
        description: "Comfortable and functional cargo pants for skaters",
        price: 59.99,
        categoryName: "Clothing",
        subcategoryName: "Pants",
        sku: "PNT001",
        inventory: 80,
        images: [
            {
                url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80",
                public_id: Math.random().toString(36).substring(7)
            },
            {
                url: "https://images.unsplash.com/photo-1618225747659-433d5a5c6af7",
                public_id: Math.random().toString(36).substring(7)
            }
        ],
        gender: ProductGenderEnum.UNISEX
    },
    {
        name: "Classic High Top Skate Shoes",
        description: "Durable high top shoes perfect for skateboarding",
        price: 89.99,
        categoryName: "Shoes",
        subcategoryName: "High Tops",
        sku: "SHO002",
        inventory: 40,
        images: [
            {
                url: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
                public_id: Math.random().toString(36).substring(7)
            },
            {
                url: "https://images.unsplash.com/photo-1560769629-975ec94e6a86",
                public_id: Math.random().toString(36).substring(7)
            }
        ],
        gender: ProductGenderEnum.UNISEX
    },
    {
        name: "Skater Sunglasses",
        description: "Stylish and protective sunglasses for skaters",
        price: 24.99,
        categoryName: "Accessories",
        subcategoryName: "Sunglasses",
        sku: "SUN001",
        inventory: 100,
        images: [
            {
                url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
                public_id: Math.random().toString(36).substring(7)
            },
            {
                url: "https://images.unsplash.com/photo-1577803645773-f96470509666",
                public_id: Math.random().toString(36).substring(7)
            }
        ],
        gender: ProductGenderEnum.UNISEX
    },
    {
        name: "Skater Beanie",
        description: "Warm and trendy beanie for skaters",
        price: 19.99,
        categoryName: "Accessories",
        subcategoryName: "Hats & Caps",
        sku: "HAT001",
        inventory: 120,
        images: [
            {
                url: "https://images.unsplash.com/photo-1576063270807-d4cc0f0c2942",
                public_id: Math.random().toString(36).substring(7)
            },
            {
                url: "https://images.unsplash.com/photo-1621976360623-004223985b0b",
                public_id: Math.random().toString(36).substring(7)
            }
        ],
        gender: ProductGenderEnum.UNISEX
    }
];
