"use client"

import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Row } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Book, MoreHorizontal, Pencil, Trash, Truck } from 'lucide-react'
import { OrderDetailDrawer } from '@/app/(dashboard)/dashboard/orders/_components/order-detail-drawer'

interface DataTableRowActionsProps<T> {
    row: Row<T>
    onOpenDetail?: () => void
}

function OrderTableRowActions<T extends any>({
    row,
    onOpenDetail
}: DataTableRowActionsProps<T>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className='p-2'>
                <DropdownMenuItem
                    onSelect={onOpenDetail}
                    className='flex gap-2 items-center cursor-pointer'
                >
                    <Book className='h-3.5 w-3.5' />
                    Order Detail
                    {/* <OrderDetailDrawer order={row.original} open /> */}
                </DropdownMenuItem>
                <DropdownMenuItem className='flex gap-2 items-center cursor-pointer'>
                    <Trash className='h-3.5 w-3.5' />
                    Delete Order
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default OrderTableRowActions