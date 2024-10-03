"use client";

import * as React from "react";
import { toast } from "sonner";
import { type Row } from "@tanstack/react-table";
import { TrashIcon } from "@radix-ui/react-icons";
import { useMediaQuery } from "@/hooks/use-media-query";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import { Icons } from "@/components/utils/icons";
import { deleteProducts } from "../_lib/actions";
import { IProduct } from "@/server/db/models/product-model";
import { cn } from "@/lib/utils";
import { LoaderIcon, Trash } from "lucide-react";

interface DeleteProductsDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
    products: Row<IProduct>["original"][];
    showTrigger?: boolean;
    showTriggerText?: boolean;
    onSuccess?: () => void;
    onOpenChange?: (open: boolean) => void;
    open: boolean;
}

export function DeleteProductsDialog({
    products,
    showTrigger = true,
    showTriggerText = true,
    onSuccess,
    open,
    onOpenChange
}: DeleteProductsDialogProps) {
    const [isDeletePending, startDeleteTransition] = React.useTransition();

    function onDelete() {
        startDeleteTransition(async () => {
            try {
                const ids = products.map((p) => p._id.toString());
                const { success, message } = await deleteProducts(ids);
    
                if (success) {
                    toast.success(message || "Product deleted");
                    onSuccess?.();
                } else {
                    toast.error(message || "Failed to delete product");
                }
            } catch (err: any) {
                toast.error(err.message || "Failed to delete product");
            } finally {
                onOpenChange?.(false);
            }
        });
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {showTrigger ? (
                <DialogTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Trash
                            size={16}
                            className={cn(showTriggerText && "mr-2")}
                            aria-hidden="true"
                        />
                        {showTriggerText && `Delete (${products.length})`}
                    </Button>
                </DialogTrigger>
            ) : null}

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your{" "}
                        <span className="font-medium">{products.length}</span>
                        {products.length === 1 ? " product" : " products"} from the database.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:space-x-0">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        aria-label="Delete selected rows"
                        variant="destructive"
                        onClick={onDelete}
                        disabled={isDeletePending}
                    >
                        {isDeletePending ? (
                            <LoaderIcon size={14} className="mr-2 animate-spin" />
                        ) : (
                            <Trash size={14} className="mr-2" />
                        )}

                        <span>Delete</span>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
