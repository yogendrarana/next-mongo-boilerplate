export type ProductSearchParams = {
    gte?: string;
    lte?: string;
    gender?: string;
    category?: string;
    subcategory?: string;
    page?: string;
    limit?: string;
    search?: string;
    sort?: string;
    order?: string;
    [key: string]: string | string[] | undefined;
};