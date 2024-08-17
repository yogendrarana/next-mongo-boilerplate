import { ProductGenderEnum } from '@/constants/enum';
import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    _id: string;
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
    images: string[];
    gender: string;
}

// Schema definition for the Product
const ProductSchema: Schema = new Schema({
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
        min: 0,
        default: 0
    },
    gender: {
        type: String,
        enum: Object.values(ProductGenderEnum),
        required: true
    },
    images: [{ type: String }]
}, {
    timestamps: true
});

// Create and export the model
const ProductModel = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
export default ProductModel;