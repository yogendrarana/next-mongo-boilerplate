"use client";

import { Button } from "@/components/ui/button";
import { type Table } from "@tanstack/react-table";
import { exportTableToCSV } from "@/lib/csv/export";
import { DownloadIcon } from "@radix-ui/react-icons";
import { IOrder } from "@/server/db/models/order-model";
import { DeleteOrdersDialog } from "../delete-orders-dialog";
// import { DeleteOrdersDialog } from "../delete-orders-dialog";

interface OrderTableToolbarProps {
    table: Table<IOrder>;
}

export function OrderTableToolbar({ table }: OrderTableToolbarProps) {
    return (
        <div className="flex items-center gap-2">
            {table.getFilteredSelectedRowModel().rows.length > 0 ? (
                <DeleteOrdersDialog
                    onSuccess={() => table.toggleAllRowsSelected(false)}
                    orders={table.getFilteredSelectedRowModel().rows.map((row) => row.original)}
                />
            ) : null}

            <Button
                variant="outline"
                size="sm"
                onClick={() =>
                    exportTableToCSV(table, {
                        filename: "orders",
                        excludeColumns: ["select", "actions"]
                    })
                }
            >
                <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
                Export
            </Button>
        </div>
    );
}
