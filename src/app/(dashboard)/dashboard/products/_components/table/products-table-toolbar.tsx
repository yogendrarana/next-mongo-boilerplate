"use client";

import { Button } from "@/components/ui/button";
import { type Table } from "@tanstack/react-table";
import { exportTableToCSV } from "@/lib/csv/export";
import { DownloadIcon } from "@radix-ui/react-icons";
import { IProduct } from "@/server/db/models/product-model";
import { DeleteProductsDialog } from "../delete-products-dialog";
import { CreateEditProductDialog } from "../create-edit-product-dialog";
import { CreateEditModeEnum } from "@/constants/enum";

interface ProductsTableToolbarProps {
    table: Table<IProduct>;
}

export function ProductsTableToolbar({ table }: ProductsTableToolbarProps) {
    return (
        <div className="flex items-center gap-2">
            {table.getFilteredSelectedRowModel().rows.length > 0 ? (
                <DeleteProductsDialog
                    onSuccess={() => table.toggleAllRowsSelected(false)}
                    products={table.getFilteredSelectedRowModel().rows.map((row) => row.original)}
                />
            ) : null}

            <CreateEditProductDialog mode={CreateEditModeEnum.CREATE} />

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
