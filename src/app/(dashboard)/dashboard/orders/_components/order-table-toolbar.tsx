"use client"
import * as React from "react"
import { Filter, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { OrderStatusData } from "./order-table-data"
import { OrderTableFacetedFilter } from "./order-table-faceted-filter"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { SliderIcon } from "@radix-ui/react-icons"

interface DataTableToolbarProps<TData> {
    table: Table<TData>,
    searchPlaceholder?: string,
}

export function OrderTableToolbar<TData>({
    table,
    searchPlaceholder = "Search by customer ..."
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder={searchPlaceholder}
                    value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("email")?.setFilterValue(event.target.value)
                    }
                    className="w-[200px] lg:w-[250px] focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0 dark:bg-slate-900"
                />
                {table.getColumn("status") && (
                    <OrderTableFacetedFilter
                        column={table.getColumn("status")}
                        title="Status"
                        options={OrderStatusData.map((status) => ({
                            label: status.label,
                            value: status.value,
                        }))}
                    />
                )}
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
            {/* show/hide column */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className="ml-auto focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-inset-0"
                    >
                        <SliderIcon className="mr-2" />
                        View
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {table
                        .getAllColumns()
                        .filter(
                            (column) => column.getCanHide()
                        )
                        .map((column) => {
                            return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            )
                        })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}