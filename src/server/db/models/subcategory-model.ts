import { generateId } from "@/lib/id";
import mongoose, { Schema, Document, Date } from "mongoose";

export interface ISubcategoryBase {
    subcategoryId: string;
    name: string;
    slug: string;
    category: {
        id: string;
        slug: string;
    };
    description?: string;
    image?: string;
}

// Interface extending Mongoose Document for use with the model
export interface ISubcategory extends ISubcategoryBase {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface ISubcategoryDocument extends ISubcategoryBase, Document {}

const SubcategorySchema: Schema = new Schema(
    {
        subcategoryId: {
            type: String,
            default: generateId("subcategory"),
            unique: true,
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        description: {
            type: String,
            trim: true
        },
        category: {
            id: {
                type: String,
                required: true,
                ref: "Category"
            },
            slug: {
                type: String,
                required: true
            }
        },
        image: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const SubcategoryModel =
    mongoose.models?.Subcategory ||
    mongoose.model<ISubcategoryDocument>("Subcategory", SubcategorySchema);
export default SubcategoryModel;
