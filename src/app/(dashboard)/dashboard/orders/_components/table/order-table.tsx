"use client";

import * as React from "react";
import { useDataTable } from "@/hooks/use-data-table";
import { IOrder } from "@/server/db/models/order-model";
import { type DataTableFilterField } from "@/constants/types";
import { DataTable } from "@/components/data-table/data-table";
import { OrderTableToolbar } from "./order-table-toolbar";
import { getOrderTableColumns } from "./order-table-columns";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { OrderStatusEnum } from "@/constants/enum";

interface OrderTableProps {
    tableData: IOrder[];
    pageCount: number;
}

export function OrderTable({ tableData, pageCount }: OrderTableProps) {
    const columns = React.useMemo(() => getOrderTableColumns(), []);

    const filterFields: DataTableFilterField<IOrder>[] = [
        {
            label: "Name",
            value: "name",
            placeholder: "Search..."
        },
        {
            label: "Category",
            value: "category",
            options: Object.values(OrderStatusEnum)?.map((status: string) => ({
                label: status?.toUpperCase() || "",
                value: status,
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
        getRowId: (originalRow, index) => `${originalRow._id}-${index}`
    });

    return (
        <DataTable table={table}>
            <DataTableToolbar table={table} filterFields={filterFields}>
                <OrderTableToolbar table={table} />
            </DataTableToolbar>
        </DataTable>
    );
}
