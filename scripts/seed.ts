import { generateId } from '@/lib/id';
import { connectDb } from '../src/server/db';
import CustomerModel from '../src/server/db/models/customer-model';
import ProductModel from '../src/server/db/models/product-model';
import CategoryModel from '../src/server/db/models/category-model';
import SubcategoryModel from '../src/server/db/models/subcategory-model';
import { AuthProviderEnum, ProductGenderEnum, UserRoleEnum } from '@/constants/enum';

async function seed() {
    try {
        await connectDb();
        console.log('Connected to MongoDB');

        // Clear existing data
        await CategoryModel.deleteMany({});
        await SubcategoryModel.deleteMany({});
        await ProductModel.deleteMany({});
        await CustomerModel.deleteMany({});

        // Seed Users (unchanged from previous version)
        await CustomerModel.create([
            {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
                role: UserRoleEnum.USER,
                authProvider: AuthProviderEnum.CREDENTIALS,
            },
            {
                name: 'Jane Smith',
                email: 'jane@example.com',
                password: 'password456',
                role: UserRoleEnum.ADMIN,
                authProvider: AuthProviderEnum.CREDENTIALS,
            },
            {
                name: 'Bob Johnson',
                email: 'bob@example.com',
                providerAccountId: '12345',
                authProvider: AuthProviderEnum.GOOGLE,
                role: UserRoleEnum.USER,
            },
        ]);

        // Seed Categories and Subcategories
        const categories = [
            {
                name: "Clothing",
                slug: "clothing",
                description: "Stylish and comfortable clothing.",
                image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
                subcategories: [
                    { name: "T-shirts", slug: "t-shirts", description: "Cool and comfy tees for effortless style." },
                    { name: "Shirts", slug: "shirts", description: "Stylish shirts for a casual and cool look." },
                    { name: "Hoodies", slug: "hoodies", description: "Cozy up in trendy hoodies." },
                    { name: "Pants", slug: "pants", description: "Relaxed and stylish pants for everyday wear." },
                    { name: "Shorts", slug: "shorts", description: "Stay cool with casual and comfortable shorts." },
                    { name: "Suits & Blazers", slug: "suits-blazers", description: "Suit up in style with our suits and blazers." },
                    { name: "Jackets & Coats", slug: "jackets-coats", description: "Stay warm and stylish with our jackets and coats." },
                    { name: "Knit Wear", slug: "knit-wear", description: "Stay cozy with our knitwear collection." },
                ]
            },
            {
                name: "Shoes",
                slug: "shoes",
                description: "Stylish and durable shoes.",
                image: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
                subcategories: [
                    { name: "Low Tops", slug: "low-tops", description: "Rad low tops shoes for a stylish low-profile look." },
                    { name: "High Tops", slug: "high-tops", description: "Elevate your style with rad high top shoes." },
                    { name: "Slip-ons", slug: "slip-ons", description: "Effortless style with rad slip-on shoes." },
                    { name: "Pros", slug: "pros", description: "Performance-driven rad shoes for the pros." },
                    { name: "Classics", slug: "classics", description: "Timeless style with rad classic shoes." },
                ]
            },
            {
                name: "Accessories",
                slug: "accessories",
                description: "Elevate your style with our curated collection of fashion accessories.",
                image: "https://images.unsplash.com/photo-1613521140785-e85e427f8002",
                subcategories: [
                    { name: "Jewelry", slug: "jewelry", description: "Add sparkle to any outfit with our elegant jewelry selection." },
                    { name: "Bags", slug: "bags", description: "From clutches to backpacks, find the perfect bag for any occasion." },
                    { name: "Scarves & Wraps", slug: "scarves-wraps", description: "Stay warm and stylish with our versatile scarf and wrap collection." },
                    { name: "Belts", slug: "belts", description: "Complete your look with our range of fashionable belts." },
                    { name: "Sunglasses", slug: "sunglasses", description: "Protect your eyes in style with our trendy sunglasses." },
                    { name: "Hats & Caps", slug: "hats-caps", description: "Top off your outfit with our selection of hats and caps." },
                    { name: "Watches", slug: "watches", description: "Keep time in style with our diverse watch collection." },
                ]
            }
        ];

        for (const category of categories) {
            const newCategory = await CategoryModel.create({
                id: generateId('category'),
                name: category.name,
                slug: category.slug,
                description: category.description,
            });

            for (const subcategory of category.subcategories) {
                let subcategoryId;
                let attempts = 0;
                const maxAttempts = 5;

                while (attempts < maxAttempts) {
                    subcategoryId = generateId('subcategory');
                    try {
                        await SubcategoryModel.create({
                            id: subcategoryId,
                            name: subcategory.name,
                            slug: subcategory.slug,
                            description: subcategory.description,
                            category: {
                                id: newCategory.id,
                                slug: newCategory.slug,
                            }
                        });
                        break;
                    } catch (error: any) {
                        if (error.code === 11000) {
                            attempts++;
                            console.log(`Duplicate ID generated for subcategory ${subcategory.name}. Retrying...`);
                        } else {
                            throw error;
                        }
                    }
                }

                if (attempts === maxAttempts) {
                    throw new Error(`Failed to generate unique ID for subcategory ${subcategory.name} after ${maxAttempts} attempts`);
                }
            }
        }

        // Seed some example products (you may want to expand this in future)

        console.log('Seefing products..........');
        await ProductModel.create([
            {
                name: 'Cool Skater Tee',
                description: 'Comfortable cotton t-shirt for skaters',
                price: 29.99,
                category: {
                    id: await CategoryModel.findOne({ name: "Clothing" })?.then(cat => cat?.id),
                    slug: await CategoryModel.findOne({ name: "Clothing" })?.then(cat => cat?.slug),
                },
                subcategory: {
                    id: await SubcategoryModel.findOne({ name: "T-shirts" }).then(sub => sub?.id),
                    slug: await SubcategoryModel.findOne({ name: "T-shirts" }).then(sub => sub?.slug)
                },
                sku: 'TSH001',
                inventory: 100,
                images: [
                    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
                    'https://images.unsplash.com/photo-1622445275576-721325763afe'
                ],
                gender: ProductGenderEnum.UNISEX,
            },
            {
                name: 'Rad Low Top Sneakers',
                description: 'Stylish low top sneakers for skateboarding',
                price: 79.99,
                category: {
                    id: await CategoryModel.findOne({ name: "Shoes" }).then(cat => cat?.id),
                    slug: await CategoryModel.findOne({ name: "Shoes" })?.then(cat => cat?.slug),
                },
                subcategory: {
                    id: await SubcategoryModel.findOne({ name: "Low Tops" }).then(sub => sub?.id),
                    slug: await SubcategoryModel.findOne({ name: "Low Tops" }).then(sub => sub?.slug)
                },
                sku: 'SHO001',
                inventory: 50,
                images: [
                    'https://images.unsplash.com/photo-1607522370275-f14206abe5d3',
                    'https://images.unsplash.com/photo-1608231387042-66d1773070a5'
                ],
                gender: ProductGenderEnum.UNISEX,
            },
            {
                name: 'Women\'s Skateboard Hoodie',
                description: 'Stylish and comfortable hoodie for female skaters',
                price: 49.99,
                slug: await CategoryModel.findOne({ name: "Clothing" })?.then(cat => cat?.slug),
                category: {
                    id: await CategoryModel.findOne({ name: "Clothing" })?.then(cat => cat?.id),
                    slug: await CategoryModel.findOne({ name: "Clothing" })?.then(cat => cat?.slug),
                },
                subcategory: {
                    id: await SubcategoryModel.findOne({ name: "Hoodies" }).then(sub => sub?.id),
                    slug: await SubcategoryModel.findOne({ name: "Hoodies" }).then(sub => sub?.slug)
                },
                sku: 'HOD001',
                inventory: 60,
                images: [
                    'https://images.unsplash.com/photo-1556821840-3a63f95609a7',
                    'https://images.unsplash.com/photo-1614495039153-e9cd13240469'
                ],
                gender: ProductGenderEnum.FEMALE,
            },
            {
                name: 'Men\'s Backpack',
                description: 'Spacious and durable backpack for skaters',
                price: 39.99,
                category: {
                    id: await CategoryModel.findOne({ name: "Accessories" }).then(cat => cat?.id),
                    slug: await CategoryModel.findOne({ name: "Accessories" })?.then(cat => cat?.slug),
                },
                subcategory: {
                    id: await SubcategoryModel.findOne({ name: "Bags" }).then(sub => sub?.id),
                    slug: await SubcategoryModel.findOne({ name: "Bags" }).then(sub => sub?.slug)
                },
                sku: 'BAG001',
                inventory: 75,
                images: [
                    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
                    'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3'
                ],
                gender: ProductGenderEnum.MALE,
            },
            {
                name: 'Skater Cargo Pants',
                description: 'Comfortable and functional cargo pants for skaters',
                price: 59.99,
                category: {
                    id: await CategoryModel.findOne({ name: "Clothing" })?.then(cat => cat?.id),
                    slug: await CategoryModel.findOne({ name: "Clothing" })?.then(cat => cat?.slug),
                },
                subcategory: {
                    id: await SubcategoryModel.findOne({ name: "Pants" }).then(sub => sub?.id),
                    slug: await SubcategoryModel.findOne({ name: "Pants" }).then(sub => sub?.slug)
                },
                sku: 'PNT001',
                inventory: 80,
                images: [
                    'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80',
                    'https://images.unsplash.com/photo-1618225747659-433d5a5c6af7'
                ],
                gender: ProductGenderEnum.UNISEX,
            },
            {
                name: 'Classic High Top Skate Shoes',
                description: 'Durable high top shoes perfect for skateboarding',
                price: 89.99,
                category: {
                    id: await CategoryModel.findOne({ name: "Shoes" }).then(cat => cat?.id),
                    slug: await CategoryModel.findOne({ name: "Shoes" })?.then(cat => cat?.slug),
                },
                subcategory: {
                    id: await SubcategoryModel.findOne({ name: "High Tops" }).then(sub => sub?.id),
                    slug: await SubcategoryModel.findOne({ name: "High Tops" }).then(sub => sub?.slug)
                },
                sku: 'SHO002',
                inventory: 40,
                images: [
                    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77',
                    'https://images.unsplash.com/photo-1560769629-975ec94e6a86'
                ],
                gender: ProductGenderEnum.UNISEX,
            },
            {
                name: 'Skater Sunglasses',
                description: 'Stylish and protective sunglasses for skaters',
                price: 24.99,
                category: {
                    id: await CategoryModel.findOne({ name: "Accessories" }).then(cat => cat?.id),
                    slug: await CategoryModel.findOne({ name: "Accessories" })?.then(cat => cat?.slug),
                },
                subcategory: {
                    id: await SubcategoryModel.findOne({ name: "Sunglasses" }).then(sub => sub?.id),
                    slug: await SubcategoryModel.findOne({ name: "Sunglasses" }).then(sub => sub?.slug)
                },
                sku: 'SUN001',
                inventory: 100,
                images: [
                    'https://images.unsplash.com/photo-1511499767150-a48a237f0083',
                    'https://images.unsplash.com/photo-1577803645773-f96470509666'
                ],
                gender: ProductGenderEnum.UNISEX,
            },
            {
                name: 'Skater Beanie',
                description: 'Warm and trendy beanie for skaters',
                price: 19.99,
                category: {
                    id: await CategoryModel.findOne({ name: "Accessories" }).then(cat => cat?.id),
                    slug: await CategoryModel.findOne({ name: "Accessories" })?.then(cat => cat?.slug),
                },
                subcategory: {
                    id: await SubcategoryModel.findOne({ name: "Hats & Caps" }).then(sub => sub?.id),
                    slug: await SubcategoryModel.findOne({ name: "Hats & Caps" }).then(sub => sub?.slug)
                },
                sku: 'HAT001',
                inventory: 120,
                images: [
                    'https://images.unsplash.com/photo-1576063270807-d4cc0f0c2942',
                    'https://images.unsplash.com/photo-1621976360623-004223985b0b'
                ],
                gender: ProductGenderEnum.UNISEX,
            },
        ]);

        console.log('Data seeded successfully');
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    } finally {
        process.exit(0);
    }
}

seed();