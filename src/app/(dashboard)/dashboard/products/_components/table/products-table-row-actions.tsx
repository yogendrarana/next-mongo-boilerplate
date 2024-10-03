import React from "react";

import { Row } from "@tanstack/react-table";
import { IProduct } from "@/server/db/models/product-model";
import { DeleteProductsDialog } from "../delete-products-dialog";

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
