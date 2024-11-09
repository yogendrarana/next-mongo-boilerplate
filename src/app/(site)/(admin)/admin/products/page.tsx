import React from "react";
import { SearchParams } from "@/constants/types";
import { searchProductsParamsSchema } from "./_lib/validations";
import ProductsComponent from "./_components/products-component";
import { getProducts, getCategories, getSubcategories } from "./_lib/queries";

export interface AdminProductsPageProps {
    searchParams: SearchParams;
}

const AdminProductsPage = ({ searchParams }: AdminProductsPageProps) => {
    const search = searchProductsParamsSchema.parse(searchParams);
    const getProductsPromise = getProducts(search);
    const getCategoriesPromise = getCategories();
    const getSubcategoriesPromise = getSubcategories();

    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <ProductsComponent
                getProductsPromise={getProductsPromise}
                getCategoriesPromise={getCategoriesPromise}
                getSubcategoriesPromise={getSubcategoriesPromise}
            />
        </React.Suspense>
    );
};

export default AdminProductsPage;
