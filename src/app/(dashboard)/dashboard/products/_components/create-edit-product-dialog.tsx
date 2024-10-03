"use client";

import * as React from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "@/hooks/use-media-query";

import {
    Dialog,
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

import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateEditModeEnum } from "@/constants/enum";
import { IProduct } from "@/server/db/models/product-model";
import { LoaderIcon, Pencil, PlusIcon, RocketIcon } from "lucide-react";
import { CreateEditProductForm } from "./create-edit-product-form";
import { createProductSchema, CreateProductSchemaType } from "../_lib/validations";

interface CreateEditProductDialogProps {
    mode: CreateEditModeEnum;
    product: Row<IProduct>["original"];
}

export function CreateEditProductDialog({
    mode = CreateEditModeEnum.EDIT,
    product
}: CreateEditProductDialogProps) {
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery("(min-width: 640px)");
    const [isCreatePending, startCreateTransition] = React.useTransition();


    const form = useForm<CreateProductSchemaType>({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            images: [],
            name: product?.name || "",
            price: product?.price || 0,
            category: product?.category.id || "",
            subcategory: product?.subcategory.id || "",
            inventory: product?.inventory || 0,
            gender: product?.gender || "",
            description: product?.description || ""
        }
    });

    function onSubmit(input: CreateProductSchemaType) {
        startCreateTransition(async () => {
            try {
                const formData = new FormData();
                for (const key in input) {
                    if (key !== "images") {
                        formData.append(key, (input as any)[key]);
                    }
                }

                input.images.forEach((image) => {
                    formData.append("images", image);
                });

                // Set API method and URL based on mode
                const method = mode === CreateEditModeEnum.CREATE ? "POST" : "PATCH";
                const url =
                    mode === CreateEditModeEnum.CREATE
                        ? "/api/products"
                        : `/api/products/${product?._id}`;

                const res = await fetch(url, {
                    method,
                    body: formData
                });

                const { success, message } = await res.json();

                // check if the request was successful
                if (!success) {
                    toast.error(message || "Something went wrong");
                    return;
                }

                // Handle success feedback
                toast.success(
                    mode === CreateEditModeEnum.CREATE ? "Product created!" : "Product updated!"
                );
            } catch (error: any) {
                toast.error(error.message || "Failed to create product");
            } finally {
                form.reset();
                setOpen(false);
            }
        });
    }

    if (isDesktop)
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {mode === CreateEditModeEnum.CREATE ? (
                        <Button variant="outline" size="sm">
                            <PlusIcon size={16} aria-hidden="true" />
                        </Button>
                    ) : (
                        <Button variant="outline" size="icon">
                            <Pencil size={16} aria-hidden="true" />
                        </Button>
                    )}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {mode === CreateEditModeEnum.CREATE ? "Create" : "Edit"} Product
                        </DialogTitle>
                        <DialogDescription>
                            Fill in the details below to{" "}
                            {mode === CreateEditModeEnum.CREATE ? "create" : "update"} a new
                            product.
                        </DialogDescription>
                    </DialogHeader>

                    {/* form */}
                    <CreateEditProductForm
                        form={form}
                        onSubmit={onSubmit}
                        mode={mode}
                    >
                        <DialogFooter className="sm:space-x-0">
                            <Button type="submit" disabled={isCreatePending}>
                                {isCreatePending ? (
                                    <LoaderIcon size={14} className="mr-2 animate-spin" />
                                ) : (
                                    <RocketIcon className="mr-2 size-4" aria-hidden="true" />
                                )}
                                {mode === CreateEditModeEnum.CREATE ? "Create" : "Update"}
                            </Button>
                        </DialogFooter>
                    </CreateEditProductForm>
                </DialogContent>
            </Dialog>
        );

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" size="sm">
                    <PlusIcon size={16} aria-hidden="true" />
                </Button>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Create product</DrawerTitle>
                    <DrawerDescription>
                        Fill in the details below to create a new product.
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className="gap-2 sm:space-x-0">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                    <Button type="submit" disabled={isCreatePending}>
                        {isCreatePending ? (
                            <LoaderIcon size={14} className="animate-spin" />
                        ) : (
                            <RocketIcon className="mr-2 size-4" aria-hidden="true" />
                        )}
                        Create
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
