import { ObjectId } from "mongodb";

// Utility function to flatten MongoDB data
export const formatMongoData = (data: any | any[]): any | any[] => {
    // WeakMap to track processed objects and prevent circular reference issues
    const processed = new WeakMap();

    const formatDocument = (doc: any): any => {
        // Handle primitive values and null
        if (doc === null || typeof doc !== "object") {
            return doc;
        }

        // Handle ObjectId
        if (doc instanceof ObjectId) {
            return doc.toString();
        }

        // Handle Date
        if (doc instanceof Date) {
            return doc.toISOString();
        }

        // Check for circular reference
        if (processed.has(doc)) {
            return processed.get(doc);
        }

        // Handle Arrays
        if (Array.isArray(doc)) {
            const formattedArray: any[] = [];
            processed.set(doc, formattedArray);
            for (let i = 0; i < doc.length; i++) {
                formattedArray[i] = formatDocument(doc[i]);
            }
            return formattedArray;
        }

        // Handle Objects
        const formattedDoc: any = {};
        processed.set(doc, formattedDoc);

        for (const [key, value] of Object.entries(doc)) {
            formattedDoc[key] = formatDocument(value);
        }

        return formattedDoc;
    };

    return Array.isArray(data) ? data.map(formatDocument) : formatDocument(data);
};
