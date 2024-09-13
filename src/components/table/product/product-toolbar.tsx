"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

interface DataTableToolbarProps<TData> {
    table: Table<TData>,
    searchPlaceholder?: string,
}

export function ProductToolbar<TData>({
    table,
    searchPlaceholder = "Search by customer ..."
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder={searchPlaceholder}
                    value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                    onChange={(event) =>
                        table.getColumn('name')?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="px-3 flex items-center gap-2 hover:bg-gray-100"
                    >
                        Reset
                        <X size={16} />
                    </Button>
                )}
            </div>
        </div>
    )
}