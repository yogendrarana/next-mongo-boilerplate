"use client";

import * as z from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, ShoppingBag, Truck, Wallet } from "lucide-react";

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { formatPrice } from "@/lib/utils";
import { PaymentMethod } from "@/constants";
import useCartStore from "@/store/use-cart-store";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

const checkoutFormSchema = z.object({
    name: z.string().min(2, "Full name must be at least 2 characters"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    email: z.string().email("Invalid email address"),
    city: z.string().min(2, "City must be at least 2 characters"),
    province: z.string().min(2, "Province must be at least 2 characters"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    postalCode: z.string(),
    paymentMethod: z.enum([
        PaymentMethod.ESEWA,
        PaymentMethod.KHALTI,
        PaymentMethod.CASH_ON_DELIVERY
    ]),
    subtotal: z.number().optional(),
    tax: z.number().optional(),
    deliveryFee: z.number().optional(),
    total: z.number().optional()
});

export default function CheckoutPage() {
    const router = useRouter();
    const { cartItems } = useCartStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof checkoutFormSchema>>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            province: "",
            postalCode: "",
            paymentMethod: PaymentMethod.CASH_ON_DELIVERY
        }
    });

    const watchPaymentMethod = form.watch("paymentMethod");
    const subtotal = cartItems.reduce(
        (total, item) => total + item.quantity * Number(item.price),
        0
    );

    const tax = subtotal * 0.13;
    const deliveryFee = subtotal > 1000 ? 0 : 50;
    const total = subtotal + tax + deliveryFee;

    async function onSubmit(values: z.infer<typeof checkoutFormSchema>) {
        setIsSubmitting(true);

        // add other info to values object like subtotal, tax, delivery, total, etc.
        values["subtotal"] = subtotal;
        values["tax"] = tax;
        values["deliveryFee"] = deliveryFee;
        values["total"] = total;

        try {
            const res = await fetch("/api/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            });

            const { success, message } = await res.json();

            if (!success) {
                return toast.error(message || "Failed to place order");
            }

            // clear the cart and redirect to home page
            useCartStore.setState({ cartItems: [] });
            localStorage.removeItem("cart-items");
            router.push("/");

            toast.success("Order placed successfully!");
        } catch (err: any) {
            toast.error(err.message || "Failed to place order");
        } finally {
            setIsSubmitting(false);
        }
    }

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
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="9812345678"
                                                        {...field}
                                                    />
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
                                        {isSubmitting ? (
                                            <LoaderIcon
                                                size={14}
                                                aria-hidden="true"
                                                className="mr-2 size-4 animate-spin"
                                            />
                                        ) : (
                                            <ShoppingBag
                                                className="mr-2 size-4"
                                                aria-hidden="true"
                                            />
                                        )}
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
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Sub Total</span>
                                <span>{formatPrice(subtotal.toFixed(2), { currency: "NPR" })}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Tax Amount</span>
                                <span>{formatPrice(tax.toFixed(2), { currency: "NPR" })}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Shipping Fee</span>
                                <span>
                                    {formatPrice(deliveryFee.toFixed(2), { currency: "NPR" })}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm font-bold">
                                <span>Grand Total</span>
                                <span>{formatPrice(total.toFixed(2), { currency: "NPR" })}</span>
                            </div>
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
