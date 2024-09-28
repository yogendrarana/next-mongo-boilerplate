"use client";

import * as React from "react";
import { useDataTable } from "@/hooks/use-data-table";
import { IProduct } from "@/server/db/models/product-model";
import { ICategory } from "@/server/db/models/category-model";
import { type DataTableFilterField } from "@/constants/types";
import { DataTable } from "@/components/data-table/data-table";
import { ProductsTableToolbar } from "./products-table-toolbar";
import { getProductsTableColumns } from "./products-table-columns";
import { ISubcategory } from "@/server/db/models/subcategory-model";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { getProducts, getCategories, getSubcategories } from "../_lib/queries";

interface ProductsTableProps {
    getProductsPromise: ReturnType<typeof getProducts>;
    getCategoriesPromise: ReturnType<typeof getCategories>;
    getSubcategoriesPromise: ReturnType<typeof getSubcategories>;
}

export function ProductsTable({
    getProductsPromise,
    getCategoriesPromise,
    getSubcategoriesPromise
}: ProductsTableProps) {
    const { data } = React.use(getProductsPromise);
    let products = data?.products || [];
    products = JSON.parse(JSON.stringify(products));

 
    const pageCount = data?.pageCount || 0;

    const { data: categoriesData } = React.use(getCategoriesPromise);
    const { data: subcategoriesData } = React.use(getSubcategoriesPromise);

    const columns = React.useMemo(() => getProductsTableColumns(), []);

    const filterFields: DataTableFilterField<IProduct>[] = [
        {
            label: "Name",
            value: "name",
            placeholder: "Filter categories..."
        },
        {
            label: "Category",
            value: "category",
            options: categoriesData?.map((category: ICategory) => ({
                label: category?.slug?.toUpperCase() || "",
                value: category.slug,
                withCount: true
            }))
        },
        {
            label: "Subcategory",
            value: "subcategory",
            options: subcategoriesData?.map((subcat: ISubcategory) => ({
                label: subcat?.slug?.toUpperCase() || "",
                value: subcat.slug,
                withCount: true
            }))
        }
    ];

    const { table } = useDataTable({
        data: products,
        columns,
        pageCount,
        filterFields,
        initialState: {
            sorting: [{ id: "createdAt", desc: true }],
            columnPinning: { right: ["actions"] }
        },
        // For remembering the previous row selection on page change
        getRowId: (originalRow, index) => `${originalRow.productId}-${index}`
    });

    return (
        <DataTable table={table}>
            <DataTableToolbar table={table} filterFields={filterFields}>
                <ProductsTableToolbar table={table} />
            </DataTableToolbar>
        </DataTable>
    );
}
