import React from "react";

import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuContent,
    DropdownMenuShortcut
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { DeleteProductsDialog } from "../delete-products-dialog";
import { Row } from "@tanstack/react-table";
import { IProduct } from "@/server/db/models/product-model";

interface ProductsTableRowActionsProps {
    row: Row<IProduct>;
}

const ProductsTableRowActions = ({ row }: ProductsTableRowActionsProps) => {
    const [showDeleteProduct, setShowDeleteProduct] = React.useState(false);

    return (
        <>
            <DeleteProductsDialog
                open={showDeleteProduct}
                onOpenChange={setShowDeleteProduct}
                products={[row.original]}
                showTriggerText={false}
                onSuccess={() => row.toggleSelected(false)}
            />
        </>
    );
};

export default ProductsTableRowActions;
