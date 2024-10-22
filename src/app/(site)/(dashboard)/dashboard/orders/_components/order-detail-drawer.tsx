"use client";

import React, { useState } from "react";
import SlideIn from "@/components/motion/slide-in";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Truck, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Drawer } from "vaul";
import {
    Select,
    SelectTrigger,
    SelectItem,
    SelectValue,
    SelectContent
} from "@/components/ui/select";
import {
    AlertDialog,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogCancel,
    AlertDialogAction
} from "@/components/ui/alert-dialog";

interface SlideInProps {
    open: boolean;
    onOpenChange: () => void;
    order: any;
}

// Mock data for the example
const orderData = {
    id: "ORD-12345",
    trackingNumber: "TRK-9876543210",
    status: "In Transit",
    client: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+977 9825159891"
    },
    summary: {
        subtotal: 89.97,
        shipping: 5.99,
        tax: 7.65,
        total: 103.61
    },
    items: [
        { id: 1, name: "Widget A", quantity: 2, price: 19.99 },
        { id: 2, name: "Gadget B", quantity: 1, price: 49.99 }
    ]
};

export function OrderDetailDrawer({ open, onOpenChange, order }: SlideInProps) {
    const [status, setStatus] = useState(orderData.status);
    const [newStatus, setNewStatus] = useState(status);
    const [showStatusConfirmation, setShowStatusConfirmation] = useState(false);

    const handleStatusChange = (selectedStatus: string) => {
        setNewStatus(selectedStatus);
        setShowStatusConfirmation(true);
    };

    const confirmStatusChange = () => {
        setStatus(newStatus);
        setShowStatusConfirmation(false);
    };

    if (!order) return null;

    return (
        <Drawer.Root direction="right">
            <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white">
                Order Detail
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                <Drawer.Content
                    className="right-2 top-2 bottom-2 fixed z-10 outline-none w-[310px] flex bg-white"
                    // The gap between the edge of the screen and the drawer is 8px in this case.
                    style={{ "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties}
                >
                    <div className="h-full">
                        <div className="space-y-6">
                            {/* Order ID and Tracking */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Drawer.Title className="text-md font-medium">Order {orderData.id}</Drawer.Title>
                                    <Select onValueChange={handleStatusChange} value={status}>
                                        <SelectTrigger className="h-8 w-[100px] text-xs focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none">
                                            {" "}
                                            <SelectValue placeholder={status} />
                                        </SelectTrigger>
                                        <SelectContent align="end">
                                            <SelectItem value="Pending">Pending</SelectItem>
                                            <SelectItem value="In Transit">In Transit</SelectItem>
                                            <SelectItem value="Delivered">Delivered</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Truck className="mr-2 h-4 w-4" />
                                        Tracking: {orderData.trackingNumber}
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Client Information */}
                            <div className="space-y-2">
                                <h4 className="font-medium">Client Information</h4>
                                <div className="text-sm">
                                    <div className="flex items-center">
                                        <User className="mr-2 h-4 w-4" />
                                        {orderData.client.name}
                                    </div>
                                    <div>{orderData.client.email}</div>
                                    <div>{orderData.client.phone}</div>
                                </div>
                            </div>

                            <Separator />

                            {/* Order Summary */}
                            <div className="space-y-2">
                                <h4 className="font-medium">Order Summary</h4>
                                <div className="text-sm space-y-1">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>${orderData.summary.subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span>${orderData.summary.shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Tax</span>
                                        <span>${orderData.summary.tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-semibold">
                                        <span>Total</span>
                                        <span>${orderData.summary.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Order Items */}
                            <div className="space-y-2">
                                <h4 className="font-medium">Order Items</h4>
                                <ul className="text-sm space-y-2">
                                    {orderData.items.map((item) => (
                                        <li key={item.id} className="flex justify-between">
                                            <span>
                                                {item.quantity}x {item.name}
                                            </span>
                                            <span>${(item.quantity * item.price).toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Separator />

                            {/* Payment Information */}
                            <div className="space-y-2">
                                <h4 className="font-medium">Payment Information</h4>
                                <div className="text-sm flex items-center">
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    Visa ending in 4242
                                </div>
                            </div>
                        </div>

                        <AlertDialog
                            open={showStatusConfirmation}
                            onOpenChange={setShowStatusConfirmation}
                        >
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Confirm Status Change</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        {`Are you sure you want to change the order status to ${newStatus}"?`}
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={confirmStatusChange}>
                                        Confirm
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
}
