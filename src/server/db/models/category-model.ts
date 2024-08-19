import { generateId } from '@/lib/id';
import mongoose, { Document, Schema } from 'mongoose';

// Interface to define the structure of a Category document
export interface ICategory extends Document {
    id: string;
    name: string;
    slug: string;
    image?: string;
    description?: string;
}

// Schema definition for the Category
const CategorySchema: Schema = new Schema({
    id: {
        type: String,
        default: generateId('category'),
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    image: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true
});

// create and export the model
const CategoryModel = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
export default CategoryModel;