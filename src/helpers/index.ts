import { Document, ObjectId } from "mongodb";

// Utility function to serialize MongoDB data
export const serializeMongoData = <T extends Document>(documents: T[]): Omit<T, keyof Document>[] =>
    documents.map((document) => document.toObject({ flattenObjectIds: true }));

// Utility function to flatten MongoDB data
export const formatMongoData = (documents: any[]): any[] => {
    return documents.map((doc) => {
        // Create a new object to store the formatted fields
        const formattedDoc: any = {};

        // Iterate through each key in the document
        for (const [key, value] of Object.entries(doc)) {
            if (value instanceof ObjectId) {
                // If the value is an ObjectId, convert it to a string
                formattedDoc[key] = value.toString();
            } else if (key === "createdAt" || key === "updatedAt") {
                // Format dates as needed (e.g., ISO string, or keep as Date)
                formattedDoc[key] = value instanceof Date ? value.toISOString() : value;
            } else {
                // Otherwise, just copy the value over
                formattedDoc[key] = value;
            }
        }

        return formattedDoc;
    });
};
