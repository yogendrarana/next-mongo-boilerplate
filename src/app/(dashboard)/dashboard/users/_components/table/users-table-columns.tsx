"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { IUser } from "@/server/db/models/user-model";
import { type ColumnDef } from "@tanstack/react-table";
import UsersTableRowActions from "./users-table-row-actions";

export function getUsersTableColumns(): ColumnDef<IUser>[] {
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
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => <span className="capitalize">{row.getValue("name")}</span>
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => <span>{row.getValue("email")}</span>
        },
        {
            accessorKey: "phone",
            header: "Phone",
            cell: ({ row }) => <span>{row.getValue("phone") ?? "-"}</span>
        },
        {
            accessorKey: "city",
            header: "City",
            cell: ({ row }) => <span>{(row.getValue("city")) ?? "-"}</span>
        },
        {
            accessorKey: "state",
            header: "State",
            cell: ({ row }) => <span>{(row.getValue("state")) ?? "-"}</span>
        },
        {
            accessorKey: "role",
            header: "Role",
            cell: ({ row }) => <span>{(row.getValue("role"))}</span>
        },
        {
            accessorKey: "authProvider",
            header: "Auth Provider",
            cell: ({ row }) => <span>{row.getValue("authProvider")}</span>
        },
        {
            id: "actions",
            cell: function Cell({ row }: { row: any }) {
                return <UsersTableRowActions row={row} />;
            },
            size: 40
        }
    ];
}
