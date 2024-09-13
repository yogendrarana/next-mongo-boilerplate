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
import DataTable from '@/components/table/data-table'
import { Pagination } from '../pagination'
import { OrderDetailSheet } from '@/app/(dashboard)/dashboard/orders/_components/order-detail-sheet'
import { ProductToolbar } from './product-toolbar'
import { productColumns } from './product-columns'
import ProductRowActions from './product-row-actions'
import { IProductBase } from '@/server/db/models/product-model'

interface ProductTableProps {
    data: IProductBase[]
}

const ProductTable = ({ data }: ProductTableProps) => {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [selectedRow, setSelectedRow] = React.useState<IProductBase | null>(null)

    const memoizedColumns = React.useMemo(() => {
        return productColumns.map(col => {
            if (col.id === "actions") {
                return {
                    ...col,
                    cell: ({ row }: { row: any }) => (
                        <ProductRowActions
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
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: 20,
            },
        },
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
    })

    return (
        <div className='flex flex-col gap-2'>
            <ProductToolbar table={table} />
            <DataTable table={table} columns={memoizedColumns} />
            <Pagination table={table} />

            {/* order detail sheet */}
            <OrderDetailSheet open={!!selectedRow} onOpenChange={() => setSelectedRow(null)} order={selectedRow} />
        </div>
    )
}

export default ProductTable