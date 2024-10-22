"use client";

import * as React from "react";
import { UserRoleEnum } from "@/constants/enum";
import { useDataTable } from "@/hooks/use-data-table";
import { IUser } from "@/server/db/models/user-model";
import { UsersTableToolbar } from "./users-table-toolbar";
import { getUsersTableColumns } from "./users-table-columns";
import { type DataTableFilterField } from "@/constants/types";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";

interface UsersTableProps {
    tableData: IUser[];
    pageCount: number;
    roles: string[];
    authProviders: string[];
}

export function UsersTable({ tableData, pageCount, roles, authProviders }: UsersTableProps) {
    const columns = React.useMemo(() => getUsersTableColumns(), []);

    const filterFields: DataTableFilterField<IUser>[] = [
        {
            label: "Name",
            value: "name",
            placeholder: "Search by name..."
        },
        {
            label: "Role",
            value: "role",
            options: roles?.map((role: string) => ({
                label: role || "",
                value: role || "",
                withCount: true
            }))
        },
        {
            label: "Auth Provider",
            value: "authProvider",
            options: authProviders?.map((provider: string) => ({
                label: provider || "",
                value: provider || "",
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
        getRowId: (originalRow, index) => `${originalRow._id.toString()}-${index}`
    });

    return (
        <DataTable table={table}>
            <DataTableToolbar table={table} filterFields={filterFields}>
                <UsersTableToolbar table={table} />
            </DataTableToolbar>
        </DataTable>
    );
}
