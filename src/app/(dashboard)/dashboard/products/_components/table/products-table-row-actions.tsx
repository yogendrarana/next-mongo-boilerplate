import React from "react";

import { Row } from "@tanstack/react-table";
import { IProduct } from "@/server/db/models/product-model";
import { DeleteProductsDialog } from "../delete-products-dialog";
import { CreateEditProductDialog } from "../create-edit-product-dialog";
import { CreateEditModeEnum } from "@/constants/enum";

interface ProductsTableRowActionsProps {
    row: Row<IProduct>;
}

const ProductsTableRowActions = ({ row }: ProductsTableRowActionsProps) => {
    const [showDeleteProduct, setShowDeleteProduct] = React.useState(false);

    return (
        <div className="flex gap-2">
            <CreateEditProductDialog mode={CreateEditModeEnum.EDIT} product={row.original} />
            <DeleteProductsDialog
                open={showDeleteProduct}
                onOpenChange={setShowDeleteProduct}
                products={[row.original]}
                showTriggerText={false}
                onSuccess={() => row.toggleSelected(false)}
            />
        </div>
    );
};

export default ProductsTableRowActions;
