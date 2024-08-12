import { generateId } from '@/lib/id';
import mongoose, { Schema, Document } from 'mongoose';

export interface ISubcategory extends Document {
    id: string;
    name: string;
    slug: string;
    categoryId: string;
    description?: string;
    image?: string;
}

const SubcategorySchema: Schema = new Schema({
    id: {
        type: String,
        default: generateId("subcategory"),
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    description: {
        type: String,
        trim: true,
    },
    categoryId: {
        type: String,
        required: true,
        ref: 'Category',
    },
    image: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true
});

export const SubcategoryModel = mongoose.model<ISubcategory>('Subcategory', SubcategorySchema);