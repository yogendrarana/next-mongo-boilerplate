"use client"

import { ColumnDef } from "@tanstack/react-table"
import { OrderSchemaType } from "@/constants/types";
import { OrderStatus } from "@/constants";
import OrderTableRowActions from "./order-table-actions";

// Define the columns for the orders table
export const orderColumns: ColumnDef<OrderSchemaType>[] = [
    {
        accessorKey: "id",
        header: () => <span>Order Id</span>,
    },
    {
        accessorKey: "customerName",
        header: () => <span>Customer Name</span>,
    },
    {
        accessorKey: "email",
        header: () => <span>Email</span>,
    },
    {
        accessorKey: "trackingNumber",
        header: () => <span>Tracking Number</span>,
        cell: ({ row }) => {
            const trackingNumber: string | null = row.getValue("trackingNumber")
            return <span>{trackingNumber ? trackingNumber : "N/A"}</span>
        },
    },
    {
        accessorKey: "items",
        header: () => <span>Items</span>,
        cell: ({ row }) => <span>{row.getValue("items")}</span>,
    },
    {
        accessorKey: "amount",
        header: () => <span>Amount</span>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)
            return <span className="font-medium">{formatted}</span>
        },
    },
    {
        accessorKey: "paymentMethod",
        header: () => <span>Payment Method</span>,
        cell: ({ row }) => {
            const paymentMethod = row.getValue("paymentMethod")
            const formattedPaymentMethod = (paymentMethod as string)
                .replace(/_/g, " ")
                .replace(/\b\w/g, (l: string) => l.toUpperCase())
            return <span>{formattedPaymentMethod}</span>
        },
    },
    {
        accessorKey: "status",
        header: () => <span>Status</span>,
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            const statusColor = status === OrderStatus.SUCCESS
                ? "text-green-600"
                : status === OrderStatus.FAILED
                    ? "text-red-600"
                    : "text-yellow-600"
            return (
                <span className={statusColor}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
            )
        },
    },
    {
        accessorKey: "orderDate",
        header: () => <span>Order Date</span>,
        cell: ({ row }) => {
            const date = new Date(row.getValue("orderDate"))
            const formattedDate = date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            })
            return <span>{formattedDate}</span>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <OrderTableRowActions row={row} />
    },
]
