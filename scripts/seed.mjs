import { connectDb } from '../src/server/db';
import UserModel from '../src/server/db/models/user-model';
import ProductModel from '../src/server/db/models/product-model';
import CategoryModel from '../src/server/db/models/category-model';
import { SubcategoryModel } from '../src/server/db/models/subcategory-model';
import { AuthProviderEnum, ProductSexEnum, UserRoleEnum } from '@/constants/enum';

async function seed() {
    try {
        await connectDb();
        console.log('Connected to MongoDB');

        // Clear existing data
        await CategoryModel.deleteMany({});
        await ProductModel.deleteMany({});
        await UserModel.deleteMany({});

        // Seed Categories and Subcategories
        const categories = [
            {
                name: "Clothing",
                slug: "clothing",
                description: "Stylish and comfortable skateboarding clothing.",
                image: "/images/categories/clothing-one.webp",
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
                description: "Rad shoes.",
                image: "/images/categories/shoes-one.webp",
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
                image: "/images/categories/accessories.webp",
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
                name: category.name,
                slug: category.slug,
                description: category.description,
            });

            for (const subcategory of category.subcategories) {
                await SubcategoryModel.create({
                    name: subcategory.name,
                    slug: subcategory.slug,
                    description: subcategory.description,
                    categoryId: newCategory._id
                });
            }
        }

        // Seed some example categories (you may want to expand this in future)
        const clothingCategory = await CategoryModel.findOne({ name: "Clothing" });
        const shoesCategory = await CategoryModel.findOne({ name: "Shoes" });
        const accessoriesCategory = await CategoryModel.findOne({ name: "Accessories" });

        await ProductModel.create([
            {
                name: 'Cool Skater Tee',
                description: 'Comfortable cotton t-shirt for skaters',
                price: 29.99,
                categoryId: clothingCategory?._id,
                subcategoryId: (await SubcategoryModel.findOne({ slug: "t-shirts", categoryId: clothingCategory?._id }))?._id,
                sku: 'TSH001',
                inventory: 100,
                images: ['tshirt1.jpg', 'tshirt2.jpg'],
                sex: ProductSexEnum.UNISEX,
            },
            {
                name: 'Rad Low Top Sneakers',
                description: 'Stylish low top sneakers for skateboarding',
                price: 79.99,
                categoryId: shoesCategory?.id,
                subcategoryId: (await SubcategoryModel.findOne({ slug: "low-tops", categoryId: clothingCategory?._id }))?._id,
                sku: 'SHO001',
                inventory: 50,
                images: ['lowtop1.jpg', 'lowtop2.jpg'],
                sex: ProductSexEnum.UNISEX,
            },
            {
                name: 'Men\'s Skater Snapback Cap',
                description: 'Cool snapback cap for male skaters',
                price: 24.99,
                categoryId: accessoriesCategory?.id,
                subId: (await CategoryModel.findOne({ slug: "hats-caps", categoryId: accessoriesCategory?.id }))?.id,
                sku: 'ACC001',
                inventory: 75,
                images: ['cap1.jpg'],
                sex: ProductSexEnum.MALE,
            },
            {
                name: 'Women\'s Skateboard Hoodie',
                description: 'Stylish and comfortable hoodie for female skaters',
                price: 49.99,
                categoryId: clothingCategory?.id,
                subId: (await CategoryModel.findOne({ slug: "hoodies", categoryId: clothingCategory?.id }))?.id,
                sku: 'HOD001',
                inventory: 60,
                images: ['hoodie1.jpg', 'hoodie2.jpg'],
                sex: ProductSexEnum.FEMALE,
            },
        ]);

        // Seed Users (unchanged from previous version)
        await UserModel.create([
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

        console.log('Data seeded successfully');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        console.log('Disconnected from MongoDB');
    }
}

seed();