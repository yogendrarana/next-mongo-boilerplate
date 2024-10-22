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

interface ProductsTableProps {
    tableData: IProduct[];
    categories: ICategory[] | null;
    subcategories: ISubcategory[] | null;
    pageCount: number;
}

export function ProductsTable({
    tableData,
    categories, 
    subcategories,
    pageCount
}: ProductsTableProps) {
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
            options: categories?.map((category: ICategory) => ({
                label: category?.slug?.toUpperCase() || "",
                value: category.slug,
                withCount: true
            }))
        },
        {
            label: "Subcategory",
            value: "subcategory",
            options: subcategories?.map((subcat: ISubcategory) => ({
                label: subcat?.slug?.toUpperCase() || "",
                value: subcat.slug,
                withCount: true
            }))
        }
    ];

    const { table } = useDataTable({
        data: tableData,
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
