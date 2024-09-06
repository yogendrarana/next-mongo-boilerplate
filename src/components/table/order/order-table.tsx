"use client"

import React from 'react'

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"
import { OrderSchemaType } from '@/constants/types'
import { orderTableColumns } from './order-table-columns'
import DataTable from '@/components/table/data-table'
import { OrderTableToolbar } from './order-table-toolbar'
import OrderTableRowActions from './order-table-actions'
import { Pagination } from '../pagination'
import { OrderDetail } from '@/app/(dashboard)/dashboard/orders/_components/order-detail-sheet'

interface OrderTableProps {
    data: OrderSchemaType[]
}

const OrderTable = ({ data }: OrderTableProps) => {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

    const [order, setOrder] = React.useState(null)

    const memoizedColumns = React.useMemo(() => {
        return orderTableColumns.map(col => {
            if (col.id === "actions") {
                return {
                    ...col,
                    cell: ({ row }: { row: any }) => (
                        <OrderTableRowActions
                            row={row}
                            onOpenDetail={() => setOrder(row.original)}
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
            <OrderTableToolbar table={table} />
            <DataTable table={table} columns={orderTableColumns} />
            <Pagination table={table} />

            {/* order detail sheet */}
            <OrderDetail
                open={!!order}
                onOpenChange={() => setOrder(null)}
                order={order}
            />
        </div>
    )
}

export default OrderTable