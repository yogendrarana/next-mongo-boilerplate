export type ProductSearchParams = {
    gte?: string;
    lte?: string;
    gender?: string;
    category?: string;
    subcategory?: string;
    page?: string;
    limit?: string;
    sort?: string;
    order?: string;
    search?: string;
    [key: string]: string | string[] | undefined;
};