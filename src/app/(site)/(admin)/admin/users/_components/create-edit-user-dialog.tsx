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
import { createUser, updateUser } from "../_lib/actions";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUser } from "@/server/db/models/user-model";
import { CreateEditModeEnum } from "@/constants/enum";
import { CreateEditUserForm } from "./create-edit-user-form";
import { LoaderIcon, Pencil, PlusIcon, RocketIcon } from "lucide-react";
import { createUserSchema, CreateUserSchemaType } from "../_lib/validations";

interface PropsType {
    mode: CreateEditModeEnum;
    user?: Row<IUser>["original"];
}

export function CreateEdituserDialog({ mode = CreateEditModeEnum.EDIT, user }: PropsType) {
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery("(min-width: 640px)");
    const [isCreatePending, startCreateTransition] = React.useTransition();

    const form = useForm<CreateUserSchemaType>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            password: "",
            role: user?.role || "",
            phone: user?.phone || "",
            city: user?.city || "",
            state: user?.state || ""
        }
    });

    function onSubmit(input: CreateUserSchemaType) {
        startCreateTransition(async () => {
            try {
                let operationPromise;

                if (mode === CreateEditModeEnum.CREATE) {
                    operationPromise = createUser(input);
                } else if (mode === CreateEditModeEnum.EDIT) {
                    operationPromise = updateUser(input, user?._id.toString()!);
                }
                if (!operationPromise) {
                    throw new Error("Invalid operation mode");
                }

                // Wait for the operation (create or update) to complete
                const { success, message } = await operationPromise;

                // check if the request was successful
                if (!success) {
                    toast.error(message || "Something went wrong");
                    return;
                }

                // Handle success feedback
                toast.success(
                    mode === CreateEditModeEnum.CREATE ? "User created!" : "User updated!"
                );
            } catch (error: any) {
                toast.error(error.message || "Failed to create user");
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
                            <PlusIcon size={16} aria-hidden="true" className="mr-2" />
                            Create
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
                            {mode === CreateEditModeEnum.CREATE ? "Create" : "Edit"} user
                        </DialogTitle>
                        <DialogDescription>
                            Fill in the details below to{" "}
                            {mode === CreateEditModeEnum.CREATE ? "create" : "update"} a new user.
                        </DialogDescription>
                    </DialogHeader>

                    {/* form */}
                    <CreateEditUserForm form={form} onSubmit={onSubmit} mode={mode}>
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
                    </CreateEditUserForm>
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
                    <DrawerTitle>Create user</DrawerTitle>
                    <DrawerDescription>
                        Fill in the details below to create a new user.
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
