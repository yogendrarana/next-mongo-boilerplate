import { customAlphabet } from "nanoid";

const prefixes = {
    store: "str",
    product: "prd",
    category: "cat",
    cart: "crt",
    subscription: "sub",
    payment: "pay",
    address: "adr",
    order: "ord",
    notification: "not",
    subcategory: "subcat"
};

interface GenerateIdOptions {
    length?: number;
    separator?: string;
    includeTimestamp?: boolean;
}

export function generateId(
    prefix?: keyof typeof prefixes,
    { length = 20, separator = "_", includeTimestamp = true }: GenerateIdOptions = {}
) {
    const nanoid = customAlphabet(
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        length
    );

    // Use Date.now() to get the timestamp (works in both client and server)
    const timestamp = includeTimestamp
        ? `${Math.floor(Date.now() / 1000).toString(36)}${separator}` // Using seconds in base 36
        : "";

    // Return the ID with prefix if available
    return prefix
        ? `${prefixes[prefix]}${separator}${timestamp}${nanoid()}`
        : `${timestamp}${nanoid()}`;
}
