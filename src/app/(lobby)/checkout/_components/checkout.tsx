"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Truck, Wallet } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { PaymentMethod } from "@/constants";
import useCartStore from "@/store/use-cart-store";
import { formatPrice } from "@/lib/utils";

const formSchema = z.object({
    name: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    city: z.string().min(2, "City must be at least 2 characters"),
    province: z.string().min(2, "Province must be at least 2 characters"),
    postalCode: z.string().min(5, "Postal code must be at least 5 characters"),
    paymentMethod: z.enum([
        PaymentMethod.ESEWA,
        PaymentMethod.KHALTI,
        PaymentMethod.CASH_ON_DELIVERY
    ])
});

export default function CheckoutPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            address: "",
            city: "",
            province: "",
            postalCode: "",
            paymentMethod: PaymentMethod.ESEWA
        }
    });

    const watchPaymentMethod = form.watch("paymentMethod");

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            console.log(values);
            setIsSubmitting(false);
            // Here you would typically handle the checkout process
            alert("Order placed successfully!");
        }, 2000);
    }

    const { cartItems } = useCartStore();
    const subTotal =
        cartItems.reduce(
            (total, item) => total + item.quantity * Math.round(Number(item.price) * 100),
            0
        ) / 100;

    const tax = subTotal * 0.13;
    const shippingFee = subTotal > 1000 ? 0 : 50;
    const total = subTotal + tax + shippingFee;

    return (
        <div>
            <h1 className="mb-4 text-2xl font-medium">Checkout</h1>
            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                {/* shipping info */}
                                <div className="my-4">
                                    <CardTitle className="text-xl font-medium">
                                        Shipping Information
                                    </CardTitle>
                                    <CardDescription>
                                        Please enter your shipping details
                                    </CardDescription>
                                </div>
                                <div className="grid gap-x-2 gap-y-4 grid-cols-1 md:grid-cols-2 ">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John Doe" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="john@example.com"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Address</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="123 Main St" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid grid-cols-2 gap-2">
                                        <FormField
                                            control={form.control}
                                            name="city"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>City</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="New York" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="province"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Province</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Gandaki" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="postalCode"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Postal / Zip Code</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="10001" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <Separator className="my-6" />
                                {/* payment info */}
                                <div className="my-4">
                                    <CardTitle className="text-xl font-medium">
                                        Payment Information
                                    </CardTitle>
                                    <CardDescription>
                                        Please select how you want to pay
                                    </CardDescription>
                                </div>
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="paymentMethod"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Select Payment Method</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a payment method" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="esewa">
                                                            Esewa Wallet
                                                        </SelectItem>
                                                        <SelectItem value="khalti">
                                                            Khalti Wallet
                                                        </SelectItem>
                                                        <SelectItem value="cod">
                                                            Cash On Delivery
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {watchPaymentMethod === PaymentMethod.ESEWA && (
                                        <p className="text-sm text-muted-foreground mt-2">
                                            You will be redirected to the Esewa payment gateway to
                                            complete your payment.
                                        </p>
                                    )}
                                    {watchPaymentMethod === PaymentMethod.KHALTI && (
                                        <p className="text-sm text-muted-foreground mt-2">
                                            You will be redirected to the Khalti payment gateway to
                                            complete your payment.
                                        </p>
                                    )}
                                    {watchPaymentMethod === PaymentMethod.CASH_ON_DELIVERY && (
                                        <p className="text-sm text-muted-foreground mt-2">
                                            You will pay in cash when your order is delivered.
                                        </p>
                                    )}
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting
                                            ? "Processing..."
                                            : `Place Order${
                                                  watchPaymentMethod !==
                                                  PaymentMethod.CASH_ON_DELIVERY
                                                      ? " and Pay"
                                                      : ""
                                              }`}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

                {/* order summary card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl font-medium">Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {cartItems.map((item, index) => (
                                <li key={index} className="flex justify-between">
                                    <span>{item.name}</span>
                                    <span>
                                        {item.quantity} * {item.price} ={" "}
                                        {(item.quantity * item.price).toFixed(2)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <Separator className="my-4" />
                        <div className="flex justify-between font-medium">
                            <span>Sub Total</span>
                            <span>{formatPrice(subTotal.toFixed(2), { currency: "NPR" })}</span>
                        </div>
                        <div className="flex justify-between font-medium">
                            <span>Tax Amount</span>
                            <span>{formatPrice(tax.toFixed(2), { currency: "NPR" })}</span>
                        </div>
                        <div className="flex justify-between font-medium">
                            <span>Shipping Fee</span>
                            <span>{formatPrice(shippingFee.toFixed(2), { currency: "NPR" })}</span>
                        </div>
                        <div className="flex justify-between font-medium">
                            <span>Grand Total</span>
                            <span>{formatPrice(total.toFixed(2), { currency: "NPR" })}</span>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="w-full space-y-2">
                            <p className="text-sm text-muted-foreground flex items-center">
                                <Truck className="w-4 h-4 mr-2" />
                                Cash on Delivery available
                            </p>
                            <p className="text-sm text-muted-foreground flex items-center">
                                <Wallet className="w-4 h-4 mr-2" />
                                Esewa and Khalti Wallet supported
                            </p>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
