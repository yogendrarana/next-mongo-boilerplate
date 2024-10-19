import { generateId } from "@/lib/id";
import { connectDb } from "../../src/server/db";
import UserModel from "@/server/db/models/user-model";
import ProductModel from "../../src/server/db/models/product-model";
import CategoryModel from "../../src/server/db/models/category-model";
import { seedCategories, seedProducts, seedUsers } from "./data";
import SubcategoryModel from "../../src/server/db/models/subcategory-model";

async function seed() {
    try {
        await connectDb();
        console.log("Connected to MongoDB");

        // Clear existing data
        await UserModel.deleteMany({});
        await ProductModel.deleteMany({});
        await CategoryModel.deleteMany({});
        await SubcategoryModel.deleteMany({});

        // Seed admin users, and employees
        await UserModel.create(seedUsers);

        // Seed Categories and Subcategories
        for (const category of seedCategories) {
            const newCategory = await CategoryModel.create({
                categoryId: generateId("category"),
                name: category.name,
                slug: category.slug,
                description: category.description
            });

            for (const subcategory of category.subcategories) {
                await SubcategoryModel.create({
                    subcategoryId: generateId("subcategory"),
                    name: subcategory.name,
                    slug: subcategory.slug,
                    description: subcategory.description,
                    category: {
                        id: newCategory.id,
                        slug: newCategory.slug
                    }
                });
            }
        }

        // Seed some example products (you may want to expand this in future)
        console.log("Seeding products..........");
        const productsWithId = await Promise.all(
            seedProducts.map(async (product, index) => {
                const category = await CategoryModel.findOne({ name: product.categoryName });
                const subcategory = await SubcategoryModel.findOne({
                    name: product.subcategoryName
                });

                const id = generateId("product", { length: 10 + index });

                return {
                    productId: id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    category: {
                        id: category?.id,
                        slug: category?.slug
                    },
                    subcategory: {
                        id: subcategory?.id,
                        slug: subcategory?.slug
                    },
                    sku: product.sku,
                    inventory: product.inventory,
                    images: product.images,
                    gender: product.gender
                };
            })
        );

        await ProductModel.create(productsWithId);

        console.log("Data seeded successfully");
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    } finally {
        process.exit(0);
    }
}

seed();
