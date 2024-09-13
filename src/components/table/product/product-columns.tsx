import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import ProductRowActions from "./product-row-actions"
import { IProductBase } from "@/server/db/models/product-model"

export const productColumns: ColumnDef<Partial<IProductBase>>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => <span className="capitalize">{row.getValue('name')}</span>,
    },
    {
        accessorKey: 'productId',
        header: 'Product ID',
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
        enableHiding: false,
        cell: ({ row }) => <ProductRowActions row={row} onOpenDetail={() => { }} />
    },
]
