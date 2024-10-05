"use client";

import { Button } from "@/components/ui/button";
import { type Table } from "@tanstack/react-table";
import { exportTableToCSV } from "@/lib/csv/export";
import { DownloadIcon } from "@radix-ui/react-icons";
import { IUser } from "@/server/db/models/user-model";
import { CreateEditModeEnum } from "@/constants/enum";
import { DeleteUsersDialog } from "../delete-users-dialog";
import { CreateEdituserDialog } from "../create-edit-user-dialog";

interface UsersTableToolbarProps {
    table: Table<IUser>;
}

export function UsersTableToolbar({ table }: UsersTableToolbarProps) {
    return (
        <div className="flex items-center gap-2">
            {table.getFilteredSelectedRowModel().rows.length > 0 ? (
                <DeleteUsersDialog
                    onSuccess={() => table.toggleAllRowsSelected(false)}
                    users={table.getFilteredSelectedRowModel().rows.map((row) => row.original)}
                />
            ) : null}

            <CreateEdituserDialog mode={CreateEditModeEnum.CREATE} />

            <Button
                variant="outline"
                size="sm"
                onClick={() =>
                    exportTableToCSV(table, {
                        filename: "users",
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
