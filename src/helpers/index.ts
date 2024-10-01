import { ObjectId } from "mongodb";

// Utility function to flatten MongoDB data
export const formatMongoData = (data: any | any[]): any | any[] => {
    const formatDocument = (doc: any): any => {
        if (doc === null || typeof doc !== 'object') {
            return doc;
        }

        if (doc instanceof ObjectId) {
            return doc.toString();
        }

        if (doc instanceof Date) {
            return doc.toISOString();
        }

        if (Array.isArray(doc)) {
            return doc.map(formatDocument);
        }

        const formattedDoc: any = {};

        for (const [key, value] of Object.entries(doc)) {
            formattedDoc[key] = formatDocument(value);
        }

        return formattedDoc;
    };

    return Array.isArray(data) ? data.map(formatDocument) : formatDocument(data);
};