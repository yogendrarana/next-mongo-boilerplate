import { Button } from "@/components/ui/button"
import { ICustomerBase } from "@/server/db/models/customer-model"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import CustomerRowActions from "./customer-row-actions"

export const customerColumns: ColumnDef<Partial<ICustomerBase>>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => <span className="capitalize">{row.getValue('name')}</span>,
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => <span>{row.getValue('email')}</span>,
    },
    {
        accessorKey: 'totalOrders',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="p-0 hover:text-black hover:bg-transparent"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Total Orders
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <span>{row.getValue('totalOrders')}</span>,
    },
    {
        accessorKey: 'totalSpent',
        header: () => <span className="text-right">Total Spent</span>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('totalSpent'))
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(amount)
            return <span className="text-right font-medium">{formatted}</span>
        },
    },
    {
        accessorKey: 'loyaltyTier',
        header: 'Loyalty Tier',
        cell: ({ row }) => <span>{row.getValue('loyaltyTier')}</span>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => <CustomerRowActions row={row} onOpenDetail={() => {}} />
    },
]
