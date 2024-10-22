import React from "react";
import { ProductsTable } from "./table/products-table";
import { getCategories, getProducts, getSubcategories } from "../_lib/queries";
import { formatMongoData } from "@/helpers";

interface ProductsComponentProps {
    getProductsPromise: ReturnType<typeof getProducts>;
    getCategoriesPromise: ReturnType<typeof getCategories>;
    getSubcategoriesPromise: ReturnType<typeof getSubcategories>;
}

const ProductsComponent = ({
    getProductsPromise,
    getCategoriesPromise,
    getSubcategoriesPromise
}: ProductsComponentProps) => {
    const {
        data: { products, pageCount }
    } = React.use(getProductsPromise);
    const { data: categoriesData } = React.use(getCategoriesPromise);
    const { data: subcategoriesData } = React.use(getSubcategoriesPromise);

    return (
        <ProductsTable
            tableData={formatMongoData(products)}
            pageCount={pageCount}
            categories={formatMongoData(categoriesData)}
            subcategories={formatMongoData(subcategoriesData)}
        />
    );
};

export default ProductsComponent;
