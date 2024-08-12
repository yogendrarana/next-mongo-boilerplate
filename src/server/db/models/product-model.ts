import { ProductSexEnum } from '@/constants/enum';
import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    categoryId: string;
    subCategoryId: string;
    sku: string;
    inventory: number;
    images: string[];
    sex: string;
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
    categoryId: {
        type: String,
        required: true,
        ref: "Category"
    },
    subCategoryId: {
        type: String,
        required: true,
        ref: "Subcategory"
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
    sex: {
        type: String,
        enum: Object.values(ProductSexEnum),
        required: true
    },
    images: [{ type: String }]
}, {
    timestamps: true
});

// Create and export the model
const ProductModel = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
export default ProductModel;