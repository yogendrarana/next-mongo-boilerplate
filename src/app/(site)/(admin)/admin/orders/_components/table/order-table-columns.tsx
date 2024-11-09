"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { ArrowUpDown } from "lucide-react";
import { IOrder } from "@/server/db/models/order-model";
import OrderTableRowActions from "./order-table-row-actions";
import { format } from "date-fns";

export function getOrderTableColumns(): ColumnDef<IOrder>[] {
    return [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                    className="translate-y-0.5"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    className="translate-y-0.5"
                />
            ),
            enableSorting: false,
            enableHiding: false
        },
        {
            accessorKey: "orderId",
            header: "Order ID",
            cell: ({ row }) => <span className="capitalize">{row.getValue("orderId")}</span>
        },

        {
            accessorKey: "status",
            header: "Order Status",
            cell: ({ row }) => <span>{row.getValue("status")}</span>
        },

        {
            accessorKey: "total",
            header: "Order Total",
            cell: ({ row }) => <span>{row.getValue("total")}</span>
        },

        {
            accessorKey: "createdAt",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="p-0 hover:text-black hover:bg-transparent"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Order Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => <span>{format(row.getValue("createdAt"), "dd MMMM, yyyy")}</span>
        },
        {
            id: "actions",
            cell: function Cell({ row }: { row: any }) {
                return <OrderTableRowActions row={row} />;
            },
            size: 40
        }
    ];
}
