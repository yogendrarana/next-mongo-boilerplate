import { customAlphabet } from "nanoid"

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
    subcategory: "subcat",
}

interface GenerateIdOptions {
    length?: number
    separator?: string,
    includeTimestamp?: boolean;
}

export function generateId(
    prefix?: keyof typeof prefixes,
    { length = 15, separator = "_", includeTimestamp = true }: GenerateIdOptions = {}
) {
    const nanoid = customAlphabet(
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        length
    );

    const timestamp = includeTimestamp ? Date.now().toString(36) + separator : '';
    return prefix ? `${prefixes[prefix]}${separator}${timestamp}${nanoid()}` : `${timestamp}${nanoid()}`;
}