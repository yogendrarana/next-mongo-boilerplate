"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import * as React from "react";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ChevronsRight, ChevronsLeft, ChevronLeft, ChevronRight } from "lucide-react";

interface DataTablePaginationProps<T> {
    table: Table<T>;
}

export function Pagination<T>({ table }: DataTablePaginationProps<T>) {
    return (
        <div className="flex items-center justify-between p-2">
            <div className="flex-1 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value));
                        }}
                    >
                        <SelectTrigger className="h-[--size-button] w-[80px]">
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent
                            side="top"
                            className="w-[80px] p-2 dark:bg-gray-800"
                            sideOffset={5}
                        >
                            {[20, 30, 40, 50].map((pageSize) => (
                                <SelectItem
                                    key={pageSize}
                                    value={`${pageSize}`}
                                    className="cursor-pointer"
                                >
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="hidden md:flex w-[100px] items-center justify-center text-sm font-medium">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="hidden lg:flex items-center justify-center border rounded-md cursor-pointer bg-white hover:bg-gray-100"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronsLeft size={16} />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="flex items-center justify-center border rounded-md cursor-pointer bg-white hover:bg-gray-100"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft size={16} />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="flex items-center justify-center border rounded-md cursor-pointer bg-white hover:bg-gray-100"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRight size={16} />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="hidden lg:flex items-center justify-center border rounded-md cursor-pointer bg-white hover:bg-gray-100"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronsRight size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
