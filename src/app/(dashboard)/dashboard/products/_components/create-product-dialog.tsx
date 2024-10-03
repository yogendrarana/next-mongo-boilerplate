"use client";

import * as React from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { PlusIcon } from "@radix-ui/react-icons";
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
import { Button } from "@/components/ui/button";

import { LoaderIcon, RocketIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProductForm } from "./create-product-form";
import { createProductSchema, CreateProductSchemaType } from "../_lib/validations";

export function CreateProductDialog() {
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery("(min-width: 640px)");
    const [isCreatePending, startCreateTransition] = React.useTransition();

    const form = useForm<CreateProductSchemaType>({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            images: []
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

                const res = await fetch("/api/products", {
                    method: "POST",
                    body: formData
                });

                const { success, message } = await res.json();

                if (!success) {
                    toast.error(message);
                    return;
                }

                form.reset();
                setOpen(false);
                toast.success(message || "Product created successfully!");
            } catch (error: any) {
                toast.error(error.message || "Failed to create product");
            }
        });
    }

    if (isDesktop)
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                        <PlusIcon className="mr-2 size-4" aria-hidden="true" />
                        New Product
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Product</DialogTitle>
                        <DialogDescription>
                            Fill in the details below to create a new product.
                        </DialogDescription>
                    </DialogHeader>

                    {/* form */}
                    <CreateProductForm form={form} onSubmit={onSubmit}>
                        <DialogFooter className="sm:space-x-0">
                            <Button type="submit" disabled={isCreatePending}>
                                {isCreatePending ? (
                                    <LoaderIcon size={14} className="mr-2 animate-spin" />
                                ) : (
                                    <RocketIcon className="mr-2 size-4" aria-hidden="true" />
                                )}
                                Create
                            </Button>
                        </DialogFooter>
                    </CreateProductForm>
                </DialogContent>
            </Dialog>
        );

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" size="sm">
                    <PlusIcon className="mr-2 size-4" aria-hidden="true" />
                    New Product
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
