import { generateId } from "@/lib/id";
import { ProductGenderEnum } from "@/constants/enum";
import mongoose, { Date, Document, ObjectId, Schema } from "mongoose";

export interface IProductBase {
    productId: string;
    name: string;
    description: string;
    price: number;
    category: {
        id: string;
        slug: string;
    };
    subcategory: {
        id: string;
        slug: string;
    };
    sku: string;
    inventory: number;
    images: [{
        url: string;
        public_id: string;
    }];
    gender: string;
}

// Interface extending Mongoose Document for use with the model
export interface IProduct extends IProductBase {
    _id: ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface IProductDocument extends IProductBase, Document {}

// Schema definition for the Product
const ProductSchema: Schema = new Schema(
    {
        productId: {
            type: String,
            default: generateId("product"),
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
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
        subcategory: {
            id: {
                type: String,
                required: true,
                ref: "Subcategory"
            },
            slug: {
                type: String,
                required: true
            }
        },
        sku: {
            type: String,
            required: true,
            unique: true
        },
        inventory: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        },
        gender: {
            type: String,
            enum: Object.values(ProductGenderEnum),
            required: true
        },
        images: [{
            url: { type: String, required: true },
            public_id: { type: String, required: true },
        }],    
    },
    {
        timestamps: true
    }
);

// Create and export the model
const ProductModel =
    mongoose.models?.Product || mongoose.model<IProductDocument>("Product", ProductSchema);
export default ProductModel;
