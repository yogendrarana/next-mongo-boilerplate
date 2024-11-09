"use client";

import * as React from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { type ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

import { getErrorMessage } from "@/lib/handle-error";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import { ArrowUpDown } from "lucide-react";
import { IProduct } from "@/server/db/models/product-model";
import Image from "next/image";
import ProductsTableRowActions from "./products-table-row-actions";
import { DeleteProductsDialog } from "../delete-products-dialog";

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
            enableHiding: false
        },
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => <span className="capitalize">{row.getValue("name")}</span>
        },
        {
            accessorKey: "images",
            header: "Images",
            cell: ({ row }) => {
                return (
                    <Image
                        src={
                            (row.getValue("images") as { url: string; public_id: string }[])[0].url
                        }
                        height={80}
                        width={30}
                        className=""
                        alt="prod-img"
                    />
                );
            }
        },
        {
            accessorKey: "productId",
            header: "Product ID",
            cell: ({ row }) => <span>{row.getValue("productId")}</span>
        },
        {
            accessorKey: "inventory",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="p-0 hover:text-black hover:bg-transparent"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Inventory
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                const inventory = parseFloat(row.getValue("inventory"));
                return <span className="text-right font-medium">{inventory}</span>;
            }
        },
        {
            accessorKey: "price",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="p-0 hover:text-black hover:bg-transparent"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Price
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                const price = parseFloat(row.getValue("price"));
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD"
                }).format(price);
                return <span className="text-right font-medium">{formatted}</span>;
            }
        },
        {
            accessorKey: "gender",
            header: "Gender",
            cell: ({ row }) => <span>{(row.getValue("gender"))}</span>
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: ({ row }) => <span>{(row.getValue("category") as { slug: string }).slug}</span>
        },
        {
            accessorKey: "subcategory",
            header: "Sub Category",
            cell: ({ row }) => <span>{(row.getValue("subcategory") as { slug: string }).slug}</span>
        },
        {
            id: "actions",
            cell: function Cell({ row }: { row: any }) {
                return <ProductsTableRowActions row={row} />;
            },
            size: 40
        }
    ];
}
