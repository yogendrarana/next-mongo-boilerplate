import { customAlphabet } from "nanoid";

const prefixes = {
    store: "STR",
    product: "PRD",
    category: "CAT",
    payment: "PAY",
    order: "ORD",
    subcategory: "SUBCAT"
};

interface GenerateIdOptions {
    length?: number;
    separator?: string;
    includeTimestamp?: boolean;
    excludeSeparator?: boolean; // New option to exclude separator
}

export function generateId(
    prefix?: keyof typeof prefixes,
    {
        length = 20,
        separator = "_",
        includeTimestamp = true,
        excludeSeparator = false
    }: GenerateIdOptions = {}
) {
    const nanoid = customAlphabet(
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        length
    );

    // Validate prefix
    if (prefix && !prefixes[prefix]) {
        throw new Error(
            `Invalid prefix: ${prefix}. Valid prefixes are: ${Object.keys(prefixes).join(", ")}`
        );
    }

    // Use Date.now() to get the timestamp in milliseconds (works in both client and server)
    const timestamp = includeTimestamp
        ? `${Math.floor(Date.now()).toString(36)}${excludeSeparator ? "" : separator}`
        : "";

    // Return the ID with prefix if available
    return prefix
        ? `${prefixes[prefix]}${separator}${timestamp}${nanoid()}`
        : `${timestamp}${nanoid()}`;
}
