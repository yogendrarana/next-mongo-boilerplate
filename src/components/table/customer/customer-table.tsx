"use client"

import React from 'react'

import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"
import { Pagination } from '../pagination'
import DataTable from '@/components/table/data-table'
import { customerColumns } from './customer-columns'
import { ICustomerBase } from '@/server/db/models/customer-model'
import { CustomerDetailSheet } from '@/app/(dashboard)/dashboard/users/_components/customer-detail-sheet'
import CustomerRowActions from './customer-row-actions'
import { CustomerToolbar } from './customer-toolbar'

interface CustomerTableProps {
    data: ICustomerBase[]
}

const CustomerTable = ({ data }: CustomerTableProps) => {
    const [customer, setCustomer] = React.useState<Partial<ICustomerBase> | null>(null)
    const [rowSelection, setRowSelection] = React.useState({})
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [selectedRow, setSelectedRow] = React.useState<ICustomerBase | null>(null)

    const memoizedColumns = React.useMemo(() => {
        return customerColumns.map(col => {
            if (col.id === "actions") {
                return {
                    ...col,
                    cell: ({ row }: { row: any }) => (
                        <CustomerRowActions
                            row={row}
                            onOpenDetail={() => setSelectedRow(row.original)}
                        />
                    )
                }
            }

            return col;
        })
    }, [])


    const table = useReactTable({
        data,
        columns: memoizedColumns,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: 20,
            },
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
    })

    return (
        <div className='w-full flex flex-col gap-2'>
            <CustomerToolbar table={table} />
            <DataTable table={table} columns={memoizedColumns} />
            <Pagination table={table} />

            {/* sheets */}
            <CustomerDetailSheet open={!!selectedRow} onOpenChange={() => setSelectedRow(null)} customer={selectedRow} />
        </div>
    )
}

export default CustomerTable