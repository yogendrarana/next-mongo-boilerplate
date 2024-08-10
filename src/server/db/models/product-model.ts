import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    categoryId: string;
    subId: string;
    sku: string;
    inventory: number;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
}

// Schema definition for the Product
const ProductSchema: Schema = new Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    categoryId: { type: String, required: true, ref: "Category" },
    sku: { type: String, required: true, unique: true },
    inventory: { type: Number, required: true, min: 0, default: 0 },
    images: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

// Create and export the model
const ProductModel = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
export default ProductModel;