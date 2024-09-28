"use client";

import { DownloadIcon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";

import { exportTableToCSV } from "@/lib/csv/export";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/server/db/models/product-model";
import { DeleteProductsDialog } from "./delete-products-dialog";
import { CreateProductDialog } from "./create-product-dialog";

interface ProductsTableToolbarProps {
    table: Table<IProduct>;
}

export function ProductsTableToolbar({ table }: ProductsTableToolbarProps) {
    return (
        <div className="flex items-center gap-2">
            {table.getFilteredSelectedRowModel().rows.length > 0 ? (
                <DeleteProductsDialog
                    products={table.getFilteredSelectedRowModel().rows.map((row) => row.original)}
                    onSuccess={() => table.toggleAllRowsSelected(false)}
                />
            ) : null}

            <CreateProductDialog />

            <Button
                variant="outline"
                size="sm"
                onClick={() =>
                    exportTableToCSV(table, {
                        filename: "tasks",
                        excludeColumns: ["select", "actions"]
                    })
                }
            >
                <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
                Export
            </Button>
            {/**
             * Other actions can be added here.
             * For example, import, view, etc.
             */}
        </div>
    );
}
