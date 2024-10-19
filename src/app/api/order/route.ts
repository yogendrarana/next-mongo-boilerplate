// app/api/order/route.ts

import { auth } from "@/auth";
import { generateId } from "@/lib/id";
import OrderModel from "@/server/db/models/order-model";
import { NextRequest, NextResponse } from "next/server";
import { PaymentMethod, PaymentStatus } from "@/constants";
import { TCartItem } from "@/store/use-cart-store";
import ProductModel from "@/server/db/models/product-model";

export async function POST(req: NextRequest): Promise<NextResponse> {
    const authSession = await auth();
    if (!authSession || !authSession?.user?.id) {
        return NextResponse.json(
            {
                success: false,
                message: "Not authenticated!",
                data: null
            },
            { status: 500 }
        );
    }

    const body = await req.json();

    try {
        // TODO: add transaction
        // start transaction
        // const session = await mongoose.startSession();
        // session.startTransaction();

        const newOrder = await OrderModel.create({
            orderId: generateId("order"),
            customerId: authSession.user.id,
            subtotal: body.subtotal,
            tax: body.tax,
            deliveryFee: body.deliveryFee,
            total: body.total,
            shippingInfo: {
                name: body.name,
                phone: body.phone,
                email: body?.email || "",
                city: body.city,
                province: body.province,
                zipCode: body?.postalCode || "",
                address: body.address
            },
            paymentInfo: {
                paymentMethod: body.paymentMethod,
                status:
                    body.paymentMethod === PaymentMethod.CASH_ON_DELIVERY
                        ? PaymentStatus.PENDING
                        : PaymentStatus.PAID
            },
            orderItems: body.orderItems
        });

        // update stock of products
        await Promise.all(
            body.orderItems.map(async (item: TCartItem) => {
                const product = await ProductModel.findById(item.id);
                product.inventory = product.inventory - item.quantity;
                await product.save();
            })
        );

        // TODO: send sms/email to customer about the order and set notification for admin as well as customer

        // await session.commitTransaction();
        // session.endSession();

        return NextResponse.json(
            {
                success: true,
                message: "Order placed successfully!",
                data: newOrder
            },
            { status: 200 }
        );
    } catch (err: any) {
        return NextResponse.json(
            {
                success: false,
                message: err.message || "Failed to place order!",
                data: null
            },
            { status: 500 }
        );
    }
}
