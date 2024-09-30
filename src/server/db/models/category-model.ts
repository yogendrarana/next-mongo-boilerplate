import { generateId } from "@/lib/id";
import mongoose, { Document, ObjectId, Schema } from "mongoose";

// Interface to define the structure of a Category document
export interface ICategoryBase {
    categoryId: string;
    name: string;
    slug: string;
    image?: string;
    description?: string;
}

// Interface extending Mongoose Document for use with the model
export interface ICategory extends ICategoryBase {
    _id: ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export interface ICategoryDocument extends ICategoryBase, Document {}

// Schema definition for the Category
const CategorySchema: Schema = new Schema(
    {
        categoryId: {
            type: String,
            default: generateId("category"),
            unique: true,
            required: true
        },
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        image: {
            type: String,
            trim: true
        },
        description: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

// create and export the model
const CategoryModel =
    mongoose.models?.Category || mongoose.model<ICategoryDocument>("Category", CategorySchema);
export default CategoryModel;
