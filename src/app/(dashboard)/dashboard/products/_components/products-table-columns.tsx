"use client"

import * as React from "react"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { type ColumnDef } from "@tanstack/react-table"
import { toast } from "sonner"

import { getErrorMessage } from "@/lib/handle-error"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"

import { ArrowUpDown } from "lucide-react"
import { IProduct } from "@/server/db/models/product-model"

export function getProductsTableColumns(): ColumnDef<IProduct>[] {
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
      enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => <span className="capitalize">{row.getValue('name')}</span>,
    },
    {
        accessorKey: 'productId',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Product ID" />
        ), 
        cell: ({ row }) => <span>{row.getValue('productId')}</span>,
    },
    {
        accessorKey: 'inventory',
        header: 'Inventory',
        cell: ({ row }) => <span>{row.getValue('inventory')}</span>,
    },
    {
        accessorKey: 'price',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="p-0 hover:text-black hover:bg-transparent"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const price = parseFloat(row.getValue('price'))
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(price)
            return <span className="text-right font-medium">{formatted}</span>
        },
    },
    {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) => <span>{(row.getValue('category') as { slug: string }).slug}</span>,
    },
    {
        accessorKey: 'subcategory',
        header: 'Sub Category',
        cell: ({ row }) => <span>{(row.getValue('subcategory') as { slug: string }).slug}</span>,
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const [isUpdatePending, startUpdateTransition] = React.useTransition()
        const [showUpdateTaskSheet, setShowUpdateTaskSheet] = React.useState(false)
        const [showDeleteTaskDialog, setShowDeleteTaskDialog] = React.useState(false)

        return (
          <>
            {/* <UpdateTaskSheet
              open={showUpdateTaskSheet}
              onOpenChange={setShowUpdateTaskSheet}
              task={row.original}
            /> */}
            {/* <DeleteTasksDialog
              open={showDeleteTaskDialog}
              onOpenChange={setShowDeleteTaskDialog}
              tasks={[row.original]}
              showTrigger={false}
              onSuccess={() => row.toggleSelected(false)}
            /> */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Open menu"
                  variant="ghost"
                  className="flex size-8 p-0 data-[state=open]:bg-muted"
                >
                  <DotsHorizontalIcon className="size-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onSelect={() => setShowUpdateTaskSheet(true)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => setShowDeleteTaskDialog(true)}
                >
                  Delete
                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )
      },
      size: 40,
    },
  ]
}
